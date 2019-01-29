//TO-DO - #1 Get Node-Spotify-API; Request //Moment/DotEnv. Test Bands in Town API and OMDB API and understand how to get data and the type of response I get. - done

//TO-DO - #2. initialize package.json - done

//TO-DO #3 - make a .gitignore, keys.js, .env files - done

//TO-DO: Get Spotify APS keys and update keys.js - done

//TO-DO: Make random.txt file and add "I want it this way" - done

//TO-DO: install moment - done

//Declare variables and dependencies

require("dotenv").config(); //add code to read and set any environment variables with the dotenv package

var fs = require("fs");
var keys = require("./keys.js"); // Add the code required to import the keys.js file and store it in a variable.
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var defaultSong = "Ace of Base The Sign";
var defaultConcert = "Pink";

// TO-DO: capture inputCommand and inputSearch - > consert-this; spotify-this-song; movie-this, do-what it says

//capture user input

var userChoice = process.argv[2];
var userSearch = process.argv[3]; 



//TO-DO -handle user input that's a sentence - e.g. for movie good will hunting.
// Get all elements in process.argv, starting from index 3 to the end
// Join them into a string to get the + delimited user search
var userSearchArray = [];
userSearchArray = process.argv.slice(3);
console.log("user search array is: " + userSearchArray);
var searchString = userSearchArray.join("-");
console.log("array to string: " + searchString);

var userMovieSearch = userSearchArray.join("+"); //this works for OMDB but not spotify.
console.log(userMovieSearch);


var userGenericSearch =  userSearchArray.join(" "); //this will work for spotify but not OMDB
console.log(userGenericSearch);


//TO-DO - Create Functions++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//create function that checks user input and determines what to do.

function processInput(doThis, userSearchArray){

  //how do I pass the value of doThis and searchThis to processInput? - Pass the variables as arguments
    console.log("User would like to " + doThis + " for " + userSearchArray);
	//console.log(inputCommand);

	switch(doThis){

    case "concert-this":
          if(userSearchArray.length ===0){
            searchThis = undefined;
            concertThis(searchThis);} 
            else {
            searchThis = userSearchArray.join(" ");
            console.log(doThis + " " + searchThis); //test user inputs
            console.log("concerts coming up"); 
            concertThis(searchThis)
            }; break;
	  case "spotify-this-song":
          //If user has not specified a song , use default
          // console.log(defaultSong);
          if(userSearchArray.length ===0){
            searchThis = undefined;
            console.log("run spotify-this function for " + searchThis + "+======================+");
            spotifyThis(searchThis);
          } else {
            searchThis = userSearchArray.join(" ");
            console.log(doThis + " " + searchThis); //test user inputs
            console.log("your search for " + searchThis + " coming up");
            console.log("run spotifythis function +======================+")
            
            spotifyThis(searchThis)}; break;
     
	  case "movie-this":
          //If user has not specified a movie Name , use default
          if(userSearchArray.length === 0){
            searchThis = undefined;
            console.log("movie info coming up for " + searchThis); //test user inputs
            movieThis(searchThis); 
          }    else {
          searchThis = userSearchArray.join("+");
          // console.log(doThis + " " + searchThis); //test user inputs
          console.log("movie info coming up for " + searchThis); //test user inputs
          movieThis(searchThis); 
          } break;
	/*case "do-what-it-says":
        // doWhatItSays(); break;
        console.log(doThis + " " + searchThis); //test user inputs
        console.log("whatever coming up"); break;*/
	default: 
		console.log("Invalid command. Please type any of the following commnds: concert-this spotify-this-song movie-this or do-what-it-says");
}

}
// concert-this++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//node liri.js concert-this <artist/band name here>
// search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
// print

function concertThis(searchThis){

    if(searchThis === undefined){
      searchThis = defaultConcert;
    }
    
    //generate concertURL
    var concertURL = "https://rest.bandsintown.com/artists/" + searchThis + "/events?app_id=codingbootcamp"
    console.log(concertURL);
    //Get concert data using request. TO-DO - understand how request works.

    request(concertURL, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var json= JSON.parse(response.body);
        //console.log(json[0]);
        var thisEvent = json[0];
        //console.log("+++++++++++++End of Bands in Town data ++++++++++++++++++++++++++++");
        var artist = thisEvent.lineup;
        console.log("Artist: " + artist);
        var concertVenue = thisEvent.venue.name;
        console.log("Concert Venue: " + concertVenue);
        var concertLocation = thisEvent.venue.city;
        console.log("Event location: " + concertLocation);
        var concertDate = thisEvent.datetime;
        console.log(moment(concertDate).format("MM/DD/YYYY"));
    
        //console.log(" The name of the venue is: " + concertVenue + "\nThe Venue location is: " + concertLocation + "\n The date of the Event is: " + moment.format(concertDate); //(use moment to format this as "MM/DD/YYYY")
      });

}

//spotifyThis+++++++++++++++++++++++++++++++++++++++++++
//node liri.js spotify-this-song '<song name here>'
//No song provided,  default to "The Sign" by Ace of Base.

function spotifyThis(searchThis){
   
    console.log(searchThis);

    if(searchThis === undefined){
      searchThis = defaultSong;
      console.log(searchThis);
    }

    //fetch data from spotify api
      spotify.search({ type: 'track', query: searchThis }).then(function(response) {
      console.log(response);
      console.log("\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
      //console.log("Artist:" + response.artist "\nThe song's name" + response.songName + "\nA preview link of the song from Spotify" + response.Preview + "\nThe album that the song is from" + response.Album);
   console.log("|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|")
      console.log("Artists: " + response.tracks.items[0].artists[0].name);
      console.log("Song Name: " + response.tracks.items[0].name);
      console.log("Preview URL: " + response.tracks.items[0].preview_url);
      console.log("Album: " + response.tracks.items[0].album.name);
      console.log("|______________________________________|")
    })
    .catch(function(err) {
      console.log(err);
    });
      

  
}


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
} */

function movieThis(searchThis){

 //   If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    if(searchThis === undefined){
        console.log("//If you haven't watched \"Mr. Nobody,\" then you should: http:\//www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!")

    } else {
            //generate movieURL
        var movieURL = movieUrl = "http://www.omdbapi.com/?t=" + searchThis + "&y=&plot=short&apikey=trilogy";
        console.log(movieURL);
        //Get movie data using request.

        request(movieURL, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var json= JSON.parse(response.body);
        console.log("==================================");
        //console.log(json);
        console.log("Title: " + json.Title) // * Title of the movie.
        console.log("Year Released: " + json.Year)// * Year the movie came out.
        console.log("IMDB Rating: " + json.imdbRating)// * IMDB Rating of the movie.

         //get Rotten tomatoes rating
        var ratings = json.Ratings;
        var rtRating;
        ratings.forEach(function(source) {
      
        if(source.Source === "Rotten Tomatoes"){
        rtRating = source.Value;
          }
        });
        
        console.log("Rotten Tomatoes Rating:" + rtRating); //Rotten tomato rating
        console.log("Country:" + json.Country); //country
        console.log("Language: " + json.Language);
        console.log("Plot: " + json.Plot);
        console.log("Actors: " + json.Actors);
        console.log("==================================");
    
      });
    }
  }

//test

//test user input, moment
function testApp(){
    console.log(moment().format("LLLL")); //test moment formats

    //test Bands In town api
    //https://rest.bandsintown.com/artists/drake/events?app_id=codingbootcamp
    request("https://rest.bandsintown.com/artists/drake/events?app_id=codingbootcamp", function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  var json = JSON.parse(response.body);
  console.log(json);
  console.log("+++++++++++++End of Bands in Town test ++++++++++++++++++++++++++++");
});
}


//call functions+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// testApp();
processInput(userChoice, userSearchArray);