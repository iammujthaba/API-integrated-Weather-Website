import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://api.weatherstack.com";
const bearerToken = "03fd6ce7fe9c1e8e6aa9ad2a91d20bc0";
var name = ""

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function townName(req, res, next){
  name = req.body.cityName;
  next()
}

app.use(townName)

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
  // Get the time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const time = (`${hours}:${minutes}:${seconds}`);
  console.log(`Current time: ${hours}:${minutes}:${seconds}`);

  arr[0] = dayName[day];
  arr[1] = monthName[month];
  arr[2] = year;
  arr[3] = time;
  return arr;
}


app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/weather",async (req, res) => {//async | change get into past
    const endPoit = "/current"
    const cityName = req.body.cityName;
    console.log(cityName);
    var dateAndTime = dayPic();
    try {
        const response = await axios.get(API_URL + endPoit, {
          params:{
              query: cityName,
              access_key: bearerToken
          }
        });

         const dataofapi = response.data;
        // var ata = JSON.stringify(dataofapi)
        // console.log(ata);
        //const data = {"request":{"type":"City","query":"Malappuram, India","language":"en","unit":"m"},"location":{"name":"Malappuram","country":"India","region":"Kerala","lat":"11.067","lon":"76.067","timezone_id":"Asia/Kolkata","localtime":"2023-08-11 10:30","localtime_epoch":1691749800,"utc_offset":"5.50"},"current":{"observation_time":"05:00 AM","temperature":28,"weather_code":116,"weather_icons":["https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"],"weather_descriptions":["Partly cloudy"],"wind_speed":15,"wind_degree":300,"wind_dir":"WNW","pressure":1011,"precip":0,"humidity":70,"cloudcover":25,"feelslike":30,"uv_index":7,"visibility":6,"is_day":"yes"}}

        console.log(dataofapi);
        res.render("feature.ejs",{
          allData: dataofapi,
          date: dateAndTime
        });

    } catch (error) {
      console.error("Failed to make request:", error.message);

      const errorMassage = ("Oops! ,", error.message);
      console.log(errorMassage);
      res.render("feature.ejs", {
        error: errorMassage
      });
    }    
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
