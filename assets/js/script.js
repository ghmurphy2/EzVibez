const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

const apiURL = "https://api.lyrics.ovh";

// Get Search Value
form.addEventListener("submit", e => {
    e.preventDefault();
    searchValue = search.value.trim();

    if (!searchValue) { 
        // doesnt us to alerts 
        alert("Nothing to search");
    } else {
        beginSearch(searchValue);
    }
})

// Search function
async function beginSearch(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();

    displayData(data);
}

// Display Search Result
function displayData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}

//event listener in get lyrics button
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})

// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await response.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
  
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
