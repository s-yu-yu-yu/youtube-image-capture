<template>
  <transition name="fade">
    <div v-if="errorMessage" class="error-snack-bar" @click="click()">
      {{ errorMessage }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['close'],
  props: {
    errorMessage: {
      type: String,
      required: true
    }
  },

  setup (props, context) {
    const click = () => {
      context.emit('close')
    }

    return {
      click
    }
  }
})
</script>

<style scoped>
.error-snack-bar {
  position: fixed;
  bottom: 50px;
  left: calc(50% - 200px);
  width: 400px;
  padding: 20px 30px;
  box-sizing: border-box;
  background-color: red;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
