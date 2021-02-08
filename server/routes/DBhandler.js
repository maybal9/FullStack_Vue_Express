//connection to mongodb using Atlas
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://SpringB:enter951@cluster0.1ice3.mongodb.net/vue_express?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// TODO: should this method return the entire collection and other methods can do stuff with it, 
// or should each method connect to DB by itself?
async function loadWeatherCollection(){
    try{
        await client.connect();
        const collection = client.db("vue_express").collection("weather");
        return collection;
    } finally {
        await client.close();
    }
}

async function GetAllWeathers(){
    const weathers = await loadWeatherCollection();
    return weathers.toArray();
}

async function GetWeather(city){
    const weathers = await loadWeatherCollection();
    const temp = await weathers.findOne({city: city});
    return temp.toString();
} 

function AddCityWeather(city, weather){
    const weathers = await loadWeatherCollection();
    await weathers.insertOne({
        city: city,
        temp: weather
    });
}

function UpdateCityWeather(city, weather){
    const weathers = await loadWeatherCollection();
    await weathers.updateOne( {city: city}, {tmep: weather});
}

function DeleteCity(city){
    const weathers = await loadWeatherCollection();
    await weathers.deleteOne({city: city});
}


