<template>
    <div class="root">

        <form id="account-creation-form" @submit.prevent="createUser" class="flex column">
            <p id="create-account-pointer">Creating an account allows you to store production values for up to three factories across sessions.</p>
            <input type="text" placeholder="Username" id="user-name" v-model="userName" required><br>
            <input type="password" placeholder="Password" id="user-password" v-model="userPassword" required><br>
            <div id="submit-container" class="flex">
                <div class="x3"></div>
                <button id="submit" type="submit" class="x2">Submit</button>
                <div class="x3"></div>
            </div>
            <div id="sign-in-pointer-container">
                <p id="sign-in-pointer-link">Already have an account? <RouterLink to="/users/access">Log In.</RouterLink></p>
            </div>
        </form>

        <div style="border: solid black 2px;">User Data:</div>
        <div style="border: solid black 2px;">{{ userData }}</div>

    </div>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
import axios from 'axios';

export default {
    name: 'account creation form',
    components: {
        TopNav
    },
    data () {
        return {
            userData: {
                name: "hello"
            }
        }
    },
    methods: {
        createUser() {
            var vm = this
            var bodyFormData = new FormData();
            bodyFormData.append('userName', this.userName);
            bodyFormData.append('userPassword', this.userPassword);

            axios
            .post('/users/create', {
                userName: this.userName,
                userPassword: this.userPassword
            }, {
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded" 
                }
            })
            .then(function (response) {
                vm.userData = response.data
            })
            .catch(function (response) {
                console.log(response)
            })
            .finally() 
        }
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