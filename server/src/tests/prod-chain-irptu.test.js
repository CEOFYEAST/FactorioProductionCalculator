import {addIRPTU, subtractIRPTU} from "../scripts/prod-chain-irptu.module"

// INVALID TESTS

test('Test invalid ID throws exception', () => {
    expect(addIRPTU("invalid-id", 10, emptyProdChain)).toThrow()
    expect(subtractIRPTU("invalid-id", 10, simpleProdChain)).toThrow()
})

test('Test invalid addition amount throws exception', () => {
    expect(addIRPTU("burner-inserter", 0, emptyProdChain)).toThrow()
    expect(addIRPTU("burner-inserter", -1, emptyProdChain)).toThrow()
})

test('Test invalid subtraction amount throws exception', () => {
    expect(subtractIRPTU("burner-inserter", 0, emptyProdChain)).toThrow()
    expect(subtractIRPTU("burner-inserter", -1, emptyProdChain)).toThrow()
    expect(subtractIRPTU("burner-inserter", 5, emptyProdChain)).toThrow()
    expect(subtractIRPTU("burner-inserter", 15, simpleProdChain)).toThrow()
})

test('Test invalid prod. chain input throws exception', () => {
    expect(addIRPTU("burner-inserter", 5, {})).toThrow()
})

// VALID TESTS

    // IRPTU ADDITION - EMPTY INITIAL CHAIN TESTS

test('Test full prod. chain output after IRPTU addition, and empty initial chain', () => {
    expect(addIRPTU("burner-inserter", 10, emptyProdChain)).toEqual(simpleProdChain)
})

test('Test user demand output after IRPTU addition, and empty initial chain', () => {
    expect(addIRPTU("burner-inserter", 10, emptyProdChain)).toMatchObject(simpleUserDemand)
})

test('Test interm. demand output after IRPTU addition, and empty initial chain', () => {
    expect(addIRPTU("burner-inserter", 10, emptyProdChain)).toMatchObject(simpleIntermDemand)
})

    // IRPTU ADDITION - POPULATED INITIAL CHAIN TESTS

test('Test full prod. chain output after IRPTU addition, and populated initial chain', () => {
    let popChain = addIRPTU("burner-inserter", 10, emptyProdChain)
    expect(addIRPTU("long-handed-inserter", 20, popChain)).toEqual(populatedProdChain)
})

test('Test user demand output after IRPTU addition, and populated initial chain', () => {
    let popChain = addIRPTU("burner-inserter", 10, emptyProdChain)
    expect(addIRPTU("long-handed-inserter", 20, popChain)).toMatchObject(popUserDemand)
})

test('Test interm. demand output after IRPTU addition, and populated initial chain', () => {
    let popChain = addIRPTU("burner-inserter", 10, emptyProdChain)
    expect(addIRPTU("long-handed-inserter", 20, popChain)).toMatchObject(popIntermDemand)
})

    // IRPTU SUBTRACTION

test('Test empty prod. chain output after full IRPTU subtraction', () => {
    let popChain = addIRPTU("burner-inserter", 10, emptyProdChain)
    expect(subtractIRPTU("burner-inserter", 10, popChain)).toEqual(emptyProdChain)
})

test('Test partial prod. chain output after partial IRPTU subtraction', () => {
    let popChain = addIRPTU("burner-inserter", 10, emptyProdChain)
    expect(subtractIRPTU("burner-inserter", 5, popChain)).toEqual(partialProdChain)
})


// TEST PROD. CHAIN DATA

    // VALID DATA

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
        "inserter": {
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
                "inserter": 30,
                "long-handed-inserter": 20
            }
        },
        "electronic-circuit": {
            userIRPTU: 0,
            intermIRPTU: 30,
            dependentItems: {
                "inserter": 30,
            }
        },
        "copper-cable": {
            userIRPTU: 0,
            intermIRPTU: 90,
            dependentItems: {
                "electronic-circuit": 90
            }
        },
        "iron-plate": {
            userIRPTU: 0,
            intermIRPTU: 180,
            dependencyItems: {
                "electronic-circuit": 30,
                "iron-gear-wheel": 100,
                "inserter": 30,
                "long-handed-inserter": 20,
            }
        },
        "iron-ore": {
            userIRPTU: 0,
            intermIRPTU: 180,
            dependencyItems: {
                "iron-plate": 180
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
    "inserter": {
        userIRPTU: 10,
        intermIRPTU: 20,
        dependentItems: {
            "long-handed-inserter": 20
        }
    },
}

let popIntermDemand = {
    prodChain: {
        "iron-plate": {
            userIRPTU: 0,
            intermIRPTU: 180,
            dependencyItems: {
                "electronic-circuit": 30,
                "iron-gear-wheel": 100,
                "inserter": 30,
                "long-handed-inserter": 20,
            }
        },
    }
}

// used for removal tests
let partialProdChain = {
    timeUnit: "minute",
    prodChain: {
        "burner-inserter": {
            userIRPTU: 5,
            intermIRPTU: 0,
            dependentItems: {}
        },
        "iron-gear-wheel": {
            userIRPTU: 0,
            intermIRPTU: 5,
            dependentItems: {
                "burner-inserter": 5
            }
        },
        "iron-plate": {
            userIRPTU: 0,
            intermIRPTU: 15,
            dependencyItems: {
                "burner-inserter": 5,
                "iron-gear-wheel": 10
            }
        },
        "iron-ore": {
            userIRPTU: 0,
            intermIRPTU: 15,
            dependencyItems: {
                "iron-plate": 15
            }
        }
    }
}
