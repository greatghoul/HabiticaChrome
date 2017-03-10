<template>
  <div class="message">
    <time :datetime="timestamp">{{ timestamp | moment('from', 'now') }}</time>
    <strong class="username">{{ username }}</strong>
    <div v-html="text" class="text"></div>
  </div>
</template>

<script>
import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  const link = marked.Renderer.prototype.link.call(this, href, title, text);
  return link.replace("<a","<a target='_blank' ");
};
marked.setOptions({ renderer });

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
