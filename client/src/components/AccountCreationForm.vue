<template>
    <div class="root">

        <form id="account-creation-form" action="/users" method="post" class="flex column">
            <p id="create-account-pointer">Creating an account allows you to store production vals. for up to three factories across sessions.</p>
            <input type="text" placeholder="Username" id="user-name" name="userName" required><br>
            <input type="password" placeholder="Password" id="user-password" name="userPassword" required><br>
            <div id="submit-container" class="flex">
                <div class="x3"></div>
                <button id="submit" type="submit" class="x2">Submit</button>
                <div class="x3"></div>
            </div>
            <div id="sign-in-pointer-container">
                <p id="sign-in-pointer-link">Already have an account? Log in.</p>
            </div>
        </form>

    </div>
</template>

<script>
import TopNav from '@/components/TopNav.vue'

export default {
    name: 'account creation form',
    components: {
        TopNav
    }
}
</script>


<style scoped>
    input {
        font-size: 16px;
        padding-left:5px;
    }

    #submit {
        height: 25px;
    }
</style>