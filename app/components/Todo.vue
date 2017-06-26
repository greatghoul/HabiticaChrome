<template lang="html">
  <div class="task" :class="{ completed: task.completed }">
    <input type="checkbox" class="check" :checked="task.completed" />
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
    }
  }
}
</script>
