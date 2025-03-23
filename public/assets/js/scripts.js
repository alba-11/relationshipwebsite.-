document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('suggestion-form');
    form.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
    event.preventDefault();
    const suggestionBox = document.getElementById('suggestion-box');
    const suggestion = suggestionBox.value.trim();

    if (suggestion === "") {
        alert("Please enter a suggestion before submitting.");
        return;
    }

    // Send the suggestion to the server
    fetch('/suggestions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ suggestion })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Suggestion submitted:", data);
        alert("Thank you for your suggestion!");
        // Clear the suggestion box after submission
        suggestionBox.value = "";
    })
    .catch(error => {
        console.error("Error submitting suggestion:", error);
        alert("There was an error submitting your suggestion. Please try again.");
    });
}

// filepath: c:\Users\Alba\Downloads\Coding\Arden\server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Endpoint to handle suggestions
app.post('/suggestions', (req, res) => {
    const suggestion = req.body.suggestion;
    console.log('Received suggestion:', suggestion);
    // Here you can save the suggestion to a database or file
    res.json({ message: 'Suggestion received!' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});