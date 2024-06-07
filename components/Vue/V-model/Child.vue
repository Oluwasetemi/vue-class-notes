<script setup>
const model = defineModel()
const autofocus = true;
</script>

<template>
  <span>My input</span> <input :autofocus v-model="model"><br />
  <b>  Please make a change in the input notice what happens</b>
</template>

<style scoped>
  input {
    border: solid black;
  }
  html.dark input {
    border: solid white;
  }
</style>