<template>
  <div class="UserDemandUpdate-container">
    
    <div class="container__content">
        <h3 class="container__section-title">Update User Demand</h3>
      
      <div class="form-row">
        <label class="form-row__label" for="itemSelector">Select Item</label>
        <div class="item-selector">
          <div class="item-selector__input-container" @click="toggleDropdown">
            <div class="item-selector__selected-item" v-if="selectedItem">
              <img class="item-selector__icon" :src="LFS.getItemIconPath(selectedItem.name)" />
              <span class="item-selector__name">{{ selectedItem.name }}</span>
            </div>
            <div class="item-selector__placeholder" v-else>
              Select an item...
            </div>
            <span class="item-selector__arrow">{{ isDropdownOpen ? '▲' : '▼' }}</span>
          </div>
          
          <div class="item-selector__dropdown" v-if="isDropdownOpen">
            <input 
              class="item-selector__search"
              type="text" 
              v-model="searchQuery"
              placeholder="Search items..."
              @click.stop
            />
            <div class="item-selector__options">
              <div 
                class="item-selector__option"
                v-for="item in filteredItems"
                :key="item.id"
                @click="selectItem(item)"
              >
                <img class="item-selector__option-icon" :src="LFS.getItemIconPath(item.name)" />
                <span class="item-selector__option-name">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
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
        <button class="form-row__button" @click="addToFactory" :disabled="!selectedItem">Add Specified Item to the Factory</button>
        <button class="form-row__button" @click="removeFromFactory" :disabled="!selectedItem">Remove Specified Item from the Factory</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoadedFactory } from '@/stores/loadedFactory'
import { addRecipesLoadedListener } from '@ceofyeast/prodchaincalculators/recipes'

let LFS = {}

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
      selectedItem: null,
      searchQuery: '',
      isDropdownOpen: false,
      itemIRPTU: 10,
      timeUnit: "minute",
      resourcesLoaded: false
    }
  },
  computed: {
    LFS() {
      return LFS
    },
    itemNamesAndIDs() {
      return LFS.itemNamesAndIDs || {}
    },
    availableItems() {
      const items = []
      for (const [name, id] of Object.entries(this.itemNamesAndIDs)) {
        items.push({ name, id })
      }
      return items.sort((a, b) => a.name.localeCompare(b.name))
    },
    filteredItems() {
      if (!this.searchQuery) {
        return this.availableItems
      }
      return this.availableItems.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    handleResourcesLoaded() {
      this.resourcesLoaded = true
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
      if (this.isDropdownOpen) {
        this.searchQuery = ''
        // Focus search input after dropdown opens
        this.$nextTick(() => {
          const searchInput = this.$el.querySelector('.item-selector__search')
          if (searchInput) searchInput.focus()
        })
      }
    },
    selectItem(item) {
      this.selectedItem = item
      this.isDropdownOpen = false
      this.searchQuery = ''
    },
    addToFactory() {
      if (this.selectedItem) {
        this.factoryService.addDemand(this.selectedItem.id, this.itemIRPTU, this.timeUnit)
      }
    },
    removeFromFactory() {
      if (this.selectedItem) {
        this.factoryService.subtractDemand(this.selectedItem.id, this.itemIRPTU, this.timeUnit)
      }
    },
    // Close dropdown when clicking outside
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false
      }
    }
  },
  beforeCreate() {
    // essential to set before creation so that the computed properties can refer to the proper values
    LFS = useLoadedFactory()
  },
  created() {
    import('@ceofyeast/prodchaincalculators/recipes').then((recipesMod) => {
      this.resourcesLoaded = recipesMod.recipesLoaded
    })
    addRecipesLoadedListener(this.handleResourcesLoaded)
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
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
  display: block;
  margin-bottom: 5px;
}

.form-row__input, .form-row__select {
  margin-left: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
}

/* Item Selector Styles */
.item-selector {
  position: relative;
  margin-left: 10px;
}

.item-selector__input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  min-height: 40px;
}

.item-selector__input-container:hover {
  border-color: #999;
}

.item-selector__selected-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-selector__icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.item-selector__name {
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  color: var(--main-text-color);
}

.item-selector__placeholder {
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  color: #999;
}

.item-selector__arrow {
  color: #666;
  font-size: 12px;
}

.item-selector__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 300px;
  overflow: hidden;
}

.item-selector__search {
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-bottom: 1px solid #eee;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  outline: none;
}

.item-selector__search:focus {
  border-bottom-color: #007bff;
}

.item-selector__options {
  max-height: 250px;
  overflow-y: auto;
}

.item-selector__option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.item-selector__option:hover {
  background-color: #f8f9fa;
}

.item-selector__option:last-child {
  border-bottom: none;
}

.item-selector__option-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
}

.item-selector__option-name {
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  color: var(--main-text-color);
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

.form-row__button:hover:not(:disabled) {
  background-color: var(--active-color);
}

.form-row__button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: var(--mobile-breakpoint)) {
  .form-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .form-row__input, .form-row__select, .item-selector {
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