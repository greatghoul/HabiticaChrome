<template>
  <div class="view task-view">
    <input-box
      :name="type"
      ref="inputBox"
      placeholder="Type todos here ..." />

    <div class="list task-list">
      <task
          v-for="task in tasks"
          :key="task.id"
          :task="task" />
    </div>
  </div>
</template>

<script>
import Task from './Task.vue'
import InputBox from './InputBox.vue'

export default {
  props: ['type'],
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
    }
  },
  methods: {
    initialize() {
      this.fetchTasks()
      this.$nextTick(() => this.$refs.inputBox.initialize())
    },
    fetchTasks() {
      this.tasks = []
      this.api.get('/tasks/user', { type: this.type })
        .then(res => this.tasks = res.data)
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
    type() {
      this.initialize()
    }
  },
  components: {
    Task,
    InputBox
  }
}
</script>
