// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

<<<<<<< Updated upstream
app.post('/addData', function(req, res) {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;
    projectData.country = req.body.country;
    res.send('Data added');
})
=======
const port = 8888;
// Setup Server
>>>>>>> Stashed changes

app.get('/data', function(req, res) {
    res.send(projectData);
});

<<<<<<< Updated upstream
// Setup Server
const port = 8888;

const server = app.listen(port, function() {
    console.log(`server running at http://localhost:${port}`);
})
=======
app.post('/addData', function(req, res) {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;
    res.send();
});

const server = app.listen(port, function() {
    console.log(`server running at http://localhost:${port}`);
});
>>>>>>> Stashed changes
