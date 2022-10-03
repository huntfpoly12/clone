<template>
    <template  v-if="result?.findParters?.length > 0">
        <label class="lable-item">파트너 :</label>
        <a-select ref="select" v-model:value="partner" placeholder="전체">
            <a-select-option v-for="item in result.findParters" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
        </a-select>
    </template>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import queries from "../graphql/queries/common/index";
import { useQuery } from "@vue/apollo-composable";
export default defineComponent({
    setup() {
        const partner = ref('')
        const { result, loading, error, onResult, refetch } = useQuery(queries.getListPartner);
        return {
            result,
            partner
        }
    },
})
</script>
