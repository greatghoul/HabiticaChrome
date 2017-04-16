<template lang="html">
  <div class="task">
    <input type="checkbox" />
    {{ task.text }}
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
