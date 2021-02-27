var config = require('../../config');
//connection to mongodb using Atlas
const mongodb = require('mongodb');

DB_handler = {
    db_uri: "mongodb+srv://" + config.db.username + ":" + config.db.password + "@cluster0.1ice3.mongodb.net/"+ config.db.dbname + "?retryWrites=true&w=majority",
    dbName: "vue_express",
    collectionName: "weather",

    LoadWeatherCollection: async function(){
        const client = await mongodb.MongoClient.connect(this.db_uri, { useNewUrlParser: true, useUnifiedTopology: true });
        return client.db(this.dbName).collection(this.collectionName);
    },

    GetAllWeathers: async function(){
        const collection = await this.LoadWeatherCollection();
        var docs = await collection.find({}).toArray();
        docs = docs.filter(doc => doc.city != null);
        return docs;
    },

    GetWeather: async function(city){
        const collection = await this.LoadWeatherCollection();
        const doc = await collection.find({city: city}).toArray();
        return doc.temp;
    },

    AddCityWeather: async function(city, weather){
        cityWeather = {city: city, temp: weather};
        const collection = await this.LoadWeatherCollection();
        await collection.insertOne(cityWeather);
        return true;
    },

    UpdateCityWeather: async function(city, weather){
        const weathers = await this.LoadWeatherCollection();
        await weathers.updateOne( {city: city}, {tmep: weather});
        return true;
    },

    DeleteCity: async function(city){
        const weathers = await this.LoadWeatherCollection();
        await weathers.deleteOne({city: city});
        return true;
    }
};

module.exports = DB_handler;

