// TODO: how to implement factory without objects???
var simple_handler = {
    simple_handler: function(){},
    weathers: [
        {city: "Tel-Aviv", temp: 17},
        {city: "Jerusalem", temp: 9}
    ],

    GetWeather: function(city){
        //make sure city exists
        weather = weathers.find( w => w.city = city);
        return weather.temp.toString();
    },

    DeleteCity: function(city){
        //make sure city entry exists
        var index = weathers.findIndex( (element) => element.city == city );
        if (index > -1) {
            weathers.splice(index, 1);
        }
        return weathers;
    },

    GetAllWeathers: function(){
        return weathers;
    },

    AddCityWeather: function(city, weather){
        //make sure city doesn't exists already
        var weather_container = {};
        weather_container.city = city;
        weather_container.temp = weather;
        weathers.push(weather_container);
        return weathers;
    },

    UpdateCityWeather: function(city, weather){
        //make sure city entry exists
        weathers.find( w => w.city = city).temp = weather;
    }
};

module.exports = simple_handler;