<template>
  <div class="container">
    <h1>Latest Weather Information</h1>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="container"> 
      <label for="Add weather">Add city and temperature</label>
      <input class="input" type="text" id="Add-city" v-model="city" placeholder="Ramat-Gan, Givaatayim, etc..">
      <input class="input" type="text" id="Add-temp" v-model="temp" placeholder="What is the temperature now?">
      <button class="button" @click="AddWeather">Add!</button>
      <table class="table">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (in Celsius)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="weather in weathers" :key="weather.city">
            <th> {{weather.city}} </th>
            <th> {{weather.temp}} </th>
            <th> <button class="button" @click="DeleteWeather(weather.city)"> Delete! </button> </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import WeatherService from '../WeatherService';
export default {
  name: 'WeatherComponent',
  data(){
    return {
      weathers: [],
      error: '',
      city: '',
      temp: 0
    }
  },
  // life-cycle method, runs automatically when component is created
  async created(){
    await WeatherService.GetAllWeathers().then(res => this.weathers = res).catch(err => this.error = err); 
  }, 
  methods: {
    async AddWeather() {
      await WeatherService.AddCity(this.city, this.temp);
      await WeatherService.GetAllWeathers().then(res => this.weathers = res).catch(err => this.error = err); 
    },
    async DeleteWeather(city){
      await WeatherService.DeleteCity(city);
      await WeatherService.GetAllWeathers().then(res => this.weathers = res).catch(err => this.error = err); 
    }
  },
}
</script>

