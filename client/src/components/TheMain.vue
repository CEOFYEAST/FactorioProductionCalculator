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
    /*align-items: center;*/
    justify-content: center;
    padding: 20px 20px;
    width: 60%;
    min-width: max-content;
    max-width: max-content;
    height: 100%;
    background-color: white;
}
</style>