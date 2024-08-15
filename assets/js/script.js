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

    // to monitor for enter key being pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            if (document.getElementById('submit-button').style.display === 'block') {
                checkAnswer();  // Trigger submit answer
            } else if (document.getElementById('next-button').style.display === 'block') {
                nextQuestion(); // Trigger next question
            }
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

// Function to handle the 'Submit Answer' button click
function checkAnswer () {
    let userAnswer = document.getElementById('answer-input');
    let userInput = userAnswer.value.trim().toLowerCase(); // to convert the user's answer to lower case 
    console.log("User Input", userInput);
    let correctAnswer = questions[currentQuestionIndex].capital.toLowerCase(); // to convert the answer to lower case to ensure exact matches for spelling
    console.log("Correct Answer", correctAnswer);
    let feedback = document.getElementById('feedback');

    if (userInput === correctAnswer) {
        feedback.textContent = 'Congrats you did it!'
        feedback.style.color = 'green';
        score++
        document.getElementById('next-button').style.display = 'block';
        document.getElementById('submit-button').style.display = 'none';
    } else {
        feedback.textContent = `Unlucky, you said ${userInput}, the correct answer is ${correctAnswer}`;
        feedback.style.color = 'red';
        document.getElementById('next-button').style.display = 'block';
        document.getElementById('submit-button').style.display = 'none';
    }

    console.log("Current Score", score); // to ensure the score is incremented properly
    console.log("Next Question Index:", currentQuestionIndex + 1); // to check that the index will increase by one 
}