<template>
    <a-modal :visible="modalStatus" width="60%" footer="" @cancel="setModalVisible()" :mask-closable="false">
        <div style="text-align: center; margin-top: 32px">
            <h2>
                여입 대상 지출결의서 검색
            </h2>
            <span>
                이전 원본 지출결의서를 복사하면 정확하고 빠르게 여입결의서 작성이 가능합니다.
            </span>
        </div>
        <a-row class="mt-10">
            <a-col :span="24">
                <div class="top-content">
                    <a-typography-title :level="5" style="margin-bottom: 0;">원본 지출결의서 검색</a-typography-title>
                </div>
            </a-col>
        </a-row>
        <a-row class="mt-10">
            <a-col :span="18">
                <a-form-item class="red" label="대상월">
                    <radio-group :arrayValue="arrayRadioMonth"
                        v-model:valueRadioCheck="dataQuerySearchSpendingAccountingDocuments.month"
                        :layoutCustom="'horizontal'" :required="true" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="결의번호">
                    <default-text-box width="150px"
                        v-model:valueInput="dataQuerySearchSpendingAccountingDocuments.resolutionNumber" />
                </a-form-item>
            </a-col>
        </a-row>
        <div style="margin-top: 10px; display: flex; justify-content: center;">
            <button-basic class="button-form-modal" :text="'검색'" :type="'default'" :mode="'contained'"
                @onClick="onSearch" />
        </div>
        <a-spin tip="Loading..." :spinning="loadingSearchSpendingAccountingDocuments">
            <div style="margin: 48px 0">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                    key-expr="accountingDocumentId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                    v-model:focused-row-key="focusedRowKey" focused-row-enabled="true" :onRowClick="onSelectionChanged"
                    :column-auto-width="true">
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxColumn caption="선택" cell-template="radioCheck" />
                        <template #radioCheck="{ data }">
                            <div class="text-align-center pt-8">
                                <input type="radio" name="radioCheck" :checked="focusedRowKey == data.data.accountingDocumentId ? true : false"/>
                            </div>
                        </template>
                    <DxColumn data-field="resolutionNumber" caption="결의번호" />
                    <DxColumn caption="통장" cell-template="bankbook" data-field="bankbook" />
                    <template #bankbook="{ data }">
                        <a-tooltip placement="top" :title="data.data.bankbook?.type + ' ' + data.data.bankbook?.bankbookNumber">
                            <div>{{ data.data.bankbook?.bankbookNickname }}</div>
                        </a-tooltip>
                    </template>
                    <DxColumn caption="일자" data-field="transactionDetailDate" cell-template="transactionDetailDate" />
                    <template #transactionDetailDate="{ data }">
                        {{ $filters.formatDate(data.value) }}
                    </template>
                    <DxColumn data-field="resolutionClassification" caption="결의 구분" />
                    <DxColumn data-field="income" caption="수입액" />
                    <DxColumn data-field="spending" caption="지출액" format="fixedPoint" />
                    <DxColumn data-field="summaryOfBankbookDetail" caption="통장적요" />
                    <DxColumn data-field="summary" caption="적요" />
                    <DxColumn caption="계정과목" data-field="accountCode" cell-template="accountCode" />
                    <template #accountCode="{ data }">
                        <account-code-select :valueInput="data.data.accountCode" :disabled="true" />
                    </template>
                    <DxColumn caption="상대계정" data-field="relationCode" cell-template="relationCode" />
                    <template #relationCode="{ data }">
                        <account-code-select :valueInput="data.data.relationCode" :disabled="true" />
                    </template>
                    <DxColumn data-field="fundingSource" caption="자금원천" />
                    <DxColumn data-field="clientId" caption="거래처" />

                </DxDataGrid>
            </div>
        </a-spin>
        <div class="btn_submit">
            <button-basic class="button-form-modal" :text="'여입결의서 반영'" :type="'default'" :mode="'contained'"
                @onClick="onSubmit" />
        </div>
    </a-modal>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue";
import { useStore } from 'vuex';
import { DxSelectBox } from "devextreme-vue/select-box";
import queries from "@/graphql/queries/AC/AC1/AC120";
import { useQuery } from "@vue/apollo-composable";
import { companyId, makeDataClean } from "@/helpers/commonFunction"
import { initialArrayRadioMonth } from '../utils'
import notification from '@/utils/notification';
import {
    DxDataGrid,
    DxColumn, DxScrolling,
} from "devextreme-vue/data-grid";

export default defineComponent({
    props: ["modalStatus", "data", "title"],

    components: {
        DxDataGrid,
        DxColumn, DxScrolling,
        DxSelectBox,
    },
    setup(props, { emit }) {
        const arrayRadioMonth = initialArrayRadioMonth
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const globalYear = computed(() => store.state.settings.globalYear)
        const globalFacilityBizId = computed(() => store.state.settings.globalFacilityBizId)
        // let showEmployeeInfo = ref(false);
        const dataSource = ref([]);
        // const search = ref<string>("");
        let dataSelect = ref()
        const triggerQuerySearchSpendingAccountingDocuments = ref<boolean>(false)
        const dataQuerySearchSpendingAccountingDocuments = ref({
            companyId: companyId,
            fiscalYear: globalYear.value,
            facilityBusinessId: globalFacilityBizId.value,
            year: globalYear.value,
            month: 4,
            resolutionNumber: null
        })

        const focusedRowKey = ref<Number>(1);

        // =================== GRAPHQL ===================
        // query searchSpendingAccountingDocuments
        const {
            result: resSearchSpendingAccountingDocuments, loading: loadingSearchSpendingAccountingDocuments, onError: errorSearchSpendingAccountingDocuments
        } = useQuery(queries.searchSpendingAccountingDocuments, dataQuerySearchSpendingAccountingDocuments.value, () => ({
            enabled: triggerQuerySearchSpendingAccountingDocuments.value,
            fetchPolicy: "no-cache",
        }))

        // ================== WATCH ================
        // 1. searchSpendingAccountingDocuments
        watch(resSearchSpendingAccountingDocuments, (value) => {
            triggerQuerySearchSpendingAccountingDocuments.value = false
            console.log(value.searchSpendingAccountingDocuments);
            dataSource.value = value.searchSpendingAccountingDocuments
        })


        // ================ FUNCTION ============================================
        errorSearchSpendingAccountingDocuments(e => {
            dataSource.value = []
            notification('error', e.message)
        })

        const onSearch = () => {
            makeDataClean(dataQuerySearchSpendingAccountingDocuments.value)
            triggerQuerySearchSpendingAccountingDocuments.value = true;
        };



        const setModalVisible = () => {
            emit("closePopup", false);
        };


        const onSubmit = () => {
            if (dataSelect.value) {
                setModalVisible()
            } else {
                notification('error', 'vui lòng chọn data')
            }
            // emit("dataEmit", dataEmit.value);
            
        }
        const onSelectionChanged = (data: any) => {
            dataSelect.value = data.data
        };


        return {
            move_column,
            colomn_resize,
            // search,
            onSearch,
            setModalVisible,
            focusedRowKey,
            onSelectionChanged,
            // showEmployeeInfo,
            dataSource,
            onSubmit,
            loadingSearchSpendingAccountingDocuments,

            arrayRadioMonth,
            dataQuerySearchSpendingAccountingDocuments,
        };
    },
});
</script>
<style scoped>
#components-modal-demo-position {
    position: relative;
}

.btn_submit {
    position: absolute;
    bottom: 0;
    margin-top: 48px;
    margin-bottom: 16px;
    left: 0;
    right: 0;
    text-align: center;
}</style>
