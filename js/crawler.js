var request = require('request');
var cheerio = require('cheerio');


exports.Crawler = function(){
}

exports.Crawler.prototype.getCompanies = function(bill, listFunction){

  var b = bill;
  request("https://www.opensecrets.org/lobby/billsum.php?id=s2012-114", function(error, response, body) {
      debugger;
    var companyNames = [];
    if(error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);

    var $ = cheerio.load(body);

    $('#issue_summary > tbody > tr > td:nth-child(1)').each(function( index ) {
      var company = $(this).text().trim();
      //console.log("Company: " + company);
      companyNames.push(company);
    });
    listFunction(companyNames);
  });
}
