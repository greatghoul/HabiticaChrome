<template>
  <div class="input-box">
    <textarea placeholder="Type message to chat..." rows="1"></textarea>
  </div>
</template>

<script>
  
</script>

<style>
.input-box {
  background-color: #cccccc;
  margin-top: 3px;
}

.input-box textarea {
  width: calc(100% - 12px);
  padding: 3px;
  margin: 3px 3px 1px 3px;
  border: none;
  resize: none;
}

.input-box textarea:focus {
  outline-offset: 0;
  outline: 0;
}
</style>