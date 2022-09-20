<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { provide } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { client } from "./ApolloClient.d";
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
.page-content {
  padding: 24px;
}
.dx-select-checkbox {
    display: inline-block !important;
}
.search-form .col {
  display: flex;
  align-items: center;
}
body {
  margin: 0;
  padding: 0;
}
</style>
