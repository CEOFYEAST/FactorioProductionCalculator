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

export default {
    name: 'the main',
    data() {
        return {
            isSmall: false,
            isMedium: true,
            isLarge: false
        }
    },
    methods: {
        disableClasses() {
            this.isSmall = false,
            this.isMedium = false,
            this.isLarge = false
        }
    },
    mounted() {
        router.afterEach((to, from) => {
            console.log('-----------------\n Route Full Path: ' + to.fullPath + '\n-----------------');
            console.log('-----------------\n Route Full Path Type: ' + typeof(to.fullPath) + '\n-----------------');

            if(to.fullPath == "/widgets") {
                console.log('-----------------\n Enabling Large \n-----------------');
                this.disableClasses();
                this.isLarge = true;
            }
            else if(to.fullPath == "/") {
                console.log('-----------------\n Enabling Small \n-----------------');
                this.disableClasses();
                this.isSmall = true;
            } 
            else {
                console.log('-----------------\n Enabling Medium \n-----------------');
                this.disableClasses();
                this.isMedium = true;
            }
        })
    }
    // Use route.matched
    // Use navigation guards
    // Would be easiest to just watch the route somehow instead of calling a method when a route changes
}



</script>

<style scoped>
#TheMain-root {
    /*align-items: center;*/
    width: 100%;
    min-width: 100%;
    max-width: 100%;
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
/*
#TheMain-root {
    display: flex;
    justify-content: center;
    padding: 20px 20px;
    width: 60%;
    min-width: max-content;
    max-width: max-content;
    height: 100%;
    background-color: white;
    border-left: 4px black solid;
    border-right: 4px black solid;
}
*/
</style>