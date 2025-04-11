<template>
  <div class="production-chain-view">
    <svg class="connections-layer">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
        </marker>
      </defs>
      <g v-for="connection in connections" :key="`${connection.from}-${connection.to}`">
        <line
          :x1="connection.x1"
          :y1="connection.y1"
          :x2="connection.x2"
          :y2="connection.y2"
          class="connection-line"
          marker-end="url(#arrowhead)"
        />
        <text
          :x="(connection.x1 + connection.x2) / 2"
          :y="(connection.y1 + connection.y2) / 2"
          class="connection-label"
        >
          {{ formatNumber(connection.amount) }}
        </text>
      </g>
    </svg>

    <div class="production-chain-grid">
      <div class="column">
        <ProductionNode
          v-for="item in column1Items"
          :key="item.id"
          :itemId="item.id"
          :itemData="item.data"
          :timeUnit="timeUnit"
          :ref="el => registerNode(item.id, el)"
        />
      </div>
      <div class="column">
        <ProductionNode
          v-for="item in column2Items"
          :key="item.id"
          :itemId="item.id"
          :itemData="item.data"
          :timeUnit="timeUnit"
          :ref="el => registerNode(item.id, el)"
        />
      </div>
      <div class="column">
        <ProductionNode
          v-for="item in column3Items"
          :key="item.id"
          :itemId="item.id"
          :itemData="item.data"
          :timeUnit="timeUnit"
          :ref="el => registerNode(item.id, el)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductionNode from './ProductionNode.vue'

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
      connections: []
    }
  },
  computed: {
    prodChainArray() {
      return Object.entries(this.prodChain).map(([id, data]) => ({
        id,
        data
      }))
    },
    column1Items() {
      return this.prodChainArray.filter((_, index) => index % 3 === 0)
    },
    column2Items() {
      return this.prodChainArray.filter((_, index) => index % 3 === 1)
    },
    column3Items() {
      return this.prodChainArray.filter((_, index) => index % 3 === 2)
    }
  },
  watch: {
    prodChain: {
      handler() {
        this.debouncedUpdateConnections()
      },
      deep: true
    }
  },
  methods: {
    registerNode(id, el) {
      if (el) {
        this.nodeRefs.set(id, el)
        this.debouncedUpdateConnections()
      }
    },
    debouncedUpdateConnections() {
      if (updateTimeout) {
        clearTimeout(updateTimeout)
      }
      updateTimeout = setTimeout(() => {
        this.updateConnections()
      }, 100)
    },
    updateConnections() {
      // Get the container's position for relative coordinates
      const containerRect = this.$el.getBoundingClientRect()
      
      // Clear existing connections
      this.connections = []
      
      // Get all nodes at once to avoid repeated DOM queries
      const nodePositions = new Map()
      this.nodeRefs.forEach((node, id) => {
        if (node?.$el) {
          const rect = node.$el.getBoundingClientRect()
          nodePositions.set(id, {
            x: rect.x - containerRect.x + rect.width / 2,
            y: rect.y - containerRect.y + rect.height / 2
          })
        }
      })

      // Create connections using cached positions
      Object.entries(this.prodChain).forEach(([itemId, data]) => {
        const sourcePos = nodePositions.get(itemId)
        if (!sourcePos) return

        Object.entries(data.dependentItems).forEach(([dependentId, amount]) => {
          const targetPos = nodePositions.get(dependentId)
          if (!targetPos) return

          this.connections.push({
            from: itemId,
            to: dependentId,
            amount,
            x1: sourcePos.x,
            y1: sourcePos.y,
            x2: targetPos.x,
            y2: targetPos.y
          })
        })
      })
    },
    formatNumber(num) {
      return Number(num).toFixed(2)
    }
  },
  mounted() {
    window.addEventListener('resize', this.debouncedUpdateConnections)
  },
  beforeUnmount() {
    if (updateTimeout) {
      clearTimeout(updateTimeout)
    }
    window.removeEventListener('resize', this.debouncedUpdateConnections)
  }
}
</script>

<style scoped>
.production-chain-view {
  position: relative;
  width: 100%;
  margin: 20px 0;
  overflow: hidden;
}

.production-chain-grid {
  display: flex;
  gap: 16px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  position: relative;
  z-index: 1;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-width: 250px;
}

.connections-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.connection-line {
  stroke: #666;
  stroke-width: 1.5;
}

.connection-label {
  fill: #666;
  font-size: 12px;
  text-anchor: middle;
  dominant-baseline: middle;
}

.connection-label::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  z-index: -1;
}
</style> 