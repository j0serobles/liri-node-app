# LIRI Bot
 * [Overview](#overview)

 * [How To Run](#howToRun)
 
 * [File Structure](#FileStructure)
 
 * [Demo movie](#Demo)
 
 * [Technologies Used](#techsUsed)
 
 * [How To Install](#howToInstall)
 
 * [Support](#support)
 
 
### Overview <a name="overview"></a>

LIRI stands for "Language Interpretation and Recognition Interface".  It is a command line interpreter that takes in parameters and returns results from Spotify music service API, the Open Movie Database API and the "Bands In Town" service API.  The app provides a solution to the problem of searching for this information from a command line setup or in computer systems without a graphical user interface (browser). 

### How To Run <a name="howToRun"></a>

LIRI is very simple to use, just login to your system's command line interpreter (with the node.js environment already setup), and run any of the LIRI commands:
```
node concert-this <artist name>
```
The command above will search the Bands in Town Artist Events API for an artist and render the Name of the venue, the Venue location and the date of the Event for future events (concerts) by that artist.  You must pass an artist name.

```
node spotify-this-song [<song name>]
```
Running the command above will show information about the song: the artist(s), the song's name, a preview link of the song from Spotify and the album that the song is from.  The song name is optional.  If no parameter for a song is passed, LIRI will respond with information about song "The Sign" by Ace of Base.

```
node movie-this [<movie name>]
```
The command above will output the following information :

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
  
  If no movie parameter is passed, LIRI will print out the details of movie [Mr. Nobody](http://www.imdb.com/title/tt0485947/)

```
node do-what-it-says 
```
This will make LIRI run the commands already saved in file 'random.txt' in the current working directory.  For example, if the contents of the file are :
```
$ cat random.txt
spotify-this-song,"I Want it That Way"
spotify-this-song,"Hey Jude"
```
Running the command above will return:
```
$ node liri.js do-what-it-says
-----------------------------------------------------------
Artist Name: Backstreet Boys
Song Name  : I Want It That Way
Preview URL: https://p.scdn.co/mp3-preview/e72a05dc3f69c891e3

Album  Name: The Hits--Chapter One
-----------------------------------------------------------
-----------------------------------------------------------
Artist Name: The Beatles
Song Name  : Hey Jude - Remastered 2015
Preview URL: Not Available
Album  Name: 1 (Remastered)
-----------------------------------------------------------
```

### File Structure <a name="FileStructure"></a>

```
+-+.gitignore -- Files to be ignored by git (node packages and such).
  |
  + README.md -- (This file)
  |
  + hw10_liri_js.mp4 -- Movie demo
  |
  + keys.js -- Contains the keys used for accessing the Spotify API
  |
  + liri.js  -- Contains the program's logic
  |
  + log.txt -- Saved LIRI session output.  Appended to for each command.
  |
  + package-lock.json	-- Created by npm -init
  |
  + package.json  -- Created by npm -init
  |
  + random.txt  -- Command script with instructions for batch execution by LIRI.
```

### Demo <a name="Demo"></a>

A movie showing a sample session for LIRI can be accessed [here](https://engjoserobles-gmail.tinytake.com/tt/MzcwMDg0M18xMTI0ODUzOA)

**NOTE**: For better viewing, set the movie player to "Full Size". 

Following the movie link will take you to another website. 

### Technologies Used <a name="techsUsed"></a>

LIRI is built using javascript and runs in the node.js engine.  It has various dependencies:
* npm package 'env' for handling the API keys as environment variables. 
* npm package 'fs' for file system operations.  Needed for reading and writing the random.txt and log.txt files.
* npm pakcage 'axiom' for http GET calls to the API's.
* npm package 'node-spotify-api' for accessing the Spotify service's APIs.
* npm package 'moment.js' for handling and formatting Date() objects. 

### How To Install <a name="howToInstall"></a>

To install LIRI on your local machine:
1. Clone the GitHub Repository for [LIRI](https://github.com/j0serobles/liri-node-app) on your local machine.
2. Obtain an API key and secret key from the Spotify API:

     * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
     
     * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
     
     * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

     * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values into a local hidden file called ```.env```
     The contents of ```.env``` should be:

```
SPOTIFY_ID=<spotify ID>
SPOTIFY_SECRET=<spotify secret key>
```
  
  3. Run ```npm install``` to install all dependencies (node packages needed by LIRI)
  
  ``` 
  npm install 
  (install messages displayed)
  ```
  
  4. Test your installation, for example:
  ```
  node liri.js movie-this "Casablanca"
  ```
  
  ### Support <a name="support"></a>
  If you have any issues installing or using the app, send me a notification at [engjoserobles@gmail.com](mailto:engjoserobles@gmail.com)
  

