document.addEventListener('DOMContentLoaded', async () => {
    const songForm = document.getElementById('songForm');
    const songTableBody = document.getElementById('songTableBody');
    const saveBtn = document.getElementById('saveBtn');
    const artistImage = document.getElementById('artistImage');
    const songImage = document.getElementById('songImage');
    const artistImagePreview = document.getElementById('artistImagePreview');
    const songImagePreview = document.getElementById('songImagePreview');
    const artistSelect = document.getElementById('artistSelect');
    const newArtistContainer = document.getElementById('newArtistContainer');
    const newArtistCheckbox = document.getElementById('newArtistCheckbox');
    const newArtistNameInput = document.getElementById('newArtistName');
    const addArtistBtn = document.getElementById('addArtistBtn');
    let songsData = [];
    let artists = [];


    async function fetchArtists() {
        try {
            const response = await fetch('assets/json/artist.txt');
            if (!response.ok) {
                throw new Error(`Failed to fetch artists: ${response.status} ${response.statusText}`);
            }
            const text = await response.text();
            artists = text.split('\n').map(artist => artist.trim()).filter(artist => artist);
            // Sort the artists alphabetically
            artists.sort((a, b) => a.localeCompare(b));
            populateArtistDropdown();
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    }
     addArtistBtn.addEventListener('click', async () => {
        const newArtistName = newArtistNameInput.value.trim();
        if (newArtistName && !artists.includes(newArtistName)) {
            artists.push(newArtistName);
            //Sort after new artist is added
             artists.sort((a, b) => a.localeCompare(b));
            const option = document.createElement('option');
            option.value = newArtistName;
            option.textContent = newArtistName;
            artistSelect.appendChild(option);
            artistSelect.value = newArtistName;
            newArtistNameInput.value = '';
            newArtistContainer.style.display = 'none';
            newArtistCheckbox.checked = false;
            artistSelect.disabled = false;
            await saveArtistsToFile();
        }
    });
    function populateArtistDropdown() {
        artistSelect.innerHTML = '<option value="">-- Select Artist --</option>';
        artists.forEach(artist => {
            const option = document.createElement('option');
            option.value = artist;
            option.textContent = artist;
            artistSelect.appendChild(option);
        });
    }
    addArtistBtn.addEventListener('click', async () => {
        const newArtistName = newArtistNameInput.value.trim();
        if (newArtistName && !artists.includes(newArtistName)) {
            artists.push(newArtistName);
            const option = document.createElement('option');
            option.value = newArtistName;
            option.textContent = newArtistName;
            artistSelect.appendChild(option);
            artistSelect.value = newArtistName;
            newArtistNameInput.value = '';
            newArtistContainer.style.display = 'none';
            newArtistCheckbox.checked = false;
            artistSelect.disabled = false;
            await saveArtistsToFile();
        }
    });
    async function saveArtistsToFile() {
        try {
            const artistText = artists.join('\n');
            const blob = new Blob([artistText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'artist.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to save artists:', error);
            alert('Could not save the artist file. Please save manually.');
        }
    }

    async function fetchSongsData() {
        try {
            const response = await fetch('assets/json/songs.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
            songsData = (await response.json()).data;
            renderSongTable();
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    }

	function renderSongTable() {
		songTableBody.innerHTML = '';
		songsData.forEach(song => {
			const row = document.createElement('tr');
			row.innerHTML = `
			  <td>${song.id}</td>
			   <td>${song.attributes.artist.data.attributes.artist_name}</td>
				<td>${song.attributes.title}</td>
				 <td>${song.attributes.bpm}</td>
				<td>${song.attributes.page}</td>
			   <td>${song.attributes.keySignature}</td>
			   <td>${song.attributes.songImage}</td>
			   <td>${song.attributes.dateAdded}</td>
				<td><button class="edit-btn" data-id="${song.id}">Edit</button>
				  <button class="delete-btn" data-id="${song.id}">Delete</button></td>
			`;
			songTableBody.appendChild(row);
		});
	}

    newArtistCheckbox.addEventListener('change', function () {
        newArtistContainer.style.display = this.checked ? 'block' : 'none';
        artistSelect.disabled = this.checked;
        newArtistNameInput.value = '';
    });

    function clearForm() {
        artistSelect.value = '';
        newArtistContainer.style.display = 'none'
        newArtistCheckbox.checked = false;
        newArtistNameInput.value = '';
        document.getElementById('artistImage').value = '';
        document.getElementById('songImage').value = '';
        document.getElementById('artistImagePreview').style.display = 'none';
        document.getElementById('songImagePreview').style.display = 'none';
        document.getElementById('title').value = '';
        document.getElementById('bpm').value = '';
        document.getElementById('page').value = '';
        document.getElementById('keySignature').value = '';
        document.getElementById('dateAdded').value = '';
        document.getElementById('video').value = '';
        document.getElementById('mp3').value = '';
        document.getElementById('downloadLink').value = '';
        document.getElementById('songId').value = '';
    }

    function populateForm(song) {
        document.getElementById('songId').value = song.id;
        artistSelect.value = song.attributes.artist.data.attributes.artist_name;
        if (song.attributes.artist.data.attributes.image) {
            document.getElementById('artistImagePreview').src = song.attributes.artist.data.attributes.image;
            document.getElementById('artistImagePreview').style.display = 'block';
        } else {
            document.getElementById('artistImagePreview').style.display = 'none';
        }
          if(song.attributes.songImage){
              document.getElementById('songImagePreview').src = song.attributes.songImage
            document.getElementById('songImagePreview').style.display = 'block';
         } else {
             document.getElementById('songImagePreview').style.display = 'none';
        }
        document.getElementById('title').value = song.attributes.title;
        document.getElementById('bpm').value = song.attributes.bpm;
        document.getElementById('page').value = song.attributes.page;
        document.getElementById('keySignature').value = song.attributes.keySignature;
        document.getElementById('dateAdded').value = song.attributes.dateAdded;
        document.getElementById('video').value = song.attributes.video || '';
        document.getElementById('mp3').value = song.attributes.mp3 || '';
        document.getElementById('downloadLink').value = song.attributes.downloadLink;
        newArtistContainer.style.display = 'none';
        newArtistCheckbox.checked = false;
        artistSelect.disabled = false;
        newArtistNameInput.value = '';
    }

    artistImage.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            document.getElementById('artistImagePreview').src = URL.createObjectURL(file);
             document.getElementById('artistImagePreview').dataset.filename = file.name;
            document.getElementById('artistImagePreview').style.display = 'block';
        } else {
            document.getElementById('artistImagePreview').style.display = 'none';
        }
    });

    songImage.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            document.getElementById('songImagePreview').src = URL.createObjectURL(file);
            document.getElementById('songImagePreview').dataset.filename = file.name;
            document.getElementById('songImagePreview').style.display = 'block';
        } else {
            document.getElementById('songImagePreview').style.display = 'none';
        }
    });


    songTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const songId = parseInt(e.target.dataset.id);
            const song = songsData.find(song => song.id === songId);
            if (song) {
                populateForm(song);
            }
        } if (e.target.classList.contains('delete-btn')) {
            const songId = parseInt(e.target.dataset.id);
            songsData = songsData.filter(song => song.id !== songId);
            renderSongTable();
        }
    });

    songForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    document.getElementById('addSongBtn').addEventListener('click', () => {
        const songId = document.getElementById('songId').value;
        const artistName = newArtistCheckbox.checked ? newArtistNameInput.value : artistSelect.value;
        let artistImageValue = document.getElementById('artistImagePreview').dataset.filename || "";
        let songImageValue = document.getElementById('songImagePreview').dataset.filename || "";
        const title = document.getElementById('title').value;
        const bpm = document.getElementById('bpm').value;
        const page = document.getElementById('page').value;
        const keySignature = document.getElementById('keySignature').value;
        const dateAdded = document.getElementById('dateAdded').value;
        let videoUrl = document.getElementById('video').value;
        const mp3 = document.getElementById('mp3').value;
        const downloadLink = document.getElementById('downloadLink').value;
        if (!artistName) {
            alert('Please select or add an artist name');
            return;
        }
        if (videoUrl) {
            try {
                const url = new URL(videoUrl);
                if (url.hostname === 'youtu.be') {
                    const videoId = url.pathname.substring(1);
                    videoUrl = `https://www.youtube-nocookie.com/embed/${videoId}?controls=0`;
                }
                else if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
                    const videoId = url.searchParams.get('v');
                    videoUrl = `https://www.youtube-nocookie.com/embed/${videoId}?controls=0`;
                }
            } catch (e) {
                console.error('Invalid URL', e)
            }
        }
         const existingSong = songsData.find(song => song.id === parseInt(songId));
             if(artistImageValue){
                artistImageValue = `assets/img/artist_image/${artistImageValue}`;
            } else if (existingSong && existingSong.attributes.artist.data.attributes.image) {
                  artistImageValue = existingSong.attributes.artist.data.attributes.image
             }
              if(songImageValue){
                 songImageValue =  `assets/img/album_cover/${songImageValue}`;
            } else if (existingSong && existingSong.attributes.songImage) {
                 songImageValue = existingSong.attributes.songImage
             }
           

        const artistId = songsData.length > 0 ? songsData[songsData.length - 1].attributes.artist.data.id + 1 : 1
        const newSong = {
            id: songId ? parseInt(songId) : songsData.length > 0 ? songsData[songsData.length - 1].id + 1 : 1,
            attributes: {
                artist: {
                    data: {
                        id: artistId,
                        attributes: {
                            artist_name: artistName,
                            image: artistImageValue,
                        },
                    },
                },
                title: title,
                bpm: parseInt(bpm),
                page: page,
                songImage: songImageValue,
                keySignature: keySignature,
                dateAdded: dateAdded,
                video: videoUrl || null,
                mp3: mp3 || null,
                downloadLink: downloadLink,
            },
        }
        if (songId) {
            const index = songsData.findIndex(song => song.id === parseInt(songId))
            if (index !== -1) {
                songsData[index] = newSong;
            }
        } else {
            songsData.push(newSong);
        }
        clearForm();
        renderSongTable();
    });


    async function saveSongsData() {
        const jsonData = JSON.stringify({ data: songsData, lastUpdated: new Date() }, null, 2);
        try {
            const response = await fetch('assets/json/songs.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });

            if (response.ok) {
                alert('Songs data updated successfully!');
            } else {
                throw new Error(`Failed to update data, server return ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error saving songs data:', error);
            alert('Could not save songs. Please save manually.');
            triggerManualDownload(jsonData);
        }
    }
    function triggerManualDownload(jsonData) {
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'songs.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    saveBtn.addEventListener('click', saveSongsData);
    fetchSongsData();
    fetchArtists();
});