var apiKey = require('./../.env').apiKey;
var gitCall = require('./../js/gitCall.js').gitCall;

function displayResult(repo) {
  if (repo.description == ''){
    repo.description = 'No description provided';
  }
  $('#apiReturn').append('<strong>Repo name: ' + repo.name + '</strong><br>Repo description: ' + repo.description + '<br><br>');
}

$(document).ready(function() {
  $('#makeCall').click(function() {
    $('#apiReturn').empty();
    var userName = $('#userName').val();
    gitCall(userName, displayResult);
  });
});
