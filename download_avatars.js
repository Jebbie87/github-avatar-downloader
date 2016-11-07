'user strict';
const request = require('request');
const user = require('./user')
const fs = require('fs')
const GITHUB_USER = user.name
const GITHUB_TOKEN = user.token

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors (repoOwner, repoName, cb){
  const requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
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
     const data = JSON.parse(body);

    // Will print the parsed data as a JSON object to terminal
     data.forEach(function(avatars){
       console.log(avatars['avatar_url'])
     })
  })
};

function downloadImageByURL (url, urlPath){
    console.log("Downloading avatar image...")
    request.get(url)
           .on('end', function(){
             console.log("Finished downloading avatar image!")
           })
           .pipe(fs.createWriteStream('./avatar-image.jpg'))
}

downloadImageByURL('https://avatars2.githubusercontent.com/', 'u/2741?v=3&s=466", "avatars/kvirani.jpg')

// getRepoContributors("nodejs", "node", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });