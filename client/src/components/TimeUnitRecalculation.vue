<template>
  <div class="TimeUnitRecalculation-container">
    <div class="container__content">
        <h3 class="container__section-title">Recalculate Time Unit</h3>
      <div class="form-row">
        <label class="form-row__label" for="timeUnit">Select New Time Unit</label>
        <select class="form-row__select" id="timeUnit" v-model="selectedTimeUnit" @change="changeTimeUnit">
          <option value="second">Second</option>
          <option value="minute">Minute</option>
          <option value="hour">Hour</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeUnitRecalculation',
  props: {
    factoryService: {
      type: Object,
      required: true
    },
    currentTimeUnit: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedTimeUnit: this.currentTimeUnit || "minute"
    }
  },
  watch: {
    currentTimeUnit: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.selectedTimeUnit = newValue;
        }
      }
    }
  },
  methods: {
    changeTimeUnit() {
      this.factoryService.setTimeUnit(this.selectedTimeUnit)
    }
  }
}
</script>

<style scoped>
.TimeUnitRecalculation-container {
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

.form-row__select {
  margin-left: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
}

@media (max-width: var(--mobile-breakpoint)) {
  .form-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .form-row__select {
    margin-left: 0;
    margin-top: 5px;
    width: 100%;
  }
}
</style>