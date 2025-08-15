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

      <div class="form-row form-row--horizontal">
        <div class="form-row__field">
          <label class="form-row__label" for="itemIRPTU">Items Per Time Unit</label>
          <input class="form-row__input" id="itemIRPTU" type="number" v-model="itemIRPTU" />
        </div>
        <div class="form-row__field">
          <label class="form-row__label" for="requestTimeUnit">Request Time Unit</label>
          <select class="form-row__select" id="requestTimeUnit" v-model="timeUnit">
            <option value="second">Second</option>
            <option value="minute">Minute</option>
            <option value="hour">Hour</option>
          </select>
        </div>
      </div>

      <div class="form-row form-row--buttons">
        <button class="form-row__button" @click="addToFactory" :disabled="!selectedItem">Add Specified Item to the Factory</button>
        <button class="form-row__button" @click="removeFromFactory" :disabled="!selectedItem">Remove Specified Item from the Factory</button>
      </div>

      <!-- Status Message -->
      <div 
        class="status-message" 
        :class="{ 
          'status-message--visible': statusMessage.visible,
          'status-message--success': statusMessage.type === 'success',
          'status-message--error': statusMessage.type === 'error'
        }"
        v-if="statusMessage.visible"
      >
        <div class="status-message__content">
          <span class="status-message__icon">{{ statusMessage.type === 'success' ? '✓' : '✗' }}</span>
          <img class="status-message__item-icon" :src="LFS.getItemIconPath(statusMessage.itemName)" v-if="statusMessage.itemName" />
          <span class="status-message__text">{{ statusMessage.text }}</span>
        </div>
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
      resourcesLoaded: false,
      statusMessage: {
        visible: false,
        type: '', // 'success' or 'error'
        text: '',
        itemName: ''
      },
      statusTimeout: null
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
        try {
          this.factoryService.addDemand(this.selectedItem.id, this.itemIRPTU, this.timeUnit)
          this.showStatusMessage(
            'success',
            `Added ${this.itemIRPTU} ${this.selectedItem.name} per ${this.timeUnit} to factory`,
            this.selectedItem.name
          )
        } catch (error) {
          this.showStatusMessage(
            'error',
            `Failed to add ${this.selectedItem.name} to factory`,
            this.selectedItem.name
          )
        }
      }
    },
    removeFromFactory() {
      if (this.selectedItem) {
        try {
          this.factoryService.subtractDemand(this.selectedItem.id, this.itemIRPTU, this.timeUnit)
          this.showStatusMessage(
            'error',
            `Removed ${this.itemIRPTU} ${this.selectedItem.name} per ${this.timeUnit} from factory`,
            this.selectedItem.name
          )
        } catch (error) {
          this.showStatusMessage(
            'error',
            `Failed to remove ${this.selectedItem.name} from factory`,
            this.selectedItem.name
          )
        }
      }
    },
    showStatusMessage(type, text, itemName) {
      // Clear any existing timeout
      if (this.statusTimeout) {
        clearTimeout(this.statusTimeout)
      }

      // Set new message
      this.statusMessage = {
        visible: true,
        type: type,
        text: text,
        itemName: itemName
      }

      // Auto-hide after 4 seconds
      this.statusTimeout = setTimeout(() => {
        this.statusMessage.visible = false
      }, 4000)
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
    if (this.statusTimeout) {
      clearTimeout(this.statusTimeout)
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
  height: 40px;
  box-sizing: border-box;
}

/* Horizontal form row styles */
.form-row--horizontal {
  display: flex;
  gap: 20px;
  align-items: flex-end;
}

.form-row__field {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-row--horizontal .form-row__label {
  margin-bottom: 5px;
}

.form-row--horizontal .form-row__input,
.form-row--horizontal .form-row__select {
  margin-left: 0;
  width: 100%;
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

/* Status Message Styles */
.status-message {
  margin-top: 15px;
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
}

.status-message--visible {
  opacity: 1;
  transform: translateY(0);
}

.status-message--success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.status-message--error {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.status-message__content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-message__icon {
  font-weight: bold;
  font-size: 1.1em;
}

.status-message__item-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
}

.status-message__text {
  flex: 1;
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

  /* Make horizontal form rows stack on mobile */
  .form-row--horizontal {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .form-row__field {
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

  .status-message {
    margin-top: 10px;
    padding: 10px 12px;
    font-size: 0.9rem;
  }

  .status-message__content {
    gap: 6px;
  }

  .status-message__item-icon {
    width: 18px;
    height: 18px;
  }
}
</style>