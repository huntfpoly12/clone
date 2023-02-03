<template>
    <a-spin :spinning="loading">
        <production-statuses :typeTag="2" v-if="checkStatus(0)" padding="1px 10px" />
        <production-statuses :typeTag="3" v-if="checkStatus(1)" padding="1px 10px" />
        <production-statuses :typeTag="4" v-if="checkStatus(2)" padding="1px 10px" />
        <production-statuses :typeTag="5" v-if="checkStatus(-1)" padding="1px 10px" />
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import queries from "@/graphql/queries/BF/BF6/BF640/index";
import { useQuery } from "@vue/apollo-composable";

export default defineComponent({
    props: {
        data: Object,
    },
    setup(props, { emit }) {
        let arrStatus = ref([])
        let dataSearch = ref({
            input: {
                companyId: props.data?.companyId,
                paymentYear: props.data?.paymentYear,
                paymentHalfYear: props.data?.paymentHalfYear,
            }
        })

        let {
            onResult, loading
        } = useQuery(queries.getElectronicFilingsByIncomeWageSimplifiedPaymentStatement, dataSearch, () => ({
            fetchPolicy: "no-cache"
        }));
        onResult((res: any) => {
            arrStatus.value = res.data.getElectronicFilingsByIncomeWageSimplifiedPaymentStatement
        })

        const checkStatus = (status: any) => {
            if (arrStatus.value.filter((val: any) => val.productionStatus == status).length != 0)
                return true
            else
                return false
        }
        return {
            arrStatus, checkStatus, loading
        }
    }
})
</script>