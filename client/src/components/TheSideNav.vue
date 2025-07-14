<template>
    <div class="TheSideNav-container">
        <div class="container__filler container__filler--small"></div>
        <button 
            v-for="item in navItems"
            :key="item.name"
            @click="setActive(item.name)"
            :class="[
                'container__item', 
                { 'container__item--selected': activeItemName === item.name }
            ]"
        >
            <img :src="getImagePath(item.image)" :alt="item.name" class="container__icon" />
        </button>
        <div class="container__filler container__filler--large"></div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { definedRoutes } from '@/scripts/router'

export default defineComponent({
    data() {
        return {
            // Define nav items with images
            navItems: [
                { name: `Calculator`, route: definedRoutes.prodChainCalculatorRoute, image: 'Iron_gear_wheel.png' },
                { name: `User Input`, route: definedRoutes.aboutViewRoute, image: 'Item_group.png' },
                { name: 'Save Slots', route: definedRoutes.accountAccessRoute, image: 'Blueprint_book.png' },
            ],
            // Set default active item
            activeItemName: 'Calculator'
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
        },
        getImagePath(imageName) {
            try {
                return require(`@/assets/factorio-pngs/${imageName}`);
            } catch (e) {
                console.error(`Image not found: ${imageName}`, e);
                // Return a placeholder or default image
                return ''; 
            }
        }
    },
    mounted() {
        this.setActive(`Calculator`) // Update to match the name property
    }
})
</script>

<style scoped>
.TheSideNav-container {
    max-width: 50px;
    width: 50px;
    min-width: 50px;
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
    padding: 12px 0px 12px 0px;
    transition: .3s;
    border-right: var(--strong-border);
    background-color: var(--secondary-color);
    display: flex;
    justify-content: center;
    align-items: center;
}
.container__filler {
    border-right: var(--strong-border);
}
.container__filler--small {
    flex-grow: 1;
}
.container__filler--large {
    flex-grow: 12;
}
.container__item--selected {
    border: var(--strong-border);
    border-right: none;
    border-left: none;
    background-color: var(--primary-color) !important;
}
.container__item:hover {
    background-color: var(--active-color);
}
.container__icon {
    width: 35px;
    height: 35px;
    object-fit: contain;
}
</style>