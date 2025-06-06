//before stretch:
//handle shuffle

// stretch features to keep in mind: 
// sort
// add a new playlist and delete


 //
 // Fetching playlists and loading them dynamically
 //
 /**
   * loadPlaylists fetches the playlist from the data file.   
   * params: None;
   * returns: None
   */
function loadPlaylists(){
    fetch('/data/data.json')
        .then(response => response.json())
        .then(playlists => {

            const playlistsContainer= document.getElementById('playlist-cards'); //parent container
            playlists.forEach(playlist => {
                const playlistElement = createPlaylistElement(playlist);
                playlistContainer.appendChild(playlistElement);
            });

        }).catch(error => {
            console.log ("********ERROR: couldn't load the playlists ******* ")
        });

}
 /**
   * createPlaylistElement dynamically creates a new playlist based on a given playlist data. 
   * params: A playlist;
   * returns: A playlist-card/element
   */
 function createPlaylistElement(playlist){
    const div = document.createElement('div');
    div.className = "playlist-card";
    div.innerHTML = ` 

    <img src="${playlist.playlist_art} alt="cover-image">     
                <h3> ${playlist.playlist_name}</h3>
                <p>Created by ${playlist.playlist_author}</p>
                <button 
                class="heart-button" data-id="${playlist.id}" 
                data-liked="false" 
                onclick="toggleLike(this)">
                ♡; ${playlsit.playlist_likes}
                </button>
  	`;
    return div;
 }

 
//
// Handling like butotn toggle, which allows users to like and unlike 
//

 /**
   * toggleLike can like and unlike the a playlist when the like butotn is clicked.
   * params: like button
   * returns: None
   */

 function toggleLike(button){
    const playlistId = button.getAttribute('data-id');
    const isLiked = button.getAttribute('data-liked') === 'true';
    const likesCount = parseInt(button.textContent.match(/\d+/)[0], 10); 

    if (isLiked) {
        // If the review is already liked, decrease the like count and update the button
        likesCount -= 1;
        button.textContent =  `🤍; ${playlsit.playlist_likes}`
        button.setAttribute('data-liked', 'false');
    }

    else {
        // If the review is not liked, increase the like count and update the button
        likesCount += 1;
        button.textContent =  `❤️; ${playlsit.playlist_likes}`
        button.setAttribute('data-liked', 'true');
    }

 }


//
// Handling the creation of new playlist
//

 /**
   * handlePlaylistSubmit creates a new playlits made by the user
   * params: None;
   * returns: A playlist
   */

//  let lastReviewId = 0; // This will be incremented for each new review

// document.addEventListener('DOMContentLoaded', () => {
// 		loadReviews();
// 		document.getElementById('review-form').addEventListener('submit', handleReviewSubmit);
// });


//
// Handling Modal view, which includes closing, opening, and loading the data.
//

const modal = document.getElementById("modal-overlay");
const span = document.getElementsByClassName("close")[0];



 /**
   * createSongElement dynamically creates a new song card based on a given song data of a playlist. 
   * params: A playlist;
   * returns: A song-card/element
   */
  function createSongElement(song){
    const div = document.createElement('div');
    div.className = "song-card";
    div.innerHTML = ` 

      <div class="song-left">
          <img src= ${songs.cover}" alt="Song Cover">
          <div class="song-info-text">
            <p class="song-title"> ${songs.title} </p>
            <p class="song-artist"> ${songs.artist} Bunny</p>
          </div>
        </div>

        <p class="song-duration"> ${songs.duration}</p>
        `;
    return div;
 }


  /**
   * openModal opens the modal view (the modal view displays a single playlist and its songs, it also allows shuffling). 
   * params: A playlist;
   * returns: None;
   */

function openModal(playlist) {
        // disable the body from scrolling when modal view is open.
        document.body.overflow = 'hidden'; 
        document.getElementById('playlist-name').innerText = playlist.playlist_name;
        document.getElementById('playlist-cover').src = playlist.playlist_art;
        document.getElementById('playlist-creator').innerText = `by ${playlist.playlist_author}`;

       
        // for each song, display it in songlist when the modal is open
        const songsContainer = document.getElementById('song-list');  //parent container
        const songList = playlist.songs;
        songList.forEach(song =>
        {
          const songElement = createSongElement(playlist);
          songsContainer.appendChild(songElement);
        });
        modal.style.display = "flex";
      }  

  function closeModal(button){

    button.add
  }

  window.addEventListener("click", (event)=> {
       if (event.target == modal) {
            modal.style.display = "none";
  }}
);

span.addEventListener("click", (event) => {
    modal.style.display = "none";

});

 


