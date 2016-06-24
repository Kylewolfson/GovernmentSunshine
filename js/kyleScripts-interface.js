var cytoscape = require('cytoscape');
var Crawler = require('./../js/crawler.js').Crawler;
var request = require('request');
var cheerio = require('cheerio');

$(document).ready(function(){

  var callBack = function(object){
    console.log(object);
  }
  var key = 'a10550b4ef1141b580b7581fe3c76b1f';

  function getLegislatorID(firstName, lastName) {
    var fullName = firstName + " " + lastName;
    cy.add({
       data: { id: fullName, faveColor: 'black', faveShape: 'ellipse', degree: 0}
    })
    var url = 'http://congress.api.sunlightfoundation.com/legislators?first_name='+ firstName+'&last_name='+ lastName+'&apikey=' + key;
    return $.getJSON(url).then(function(responseJSON) {
      var legislatorID = responseJSON.results[0].bioguide_id;
      findBills(legislatorID, fullName);
      return responseJSON.results;
    });
 }

  function findBills(legislatorID, fullName){
  //debugger;
  var id = legislatorID;
  var bills = 'http://congress.api.sunlightfoundation.com/bills?sponsor_id='+ id +'&apikey='+key;
  var billsCall = $.getJSON(bills);
  return $.getJSON(bills).then(function(responseJSON){
    for(var i=0; i<responseJSON.results.length; i++){
      var title;
      var billID = responseJSON.results[i].bill_id;
      if (responseJSON.results[i].short_title) {
        title = responseJSON.results[i].short_title
      } else {
        title = responseJSON.results[i].official_title
      }
      $('#someDiv').append("<span id=" + billID + "><li>"+title+"</li></span>");
      $('#'+ billID).click(function()  {
        var billId = this.id;
        //console.log(billId);
        var toServer = 'http://localhost:4000/newServer/'+billId;
        var displayTitle = $('#'+billId).text().slice(0, 25);

        $.getJSON(toServer).then(function(response){
          //console.log(response.body);
            var $ = cheerio.load(response.body);
            $('#issue_summary > tbody > tr > td:nth-child(1)').each(function( index ) {
              var company = $(this).text().trim();
              cy.add({
                data: { id: company, faveShape: 'triangle', faveColor: 'red', degree: 2}
              })
              cy.add({
                data: {
                  source: displayTitle,
                  target: company
                }
              })
              console.log("Company: " + company);
              //companyNames.push(company);
            })
          cy.layout({
            name:'concentric',
            fit: true,
            minNodeSpacing: 0,
            avoidOverlap: false,
            concentric: function(){ // returns numeric value for each node, placing higher nodes in degrees towards the centre
              return this.degree();
            }
          });
        })
      })
      title = title.slice(0, 25);
      cy.add({
        data: { id: title, faveShape: 'rectangle', faveColor: 'blue', degree: 1}
      })
      cy.add({
        data: {
          source: fullName,
          target: title
        }
      })
      var openSecrets = responseJSON.results[i].number;
      var temp = responseJSON.results[i];
    }
    allElements = cy.elements();
    var allNodes = allElements.filter('node');
    var printThis = [];
        allNodes.filter(function(i,ele){
            printThis.push(ele.id());
            printThis.push(ele.degree());
        });
        console.log(printThis);
    cy.layout({
      name:'concentric',
      fit: true,
      minNodeSpacing: 0,
      avoidOverlap: false,
      concentric: function(){ // returns numeric value for each node, placing higher nodes in degrees towards the centre
        return this.degree();
      },
      levelWidth: function( nodes ){ // the variation of concentric values in each level
        return nodes.maxDegree() / 800;
      }
    });

    return responseJSON.results;
  })
  }

  $('.politicianSearch').keypress(function(event){
    if(event.keyCode==13) {
      event.preventDefault();
      var fullName = $('#politicianInput').val();
      var firstName = fullName.split(" ")[0];
      var lastName = fullName.split(" ")[1];
      console.log(firstName+lastName);
      getLegislatorID(firstName, lastName)
      $('div.hiddenPoliticians').fadeIn(7000).removeClass('hiddenPoliticians');
      $('div.introContent').fadeOut(4000);
    }
  });

  var cy = cytoscape({
  container: document.getElementById('cy'),
  layout: {
    name:'concentric'
  },
    style: [
        {
            selector: 'node',
            style: {
                shape: 'data(faveShape)',
                'background-color': 'data(faveColor)',
                label: 'data(id)'
            }
        }]
      });
});
