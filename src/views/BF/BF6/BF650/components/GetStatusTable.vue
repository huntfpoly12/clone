<template>
    <a-spin :spinning="loading">
      <production-status :typeTag="2" v-if="checkStatus(0)" padding="1px 10px" />
      <production-status :typeTag="3" v-if="checkStatus(1)" padding="1px 10px" />
      <production-status :typeTag="4" v-if="checkStatus(2)" padding="1px 10px" :message="'전자신고파일 다운로드'"/>
      <production-status :typeTag="5" v-if="checkStatus(-1)" padding="1px 10px" :message="arrStatus[0].causeOfProductionFailure"/>
    </a-spin>
</template>
<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import queries from "@/graphql/queries/BF/BF6/BF650/index";
import {useQuery} from "@vue/apollo-composable";
import PopupProductionStatus from "./PopupProductionStatus.vue"

export default defineComponent({
    components: {
        PopupProductionStatus
    },
    props: {
        data: Object,
    },
    setup(props, { emit }) {
        let arrStatus: any = ref([])
        const trigger = ref(false);
        let dataSearch = ref({
            input: {
                companyId: props.data?.companyId,
                paymentYear: props.data?.paymentYear,
                paymentMonth: props.data?.paymentMonth,
            }
        })
        watch(() => props.data, (newVal) => {
            if (newVal) {
                trigger.value = true;
            }
        }, { immediate: true })
        let {
            onResult, loading, onError,
        } = useQuery(queries.getElectronicFilingsByIncomeWageDailyPaymentStatement, dataSearch, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache"
        }));
        onResult((res: any) => {
            trigger.value = false;
            let data = res.data.getElectronicFilingsByIncomeWageDailyPaymentStatement
            arrStatus.value = Array(data.slice(-1).pop());

        })
        onError((res: any)=> {
          // notification('error', res.message)
        })
        const checkStatus = (status: any) => {
            return arrStatus.value.filter((val: any) => val.productionStatus == status).length != 0;
        }
        return {
            arrStatus, checkStatus, loading
        }
    }
})
</script>
