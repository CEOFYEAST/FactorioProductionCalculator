<template>
    <div class="root">

        <main>
            <ModalDialog v-if="this.showSignInModal" @toggle-show-modal="this.$emit('toggleShowModal')">
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
        'showSignInModal'
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