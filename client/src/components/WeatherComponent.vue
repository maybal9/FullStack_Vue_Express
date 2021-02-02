<template>
  <div class="section">
    <h1>Latest Weather Information</h1>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="container"> 
      <table class="table" is-bordered>
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
  created(){
    WeatherService.GetAllWeathers().then(res => this.weathers = res).catch(err => this.error = err); 
  }
}
</script>

