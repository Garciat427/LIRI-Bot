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

if (command === "do-what-it-says"){
  var randInfo = Command()
} else {
  runSwitch ();
}

//Switch Statement
function runSwitch (){
  switch(command) {
    case "concert-this":
      var concertThis = Concert (nodeParam);
    break;
    case "spotify-this-song":
      var spotifyThis = Song (nodeParam);
    break;

    case "movie-this":
      var movieThis = Movie (nodeParam);
    break;
    //If wrong command
    default:
      console.log("Command was incorrect! Please enter the following commands: \n \n \n \ndo-what-it-says ");
      console.log("\"concert-this <artist/band name here>\" ~ Command to find events by artist entered");
      console.log("\"spotify-this-song <song name here>\" ~ Command to song entered on spotify");
      console.log("\"movie-this <movie name here>\" ~ Command to find info on movie entered");
      console.log("\"do-what-it-says\" ~ Command used to run command stored in random.txt");
  }
}


//Constructors

//Find Concert/events Function
function Concert(artist) {
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function(response) {
      if (response.data[0].venue){ //If event is found
        var eventArr = response.data;
        console.log("================================================");
        console.log("--------- Artist: " + artist + " -------------");
        for (index = 1; index <= eventArr.length; index ++){
          var eventData = eventArr[index - 1];
          console.log(divider);
          console.log("------- Event " + index + " -------");   
          console.log("Venue: " + eventData.venue.name);
          console.log("Location: " + eventData.venue.region + ", " + eventData.venue.country);
          console.log("Date of Event: " + eventData.datetime);
        }
      } else {
        console.log("Cannot find events");
      }  
    });
};

//Find Songs
function Song(song) {
  var songLimit;
  if (!song){ //If no song is entered, use defaulted
    song = "The Sign Ace of Base";
    songLimit = 1;
  } else {
    songLimit = 5
  }
  spotify.search({ type: 'track', query: song , limit: songLimit}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  if (data.tracks.items[0]){ //If track exisits
    var songsArr = data.tracks.items;
    for (index = 0; index < songsArr.length; index++){
      var track = songsArr[index];
      var artistArr = track.artists
      console.log("------------ Song " + (index + 1) + " Info -------------");
      console.log("Song Name: " +track.name);
      console.log("---- Artists ---");
      for (index2 = 0; index2 < artistArr.length; index2++){
        console.log(artistArr[index2].name);
      }
      console.log("---- Links ----");
      console.log("Open Song on Spotify: " + track.external_urls.spotify);
      console.log("Preview Song: " + track.preview_url);
      console.log("\n------------ Album Info -------------");
      console.log("Album Name: " +track.album.name);
      console.log("Album Type: " +track.album.album_type);
      console.log(divider);
    }
  } else {
    console.log("Song Not Found")
  }
  });
};

//Find Movies
function Movie(movie) {
  if (!movie){ //If no movie is entered, use defaulted
    movie = "Mr. Nobody";
  }
  var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  axios.get(URL).then(function(response) {
    //console.log (response.data);
    if (response.data){ //If event is found
      var movieInfo = response.data;
      console.log("\n================================================");
      console.log("--------- Movie Info -------------")
      console.log("Movie Title: " + movieInfo.Title);
      console.log("Movie Release Year: " + movieInfo.Year);
      console.log("Movie Production Country: " + movieInfo.Country);
      console.log("Movie Language: " + movieInfo.Language);
      console.log("Movie Actors: " + movieInfo.Actors);
      console.log("\n--------- Movie Ratings -------------")
      console.log("Movie IMDB Rating: " + movieInfo.imdbRating);
      //Rotten Tomatioes
      var ratings = movieInfo.Ratings;
      for (var i = 0; i < ratings.length; i++){
        if (ratings[i].Source === 'Rotten Tomatoes'){
          console.log("Movie Rotten Tomatoes Rating: " + ratings[i].Value);
        }
      }
      console.log("\n--------- Movie Plot -------------")
      console.log("Movie Title: " + movieInfo.Plot);
      console.log(divider);
    } else {
      console.log("Cannot find movie");
    }  
  });
};

//Run command in random.txt
function Command() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    command = dataArr[0];
    nodeParam = dataArr[1];
    runSwitch ();
  });
  
};