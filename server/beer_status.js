import { locateBeer } from "./beer_repository"

const beerStatusValue = (value, beer) => {
    if (!beer){
        throw new Error("beer not found")
    }
    const { minimumTemperature, maximumTemperature } = beer
    if (value < minimumTemperature) {
        return -1 //too low
    }
    if (value > maximumTemperature) {
        return 1 //too high
    }
    return 0 // all good
}


/**
 * 
 * @param {*} value returned from the sensor API
 * @param {*} beerId id of the beer under consideration
 * @returns just an integer indicating the status.
 */
export const beerStatus = (beer, value) => {
    return beerStatusValue(value, beer)
}


/**
 * Wrapper method to make tests easier, however on the real invocation, 
 * to avoid having several calls to locateBeer we would eager load the list upfront
 * 
 */
export const beerStatusWrapped = (beerId, value) => {
    const beer = locateBeer(beerId)
    return beerStatusValue(value, beer)
}

