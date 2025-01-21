 // Function to load artists from a file and populate the dropdown
 function loadArtistsFromFile() {
    const dropdown = document.getElementById("artist-dropdown");
	dropdown.disabled = true;
	dropdown.innerHTML = '<option value="">Loading artists...</option>';

    fetch('artist-management/artist.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found');
            }
            return response.text();
        })
        .then(fileContent => {
            const artists = fileContent.split("\n").map(line => line.trim()).filter(line => line.length > 0);

            dropdown.innerHTML = '<option value="">Select an Artist</option>';
			dropdown.disabled = false;

            artists.forEach(artist => {
                const option = document.createElement("option");
                option.value = artist;
                option.textContent = artist;
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading artist file:', error);
            dropdown.innerHTML = '<option value="">Error loading artists</option>';
            dropdown.disabled = true;
        });
}

document.addEventListener("DOMContentLoaded", loadArtistsFromFile); // Call on page load


function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector("#image-box").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function extractVideoId(url) {
    if (!url) return null;

    let videoID = "";
    if (url.includes("youtube.com/watch")) {
        videoID = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoID = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/embed/")) {
        videoID = url.split("youtube.com/embed/")[1]?.split("?")[0];
    }
    return videoID;
}

function updateDownloadLink() {
    const downloadLink = document.querySelector("#download-link-input").value;
	try {
        new URL(downloadLink); // Validate URL
		document.querySelector("#download-button").href = downloadLink;
    } catch (_) {
        alert("Please enter a valid Download URL.");
		return;
    }
}

function updateYoutubeLink() {
    const youtubeLink = document.querySelector("#youtube-link-input").value.trim();
    
	try {
        new URL(youtubeLink); // Validate URL
		const videoID = extractVideoId(youtubeLink);
		if (videoID) {
			document.querySelector("#youtube-button").href = `https://www.youtube.com/watch?v=${videoID}`;
		}
    } catch (_) {
        alert("Please enter a valid Youtube URL.");
		return;
    }
}


function generateSongPreview() {
    console.log('Generating song preview...');
    const songTitle = document.querySelector("#song-title-input").value.trim();
    const artist = document.querySelector("#artist-dropdown").value;
    const keySignature = document.querySelector("#key-signature-dropdown").value;
    const timeSignature = document.querySelector("#time-signature-dropdown").value;
    const pages = document.querySelector("#pages-dropdown").value;
    const downloadLink = document.querySelector("#download-link-input").value;
    const imageUrl = document.querySelector("#image-box").src;
    const youtubeLink = document.querySelector("#youtube-link-input").value.trim();
    const videoID = extractVideoId(youtubeLink);

    const iframeSrc = `https://www.youtube-nocookie.com/embed/${videoID}?controls=0`;

    // Validation
    if (!songTitle) { 
        alert("Please enter the song title.");
        return;
    }
    if (!artist) {
        alert("Please select an artist.");
        return;
    }
    if (!keySignature) {
        alert("Please select a key signature.");
        return;
    }
    if (!timeSignature) {
        alert("Please select a time signature.");
        return;
    }
    if (!pages) {
        alert("Please select the number of pages.");
        return;
    }
    if (!downloadLink) {
        alert("Please enter the download link.");
        return;
    }
    if (!imageUrl || imageUrl === window.location.href) {
        alert("Please upload an image.");
        return;
    } 

    // Generate the HTML page
    const generatedPage = `
<!DOCTYPE html>
<html data-bs-theme="dark" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>${songTitle} ${artist}- Noob Pianist</title>
    <meta name="description" content="Place to find all the Noob Pianist Music Sheet to Download for Free"> 
    <link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap">
    <link rel="stylesheet" href="../assets/css/Update1-Coming-Soon-Site.css">
</head>

<body>
    <nav class="navbar navbar-expand-md fixed-top navbar-shrink py-3" id="mainNav">
        <div class="container"><a class="navbar-brand d-flex align-items-center" href="/"><span>Noob Pianist</span></a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item"><a class="nav-link" href="../index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="../songs.html">Songs</a></li>
                    <li class="nav-item"><a class="nav-link" href="../artists.html">Artists</a></li>
                    <li class="nav-item"><a class="nav-link" href="../services.html">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="../requests.html">Request</a></li>
                </ul>
                <div class="theme-switcher dropdown"><a class="dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-sun-fill mb-1">
                            <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path>
                        </svg></a>
                    <div class="dropdown-menu"><a class="dropdown-item d-flex align-items-center" href="#" data-bs-theme-value="light"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-sun-fill opacity-50 me-2">
                                <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path>
                        </svg>Light</a><a class="dropdown-item d-flex align-items-center" href="#" data-bs-theme-value="dark"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-moon-stars-fill opacity-50 me-2">
                            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278"></path>
                            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
                        </svg>Dark</a><a class="dropdown-item d-flex align-items-center" href="#" data-bs-theme-value="auto"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-circle-half opacity-50 me-2">
                            <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"></path>
                        </svg>Auto</a></div>
                </div>
            </div>
        </div>
    </nav>
    <section class="py-4 py-md-5 my-5">
        <div class="container py-md-5">	
            <div class="row d-flex justify-content-center">
                <div class="col-md-6 col-lg-5 col-xl-4">
                    <img class="w-100 h-100 fit-cover" src="${imageUrl}" alt="${songTitle}" style="width: 100%; height: auto;">
                </div>
                <div class="col-md-6 col-lg-4 col-xl-4">
                    <div class="text-start d-flex flex-column justify-content-center align-items-start h-100">
                        <div class="d-flex align-items-center p-3">
                            <div class="px-2"><h6 class="mb-0">Song Title:</h6></div>
                            <p class="mb-0">${songTitle}</p>
                        </div>
                        <div class="d-flex align-items-center p-3">
                            <div class="px-2"><h6 class="mb-0">Artist:</h6></div>
                            <p class="mb-0">${artist}</p>
                        </div>
                        <div class="d-flex align-items-center p-3">
                            <div class="px-2"><h6 class="mb-0">Key Signature:</h6></div>
                            <p class="mb-0">${keySignature}</p>
                        </div>
                        <div class="d-flex align-items-center p-3">
                            <div class="px-2"><h6 class="mb-0">Time Signature:</h6></div>
                            <p class="mb-0">${timeSignature}</p>
                        </div>
                        <div class="d-flex align-items-center p-3">
                            <div class="px-2"><h6 class="mb-0">Pages:</h6></div>
                            <p class="mb-0">${pages}</p>
                        </div>
                        <div class="d-flex align-items-center p-3">
                            <div class="px-2">
                                <h6 class="mb-0"><a class="btn btn-primary" role="button" href="${downloadLink}" target="_blank">Download</a></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="container py-md-5">
            <div class="px-2">
                <h1 class="display-4 fw-bold mb-5">Song Preview</h1>
                <iframe width="560" height="315" src="${iframeSrc}" title="YouTube video player" frameborder="2" allowallow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin"></iframe>
            </div>
            
        </div>
    </section>

  
    <footer>
        <!-- Donation Button -->
        <div class="text-center mt-4">
            <a href="https://sociabuzz.com/noob_pianist/tribe" class="btn btn-primary btn-lg" id="donateButton" target="_blank">Donate to Noob Pianist.</a>
        </div>
        <div class="container py-4 py-lg-5">
            <div class="row row-cols-2 row-cols-md-4">
                <div class="col-12 col-md-3 col-xl-5">
                    <div class="fw-bold d-flex align-items-center mb-2"><span>Noob Pianist</span></div>
                    <p class="text-muted">Free piano sheet music forever.</p>
                </div>
                <div class="col-sm-4 col-md-3 col-xl-4 text-lg-start d-flex flex-column">
                    <h3 class="fs-6 fw-bold">Services</h3>
                    <ul class="list-unstyled">
                        <li><a href="services.html">Music Transcribe</a></li>
                        <li><a href="services.html">Music Arrangement</a></li>
                    </ul>
                </div>
            </div>
            <hr>
            <p class="mb-0">Copyright © 2025 Noob Pianist</p>
        </div>		
    </footer>
	<script src="../assets/bootstrap/js/bootstrap.min.js"></script>
	<script src="../assets/js/scripts.js"></script>
</body>
</html>`;

    // Create and download the HTML file
    const blob = new Blob([generatedPage], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `song_preview_${songTitle.replace(/\s+/g, '_')}.html`;
    a.click();
}

// Theme Switcher (example implementation, could be moved to a separate file if needed for other pages)
document.querySelectorAll('.theme-switcher .dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        const themeValue = this.getAttribute('data-bs-theme-value');
        document.documentElement.setAttribute('data-bs-theme', themeValue);
        // Store theme preference in localStorage (optional)
		localStorage.setItem('theme', themeValue);
    });
});

// Function to check stored theme preference (if you have localStorage)
function checkThemePreference() {
    const storedTheme = localStorage.getItem('theme');
	if (storedTheme){
		document.documentElement.setAttribute('data-bs-theme', storedTheme);
	} else {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		document.documentElement.setAttribute('data-bs-theme', systemTheme);
	}
}
checkThemePreference();