// var apiKey = require('./../.env').apiKey;
// 
// var apiKey = "";
//
// exports.Bill = function(first, last){
//   this.first = first;
//   this.last = last;
// }
//
// exports.Bill.prototype.getBills = function(getObject){
//   var firstName = this.first;
//   var lastName = this.last;
//   $.get('http://congress.api.sunlightfoundation.com/legislators?first_name='+ firstName +'&last_name='+ lastName +'&apikey='+apiKey).then(function(response){
//     var legislator = response.results[0].bioguide_id;
//     $.get('http://congress.api.sunlightfoundation.com/bills?sponsor_id='+legislator+'&apikey='+apiKey).then(function(call){
//       getObject(call);
//     })
//   })
// }
