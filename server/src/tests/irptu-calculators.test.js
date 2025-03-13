import {calculateIntermediaryDemand, updateProductionChainDemand} from "../scripts/irptu-calculators.module"

test.only('Test proper intermediary demand calculation for simple input', () => {
    let demandOutput = {}
    calculateIntermediaryDemand("burner-inserter", 10, demandOutput)
    expect(demandOutput).toEqual(simpleDemandOutput)
})

let simpleDemandOutput = {
    "iron-gear-wheel": {
        IRPTU: 10,
        dependencyItems: {
            "burner-inserter": 10
        }
    },
    "iron-plate": {
        IRPTU: 30,
        dependencyItems: {
            "burner-inserter": 10,
            "iron-gear-wheel": 20
        }
    },
    "iron-ore": {
        IRPTU: 30,
        dependencyItems: {
            "iron-plate": 30
        }
    }
}