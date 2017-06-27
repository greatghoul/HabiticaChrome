<template>
  <div class="view list-view">
    <input-box :name="id" @submit="createTask" ref="inputBox" placeholder="Type todos here ..." />

    <div class="list task-list">
      <todo v-for="task in tasks" :key="task.id" :task="task" @remove="removeTask" @score="scoreTask" />
    </div>
  </div>
</template>

<script>
import api from '../scripts/api'
import Todo from './Todo.vue'
import InputBox from './InputBox.vue'
import task_list from '../mixins/task_list'

export default {
  mixins: [task_list],
  data() {
    return {
      tasks: []
    }
  },
  created() {
    api().getUserTasks('todos').then(data => this.tasks = data)
  },
  methods: {
    scoreTask(task, direction) {
      console.log(task, direction)
      api().post(`/tasks/${task.id}/score/${direction}`)
        .catch(() => task.completed = !task.completed)
    }
  },
  components: {
    Todo,
    InputBox
  }
}
</script>
