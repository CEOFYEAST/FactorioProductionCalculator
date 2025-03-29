<template>
    <!-- <div id="WidgetsView-root" class="root">
        <h2 v-show="!(userStore.signedIn)">No User Is Currently Signed In</h2>
        <h2 v-show="userStore.signedIn">User Data</h2>
        <div v-show="userStore.signedIn" style="border: solid black 2px;">{{ userStore.data }}</div>
    </div> -->

    <div id="WidgetsView-root" class="root">

    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { useLoadedFactory } from '@/stores/loadedFactory';

let loadedFactory = useLoadedFactory()
let userStore = useUserStore()
</script>

<style>
* {
    text-align: center;
}
</style>