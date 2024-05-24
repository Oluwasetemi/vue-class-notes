<script setup>
import { computed, ref } from "vue";

const firstName = ref("");
const lastName = ref("");

const fullName = computed(() => {
  return firstName.value + " " + lastName.value;
});
</script>

<template>
  <div>
    <form>
      <div class="name">
        <label for="firstName">First Name:</label>
        <input v-model="firstName" placeholder="Enter your first name" />
        <label for="firstName">Last Name:</label>
        <input v-model="lastName" placeholder="Enter your last name" />
      </div>

      <p>Full Name: {{ fullName }}</p>
    </form>
  </div>
</template>

<style scoped>
.name {
  display: flex;
}
p {
  color: darkblue;
}
input {
  color: gray;
}
</style>
