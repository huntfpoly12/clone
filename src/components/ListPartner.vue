<template>
    <label class="lable-item">매니저명 :</label>
    <a-select ref="select" v-model:value="partner" placeholder="전체">
        <a-select-option v-for="item in result?.findParters" :key="item.id" :value="item.id">{{item.name}}
        </a-select-option>
    </a-select>
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
