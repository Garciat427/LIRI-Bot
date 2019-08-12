//Configuration
//require(".env").config();
//var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);

//Require Statements
var axios = require("axios");
var fs = require("fs");

// Globals
var divider = "\n------------------------------------------------------------\n\n";

// Input Section
var command = process.argv[2]; //Command

//Paramater from user
var nodeArgs = process.argv;
var nodeParam = "";
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    nodeParam = nodeParam + "+" + nodeArgs[i];
  } else {
    nodeParam += nodeArgs[i];
  }
}


//Switch Statement
switch(command) {
  case "concert-this":
    var concert
    break;
  case "somthingelse":
    // code block
    break;
  default:
        console.log("Test2");
    // code block
}

//Constructors

var concert = function(artist) {
  this.findShow = function() {
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function(response) {
      var jsonData = response.data;
      var showData = [
        "Show: " + jsonData.url,
        
      ].join("\n\n");

      // Append showData and the divider to log.txt, print showData to the console
      fs.appendFile("log.txt", showData + divider, function(err) {
        if (err) throw err;
        console.log(showData);
      });
    });
  };

  this.findActor = function(actor) {
    var URL = "http://api.tvmaze.com/search/people?q=" + actor;
    
    axios.get(URL).then(function(response) {
      // Place the response.data into a variable, jsonData.
      var jsonData = response.data[0].person;

      // showData ends up being the string containing the show data we will print to the console
      var showData = [
        "Name: " + jsonData.name,
        "Birthday: " + jsonData.birthday,
        "Gender: " + jsonData.gender,
        "Country: " + jsonData.country.name,
        "TV Maze Url: " + jsonData.url
      ].join("\n\n");

      // Append showData and the divider to log.txt, print showData to the console
      fs.appendFile("log.txt", showData + divider, function(err) {
        if (err) throw err;
        console.log(divider + showData + divider);
      });
    });

    // Add code to search the TVMaze API for the given actor
    // The API will return an array containing multiple actors, just grab the first result
    // Append the actor's name, birthday, gender, country, and URL to the `log.txt` file
    // Print this information to the console
  };
};
