<template>
    <div id="AccountAccessView-root" class="root">
        <h2>User Data</h2>
        <div v-show="submissionSuccess" style="border: solid black 2px;">{{ userData }}</div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
* {
    text-align: center;
}
</style>