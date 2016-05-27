var apiKey = require('./../.env').apiKey;
var gitCall = require('./../js/gitCall.js').gitCall;
var profileCall = require('./../js/gitCall.js').profileCall;

function displayProfile(owner) {
  $('#apiReturn').append('<h1>Full name: ' + owner.name + '</h1>Email Address: '+ owner.email + '<br>Avatar: <br><img src=' + owner.avatar_url + '><br>Followers: ' + owner.followers);
}

function displayResult(repo) {
  if (repo.description === ''){
    repo.description = 'No description provided';
  }
  $('#apiReturn').append('<strong>Repo name: ' + repo.name + '</strong><br>Repo description: ' + repo.description + '<br>Created on: ' + moment(repo.created_at).format('MMM Do YYYY') + '<br><br>');
}

$(document).ready(function() {
  $('#requestRepos').click(function() {
    $('#apiReturn').empty();
    var userName = $('#userName').val();
    gitCall(userName, displayResult);
  });
  $('#requestProfile').click(function() {
    $('#apiReturn').empty();
    var userName = $('#userName').val();
    profileCall(userName, displayProfile);
  });
});
