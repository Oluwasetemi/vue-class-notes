<template>
    <div>
      <button @click="emitEvent">Emit Event</button>
      <p>Last Event: {{ lastEvent }}</p>
    </div>
</template>
  
<script>
    import Vue from 'vue';
    export const savedEventBus = new Vue();
    
    export default {
        name: 'EventBusComponent',
        data() {
        return {
            lastEvent: ''
        };
        },
        created() {
        savedEventBus.$on('update', (message) => {
            this.lastEvent = message;
        });
        },
        methods: {
        emitEvent() {
            savedEventBus.$emit('update', 'Event emitted at ' + new Date().toLocaleTimeString());
        }
        },
        beforeDestroy() {
        savedEventBus.$off('update');
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
        cursor: pointer;
        margin-right: 10px;
    }
    
    p {
        font-size: 16px;
        color: #333;
    }
</style>
  