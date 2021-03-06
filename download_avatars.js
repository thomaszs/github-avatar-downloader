var request = require('request');
var fs = require('fs');
var tokens = require('./secrets').GITHUB_TOKEN;
var owner = process.argv.slice(2,3);
var repo = process.argv.slice(3);

console.log('Welcome to the GitHub Avatar Downloader!')

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + tokens
    }
  };
  if (!owner.length || !repo.length) {
    console.log("Please enter both owner name and repo")
    return;
  }
  request(options, cb);
}

function downloadImageByURL(url, filePath) {
  request.get(url)               
         .on('error', function (err) {                                  
           throw err; 
         })
         .pipe(fs.createWriteStream(filePath));
         return;    
  }

function getAllAvatars(err, response, body) {
  var parsedResult = JSON.parse(body);
  for (var i = 0; i < parsedResult.length; i++) {
    downloadImageByURL(parsedResult[i].avatar_url, "./avatars/" + parsedResult[i].login + ".jpg")
  }
}

getRepoContributors(owner, repo, getAllAvatars);


