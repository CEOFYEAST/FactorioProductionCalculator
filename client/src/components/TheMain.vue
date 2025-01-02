<template>
    <div class="root">
        <RouterView />

        <!-- <ModalDialog v-show="showAccountGetModal" @hide-modal="$emit('hideModal')">
            <AccountAccessForm></AccountAccessForm>
        </ModalDialog>
        <ModalDialog v-show="showAccountPostModal" @hide-modal="$emit('hideModal')">
            <AccountCreationForm></AccountCreationForm>
        </ModalDialog> -->
    </div>
</template>

<script>

export default {
    name: 'the main',
    components: {
    },
    props: {
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