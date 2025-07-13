<template>
    <div class="AboutView-container">
        
        <h1>Factorio Production Calculator</h1>
        <h2 class="container__header-two">(Save Slots & Security Release)</h2>
        <h3>
            The current release is the Save Slots & Security release; this release includes a system for editing and saving calculated production data across sessions for up to three factories. This release also takes steps to increase the overall security of the site; passwords are now hashed upon entering the server, and user sessions are stored in a secure fashion on the backend. Creating this release involved implementing secure server sessions, adding hashing and length requirements for passwords, writing APIs for save slots and user account functionality, creating a package and manual testing dashboard for the backend route handlers, and designing a visual interface for the save slots menu. I hope you enjoy!
        </h3>
        <hr class="container__header-rule"/>
        <h3>A web app created to aid users in designing their Factorio factories.</h3>

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
.container__header-two {
    color: darkslategray;
}
.container__header-rule {
    width: 90%;
    height: 4px;
    color: black;
    background-color: black;
}
</style>