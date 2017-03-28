<template lang="html">
  <div class="task">
    <input type="checkbox" />
    {{ task.text }}
  </div>
</template>

<script>
export default {
  props: ['task']
}
</script>
