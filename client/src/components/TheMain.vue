<template>
    <div 
    id="TheMain-root" 
    :class="{ small: isSmall, medium: isMedium, large: isLarge }"
    >
        <RouterView />
    </div>
</template>

<script>
import router from '../scripts/router'
import definedRoutes from '../scripts/routes.module'

export default {
    name: 'the main',
    data() {
        return {
            // used to control the size of TheMain using class binding
            sizeControllers: {
                isSmall: false,
                isMedium: false,
                isLarge: false,
            },
            // the routes whose views should be smaller
            smallRoutes: [
                definedRoutes.aboutViewRoute
            ],
            // the routes whose views should be medium-sized
            mediumRoutes: [
                definedRoutes.accountAccessRoute,
                definedRoutes.accountCreationRoute
            ],
            // the routes whose views should be large
            largeRoutes: [
                definedRoutes.widgetsRoute
            ]
        }
    },
    methods: {
        // sets the current size of TheMain based on the supplied route
        setSize(route) {
            this.disableSizeClasses()
            if(this.smallRoutes.find(route) != undefined) this.sizeControllers.isSmall = true;
            else if(this.mediumRoutes.find(route) != undefined) this.sizeControllers.isMedium = true;
            else if(this.largeRoutes.find(route) != undefined) this.sizeControllers.isLarge = true;
        },
        disableSizeClasses() {
            this.sizeControllers.isSmall = false,
            this.sizeControllers.isMedium = false,
            this.sizeControllers.isLarge = false
        }
    },
    mounted() {
        router.afterEach((to, from) => {
            setSize(to.fullPath);
        })
    }
}
</script>

<style scoped>
#TheMain-root {
    /*align-items: center;*/
    width: 50%;
    min-width: 50%;
    max-width: 50%;
    padding: 20px 20px;
    height: 100%;
    background-color: white;
    border-left: 4px black solid;
    border-right: 4px black solid;
}
#TheMain-root.small {
    width: 40%;
    min-width: 40%;
    max-width: 40%;
}
#TheMain-root.medium {
    width: 60%;
    min-width: 60%;
    max-width: 60%;
}
#TheMain-root.large {
    width: 80%;
    min-width: 80%;
    max-width: 80%;
}
#TheMain-root:only-child {
    display: flex;
    max-width: max-content;
    min-width: max-content;
    justify-content: center;
}
</style>