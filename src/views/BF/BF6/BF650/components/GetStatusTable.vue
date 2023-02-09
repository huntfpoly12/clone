<template>
    <a-spin :spinning="loading">
        <div @click="checkStatus(2) ? actionPopupProductionStatus() : ''">
            <production-status :typeTag="2" v-if="checkStatus(0)" padding="1px 10px" />
            <production-status :typeTag="3" v-if="checkStatus(1)" padding="1px 10px" />
            <production-status :typeTag="4" v-if="checkStatus(2)" padding="1px 10px" />
            <production-status :typeTag="5" v-if="checkStatus(-1)" padding="1px 10px" />
        </div>
    </a-spin>
    <PopupProductionStatus :modalStatus="modalConfirmProductionStatus"
        @closePopup="modalConfirmProductionStatus = false" :data="arrStatus[0]" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import queries from "@/graphql/queries/BF/BF6/BF650/index";
import { useQuery } from "@vue/apollo-composable";
import PopupProductionStatus from "./PopupProductionStatus.vue"
export default defineComponent({
    components: {
        PopupProductionStatus
    },
    props: {
        data: Object,
    },
    setup(props, { emit }) {
        let modalConfirmProductionStatus = ref(false)
        let arrStatus = ref([])
        let dataSearch = ref({
            input: {
                companyId: props.data?.companyId,
                paymentYear: props.data?.paymentYear,
                paymentMonth: props.data?.paymentMonth,
            }
        })
        let {
            onResult, loading
        } = useQuery(queries.getElectronicFilingsByIncomeWageDailyPaymentStatement, dataSearch, () => ({
            fetchPolicy: "no-cache"
        }));
        onResult((res: any) => {
            arrStatus.value = res.data.getElectronicFilingsByIncomeWageDailyPaymentStatement
        })
        const checkStatus = (status: any) => {
            if (arrStatus.value.filter((val: any) => val.productionStatus == status).length != 0)
                return true
            else
                return false
        }
        const actionPopupProductionStatus = () => {
            modalConfirmProductionStatus.value = true;

        }
        return {
            arrStatus, checkStatus, loading,
            actionPopupProductionStatus, modalConfirmProductionStatus,
        }
    }
})
</script>