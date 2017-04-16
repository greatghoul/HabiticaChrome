<template>
  <div class="loader">
    <p class="message" :class="{ failed }">{{ message }}</p>
    <p class="hint" v-if="hint">
      <small v-html="hint"></small>
    </p>
  </div>
</template>

<script>
import storage from 'chrome-storage-wrapper'
import Habitica from '../scripts/habitica-client'
import { LISTS } from '../scripts/consts'

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
      storage.get('auth').then((options) => {
        if (options.auth) {
          this.auth = options.auth
          this.fetchUser()
        } else {
          this.fetchAuth()
        }
      })
    },
    fetchUser() {
      const api = new Habitica(this.auth)
      api.getUserWithGroups().then(this.success, this.failure)
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
        this.auth = {
          id: auth.apiId,
          apiToken: auth.apiToken,
          platform: 'HabiticaChrome'
        }

        storage.set('auth', Object.assign({}, this.auth))
        this.fetchUser()
      } else {
        this.failure()
      }
    },
    success(results) {
      this.message = 'Authorized'
      const user = results[0].data
      const groups = results[1].data
      this.$emit('ready', this.auth, Object.assign(user, { groups }))
    },
    failure(error) {
      this.failed = true
      this.message = "Can't get authorized"
      this.hint = `Please make sure you have logged into
                   <a href="https://habitica.com/"
                      target="_blank">habitica.com</a>`
      error && console.error(error)
    }
  }
}
</script>
