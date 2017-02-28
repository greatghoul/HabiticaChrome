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
import Message from './Message.vue';
import InputBox from './InputBox.vue';
import storage from 'chrome-storage-wrapper';

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
      auth: null
    };
  },
  computed: {
    description() {
      return STATE_MAPPING[this.state];
    }
  },
  created() {
    storage.get('auth').then((options) => {
      if (options.auth) {
        this.auth = options.auth;
        this.fetchMessages();
      } else {
        this.state = 'unauthed';
      }
    });
  },
  methods: {
    fetchMessages() {
      const url = 'https://habitica.com/api/v3/groups/party/chat';
      fetch(url, { headers: this.auth })
        .then(response => response.json())
        .then(json => this.messages = json.data.reverse())
        .then(() => this.state = 'authed')
        .then(() => this.scrollToBottom())
        .catch(() => {
          this.state = 'unauthed';
          storage.remove('auth');
        });  
    },
    postMessage(message) {
      const url = 'https://habitica.com/api/v3/groups/party/chat'

      // const formData = new FormData();
      // formData.append('message', message);
      const reqInit = {
        headers: Object.assign({}, this.auth, {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        method: 'POST',
        body: JSON.stringify({ message })
      };
      fetch(url, reqInit)
        .then(response => response.json())
        .then(json => {
          this.messages.push(json.data.message);
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
      const url = 'https://habitica.com/#/options/settings/api'
      chrome.tabs.create({ url: url, active: false }, (tab) => {
        const script = {
          code: 'localStorage.getItem("habit-mobile-settings");',
          runAt: 'document_end'
        };
        chrome.tabs.executeScript(tab.id, script, results => {
          if (results && results[0]) {
            chrome.tabs.remove(tab.id);
            const json = JSON.parse(results[0]);
            storage.set('auth', {
              'x-api-user': json.auth.apiId,
              'x-api-key': json.auth.apiToken
            });
            this.state = 'authed';
            this.fetchMessages();
          } else {
            this.state = 'failed';
          }
        });
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