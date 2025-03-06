const {addIRPTU, subtractIRPTU, getUserDemand, recalculateTimeUnit} = require("./output2.module")
const { getRecipes } = require("./recipes.module")
const recipes = getRecipes();

test('recipes validity', () => {
    expect(typeof recipes).toBe('object')
})

/**
 * addIRPTU test
 * - INVALID Tests
 *      Test invalid add amount (should be positive integer > 0)
 *      Test invalid ID (should be string that exists as an ID in Recipes)
 *      (Maybe) Test invalid prod. chain object (Could just test that it's an object)
 * - VALID Tests
 *      Test adding amount to empty prod. chain object 
 *      Test adding amount to prod. chain object with existing user demand
 *      Test adding amount to prod. chain object with existing user demand of the same type
 */

// VALID TESTS

    // EMPTY INITIAL CHAIN TESTS

test('Test full prod. chain output after simple IRPTU addition, and empty initial chain', () => {
    expect(addIRPTU("burner-inserter", 10, emptyProdChain)).toEqual(simpleProdChain)
})

test('Test user demand output after simple IRPTU addition, and empty initial chain', () => {
    expect(addIRPTU("burner-inserter", 10, emptyProdChain)).toMatchObject(simpleUserDemand)
})

test('Test interm. demand output after simple IRPTU addition, and empty initial chain', () => {
    expect(addIRPTU("burner-inserter", 10, emptyProdChain)).toMatchObject(simpleIntermDemand)
})

    // POPULATED INITIAL CHAIN TESTS

test('Test full prod. chain output after simple IRPTU addition, and populated initial chain', () => {
    let popChain = addIRPTU("burner-inserter", 10, emptyProdChain)
    expect(addIRPTU("long-handed-inserter"), 20, popChain).toEqual(populatedProdChain)
})

test('Test user demand output after simple IRPTU addition, and populated initial chain', () => {
    let popChain = addIRPTU("burner-inserter", 10, emptyProdChain)
    expect(addIRPTU("long-handed-inserter"), 20, popChain).toMatchObject(popUserDemand)
})

test('Test interm. demand output after simple IRPTU addition, and populated initial chain', () => {
    let popChain = addIRPTU("burner-inserter", 10, emptyProdChain)
    expect(addIRPTU("long-handed-inserter"), 20, popChain).toMatchObject(popIntermDemand)
})



let emptyProdChain = {
    timeUnit: "minute",
    prodChain: {
        
    }
}

let simpleProdChain = {
    timeUnit: "minute",
    prodChain: {
        "burner-inserter": {
            userIRPTU: 10,
            intermIRPTU: 0,
            dependentItems: {}
        },
        "iron-gear-wheel": {
            userIRPTU: 0,
            intermIRPTU: 10,
            dependentItems: {
                "burner-inserter": 10
            }
        },
        "iron-plate": {
            userIRPTU: 0,
            intermIRPTU: 30,
            dependencyItems: {
                "burner-inserter": 10,
                "iron-gear-wheel": 20
            }
        },
        "iron-ore": {
            userIRPTU: 0,
            intermIRPTU: 30,
            dependencyItems: {
                "iron-plate": 30
            }
        }
    }
}

let simpleUserDemand = {
    prodChain: {
        "burner-inserter": {
            userIRPTU: 10,
            intermIRPTU: 0,
            dependentItems: {}
        },
    }
}

let simpleIntermDemand = {
    prodChain: {
        "iron-plate": {
            userIRPTU: 0,
            intermIRPTU: 30,
            dependencyItems: {
                "burner-inserter": 10,
                "iron-gear-wheel": 20
            }
        },
    }
}

let populatedProdChain = {
    timeUnit: "minute",
    prodChain: {
        "long-handed-inserter": {
            userIRPTU: 20,
            intermIRPTU: 0,
            dependentItems: {}
        },
        "burner-inserter": {
            userIRPTU: 10,
            intermIRPTU: 20,
            dependentItems: {
                "long-handed-inserter": 20
            }
        },
        "iron-gear-wheel": {
            userIRPTU: 0,
            intermIRPTU: 50,
            dependentItems: {
                "burner-inserter": 30,
                "long-handed-inserter": 20
            }
        },
        "iron-plate": {
            userIRPTU: 0,
            intermIRPTU: 130,
            dependencyItems: {
                "burner-inserter": 10,
                "long-handed-inserter": 20,
                "iron-gear-wheel": 100
            }
        },
        "iron-ore": {
            userIRPTU: 0,
            intermIRPTU: 130,
            dependencyItems: {
                "iron-plate": 130
            }
        }
    }
}

let popUserDemand = {
    "long-handed-inserter": {
        userIRPTU: 20,
        intermIRPTU: 0,
        dependentItems: {}
    },
    "burner-inserter": {
        userIRPTU: 10,
        intermIRPTU: 20,
        dependentItems: {
            "long-handed-inserter": 20
        }
    },
}

letPopIntermDemand = {
    prodChain: {
        "iron-plate": {
            userIRPTU: 0,
            intermIRPTU: 130,
            dependencyItems: {
                "burner-inserter": 10,
                "long-handed-inserter": 20,
                "iron-gear-wheel": 100
            }
        },
    }
}

