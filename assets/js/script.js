// get variables from html
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const recommended = $("#recs");
const historyModal = document.querySelector(".modal-content");
const test = document.querySelector(".modal");
const meaningApi = "https://api.meaningcloud.com/sentiment-2.1?lang=auto&key=1a79c35aa06efc8aff60e799244e2372&txt=";
const moodAnalysis = $("#mood");


var historyValue = [];

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
        saveHistory(searchValue);
    }
})

function saveHistory(search) {
    if (historyValue.length >= 8) {
        historyValue.shift();
    }

    historyValue.push(search);
    localStorage.setItem('saveHistory', JSON.stringify(historyValue))

    for (let i = historyValue.length - 1; i >= 0; i--) {
        var item = historyValue[i];
        console.log(item)
        var btn = document.createElement("button");
        btn.textContent = item;
        btn.addEventListener("click", function () {
            var artist = $(this).text();
            beginSearch(artist);
        });
        historyModal.appendChild(btn);
    }
}


function init() {
    var savedSearch = JSON.parse(localStorage.getItem("saveHistory"));
    if (savedSearch !== null) {
        historyValue = savedSearch;
    }

}

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
            .map(song => `<li>
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
result.addEventListener('click', e => {
    // create a variable called clicked element
    const clickedElement = e.target;

    //checking if lyrics is a button or not
    if (clickedElement.tagName === 'SPAN') {
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
    getMood();
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function getMood() {
    const lyricsEl = $('#result').find('p')
    const lyricQuery = lyricsEl[0].outerText
    fetch(`${meaningApi}${lyricQuery}`).then(function (response) {
        console.log(response)
        console.log(lyricsEl)
        console.log(lyricQuery)
        response.json().then(async function (data) {
            console.log(data)
            console.log(data.score_tag)
            if (data.score_tag == "P+") {
                moodAnalysis.text("Very Positive")
            };
            if (data.score_tag == "P") {
                moodAnalysis.text("Positive")
            };
            if (data.score_tag == "NEU") {
                moodAnalysis.text("Neutral")
            }
            if (data.score_tag == "N") {
                moodAnalysis.text("Negative")
            }
            if (data.score_tag == "N+") {
                moodAnalysis.text("Very Negative")
            }
            if ((data.score_tag == "NONE"))
                moodAnalysis.text("Inconclusive analysis")
        })
    })
};

    // P+: strong positive
    // P: positive
    // NEU: neutral
    // N: negative
    // N+: strong negative
    // NONE: without polarity

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
                rec.on('click', function () {
                    var artist = $(this).text();
                    // console.log(artist, typeof(artist));
                    beginSearch(artist);
                });
                recommended.append(rec);
            }
        });
    }


    init();