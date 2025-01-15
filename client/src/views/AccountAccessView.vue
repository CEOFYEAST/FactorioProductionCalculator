<template>
    <div id="AccountAccessView-root" class="root">

        <h1>Account Access</h1>

        <form id="sign-in-form" @submit.prevent="accessUser" class="flex column">
            <input type="text" placeholder="Username" id="user-name" v-model="username" required><br>
            <input type="password" placeholder="Password" id="user-password" v-model="userPassword" required><br>
            <div id="submit-container" class="flex">
                <div class="x3"></div>
                <button id="submit" type="submit" class="x2">Submit</button>
                <div class="x3"></div>
            </div>
            <div v-show="submitted">
                <p ref="statusMessage">Loading...</p>
            </div>
            <div id="create-account-pointer-container">
                <p id="create-account-pointer-link">Don't have an account? <RouterLink to="/users/create">Create One.</RouterLink></p>
                <p id="create-account-pointer">Creating an account allows you to store production vals. for up to three factories across sessions.</p>
            </div>
        </form>

        <h2 v-show="submissionSuccess">User Data:</h2>
        <div v-show="submissionSuccess" style="border: solid black 2px;">{{ userData }}</div>

    </div>
</template>

<script>
import TopNav from '@/components/TopNav.vue'
import axios from 'axios';

export default {
    name: 'account access form',
    components: {
        TopNav
    },
    data () {
        return {
            userData: {},
            submitted: false,
            submissionSuccess: false,
            LOADING_MESSAGE: "Loading...",
            ACCESS_SUCCESS_MESSAGE: "Account successfully accessed"
        }
    },
    methods: {
        accessUser() {
            this.submitted = true

            var bodyFormData = new FormData();
            bodyFormData.append('username', this.username);
            bodyFormData.append('userPassword', this.userPassword);

            axios
            .post('/users/access', {
                username: this.username,
                userPassword: this.userPassword
            }, {
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded" 
                }
            })
            .then(response => {               
                if(response.status == 200) this.$refs.statusMessage.innerHTML = this.ACCESS_SUCCESS_MESSAGE
                this.userData = response.data
                this.submissionSuccess = true
            })
            .catch(error => {
                this.$refs.statusMessage.innerHTML = error
                this.submissionSuccess = false
            })
            .finally() 
        }
    }
}
</script>


<style scoped>
    * {
        margin-top: 10px;
    }
    h1 {
        text-align: center;
    }
    p {
        text-align: center;
    }
    input {
        font-size: 16px;
        padding-left:5px;
    }
    #submit {
        height: 25px;
    }
</style>