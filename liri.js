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

//a variable to store the third variable in the command line array
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
        var params = {songArtist: "Michael Jackson", songName: "Thriller", };
        var fullSong = params.songArtist + params.songName
        console.log(params);
        console.log(fullSong);
        spotify.search({ type: 'track', query: "thriller", limit: 1,}, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
              }
              console.log(data.tracks); 
              let albumName= data.tracks.items[0].name;
              console.log(albumName)
              let albumName= data.tracks.items[0].preview_url;
            });
        
     }
//});
  //  }
    if (command == 'movie-this'){
        // get movie info if no movie is provided then the program will run Mr. Nobody.  * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.
    }
    if (command == 'do-what-it-says'){
         //     * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
        //    * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
   
        //    * Feel free to change the text in that document to test out the feature for other commands.
    }
    

// NPM Package is needed for spotify
