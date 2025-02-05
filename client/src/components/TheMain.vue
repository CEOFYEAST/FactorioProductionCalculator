<template>
    <div 
    id="TheMain-root" 
    :class="{ small: sizeControllers.isSmall, medium: sizeControllers.isMedium, large: sizeControllers.isLarge }"
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
            // used to control the size of TheMain using class binding
            sizeControllers: {
                isSmall: false,
                isMedium: false,
                isLarge: false,
            },
            // the routes whose views should be smaller
            smallRoutes: [
                definedRoutes.aboutViewRoute,
                definedRoutes.accountAccessRoute,
                definedRoutes.accountCreationRoute
            ],
            // the routes whose views should be medium-sized
            mediumRoutes: [
                definedRoutes.widgetsRoute
            ],
            // the routes whose views should be large
            largeRoutes: [
                
            ]
        }
    },
    methods: {
        // sets the current size of TheMain based on the supplied route
        setSize(route) {
            this.disableSizeClasses()
            
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
        },
        disableSizeClasses() {
            this.sizeControllers.isSmall = false,
            this.sizeControllers.isMedium = false,
            this.sizeControllers.isLarge = false
        }
    },
    mounted() {
        router.afterEach((to, from) => {
            this.setSize(to.fullPath);
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