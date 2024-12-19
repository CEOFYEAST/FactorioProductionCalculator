<template>
    <div class="root">
        <ModalDialog v-show="showAccountGetModal" @toggle-show-modal="$emit('toggleAccountGetModal')">
            <AccountAccessForm></AccountAccessForm>
        </ModalDialog>
        <ModalDialog v-show="showAccountPostModal" @toggle-show-modal="$emit('toggleAccountPostModal')">
            <AccountCreationForm></AccountCreationForm>
        </ModalDialog>
    </div>
</template>

<script>
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