<template>
    <div>
      <button @click="increment">Increase Count</button>
      <p>Current Count: {{ savedStateUsingRef }}</p>
    </div>
</template>
  
<script>
    import { ref } from 'vue';

    export default {
        name: 'RefStateComponent',
        setup() {
        const savedStateUsingRef = ref(0);

        function increment() {
            savedStateUsingRef.value++;
        }

        return { savedStateUsingRef, increment };
        }
    };
</script>
  
<style scoped>
    button {
        padding: 10px 15px;
        font-size: 14px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin: 5px;
    }

    p {
        font-size: 16px;
        color: #333;
    }
</style>
  