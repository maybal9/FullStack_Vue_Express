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
        var city_exists = await DBHandler.CityExists(city);
        if (city_exists) {
            res.status(403);
            res.send(`city ${city} already exists, try updating its temp instead!`);
        } else {
            await DBHandler.AddCityWeather(city, weather);
            res.status(201);
            res.send(`city ${city} added`);
        }
    })
    //Update city weather
    .put(async (req, res) => {
        var city = req.body.city;
        var weather = req.body.weather;
        if (city_exists) {
            await DBHandler.UpdateCityWeather(city, weather);
            res.send(`city ${city} updated`);
        } else {
            res.status(403);
            res.send(`city ${city} doesn't exists!`);
        }
    })
    // Delete city
    .delete(async(req, res) => {
        var city = req.body.city;
        var city_exists = await DBHandler.CityExists(city);
        if (city_exists) {
            await DBHandler.DeleteCity(city);
            res.send(`city ${city} deleted`);
        } else {
            res.status(403);
            res.send(`city ${city} doesn't exists!`);
        }
    });
    

module.exports = weather_router;