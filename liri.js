require("dotenv").config();
var request = require("request");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var type = process.argv[2];
var userInput = process.argv.slice(3).join("%20");
const chalk = require('chalk');


/////////////// SPOTIFY
var spotifyThisSong = function () {

    if (!userInput) {
        userInput = "the sign ace of base";
    }

    spotify.search({
            type: 'track',
            query: userInput
        },

        function (error, data) {
            if (error) {
                console.log("Error: " + error);
            } else {
                for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                    if (i === 0) {
                        console.log("\nArtist(s): " + data.tracks.items[0].artists[i].name);
                    } else {
                        console.log("\n " + data.tracks.items[0].artists[i].name);
                    }
                }
                console.log("\nSong: " + data.tracks.items[0].name);
                console.log("\nAlbum: " + data.tracks.items[0].album.name);
                console.log("\nPreview Link: " + data.tracks.items[0].preview_url + "\n");
            }
        });
}

////////////    OMDB
var movieThis = function () {
    var movieName = userInput;

    if (!movieName) {
        movieName = "Mr Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    //debug URL
    // console.log(queryUrl);

    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // * Title of the movie. 
            console.log("\nTitle: " + JSON.parse(body).Title)
            // * Year the movie came out.
            console.log("Release Year: " + JSON.parse(body).Year)
            // * IMDB Rating of the movie.
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
            // * Country where the movie was produced.
            console.log("Country: " + JSON.parse(body).Country)
            // * Language of the movie.
            console.log("Language: " + JSON.parse(body).Language)
            // * Plot of the movie.
            console.log("Plot: " + JSON.parse(body).Plot)
            // * Actors in the movie.
            console.log("Actors: " + JSON.parse(body).Actors)
            // * Rotten Tomatoes Rating of the movie.

            for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
                if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                }
            }
        }
    });
};


///////////// BANDS IN TOWN
var concertThis = function () {
    var artist = userInput;
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    //debug URL
    // console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            // Save band data in variable
            var bandData = JSON.parse(body);
            console.log(bandData)

            console.log(chalk.bold(" Concert Information:\n"));
            // console.log(artist)

            for (i = 0; i < bandData.length; i++) {
                // console.log("length of band data array" + bandData.length)
                if (bandData.length <= 0) {
                    console.log(chalk.red("\nNo concert information on this artist: " + artist + "!\n"));
                } else {
                    // Name of Artist
                    var lineup = bandData[i].lineup[0];
                    console.log(chalk.bold.magenta("Artist: " + lineup));

                    //Name of venue, Venue location, Date of event (MM/DD/YYYY)
                    console.log(chalk.yellow("Venue: " + bandData[i].venue.name));

                    var location = bandData[i].venue.region;
                    if (!location) {
                        console.log(chalk.yellow("Location: " + bandData[i].venue.city + ", " + bandData[i].venue.country))
                    } else {
                        console.log(chalk.yellow("Location: " + bandData[i].venue.city + ", " + location))
                    }

                    var date = moment(bandData[i].datetime).format("MM/DD/YYYY");
                    console.log(chalk.bold.blueBright("Date: " + date + "\n"));
                }
            }
        } else {
            console.log(chalk.red("\nPlease enter a band or artist!\n"));
        }
    });
};


//// run functions based on the type requested

if (type === "spotify-this-song") {
    console.log("Loading song...")
    spotifyThisSong(userInput);
} else if (type === "movie-this") {
    console.log("Loading movie...")
    movieThis(userInput);
} else if (type === "concert-this") {
    console.log("Loading concert details...")
    concertThis(userInput);
} else if (type === "do-what-it-says") {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (!error) {
            var formatData = data.split(",");
            // console.log(formatData)
            var spotifyCommand = formatData[0];
            var spotifySong = formatData[1];

            if (spotifyCommand === "spotify-this-song") {
                userInput = spotifySong;
                spotifyThisSong(spotifySong)
            }
        }
    });
} else if (!type) {
    console.log(chalk.red("\nPlease enter a valid search type:\n\nSpotify: spotify-this-song\nOMDB: movie-this\nBands In Town: concert-this\n"));
}