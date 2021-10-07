var request = new XMLHttpRequest();

// request.open('GET', "https://api.lyrics.ovh/v1/Drake/God's Plan");

// request.onreadystatechange = function () {
//   if (this.readyState === 4) {
//     console.log('Status:', this.status);
//     console.log('Headers:', this.getAllResponseHeaders());
//     console.log('Body:', this.responseText);
//   }
// };

// request.send();

// 425157-EzVibez-ON3O5RLK

// https://tastedive.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction
// EzVibez is an app that allows user to look up a song(based on parameters) and view the lyrics and a brief analysis of the lyrics based on sentiment
// layout will be multi paged with a landing page that contians a search 
// possible song play back spotify or shazam
// limit result 25, search parameters name, artist(album if time)
// on link click redirect to lyric and analysis page(playback song)
// mood lighting from analysis output
// playbar? embedded sound cloud widget
// previous button pulls from local storage, plays back last song and shows last page, tasedive suggest next


// off center wireframe, populate to the left, foundation layouts
// code our search bar with foundation(form with input)
// query itunes api to pull song data and possible results
// populate results on page, have each result display button with href
// user selects result
// directs user to lyric and information page(has dynamic mood based on sentiment analysis)
// allow user to select similar songs through tastedrive with recommendationed next buttons(column format with 5 similar links)
// loop song into lyric page, query lyrics and mood for new song

// function button submit

// function query itunes
    // push local memory
    // query reccomended

    //query lyrics
        // query sentiment
            // set mood 

            Where parameterkeyvalue can be one or more parameter key and value pairs indicating the details of your query.

            To construct a parameter key and value pair, you must concatenate each parameter key with an equal sign (=) and a value string. For example: key1=value1. To create a string of parameter key and value pairs, you must concatenate each pair using an ampersand (&). For example: key1=value1&key2=value2&key3=value3.
            Country code US
            music terms musicArtist, musicTrack, album, musicVideo, mix, song.
            <script src="https://.../search?parameterkeyvalue&callback="{name of JavaScript function in webpage}"/>.
            Please note that “musicTrack” can include both songs and music videos in the results.
            
            To search for all Jack Johnson audio and video content and return only the first 25 items, use the following URL: https://itunes.apple.com/search?term=jack+johnson&limit=25.
            term=jack+johnson
            limit=25
            
            curl 'https://api.meaningcloud.com/sentiment-2.1' \
                -F 'key=YOUR API KEY' \
                -F 'txt=YOUR TEXT HERE' \variable for query, lyric output from ovhs
                -F 'lang=TEXT LANGUAGE HERE'
            add text translation
