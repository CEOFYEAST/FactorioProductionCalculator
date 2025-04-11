<template>
  <div class="production-chain-view" ref="container">
    <div class="production-chain-container" :style="containerStyle">
      <svg class="connections-layer" :style="containerStyle">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="4"
            refX="6"
            refY="2"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 6 2 L 0 4 z" class="arrow-head" />
          </marker>
        </defs>
        <g v-for="connection in connections" :key="`${connection.from}-${connection.to}`">
          <path
            :d="connection.path"
            :stroke="connection.color"
            class="connection-line"
            fill="none"
            marker-end="url(#arrowhead)"
          />
          <text
            :x="getTextPosition(connection).x"
            :y="getTextPosition(connection).y"
            class="connection-label"
            :fill="connection.color"
          >
            {{ formatNumber(connection.amount) }}
          </text>
        </g>
      </svg>
      <div class="production-chain-nodes">
        <ProductionNode
          v-for="item in prodChainArray"
          :key="item.id"
          :itemId="item.id"
          :itemData="item.data"
          :timeUnit="timeUnit"
          :ref="el => registerNode(item.id, el)"
          :style="getNodeStyle(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductionNode from './ProductionNode.vue'
import { ProductionChainLayout } from '../utils/ProductionChainLayout.js'

let updateTimeout = null

export default {
  name: 'ProductionChainView',
  components: {
    ProductionNode
  },
  props: {
    prodChain: {
      type: Object,
      required: true
    },
    timeUnit: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      nodeRefs: new Map(),
      connections: [],
      layout: null,
      containerWidth: 0,
      containerHeight: 0,
      nodeSizes: new Map(),
      nodeOffset: { x: 0, y: 0 }
    }
  },
  computed: {
    prodChainArray() {
      return Object.entries(this.prodChain).map(([id, data]) => ({
        id,
        data
      }))
    },
    containerStyle() {
      return {
        width: `${this.containerWidth}px`,
        height: `${this.containerHeight}px`,
      }
    }
  },
  watch: {
    prodChain: {
      handler() {
        this.updateLayout();
        this.debouncedUpdateLayout();
      },
      deep: true
    }
  },
  methods: {
    updateLayout() {
      // First collect all node sizes
      this.nodeSizes.clear();
      this.nodeRefs.forEach((node, id) => {
        if (node?.$el) {
          const rect = node.$el.getBoundingClientRect();
          this.nodeSizes.set(id, {
            width: rect.width,
            height: rect.height
          });
        }
      });

      this.layout = new ProductionChainLayout(this.prodChain, this.nodeSizes);
      
      // Calculate container size and node positions relative to container
      let maxX = -Infinity;
      let maxY = -Infinity;
      let minX = Infinity;
      let minY = Infinity;

      // First pass: find boundaries
      this.layout.getAllLayouts().forEach(layout => {
        const nodeSize = this.nodeSizes.get(layout.id) || { width: 200, height: 100 };
        const halfWidth = nodeSize.width / 2;
        const halfHeight = nodeSize.height / 2;
        
        maxX = Math.max(maxX, layout.position.x + halfWidth);
        maxY = Math.max(maxY, layout.position.y + halfHeight);
        minX = Math.min(minX, layout.position.x - halfWidth);
        minY = Math.min(minY, layout.position.y - halfHeight);
      });

      // Calculate container size with padding
      const PADDING = 100;
      this.containerWidth = maxX - minX + (PADDING * 2);
      this.containerHeight = maxY - minY + (PADDING * 2);

      // Store the offset for node positioning
      this.nodeOffset = {
        x: -minX + PADDING,
        y: -minY + PADDING
      };
    },
    getNodeStyle(itemId) {
      const nodeLayout = this.layout?.getNodeLayout(itemId)
      if (!nodeLayout) return {}
      
      // Position relative to container by adding the offset
      return {
        position: 'absolute',
        left: `${nodeLayout.position.x + this.nodeOffset.x}px`,
        top: `${nodeLayout.position.y + this.nodeOffset.y}px`,
        transform: 'translate(-50%, -50%)'
      }
    },
    registerNode(id, el) {
      if (el) {
        this.nodeRefs.set(id, el);
        // When a node is registered or updated, we need to:
        // 1. Update its size in our size map
        // 2. Trigger a layout update
        if (el.$el) {
          const rect = el.$el.getBoundingClientRect();
          this.nodeSizes.set(id, {
            width: rect.width,
            height: rect.height
          });
        }
        this.debouncedUpdateLayout();
      }
    },
    debouncedUpdateLayout() {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
      updateTimeout = setTimeout(() => {
        this.updateLayout();
        this.updateConnections();
      }, 100);
    },
    updateConnections() {
      this.connections = [];
      
      // Define colors for different levels
      const levelColors = [
        '#2196F3', // Blue
        '#4CAF50', // Green
        '#FFC107', // Amber
        '#FF5722', // Deep Orange
        '#9C27B0', // Purple
      ];
      
      Object.entries(this.prodChain).forEach(([itemId, data]) => {
        const sourceLayout = this.layout?.getNodeLayout(itemId);
        if (!sourceLayout) return;

        const sourceNodeSize = this.nodeSizes.get(itemId) || { width: 200, height: 100 };
        // Calculate edge points for source node
        const sourceX = sourceLayout.position.x + this.nodeOffset.x;
        const sourceY = sourceLayout.position.y + this.nodeOffset.y;
        const sourceRight = sourceX + (sourceNodeSize.width / 2);

        Object.entries(data.dependentItems).forEach(([dependentId, amount]) => {
          const targetLayout = this.layout?.getNodeLayout(dependentId);
          if (!targetLayout) return;

          const targetNodeSize = this.nodeSizes.get(dependentId) || { width: 200, height: 100 };
          // Calculate edge points for target node
          const targetX = targetLayout.position.x + this.nodeOffset.x;
          const targetY = targetLayout.position.y + this.nodeOffset.y;
          const targetLeft = targetX - (targetNodeSize.width / 2);

          // Get color based on source level
          const color = levelColors[sourceLayout.level % levelColors.length];

          // Calculate control points for curved line
          const controlPoint1X = sourceRight + (targetLeft - sourceRight) * 0.25;
          const controlPoint2X = sourceRight + (targetLeft - sourceRight) * 0.75;

          this.connections.push({
            from: itemId,
            to: dependentId,
            amount,
            color,
            path: `M ${sourceRight} ${sourceY} C ${controlPoint1X} ${sourceY}, ${controlPoint2X} ${targetY}, ${targetLeft} ${targetY}`
          });
        });
      });
    },
    formatNumber(num) {
      return Number(num).toFixed(2)
    },
    getTextPosition(connection) {
      // Parse the path to find the midpoint
      const match = connection.path.match(/M ([\d.]+) ([\d.]+) C ([\d.]+) ([\d.]+), ([\d.]+) ([\d.]+), ([\d.]+) ([\d.]+)/);
      if (!match) return { x: 0, y: 0 };

      const [, startX, startY, , , , , endX, endY] = match.map(Number);
      return {
        x: (startX + endX) / 2,
        y: (startY + endY) / 2
      };
    }
  },
  mounted() {
    this.updateLayout();
    window.addEventListener('resize', this.debouncedUpdateLayout);
  },
  beforeUnmount() {
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }
    window.removeEventListener('resize', this.debouncedUpdateLayout);
  }
}
</script>

<style scoped>
.production-chain-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.production-chain-container {
  position: relative;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.production-chain-nodes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.connections-layer {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 2;
}

.connection-line {
  stroke-width: 2;
  fill: none;
}

.arrow-head {
  fill: currentColor;
  stroke: none;
}

.connection-label {
  font-size: 12px;
  text-anchor: middle;
  dominant-baseline: middle;
  font-weight: 500;
  text-shadow: 
    -1px -1px 0 white,
    1px -1px 0 white,
    -1px 1px 0 white,
    1px 1px 0 white;
}
</style> 