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
    setTimeout(this.initialize, 100)
  },
  methods: {
    initialize() {
      this.fetchAuth().then(() => this.fetchUser())
    },
    fetchUser() {
      if ('user' in localStorage) {
        this.success(JSON.parse(localStorage['user']))
      } else {
        api().getUserWithGroups()
          .then(results => {
            const user = Object.assign({}, results[0].data, { groups: results[1].data })
            localStorage['user'] = JSON.stringify(user)
            this.success(user)
          })
          .catch(this.failure)
      }
    },
    fetchAuth() {
      if ('auth' in localStorage) {
        return Promise.resolve(localStorage['auth'])
      } else {
        return new Promise((resolve, reject) => {
          const url = 'https://habitica.com/favicon.ico'
          chrome.tabs.create({ url, active: false }, (tab) => {
            this.findPageAuth(tab, results => {
              chrome.tabs.remove(tab.id)
              try {
                const auth = this.parseAuthResult(results[0])
                localStorage['auth'] = JSON.stringify(auth)
                resolve(auth)
              } catch(e) {
                reject(e)
              }
            })
          })
        })  
      }
    },
    findPageAuth(tab, callback) {
      chrome.tabs.executeScript(tab.id, {
        code: 'localStorage.getItem("habit-mobile-settings")',
        runAt: 'document_end'
      }, callback)
    },
    parseAuthResult(result) {
      const auth = result ? JSON.parse(result).auth : {}
      if (auth.apiId && auth.apiToken) {
        return { id: auth.apiId, apiToken: auth.apiToken }
      } else {
        throw "Can't get authorized"
      }
    },
    success(user) {
      this.message = 'Authorized'
      this.$emit('ready', user)
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
