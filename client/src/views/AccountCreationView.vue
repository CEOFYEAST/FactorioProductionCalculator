<template>
    <div id="AccountCreationView-root" class="root">

        <h1>Create Account</h1>

        <form @submit.prevent="tryCreateUser" class="flex column">
            <p>Creating an account allows you to store production values for up to three factories across sessions.</p>
            <input type="text" placeholder="Username" id="user-name" v-model="username" required><br>
            <input type="password" placeholder="Password" id="user-password" v-model="userPassword" required><br>
            <div class="flex">
                <div class="x3"></div>
                <button id="submit" type="submit" class="x2">Submit</button>
                <div class="x3"></div>
            </div>
            <div v-show="submitted">
                <!-- Bind the status message to the creationStatusMessage in the store -->
                <p>{{ creationStatusMessage }}</p>
            </div>
            <div>
                <p>Already have an account? <RouterLink :to="accountAccessRoute">Log In.</RouterLink></p>
            </div>
        </form> 

    </div>
</template>

<script>
import TopNav from '@/components/TheNav.vue'
import { useUserStore } from '@/stores/user'
import { definedRoutes } from '@/scripts/router'

let UDS = {}

export default {
    name: 'account creation form',
    components: {
        TopNav
    },
    data () {
        return {
            username: "",
            userPassword: "",
            submitted: false,
            LOADING_MESSAGE: "Loading...",
            accountAccessRoute: definedRoutes.accountAccessRoute
        }
    },
    methods: {
        tryCreateUser() {
            this.submitted = true

            var bodyFormData = new FormData();
            bodyFormData.append('username', this.username);
            bodyFormData.append('userPassword', this.userPassword);

            // Call the user store's tryCreateAccount method
            UDS.tryCreateAccount(this.username, this.userPassword)
        }
    },
    computed: {
      creationStatusMessage(){
        return UDS.creationStatusMessage
      },
    },
    created(){
        UDS = useUserStore()
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