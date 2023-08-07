import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=malappuram&APPID=d0d7672c35930fb0eaa7c63d650b4292";

app.use(bodyParser.urlencoded({ extended: true }));


try { 
    const result = await axios.get(API_URL);
    console.log("it is working");
    console.log(result.data);
} catch (error) {
    console.log("something is wrong....");
    res.render("index.ejs");
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
