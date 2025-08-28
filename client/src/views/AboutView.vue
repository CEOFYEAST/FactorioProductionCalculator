<template>
    <div class="AboutView-container">
        
        <h1 class="container__header">Factorio Production Calculator</h1>
        <h2 class="container__header-medium">Visualization and Beautification release</h2>
        <p class="container__p">
            The current release is the Visualization and Beautification release; this release includes a table-based visualizer for calculated factory data including item, crafter, and belt demand. This release also makes strides in modernizing the site's visuals as a whole. Creating this release involved lots of front-end work; I had to find a way to translate all of my calculated values into helpful visuals for the end user. I hope you enjoy!
        </p>
        <hr class="container__header-rule"/>
        <h3 class="container__header-small">A web app created to aid users in designing their Factorio factories.</h3>

    </div>
</template>

<script>
export default {
    name: 'home',
}
</script>

<style scoped>
.AboutView-container {
    display: flex;
    flex-direction: column;
    text-align: center;
}
.container__header {
    text-align: center;
    font-family: var(--stylized-font-family);
    color: var(--stylized-text-color);
}
.container__header-medium {
    font-family: var(--main-font-family);
    color: var(--main-text-color);
}
.container__header-small {
    font-family: var(--main-font-family);
    color: var(--main-text-color);
}
.container__p {
    font-family: var(--main-font-family);
    font-size: var(--body-font-size);
    color: var(--main-text-color);
    text-align: left;
    width: 85%;
    margin: auto;
    margin-top: 15px;
    margin-bottom: 30px;
}
.container__header-rule {
    width: 90%;
    height: 4px;
    color: black;
    background-color: black;
}
</style>