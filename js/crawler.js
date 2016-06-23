var request = require('request');
var cheerio = require('cheerio');


exports.Crawler = function(bill){
  this.bill = bill;
}

exports.Crawler.prototype.getCompanies = function(listFunction){
  var b = bill;
  request("https://www.opensecrets.org/lobby/billsum.php?id="+b, function(error, response, body) {
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
