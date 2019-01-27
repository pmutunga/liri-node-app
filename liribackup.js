require("dotenv").config(); //read and set any environment variables with the dotenv package:

// Add the code required to import the keys.js file and store it in a variable.



/*var spotify = new Spotify(keys.spotify); // access keys information*/

/*Make it so liri.js can take in one of the following commands:

concert-this

spotify-this-song

movie-this

do-what-it-says */

var request = require('request'); //request will be used to grab data from OMDB API and Bands in Town API

var concertURL = "https://rest.bandsintown.com/artists/drake/events?app_id=codingbootcamp"; //will be used for OMDB abd Bands in town searches
var movieName = "";
// var movieURL = "http://www.omdbapi.com/?t=titans&y=&plot=short&apikey=trilogy";

var axios = require("axios");
// concert-this======================================================

//node liri.js concert-this <artist/band name here>
        // search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

        
function concert(searchstring){
    console.log(searchstring);
    request.get(searchstring).then("response", function(response) {
    console.log(response)
    console.log(JSON.parse(response)) // 
  
  })

}

// concert(concertURL);

        // Name of the venue
        // Venue location
        // Date of the Event (use moment to format this as "MM/DD/YYYY")

/*/ spotify-this-song=================================================

        //node liri.js spotify-this-song '<song name here>'

        // This will show the following information about the song in your terminal/bash window

        // Artist(s)

        // The song's name

        // A preview link of the song from Spotify

        // The album that the song is from

        // If no song is provided then your program will default to "The Sign" by Ace of Base.

        var Spotify = require("node-spotify-api");
 
        var spotify = new Spotify({
          id: //<your spotify client id>,
          secret: // <your spotify client secret>
        });
         
        spotify.search({ type: "track", query: "All the Small Things" }, function(err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
         
        console.log(data); 
        }); */

// movie-this========================================================
/*node liri.js movie-this '<movie name here>'

This will output the following information to your terminal/bash window:

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

OMDB API requires an API key. You may use trilogy.
It's on Netflix!*/

//Test Movie using axios
/*function movie(movieURL){
    console.log(movieURL);

  axios.get(movieURL).then(
  function(response) {
    console.log("The title of the movie is:" + response.data.Title) // * Title of the movie.
    console.log("The year the movie was released is:" + response.data.Year)// * Year the movie came out.
    console.log("The IMDB Rating of the movie is:" + response.data.imdbRating)// * IMDB Rating of the movie.

    //get Rotten tomatoes rating
    var ratings = response.data.Ratings;
    var rottenT;
    ratings.forEach(function(source) {
      
      if(source.Source === "Rotten Tomatoes"){
        rottenT = source.Value;
      }
    });
    console.log("The Rotten Tomatoes Rating of the movie of the movie is:" + rottenT);// * Rotten Tomatoes Rating of the movie.
    console.log("The country where the moview was produced is: " + response.data.Country)// * Country where the movie was produced.
    console.log("The language of the movie is: " + response.data.Language);// * Language of the movie.
    console.log("The plot of the move is: " + response.data.Plot);// * Plot of the movie.
    console.log("The actors in the movie are: " + response.data.Actors);// * Actors in the movie.
  }
);
}

movie(movieURL);
//movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";*/

//movie function using request

function movieThis(movieName){
  console.log(movieName);
  
}

movieThis(frozen);

// do-what-it-says===================================================
/*
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

Edit the text in random.txt to test out the feature for movie-this and concert-this.
*/
