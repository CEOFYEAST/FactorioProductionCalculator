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
            <div v-show="submitted">
                <p ref="statusMessage">Loading...</p>
            </div>
            <div id="sign-in-pointer-container">
                <p id="sign-in-pointer-link">Already have an account? <RouterLink to="/users/access">Log In.</RouterLink></p>
            </div>
        </form> 

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
            submitted: false,
            LOADING_MESSAGE: "Loading...",
            ACCOUNT_EXISTS_MESSAGE: "Account already exists",
            CREATION_SUCCESS_MESSAGE: "Account successfully created"
        }
    },
    methods: {
        createUser() {
            this.submitted = true

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
            .then(response => {               
                if(response.status == 200) this.$refs.statusMessage.innerHTML = this.ACCOUNT_EXISTS_MESSAGE
                else if(response.status == 201) this.$refs.statusMessage.innerHTML = this.CREATION_SUCCESS_MESSAGE
            })
            .catch(error => {
                this.$refs.statusMessage.innerHTML = error
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