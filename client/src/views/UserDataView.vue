<template>
    <div id="WidgetsView-root" class="root">
        <h2 v-show="!(signedIn)">No User Is Currently Signed In</h2>

        <SaveSlotMenu v-show="signedIn"/>
    </div>
</template>

<script setup>
import SaveSlotMenu from '@/components/SaveSlotMenu.vue'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

let userStore = useUserStore()

let { signedIn } = storeToRefs(userStore)
</script>

<style>
* {
    text-align: center;
}
</style>