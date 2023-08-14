// Import required modules
import express from "express";  // Import the Express framework
import axios from "axios";  // Import the Axios library for making HTTP requests
import bodyParser from "body-parser";  // Import the Body Parser middleware for parsing request bodies

const app = express(); // Create an instance of the Express app
const port = 3000;  // Set the port number for the server

// Define API-related constants
const API_URL = "http://api.weatherstack.com";  // WeatherStack API base URL
const endPoit = "/current";  // API endpoint for current weather data
const bearerToken = "03fd6ce7fe9c1e8e6aa9ad2a91d20bc0";  // API access token

// Configure middleware
app.use(express.static("public"));  // Serve static files from the "public" directory
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded request bodies

// Function to generate date and time information
function dateAndTimePicker() {
  var arr = [];
  var date = new Date();

  // Extract date components
  var day = date.getDay();
  var dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var month = date.getMonth();
  var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var year = date.getFullYear();

  // Get the time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const time = (`${hours}:${minutes}:${seconds}`);

  // Populate the array with date and time components
  arr[0] = dayName[day];
  arr[1] = monthName[month];
  arr[2] = year;
  arr[3] = time;

  return arr;  // Return the array with date and time information
}

// Define routes

// Default route for rendering the index page
app.get("/", (req, res) => {
  res.render("index.ejs");  // Render the "index.ejs" template
});

// Route for handling weather data submission
app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;  // Get the city name from the request body
  var dateAndTime = dateAndTimePicker();  // Get date and time information using the dateAndTimePicker function
  
  try {
    // Make a GET request to the WeatherStack API
    const response = await axios.get(API_URL + endPoit, {
      params: {
        query: cityName,
        access_key: bearerToken
      }
    });

    // Render the "feature.ejs" template with weather data and date/time information
    res.render("feature.ejs", {
      allData: response.data,
      date: dateAndTime
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    
    // Render the "feature.ejs" template with an error message
    res.render("feature.ejs", {
      error: ("Oops! ," + error.message)
    });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
