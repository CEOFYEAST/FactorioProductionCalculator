<template>
  <div class="item-tooltip-wrapper" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot></slot>
    <div 
      v-if="isVisible && displayName" 
      class="item-tooltip"
      :style="tooltipPosition"
    >
      {{ displayName }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemTooltip',
  props: {
    itemId: {
      type: String,
      default: ''
    },
    itemName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isVisible: false,
      tooltipPosition: {
        top: '0px',
        left: '0px'
      }
    }
  },
  computed: {
    displayName() {
      // Use provided itemName first, otherwise try to format itemId
      if (this.itemName) {
        return this.itemName;
      }
      if (this.itemId) {
        // Convert kebab-case to title case
        return this.itemId
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      return '';
    }
  },
  methods: {
    showTooltip(event) {
      if (!this.displayName) return;
      
      this.isVisible = true;
      this.$nextTick(() => {
        this.updateTooltipPosition(event);
      });
    },
    hideTooltip() {
      this.isVisible = false;
    },
    updateTooltipPosition(event) {
      const rect = event.target.getBoundingClientRect();
      const tooltipWidth = 200; // Approximate tooltip width
      const tooltipHeight = 40; // Approximate tooltip height
      
      let top = rect.top - tooltipHeight - 10; // 10px gap above
      let left = rect.left + (rect.width / 2) - (tooltipWidth / 2); // Center horizontally
      
      // Adjust if tooltip would go off screen
      if (top < 0) {
        top = rect.bottom + 10; // Show below if no room above
      }
      
      if (left < 10) {
        left = 10; // Minimum left margin
      } else if (left + tooltipWidth > window.innerWidth - 10) {
        left = window.innerWidth - tooltipWidth - 10; // Maximum right margin
      }
      
      this.tooltipPosition = {
        top: `${top + window.scrollY}px`,
        left: `${left + window.scrollX}px`
      };
    }
  }
}
</script>

<style scoped>
.item-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.item-tooltip {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: var(--main-font-family);
  font-size: 0.9em;
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 200px;
  text-align: center;
}

.item-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.9);
}
</style>
