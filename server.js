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

app.post('/data', function(req, res) {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.name = req.body.name;
    projectData.humidity = req.body.humidity;
    projectData.feelings = req.body.feelings;
    res.send('OK');
})

app.get('/data', function(req, res) {
    res.send(projectData);
});

// Setup Server
const port = process.env.PORT || 8888;
const server = app.listen(port, function() {
    console.log(`server running at http://localhost:${port}`);
})