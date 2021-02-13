var config = require('../../config');
//connection to mongodb using Atlas
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + config.db.username + ":" + config.db.password + "@cluster0.1ice3.mongodb.net/"+ config.db.dbname + "?retryWrites=true&w=majority";
const options = {useUnifiedTopology: true};

DB_handler = {
    dbName: config.db.dbname,
    collectionName: "weather",

    GetAllWeathers: async function(){
        MongoClient.connect(uri, options, function(err, client) {
            const db = client.db(this.dbName);
            const collection = db.collection("weather");
            collection.find({}).toArray((err, docs) => {
                console.log("retrieved "+ docs.length +" documents");
                client.close();
                return docs;
            });
        });
    },

    GetWeather: async function(city){
        const weathers = await this.loadWeatherCollection();
        const temp = await weathers.findOne({city: city});
        return temp.toString();
    },

    AddCityWeather: async function(city, weather){
        cityWeather = {city: city, temp: weather};
        MongoClient.connect(uri, options, function(err, client) {
            const db = client.db(this.dbName);
            const collection = db.collection("weather");
            collection.insertOne(cityWeather, (err, res) => {
                console.log("Inserted " + cityWeather.city.toString()+ " into the collection");
                client.close();
            });
        });
        // const weathers = await this.loadWeatherCollection();
        // await weathers.insertOne({
        //     city: city,
        //     temp: weather
        // });
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

