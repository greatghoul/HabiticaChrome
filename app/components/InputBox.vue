<template>
  <div class="input-box">
    <textarea
      v-model="text"
      v-on:keydown.meta.enter.stop.prevent="postMessage"
      placeholder="Type message to chat..."></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    }
  },
  methods: {
    postMessage() {
      this.$emit('submit', this.text);
      this.text = '';
    }
  }
};
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