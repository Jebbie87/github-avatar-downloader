var request = require('request');
var user = require('./user')
var GITHUB_USER = user.name
var GITHUB_TOKEN = user.token

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors (repoOwner, repoName, cb){
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors;'
  request.get({
            url: requestURL,
            auth: {
              user: user.name,
              pass: user.token
            },
            headers: {
              'User-Agent': 'Firefox'
            }
          }, function (error, response, body){
    var data = JSON.parse(body);

    // Will print the parsed data as a JSON object to terminal
    // data.forEach(function(avatars){
    //   console.log(avatars)
    // })
    console.log(requestURL)
  })
};

getRepoContributors("nodejs", "node", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});