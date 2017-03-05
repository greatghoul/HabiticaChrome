<template>
  <div id="app">
    <loader v-if="!ready" @ready="initialize"></loader>

    <div class="app" v-else>
      <sidebar :user="user"></sidebar>
      <section class="content">
        <div class="message-list">
        <message
            v-for="message in messages"
            :key="message.id"
            :message="message" />
        </div>

        <input-box v-on:submit="postMessage"></input-box>  
      </section>
    </div>
  </div>
</template>

<script>
import storage from 'chrome-storage-wrapper';
import Habitica from '../scripts/habitica-client';
import Loader from './Loader.vue';
import Message from './Message.vue';
import InputBox from './InputBox.vue';
import Sidebar from './Sidebar.vue';

export default {
  data() {
    return {
      messages: [],
      ready: false,
      api: null,
      user: null
    };
  },
  computed: {
  },
  methods: {
    initialize(auth, user) {
      this.api = new Habitica(auth);
      this.user = user;
      this.ready = true;
    },
    fetchMessages() {
      this.api.get('/groups/party/chat')
        .then(res => this.messages = res.data.reverse())
        .then(() => this.scrollToBottom())
    },
    postMessage(message) {
      this.api.post('/groups/party/chat', { message })
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
    initApi(auth) {
    }
  },
  components: {
    Loader,
  	Sidebar,
    Message,
    InputBox
  }
}
</script>
