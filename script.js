//Configuration
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//Require Statements
var axios = require("axios");
var fs = require("fs");
var inquirer = require('inquirer');

// Globals
var divider = "\n------------------------------------------------------------\n\n";

//Constructors


var TV = function() {
  this.findShow = function(show) {
    var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;

    axios.get(URL).then(function(response) {
      var jsonData = response.data;
      var showData = [
        "Show: " + jsonData.name,
        "Genre(s): " + jsonData.genres.join(", "),
        "Rating: " + jsonData.rating.average,
        "Network: " + jsonData.network.name,
        "Summary: " + jsonData.summary
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
