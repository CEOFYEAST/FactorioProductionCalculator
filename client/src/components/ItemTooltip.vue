<template>
  <div class="item-tooltip-wrapper" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot></slot>
    <div 
      v-if="isVisible && displayName" 
      class="item-tooltip"
      :class="tooltipPositionClass"
    >
      {{ displayName }}
      <div class="tooltip-arrow"></div>
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
    },
    position: {
      type: String,
      default: 'top', // 'top', 'bottom', 'left', 'right'
      validator: value => ['top', 'bottom', 'left', 'right'].includes(value)
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  computed: {
    displayName() {
      if (this.itemName) {
        return this.itemName;
      }
      if (this.itemId) {
        return this.itemId
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      return '';
    },
    tooltipPositionClass() {
      return `tooltip-${this.position}`;
    }
  },
  methods: {
    showTooltip() {
      if (!this.displayName) return;
      this.isVisible = true;
    },
    hideTooltip() {
      this.isVisible = false;
    }
  }
}
</script>

<style scoped>
.item-tooltip-wrapper {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.item-tooltip {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.item-tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: var(--main-font-family);
  font-size: 0.9em;
  white-space: nowrap;
  z-index: 9999;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
}

.item-tooltip-wrapper:hover .item-tooltip {
  opacity: 1;
  visibility: visible;
}

/* Position variants */
.tooltip-top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
}

.tooltip-bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
}

.tooltip-left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 8px;
}

.tooltip-right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 8px;
}

/* Arrow positioning */
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 5px solid transparent;
}

.tooltip-top .tooltip-arrow {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: rgba(0, 0, 0, 0.9);
}

.tooltip-bottom .tooltip-arrow {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: rgba(0, 0, 0, 0.9);
}

.tooltip-left .tooltip-arrow {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: rgba(0, 0, 0, 0.9);
}

.tooltip-right .tooltip-arrow {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: rgba(0, 0, 0, 0.9);
}
</style>
