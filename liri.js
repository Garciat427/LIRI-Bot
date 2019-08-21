//Configuration
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//Require Statements
var axios = require("axios");
var fs = require("fs");
var moment = require ("moment")

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
  //Concert-this command
    case "concert-this":
      var concertThis = Concert (nodeParam);
    break;
  
    case "concert-this":
      var concertThis = Concert (nodeParam);
    break;
  //If wrong command
  default:
        console.log("Default was selected");
}

//Constructors

//Find Concert/events Function
function Concert(artist) {
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function(response) {
      console.log("================================================");
      console.log("--------- Artist: " + artist + " -------------");
      for (index = 1; index <= 10; index ++){
        var eventData = response.data[index - 1];
        console.log(divider);
        console.log("------- Event " + index + " -------");   
        console.log("Venue: " + eventData.venue.name);
        console.log("Location: " + eventData.venue.region + ", " + eventData.venue.country);
        console.log("Date of Event: " + eventData.datetime);
      }
    });
};


