import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=malappuram&APPID=d0d7672c35930fb0eaa7c63d650b4292";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/get-secret",async (req, res) => {
    const cityName = req.body;
    console.log(cityName);
    try {
        const response = await axios.get(API_URL);
        console.log(response.data);
        res.render("index.ejs");

    } catch (error) {
        console.error("Failed to make request:", error.message);
    }    
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
