const express = require('express');
const { locateBeers, locateBeer } = require('./beer_repository.js');

import { buildBeerResponses } from "./beer_response_converter";
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 8081;


app.use(cors());

const buildFetchApiUrl = (beer) => `https://temperature-sensor-service.herokuapp.com/sensor/${beer.id}`


app.get('/temperature/:id', (req, res) => {
  fetch(
    `https://temperature-sensor-service.herokuapp.com/sensor/${req.params.id}`
  )
    .then((response) => response.json())
    .then((response) => res.send(response));
});

const buildBeerPromise = (beer) => {
  return fetch(buildFetchApiUrl(beer))
}




app.get('/temperatures/', async (req, res) => {
  const beers = locateBeers() //here we could have to handle a paginated request
  const promises = beers.map(beer => buildBeerPromise(beer))
  const results = await Promise.all(promises)
  const sensorAPIData = await Promise.all(results.map(res => res.json())) //here we could refactor to Axios
  res.send(buildBeerResponses(beers, sensorAPIData))
});

app.listen(port, () => {
  console.log(`SensorTech server at http://localhost:${port}`);
});
