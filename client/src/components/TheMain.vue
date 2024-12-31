<template>
    <div class="root">
        <RouterView />

        <ModalDialog v-show="showAccountGetModal" @hide-modal="$emit('hideModal')">
            <AccountAccessForm></AccountAccessForm>
        </ModalDialog>
        <ModalDialog v-show="showAccountPostModal" @hide-modal="$emit('hideModal')">
            <AccountCreationForm></AccountCreationForm>
        </ModalDialog>
    </div>
</template>

<script>
import { createMemoryHistory, createRouter } from 'vue-router'
import AccountAccessForm from './AccountAccessForm.vue';
import AccountCreationForm from './AccountCreationForm.vue';
import ModalDialog from './ModalDialog.vue';

export default {
    name: 'the main',
    components: {
        AccountAccessForm, 
        AccountCreationForm,
        ModalDialog
    },
    props: {
        showAccountGetModal: Boolean,
        showAccountPostModal: Boolean
    },
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