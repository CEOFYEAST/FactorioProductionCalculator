<template>
    <div id="AccountAccessView-root" class="root">

        <h1>Sign In</h1>

        <form id="sign-in-form" @submit.prevent="accessUser" class="flex column">

            <input :disabled="signedIn" type="text" placeholder="Username" id="user-name" v-model="username" required><br>
            <input :disabled="signedIn" type="password" placeholder="Password" id="user-password" v-model="userPassword" required><br>
s
            <div id="submit-container" class="flex">
                <div class="x3"></div>
                <button v-if="!(signedIn)" id="submit" type="submit">Submit</button>
                <button v-if="signedIn" @click="logout()" id="logout-button">Log Out</button>
                <div class="x3"></div>
            </div>

            <div v-show="showStatusMessage">
                <p>{{ creationStatusMessage }}</p>
            </div>

            <div v-if="!(signedIn)" id="create-account-pointer-container">
                <p id="create-account-pointer-link">Don't have an account? <RouterLink :to="accountCreationRoute">Create One.</RouterLink></p>
                <p id="create-account-pointer">Creating an account allows you to store production vals. for up to three factories across sessions.</p>
            </div>

            <div v-if="signedIn" id="current-user-pointer-container">
                <p>User currently signed in: {{ userStore.username }}</p>
            </div>

        </form>

        <!-- <div v-if="signedIn" id="logged-in-blurb" class="flex column middle center">
            <h2>Account is currently signed in</h2>
            <hr/>
            <button @click="userStore.toggleSignedIn()" id="logout-button">Log Out</button>
        </div> -->

        <!-- <h2 v-show="submissionSuccess">User Data:</h2>
        <div v-show="submissionSuccess" style="border: solid black 2px;">{{ userData }}</div> -->

    </div>
</template>

<script>
import TopNav from '@/components/TheNav.vue'
import { definedRoutes } from '../scripts/router'
import { sendLoginRequest } from '@/scripts/userAPI'
import { useUserStore } from '@/stores/user'

let UDS = {}

export default {
    name: 'account access form',
    components: {
        TopNav
    },
    data () {
        return {
            username: "",
            userPassword: "",
            userData: {},
            showStatusMessage: false,
            submissionSuccess: false,
            accountCreationRoute: definedRoutes.accountCreationRoute,

        }
    },
    methods: {
        accessUser() {
            this.showStatusMessage = true

            var bodyFormData = new FormData();
            bodyFormData.append('username', this.username);
            bodyFormData.append('userPassword', this.userPassword);

            UDS.tryLogin(this.username, this.userPassword)

            this.submissionSuccess = true
        },
        logout(){
            UDS.logout()
        }
    },
    computed: {
        accessStatusMessage(){
            return UDS.accessStatusMessage
        },
        signedIn(){
            return UDS.signedIn
        }
    },
    created() {
       UDS = useUserStore()
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
    #submit, #logout-button {
        height: 25px;
        width: 200px;
    }
    /* #logged-in-blurb {
        justify-content: center;
        align-content: center;
        background-color: purple;
    }
    #logout-button {
        justify-self: center;
        width: 25%;
    } */
</style>