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

//setting Quiz data, score, region and index
let quizData = {
    europe: [
        { country: "France", capital: "Paris" },
        { country: "Germany", capital: "Berlin" },
        { country: "Spain", capital: "Madrid" },
        { country: "Italy", capital: "Rome" },
        { country: "United Kingdom", capital: "London" }
    ],
    africa: [
        { country: "Nigeria", capital: "Abuja" },
        { country: "Egypt", capital: "Cairo" },
        { country: "South Africa", capital: "Pretoria" },
        { country: "Kenya", capital: "Nairobi" },
        { country: "Morocco", capital: "Rabat" },
        { country: "Ghana", capital: "Accra" },
        { country: "Ethiopia", capital: "Addis Ababa" },
        { country: "Uganda", capital: "Kampala" },
        { country: "Algeria", capital: "Algiers" },
        { country: "Tanzania", capital: "Dodoma" },
        { country: "Angola", capital: "Luanda" },
        { country: "Sudan", capital: "Khartoum" },
        { country: "Ivory Coast", capital: "Yamoussoukro" },
        { country: "Senegal", capital: "Dakar" },
        { country: "Tunisia", capital: "Tunis" }
    ],
    asia: [
        { country: "Japan", capital: "Tokyo" },
        { country: "China", capital: "Beijing" },
        { country: "India", capital: "New Delhi" },
        { country: "South Korea", capital: "Seoul" },
        { country: "Thailand", capital: "Bangkok" },
        { country: "Indonesia", capital: "Jakarta" },
        { country: "Pakistan", capital: "Islamabad" },
        { country: "Vietnam", capital: "Hanoi" },
        { country: "Malaysia", capital: "Kuala Lumpur" },
        { country: "Philippines", capital: "Manila" },
        { country: "Singapore", capital: "Singapore" },
        { country: "Saudi Arabia", capital: "Riyadh" },
        { country: "United Arab Emirates", capital: "Abu Dhabi" },
        { country: "Turkey", capital: "Ankara" },
        { country: "Iran", capital: "Tehran" }
    ]
};
let selectedRegion = '';
let currentQuestionIndex = 0;
let score = 0;

// function to shuffle the order of the elements
function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j],array[i]];
    }
    return array;
}

// Function to start the quiz for a selected region
function startQuiz(region) {
    currentRegion = region;
    questions = shuffleQuestions(quizData[region]);
    console.log("Shuffled Questions", questions); // to debug and ensure the array has shuffled correctly 
    currentQuestionIndex = 0;
    score = 0;

    //to display the Quiz area
    document.getElementById('region-selection').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';

    //call the next function in the list
    showQuestion();
}

// Function to display the current question
function showQuestion() {
    let questionText = document.getElementById('question-text');
    let currentQuestion = questions[currentQuestionIndex];

    console.log("Current Question:", currentQuestion);
    

    if (currentQuestion) {
        questionText.textContent = `What is the capital of ${currentQuestion.country}?`;
        document.getElementById('answer-input').value = '';
        document.getElementById('answer-input').focus();
        document.getElementById('submit-button').style.display = 'block';
        document.getElementById('next-button').style.display = 'none';
    }
}