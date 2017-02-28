<template>
  <div class="message">
    <time :datetime="timestamp">{{ timestamp | moment('from', 'now') }}</time>
    <strong class="username">{{ username }}</strong>
    <div>{{ message }}</div>
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
  },
  components: {
  }
}
</script>

<style>
.message {
  border-bottom: 1px solid #ddd;
  padding: 3px 5px;
}

.message .username:after {
  content: ':';
  margin-right: 5px;
  font-weight: bold;
}

.message time {
  float: right;
  color: #bbb;
}
</style>