<template>
    <a-checkbox v-model:checked="result.isUserRegistableUsername">로그인아이디가 등록가능한지 여부를 반환한다</a-checkbox>
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
  