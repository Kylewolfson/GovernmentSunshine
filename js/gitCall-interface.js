var apiKey = require('./../.env').apiKey;
var gitCall = require('./../js/gitCall.js').gitCall;

$(document).ready(function() {
  $('#makeCall').click(function() {
    var userName = $('#userName').val();
    gitCall(userName);
  });
});
