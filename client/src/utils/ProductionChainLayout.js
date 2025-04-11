export class ProductionChainLayout {
  constructor(items, nodeSizes) {
    this.items = items;
    this.nodeSizes = nodeSizes || new Map(); // Map of itemId -> {width, height}
    this.nodeLayouts = new Map();
    this.levels = new Map();
    this.calculateLevels();
  }

  calculateLevels() {
    // First, identify end products (items with user demand)
    const endProducts = new Set();
    
    Object.entries(this.items).forEach(([itemId, data]) => {
      if (data.userDemand) {
        endProducts.add(itemId);
      }
    });

    // If no user demand items, start with items that aren't ingredients for anything
    if (endProducts.size === 0) {
      Object.entries(this.items).forEach(([itemId, data]) => {
        let isIngredient = false;
        Object.values(this.items).forEach(otherData => {
          if (Object.keys(otherData.dependentItems).includes(itemId)) {
            isIngredient = true;
          }
        });
        if (!isIngredient) {
          endProducts.add(itemId);
        }
      });
    }

    // Initialize processing queues
    let currentLevel = 0;
    let nodesToProcess = Array.from(endProducts);
    const processedNodes = new Set();
    const nodeToLevel = new Map();

    // Process nodes level by level
    while (nodesToProcess.length > 0) {
      const nextLevel = new Set();
      
      // First pass: assign current level to nodes
      for (const nodeId of nodesToProcess) {
        if (!processedNodes.has(nodeId)) {
          nodeToLevel.set(nodeId, currentLevel);
          processedNodes.add(nodeId);
          
          // Add this node to its level
          if (!this.levels.has(currentLevel)) {
            this.levels.set(currentLevel, []);
          }
          this.levels.get(currentLevel).push(nodeId);
          
          // Get dependencies (ingredients this item requires)
          const dependencies = Object.keys(this.items[nodeId].dependentItems);
          dependencies.forEach(depId => nextLevel.add(depId));
        }
      }

      // Second pass: ensure dependencies are in later levels
      for (const nodeId of nodesToProcess) {
        const dependencies = Object.keys(this.items[nodeId].dependentItems);
        for (const depId of dependencies) {
          if (processedNodes.has(depId)) {
            const depLevel = nodeToLevel.get(depId);
            if (depLevel <= currentLevel) {
              // Need to move this dependency and all its dependencies to a later level
              this.moveDependencyChain(depId, currentLevel + 1, nodeToLevel, this.levels);
            }
          }
        }
      }

      currentLevel++;
      nodesToProcess = Array.from(nextLevel);
    }

    // Initialize node layouts
    this.nodeLayouts.clear();
    this.levels.forEach((nodeIds, level) => {
      nodeIds.forEach(nodeId => {
        this.nodeLayouts.set(nodeId, {
          level,
          position: { x: 0, y: 0 }
        });
      });
    });

    // Calculate positions
    this.calculatePositions();
  }

  moveDependencyChain(nodeId, newLevel, nodeToLevel, levels) {
    const oldLevel = nodeToLevel.get(nodeId);
    if (oldLevel === undefined || oldLevel >= newLevel) return;

    // Remove from old level
    const oldLevelNodes = levels.get(oldLevel);
    const index = oldLevelNodes.indexOf(nodeId);
    if (index > -1) {
      oldLevelNodes.splice(index, 1);
    }

    // Add to new level
    if (!levels.has(newLevel)) {
      levels.set(newLevel, []);
    }
    levels.get(newLevel).push(nodeId);
    nodeToLevel.set(nodeId, newLevel);

    // Recursively move all dependencies
    const dependencies = Object.keys(this.items[nodeId].dependentItems);
    dependencies.forEach(depId => {
      this.moveDependencyChain(depId, newLevel + 1, nodeToLevel, levels);
    });
  }

  calculatePositions() {
    const LEVEL_SPACING = 400; // Horizontal spacing between levels
    const MIN_VERTICAL_GAP = 50; // Minimum vertical gap between nodes
    const PADDING = 100;

    // Calculate positions for each level
    this.levels.forEach((itemIds, level) => {
      const levelX = (level * LEVEL_SPACING) + PADDING;
      
      // First pass: calculate total height and get node sizes
      let totalHeight = 0;
      const nodeSizesInLevel = itemIds.map(itemId => {
        const size = this.nodeSizes.get(itemId) || { width: 200, height: 100 }; // Default size if not provided
        totalHeight += size.height;
        return size;
      });
      
      // Add minimum gaps between nodes
      totalHeight += (itemIds.length - 1) * MIN_VERTICAL_GAP;
      
      // Start position for first node
      let currentY = PADDING - totalHeight / 2;
      
      // Second pass: position nodes
      itemIds.forEach((itemId, index) => {
        const nodeSize = nodeSizesInLevel[index];
        
        // Position node at currentY + half its height (for center alignment)
        this.nodeLayouts.set(itemId, {
          level,
          position: { x: levelX, y: currentY + nodeSize.height / 2 }
        });
        
        // Move currentY to next position
        currentY += nodeSize.height + MIN_VERTICAL_GAP;
      });
    });
  }

  getNodeLayout(itemId) {
    return this.nodeLayouts.get(itemId);
  }

  getAllLayouts() {
    return this.nodeLayouts;
  }
} 