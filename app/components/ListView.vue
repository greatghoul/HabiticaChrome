<template>
  <div class="view list-view">
    <input-box
      :name="id"
      @submit="createTask"
      ref="inputBox"
      placeholder="Type todos here ..." />

    <div class="list task-list">
      <task
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @remove="removeTask" />
    </div>
  </div>
</template>

<script>
import Task from './Task.vue'
import InputBox from './InputBox.vue'
import { LISTS } from '../scripts/consts'

export default {
  props: ['id'],
  data() {
    return {
      tasks: []
    }
  },
  created() {
    this.initialize()
  },
  computed: {
    api() {
      return this.$parent.api
    },
    list() {
      return _.find(LISTS, { id: this.id })
    }
  },
  methods: {
    initialize() {
      this.fetchTasks()
      this.$nextTick(() => this.$refs.inputBox.initialize())
    },
    fetchTasks() {
      this.tasks = []
      this.api.get('/tasks/user', { type: this.id })
        .then(res => this.tasks = res.data)
        .then(() => this.scrollToBottom())
    },
    createTask(text) {
      this.api.post('/tasks/user', { text, type: this.list.type })
        .then(res => this.tasks.unshift(res.data))
        .then(() => this.scrollToBottom())
    },
    removeTask(task) {
      const always = () => {
        const index = _.findIndex(this.tasks, { id: task.id })
        this.tasks.splice(index, 1)
      }
      this.api.del(`/tasks/${task.id}`)
        .then(always, always)
        .then(() => this.scrollToBottom())
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const elem = this.$el.querySelector('.task-list')
        elem.scrollTop = elem.scrollHeight
      })
    },
  },
  watch: {
    id() {
      this.initialize()
    }
  },
  components: {
    Task,
    InputBox
  }
}
</script>
