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
var doThis = "";
var searchThis = "";

// TO-DO: capture inputCommand and inputSearch - > consert-this; spotify-this-song; movie-this, do-what it says

//capture user input



//TO-DO - Create Functions++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//create function that checks user input and determines what to do.

function processInput(doThis, searchThis){

    doThis = process.argv[2];
    searchThis = process.argv[3];
    // console.log("User would like to " + doThis + " for " + searchThis);
	//console.log(inputCommand);

	switch(doThis){

    case "concert-this":
        console.log(doThis + " " + searchThis); //test user inputs
        console.log("concerts coming up"); 
        concertThis(searchThis); break;
	case "spotify-this-song":
		//If user has not specified a song , use default
		/*if(searchThis === undefined){
			searchThis = defaultSong;
		}     
        spotifyThis(searchThis); break;*/
        console.log(doThis + " " + searchThis); //test user inputs
        console.log("songs coming up"); break;
	case "movie-this":
		//If user has not specified a movie Name , use default
		/*if(searchThis === undefined){
			searchThis = defaultMovie;
		}    
        movieThis(searchThis); break;*/
        console.log(doThis + " " + searchThis); //test user inputs
        console.log("movies coming up"); break;
	case "do-what-it-says":
        // doWhatItSays(); break;
        console.log(doThis + " " + searchThis); //test user inputs
        console.log("whatever coming up"); break;
	default: 
		console.log("Invalid command. Please type any of the following commnds: concert-this spotify-this-song movie-this or do-what-it-says");
}

}
// concert-this++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//node liri.js concert-this <artist/band name here>
// search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
// print

function concertThis(searchThis){
    
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

function spotifyThis(){
    
    //capture user input

    //generate concertURL

    //fetch data from spotify api
    spotify.search({ type: 'track', query: 'All the Small Things' }).then(function(response) {
        console.log(response);
        console.log("\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        //console.log("Artist:" + response.artist "\nThe song's name" + response.songName + "\nA preview link of the song from Spotify" + response.Preview + "\nThe album that the song is from" + response.Album);
      })
      .catch(function(err) {
        console.log(err);
      });
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
  console.log("+++++++++++++End of Bands in Town test ++++++++++++++++++++++++++++")
});
}

//call functions+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// testApp();
processInput();