// Check localStorage to see if the user has donated or not
if(localStorage.getItem('donated') === 'true') {
    // If user has donated, change button text and style
    const donateButton = document.getElementById('donateButton');
    donateButton.textContent = 'Thank You for Your Support!';
    donateButton.classList.remove('btn-primary');
    donateButton.classList.add('btn-success');
    donateButton.setAttribute('href', '#'); // Disable the link
    donateButton.style.cursor = 'default'; // Make the button non-clickable
}

// Function to simulate donation (for testing purposes)
function markAsDonated() {
    localStorage.setItem('donated', 'true');
    location.reload(); // Reload the page to update the button dynamically
}

// Example: Simulating a donation event (comment this out in production)
// markAsDonated(); // Uncomment to simulate a donation
