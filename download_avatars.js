var request = require('request');
var user = require('./user')

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors (repoOwner, repoName, cb){
  var path = 'repos/jquery/jquery/contributors'
  request.get({
            url: 'http://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
            auth: {
              user: user.name,
              pass: user.token
            },
            headers: {
              'User-Agent': 'Firefox'
            }
          }, function (error, response, body){
    var data = JSON.parse(body);
    data.forEach(function(avatars){
      console.log(avatars)
    })
  })
};

getRepoContributors("nodejs", "node", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});