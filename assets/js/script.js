// get variables from html
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");


// API URL
const apiURL = "https://api.lyrics.ovh";

// Get Search Value
// add an eventlistener, so everytime the search button is clicked without a value, it will send out an alert to add a value
form.addEventListener("submit", e => {
    //  prevent default to prevent from reloading
    e.preventDefault();
    // to remove white space from ends of a string
    searchValue = search.value.trim();

    if (!searchValue) { 
        // cant use alerts 
        alert("Enter an artist or song");
        // or else I want to begin search
    } else {
        beginSearch(searchValue);
        // getRecommendations(searchValue);
    }
})

// An async function is a function declared with the async keyword, and the await keyword is permitted within them. The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.
// Search function 

async function beginSearch(searchValue) {
    // fetch the results using the api URL 
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    // we are suppose to get the data from API in json format
    const data = await searchResult.json();
    // console.log(data);
    displayData(data);
}

// Display Search Result - DisplayData function

function displayData(data) {
    // create HTML in js
    // create the result as a list 
    // .map to create a new array 
    // we are getting the results and the result is the song, artist name and song title 
    // create a button get lyrics to expand to get lyrics
    result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Lyrics</span>
                </li>`
        )
        // to join as a whole string
        .join('')}
    </ul>
  `;
}

//event listener to get the lyrics button
result.addEventListener('click', e=>{
    // create a variable called clicked element
    const clickedElement = e.target;

    //checking if lyrics is a button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        // calling upon a function with two parameters
        getLyrics(artist, songTitle)
    }
})


// Get lyrics for the song
async function getLyrics(artist, songTitle) {
    // fetch something from the API, artist and song title
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    // again needs to be in json format
    const data = await response.json();
  
    // (/(\r\n|\r|\n)/g, '<br>') got this from the website
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    // display lyrics to the 
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;

    getRecommendations(artist);
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

// Populate recommendation section
var getRecommendations = function (search) {
    var key = "425157-EzVibez-ON3O5RLK"; // our tastedive api key
    var url = "https://tastedive.com/api/similar"; // base url
    $.ajax({
        type: "GET",
        data: {
            k: key,
            q: search,
            type: "music"
        },
        url: url,
        dataType: "jsonp",
        // jsonpCallback: 'jsonp_callback',
        // contentType: 'application/json'
    }).then(function (res) {
        // console.log("results", res.Similar.Results[0].Name);
        recommended.append('<h4>Check out these similar artists!</h4>');

        // Gets the first 8 artists and appends them to the recs section. Each generated button has an event listener
        // to conduct a new search
        for (let i = 0; i < 8; i++) {
            var rec = $("<button></button>").addClass("column").text(res.Similar.Results[i].Name).css("padding", "5px");
            rec.on('click', function() {
                    var artist = $(this).text();
                    // console.log(artist, typeof(artist));
                    beginSearch(artist);
            });
            recommended.append(rec);
        }
    });
}









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
