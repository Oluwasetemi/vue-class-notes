<!-- #region snippet -->
<!-- Inside ./snippets/vue/directives/1.vue -->
<template>
  <span v-text="msg"></span> <span>{{msg}}</span>
  <div v-html="html"></div><!--If it is user provided data, properly sanitize your HTML to prevent cross site scripting(XSS)-->

  <!--conditional rendering(v-show, v-if, v-else, v-else-if)-->
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

  <!--List rendering(v-for)-->
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  <div v-for="item in items">
    {{ item.text }}
  </div>
  <div v-for ="item in items" :key="item.id"> <!--Key is a unique identifier-->
    {{item}}
  </div>
</template>
<!-- #endregion snippet -->