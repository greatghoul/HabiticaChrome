<template>
  <div class="group-view">
    <div class="message-list">
      <message
          v-for="message in messages"
          :key="message.id"
          :message="message" />
    </div>

    <input-box v-on:submit="postMessage"></input-box>
  </div>
</template>

<script>
import Message from './Message.vue';
import InputBox from './InputBox.vue';

export default {
  props: ['id'],
  data() {
    return {
      messages: []
    };
  },
  created() {
    this.fetchMessages();
  },
  computed: {
    api() {
      return this.$parent.api;
    },
    groupUrl() {
      return `/groups/${this.id}/chat`;
    }
  },
  methods: {
    fetchMessages() {
      this.messages = [];
      this.api.get(this.groupUrl)
        .then(res => this.messages = res.data.reverse())
        .then(() => this.scrollToBottom())
    },
    postMessage(message) {
      this.api.post(this.groupUrl, { message })
        .then(res => {
          this.messages.push(res.data.message);
          this.scrollToBottom();
        });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const elem = this.$el.querySelector('.message-list');
        elem.scrollTop = elem.scrollHeight;
      });
    },
  },
  watch: {
    id() {
      this.fetchMessages();
    }
  },
  components: {
    Message,
    InputBox
  }
}
</script>