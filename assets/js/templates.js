//templates.js

const templates = {
    header: () => {
        return `
            <header>
                <nav class="header-nav">
                    <div class="title">
                        <h1>Sheet Music Collection</h1>
                    </div>
                </nav>
            </header>
        `;
    },
    home: (songs) => {
        const sortedSongs = [...songs].sort((a, b) => new Date(b.attributes.dateAdded) - new Date(a.attributes.dateAdded));
        const recentSongs = sortedSongs.slice(0, 3);
        return `
           ${templates.header()}
            <section class="recent-songs-home">
               <h2>Recent Songs</h2>
                <div class="recent-songs-grid">
                ${recentSongs.map(song => `
                    <a href="#song-${song.id}">
                       <div class="recent-song-item">
                         <img src="${song.attributes.songImage ? song.attributes.songImage :  song.attributes.page + '.png'}" alt="${song.attributes.title} Sheet Music Preview" loading="lazy" class="lazy-load">
                         <p>"${song.attributes.title}" - ${song.attributes.artist.data.attributes.artist_name}</p>
                      </div>
                    </a>
               `).join('')}
               </div>
            </section>
        `;
    },
    artists: (artists) => {
        return `
           ${templates.header()}
            <section class="artist-list-home">
                  <div class="artist-grid-home">
                    ${artists.map(artist => {
                            return `
                               <a href="#artist-${artist.artist_name.toLowerCase().replace(/ /g, '-')}">
                                    <div class="artist-grid-item">
                                    <img src="${artist.image}" class="artist-img lazy-load" alt="${artist.artist_name} Image" loading="lazy">
                                        <p>${artist.artist_name} (${artist.songCount} Songs)</p>
                                 </div>
                             </a>
                        `;
                        }).join('')}
                    </div>
                 </section>
        `;
    },
    artist: (artist, songs) => {
        return `
          ${templates.header()}
           <section class="sheet-music-grid-artist">
                      <div class="sheet-music-list-artist">
                         ${songs.map(song => `
                              <div class="sheet-music-card" id="${song.attributes.page}">
                                  <img src="${song.attributes.songImage ? song.attributes.songImage :  song.attributes.page + '.png'}" alt="${song.attributes.title} Sheet Music Preview" loading="lazy" class="lazy-load">
                                  <h3>"${song.attributes.title}"</h3>
                                  <a href="#song-${song.id}">View</a>
                              </div>
                          `).join('')}
                      </div>
           </section>

        `;
    },
    allSongs: (songs) => {
        return `
           ${templates.header()}
                <section class="all-songs-list">
                    ${songs.map(song => `
                      <div class="song-item">
                        <h3>"${song.attributes.title}" - ${song.attributes.artist.data.attributes.artist_name}</h3>
                        <p>BPM: ${song.attributes.bpm}, Key: ${song.attributes.keySignature}</p>
                         <a href="#song-${song.id}">View</a>
                      </div>
                    `).join('')}
                </section>
        `;
    },
    song: (song) => {
       let previewContent = `<p>Preview not available</p>`;
        if(song.video){
            previewContent = `<iframe width="560" height="315" src="${song.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        } else if(song.mp3){
           previewContent = `<audio controls src="${song.mp3}">Your browser does not support the audio element.</audio>`
        }

        return `
            ${templates.header()}
          <section class="song-detail">
              <div class="song-preview">
                  ${previewContent}
              </div>
              <h2>${song.title}</h2>
              <p>Artist: ${song.artist.data.attributes.artist_name}</p>
              <p>BPM: ${song.bpm}</p>
              <p>Key Signature: ${song.keySignature}</p>
              <a href="${song.downloadLink}" download class="download-button">Download Sheet Music</a>
          </section>
        `;
    },
	upcoming: (songs) => {
	  return `
		${templates.header()}
		<section class="upcoming-songs-list">
		  <h2>Upcoming Sheet Music Scores</h2>
		  ${songs.map(song => {
			// Ensure image availability using optional chaining and a fallback image
			const imageUrl = song.attributes?.image || 'path/to/default-image.png';

			return `
			  <div class="recent-song-item">
				<img src="${song.attributes.songImage ? song.attributes.songImage :  song.attributes.page + '.png'}" alt="${song.attributes.title} Sheet Music Preview" loading="lazy" class="lazy-load">
				<h3>"${song.attributes.title}" - ${song.attributes.artist.data.attributes.artist_name}</h3>
				<p>Release Date: ${song.attributes.dateAdded}</p>
			  </div>
			`;
		  }).join('')}
		</section>
	  `;
	},
    searchResult: () =>{
        return ``;
    }
};