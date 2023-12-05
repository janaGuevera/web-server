const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const server = express();

// Configure to serve static files
const publicPath = path.join(__dirname, "../public");
server.use(express.static(publicPath)); 

// Set up View Engine
server.set("view engine", "hbs");

// Set partial files
const partialPath = path.join(__dirname, "../views/partials");
hbs.registerPartials(partialPath);


// Routes for interface
server.get("/", (req, res) => {
    res.render("index", {title: "Weather App", author: "Beyond"});
});

server.get("/about", (req, res) => { 
    res.render("about", {title: "Weather App", author: "Beyond Training"});
});

server.get("/help", (req, res) => { 
    res.render("help", {title: "Weather App", author: "Beyond Training"});
});

server.get("/weather", (req, res) => {
    if(req.query.location){
        geocode(req.query.location, (error, geo) => {
            if(error){
                res.send({error: error});
            }else{
                forecast(geo.latitude, geo.longitude, (error, weather) => {
                    if(error){
                        res.send({error: error});
                    }else{
                        res.send({forecast: weather});
                    }
                });
            }
        });
    }else{
        res.send({error: "Please provide the location!"});
    }
});

server.listen(3000);

