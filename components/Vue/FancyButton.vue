<template>
  <button class="fancy-button">
    <slot name="icon"></slot>
    <slot></slot>
    <slot>Default Click Me</slot>
  </button>
</template>

<style>
  .fancy-button {
    color: white;
    background-color: #f01d71;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 1.2em;
  }
</style>