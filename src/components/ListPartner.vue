<template>
    <label class="lable-item">매니저명 :</label>
    <a-select ref="select" v-model:value="partner" placeholder="전체" @change="updatePartner(partner)">
        <a-select-option v-for="item in result?.findParters" :key="item.id" :value="item.id">{{item.name}}
        </a-select-option>
    </a-select>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import queries from "../graphql/queries/common/index";
import { useQuery } from "@vue/apollo-composable";
export default defineComponent({
    props: {
        selected: {
            type: Number,
            default: null,
            required: true
        }
    },
    setup(props , {emit}) {
        const partner = ref(0)
        const { result, loading, error, onResult, refetch } = useQuery(queries.getListPartner);
        const updatePartner = (value: any) => {
            emit('update:selected', value)
        }
        return {
            result,
            partner,
            updatePartner
        }
    },
})
</script>
