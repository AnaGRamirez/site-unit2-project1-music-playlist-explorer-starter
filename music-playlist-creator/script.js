
var currentPlaylist = null;
var allPlaylists = null;

// When Dom has loaded, listen to for changes in the modal, in the shuffle button, and in the sort dropdown.
 document.addEventListener("DOMContentLoaded", ()=> {
  loadPlaylists();

  const modalOverlay = document.querySelector('.modal-overlay');
  const closeButton = document.querySelector('.close');
  const shuffleButton = document.getElementById('shuffle-button');
  const selectButton = document.getElementById('playlist-sort');


  //closing the modal
  closeButton.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay){
      closeModal();
    }
  });
  //shuffling songs 
  shuffleButton.addEventListener("click", () => {
    if (currentPlaylist){
      const shuffledSongs = shuffle(currentPlaylist.songs);
      renderShuffledSongs(shuffledSongs);
    }
  });


  // sorting playlists
  selectButton.addEventListener("change", (event)=> {
    const selectedValue = event.target.value;
    sortPlaylist(selectedValue, allPlaylists);
  });
 });


 /**
   * loadPlaylists fetches the playlist from the data file.   
   * params: None;
   * returns: None
   */
function loadPlaylists(){
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            allPlaylists = data.playlists;
            playlists = data.playlists;
            const playlistsContainer= document.querySelector('.playlist-cards'); //parent container
            playlists.forEach(playlist => {
                const playlistElement = createPlaylistElement(playlist);
                playlistsContainer.appendChild(playlistElement);
            });

        }).catch(error => {
          console.log(error.message)
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

    <img src="${playlist.playlist_art}" alt="cover-image">     
                <h3> ${playlist.playlist_name}</h3>
                <p>Created by ${playlist.playlist_author}</p>
                <button 
                class="heart-button" data-id="${playlist.id}" 
                data-liked="false" 
                onclick="toggleLike(event,this)">
                🤍
                <span class="like-count"> ${playlist.playlist_likes} </span>
                </button>

           
  	`;


    div.addEventListener("click", (event)=> {

      if (!event.target.classList.contains("heart-button")){
        openModal(playlist);
      }
    });
     return div;
 }

 

 /**
   * toggleLike can like and unlike the a playlist when the like butotn is clicked.
   * params: like button
   * returns: None
   */

 function toggleLike(event,button){

    const playlistId = button.getAttribute('data-id');
    const isLiked = button.getAttribute('data-liked') === 'true';
    let likesCount = parseInt(button.textContent.match(/\d+/)[0], 10); 

    if (isLiked) {
        // If the review is already liked, decrease the like count and update the button
        likesCount -= 1;
        button.textContent =  `🤍 ${likesCount}`
        button.setAttribute('data-liked', 'false');
    }

    else {
        // If the review is not liked, increase the like count and update the button
        likesCount += 1;
        button.textContent =  `❤️ ${likesCount}`
        button.setAttribute('data-liked', 'true');
    }

 }
 

 /**
   * shuffle:  Randomize the index of an array of songs.
   * params: an array of songs
   * returns: the edited array of songs.
   */

 function shuffle(songs){
  for (let currentIndex = songs.length -1; currentIndex >0; currentIndex--){

    const randomIndex = Math.floor(Math.random() * currentIndex + 1);

    //swaping
    const temp = songs[currentIndex];
    songs[currentIndex] = songs[randomIndex]
    songs[randomIndex] = temp;

  }
  return songs;
 }


 /**
   * renderShuffledSongs:  appends the new shuffled songs to the song list. 
   * params: the array of songs
   * returns: None
   */
 function renderShuffledSongs (songs){
  const songList = document.querySelector('.song-list');
  songList.innerHTML = "";
  songs.forEach(song => {
    const songElement = createSongElement(song);
    songList.appendChild(songElement);
  });
 }



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
          <img src= "${song.cover}" alt="Song Cover">
          <div class="song-info-text">
            <p class="song-title"> ${song.title} </p>
            <p class="song-artist"> ${song.artist} </p>
          </div>
        </div>

        <p class="song-duration"> ${song.duration}</p>
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
        currentPlaylist = playlist;
        const modalOverlay = document.querySelector('.modal-overlay')
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 

        document.querySelector('.playlist-name').innerText = playlist.playlist_name;
        document.querySelector('.playlist-cover').src = playlist.playlist_art;
        document.querySelector('.playlist-creator').innerText = `by ${playlist.playlist_author}`;

       
        // for each song, display it in songlist when the modal is open
        const songList = document.querySelector('.song-list');  //parent container
        songList.innerHTML = "";
        playlist.songs.forEach(song =>
        {
          const songElement = createSongElement(song);
          songList.appendChild(songElement);
        });   
        }


function closeModal(){
  document.querySelector('.modal-overlay').classList.remove('active');
  document.body.style.overflow = 'auto';
}


  /**
   * renderSortedPlaylist appends the new sorted playlist to the playlist container.  
   * params: playlists
   * returns: None;
   */


function renderSortedPlaylists(playlists) {
  const playlistsContainer = document.querySelector('.playlist-cards');
  playlistsContainer.innerHTML = ""; 

  playlists.forEach(playlist => {
    const playlistElement = createPlaylistElement(playlist);
    playlistsContainer.appendChild(playlistElement);
  });
}

  /**
   * sortPlaylist sorts playlist based on a specific option. 
   * params: an option (to sort by), playlists to sort;
   * returns: new sorted list of playlist;
   */


function sortPlaylist(option, playlists){
  let sortedPlaylist;

  if (option == 'name-asc') {
    sortedPlaylist = sortPlaylistByNameAsc(playlists);
  }
  else if (option == 'likes-desc' ){

   sortedPlaylist = sortPlaylistByLikesDesc(playlists);
  }

  else {

    sortedPlaylist = sortPlaylistsByDate(playlists);
  }
    
    renderSortedPlaylists(sortedPlaylist);

}

//
// Helper functions to sort by name ascending, likes descending, and dates chronologically
//

function sortPlaylistByNameAsc(playlists) {

  return playlists.sort((a, b) => a.playlist_name.localeCompare(b.playlist_name));
}

function sortPlaylistByLikesDesc(playlists) {
  return playlists.sort((a, b) => b.playlist_likes - a.playlist_likes);
}

function sortPlaylistsByDate(playlists){

  return playlists.sort((a,b) => new Date(a.created_date) - new Date(b.created_date));

}

