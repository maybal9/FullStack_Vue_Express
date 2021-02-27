const express = require('express');
const DBHandler = require('./DBhandler');
const weather_router = express.Router();

weather_router.route('/:city')
    // Get weather of city
    .get(async (req, res) =>{ 
        var city = req.params.city;
        var weather = await DBHandler.GetWeather(city);
        res.send(weather);
    })
    // Delete city
    .delete(async(req, res) => {
        var city = req.params.city;
        await DBHandler.DeleteCity(city);
        res.send(`city ${city} deleted`);
    });

//Get all weathers
weather_router.route('/')
    .get(async (req, res) =>{
        const weathers = await DBHandler.GetAllWeathers();
        res.send(weathers);
    })
    //Add a city (POST)
    .post(async (req, res) => {
        var city = req.body.city;
        var weather = req.body.weather;
        await DBHandler.AddCityWeather(city, weather);
        res.status(201);
        res.send(`city ${city} added`);
    })
    //Update city weather
    .put(async (req, res) => {
        var city = req.body.city;
        var weather = req.body.weather;
        await DBHandler.UpdateCityWeather(city, weather);
        res.send(`city ${city} updated`);
    })
    // Delete city
    .delete(async(req, res) => {
        var city = req.body.city;
        await DBHandler.DeleteCity(city);
        res.send(`city ${city} deleted`);
    });
    

module.exports = weather_router;