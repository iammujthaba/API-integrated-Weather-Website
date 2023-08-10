import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://api.weatherstack.com";
const bearerToken = "03fd6ce7fe9c1e8e6aa9ad2a91d20bc0";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function dayPic(){
  var arr = [];   
  var date = new Date();
  // Get the day of the week.
  var day = date.getDay();
  var dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // Get the month of the year.
  var month = date.getMonth();
  var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // Get the year.
  var year = date.getFullYear();

  arr[0] = dayName[day];
  arr[1] = monthName[month];
  arr[2] = year;
  return arr;
}


app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/get-secret",async (req, res) => {
    const endPoit = "/current"
    const cityName = req.body.cityName;
    var date = dayPic();
    console.log(cityName);
    try {
        const response = await axios.get(API_URL + endPoit, {
          params:{
              query: cityName,
              access_key: bearerToken
          }
        });
        console.log(response.data);
        res.render("feature.ejs",{
          allData: response.data,
          date: date
        });

    } catch (error) {
        console.error("Failed to make request:", error.message);
    }    
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
