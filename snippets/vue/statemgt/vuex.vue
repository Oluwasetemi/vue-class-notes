<template>
    <div>
      <button @click="addItem">Add Item</button>
      <button @click="removeItem">Remove Item</button>
      <p>Item Count: {{ itemCount }}</p>
    </div>
</template>
  
<script>
    import Vuex from 'vuex';
    import { createApp } from 'vue';
    
    const store = new Vuex.Store({
        state: {
        itemCount: 0
        },
        mutations: {
        addItem(state) {
            state.itemCount++;
        },
        removeItem(state) {
            if (state.itemCount > 0) {
            state.itemCount--;
            }
        }
        }
    });
  
    export default {
        name: 'VuexComponent',
        computed: {
        itemCount() {
            return this.$store.state.itemCount;
        }
        },
        methods: {
        addItem() {
            this.$store.commit('addItem');
        },
        removeItem() {
            this.$store.commit('removeItem');
        }
        }
    };
    
    createApp({}).use(store).mount('#app');
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