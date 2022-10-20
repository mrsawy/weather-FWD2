// Require Express to run server and routes
const express = require(`express`);
const bodyParser = require(`body-parser`);
const cors = require(`cors`);
const path = require(`path`);

const app = express();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static("website"));

app.use(cors());

app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, `website`, `index.html`));
});
app.post(`/weatherData`, (req, res) => {
  projectData = req.body;
  res.end();
});
app.get(`/weatherData`, (req, res) => {
  res.send(projectData);
});

app.listen(3000, () => {
  console.log(`Listennng,sir`);
});

// Setup Server
