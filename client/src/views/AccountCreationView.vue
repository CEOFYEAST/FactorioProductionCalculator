<template>
    <div id="AccountCreationView-root" class="root">

        <h1>Create Account</h1>

        <form @submit.prevent="createUser" class="flex column">
            <p>Creating an account allows you to store production values for up to three factories across sessions.</p>
            <input type="text" placeholder="Username" id="user-name" v-model="username" required><br>
            <input type="password" placeholder="Password" id="user-password" v-model="userPassword" required><br>
            <div class="flex">
                <div class="x3"></div>
                <button id="submit" type="submit" class="x2">Submit</button>
                <div class="x3"></div>
            </div>
            <div v-show="submitted">
                <p ref="statusMessage">Loading...</p>
            </div>
            <div>
                <p>Already have an account? <RouterLink :to="accountAccessRoute">Log In.</RouterLink></p>
            </div>
        </form> 

    </div>
</template>

<script>
import TopNav from '@/components/TheNav.vue'
import { definedRoutes } from '../scripts/router'
import axios from '@/scripts/axios';

export default {
    name: 'account creation form',
    components: {
        TopNav
    },
    data () {
        return {
            submitted: false,
            LOADING_MESSAGE: "Loading...",
            accountAccessRoute: definedRoutes.accountAccessRoute
        }
    },
    methods: {
        createUser() {
            this.submitted = true

            var bodyFormData = new FormData();
            bodyFormData.append('username', this.username);
            bodyFormData.append('userPassword', this.userPassword);

            axios
            .post(definedRoutes.accountCreationRoute, {
                username: this.username,
                userPassword: this.userPassword
            }, {
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded" 
                }
            })
            .then(response => {               
                this.$refs.statusMessage.innerHTML = response.data.statusMessage
            })
            .catch(error => {
                if(error == undefined) return

                if(Object.hasOwn(error, 'response')) this.$refs.statusMessage.innerHTML = error.response.data.statusMessage;
                else this.$refs.statusMessage.innerHTML = "Failed to connect to the server"
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
    input {
        font-size: 16px;
        padding-left:5px;
    }
    h1 {
        text-align: center;
    }
    p {
        text-align: center;
        /*
        align-self: center;
        width: 60%;
        flex-wrap: wrap;
        */
    }
    #submit {
        height: 25px;
    }
    
</style>