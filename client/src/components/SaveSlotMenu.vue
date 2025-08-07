<template>
    <div class="SaveSlotMenu-container">

        <h1 class="container__header">Save Slots</h1>

        <div class="save-slots">
            <div
                v-for="slotID in Object.keys(saveSlotData)"
                :key="slotID"
                :class="['save-slots__save-slot', { 'save-slots__save-slot--active': selectedSlot === slotID }]"
                @click="selectSlot(slotID)"
            >
                Save Slot {{ slotID }}
            </div>
        </div>
        <div class="controls">
            <button class="controls__button" :disabled="!selectedSlot" @click="save">Save</button>
            <button class="controls__button" :disabled="!selectedSlot" @click="load">Load</button>
        </div>
        <div class="status" v-show="showStatusMessage">
            <h3 class="status__header">Status</h3>
            <p class="status__p">{{ saveSlotsStatusMessage }}</p>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { useLoadedFactory } from '@/stores/loadedFactory';

let UDS = {}
let LFS = {}

export default {
    // TO-DO Import save slots object from store; might have to do this on mount/create
    name: "SaveSlotMenu",
    data() {
        return {
            saveSlotData: UDS.saveSlotData,
            selectedSlot: null
        };
    },
    methods: {
        selectSlot(slotId) {
            this.selectedSlot = slotId;
        },
        save() {
            UDS.saveToSlot(this.selectedSlot, LFS.loadedFactory)
        },
        load() {
            UDS.loadSlot(this.selectedSlot, LFS.loadFactoryData)
        },
    },
    computed: {
        saveSlotsStatusMessage(){
            return UDS.saveSlotsStatusMessage;
        },
        showStatusMessage() {
            return this.saveSlotsStatusMessage === true;  
        }
    },
    beforeCreate(){
        // essential to set before creation so that the computed properties can refer to the proper values
        UDS = useUserStore()
        LFS = useLoadedFactory()
    },
}
</script>

<style scoped>
.SaveSlotMenu-container {
    text-align: center;
}
.container__header {
    text-align: center;
    font-family: var(--stylized-font-family);
}
.save-slots {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
.save-slots__save-slot {
    font-family: var(--main-font-family);
    font-size: var(--body-font-size);
    color: var(--main-text-color);
    padding: 10px 20px;
    margin: 0 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    user-select: none;
}
.save-slots__save-slot--active {
    border: var(--active-gradient);
    background: var(--active-gradient);
}
.controls__button {
    font-family: var(--main-font-family);
    font-size: var(--body-font-size);
    color: var(--main-text-color);
    margin: 0 10px;
    padding: 10px 20px;
    cursor: pointer;
}
.controls__button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
.status {
    margin-top: 40px;
}
.status__header {
    font-family: var(--main-font-family);
    color: var(--stylized-text-color);
}
.status__p {
    font-family: var(--main-font-family);
    font-size: var(--body-font-size);
    color: var(--main-text-color);
}
</style>