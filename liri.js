require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var fs = require("fs");

var moment = require("moment");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var liriOutput = process.argv[2];

var stringArgv = process.argv;

var artistSong = "";

var artist = "";

var movieName = "";

for (var i = 3; i < stringArgv.length; i++) {
    if (i > 3 && i < stringArgv.length) {
        artist = artist + "" + stringArgv[i];
        movieName = movieName + "" + stringArgv[i]
    } else {
        artistSong += stringArgv[i];
        artist += stringArgv[i];
        movieName += stringArgv[i];

    }
}

switch (liriOutput) {

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "concert-this":
        concertThis();
        break;

    case "do-what-it-says":
        doThis(userQuery);
        break;

    default: console.log("\n" + "type the command after 'node liri.js':" + "\n" + "spotify-this-song" + "\n" + "movie-this" + "\n" + "concert-this");

};

function spotifyThisSong() {

    if (artistSong === "") {
        artistSong = "That's the Way Love Goes";
    }

    spotify.search({
        type: "track",
        query: "'" + artistSong + "'";
        limit: 5
    },
        function (error, data) {

            var artist = "Artist: " + data.tracks.items[0].artist[0].name;
            var songTitle = "Song: " + data.tracks.items[0].name;
            var album = "Album: " + data.tracks.items[0].album.name;
            var previewLink = "Preview Link: " + data.tracks.items[0].preview_url;

            console.log(artist);
            console.log(songTitle);
            console.log(album);
            console.log(previewLink);

            if (error) {
                console.log("Sorry DJ has left:" + artistSong + ":" + error);
            }

            var info = artist + songTitle + album + previewLink;
            fs.appendFile('log.txt', info, function (error) {
                if (error) {
                    console.log(error);
                }

            });


        });
};

function movieThis() {
    if (movieName === "") {
        movieName = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(function (response, err) {


        if (response) {

            console.log("Title: " + response.data.title);
            console.log("Year Released: " + response.data.year);
            console.log("Actors: " + response.data.actors);
            console.log("Plot: " + response.data.plot);
            console.log("Country Filmed: " + response.data.country);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.ratings.rottentomatoes);
            console.log("Language(s): " + response.data.language);

            fs.appendFile('log.txt', record, function (error) {
                if (error) {
                    console.log(error);
                }
                else console.log("updated txt file");
            });

        } else {
            console.log("Movie not found." + error);
            return;
        }

    });
};



function concertThis() {

    if (artist === "") {
        artist = "JanetJackson"
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // console.log(queryURL);
    // request(queryUrl, function (error, response, body)  {
    axios.get(queryUrl).then(function (response, error) {
        if (response) {

            var info = response.data[0];
            var venue = "Venue: " + info.venue.name;
            var venueLocation = "Venue Location: " + info.venue.city;
            var time = info.datetime;
            var removeTime = time.split('T');
            var venueDate = "Venue Date: " + moment(removeTime[0]).format("MM/DD/YYYY");
            var record = venue + "," + venueLocation + "," + venueDate;

            console.log(venue);
            console.log(venueLocation);
            console.log(venueDate);

            fs.appendFile('log.txt', record, function (error) {
                if (error) {
                    console.log(error);
                }
                else console.log("updated txt file");
            });

        } else {
            console.log(error);
        }
    });

}


function doThis() {

    fs.readFile("random.txt", "utf-8", (error, data)); {
               if (error) {
            return console.log(error);
        }else{
            var dataArr = data.split(",");
            action = dataArr[0];
            songName = dataArr[1];
            var artistSong = action + " " + songName;

            spotifyThisSong();
        }

    
    }
}




