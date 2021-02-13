var config = require('../../config');

//connection to mongodb using Atlas
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + config.db.username + ":" + config.db.password + "@cluster0.1ice3.mongodb.net/"+ config.db.dbname + "?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

DB_handler = {
    // TODO: make this functional
    loadWeatherCollection: async function(){
        try{
            await client.connect();
            const collection = client.db(config.db.dbname).collection("weather");
            return collection;
        } finally {
            await client.close();
        }
    },

    GetAllWeathers: async function(){
        const weathers = await this.loadWeatherCollection();
        return weathers.toArray();
    },

    GetWeather: async function(city){
        const weathers = await this.loadWeatherCollection();
        const temp = await weathers.findOne({city: city});
        return temp.toString();
    },

    AddCityWeather: async function(city, weather){
        const weathers = await this.loadWeatherCollection();
        await weathers.insertOne({
            city: city,
            temp: weather
        });
    },

    UpdateCityWeather: async function(city, weather){
        const weathers = await this.loadWeatherCollection();
        await weathers.updateOne( {city: city}, {tmep: weather});
    },

    DeleteCity: async function(city){
        const weathers = await this.loadWeatherCollection();
        await weathers.deleteOne({city: city});
    }
};

module.exports = DB_handler;

