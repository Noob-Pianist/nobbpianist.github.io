// script.js
async function loadContent() {
    const hash = window.location.hash.substring(1);
    const mainContent = document.getElementById('main-content');

    try {
        let data;
        if (hash === 'all-songs') {
            data = await fetchStaticData('assets/json/songs.json');
            // Sort all songs alphabetically by title
             data.data.sort((a,b) => a.attributes.title.localeCompare(b.attributes.title));
            mainContent.innerHTML = templates.allSongs(data.data);
        } else if (hash === 'artists') {
            const songs = await fetchStaticData('assets/json/songs.json');
            let artists = getArtistsFromSongs(songs.data);
            // Add song counts to artists
            artists = artists.map(artist => {
               return {...artist, songCount: songs.data.filter(song => song.attributes.artist.data.attributes.artist_name === artist.artist_name).length}
            })
              // Sort artists alphabetically by name
            artists.sort((a, b) => a.artist_name.localeCompare(b.artist_name));
            mainContent.innerHTML = templates.artists(artists);
        } else if (hash.startsWith('artist-')) {
            const artistSlug = hash.replace('artist-', '').replace(/-/g, ' ');
            const songs = await fetchStaticData('assets/json/songs.json');
              const songsData = songs.data.filter(song => song.attributes.artist.data.attributes.artist_name.toLowerCase() === artistSlug.toLowerCase());
              // Sort songs alphabetically by title
                songsData.sort((a,b) => a.attributes.title.localeCompare(b.attributes.title));
              if(songsData && songsData.length > 0){
                mainContent.innerHTML = templates.artist(artistSlug, songsData);
             } else {
                 mainContent.innerHTML = `<p>Artist not found</p>`;
            }
        } else if (hash.startsWith('song-')) {
            const songId = hash.replace('song-', '');
            const songs = await fetchStaticData('assets/json/songs.json');
            const song = songs.data.find(song => song.id === parseInt(songId));
            if (song) {
                mainContent.innerHTML = templates.song(song.attributes);
            } else {
                mainContent.innerHTML = `<p>Song not found</p>`;
            }
        }else if (hash === 'upcoming') {
              const upcomingData = await fetchStaticData('assets/json/upcoming.json');
               mainContent.innerHTML = templates.upcoming(upcomingData.data);
        } else {
            const songs = await fetchStaticData('assets/json/songs.json');
             // Sort Home screen recent by date
               const sortedSongs = [...songs.data].sort((a, b) => new Date(b.attributes.dateAdded) - new Date(a.attributes.dateAdded));
            mainContent.innerHTML = templates.home(sortedSongs);
        }
        loadLazyImages();

    } catch (error) {
        console.error('Failed to load data:', error);
        mainContent.innerHTML = '<p>Failed to load data.</p>';
    }
}

async function fetchStaticData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${filePath}: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching static data:', error);
        throw error;
    }
}

function loadLazyImages() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    lazyImages.forEach(img => {
        img.onload = () => {
            img.classList.add('loaded');
        };
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}

function getArtistsFromSongs(songs) {
    const artistsMap = new Map();

    songs.forEach(song => {
        const artistName = song.attributes.artist.data.attributes.artist_name;
        const artistImage = song.attributes.artist.data.attributes.image;
        if (!artistsMap.has(artistName)) {
            artistsMap.set(artistName, {
                artist_name: artistName,
                image: artistImage
            });
        }
    });

    return Array.from(artistsMap.values());
}

// Event listener for hash changes
window.addEventListener('hashchange', loadContent);

// Load initial content
loadContent();