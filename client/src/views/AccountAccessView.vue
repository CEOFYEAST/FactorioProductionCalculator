<template>
    <div id="AccountAccessView-root" class="root">

        <h1>Account Access</h1>

        <form v-if="!(userStore.signedIn)" id="sign-in-form" @submit.prevent="accessUser" class="flex column">
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
                <p id="create-account-pointer-link">Don't have an account? <RouterLink :to="accountCreationRoute">Create One.</RouterLink></p>
                <p id="create-account-pointer">Creating an account allows you to store production vals. for up to three factories across sessions.</p>
            </div>
        </form>

        <div v-if="userStore.signedIn" id="logged-in-blurb" class="flex column">
            <h2>Account is already logged in</h2>
            <button @click="userStore.toggleSignedIn()">Log Out</button>
        </div>

        <h2 v-show="submissionSuccess">User Data:</h2>
        <div v-show="submissionSuccess" style="border: solid black 2px;">{{ userData }}</div>

    </div>
</template>

<script>
import TopNav from '@/components/TheNav.vue'
import { definedRoutes } from '../scripts/router'
import axios from 'axios';
//import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user'

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
            accountCreationRoute: definedRoutes.accountCreationRoute,
            userStore: {}
        }
    },
    // computed: {
    //     signedIn(){ return storeToRefs(this.store).signedIn }
    // },
    methods: {
        accessUser() {
            this.submitted = true

            var bodyFormData = new FormData();
            bodyFormData.append('username', this.username);
            bodyFormData.append('userPassword', this.userPassword);

            axios
            .post(definedRoutes.accountAccessRoute, {
                username: this.username,
                userPassword: this.userPassword
            }, {
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded" 
                }
            })
            .then(response => {           
                this.submissionSuccess = true
                console.log("Status Message: " + response.data.statusMessage)
                this.$refs.statusMessage.innerHTML = response.data.statusMessage
                if(response.status == 200) {
                    this.userData = response.data
                    this.userStore.toggleSignedIn()
                }
            })
            .catch(error => {
                console.log("Error keys: " + Object.keys(error))
                if(error.status == 404) this.$refs.statusMessage.innerHTML = "Failed to connect to the server"
                else this.$refs.statusMessage.innerHTML = error.response.data.statusMessage
                this.submissionSuccess = false
            })
            .finally() 
        }
    },
    created() {
        this.userStore = useUserStore()
        //this.signedIn = storeToRefs(store).signedIn
    }
}
</script>


<style scoped>
    * {
        margin-top: 10px;
    }
    h1, h2, h3 {
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