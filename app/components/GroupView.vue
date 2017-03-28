<template>
  <div class="view group-view">
    <div class="list message-list">
      <message
          v-for="message in messages"
          :key="message.id"
          :message="message" />
    </div>

    <input-box
      @submit="postMessage"
      :name="id"
      ref="inputBox"
      placeholder="Type message here ..." />
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
    this.initialize()
  },
  computed: {
    api() {
      return this.$parent.api
    },
    groupUrl() {
      return `/groups/${this.id}/chat`
    }
  },
  methods: {
    initialize() {
      this.fetchMessages()
      this.$nextTick(() => this.$refs.inputBox.initialize())
    },
    fetchMessages() {
      this.messages = [];
      this.api.get(this.groupUrl)
        .then(res => this.messages = res.data.reverse())
        .then(() => this.scrollToBottom())
    },
    postMessage(message) {
      this.api.post(this.groupUrl, { message })
        .then(res => {
          this.messages.push(res.data.message)
          this.scrollToBottom()
        });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const elem = this.$el.querySelector('.message-list')
        elem.scrollTop = elem.scrollHeight
      });
    },
  },
  watch: {
    id() {
      this.initialize()
    }
  },
  components: {
    Message,
    InputBox
  }
}
</script>
