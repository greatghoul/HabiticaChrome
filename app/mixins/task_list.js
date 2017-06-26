import api from '../scripts/api'

export default {
  props: ['id'],
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    createTask(text) {
      api().post('/tasks/user', { text, type: this.list.type })
        .then(res => this.tasks.unshift(res.data))
        .then(() => this.scrollToBottom())
    },
    removeTask(task) {
      const always = () => {
        const index = _.findIndex(this.tasks, { id: task.id })
        this.tasks.splice(index, 1)
      }
      api().del(`/tasks/${task.id}`)
        .then(always, always)
        .then(() => this.scrollToBottom())
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const elem = this.$el.querySelector('.task-list')
        elem.scrollTop = elem.scrollHeight
      })
    }
  }
}