<template>
    <div class="root">

        <main>
            <ModalDialog v-if="this.showAccountCreationModal" @toggle-show-modal="this.$emit('toggleShowAccountCreationModal')">
                <AccountCreationForm></AccountCreationForm>
            </ModalDialog>

            <ModalDialog v-if="this.showSignInModal" @toggle-show-modal="this.$emit('toggleShowSignInModal')">
                <SignInForm></SignInForm>
            </ModalDialog>
        </main>
        
    </div>
</template>

<script>
import ModalDialog from './ModalDialog.vue';
import SignInForm from './SignInForm.vue'

export default {
    name: 'the main',
    props: [
        'showSignInModal',
        `showAccountCreationModal`
    ],
    components: {
        ModalDialog,
        SignInForm
    }
}
</script>

<style scoped>
main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>