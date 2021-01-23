<template>
  <div class="form-text">
    <input
      v-model="text"
      class="form-text__form"
      type="text"
      :placeholder="placeholder"
      @change="changeText(text)"
      @keydown="(key) => inputKey(key)"
    >
    <img class="form-text__icon" src="../assets/open-in-new.png" @click="clickIcon()"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'vue'

type Props = {
  placeholder: string
}

export default defineComponent({
  name: 'FormText',
  emits: ['input', 'enter'],
  props: {
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },

  setup (props: Props, context: SetupContext) {
    const { text } = reactive({ text: '' })

    const inputKey = (key: KeyboardEvent) => {
      context.emit('input', text)
      if (key.key === 'Enter') {
        context.emit('enter')
      }
    }

    const changeText = (text: string) => {
      context.emit('input', text)
    }

    const clickIcon = () => context.emit('enter')

    return {
      // value
      text,

      // methods
      inputKey,
      changeText,
      clickIcon
    }
  }
})
</script>

<style scoped>
.form-text {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-text__form {
  width: 500px;
  line-height: 1.2;
  margin-left: 25px;
}

.form-text__icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>
