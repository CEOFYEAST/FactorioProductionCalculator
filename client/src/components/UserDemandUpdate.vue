<template>
  <div class="UserDemandUpdate-container">
    
    <div class="container__content">
        <h3 class="container__section-title">Update User Demand</h3>
      <div class="form-row">
        <label class="form-row__label" for="itemID">Enter Item ID</label>
        <input class="form-row__input" id="itemID" type="text" v-model="itemID" />
      </div>

      <div class="form-row">
        <label class="form-row__label" for="itemIRPTU">Enter Item IRPTU</label>
        <input class="form-row__input" id="itemIRPTU" type="number" v-model="itemIRPTU" />
      </div>

      <div class="form-row">
        <label class="form-row__label" for="requestTimeUnit">Select Request Time Unit</label>
        <select class="form-row__select" id="requestTimeUnit" v-model="timeUnit">
          <option value="second">Second</option>
          <option value="minute">Minute</option>
          <option value="hour">Hour</option>
        </select>
      </div>

      <div class="form-row form-row--buttons">
        <button class="form-row__button" @click="addToFactory">Add Specified Item to the Factory</button>
        <button class="form-row__button" @click="removeFromFactory">Remove Specified Item from the Factory</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDemandUpdate',
  props: {
    factoryService: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      itemID: "inserter",
      itemIRPTU: 10,
      timeUnit: "minute"
    }
  },
  methods: {
    addToFactory() {
      this.factoryService.addDemand(this.itemID, this.itemIRPTU, this.timeUnit)
    },
    removeFromFactory() {
      this.factoryService.subtractDemand(this.itemID, this.itemIRPTU, this.timeUnit)
    }
  }
}
</script>

<style scoped>
.UserDemandUpdate-container {
  margin-bottom: 20px;
}

.container__section-title {
  margin-top: 0;
  margin-bottom: 10px;
  font-family: var(--main-font-family);
}

.container__content {
  border: 1px solid gray;
  padding: 15px;
  border-radius: 4px;
  background-color: var(--primary-color);
  margin-bottom: 20px;
}

.form-row {
  margin-bottom: 10px;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  color: var(--main-text-color);
}

.form-row__label {
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  color: var(--main-text-color);
}

.form-row__input, .form-row__select {
  margin-left: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
}

/* Center buttons in their container */
.form-row--buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center buttons horizontally */
  margin-top: 20px; /* Add some space above the buttons */
}

.form-row__button {
  padding: 8px 16px;
  background-color: var(--secondary-color);
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  margin: 0 10px; /* Equal margin on both sides for better centering */
  transition: background-color 0.2s;
}

.form-row__button:hover {
  background-color: var(--active-color);
}

@media (max-width: var(--mobile-breakpoint)) {
  .form-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .form-row__input, .form-row__select {
    margin-left: 0;
    margin-top: 5px;
    width: 100%;
  }
  
  /* Make buttons stack vertically but stay centered on mobile */
  .form-row--buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .form-row__button {
    margin: 5px 0; /* Vertical spacing between stacked buttons */
    width: 80%; /* Not 100% width to maintain some whitespace on sides */
  }
}
</style>