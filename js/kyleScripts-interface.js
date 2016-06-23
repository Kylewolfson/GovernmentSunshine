var cytoscape = require('cytoscape');

$(document).ready(function(){
  var key = 'a10550b4ef1141b580b7581fe3c76b1f';

  var firstName = "Harry";
  var lastName = "Reid";
  var fullName = firstName + ' ' + lastName;

  function getLegislatorID() {
    var url = 'http://congress.api.sunlightfoundation.com/legislators?first_name='+ firstName+'&last_name='+ lastName+'&apikey=' + key;
    return $.getJSON(url).then(function(responseJSON) {
      var legislatorID = responseJSON.results[0].bioguide_id;
      findBills(legislatorID);
      return responseJSON.results;
    });
 }

  function findBills(legislatorID){
  var id = legislatorID;
  var bills = 'http://congress.api.sunlightfoundation.com/bills?sponsor_id='+ id +'&apikey='+key;
  var billsCall = $.getJSON(bills);
  return $.getJSON(bills).then(function(responseJSON){
    for(var i=0; i<responseJSON.results.length; i++){
      var title;
      if (responseJSON.results[i].short_title) {
        title = responseJSON.results[i].short_title
      } else {
        title = responseJSON.results[i].official_title
      }
      title = title.slice(0, 25);
      cy.add({
        data: { id: title, degree: 1}
      })
      cy.add({
        data: {
          source: fullName,
          target: title,
          weight: 1
        }
      })
      var openSecrets = responseJSON.results[i].number;
      var temp = responseJSON.results[i];
    }
    cy.layout({
      name:'concentric',
      fit: true,
      minNodeSpacing: 0,
      avoidOverlap: false,
      concentric: function(){ // returns numeric value for each node, placing higher nodes in levels towards the centre
        return this.degree();
      }
    });
    return responseJSON.results;
  })
  }

  $('#billsInput').keydown(function(event) {
    if (event.keyCode == 13) {
      this.form.submit();
      return false;
      console.log("enter works!");
    }
  });
  var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    { data: { id: fullName, degree: 0}}
  ],
  layout: {
    name:'concentric'
  },
    style: [
        {
            selector: 'node',
            style: {
                shape: 'hexagon',
                'background-color': 'red',
                label: 'data(id)'
            }
        }]
      });
getLegislatorID();
});
