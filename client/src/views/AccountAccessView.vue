<template>
    <div class="AccountAccessView-container">

        <h1 class="container__header">Sign In</h1>

        <form class="form" @submit.prevent="accessUser">

            <input class="form__input" :disabled="signedIn" type="text" placeholder="Username" v-model="usernameInput" required><br>
            <input class="form__input" :disabled="signedIn" type="password" placeholder="Password" v-model="userPasswordInput" required><br>

            <div class="submit-container">
                <div class="submit-container__filler"></div>
                <button class="submit-container__button" v-if="!(signedIn)" type="submit">Submit</button>
                <button class="submit-container__button" v-if="signedIn" @click="logout()" type="button">Log Out</button>
                <div class="submit-container__filler"></div>
            </div>

            <div class="status-container" v-show="showStatusMessage">
                <p class="status-container__p">{{ accessStatusMessage }}</p>
            </div>

            <div v-if="!(signedIn)" class="pointer-container">
                <p class="pointer-container__p">
                    Don't have an account? 
                    <RouterLink :to="accountCreationRoute">
                        Create One.
                    </RouterLink>
                </p>
                <p class="pointer-container__p">
                    Creating an account allows you to store production vals. for up to three factories across sessions.
                </p>
            </div>

            <div v-if="signedIn" class="pointer-container">
                <p class="pointer-container__p">User currently signed in: {{ username }}</p>
            </div>

        </form>
    </div>
</template>

<script>
import { definedRoutes } from '../scripts/router'
import { useUserStore } from '@/stores/user'

let UDS = {}

export default {
    name: 'account access form',
    data () {
        return {
            usernameInput: "",
            userPasswordInput: "",
            showStatusMessage: false,
            accountCreationRoute: definedRoutes.accountCreationRoute,
        }
    },
    methods: {
        accessUser() {
            this.showStatusMessage = true

            var bodyFormData = new FormData();
            bodyFormData.append('usernameInput', this.usernameInput);
            bodyFormData.append('userPasswordInput', this.userPasswordInput);

            UDS.tryLogin(this.usernameInput, this.userPasswordInput).then((loginSuccess) => {
                if(loginSuccess) {
                    this.usernameInput = ""
                    this.userPasswordInput = ""
                } else this.userPasswordInput = ""
            })
        },
        logout(){
            UDS.tryLogout()
        }
    },
    computed: {
        accessStatusMessage(){
            return UDS.accessStatusMessage
        },
        signedIn(){
            return UDS.signedIn
        },
        username(){
            return UDS.username
        }
    },
    created() {
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