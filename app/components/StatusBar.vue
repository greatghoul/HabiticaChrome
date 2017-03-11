<template>
  <div class="status-bar" v-tooltip="title">
    <div class="progress" :style="style"></div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: ['label', 'color', 'value', 'max'],
  computed: {
    width() {
      const percent = _.round(this.value / this.max * 100, 1);
      return `${percent}%`;
    },
    style() {
      return `width: ${this.width}; background-color: ${this.color}`;
    },
    title() {
      return `${this.label}: ${_.round(this.value)} / ${this.max}`;
    }
  }
}
</script>
