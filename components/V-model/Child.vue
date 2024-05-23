<script setup>
const model = defineModel()
const autofocus = true;
</script>

<template>
  <span>My input</span> <input :autofocus v-model="model"><br />
  <b>Please refresh the page</b>
</template>