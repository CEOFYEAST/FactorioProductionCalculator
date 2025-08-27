<template>
    <div class="TheTopNav-container">
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
                { name: 'Calculator', route: definedRoutes.prodChainCalculatorRoute },
                { name: 'Sign In', route: definedRoutes.accountAccessRoute },
                { name: 'Create Account', route: definedRoutes.accountCreationRoute },
                { name: 'About', route: definedRoutes.aboutViewRoute },
            ],
            // Set default active item
            activeItemName: 'About'
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
                this.$router.push(selectedItem.route)
            }
        }
    },
    mounted() {
        this.setActive('About')
    }
})
</script>

<style scoped>
.TheTopNav-container {
    min-width: 100%;
    min-height: 45px;
    height: 45px;
    max-height: 45px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    flex-direction: row;
    background-color: var(--secondary-color);
}
.container__item {
    height: 100%;
    border: none;
    padding: 0px 15px 0px 15px;
    transition: .3s;
    border-bottom: var(--strong-border);
    font-family: var(--main-font-family);
    color: var(--main-text-color);
    font-size: var(--header-font-size);
    background-color: var(--secondary-color);
}
.container__filler {
    flex-grow: 1;
    border-bottom: var(--strong-border);
}
.container__item--selected {
    color: var(--active-color);
    border: var(--strong-border);
    border-bottom: none;
    border-top: none;
    background-color: var(--primary-color) !important;
}
.container__item:hover {
    background-color: var(--active-color);
}
</style>