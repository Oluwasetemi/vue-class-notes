<template>
    <div>
      <button @click="incrementCount">Increase Count</button>
      <p>Current Count: {{ savedGlobalState.count }}</p>
    </div>
</template>
  
<script>
    export const savedGlobalState = { count: 0 };

    export default {
        name: 'GlobalStateComponent',
        methods: {
        incrementCount() {
            savedGlobalState.count++;
        }
        },
        data() {
        return {
            savedGlobalState
        };
        }
    };
</script>
  
<style scoped>
    button {
        padding: 10px 20px;
        font-size: 16px;
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