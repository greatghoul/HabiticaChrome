<template>
  <div class="input-box">
    <textarea
      ref="text"
      v-model="text"
      @keydown.enter.stop.prevent="onEnter"
      @change="onChange"
      :placeholder="placeholder"></textarea>
  </div>
</template>

<script>
export default {
  props: ['name', 'placeholder'],
  data() {
    return {
      text: '',
    }
  },
  computed: {
    messageKey() {
      return `input-box-${this.name}`
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.text = localStorage.getItem(this.messageKey) || ''
      this.$nextTick(() => this.$refs.text.focus())
    },
    reset() {
      this.text = ''
    },
    postMessage() {
      this.$emit('submit', this.text)
      this.reset()
    },
    makeNewLine() {
      document.execCommand('insertText', false, '\n')
      const textarea = this.$el.querySelector('textarea')
      textarea.scrollTop = textarea.scrollTop + 12
    },
    onChange() {
      localStorage.setItem(this.messageKey, this.text)
    },
    onEnter(evt) {
      if (evt.shiftKey) {
        this.makeNewLine()
      } else {
        this.postMessage()
      }
    }
  }
}
</script>
