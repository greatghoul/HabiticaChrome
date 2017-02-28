<template>
  <div id="app">
    <section v-if="auth">
      <div class="message-list">
      <message
          v-for="message in messages"
          :key="message.id"
          :message="message" />
      </div>

      <input-box></input-box>  
    </section>
    <section v-else>
      <div class="auth">
        <p>Not authorized</p>
        <button>Authorize</button>
      </div>
    </section>
  </div>
</template>

<script>
import Message from './Message.vue';
import InputBox from './InputBox.vue';
import storage from 'chrome-storage-wrapper';

export default {
  data() {
    return {
      messages: [],
      auth: true
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      const url = 'https://habitica.com/api/v3/groups/party/chat';
      storage.get('auth').then((options) => {
        fetch(url, { headers: options.auth })
          .then(response => response.json())
          .then(json => this.messages = json.data.reverse().slice(0, 10))
          .then(() => this.auth = true)
          .then(() => this.scrollToBottom())
          .catch(() => this.auth = false);
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const elem = this.$el.querySelector('.message-list');
        console.log(elem);
        elem.scrollTop = elem.scrollHeight;
      });
    }
  },
  components: {
    Message,
    InputBox
  }
};
</script>

<style>
.message-list {
  max-height: 300px;
  overflow: auto;
}
.auth {
  font-size: 16px;
  color: #888;
  text-align: center;
  padding-bottom: 20px;
  background-color: #eee;
}

.auth p {
  margin-top: 0px;
  padding-top: 20px;
  margin-bottom: 10px;
}
</style>