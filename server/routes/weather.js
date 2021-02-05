const express = require('express');
const mongodb = require('mongodb');

const weather_router = express.Router();

var weathers = [
    {city: "Tel-Aviv", temp: 17},
    {city: "Jerusalem", temp: 9}
]

function GetWeather(city){
    //make sure city exists
    weather = weathers.find( w => w.city = city);
    return weather.temp.toString();
}

function DeleteCity(city){
    //make sure city entry exists
    var index = weathers.findIndex( (element) => element.city == city );
    if (index > -1) {
        weathers.splice(index, 1);
    }
    return weathers;
}

function GetAllWeathers(){
    return weathers;
}

function AddCityWeather(city, weather){
    //make sure city doesn't exists already
    var weather_container = {};
    weather_container.city = city;
    weather_container.temp = weather;
    weathers.push(weather_container);
    return weathers;
}

function UpdateCityWeather(city, weather){
    //make sure city entry exists
    weathers.find( w => w.city = city).temp = weather;
}

weather_router.route('/:city')
    // Get weather of city
    .get((req, res) =>{ 
        var city = req.params.city;
        var weather = GetWeather(city);
        res.send(weather);
    })
    // Delete city
    .delete((req, res) => {
        var city = req.params.city;
        DeleteCity(city);
        res.send(`city ${city} deleted`);
    });

//Get all weathers
weather_router.route('/')
    .get((req, res) =>{
        var weathers = GetAllWeathers();
        res.send(weathers);
    })
    //Add a city (POST)
    .post((req, res) => {
        var city = req.body.city;
        var weather = req.body.weather;
        AddCityWeather(city, weather);
        res.status(201);
        res.send(`city ${city} added`);
    })
    //Update city weather
    .put((req, res) => {
        var city = req.body.city;
        var weather = req.body.weather;
        UpdateCityWeather(city, weather);
        res.send(`city ${city} updated`);
    });
    

module.exports = weather_router;