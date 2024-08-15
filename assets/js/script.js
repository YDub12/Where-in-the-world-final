document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('username-form');
    const usernameInput = document.getElementById('username-input');
    const welcomeMessage = document.getElementById('welcome-message');

    // Function to store the username (e.g., in a variable or localStorage)
    function storeUsername(username) {
        // Example: Store the username in localStorage
        localStorage.setItem('username', username);
    }

    // Function to handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const username = usernameInput.value.trim();

        if (username) {
            storeUsername(username);
            welcomeMessage.textContent = `Welcome, ${username}!`;
            usernameInput.value = ''; // Clear the input field
            document.getElementById('username-form').style.display = 'none';
        } else {
            welcomeMessage.textContent = 'Please enter a valid username.';
        }
    });
  // Optionally: Load and display the stored username on page load
  let storedUsername = localStorage.getItem('username');
  if (storedUsername) {
      welcomeMessage.textContent = `Welcome back, ${storedUsername}!`;
      form.style.display = 'none';
  }
});