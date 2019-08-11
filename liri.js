//Read and set environment variables with the dotEnv package
require("dotenv").config();

//Import node-spotify-api
var Spotify = require("node-spotify-api"); 

//Import the keys used by node-spotify-api
var keys    = require("./keys.js");
//console.log (keys.spotify); 
var spotify = new Spotify(keys.spotify);

//Import the axios package
var axios = require("axios"); 

//Import the Noments package
var moment = require ("moment"); 

fs = require('fs'); 

// Allowed Commands:
//
// concert-this
//
// spotify-this-song
//
// movie-this
//
// do-what-it-says

var commandToExecute = process.argv[2];
var commandArguments = process.argv[3];
processCommand (commandToExecute, commandArguments); 


///////////////////////////////////////////////////////////////////////////////
function processCommand( commandToExecute, commandArguments)  {

  switch (commandToExecute) { 

    case 'concert-this' : {
        concertThis(commandArguments);
    }
    break;
    case 'spotify-this-song' : {
        spotifyThis(commandArguments); 
    }
    break;
    case 'movie-this' : {
        movieThis(commandArguments); 
    }
    break;
    case 'do-what-it-says' : {
        doWhatItSays(); 
    }
    break;
    default : {
        console.log (`Sorry, I don't recognize this command : ${commandToExecute}`);
    }

  }
}


///////////////////////////////////////////////////
function concertThis( searchTerm ) {

    //debugger 
    //console.log (`concertThis: ${searchTerm}`);

    //Replace any whitespace in the searchTerm with '%20'
    newSearchTerm = searchTerm.replace( /\s/g, "%20" );
    
    //Build the query URL
    var queryUrl = "https://rest.bandsintown.com/artists/" + newSearchTerm + "/events?app_id=codingbootcamp";

    //Call API using axios GET
    axios.get( queryUrl ).then ( 
        function(response) {
        
        //     console.log (response.data);
        //     console.log (typeof response.data); 
           
            if ( !(response.data.includes("Not found}")) && (response.data.length > 0) ) {
                
                // Print the number of events found, if any.
                console.log( `${response.data.length} events found for artist ${searchTerm}` );

                //For each event found, print the info
                response.data.forEach( function( eventObject ) {
                   // console.log( moment(eventObject.datetime, "YYYY-MM-DDTHH:mm:ss").inspect()); 

                    var formatDateTime = moment(eventObject.datetime, "YYYY-MM-DDTHH:mm:ss").format("dd, MMM DD YYYY");
                  console.log(` -- ${eventObject.venue.name} (${eventObject.venue.city}, ${eventObject.venue.country}) on ${formatDateTime} `);
                });
            } else {
                console.log(`Sorry.  No events found for artist ${searchTerm}`);
            }
        }
    ).catch (function (error) {
        console.log(`HTTP call was initiated, but an error occurred.  The error is ${error}`) ;  
        if(error.response) {
            // The request was made and the server responded with a status code
            // that calls out of the range of 2xx
            console.log("---------------Data-----------------");
            console.log(error.response.data); 
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        }
    });

}

///////////////////////////////////////////////////
function spotifyThis(searchTerm) {
   
    //console.log (`spotifyThis: ${searchTerm}`);

    if ( !searchTerm ) {
        searchTerm = "The Sign Ace Of Base";
    }
  
    spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

   //console.log(JSON.stringify(data, null, 2));  
   
    
   if (data.tracks.items.length === 0) {
       console.log ("Sorry, I could not find that song."); 
   }
   else {
    console.log( `${data.tracks.items.length} track(s) found.`);
    console.log('-----------------------------------------------------------');
    console.log( `Artist Name: ${data.tracks.items[0].album.artists[0].name}`);
    console.log( `Song Name  : ${data.tracks.items[0].name}`);
    console.log( `Preview URL: ${data.tracks.items[0].preview_url}`);
    console.log( `Album  Name: ${data.tracks.items[0].album.name}`);
    console.log('-----------------------------------------------------------');
   }

    });
}

///////////////////////////////////////////////////
function movieThis(searchTerm) {
    
    

      //Update the search term to a default value if empty.
      if ( !searchTerm ) {
         searchTerm = "Mr. Nobody";
      }

      //console.log (`movie-this: ${searchTerm}`);

      // Here we construct our URL
      var queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&apikey=trilogy";

      axios.get( queryURL ).then ( 
          
        function(response) { 
            //console.log(response.data);

            if (response.data.Response !== "False") {
                console.log('-----------------------------------------------------------');
                console.log( `Movie Title: ${response.data.Title}`);
                console.log( `Year       : ${response.data.Year}`);
                console.log( `Rating     : ${response.data.Rated}`);

                response.data.Ratings.forEach ( function (ratingObject, index) {
                if (ratingObject.Source === "Rotten Tomatoes") {
                    console.log( `Rotten Tomatoes Rating: ${ratingObject.Value}` );
                }
                });

                console.log( `Plot       : ${response.data.Country}`);
                console.log( `Language   : ${response.data.Language}`);
                console.log( `Plot       : ${response.data.Plot}`);
                console.log( `Actors     : ${response.data.Actors}`);

                console.log('-----------------------------------------------------------');
            }
            else {
                console.log(`${response.data.Error}`);
            }
          }
      ).catch (function (error) {
        console.log(`HTTP call was initiated, but an error occurred. \nThe error is ${error}`) ;  
        if(error.response) {
            // The request was made and the server responded with a status code
            // that calls out of the range of 2xx
            console.log("---------------Data-----------------");
            console.log(error.response.data); 
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        }
    });
}

///////////////////////////////////////////////////
function doWhatItSays(searchTerm) {
    
    console.log (`doWhatItSays`);

    //Open the file with the commands to execute.
    fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
        return console.log(error);
    }
    
    // We will then print the contents of data
    console.log(data);
    
    // Then split it by line (to allow processing of multiple commands).
    var dataArr = data.split("\n");
    
    // We will then re-display the content as an array for later use.
    console.log(dataArr);

    dataArr.forEach( function (line) {

      if (line.length > 0) {
        var commandLine      = line.split(",");
        var commandToExec    = commandLine[0];
        var commandArguments = commandLine[1];
        processCommand(commandToExec, commandArguments); 
      }
    });
  });
}
