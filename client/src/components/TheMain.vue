<template>
    <div id="theMainRoot">
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
#theMainRoot {
    display: flex;
}
</style>