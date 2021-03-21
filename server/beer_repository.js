import beers from './beers.json'

/**
 * Initial implementation lies on a json file, but as the system scales this
 * could/should be offloaded to a data storage.
 * 
 * Probably these would be an async method with proper caching implemented.
 * 
 */
export const locateBeer = (beerId) => {
    return beers.find(a => a.id == beerId)
}

/**
 * 
 * @returns list of all beers to check. eventually would be paginated and filtered while also async from a database
 */
export const locateBeers = () => {
    return beers
}