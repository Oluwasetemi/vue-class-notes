<!-- #region snippet -->
<!-- Inside ./snippets/vue/directives/1.vue -->
<template>
  <span v-text="msg"></span> <span>{{msg}}</span>
  <div v-html="html"></div>
  <h1 v-show="ok">Hello!</h1> <!-- display: none -->
  <div v-if="type === 'A'"> <!-- can be used on template -->
  A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  <div v-for="item in items">
    {{ item.text }}
  </div>
</template>
<!-- #endregion snippet -->