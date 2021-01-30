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
        <!-- <tbody></tbody> -->
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
      weathers: {},
      error: '',
      city: '',
      temp: 0
    }
  },
  // life-cycle method, runs automatically when component is created
  created(){
    try{
      this.weathers = WeatherService.GetAllWeathers();
    } catch(err){
      this.error = err;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
