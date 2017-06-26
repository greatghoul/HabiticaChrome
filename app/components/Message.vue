<template>
  <div class="message">
    <time :datetime="timestamp">{{ timestamp | moment('from', 'now') }}</time>
    <strong class="username">{{ username }}</strong>
    <div class="text" v-html="marked(message.text)"></div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  computed: {
    username() {
      if (this.message.uuid == 'system') {
        return this.message.uuid;
      } else {
        return this.message.user;
      }
    },
    timestamp() {
      return new Date(this.message.timestamp);
    }
  }
}
</script>
