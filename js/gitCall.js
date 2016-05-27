var apiKey = require('./../.env').apiKey;

exports.gitCall = function(userName, displayResult) {
  var url;
  if (apiKey) {
    url = 'https://api.github.com/users/' + userName + '/repos?access_token=' + apiKey;
  } else {
    url = 'https://api.github.com/users/' + userName + '/repos';
  }

  $.ajax(url).then(function(response)
  {
    response.forEach(function(repo) {
      displayResult(repo);
    });
  }).fail(function(error){
    console.log(error);
  });
};
