// server-express.js
const express = require('express')
const app = express() // initialize app
const port = 3000
let counter = 0;

// GET callback function returns a response message
app.get('/', (req, res) => {
    res.send('Hello World! Welcome to Node.js')
})




// GET function that returns the number of visits for node session
app.get('/visits', (req, res) => {
	counter += 1
      // Text formatting from ‘text formatting’ JavaScript prelab section
	res.send(`There have been ${counter} visits to this session`);
});

// Rock Paper Scissors (1 for rock, 2 for paper, 3 for scissors)
app.get('/rock', (req, res) => {
    const rndInt = Math.floor(Math.random() * 3) + 1
    console.log(rndInt)
    if (rndInt == 3) {
        console.log("Bot picked Scissors. You win!");
    } else if (rndInt == 2) {
        console.log("Bot picked Paper. You lose.");
    } else {
        console.log("Bot also picked Rock. TIE!!")
    }
});
app.get('/paper', (req, res) => {
    const rndInt = Math.floor(Math.random() * 3) + 1
    console.log(rndInt)
    if (rndInt == 3) {
        console.log("Bot picked Scissors. You lose.");
    } else if (rndInt == 2) {
        console.log("Bot also picked Paper. TIE!!!");
    } else {
        console.log("Bot picked Rock. You win!")
    }
});
app.get('/scissors', (req, res) => {
    const rndInt = Math.floor(Math.random() * 3) + 1
    console.log(rndInt)
    if (rndInt == 3) {
        console.log("Bot also picked Scissors. TIE!!!");
    } else if (rndInt == 2) {
        console.log("Bot picked Paper. You win!");
    } else {
        console.log("Bot picked Rock. You lose.")
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})