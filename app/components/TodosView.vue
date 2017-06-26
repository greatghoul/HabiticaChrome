<template>
  <div class="view list-view">
    <input-box :name="id" @submit="createTask" ref="inputBox" placeholder="Type todos here ..." />

    <div class="list task-list">
      <todo v-for="task in tasks" :key="task.id" :task="task" @remove="removeTask" />
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
  components: {
    Todo,
    InputBox
  }
}
</script>
