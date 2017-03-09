<template>
  <div id="app">
    <loader v-if="!ready" @ready="initialize"></loader>

    <div class="app" v-else>
      <sidebar :user="user"></sidebar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import storage from 'chrome-storage-wrapper';
import Habitica from '../scripts/habitica-client';
import Loader from './Loader.vue';
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
    postMessage(message) {
      this.api.post('/groups/party/chat', { message })
        .then(res => {
          this.messages.push(res.data.message);
          this.scrollToBottom();
        });
    },
    initApi(auth) {
    }
  },
  components: {
    Loader,
  	Sidebar,
  }
}
</script>
