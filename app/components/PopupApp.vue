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
import api from '../scripts/api'
import Loader from './Loader.vue'
import Sidebar from './Sidebar.vue'

export default {
  data() {
    return {
      messages: [],
      ready: false,
      user: null
    }
  },
  methods: {
    initialize(user) {
      this.user = user
      this.ready = true
      this.gotoPartyView()
    },
    postMessage(message) {
      api().post('/groups/party/chat', { message })
        .then(res => {
          this.messages.push(res.data.message)
          this.scrollToBottom()
        })
    },
    gotoPartyView() {
      if (this.user.party && this.user.party._id) {
        this.$router.push({ path: `/group/${this.user.party._id}` })
      }
    }
  },
  components: {
    Loader,
  	Sidebar,
  }
}
</script>
