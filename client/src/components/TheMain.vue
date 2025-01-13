<template>
    <div id="TheMain-root">
        <RouterView />
    </div>
</template>

<script>

export default {
    name: 'the main'
}
</script>

<style scoped>
#TheMain-root {
    display: flex;
    width: 60%;
    height: 100%;
    background-color: white;
}
</style>