//Read and set environment variables with the dotEnv package
require("dotenv").config();

//Import node-spotify-api
var Spotify = require("node-spotify-api"); 

//Import the keys used by node-spotify-api
var keys    = require("./keys.js");
//console_log (keys.spotify); 
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


//////////////////////////////////////////////////////
function printUsage () {
    console.log ("USAGE : \nnode liri.js <command> [<argument>]\nWhere <command> is one of:\n" + 
                  "concert-this\nspotify-this-song\nmovie-this\ndo-what-it-says\n");
}
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
    case '' :
    default : {
        console_log (`Sorry, I don't recognize this command : ${commandToExecute}`);
        printUsage();
    }

  }
}


///////////////////////////////////////////////////
function concertThis( searchTerm ) {

    //debugger 
    //console_log (`concertThis: ${searchTerm}`);

    //Replace any whitespace in the searchTerm with '%20'
    newSearchTerm = searchTerm.replace( /\s/g, "%20" );
    
    //Build the query URL
    var queryUrl = "https://rest.bandsintown.com/artists/" + newSearchTerm + "/events?app_id=codingbootcamp";

    //Call API using axios GET
    axios.get( queryUrl ).then ( 
        function(response) {
        
        //     console_log (response.data);
        //     console_log (typeof response.data); 
            
          console_log('-----------------------------------------------------------');
                
            if ( !(response.data.includes("Not found}")) && (response.data.length > 0) ) {
                
                
                // Print the number of events found, if any.
                console_log( `${response.data.length} events found for artist ${searchTerm}` );

                //For each event found, print the info
                response.data.forEach( function( eventObject ) {
                   // console_log( moment(eventObject.datetime, "YYYY-MM-DDTHH:mm:ss").inspect()); 

                    var formatDateTime = moment(eventObject.datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY");
                  console_log(` -- ${eventObject.venue.name} (${eventObject.venue.city}, ${eventObject.venue.country}) on ${formatDateTime} `);
                });
            } else {
                console_log(`Sorry.  No events found for artist ${searchTerm}`);
            }
            console_log('-----------------------------------------------------------');

        }
    ).catch (function (error) {
        console_log(`HTTP call was initiated, but an error occurred.  The error is ${error}`) ;  
        if(error.response) {
            // The request was made and the server responded with a status code
            // that calls out of the range of 2xx
            console_log("---------------Data-----------------");
            console_log(error.response.data); 
            console_log("---------------Status---------------");
            console_log(error.response.status);
            console_log("---------------Status---------------");
            console_log(error.response.headers);
        }
    });

}

///////////////////////////////////////////////////
function spotifyThis(searchTerm) {
   
    //console_log (`spotifyThis: ${searchTerm}`);

    if ( !searchTerm ) {
        searchTerm = "The Sign Ace Of Base";
    }
  
    spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function(err, data) {
    if (err) {
        return console_log('Error occurred: ' + err);
    }

   //console_log(JSON.stringify(data, null, 2));  
   
    
   if (data.tracks.items.length === 0) {
       console_log ("Sorry, I could not find that song."); 
   }
   else {
    //console_log( `${data.tracks.items.length} track(s) found.`);
    console_log('-----------------------------------------------------------');
    console_log( `Artist Name: ${data.tracks.items[0].album.artists[0].name}`);
    console_log( `Song Name  : ${data.tracks.items[0].name}`);
    console_log( `Preview URL: ${data.tracks.items[0].preview_url}`);
    console_log( `Album  Name: ${data.tracks.items[0].album.name}`);
    console_log('-----------------------------------------------------------');
   }

    });
}

///////////////////////////////////////////////////
function movieThis(searchTerm) {
    
    

      //Update the search term to a default value if empty.
      if ( !searchTerm ) {
         searchTerm = "Mr. Nobody";
      }

      //console_log (`movie-this: ${searchTerm}`);

      // Here we construct our URL
      var queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&apikey=trilogy";

      axios.get( queryURL ).then ( 
          
        function(response) { 
            //console_log(response.data);

            if (response.data.Response !== "False") {
                console_log('-----------------------------------------------------------');
                console_log( `Movie Title: ${response.data.Title}`);
                console_log( `Year       : ${response.data.Year}`);
                console_log( `Rating     : ${response.data.Rated}`);

                response.data.Ratings.forEach ( function (ratingObject, index) {
                if (ratingObject.Source === "Rotten Tomatoes") {
                    console_log( `Rotten Tomatoes Rating: ${ratingObject.Value}` );
                }
                });

                console_log( `Plot       : ${response.data.Country}`);
                console_log( `Language   : ${response.data.Language}`);
                console_log( `Plot       : ${response.data.Plot}`);
                console_log( `Actors     : ${response.data.Actors}`);

                console_log('-----------------------------------------------------------');
            }
            else {
                console_log(`${searchTerm} : ${response.data.Error}`);
            }
          }
      ).catch (function (error) {
        console_log(`HTTP call was initiated, but an error occurred. \nThe error is ${error}`) ;  
        if(error.response) {
            // The request was made and the server responded with a status code
            // that calls out of the range of 2xx
            console_log("---------------Data-----------------");
            console_log(error.response.data); 
            console_log("---------------Status---------------");
            console_log(error.response.status);
            console_log("---------------Status---------------");
            console_log(error.response.headers);
        }
    });
}

///////////////////////////////////////////////////
function doWhatItSays(searchTerm) {
    
    //console_log (`doWhatItSays`);

    //Open the file with the commands to execute.
    fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
        return console_log(error);
    }
    
    // We will then print the contents of data
    //console_log(data);
    
    // Then split it by line (to allow processing of multiple commands).
    var dataArr = data.split("\n");
    
    // We will then re-display the content as an array for later use.
    //console_log(dataArr);

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


//////////////////////////////////////////////////////
// Writes the passed string to log.txt and the console

function console_log ( string ) {

    //Use the synchronous call for appending the file 
    // to prevent out of order lines .

    try {
        fs.appendFileSync('log.txt', string + "\n");
      } catch (err) {
        throw err;
      }
   
    //Now write to the console using the standard console.log
    console.log(string);
}
