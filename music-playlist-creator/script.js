 
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

            const playlistsList= document.getElementById('playlist-cards'); //parent container
            reviews.forEach(playlist => {
                const playlistElement = createPlaylistElement(playlist);
                playlistsList.appendChild(playlistElement);
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
                &#9829; ${playlsit.playlist_likes}
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
        button.textContent =  `&#9829; ${playlsit.playlist_likes}`
        button.setAttribute('data-liked', 'false');
    }

    else {
        // If the review is not liked, increase the like count and update the button
        likesCount += 1;
        button.textContent =  `&#9829; ${playlsit.playlist_likes}`
        button.setAttribute('data-liked', 'true');
    }

 }


//
// Handling Modal view, which includes closing, opening, and loading the data.
//

  /**
   * openModal opens the modal view (the modal view displays a single playlist and its songs, it also allows shuffling). 
   * params: A playlist;
   * returns: None;
   */


  /**
   * closeModal closes the modal when a person clicks the x button.
   * params: the x button;
   * returns: None;
   */




// const modal = document.getElementById("festivalModal");
// const span = document.getElementsByClassName("close")[0];

// function openModal(festival) {
//    document.getElementById('festivalName').innerText = festival.name;
//    document.getElementById('festivalImage').src = festival.imageUrl;
//    document.getElementById('festivalDates').innerText = `Dates: ${festival.dates}`;
//    document.getElementById('festivalLocation').innerText = `Location: ${festival.location}`;
//    document.getElementById('artistLineup').innerHTML = `<strong>Lineup:</strong> ${festival.lineup.join(', ')}`;
//    modal.style.display = "block";
// }

// span.onclick = function() {
//    modal.style.display = "none";
// }
// window.onclick = function(event) {
//    if (event.target == modal) {
//       modal.style.display = "none";
//    }
// }

 


