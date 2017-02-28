<template>
  <div id="app">
    <section v-if="state == 'authed'">
      <div class="message-list">
      <message
          v-for="message in messages"
          :key="message.id"
          :message="message" />
      </div>

      <input-box v-on:submit="postMessage"></input-box>  
    </section>
    <section v-else>
      <div class="auth">
        <p>{{ description }}</p>
        <button @click="authorize" v-if="state == 'unauthed'">Authorize</button>
      </div>
    </section>
  </div>
</template>

<script>
import storage from 'chrome-storage-wrapper';
import Habitica from 'habitica';
import Message from './Message.vue';
import InputBox from './InputBox.vue';

const STATE_MAPPING = {
  loading: 'Loading ...',
  unauthed: 'Not authorized',
  authing: 'Authorizing ...',
  authed: '',
  failed: 'Please login habitica first.'
};

export default {
  data() {
    return {
      messages: [],
      state: 'loading',
      api: null
    };
  },
  created() {
    this.initApp();
  },
  computed: {
    description() {
      return STATE_MAPPING[this.state];
    }
  },
  methods: {
    fetchMessages() {
      this.api.get('/groups/party/chat')
        .then(res => this.messages = res.data.reverse())
        .then(() => this.state = 'authed')
        .then(() => this.scrollToBottom())
        .catch(() => {
          this.state = 'unauthed';
          storage.remove('auth');
        });  
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
    authorize() {
      this.state = 'authing';
      const url = 'https://habitica.com/favicon.ico'
      chrome.tabs.create({ url: url, active: false }, (tab) => {
        const script = {
          code: 'localStorage.getItem("habit-mobile-settings");',
          runAt: 'document_end'
        };
        chrome.tabs.executeScript(tab.id, script, results => {
          if (results && results[0]) {
            chrome.tabs.remove(tab.id);
            storage.set('auth', JSON.parse(results[0]).auth)
              .then(() => {
                this.state = 'authed';
                this.initApp();
              });
          } else {
            this.state = 'failed';
          }
        });
      });
    },
    initApi(auth) {
      this.api = new Habitica({
        id: auth.apiId,
        apiToken: auth.apiToken,
        platform: 'HabiticaChrome'
      });
    },
    initApp() {
      storage.get('auth').then((options) => {
        if (options.auth) {
          this.initApi(options.auth);
          this.fetchMessages();
        } else {
          this.state = 'unauthed';
        }
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
  margin-bottom: 0px;
}

.auth button {
  margin-top: 10px;
}
</style>