<template>
    <div id="AccountAccessView-root" class="root">
        <h2>User Data</h2>
        <div v-show="userStore.signedIn" style="border: solid black 2px;">{{ userStore.data }}</div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';

let userStore = useUserStore()
</script>

<style>
* {
    text-align: center;
}
</style>