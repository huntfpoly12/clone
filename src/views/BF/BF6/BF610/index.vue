<template>
    <action-header @actionSearch="searching" />
    <div id="bf-610">
        <div class="search-form">
            <a-row :gutter="[24, 8]">
                <a-col>
                    <a-form-item label="영업자코드" label-align="left" class="clr mb-0 label-select">
                        <imputed-year-month-select-box :dataSelect="arraySelectBox" width="150px" :required="true"
                            v-model:valueInput="dataSearch.filter.imputedYearMonth" type="1" />
                    </a-form-item>
                    <a-form-item label="지급연월" label-align="left" class="clr mb-0 label-select">
                        <imputed-year-month-select-box :dataSelect="arraySelectBox2" width="150px" :required="true"
                            v-model:valueInput="dataSearch.filter.paymentYearMonth" type="2" />
                    </a-form-item>
                </a-col>
                <a-col>
                    <a-form-item label="신고주기" label-align="left" class="mb-0">
                        <checkbox-basic size="14" label="전체" class="mr-10"
                            v-model:valueCheckbox="reportType.checkbox1" />
                        <checkbox-basic size="14" label="정기" class="mr-10"
                            v-model:valueCheckbox="reportType.checkbox2" />
                        <checkbox-basic size="14" label="반기" v-model:valueCheckbox="reportType.checkbox3" />
                    </a-form-item>
                    <a-form-item label="신고구분" label-align="left" class="mb-0">
                        <checkbox-basic size="14" label="전체" class="mr-10" />
                        <checkbox-basic size="14" label="정기" class="mr-10" />
                        <checkbox-basic size="14" label="수정" class="mr-10" />
                        <checkbox-basic size="14" label="기한후" />
                    </a-form-item>
                </a-col>
                <a-col>
                    <a-form-item label="신고주기" label-align="left" class="mb-0">
                        <div class="mb-10">
                            <checkbox-basic size="14" label="전체" class="mr-10 custom-checkbox1"
                                v-model:valueCheckbox="statuses.checkbox1" />
                            <checkbox-basic size="14" label="전체" class="mr-10 custom-checkbox2"
                                v-model:valueCheckbox="statuses.checkbox2" />
                        </div>
                        <div>
                            <checkbox-basic size="14" label="전체" class="mr-10 custom-checkbox3"
                                v-model:valueCheckbox="statuses.checkbox3" />
                            <checkbox-basic size="14" label="전체" class="mr-10 custom-checkbox4"
                                v-model:valueCheckbox="statuses.checkbox4" />
                        </div>
                    </a-form-item>
                </a-col>
                <a-col>
                    <a-form-item label="사업자코드" label-align="left" class="mb-0 label-select">
                        <biz-number-text-box width="150px" />
                    </a-form-item>
                    <a-form-item label="상호" label-align="left" class="mb-0 label-select">
                        <default-text-box width="150px" />
                    </a-form-item>
                </a-col>
                <a-col>
                    <a-form-item label="매니저리스트" label-align="left" class="mb-0 label-select">
                        <list-sales-dropdown :arrSelect="arraySelectBox" width="150px" />
                    </a-form-item>
                    <a-form-item label="영업자명" label-align="left" class="mb-0 label-select">
                        <list-manager-dropdown :arrSelect="arraySelectBox" width="150px" />
                    </a-form-item>
                </a-col>
                <a-col>
                    <switch-basic textCheck="해지제외" textUnCheck="해지포함" />
                </a-col>
            </a-row>
        </div>
        <div class="page-content">
            <a-spin :spinning="loadingTable" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="employee.employeeId" class="wf-100">
                    <DxToolbar>
                        <DxItem template="pagination-send-group-mail" />
                    </DxToolbar>
                    <template #pagination-send-group-mail>
                        <DxButton class="print-group">
                            <img src="@/assets/images/emailGroup.png" alt="" style="width: 33px;" />
                        </DxButton>
                    </template>
                    <DxSelection mode="multiple" />
                    <DxColumn caption="과세소득" data-field="totalTaxPay" format="#,###" width="150px" />
                </DxDataGrid>
            </a-spin>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch } from "vue";
import { dataSearchUtil } from "./utils/index";
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF6/BF610/index";
import notification from "@/utils/notification"
import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DxDataGrid, DxToolbar, DxSelection, DxButton, DxColumn, DxItem
    },
    setup() {
        let dataSource = reactive([])
        let trigger = ref(false)
        let dataSearch = reactive({ ...dataSearchUtil })
        const store = useStore()
        const globalYear = computed(() => store.state.settings.globalYear)
        let arraySelectBox = reactive([
            {
                key: globalYear.value + "-01",
                value: "귀 " + globalYear.value + "-01"
            },
            {
                key: globalYear.value + "-02",
                value: "귀 " + globalYear.value + "-02"
            },
            {
                key: globalYear.value + "-03",
                value: "귀 " + globalYear.value + "-03"
            },
            {
                key: globalYear.value + "-04",
                value: "귀 " + globalYear.value + "-04"
            },
            {
                key: globalYear.value + "-05",
                value: "귀 " + globalYear.value + "-05"
            },
            {
                key: globalYear.value + "-06",
                value: "귀 " + globalYear.value + "-06"
            },
            {
                key: globalYear.value + "-07",
                value: "귀 " + globalYear.value + "-07"
            },
            {
                key: globalYear.value + "-08",
                value: "귀 " + globalYear.value + "-08"
            },
            {
                key: globalYear.value + "-09",
                value: "귀 " + globalYear.value + "-09"
            },
            {
                key: globalYear.value + "-10",
                value: "귀 " + globalYear.value + "-10"
            },
            {
                key: globalYear.value + "-11",
                value: "귀 " + globalYear.value + "-11"
            },
            {
                key: globalYear.value + "-12",
                value: "귀 " + globalYear.value + "-12"
            },
            {
                key: globalYear.value + 1 + "-01",
                value: "귀 " + globalYear.value + 1 + "-01"
            },
        ])
        let arraySelectBox2 = reactive([
            {
                key: globalYear.value + "-01",
                value: "지 " + globalYear.value + "-01"
            },
            {
                key: globalYear.value + "-02",
                value: "지 " + globalYear.value + "-02"
            },
            {
                key: globalYear.value + "-03",
                value: "지 " + globalYear.value + "-03"
            },
            {
                key: globalYear.value + "-04",
                value: "지 " + globalYear.value + "-04"
            },
            {
                key: globalYear.value + "-05",
                value: "지 " + globalYear.value + "-05"
            },
            {
                key: globalYear.value + "-06",
                value: "지 " + globalYear.value + "-06"
            },
            {
                key: globalYear.value + "-07",
                value: "지 " + globalYear.value + "-07"
            },
            {
                key: globalYear.value + "-08",
                value: "지 " + globalYear.value + "-08"
            },
            {
                key: globalYear.value + "-09",
                value: "지 " + globalYear.value + "-09"
            },
            {
                key: globalYear.value + "-10",
                value: "지 " + globalYear.value + "-10"
            },
            {
                key: globalYear.value + "-11",
                value: "지 " + globalYear.value + "-11"
            },
            {
                key: globalYear.value + "-12",
                value: "지 " + globalYear.value + "-12"
            },
            {
                key: globalYear.value + 1 + "-01",
                value: "지 " + globalYear.value + 1 + "-01"
            },
        ])
        let statuses = reactive({
            checkbox1: true,
            checkbox2: true,
            checkbox3: true,
            checkbox4: true,
        })
        let reportType = reactive({
            checkbox1: true,
            checkbox2: true,
            checkbox3: true,
        })



        /*
         * ============== API ============== 
         */

        //  QUERY : searchTaxWithholdingStatusReports
        let {
            refetch: refetchTable,
            loading: loadingTable,
            onError: errorTable,
            onResult: resTable
        } = useQuery(queries.search, dataSearch, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache"
        }));
        resTable(res => {
            console.log(res);
        })
        errorTable(res => {
            notification('error', res.message)
        })

        /*
         * ============== WATCHING ============== 
         */

        watch(() => reportType, (value) => {

        }, { deep: true })



        /*
         * ============== FUNCTION ============== 
         */
        const searching = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                console.log('1234124');
            }
        }
        return {
            arraySelectBox, dataSource, loadingTable, dataSearch, arraySelectBox2, statuses, reportType,
            searching
        }
    }
})
</script>
<style scoped lang="scss" src="./style/style.scss">

</style>