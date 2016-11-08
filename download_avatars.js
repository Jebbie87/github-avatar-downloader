'user strict';
const request = require('request');
const user = require('./user');
const fs = require('fs');
const GITHUB_USER = user.name;
const GITHUB_TOKEN = user.token;
const person = process.argv.slice(2);

if (person.length === 2){
  console.log('Welcome to the Github Avatar Downloader!');
  function getRepoContributors (repoOwner, repoName, cb){
    const requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
    request.get({
              url: requestURL,
              headers: {
                'User-Agent': 'Firefox'
              }
            }, function (error, response, body){
    const data = JSON.parse(body);
    cb(data);
    });
  };

function downloadImageByURL (url, urlPath){
  let filePath = "./avatars/" + urlPath + ".jpg";
  request.get(url + urlPath)
         .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(person[0], person[1], function(url){
  console.log("Downloading avatar images!");
  url.forEach(function(address){
    downloadImageByURL(address['avatar_url'], address['login'])
  })
  console.log("All avatar images downloaded!");
});
} else {
  console.log("Please put in a valid support line argument!");
  console.log("The right form is 'node <file name> <repo owner> <repo name>")
  console.log("An example command is --> node download_avatars.js nodejs node")
};