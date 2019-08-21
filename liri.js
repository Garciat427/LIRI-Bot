//Configuration
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//Require Statements
var axios = require("axios");
var fs = require("fs");

// Globals
var divider = "\n------------------------------------------------------------\n";

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
  
    case "spotify-this-song":
      var spotifyThis = Song (nodeParam);
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

function Song(song) {
  spotify.search({ type: 'track', query: 'caught up' , limit: 20}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var track = data.tracks.items[0];
    var artistArr = track.artists
    
  if (track){ //If track exisits
    console.log("------------ Song Info -------------");
    console.log("Song Name: " +track.name);
    console.log("---- Artists ---");
    for (index = 0; index < artistArr.length; index++){
      console.log(artistArr[index].name);
    }
    console.log("---- Links ----");
    console.log("Open Song on Spotify: " + track.external_urls.spotify);
    console.log("Preview Song: " + track.preview_url);
    console.log("\n------------ Album Info -------------");
    console.log("Album Name: " +track.album.name);
    console.log("Album Type: " +track.album.album_type);

  } else {
    console.log("false")
  }
  });
};
