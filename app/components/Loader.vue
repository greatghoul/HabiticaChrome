<template>
  <div class="loader">
    <p class="message" :class="{ failed }">{{ message }}</p>
    <p class="hint" v-if="hint">
      <small v-html="hint"></small>
    </p>
  </div>
</template>

<script>
import api from '../scripts/api'

export default {
  data() {
    return {
      message: 'Authorizing',
      hint: null,
      failed: false,
      auth: null
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      if ('auth' in localStorage) {
        this.fetchUser()
      } else {
        this.fetchAuth()
      }
    },
    fetchUser() {
      api().getUserWithGroups().then(this.success, this.failure)
    },
    fetchAuth() {
      const url = 'https://habitica.com/favicon.ico'
      chrome.tabs.create({ url, active: false }, this.inject)
    },
    inject(tab) {
      chrome.tabs.executeScript(tab.id, {
        code: 'localStorage.getItem("habit-mobile-settings")',
        runAt: 'document_end'
      }, (results) => {
        chrome.tabs.remove(tab.id)
        this.parse(results && results[0])
      })
    },
    parse(result) {
      const auth = result ? JSON.parse(result).auth : {}
      if (auth.apiId && auth.apiToken) {
        localStorage.setItem('auth', JSON.stringify({ id: auth.apiId, apiToken: auth.apiToken }))
        this.fetchUser()
      } else {
        this.failure()
      }
    },
    success(results) {
      this.message = 'Authorized'
      const user = results[0].data
      const groups = results[1].data
      this.$emit('ready', Object.assign(user, { groups }))
    },
    failure(error) {
      this.failed = true
      this.message = "Can't get authorized"
      this.hint = 'Please make sure you have logged into '
                  '<a href="https://habitica.com/" target="_blank">habitica.com</a>'
      error && console.error(error)
    }
  }
}
</script>
