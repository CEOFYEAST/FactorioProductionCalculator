<template>
  <div class="UserInputMenu-container">
    <h1 class="container__header">User Input</h1>

    <div class="container__error-display" v-if="!(validationErrorMssg === '')">
      <span class="error-display__message">ERROR: {{ validationErrorMssg }}</span>
      <button class="error-display__close-button" @click="validationErrorMssg = ''">Close</button>
    </div>

    <h2 v-if="!resourcesLoaded" class="container__loading">Loading Recipes...</h2>

    <div class="display" v-if="resourcesLoaded">
      <UserDemandUpdate :factoryService="factoryService" />
      <TimeUnitRecalculation :factoryService="factoryService" :currentTimeUnit="timeUnit" />
      <MiscControls :factoryService="factoryService" />
    </div>
  </div>
</template>

<script>
import { useLoadedFactory } from '@/stores/loadedFactory'
import { addRecipesLoadedListener } from '@ceofyeast/prodchaincalculators/recipes'
import { addValidationFailedListener } from '@ceofyeast/prodchaincalculators/validators'
import UserDemandUpdate from '@/components/UserDemandUpdate.vue'
import TimeUnitRecalculation from '@/components/TimeUnitRecalculation.vue'
import MiscControls from '@/components/MiscControls.vue'

let LFS = {}

export default {
  name: 'UserInputMenu',
  components: {
    UserDemandUpdate,
    TimeUnitRecalculation,
    MiscControls
  },
  data() {
    return {
      validationErrorMssg: "",
      resourcesLoaded: false,
      factoryService: null
    }
  },
  computed: {
    userDemand() {
      return LFS.userDemand
    },
    prodChain() {
      return LFS.prodChain
    },
    timeUnit() {
      return LFS.timeUnit
    }
  },
  methods: {
    handleResourcesLoaded() {
      this.resourcesLoaded = true
    },
    handleValidationFailed(err) {
      this.validationErrorMssg = err.message
    }
  },
  beforeCreate() {
    // essential to set before creation so that the computed properties can refer to the proper values
    LFS = useLoadedFactory()
  },
  created() {
    this.factoryService = LFS;
    
    import('@ceofyeast/prodchaincalculators/recipes').then((recipesMod) => {
      this.resourcesLoaded = recipesMod.recipesLoaded
    })
    addRecipesLoadedListener(this.handleResourcesLoaded)
    addValidationFailedListener(this.handleValidationFailed)
  }
}
</script>

<style scoped>
.UserInputMenu-container {
  width: 90%;
  margin: auto;
}

.container__header {
  text-align: center;
  font-family: var(--stylized-font-family);
  margin-bottom: 20px;
}

.container__loading {
  text-align: center;
  margin: 20px 0;
  font-family: var(--main-font-family);
}

.container__error-display {
  background-color: #f44336;
  color: white;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--main-font-family);
  z-index: 1000;
}

.error-display__message {
  font-weight: bold;
}

.error-display__close-button {
  background-color: white;
  color: #f44336;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.display {
  padding: 15px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
}

@media (max-width: var(--mobile-breakpoint)) {
  .UserInputMenu-container {
    width: 100%;
  }
  
  .container__error-display {
    flex-direction: column;
  }
  
  .error-display__close-button {
    margin-top: 10px;
    margin-left: 0;
  }
}
</style>