# liri-node-app
LIRI: Search Spotify for songs, Bands in Town for concerts, OMDB for movies

**SPOTIFY**
Searches the Spotify API when: 

Request:  'spotify-this-song'

Response:  

   * Artist(s)
   * The song's name
   * A preview link of the song from Spotify
   * The album that the song is from

Screenshot:
![spotify](spotify-this-song_extraordinaryMachine.png)


**OMBD**
Searches the OMDB API when:

Request: 'movie-this'

Response:

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

Screenshot:
![omdb](movie-this_bambi.png)

**BANDS IN TOWN** 

Searches the Bands in Town Artist Events API when:

Request: 'concert-this' 

Response: 

   * Name of the venue
   * Venue location
   * Date of the Event (use moment to format this as "MM/DD/YYYY")

Screenshot:
![bands](concert-this_eltonJohn.png)

**DO WHAT IT SAYS**

Using the fs Node package, pulls text from the random.txt file and uses the data to search Spotify for "I want it that way"

Request: 'do-what-it-says'

Response: 

Screenshot:
![doThis](do-what-it-says.png)


