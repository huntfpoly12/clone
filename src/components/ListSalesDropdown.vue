<template>
    <template v-if="result?.findSalesRepresentatives?.length > 0 && textLabel">
        <label class="lable-item">{{textLabel}} :</label>
        <a-select ref="select" v-model:value="sale" placeholder="전체" show-search @change="updateSale(sale)">
            <a-select-option v-for="item in result?.findSalesRepresentatives" :key="item.id" :value="item.id">
                {{item.name}}</a-select-option>
        </a-select>
    </template>
    <template v-if="result?.findSalesRepresentatives?.length > 0 && !textLabel">
         
        <a-select ref="select" v-model:value="sale" placeholder="전체" show-search @change="updateSale(sale)">
            <a-select-option v-for="item in result?.findSalesRepresentatives" :key="item.id" :value="item.id">
                {{item.name}}</a-select-option>
        </a-select>
    </template>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import queries from "../graphql/queries/common/index";
import { useQuery } from "@vue/apollo-composable";
export default defineComponent({
    props: {
        textLabel: String,
        selected: {
            type: Number ,
            default: 0,
            required: true
        }
    },
    setup(props, { emit }) {
        const sale = ref(props.selected);
        const { result, loading, error, onResult, refetch } = useQuery(queries.getListSale);
        const checkAll = () => {
       
        }
        const updateSale = (value: any) => {
            emit('update:selected', value)
        }
        return {
            result,
            checkAll,
            sale,
            updateSale
        }
    },
})
</script>
