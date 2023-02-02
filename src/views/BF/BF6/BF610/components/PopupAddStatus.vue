<template>
    <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="소득별 마감현황" okText="저장하고 나가기"
        cancelText="그냥 나가기" @cancel="setModalVisible" width="992px">
        <a-spin :spinning="loadingTable || loadingChangeStatus" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                key-expr="companyId" class="wf-100" :column-auto-width="true">
                <DxScrolling mode="standard" show-scrollbar="always" />
                <DxColumn caption="귀속연월" cell-template="imputedYear" />
                <template #imputedYear="{ data }">
                    <span class="tag-custom-1">
                        {{ data.data.imputedYear + "-" + data.data.imputedMonth }}
                    </span>
                </template>
                <DxColumn caption="지급연월" cell-template="payment" />
                <template #payment="{ data }">
                    <span class="tag-custom-2">
                        {{ data.data.paymentYear + "-" + data.data.paymentMonth }}
                    </span>
                </template>
                <DxColumn caption="소득종류" data-field="type" data-type="string" />
                <DxColumn caption="총지급액" data-field="totalPayment" />
                <DxColumn caption="인원" cell-template="인원" />
                <DxColumn caption="마감현황" cell-template="status" />
                <template #status="{ data }"> 
                    <process-status-tooltip v-model:valueStatus="data.data.status" style="width: 100px;"
                        :dataRow="data.data" @dataRow="changeStatus" />
                </template>
                <DxColumn caption="마감일" cell-template="마감일" />
            </DxDataGrid>
        </a-spin>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling } from "devextreme-vue/data-grid";
import queries from "@/graphql/queries/BF/BF6/BF610/index";
import mutations from "@/graphql/mutations/BF/BF6/BF610/index";
import notification from "@/utils/notification"
export default defineComponent({
    components: {
        DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling
    },
    props: {
        modalStatus: Boolean,
        dataCall: {
            type: Object,
        },
    },
    setup(props, { emit }) {
        let trigger = ref(false)
        const dataSource = ref()
        let dataSearch = ref()
        /*
        * ============== API ============== 
        */
        //  QUERY : getIncomProcessesInTaxWithholdingStatusReport
        let {
            refetch: refetchTable,
            loading: loadingTable,
            onError: errorTable,
            onResult: resTable
        } = useQuery(queries.getIncomProcessesInTaxWithholdingStatusReport, dataSearch, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache"
        }));
        resTable(res => {
            dataSource.value = res.data.getIncomProcessesInTaxWithholdingStatusReport
        })
        errorTable(res => {
            notification('error', res.message)
        })
        //  Mutation : changeIncomeProcessStatus
        const {
            mutate: actionChangeStatus,
            loading: loadingChangeStatus,
            onDone: doneChangeStatus,
            onError: errChangeStatus
        } = useMutation(mutations.changeIncomeProcessStatus);
        doneChangeStatus(() => {
            notification('success', `업부상태 변경되었습니다!`)
        })
        errChangeStatus((error) => {
            notification('error', error.message)
        })
        /*
         * ============== WATCHING ============== 
         */
        watch(() => props.modalStatus, (newVal: any) => {
            if (newVal == true) {
                trigger.value = true
                dataSearch.value = {
                    "companyId": props.dataCall?.companyId,
                    "reportId": props.dataCall?.reportId,
                    "imputedYear": props.dataCall?.imputedYear
                }
                if (dataSearch.value)
                    refetchTable()
            }
        }, { deep: true })
        /*
         * ============== FUNCTION ============== 
         */
        const changeStatus = (data: any) => {
            let dataChangeStatus = {
                "companyId": data.companyId,
                "type": data.type,
                "processKey": {
                    imputedMonth: data.imputedMonth,
                    imputedYear: data.imputedYear,
                    paymentMonth: data.paymentMonth,
                    paymentYear: data.paymentYear,
                },
                "status": data.status
            }
            actionChangeStatus(dataChangeStatus)
        }
        const setModalVisible = () => {
            emit("closePopup", true)
        }
        return {
            dataSource, loadingTable, loadingChangeStatus,
            setModalVisible, changeStatus,
        }
    }
})
</script>
<style  scoped lang="scss">
.tag-custom-2 {
    background-color: black;
    padding: 4px 20px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}

.tag-custom-1 {
    background-color: gray;
    padding: 4px 20px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}
</style>
