require("dotenv").config();
var axios = require('axios');
var fs = require("fs");
var command = process.argv[2];

// Movies
function movieThis() {
    // takes in movie input
    if (typeof process.argv[3] !== "undefined") {
        var movieName = process.argv.slice(3).join(" ");
    } else {
        // defaults to "Mr. Nobody" if no movie is given
        var movieName = "mr nobody";
    }
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes&apikey=trilogy";
    axios.get(movieQueryUrl).then(
        function (response) {
            var d = response.data;
            // If rotten tomatoes rating is not available
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
                // If rotten tomatoes rating is available
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
        // Returns an error if there is one
        .catch(function (error) {
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

// Concerts
function concertThis() {
    // Takes in artist input
    var artist = process.argv.slice(3).join(" ");
    // Assigns a default if no input is given
    // ?
    var concertQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(concertQueryUrl).then(
        function (response) {
            var d = response.data;
            // Returns a list of concerts by the artist
            for (var i = 0; i < d.length; i++) {
                console.log("Artist: " + artist.toUpperCase() +
                    "\nVenue: " + d[i].venue.name +
                    "\nLocation: " + d[i].venue.location +
                    // Use moment to format date
                    "\nDate: " + d[i].datetime +
                    // Line for separation
                    "\n-------------------------------------");
            }
        })
        // Returns an error if there is one
        .catch(function (error) {
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

// Songs
function spotifyThis() {
    // Takes in song input
    if (typeof process.argv[3] !== "undefined") {
        var song = process.argv.slice(3).join(" ");
    } else {
        // Defaults to "The Sign" by Ace of Base if no song is given
        var song = "thesign";
    }
    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: song }, function (err, data) {
        // Returns an error if there is one
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // Only returns one song if default
        if (song === "thesign" || song === "I Want it That Way") {
            var d = data.tracks.items[0];
            console.log("Artist: " + d.album.artists[0].name +
                "\nSong: " + d.name +
                "\nAlbum: " + d.album.name +
                "\nLink: " + d.external_urls.spotify);
        } else {
            // Returns up to 5 songs with same name
            for (i = 0; i < 5; i++) {
                var d = data.tracks.items[i];
                console.log("Artist: " + d.album.artists[0].name +
                    "\nSong: " + d.name +
                    "\nAlbum: " + d.album.name +
                    "\nLink: " + d.external_urls.spotify +
                    // Line for separation
                    "\n-------------------------------------");
            }
        }
    });
};

// Random
function doWhatItSays() {
    // Gets the text from random.txt
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        // Takes the data before the comma and turns it into the command
        command = data.split(",")[0];
        // Takes the data after the comma, removes the quotes, and turns it into the search input    
        process.argv[3] = JSON.parse(data.split(",")[1]);
        // Runs a function depending on what command is written in random.txt
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
        };
    });
};

// Runs a function based on what command is inputted into terminal
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

    case "do-what-it-says":
        doWhatItSays();
        break;
};