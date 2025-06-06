document.addEventListener("DOMContentLoaded", ()=> {
    fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        const playlists = data.playlists;
        const randomIndex = Math.floor(Math.random() * playlists.length);
        const randomPlaylist = playlists[randomIndex];

        renderFeaturedPlaylist(randomPlaylist);
        
    })
    .catch(error => {
        console.log("******** couldn't load featured data *********");
    });
});


function renderFeaturedPlaylist(playlist){


    document.querySelector('.featured-image').src = playlist.playlist_art;
    document.querySelector('.featured-title').textContent = playlist.playlist_name;

    const songContainer = document.querySelector('.featured-song-list');
    playlist.songs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.className = 'featured-song-card';

        songElement.innerHTML = `
        <img src = "${song.cover}" alt = "playlist cover">
    <div class= song-info >
        <p class= song-title-> ${song.title}</p>
        <p class= song-artist-> ${song.artist} </p>
        <p class= song-duration> ${song.duration} </p>

    </div>
        `;
        songContainer.appendChild(songElement);
    });
}