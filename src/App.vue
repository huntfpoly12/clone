<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { provide } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { client } from "./ApolloClient";
export default {
  name: "App",
   data() {
    return {
      layout: `div`,
    };
  },
  setup() {
    provide(DefaultApolloClient, client);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
}
</style>
