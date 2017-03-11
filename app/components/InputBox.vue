<template>
  <div class="input-box">
    <textarea
      ref="text"
      v-model="text"
      @keydown.enter.stop.prevent="onEnter"
      @change="onChange"
      placeholder="Type message to chat..."></textarea>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      text: '',
    }
  },
  computed: {
    messageKey() {
      return `group-message-${this.id}`
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

<style>
.input-box {
  background-color: #cccccc;
  margin-top: 3px;
}

.input-box textarea {
  width: calc(100% - 12px);
  padding: 3px;
  margin: 3px 3px 1px 3px;
  border: none;
  resize: none;
}

.input-box textarea:focus {
  outline-offset: 0;
  outline: 0;
}
</style>
