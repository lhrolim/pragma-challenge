import { buildBeerResponses } from './beer_response_converter'

const resultSensorData = [
    { id: '1', temperature: -2 },
    { id: '2', temperature: 3 },
    { id: '3', temperature: 3 },
    { id: '4', temperature: 1 },
    { id: '5', temperature: 8 },
    { id: '6', temperature: -1 }
]

const unmatchingBeer = {
    "id": "unmatching",
    "name": "Pilsner",
    "minimumTemperature": 4,
    "maximumTemperature": 6
}

const matchingBeer = {
    "id": "1",
    "name": "Pilsner",
    "minimumTemperature": 4,
    "maximumTemperature": 6
}

const matchingBeer2 = {
    "id": "2",
    "name": "IPA",
    "minimumTemperature": 5,
    "maximumTemperature": 6
}

describe('beer responses', () => {
    test('only include matching sensor data', () => {
        const result = buildBeerResponses([matchingBeer, matchingBeer2, unmatchingBeer], resultSensorData)
        expect(result.length).toBe(2)
        const resultArray = [{ id: "1", name: "Pilsner", temperature: -2, status: -1 }, { id: "2", name: "IPA", temperature: 3, status: -1 }]
        expect(result).toEqual(resultArray)
    })
})