<template>
    <div class="root">

        <body>
            <TopNav>
                <div align="right">
                    <button id="close-button" @click="$emit('toggleShowModal')">X</button>
                </div>
            </TopNav>

            <main>
                <slot>

                </slot>
            </main>
        </body>

    </div>
</template>

<script>
import TopNav from '@/components/TopNav.vue'

export default {
    name: 'modal dialog',
    components: {
        TopNav
    }
}
</script>


<style scoped>
    body {
        width: 450px;
        position: fixed;
        top: 40%;
        left: 50%;
        margin-left: -225px;
        display: flex;
        flex-direction: column;
        border: 1px solid black;
    }

    main {
        padding-top: 10px;
        padding-left: 15px;
        padding-right: 15px;
    }

    #close-button {
        border: none;
        border-left: 1px solid black;
        height: 25px;
        width: 25px;
    }

    #close-button:hover {
        background-color: lightgray;
    }
</style>