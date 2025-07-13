<template>
    <div 
    class="TheMain-container"
    :class="{ 
        small: sizeControllers.isSmall, 
        medium: sizeControllers.isMedium, 
        large: sizeControllers.isLarge,
        full: sizeControllers.isFull
    }"
    >
        <RouterView />
    </div>
</template>

<script>
import router, { definedRoutes } from '../scripts/router'

export default {
    name: 'the main',
    data() {
        return {
            breakpoint: 768, // Mobile breakpoint in pixels
            sizeControllers: {
                isSmall: false,
                isMedium: false,
                isLarge: false,
                isFull: false
            },
            smallRoutes: [],
            mediumRoutes: [
                definedRoutes.aboutViewRoute,
                definedRoutes.accountAccessRoute,
                definedRoutes.accountCreationRoute,
                definedRoutes.userDataRoute
            ],
            largeRoutes: [],
            fullRoutes: [
                definedRoutes.prodChainCalculatorRoute
            ]
        }
    },
    methods: {
        setSize(route) {
            this.disableSizeClasses();
            
            // Always use full size if screen is smaller than breakpoint
            if(window.innerWidth < this.breakpoint) {
                console.log("--------------\n Mobile View - Force Full Width \n--------------")
                this.sizeControllers.isFull = true;
                return; // Exit early to prevent other classes from being applied
            }
            
            // Only apply route-based sizing on larger screens
            if(this.smallRoutes.find((value) => value == route) != undefined) {
                console.log("--------------\n Small Route \n--------------")
                this.sizeControllers.isSmall = true;
            }
            else if(this.mediumRoutes.find((value) => value == route) != undefined) {
                console.log("--------------\n Medium Route \n--------------")
                this.sizeControllers.isMedium = true;
            }
            else if(this.largeRoutes.find((value) => value == route) != undefined) {
                console.log("--------------\n Large Route \n--------------")
                this.sizeControllers.isLarge = true;
            }
            else if(this.fullRoutes.find((value) => value == route) != undefined) {
                console.log("--------------\n Full Route \n--------------")
                this.sizeControllers.isFull = true;
            }
        },
        disableSizeClasses() {
            this.sizeControllers.isSmall = false,
            this.sizeControllers.isMedium = false,
            this.sizeControllers.isLarge = false,
            this.sizeControllers.isFull = false
        },
        
        // Handle window resizing
        handleResize() {
            // Re-apply sizing logic with current route
            if(router.currentRoute && router.currentRoute.value) {
                this.setSize(router.currentRoute.value.fullPath);
            }
        }
    },
    mounted() {
        router.afterEach((to, from) => {
            this.setSize(to.fullPath);
        });
        
        // Add resize event listener
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        // Remove resize event listener
        window.removeEventListener('resize', this.handleResize);
    }
}
</script>

<style scoped>
.TheMain-container {
    display: flex;
    justify-content: center;
    max-width: 50%;
    width: 50%;
    min-width: 50%;
    max-height: 100%;
    min-height: 100%;
    background-color: white;
    border-left: var(--strong-border);
    border-right: var(--strong-border);
}
.TheMain-container.small {
    max-width: 40%;
    width: 40%;
    min-width: 40%;
}
.TheMain-container.medium {
    max-width: 60%;
    width: 60%;
    min-width: 60%;
}
.TheMain-container.large {
    max-width: 80%;
    width: 80%;
    min-width: 80%;
}
.TheMain-container.full {
    border-left: none;
    border-right: none;
    max-width: 100%;
    width: 100%;
    min-width: 100%;
}
.TheMain-container > * {
    padding-left: 20px;
    padding-right: 20px;
}
</style>