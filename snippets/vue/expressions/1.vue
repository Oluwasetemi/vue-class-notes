<!-- #region snippet -->
<!-- Inside ./snippets/vue/expressions/1.vue -->
<script setup>
const message = 'Hello, Vue 3! ';
const count = 0;

// format date
function formatDate(date) {
  return date.toISOString();
}

</script>

<template>
  <h1>{{ message + 'AltSchool' }}</h1>
  <h3>{{ message.toUpperCase() }}</h3>
  <!-- we are allowed to do any JavaScript Expression -->
  <h2>{{message.repeat(3)}}</h2>
  <h2>{{message + 'AltSchool'.toUpperCase()}}</h2>
  <div>Cart: {{ count > 1 ? 'items' : 'item' }}</div>
  <!-- we are allowed to use function -->
  <div>Current time: {{ formatDate(new Date()) }}</div>
</template>
<!-- #endregion snippet -->