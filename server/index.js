const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const weather_router = require('./routes/weather');

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cors());

app.use('/weather', weather_router);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Server started on port ${port}`)});