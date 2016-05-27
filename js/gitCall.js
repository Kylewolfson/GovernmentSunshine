var apiKey = require('./../.env').apiKey;

exports.gitCall = function(userName) {
  $.ajax('https://api.github.com/users/' + userName + '/repos?access_token=' + apiKey).then(function(response)
  {
    $('#apiReturn').text(response);
  });
};
