<template>
    <div class="TheSideNav-container">
        <div class="container__filler"></div>
        <button 
            v-for="item in navItems"
            :key="item.name"
            @click="setActive(item.name)"
            :class="[
                'container__item', 
                { 'container__item--selected': activeItemName === item.name }
            ]"
        >
            {{ item.name }}
        </button>
        <div class="container__filler"></div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { definedRoutes } from '@/scripts/router'

export default defineComponent({
    data() {
        return {
            // Define nav items using the actual routes from your router
            navItems: [
                { name: '1', route: definedRoutes.prodChainCalculatorRoute },
                { name: '2', route: definedRoutes.aboutViewRoute },
                { name: '3', route: definedRoutes.accountAccessRoute },
                { name: '4', route: definedRoutes.accountCreationRoute }
            ],
            // Set default active item
            activeItemName: '2'
        }
    },
    methods: {
        setActive(itemName) {
            // Update the active item name
            this.activeItemName = itemName;
            
            // Find the route for the selected item
            const selectedItem = this.navItems.find(item => item.name === itemName)
            
            if (selectedItem) {
                // Navigate to the selected route
                //this.$router.push(selectedItem.route)
            }
        }
    },
    mounted() {
        this.setActive('About')
    }
})
</script>

<style scoped>
.TheSideNav-container {
    max-width: 35px;
    width: 35px;
    min-width: 35px;
    max-height: 100%;
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--secondary-color);
}
.container__item {
    width: 100%;
    border: none;
    padding: 15px 0px 15px 0px;
    transition: .3s;
    border-right: var(--strong-border);
    font-family: var(--header-font-family);
    font-size: var(--header-font-size);
    color: var(--header-text-color);
    background-color: var(--secondary-color);
}
.container__filler {
    flex-grow: 1;
    border-right: var(--strong-border);
}
.container__item--selected {
    color: var(--active-color);
    border: var(--strong-border);
    border-right: none;
    background-color: var(--primary-color);
}
.container__item:hover {
    background-color: var(--active-color);
}
</style>