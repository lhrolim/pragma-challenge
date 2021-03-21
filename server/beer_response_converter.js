import { beerStatus } from "./beer_status";

export const buildBeerResponses = (beers, sensorAPIData) => {
  return beers.map(beer => buildBeerResponse(beer, sensorAPIData)).filter(b => b !== null)
}

export const buildBeerResponse = (beer, sensorAPIData) => {
  const beerSensor = sensorAPIData.find(sensorData => sensorData.id === beer.id);
  if (!beerSensor) {
    //TODO: add log here to indicate sensor did not return data
    return null 
  }
  const beerTemperature = beerSensor.temperature
  const status = beerStatus(beer, beerTemperature)
  const result = { id: beer.id, "name": beer.name, "temperature": beerTemperature, "status": status }
  return result
}