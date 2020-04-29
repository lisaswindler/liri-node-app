require("dotenv").config();
var axios = require('axios');
var command = process.argv[2];

function movieThis() {
    if (typeof process.argv[3] !== "undefined") {
        var movieName = process.argv.slice(3).join(" ");
    } else {
        var movieName = "mr nobody";
    }
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes&apikey=trilogy";
    axios.get(movieQueryUrl).then(
        function(response) {
        var d = response.data;
        if (d.Ratings.length < 1) {
            console.log("Title: " + d.Title +
            "\nYear: " + d.Year +
            "\nIMDB Rating: " + d.imdbRating +
            "\nRotten Tomatoes: Not found" +
            "\nCountry: " + d.Country +
            "\nLanguage: " + d.Language +
            "\nPlot: " + d.Plot +
            "\nActors: " + d.Actors)
        } else {
            console.log("Title: " + d.Title +
            "\nYear: " + d.Year +
            "\nIMDB Rating: " + d.imdbRating +
            "\nRotten Tomatoes: " + d.Ratings[1].Value +
            "\nCountry: " + d.Country +
            "\nLanguage: " + d.Language +
            "\nPlot: " + d.Plot +
            "\nActors: " + d.Actors)
        }
    })
    .catch(function(error) {
        if (error.response) {
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
};

function concertThis() {
    var artist = process.argv.slice(3).join(" ");
    var concertQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(concertQueryUrl).then(
        function(response) {
        var d = response.data;
        for (var i=0; i<d.length; i++) {
        console.log("Artist: " + artist.toUpperCase() +
        "\nVenue: " + d[i].venue.name +
        "\nLocation: " + d[i].venue.location +
        // Use moment to format date
        "\nDate: " + d[i].datetime)
        }
    })
    .catch(function(error) {
        if (error.response) {
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
};

function spotifyThis() {
    var song = process.argv.slice(3).join(" ");
    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    var songQueryUrl = "https://api.spotify.com/v1/search?type=" + song + exports.spotify.id + exports.spotify.secret;
    console.log(songQueryUrl)
    axios.get(songQueryUrl).then(
        function(response) {
        var d = response.data;
        console.log(d);
        // for (var i=0; i<d.length; i++) {
        // console.log("Artist: " + artist.toUpperCase() +
        // "\nVenue: " + d[i].venue.name +
        // "\nLocation: " + d[i].venue.location +
        // // Use moment to format date
        // "\nDate: " + d[i].datetime)
        // }
    })
    .catch(function(error) {
        if (error.response) {
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
};

switch (command) {
    case "movie-this":
      movieThis();
      break;
    
    case "concert-this":
      concertThis();
      break;
    
    case "spotify-this-song":
      spotifyThis();
      break;
    
    // case "do-what-it-says":
    //   randomText();
    //   break;
    };