<template>
    <div>
      <button @click="piniaCounterStore.increaseCount">Increase Count</button>
      <button @click="piniaCounterStore.decreaseCount">Decrease Count</button>
      <p>Current Count: {{ piniaCounterStore.count }}</p>
      <p>Status: {{ piniaCounterStore.oddOrEven }}</p>
    </div>
</template>
  
<script>
    import { createPinia, defineStore } from 'pinia';
    import { createApp } from 'vue';
    
    const pinia = createPinia();
    
    const useCounterStore = defineStore('counter', {
        state: () => ({
        count: 0
        }),
        actions: {
        increaseCount() {
            this.count++;
        },
        decreaseCount() {
            this.count--;
        }
        },
        getters: {
        oddOrEven: (state) => {
            return state.count % 2 === 0 ? 'even' : 'odd';
        }
        }
    });
    
    export default {
        name: 'PiniaCounterComponent',
        setup() {
        const piniaCounterStore = useCounterStore();
        return { piniaCounterStore };
        }
    };
</script>
  
<style scoped>
    button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #42b983;
        color: white;
        border: none;
        border-radius: 5px;
        margin-right: 10px;
        cursor: pointer;
    }
    
    p {
        font-size: 16px;
        color: #333;
    }
</style>