import axios from 'axios';

// TODO proxy access to backend api
const backend_api_url = 'http://localhost:5000/weather/';

//This Service handles all requests to backend
class WeatherService {
    // Get all weathers
    static GetAllWeathers() {
        return new Promise((resolve, reject) =>{
            try{
                var res = axios.get(backend_api_url);
                var data = res.data;
                // TODO what to to do with the data?
                resolve(
                    data.map(kv_pair => {
                        kv_pair.city,
                        kv_pair.temp
                    })
                );
            }
            catch(err){
                reject(err);
            }
        });
    }
    // Get weather of city
    static GetWeather(city) {
        return new Promise((resolve, reject) =>{
            try{
                var res = axios.get(`${backend_api_url}${city}`);
                var data = res.data;
                // TODO what to to do with the data?
                resolve(
                    data.temp
                );
            }
            catch(err){
                reject(err);
            }
        });
    }
    // Add city and weather
    static AddCity(city, temp){
        return axios.post(backend_api_url, {
            city: city,
            weather: temp
        });
    }
    // Update weather of city
    static UpdateCityWeather(city, temp){
        return axios.put(backend_api_url, {
            city: city,
            weather: temp
        });
    }
    // Delete city
    static DeleteCity(city){
        return axios.delete(`${backend_api_url}${city}`, {
            city: city
        });
    }
}

export default WeatherService;