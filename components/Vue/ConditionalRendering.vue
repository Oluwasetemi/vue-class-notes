<script setup>
import { ref } from "vue";
const showText = ref(false);
</script>

<template>
  <div>
    <!-- this code sample explains v-if  -->
    <h3>V-if</h3>
    <button @click="showText = !showText">V3 students, click me</button>
    <p v-if="showText">
      This text appears and disappears! Initially, the paragraph is hidden
      because showText is false. Clicking the button flips the value of showText
      to true. This triggers a re-render, and the paragraph becomes visible.
      Clicking the button again flips showText back to false, hiding the
      paragraph.
    </p>
  </div>
</template>
<style>
button {
  padding: 1rem 2rem;
  color: white;
  background-color: rgb(53, 53, 121);
}
</style>
