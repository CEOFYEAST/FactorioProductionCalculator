<template>
    <div class="AccountCreationView-container">

        <h1 class="container__header">Create Account</h1>

        <form class="form" @submit.prevent="tryCreateUser">

            <p class="form__p">Creating an account allows you to store production values for up to three factories across sessions.</p>
            
            <input class="form__input" type="text" placeholder="Username" v-model="usernameInput" required><br>
            <input class="form__input" type="password" placeholder="Password" v-model="userPasswordInput" required><br>
            
            <div class="submit-container">
                <div class="submit-container__filler"></div>
                <button class="submit-container__button" type="submit">Submit</button>
                <div class="submit-container__filler"></div>
            </div>

            <div class="status-container" v-show="showStatusMessage">
                <!-- Bind the status message to the creationStatusMessage in the store -->
                <p class="status-container__p">{{ creationStatusMessage }}</p>
            </div>

            <div class="pointer-container">
                <p class="pointer-container__p">
                    Already have an account? 
                <RouterLink :to="accountAccessRoute">Log In.</RouterLink></p>
            </div>
        </form> 

    </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { definedRoutes } from '@/scripts/router'

let UDS = {}

export default {
    name: 'account creation form',
    data () {
        return {
            usernameInput: "",
            userPasswordInput: "",
            showStatusMessage: false,
            LOADING_MESSAGE: "Loading...",
            accountAccessRoute: definedRoutes.accountAccessRoute
        }
    },
    methods: {
        tryCreateUser() {
            this.showStatusMessage = true

            var bodyFormData = new FormData();
            bodyFormData.append('usernameInput', this.usernameInput);
            bodyFormData.append('userPasswordInput', this.userPasswordInput);

            // Call the user store's tryCreateAccount method
            UDS.tryCreateAccount(this.usernameInput, this.userPasswordInput).then((creationSuccess) => {
                if(creationSuccess) {
                    this.usernameInput = ""
                    this.userPasswordInput = ""
                } else this.userPasswordInput = ""
            })
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
.container__header {
    text-align: center;
}

.form {
    display: flex;
    flex-direction: column;
}
.form__p, .pointer-container__p {

}
.form__input {
    font-size: 16px;
    padding-left:5px;
}

.submit-container {
    display: flex;
}
.submit-container__filler {
    flex-grow: 3;
}
.submit-container__button {
    height: 25px;
    width: 200px;
}
</style>