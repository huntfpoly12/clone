<template>
     <a-select v-if="result?.findSalesRepresentatives?.length > 0" ref="select" v-model:value="sale" placeholder="전체">
        <a-select-option v-for="item in result.findSalesRepresentatives" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
    </a-select>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import queries from "../graphql/queries/common/index";
import { useQuery } from "@vue/apollo-composable";
export default defineComponent({
    setup() {
        const sale = ref('')
        const { result, loading, error, onResult, refetch } = useQuery(queries.getListSale);
        return {
            result,
            sale
        }
    },
})
</script>
