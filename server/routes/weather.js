const express = require('express');
const DBHandler = require('./DBhandler');
const weather_router = express.Router();

weather_router.route('/:city')
    // Get weather of city
    .get((req, res) =>{ 
        var city = req.params.city;
        var weather = DBHandler.GetWeather(city);
        res.send(weather);
    })
    // Delete city
    .delete((req, res) => {
        var city = req.params.city;
        DBHandler.DeleteCity(city);
        res.send(`city ${city} deleted`);
    });

//Get all weathers
weather_router.route('/')
    .get((req, res) =>{
        var weathers = [];
        DBHandler.GetAllWeathers().then((err, res) => {weathers = res;});
        res.send(weathers);
    })
    //Add a city (POST)
    .post((req, res) => {
        var city = req.body.city;
        var weather = req.body.weather;
        DBHandler.AddCityWeather(city, weather);
        res.status(201);
        res.send(`city ${city} added`);
    })
    //Update city weather
    .put((req, res) => {
        var city = req.body.city;
        var weather = req.body.weather;
        DBHandler.UpdateCityWeather(city, weather);
        res.send(`city ${city} updated`);
    });
    

module.exports = weather_router;