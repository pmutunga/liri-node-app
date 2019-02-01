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
var searchText = " ";
var searchThis = " ";
var userChoice = " ";

// TO-DO: capture inputCommand and inputSearch - > consert-this; spotify-this-song; movie-this, do-what it says

//capture user input

userChoice = process.argv[2];
var userSearch = process.argv[3]; 



//handle user input that's a sentence - e.g. for movie good will hunting.
// Get all elements in process.argv, starting from index 3 to the end
// Join them into a string to get the + delimited user search
var userSearchArray = [];
userSearchArray = process.argv.slice(3);

//Create Functions++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//create function that checks user input and determines what to do.

function processInput(doThis, userSearchArray){


    //console.log(inputCommand);
  
   
      switch(doThis){

      case "concert-this":
              if(userSearchArray.length ===0){
              searchThis = undefined;
              concertThis(searchThis);}
              else {
              searchThis = userSearchArray.join(" ");
              concertThis(searchThis)}; break;
      case "spotify-this-song":
            //If user has not specified a song , use default
            if(userSearchArray.length ===0){
              searchThis = undefined;
              spotifyThis(searchThis);}
              else {
            // console.log(defaultSong);
              searchThis = userSearchArray.join(" ");
              spotifyThis(searchThis)}; break;
      
      case "movie-this":
            if(userSearchArray.length ===0){
              searchThis = undefined;
              movieThis(searchThis);}
              else {
            searchThis = userSearchArray.join("+");
            var saveSearchThis= userSearchArray.join(" ");
            movieThis(searchThis, saveSearchThis)}; break;
      case "do-what-it-says":
          doWhatItSays(); break;
      default: 
      console.log("Invalid command. Please type any of the following commnds: concert-this spotify-this-song movie-this or do-what-it-says");
        } //end of case
    
} //end of processInput 


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
    // console.log(concertURL);
    //Get concert data using request. TO-DO - understand how request works.

    request(concertURL, function (error, response, body) {

      if(error){
        console.log('error:', error); // Print the error if one occurred
      } else {
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var json= JSON.parse(response.body);
        //console.log(json[0]);
        var thisEvent = json[0];
        //console.log("+++++++++++++End of Bands in Town data ++++++++++++++++++++++++++++");
        // var artist = thisEvent.lineup;
        // console.log("Artist: " + artist);
        var concertVenue = thisEvent.venue.name;
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("Concert Venue: " + concertVenue);
        var concertLocation = thisEvent.venue.city;
        console.log("Event location: " + concertLocation);
        var concertDate = thisEvent.datetime;
        console.log(moment(concertDate).format("MM/DD/YYYY"));
        console.log("========================================================");
    
       saveSearchData = "\n" + searchThis + "\n_____________________________"+ "\nConcert Venue: " + concertVenue + "\nEvent location: " + concertLocation + "\n" + moment(concertDate).format("MM/DD/YYYY") + "\n==================================" + "\n";

       saveSearch(saveSearchData);
 
      } //end of else
      });

}

//spotifyThis+++++++++++++++++++++++++++++++++++++++++++
//node liri.js spotify-this-song '<song name here>'
//No song provided,  default to "The Sign" by Ace of Base.

function spotifyThis(searchThis){
   
    // console.log(searchThis);

    if(searchThis === undefined){
      searchThis = defaultSong;
     
    }

    //fetch data from spotify api
      spotify.search({ type: 'track', query: searchThis }).then(function(response) {
      // console.log(response); 
      
      //saveSearch(userChoice, searchThis, searchData);//save uer search in random.txt using fs
      console.log("\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
      //console.log("Artist:" + response.artist "\nThe song's name" + response.songName + "\nA preview link of the song from Spotify" + response.Preview + "\nThe album that the song is from" + response.Album);
      console.log("|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|")
      console.log("\================= LIRI FOUND THIS FOR YOU...==================");
      var songData = response.tracks.items;
      for(var i=0; i<songData.length; i++){
      console.log("Artists: " + response.tracks.items[i].artists[0].name);
      console.log("Song Name: " + response.tracks.items[i].name);
      console.log("Preview URL: " + response.tracks.items[i].preview_url);
      console.log("Album: " + response.tracks.items[i].album.name);
      console.log("|______________________________________|")

      saveSearchData = "\n" + searchThis + "\n_____________________________" + "\nArtists: " + response.tracks.items[i].artists[0].name + "\nSong Name: " + response.tracks.items[0].name + "\nPreview URL: " + response.tracks.items[i].preview_url + "\n==================================" + "\nAlbum: " + response.tracks.items[0].album.name + "\n";

      saveSearch(saveSearchData);
      }

  }); //end of spotify search
} //end of spotify-this
// movie-this========================================================


function movieThis(searchThis, searchToSave){

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

        saveSearchData = "\n" + searchToSave + "\n_____________________________" + "\nTitle: " + json.Title + "\nYear Released: " + json.Year + "\nIMDB Rating: " + json.imdbRating + "\nRotten Tomatoes Rating:" + rtRating + "\nYear Released: " + json.Year + "\nIMDB Rating: " + json.imdbRating + "\nRotten Tomatoes Rating:" + rtRating + "\nCountry: " + json.Country + "\nLanguage: " + json.Language + "\nPlot: " + json.Plot + "\nActors: " + json.Actors + "\n==================================" + "\n";
        //save output to log.txt
        saveSearch(saveSearchData);
        // fs.appendFile("log.text", saveSearchData, function(err){
        //   if(err){
        //     console.log(err)
        //   } else{
        //     console.log("content added!")
        //   }
        // }) //end of fs
    
      });
    }
  }

function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err)

    } else {
      console.log(data);
      var doWhatArr = data.split(";");
      // console.log(doWhatArr);

       // Loop Through the newly created output array
  for (var i = 0; i < doWhatArr.length; i++) {

    // Print each element (item) of the array/
    // console.log(doWhatArr[i]);
    var searchdata = doWhatArr[i].split(",");
    // console.log(searchdata[0]);
    // console.log(searchdata[1]);
    userChoice = searchdata[0];
    searchThis = searchdata[1];
    // console.log("userchoice: " + userChoice + " userSearchArray: " + userSearchArray);
    switch(userChoice) {
      case "movie-this":
      movieThis(searchThis); break;
      case "concert-this":
      concertThis(searchThis); break;
      case "spotify-this-song":
      spotifyThis(searchThis); break;
      default:
      console.log("Enjoy movies, concerts and songs with liri");
    }
  }

    }
  }); //end of fs

} //end of dowhatitsays()



//Add search to random.txt

  function saveSearch(searchData) {
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    // console.log("Save this search " + saveCommand + " , " + saveSearch);
    // searchText = "\n \" " + saveCommand + "," + "\" \" " + saveSearch + "\n";
    fs.appendFile("log.txt", searchData, function(err) {
      if (err) {
        console.log(err);
      }
    
      //random.txt
      // If no error is experienced, we'll log the phrase "Content Added" to our node console.
      //else {
        //console.log("Search Content Added!");
      //}
    });
  }
  

//call functions+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// testApp();
processInput(userChoice, userSearchArray);