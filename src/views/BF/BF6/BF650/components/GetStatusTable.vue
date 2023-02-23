<template>
    <a-spin :spinning="loading">
        <div @click="checkStatus(2) ? actionPopupProductionStatus() : ''">
            <production-status :typeTag="2" v-if="checkStatus(0)" padding="1px 10px" />
            <production-status :typeTag="3" v-if="checkStatus(1)" padding="1px 10px" />

            <a-tooltip placement="top" color="black" v-if="checkStatus(2)">
                <template #title>전자신고파일 다운로드</template>
                <span><production-status :typeTag="4" padding="1px 10px" /></span>
            </a-tooltip>
            <a-tooltip placement="top" color="black" v-if="checkStatus(-1)">
                <template #title>{{ arrStatus[0].causeOfProductionFailure }}</template>
                <span><production-status :typeTag="5" padding="1px 10px" /></span>
            </a-tooltip>
        </div>
    </a-spin>
    <PopupProductionStatus :modalStatus="modalConfirmProductionStatus" @closePopup="modalConfirmProductionStatus = false"
        :data="arrStatus[0]" />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import queries from "@/graphql/queries/BF/BF6/BF650/index";
import { useQuery } from "@vue/apollo-composable";
import PopupProductionStatus from "./PopupProductionStatus.vue"
import notification from "@/utils/notification";
export default defineComponent({
    components: {
        PopupProductionStatus
    },
    props: {
        data: Object,
    },
    setup(props, { emit }) {
        let modalConfirmProductionStatus = ref(false)
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
            if (data.length) {
                arrStatus.value = data
                emit('productionStatusData', data[0]);
            }
        })
        onError((res: any)=> {notification('error', res.message)})
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