<template>
    <div class="ProductionCalculatorView-container">

      <div class="container__side-bar">
        <TheSideNav @navigation-triggered="handleNavigation" :nav-items="navItems"/>
      </div>

      <div class="container__main-view container--full">
        <CalculatedDemandDisplay v-if="showDemandDisplay"/>
        <UserInputMenu v-if="showInputMenu"/>
        <SaveSlotMenu v-if="showSaveSlotMenu"/>
      </div>

    </div>
  </template>

<script>
  import TheSideNav from '@/components/TheSideNav.vue'
  import CalculatedDemandDisplay from '@/components/CalculatedDemandDisplay.vue'
  import UserInputMenu from '@/components/UserInputMenu.vue'
  import SaveSlotMenu from '@/components/SaveSlotMenu.vue'

  let LFS = {}
  
  export default {
    name: 'Production Calculator View',
    components: {
      TheSideNav: TheSideNav,
      CalculatedDemandDisplay: CalculatedDemandDisplay,
      UserInputMenu: UserInputMenu,
      SaveSlotMenu: SaveSlotMenu,
    },
    data() {
      return {
        showDemandDisplay: false,
        showInputMenu: false,
        showSaveSlotMenu: false,
        navItems: [
          { name: `Demand Display`, image: 'Iron_gear_wheel.png' },
          { name: `User Input`, image: 'Item_group.png' },
          { name: 'Save Slots', image: 'Blueprint_book.png' },
        ],
      }
    },
    methods: {
      handleNavigation(menuName) {
        this.showDemandDisplay = false
        this.showInputMenu = false
        this.showSaveSlotMenu = false
        if(menuName === 'Demand Display') {
          this.showDemandDisplay = true
        }
        else if(menuName === 'User Input') {
          this.showInputMenu = true
        }
        else if(menuName === 'Save Slots') {
          this.showSaveSlotMenu = true
        }
      }
    }
  }
</script>

<style scoped>
.ProductionCalculatorView-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 100%;
}
.container__side-bar {
  height: 100%;
  min-height: 100%;
}
.container__main-view {
}
</style>
  

<!--
Loading/Reloading
    Will need a method for loading a factory into the view
    - can be called by a lifecycle hook
    Will need to update various things whenever a factory is loaded
    - menus will need to be refreshed
    - local lists of items, such as a local list of input items, will need to be refreshed
    - the actual components representing the nodes of the factory will need to be refreshed
    Will need a method for reloading a factory
    - could just re-use the loading method, but it could lend to efficiency and understandibility if I seperate the two 

Menus
    Could use a form that redirects to a method instead of an HTTPS request for the menus

Node Output Data
 - The # of crafters required to meet the node’s demand
 - The node’s demand
 - Visual link to the other “child” nodes that require the given “parent” node
 - The portion of the parent node’s demand required by each child node


-->

<!--

LoadFactory()
ReloadFactory()

RefreshNodes()
RefreshMenus()
RefreshInputs()

-->