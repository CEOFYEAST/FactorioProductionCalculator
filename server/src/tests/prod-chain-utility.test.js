import {getUserDemand, recalculateTimeUnit} from "../scripts/prod-chain-utility.module"
import * as SampleChains from "./prod-chain-data"

// GetUserDemand Tests

    // INVALID TESTS

test('Test invalid prod. chain input throws exception', () => {
    expect(getUserDemand({})).toThrow()
})

    // VALID TESTS

test('Test user demand parse on simple production chain', () => {
    expect(getUserDemand(SampleChains.simpleProdChain["prodChain"])).toEqual(simpleParsedUserDemand)
})

test('Test user demand parse on populated production chain', () => {
    expect(getUserDemand(SampleChains.populatedProdChain["prodChain"])).toEqual(populatedParsedUserDemand)
})

// RecalculateTimeUnit Tests

    // INVALID TESTS

test('Test invalid prod. chain input throws exception', () => {
    expect(recalculateTimeUnit({}, "minute")).toThrow()
})

test('Test invalid time unit input throws exeption', () => {
    expect(recalculateTimeUnit({}, "minute")).toThrow()
})

    // VALID TESTS

test('Test valid simple prod. chain conversion to seconds', () => {
    expect(recalculateTimeUnit(SampleChains.simpleProdChain, "second"))
        .toEqual(SampleChains.simpleProdChain_Seconds)
})

test('Test valid simple prod. chain conversion to hours', () => {
    expect(recalculateTimeUnit(SampleChains.simpleProdChain, "hour"))
        .toEqual(SampleChains.simpleProdChain_Hours)
})

/**
 * Possible Tests:
 * - converting minutes-based chain to hours and seconds
 * - converting seconds-based chain to minutes and hours
 * - converting hours-based chain to minutes and seconds
 * 
 * Thoughts:
 * - could just treat an existing chain as an hours, seconds, minutes chain
 */

// test('Test time unit recalculation to seconds on simple production chain', () => {
//     expect(recalculateTimeUnit(SampleChains.simpleProdChain)).toEqual(simpleParsedUserDemand)
// })

// test('Test time unit recalculation to hours on populated production chain', () => {
//     expect(getUserDemand(SampleChains.populatedProdChain)).toEqual(populatedParsedUserDemand)
// })

let simpleParsedUserDemand = {
    "burner-inserter": 10
}

let populatedParsedUserDemand = {
    "long-handed-inserter": 20,
    "inserter": 10
}