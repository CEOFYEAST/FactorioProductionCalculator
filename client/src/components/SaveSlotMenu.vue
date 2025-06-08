<template>
    <div class="save-slot-menu">
        <h2>Save Slot Menu</h2>
        <div class="save-slots">
            <div
                v-for="slotID in Object.keys(saveSlotData)"
                :key="slotID"
                :class="['save-slot', { selected: selectedSlot === slotID }]"
                @click="selectSlot(slotID)"
            >
                Save Slot {{ slotID }}
            </div>
        </div>
        <div class="buttons">
            <button :disabled="!selectedSlot" @click="save">Save</button>
            <button :disabled="!selectedSlot" @click="load">Load</button>
        </div>
        <div v-show="showStatusMessage">
            <p>{{ saveSlotsStatusMessage }}</p>
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
            selectedSlot: null,
            showStatusMessage: true,
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
            return UDS.saveSlotsStatusMessage
        },
    },
    beforeCreate(){
        // essential to set before creation so that the computed properties can refer to the proper values
        UDS = useUserStore()
        LFS = useLoadedFactory()
    },
}
</script>

<style scoped>
.save-slot-menu {
    text-align: center;
}

.save-slots {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.save-slot {
    padding: 10px 20px;
    margin: 0 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    user-select: none;
}

.save-slot.selected {
    background-color: #007bff;
    color: white;
    border-color: #0056b3;
}

.buttons button {
    margin: 0 10px;
    padding: 10px 20px;
    cursor: pointer;
}

.buttons button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>