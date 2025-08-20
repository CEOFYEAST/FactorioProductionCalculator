<template>
  <div class="CrafterConfigMenu-container">
    <div class="container__content">
      <h3 class="container__section-title">Crafter Configuration</h3>
      
      <div class="crafter-categories" v-if="resourcesLoaded">
        <div 
          v-for="(category, categoryName) in filteredCategorizedCrafters" 
          :key="categoryName"
          class="category-row"
        >
          <div class="category-row__label">
            <label :for="`category-${categoryName}`">{{ formatCategoryName(categoryName) }}</label>
          </div>
          <div class="category-row__selector">
            <select 
              :id="`category-${categoryName}`"
              class="category-row__select"
              :value="getCurrentCrafter(categoryName)"
              @change="updateCrafter(categoryName, $event.target.value)"
            >
              <option 
                v-for="crafter in category" 
                :key="crafter.id"
                :value="crafter.id"
              >
                {{ crafter.name }}
              </option>
            </select>
            
            <!-- Display current crafter with icon -->
            <div v-if="getCurrentCrafter(categoryName)" class="current-crafter">
              <img 
                class="current-crafter__icon" 
                :src="getCrafterIconPath(getCurrentCrafter(categoryName))" 
                :alt="getCurrentCrafterName(categoryName)"
              />
              <span class="current-crafter__name">{{ getCurrentCrafterName(categoryName) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button 
          class="action-button action-button--save" 
          @click="saveConfiguration"
          :disabled="!hasChanges"
        >
          Save Configuration
        </button>
        <button 
          class="action-button action-button--reset" 
          @click="resetToDefaults"
        >
          Reset to Defaults
        </button>
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
  name: 'CrafterConfigMenu',
  data() {
    return {
      resourcesLoaded: false,
      localCrafterConfig: {},
      statusMessage: {
        visible: false,
        type: '', // 'success' or 'error'
        text: ''
      },
      statusTimeout: null
    }
  },
  computed: {
    recipes() {
      return LFS.recipes || {}
    },
    currentCrafterConfig() {
      return LFS.loadedFactory?.crafterConfig || {}
    },
    categorizedCrafters() {
      const categories = {}
      
      // Initialize all known categories
      const knownCategories = [
        'miner', 'smelter', 'assembler', 'fluid-assembler', 'chem', 
        'centrifuge', 'oil-pump', 'refinery', 'silo', 'reactor', 
        'water-pump', 'manual'
      ]
      
      knownCategories.forEach(category => {
        categories[category] = []
      })
      
      // Traverse recipes to find machines and categorize them
      for (const [itemId, itemData] of Object.entries(this.recipes)) {
        if (itemData['crafter-categories']) {
          const crafterCategories = itemData['crafter-categories']
          
          crafterCategories.forEach(category => {
            if (categories[category]) {
              categories[category].push({
                id: itemId,
                name: itemData.name,
                craftingSpeed: itemData['crafting-speed'] || 1
              })
            }
          })
        }
      }
      
      // Sort crafters by name within each category
      Object.keys(categories).forEach(category => {
        categories[category].sort((a, b) => a.name.localeCompare(b.name))
      })
      
      return categories
    },
    filteredCategorizedCrafters() {
      const filtered = {}
      for (const [categoryName, crafters] of Object.entries(this.categorizedCrafters)) {
        if (crafters.length > 1) {
          filtered[categoryName] = crafters
        }
      }
      return filtered
    },
    hasChanges() {
      return JSON.stringify(this.localCrafterConfig) !== JSON.stringify(this.currentCrafterConfig)
    }
  },
  watch: {
    currentCrafterConfig: {
      handler(newConfig) {
        if (this.resourcesLoaded && Object.keys(newConfig).length > 0) {
          this.localCrafterConfig = { ...newConfig };
        }
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
    handleResourcesLoaded() {
      this.resourcesLoaded = true
      this.initializeLocalConfig()
    },
    initializeLocalConfig() {
      // Initialize with current crafter config or defaults if empty
      const currentConfig = this.currentCrafterConfig;
      if (Object.keys(currentConfig).length > 0) {
        this.localCrafterConfig = { ...currentConfig };
      } else {
        // Use defaults if no current config exists
        this.resetToDefaults();
      }
    },
    formatCategoryName(categoryName) {
      // Convert kebab-case to title case
      return categoryName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },
    getCurrentCrafter(categoryName) {
      return this.localCrafterConfig[categoryName] || ''
    },
    updateCrafter(categoryName, crafterId) {
      this.localCrafterConfig[categoryName] = crafterId
    },
    getCrafterIconPath(crafterId) {
      if (!crafterId || !this.recipes[crafterId]) return '';
      const crafterData = this.recipes[crafterId];
      if (crafterData.name) {
        const thumbDir = crafterData.name.replace(/\s+/g, '_') + '.png';
        const thumbName = `32px-${thumbDir}`;
        return `/assets/client_thumbs/${thumbDir}/${thumbName}`;
      }
      return '';
    },
    getCurrentCrafterName(categoryName) {
      const crafterId = this.getCurrentCrafter(categoryName);
      if (!crafterId || !this.recipes[crafterId]) return '';
      return this.recipes[crafterId].name || '';
    },
    saveConfiguration() {
      try {
        // Update the loaded factory store with new crafter config
        if (LFS.loadedFactory) {
          LFS.setCrafterConfig(this.localCrafterConfig)
          
          this.showStatusMessage('success', 'Crafter configuration saved successfully!')
        } else {
          this.showStatusMessage('error', 'No factory loaded to save configuration to')
        }
      } catch (error) {
        this.showStatusMessage('error', 'Failed to save crafter configuration')
        console.error('Error saving crafter config:', error)
      }
    },
    resetToDefaults() {
      const defaultConfig = {
        "miner": "electric-mining-drill",
        "smelter": "steel-furnace",
        "assembler": "assembling-machine-1",
        "fluid-assembler": "assembling-machine-2",
        "chem": "chemical-plant",
        "centrifuge": "centrifuge",
        "oil-pump": "pumpjack",
        "refinery": "oil-refinery",
        "silo": "rocket-silo",
        "reactor": "nuclear-reactor",
        "water-pump": "offshore-pump",
        "manual": ""
      }
      
      this.localCrafterConfig = { ...defaultConfig }
      this.showStatusMessage('success', 'Configuration reset to defaults')
    },
    showStatusMessage(type, text) {
      // Clear any existing timeout
      if (this.statusTimeout) {
        clearTimeout(this.statusTimeout)
      }

      // Set new message
      this.statusMessage = {
        visible: true,
        type: type,
        text: text
      }

      // Auto-hide after 3 seconds
      this.statusTimeout = setTimeout(() => {
        this.statusMessage.visible = false
      }, 3000)
    }
  },
  beforeCreate() {
    // essential to set before creation so that the computed properties can refer to the proper values
    LFS = useLoadedFactory()
  },
  created() {
    import('@ceofyeast/prodchaincalculators/recipes').then((recipesMod) => {
      this.resourcesLoaded = recipesMod.recipesLoaded
      if (this.resourcesLoaded) {
        this.initializeLocalConfig()
      }
    })
    addRecipesLoadedListener(this.handleResourcesLoaded)
  },
  beforeUnmount() {
    if (this.statusTimeout) {
      clearTimeout(this.statusTimeout)
    }
  }
}
</script>

<style scoped>
.CrafterConfigMenu-container {
  margin-bottom: 20px;
}

.container__section-title {
  margin-top: 0;
  margin-bottom: 15px;
  font-family: var(--main-font-family);
  color: var(--stylized-text-color);
}

.container__content {
  border: 1px solid gray;
  padding: 15px;
  border-radius: 4px;
  background-color: var(--primary-color);
  margin-bottom: 20px;
}

.crafter-categories {
  margin-bottom: 20px;
}

.category-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 15px;
}

.category-row__label {
  flex: 0 0 150px;
}

.category-row__label label {
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  color: var(--main-text-color);
  font-weight: 500;
}

.category-row__selector {
  flex: 1;
}

.category-row__select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  background-color: white;
  cursor: pointer;
}

.category-row__select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.category-row__select option {
  background-color: #f8f9fa;
  color: #212529;
  padding: 8px 12px;
  border: none;
}

.category-row__select option:hover {
  background-color: #e9ecef;
}

.current-crafter {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 6px 10px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
}

.current-crafter__icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
}

.current-crafter__name {
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  color: var(--main-text-color);
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 15px;
}

.action-button {
  padding: 10px 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  font-weight: 500;
  transition: all 0.2s;
}

.action-button--save {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

.action-button--save:hover:not(:disabled) {
  background-color: #218838;
  border-color: #1e7e34;
}

.action-button--save:disabled {
  background-color: #6c757d;
  border-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.action-button--reset {
  background-color: #dc3545;
  color: white;
  border-color: #dc3545;
}

.action-button--reset:hover {
  background-color: #c82333;
  border-color: #bd2130;
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

.status-message__text {
  flex: 1;
}

@media (max-width: var(--mobile-breakpoint)) {
  .category-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .category-row__label {
    flex: none;
  }
  
  .category-row__selector {
    width: 100%;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-button {
    width: 100%;
  }
}
</style>
