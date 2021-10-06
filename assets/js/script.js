// var request = new XMLHttpRequest();

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

var searchInput = document.querySelector("#search-text");
var searchForm = document.querySelector("#search-form");

var history = [];

const toke = 'BQBHaTm5bQ32dT59Z_T21hjzfZ2kcOA8bha-KGuPrq9rbR0ttC48vqNkcseRdM3L18fpEWbEQ0UMBsA7OSl89f4Hdiqrv6WCy1ydlUl55M5ebyR2u4idk_YhLTYB0-8PE6tTtq_AwIemRozPjiInkkuRhfXIga_HxYH3';

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = toke;
    const player = new Spotify.Player({
        name: 'EzVibez',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    document.getElementById('togglePlay').onclick = function() {
      player.togglePlay();
    };

    player.connect();
}

function getSong() {
    // TODO
}

function search(query) {
    // TODO
    var apiUrl = "https://api.spotify.com/v1/search?query=" + query + "&type=track&offset=0&limit=10";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            console.log(response)
            response.json().then(function (data) {
                console.log(data)

                // $(forecastContainer).empty();
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
}

function storePrev() {
    localStorage.setItem("history", JSON.stringify(history));
}

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var searchText = searchInput.value.trim();
  
    // Return from function early if submitted searchText is blank
    if (searchText === "") {
      return;
    }
  
    // Add new searchText to history array, clear the input, limits history to 10
    if (history.length >= 10){
        history.shift();
    }
    // history.push(searchText);
    searchInput.value = "";
  
    // Store updated search in localStorage, re-render the list, render the weather
    storePrev();
    search(searchText);
});