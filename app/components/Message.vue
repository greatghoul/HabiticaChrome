<template>
  <div class="message">
    <time :datetime="timestamp">{{ timestamp | moment('from', 'now') }}</time>
    <strong class="username">{{ username }}</strong>
    <div v-html="text" class="text"></div>
  </div>
</template>

<script>
import marked from 'marked';

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
    },
    text() {
      return marked(this.message.text);
    }
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

.message .text {
  color: #555;
}

.message .text p {
  margin: 5px 0;
}

.message .text code {
  font-size: 12px;
}
</style>