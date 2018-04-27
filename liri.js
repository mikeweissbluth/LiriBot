//requiring the dotenv file
require("dotenv").config();

//NPM package needs a require
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//importing keys from the .js file
var keys = require("./key.js")


//securely accessing the keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


console.log(process.argv[2]); 

//a variable to store the third variable in the command line array- which is the user input
var command=process.argv[2];

 //build a condition if the command is equal to the command to run twitter then the request it will run twitter
    if (command == 'my-tweets'){
        var params = {screen_name: '@McFreelyAyeP'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
            // console.log(tweets[0]);
                var tweetsArray=tweets.slice(0,20);
                //for loop
                tweets.forEach(function(tweet) { console.log(tweet.text) });
          }
     });

    }
    //         provide info about the song. Artist(s) * The song's name  * A preview link of the song from Spotify * The album that the song is from */
//* If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (command == 'spotify-this-song'){
        // #38 if the user inputs spotify this song.
        // #41 if the user doesn't provide input then...
        if (process.argv[3] == null) {
            var params = {songName: "The Sign" + " By Ace of Base"}
        }else {
            // we want to assign the variable params to an object that stores the 4th user input.
            var params = {songName: process.argv[3]};
        }
//The following is the main engine for searching spotify API for songs thru user input or hardcoded data
        spotify.search({ type: 'track', query: params.songName, limit: 1,}, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
              }
              //logging the entire JSON
              //console.log(data.tracks); 
              let albumName= data.tracks.items[0].name;
              console.log(albumName)
              let linkURL= data.tracks.items[0].preview_url;
              console.log(linkURL);
            });     
     }
//});
  //  }
    if (command == 'movie-this'){
        // get movie info if no movie is provided then the program will run Mr. Nobody.  * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

        //Here is my key: dd05484a
        var movieName = process.argv[3];
        if (movieName == undefined) {
            movieName = "Mr.Nobody"
        }

        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        console.log(queryUrl);


        request(queryUrl, function(error, response, body){
            if (error){
                console.log(error);
            }

            // console.log('modifier: ' + modifier);
        console.log('Title: ' + JSON.parse(body).Title);
        console.log('Year: ' + JSON.parse(body).Year);
        console.log("Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log('Country: ' + JSON.parse(body).Country);
        console.log('Language: ' + JSON.parse(body).Language);
        console.log('Plot: ' + JSON.parse(body).Plot);
        console.log('Actors: ' + JSON.parse(body).Actors);

        });
        
    }

    if (command == 'do-what-it-says'){
         //     * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        if (userInput === "movie-this"){
            var request = require("request");
            var movieName = process.argv[3];
            // Then run a request to the OMDB API with the movie specified
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
            console.log(queryUrl);
            // Then create a request to the queryUrl
          
            request("http://www.omdbapi.com/?t=" + movieName+ "&y=&plot=short&apikey=trilogy", function(error, response, body) {
                // If the request was successful...
                if (!error && response.statusCode === 200) {
    
                    // Then log the body from the site!
                    console.log(body);

            
                }
            });
    }


    }
    