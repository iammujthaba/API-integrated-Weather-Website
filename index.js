import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://api.weatherstack.com";
const bearerToken = "03fd6ce7fe9c1e8e6aa9ad2a91d20bc0";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/get-secret",async (req, res) => {
    const endPoit = "/current"
    const cityName = req.body.cityName;
    console.log(cityName);
    try {
        const response = await axios.get(API_URL + endPoit, {
          params:{
              query: cityName,
              access_key: bearerToken
          }
        });
        console.log(response.data);
        res.render("feature.ejs",{allData: response.data});

    } catch (error) {
        console.error("Failed to make request:", error.message);
    }    
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
