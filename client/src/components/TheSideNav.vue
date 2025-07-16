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

export default defineComponent({
    props: {
        navItems: Array
    },
    data() {
        return {
            activeItemName: ''
        }
    },
    methods: {
        setActive(itemName) {
            if(this.activeItemName != itemName) {
                this.activeItemName = itemName;
                this.$emit('navigation-triggered', itemName);
            }
        },
        getImagePath(imageName) {
            try {
                return require(`@/assets/factorio-pngs/${imageName}`);
            } catch (e) {
                console.error(`Image not found: ${imageName}`, e);
                return ''; 
            }
        }
    },
    mounted() {
        this.setActive(this.navItems[0].name) // Update to match the name property
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