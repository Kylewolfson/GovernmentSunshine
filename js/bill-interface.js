// var Bill = require('./../js/bill.js').Bill;
// var Crawler = require('./../js/crawler.js').Crawler;
var bills = [];

var getObject = function(object){
	//console.log(object);
	var x = object.results;
	for(var i = 0; i<x.length; i++){
		$('.legislator').append(x[i].bill_id + "<br>" +"<hr>");
		var bill = x[i].bill_id;
		bills.push(bill);
		debugger;
	}
}

var getCompaniesList = function(comp){
	var y = comp.results;
	console.log(y);
}


$(document).ready(function(){
	$('#find').submit(function(event){
		event.preventDefault();
		var first = $('#firstName').val();
		var last = $('#lastName').val();
		var newBill = new Bill(first, last);
		newBill.getBills(getObject);
	for(var i = 0; i<bills.length; i++){
		debugger;
		var newCrawler = new Crawler(bills[i]);
		console.log(newCrawler);
		newCrawler.getCompanies(getCompaniesList);
		}
	})
})

//1: get BillId from getObject "object", and store as local variable.

//2: instantiate Crawler, and pass in variable;


//3: Here's the issue: my intantiation of "newCrawler" is creating a singleton, not an array of newCrawler objects. So, I need to either figure out how to do so, or, create a click listener which takes a specific bill (from the list given inside the getObject method) and provides the specific companies for it. Either or : )
