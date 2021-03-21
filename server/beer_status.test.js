import { beerStatusWrapped } from './beer_status'

describe('Validate beer status', () => {
    test('validate good status for provided database', () => {
        expect(beerStatusWrapped('1', 5)).toBe(0);
        expect(beerStatusWrapped('2', 5.5)).toBe(0);
        expect(beerStatusWrapped('3', 5)).toBe(0);
        expect(beerStatusWrapped('4', 7)).toBe(0);
        expect(beerStatusWrapped('5', 3)).toBe(0);
        expect(beerStatusWrapped('6', 5)).toBe(0);
    });

    test('validate numeric ids are valid', () => {
        expect(beerStatusWrapped(1, 5)).toBe(0);
    });

    test('validate too high status provided database', () => {
        expect(beerStatusWrapped('1', 6.1)).toBe(1);
        expect(beerStatusWrapped('2', 6.1)).toBe(1);
        expect(beerStatusWrapped('3', 7.1)).toBe(1);
        expect(beerStatusWrapped('4', 15.1)).toBe(1);
        expect(beerStatusWrapped('5', 10)).toBe(1);
        expect(beerStatusWrapped('6', 15)).toBe(1);
    });

    test('validate too low status provided database', () => {
        expect(beerStatusWrapped('1', 1.1)).toBe(-1);
        expect(beerStatusWrapped('2', 2.1)).toBe(-1);
        expect(beerStatusWrapped('3', 3.1)).toBe(-1);
        expect(beerStatusWrapped('4', 5.1)).toBe(-1);
        expect(beerStatusWrapped('5', 2)).toBe(-1);
        expect(beerStatusWrapped('6', 3)).toBe(-1);
    });

    test('validate edge temperature cases', () => {
        expect(beerStatusWrapped('1', 4)).toBe(0);
        expect(beerStatusWrapped('1', 3.99)).toBe(-1);
        expect(beerStatusWrapped('1', 6.01)).toBe(1);
    });

    test('exception on unknow beer', () => {
        expect(() => {
            beerStatusWrapped('not found beer', 4)
        }).toThrow('beer not found')
    });
})