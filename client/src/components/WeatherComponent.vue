<template>
  <div class="container">
    <h1 class="title">Latest Weather Information</h1>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="container has-background-warning-light"> 
      <label for="Add weather">Add city and temperature</label>
      <div class="center">
        <input class="input" type="text" id="Add-city" v-model="city" placeholder="Ramat-Gan, Givaatayim, etc..">
        <input class="input" type="text" id="Add-temp" v-model="temp" placeholder="What is the temperature now?">
      </div>
      <button class="button" @click="AddWeather">Add!</button>
      <div class="table-center">
        <table class="table has-background-primary-light">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature (in Celsius)</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="weather in weathers" :key="weather.city">
              <td class="has-text-centered"> {{weather.city}} </td>
              <td class="has-text-centered"> {{weather.temp}} </td>
              <td> <button class="button has-text-centered has-background-link-light" @click="DeleteWeather(weather.city)"> Delete! </button> </td>
            </tr>
          </tbody>
        </table>
      </div>
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

<style scoped>
.center {
  margin: auto;
  width: 20%;
  padding: 10px;
}
.table-center {
  margin: auto;
  width: 35%;
  padding: 10px;
  overflow: auto;
}
</style>
