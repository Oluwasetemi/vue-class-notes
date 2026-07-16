<template>
    <div>
      <button @click="increaseCount">Increase Count</button>
      <p>Current Count: {{ savedStateUsingReactive.count }}</p>
    </div>
</template>
  
<script>
    import { reactive } from 'vue';
    
    export default {
        name: 'ReactiveStateComponent',
        setup() {
        const savedStateUsingReactive = reactive({ count: 0 });
    
        function increaseCount() {
            savedStateUsingReactive.count++;
        }
    
        return { savedStateUsingReactive, increaseCount };
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