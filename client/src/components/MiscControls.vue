<template>
  <div class="MiscControls-container">
    
    <div class="container__content">
        <h3 class="container__section-title">Misc. Controls</h3>
      <div class="form-row">
        <button class="form-row__button" @click="clearFactory">Clear Factory</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiscControls',
  props: {
    factoryService: {
      type: Object,
      required: true
    }
  },
  methods: {
    clearFactory() {
      this.factoryService.clear()
    },
    addOneOfEach() {
      this.factoryService.refreshStoreState()
      if (this.factoryService.itemIDs && Array.isArray(this.factoryService.itemIDs)) {
        for (let i = 0; i < this.factoryService.itemIDs.length; i++) {
          this.factoryService.addDemand(this.factoryService.itemIDs[i], 1)
        }
      }
    }
  }
}
</script>

<style scoped>
.MiscControls-container {
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
  margin: 10px;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  color: var(--main-text-color);
}

.form-row__button {
  padding: 8px 16px;
  background-color: var(--secondary-color);
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  transition: background-color 0.2s;
}

.form-row__button:hover {
  background-color: var(--active-color);
}

@media (max-width: var(--mobile-breakpoint)) {
  .form-row__button {
    width: 100%;
  }
}
</style>