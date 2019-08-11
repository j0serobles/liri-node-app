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

switch (commandToExecute) { 
    case 'concert-this' : {
        concertThis(process.argv[3]);
    }
    break;
    case 'spotify-this-song' : {
        spotifyThis(process.argv[3]); 
    }
    break;
    case 'movie-this' : {
        movieThis(process.argv[3]); 
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
    console.log (`spotifyThis: ${searchTerm}`);
}

///////////////////////////////////////////////////
function movieThis(searchTerm) {
    console.log (`movie-this: ${searchTerm}`);
}

///////////////////////////////////////////////////
function doWhatItSays(searchTerm) {
    console.log (`doWhatItSays`);
}
