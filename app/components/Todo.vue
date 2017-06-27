<template lang="html">
  <div class="task" :class="{ completed: task.completed }">
    <input type="checkbox" class="check" v-model="task.completed" @change="toggle" />
    <div class="title" v-html="marked(task.text)"></div>
    <div class="actions">
      <button title="Remove" @click="remove"><i class="fa fa-times"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    remove() {
      this.$emit('remove', this.task)
    },
    toggle() {
      if (this.task.completed) {
        this.$emit('score', this.task, 'up')
      } else {
        this.$emit('score', this.task, 'down')
      }
    }
  }
}
</script>
