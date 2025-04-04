<template>
    <div id="HomeView-root" class="root">
        
        <div class="flex column">
            <h1>Factorio Production Calculator</h1>
            <h2>(Production Calculator Release)</h2>
            <h3>The current release is the Production Calculator release; this release was created to show off my progress on the production calculator, which is a core feature of the website. The user can create a production chain, add and remove demand from this production chain, clear the chain entirely, and recalculate the time unit of the chain. The user's inputs, as well as the intermediary demand calculated as a result of said inputs, are dynamically displayed by the site. This new functionality can be found under the "Production Calculator" tab. Creating this release involved writing a package, creating an automated testing suite for that package, and coding a visual interface to expose the functionality of the package to the user.</h3>
            <hr/>
            <h3>A web app created to aid users in designing their Factorio factories.</h3>
        </div>

    </div>
</template>

<script>
export default {
    name: 'home',
}
</script>

<style scoped>
* {
    text-align: center;
}
h2 {
    color: darkslategray;
}
hr {
    width: 90%;
    height: 4px;
    color: black;
    background-color: black;
}
</style>