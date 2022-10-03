<template>
    <a-checkbox v-model:checked="result.isUserRegistableUsername">Checkbox</a-checkbox>
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import queries from "../graphql/queries/common/index";
    import { useQuery } from "@vue/apollo-composable";
  export default defineComponent({
    setup() {
        const { result, loading, error, onResult, refetch } = useQuery(queries.isUserRegistable);
        return {
            result
        }
    },
   
  })
  </script>
  