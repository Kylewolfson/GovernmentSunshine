var apiKey = require('./../.env').apiKey;

exports.gitCall = function(userName) {
  $.ajax('https://api.github.com/users/' + userName + '/repos?access_token=' + apiKey).then(function(response)
  {
    console.log(response);
    response.forEach(function(repo) {
      if (repo.description == ''){
        repo.description = 'No description provided';
      }
      $('#apiReturn').append('<strong>Repo name: ' + repo.name + '</strong><br>Repo description: ' + repo.description + '<br><br>');
    });
  });
};
