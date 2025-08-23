<template>
  <div class="BeltConfigMenu-container">
    <div class="container__content">
      <h3 class="container__section-title">Belt Configuration</h3>
      
      <div class="belt-categories" v-if="resourcesLoaded">
        <div class="category-row">
          <div class="category-row__label">
            <label for="belt-type">Belt Type</label>
          </div>
          <div class="category-row__selector">
            <select 
              id="belt-type"
              class="category-row__select"
              :value="getCurrentBelt()"
              @change="updateBelt($event.target.value)"
            >
              <option 
                v-for="belt in availableBelts" 
                :key="belt.id"
                :value="belt.id"
              >
                {{ belt.name }} ({{ belt.throughput }} items/sec)
              </option>
            </select>
            
            <!-- Display current belt with icon -->
            <div v-if="getCurrentBelt()" class="current-belt">
              <img 
                class="current-belt__icon" 
                :src="getBeltIconPath(getCurrentBelt())" 
                :alt="getCurrentBeltName()"
              />
              <span class="current-belt__name">{{ getCurrentBeltName() }}</span>
              <span class="current-belt__throughput">({{ getCurrentBeltThroughput() }} items/sec)</span>
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
  name: 'BeltConfigMenu',
  data() {
    return {
      resourcesLoaded: false,
      localBeltConfig: {},
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
    currentBeltConfig() {
      return LFS.loadedFactory?.beltConfig || {}
    },
    availableBelts() {
      const belts = []
      
      // Traverse recipes to find items with throughput property (belts)
      for (const [itemId, itemData] of Object.entries(this.recipes)) {
        if (itemData.throughput) {
          belts.push({
            id: itemId,
            name: itemData.name,
            throughput: itemData.throughput
          })
        }
      }
      
      // Sort belts by throughput (ascending)
      belts.sort((a, b) => a.throughput - b.throughput)
      
      return belts
    },
    hasChanges() {
      return JSON.stringify(this.localBeltConfig) !== JSON.stringify(this.currentBeltConfig)
    }
  },
  watch: {
    currentBeltConfig: {
      handler(newConfig) {
        if (this.resourcesLoaded && Object.keys(newConfig).length > 0) {
          this.localBeltConfig = { ...newConfig };
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
      // Initialize with current belt config or defaults if empty
      const currentConfig = this.currentBeltConfig;
      if (Object.keys(currentConfig).length > 0) {
        this.localBeltConfig = { ...currentConfig };
      } else {
        // Use defaults if no current config exists
        this.resetToDefaults();
      }
    },
    getCurrentBelt() {
      return this.localBeltConfig['belt-type'] || ''
    },
    updateBelt(beltId) {
      this.localBeltConfig['belt-type'] = beltId
    },
    getBeltIconPath(beltId) {
      if (!beltId || !this.recipes[beltId]) return '';
      const beltData = this.recipes[beltId];
      if (beltData.name) {
        const thumbDir = beltData.name.replace(/\s+/g, '_') + '.png';
        const thumbName = `32px-${thumbDir}`;
        return `/assets/client_thumbs/${thumbDir}/${thumbName}`;
      }
      return '';
    },
    getCurrentBeltName() {
      const beltId = this.getCurrentBelt();
      if (!beltId || !this.recipes[beltId]) return '';
      return this.recipes[beltId].name || '';
    },
    getCurrentBeltThroughput() {
      const beltId = this.getCurrentBelt();
      if (!beltId || !this.recipes[beltId]) return '';
      return this.recipes[beltId].throughput || '';
    },
    saveConfiguration() {
      try {
        // Update the loaded factory store with new belt config
        if (LFS.loadedFactory) {
          LFS.setBeltConfig(this.localBeltConfig)
          
          this.showStatusMessage('success', 'Belt configuration saved successfully!')
        } else {
          this.showStatusMessage('error', 'No factory loaded to save configuration to')
        }
      } catch (error) {
        this.showStatusMessage('error', 'Failed to save belt configuration')
        console.error('Error saving belt config:', error)
      }
    },
    resetToDefaults() {
      const defaultConfig = {
        "belt-type": "transport-belt"
      }
      
      this.localBeltConfig = { ...defaultConfig }
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
.BeltConfigMenu-container {
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

.belt-categories {
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

.current-belt {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 6px 10px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
}

.current-belt__icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
}

.current-belt__name {
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  color: var(--main-text-color);
  font-weight: 500;
}

.current-belt__throughput {
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  color: var(--secondary-text-color);
  font-style: italic;
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
