<template>
    <action-header @actionSearch="searching" />
    <div id="bf-610">
        <div class="search-form">
            <a-row :gutter="[24, 8]">
                <a-col>
                    <!-- <a-form-item label="귀속연월" label-align="left" class="clr mb-0 label-select">
                        <imputed-year-month-select-box :dataSelect="arraySelectBox" width="150px" :required="true"
                            v-model:valueInput="dataSearch.filter.imputedYearMonth" type="1" />
                    </a-form-item> -->
                    <a-form-item label="지급연월" label-align="left" class="clr mb-0 label-select">
                        <imputed-year-month-select-box :dataSelect="arraySelectBox2" width="150px" :required="true"
                            v-model:valueInput="dataSearch.filter.paymentYearMonth" type="2" />
                    </a-form-item>
                    <!-- <a-form-item label="" label-align="left" class="clr mb-0 label-select">
                    </a-form-item> -->
                </a-col>
                <a-col>
                    <a-form-item label="신고주기" label-align="left" class="mb-0">
                        <div class="d-flex-center">
                            <div @click="checkAll1">
                                <checkbox-basic label="전체" v-model:valueCheckbox="reportType.checkbox1"
                                    @click="checkAll1" />
                            </div>
                            <div>
                                <checkbox-basic label="정기" v-model:valueCheckbox="reportType.checkbox2" />
                                <checkbox-basic label="반기" v-model:valueCheckbox="reportType.checkbox3" />
                            </div>
                        </div>
                    </a-form-item>
                    <a-form-item label="신고구분" label-align="left" class="mb-0">
                        <div class=" d-flex-center">
                            <div @click="checkAll2">
                                <checkbox-basic label="전체" v-model:valueCheckbox="reportType.checkAllTypeFication" />
                            </div>
                            <div>
                                <checkbox-basic label="정기" v-model:valueCheckbox="dataSearch.filter.regular" />
                                <checkbox-basic label="수정" v-model:valueCheckbox="dataSearch.filter.revised" />
                                <checkbox-basic label="기한후" v-model:valueCheckbox="dataSearch.filter.afterDeadline" />
                            </div>
                        </div>
                    </a-form-item>
                </a-col>
                <a-col style="display: flex;">
                    <div style="margin-right: 10px;">
                        <a-tooltip placement="top" color="black">
                            <template #title>원천징수이행상황신고서 2</template>
                            <div>마감상태 :</div>
                        </a-tooltip>
                        <div style="margin-top: 10px;" @click="checkAll3">
                            <checkbox-basic label="입력중" class="custom-checkbox1"
                                v-model:valueCheckbox="statuses.all" />
                        </div>
                        
                    </div>
                    <div>
                        <div class="mb-10">
                            <checkbox-basic label="입력중" class="mr-10 custom-checkbox1"
                                v-model:valueCheckbox="statuses.checkbox1" />
                            <checkbox-basic label="입력마감" class="mr-10 custom-checkbox2"
                                v-model:valueCheckbox="statuses.checkbox2" />
                        </div>
                        <div>
                            <checkbox-basic label="조정중" class="mr-10 custom-checkbox3"
                                v-model:valueCheckbox="statuses.checkbox3" />
                            <checkbox-basic label="조정마감" class="mr-10 custom-checkbox4"
                                v-model:valueCheckbox="statuses.checkbox4" />
                        </div>
                    </div>
                </a-col>
                <a-col>
                    <a-form-item label="사업자코드" label-align="left" class="mb-0 label-select">
                        <biz-number-text-box width="150px" v-model:valueInput="dataSearch.filter.companyCode" />
                    </a-form-item>
                    <a-form-item label="상호" label-align="left" class="mb-0 label-select">
                        <default-text-box width="150px" v-model:valueInput="dataSearch.filter.companyName" />
                    </a-form-item>
                </a-col>
                <a-col>
                    <a-form-item label="매니저리스트" label-align="left" class="mb-0 label-select">
                        <list-manager-dropdown v-model:valueInput="dataSearch.filter.manageUserId" width="150px" />
                    </a-form-item>
                    <a-form-item label="영업자명" label-align="left" class="mb-0 label-select">
                        <list-sales-dropdown v-model:valueInput="dataSearch.filter.salesRepresentativeId"
                            width="150px" />
                    </a-form-item>
                </a-col>
                <a-col>
                    <switch-basic textCheck="해지제외" textUnCheck="해지포함"
                        v-model:valueSwitch="dataSearch.filter.excludeCancel" />
                </a-col>
            </a-row>
        </div>
        <div class="page-content">
            <a-spin :spinning="loadingTable" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource.datas"
                    :show-borders="true" key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxSelection mode="multiple" :fixed="true" />
                    <DxColumn caption="출력 메일" cell-template="action" />
                    <template #action="{ data }">
                        <img src="@/assets/images/print.svg" alt="" style="width: 25px;"
                            @click="actionPrint(data.data)">
                        <img src="@/assets/images/email.svg" alt="" style="width: 25px;"
                            @click="actionSendEmail(data.data)" />
                    </template>
                    <DxColumn caption="사업자코드" data-field="company.code" />
                    <DxColumn caption="상호 주소" cell-template="company" width="100" />
                    <template #company="{ data }">
                        <a-tooltip color="black" placement="topLeft">
                            <template #title>{{ data.data.company.name + " " + data.data.company.address }}</template>
                            {{ data.data.company.name + " " + data.data.company.address }}
                        </a-tooltip>
                    </template>
                    <DxColumn caption="마감 현황" cell-template="status" width="140" />
                    <template #status="{ data }">
                        <div class="d-flex-center">
                            <!-- <process-status-tooltip v-model:valueStatus="data.data.status" style="width: 100px;"
                                :dataRow="data.data" @dataRow="changeStatus" /> -->
                            <process-status v-model:valueStatus="data.data.status" :dataRow="data.data"
                                @checkConfirmRowTable="changeStatusRowTable" />
                            <div class="pl-5 pr-5">
                                <a-tooltip color="black" placement="topLeft">
                                    <template #title>소득별 마감현황</template>
                                    <plus-outlined @click="openModalStatus(data.data)" />
                                </a-tooltip>
                            </div>
                        </div>
                    </template>
                    <DxColumn caption="귀속연월" cell-template="imputed" />
                    <template #imputed="{ data }">
                        <div class="tag-custom-1">
                            {{ data.data.imputedYear }}-{{
                                data.data.imputedMonth < 10 ? '0' + data.data.imputedMonth : data.data.imputedMonth
                            }}
                                </div>
                    </template>
                    <DxColumn caption="지급연월" cell-template="payment" />
                    <template #payment="{ data }">
                        <div class="tag-custom-2">
                            {{ data.data.paymentYear }}-{{
                                data.data.paymentMonth < 10 ? '0' + data.data.paymentMonth : data.data.paymentMonth
                            }}
                                </div>
                    </template>
                    <DxColumn caption="신고 주기" cell-template="reportType" />
                    <template #reportType="{ data }">
                        <div :class="data.data.reportType == 6 ? 'tag-custom-1' : 'tag-custom-2'">
                            {{ data.data.reportType == 6 ? '반기' : '매월' }}
                        </div>
                    </template>
                    <DxColumn caption="신고 종류" cell-template="afterDeadline" />
                    <template #afterDeadline="{ data }">
                        <div
                            :class="data.data.index == 0 && data.data.afterDeadline == true ? 'tag-custom-2' : (data.data.index == 0 && data.data.afterDeadline == false ? 'tag-custom-4' : 'tag-custom-3')">
                            {{
                                data.data.index == 0 && data.data.afterDeadline == true ? '기한후' : data.data.index == 0 &&
                                    data.data.afterDeadline == false ? '정기' : '수정 ' + data.data.index
                            }}
                        </div>
                    </template>
                    <DxColumn caption="연말" cell-template="yearEndTaxAdjustment" />
                    <template #yearEndTaxAdjustment="{ data }">
                        {{ data.data.yearEndTaxAdjustment == false ? '' : 'ㅇ' }}
                    </template>
                    <DxColumn caption="환급" cell-template="refund" />
                    <template #refund="{ data }">
                        {{ data.data.refund == false ? '' : 'ㅇ' }}
                    </template>
                    <DxColumn caption="근로 간이" cell-template="wageIncomeSimplified" />
                    <template #wageIncomeSimplified="{ data }">
                        {{ data.data.wageIncomeSimplified == 0 ? '' : 'ㅇ' }}
                    </template>
                    <DxColumn caption="근로 중도" cell-template="yearEndAdjustmentRetirement" />
                    <template #yearEndAdjustmentRetirement="{ data }">
                        {{ data.data.yearEndAdjustmentRetirement == 0 ? '' : 'ㅇ' }}
                    </template>
                    <DxColumn caption="근로 일용" cell-template="dailyWageIncome" />
                    <template #dailyWageIncome="{ data }">
                        {{ data.data.dailyWageIncome == 0 ? '' : 'ㅇ' }}
                    </template>
                    <DxColumn caption="근로 연말" cell-template="yearEndAdjustment" />
                    <template #yearEndAdjustment="{ data }">
                        {{ data.data.yearEndAdjustment == 0 ? '' : 'ㅇ' }}
                    </template>
                    <DxColumn caption="퇴직 소득" cell-template="retirementIncome" />
                    <template #retirementIncome="{ data }">
                        {{ data.data.retirementIncome == 0 ? '' : 'ㅇ' }}
                    </template>
                    <DxColumn caption="사업 소득" cell-template="businessIncome" />
                    <template #businessIncome="{ data }">
                        {{ data.data.businessIncome == 0 ? '' : 'ㅇ' }}
                    </template>
                    <DxColumn caption="기타 소득" cell-template="extraIncome" />
                    <template #extraIncome="{ data }">
                        {{ data.data.extraIncome == 0 ? '' : 'ㅇ' }}
                    </template>
                    <DxColumn caption="총지급액 (A99)" data-field="totalPayment" format="#,###" />
                    <DxColumn caption="납부세액 소득세등 (A99)" data-field="totalCollectedTaxAmount" format="#,###" />
                    <DxColumn caption="(20) 차월이월 환급세액계" data-field="nextMonthRefundTaxAmount" format="#,###" />
                    <DxColumn caption="(21) 환급 신청액" data-field="refundApplicationAmount" format="#,###" />
                </DxDataGrid>
            </a-spin>
        </div>
    </div>
    <PopupAddStatus :modalStatus="modalStatus" @closePopup="closePopup" :dataCall="dataCall" />
    <PopupPrint :modalStatus="modalPrint" @closePopup="closePopupPrint" :dataCall="dataCall" />
    <PopupSendEmail :modalStatus="modalSendEmail" @closePopup="closeSendEmail" :dataCall="dataCall" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch } from "vue";
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF6/BF610/index";
import notification from "@/utils/notification"
import { useStore } from 'vuex'
import { PlusOutlined, } from "@ant-design/icons-vue";
import PopupAddStatus from "./components/PopupAddStatus.vue";
import PopupPrint from "./components/PopupPrint.vue";
import PopupSendEmail from "./components/PopupSendEmail.vue";
import mutations from "@/graphql/mutations/BF/BF6/BF610/index";
export default defineComponent({
    components: {
        DxDataGrid, DxToolbar, DxSelection, DxButton, DxColumn, DxItem, DxScrolling, PlusOutlined
        , PopupAddStatus, PopupPrint, PopupSendEmail
    },
    setup() {
        let dataSource: any = ref([])
        let trigger = ref(true)
        const store = useStore()
        const globalYear: any = computed(() => store.state.settings.globalYear)
        let dataSearch: any = reactive({
            "filter": {
                "page": 1,
                "rows": 10,
                "paymentYearMonth": parseInt(globalYear.value + "01"),
                "reportType": null, //1 or 6
                "regular": true,
                "revised": true,
                "afterDeadline": true,
                "statuses": [10, 20, 30, 40],
                "companyCode": null,
                "companyName": null,
                "manageUserId": null,
                "salesRepresentativeId": null,
                "excludeCancel": true
            }
        })
        // let arraySelectBox = computed(() => [
        //     {
        //         key: parseInt(globalYear.value + "01"),
        //         value: "귀 " + globalYear.value + "-01"
        //     },
        //     {
        //         key: parseInt(globalYear.value + "02"),
        //         value: "귀 " + globalYear.value + "-02"
        //     },
        //     {
        //         key: parseInt(globalYear.value + "03"),
        //         value: "귀 " + globalYear.value + "-03"
        //     },
        //     {
        //         key: parseInt(globalYear.value + "04"),
        //         value: "귀 " + globalYear.value + "-04"
        //     },
        //     {
        //         key: parseInt(globalYear.value + "05"),
        //         value: "귀 " + globalYear.value + "-05"
        //     },
        //     {
        //         key: parseInt(globalYear.value + "06"),
        //         value: "귀 " + globalYear.value + "-06"
        //     },
        //     {
        //         key: parseInt(globalYear.value + "07"),
        //         value: "귀 " + globalYear.value + "-07"
        //     },
        //     {
        //         key: parseInt(globalYear.value + "08"),
        //         value: "귀 " + globalYear.value + "-08"
        //     },
        //     {
        //         key: parseInt(globalYear.value + "09"),
        //         value: "귀 " + globalYear.value + "-09"
        //     },
        //     {
        //         key: parseInt(globalYear.value + "10"),
        //         value: "귀 " + globalYear.value + "-10"
        //     },
        //     {
        //         key: parseInt(globalYear.value + "11"),
        //         value: "귀 " + globalYear.value + "-11"
        //     },
        //     {
        //         key: parseInt(globalYear.value + "12"),
        //         value: "귀 " + globalYear.value + "-12"
        //     },
        //     {
        //         key: parseInt(globalYear.value + 1 + "01"),
        //         value: "귀 " + globalYear.value + 1 + "01"
        //     },
        // ])
        let arraySelectBox2 = computed(() => [
            {
                key: parseInt(globalYear.value + "01"),
                value: "지 " + globalYear.value + "-01"
            },
            {
                key: parseInt(globalYear.value + "02"),
                value: "지 " + globalYear.value + "-02"
            },
            {
                key: parseInt(globalYear.value + "03"),
                value: "지 " + globalYear.value + "-03"
            },
            {
                key: parseInt(globalYear.value + "04"),
                value: "지 " + globalYear.value + "-04"
            },
            {
                key: parseInt(globalYear.value + "05"),
                value: "지 " + globalYear.value + "-05"
            },
            {
                key: parseInt(globalYear.value + "06"),
                value: "지 " + globalYear.value + "-06"
            },
            {
                key: parseInt(globalYear.value + "07"),
                value: "지 " + globalYear.value + "-07"
            },
            {
                key: parseInt(globalYear.value + "08"),
                value: "지 " + globalYear.value + "-08"
            },
            {
                key: parseInt(globalYear.value + "09"),
                value: "지 " + globalYear.value + "-09"
            },
            {
                key: parseInt(globalYear.value + "10"),
                value: "지 " + globalYear.value + "-10"
            },
            {
                key: parseInt(globalYear.value + "11"),
                value: "지 " + globalYear.value + "-11"
            },
            {
                key: parseInt(globalYear.value + "12"),
                value: "지 " + globalYear.value + "-12"
            },
            {
                key: parseInt(globalYear.value + 1 + "01"),
                value: "지 " + globalYear.value + 1 + "-01"
            },
        ])
        let statuses = reactive({
            all: true,
            checkbox1: true,
            checkbox2: true,
            checkbox3: true,
            checkbox4: true,
        })
        let reportType = ref({
            checkAllTypeFication: true,
            checkbox1: true,
            checkbox2: true,
            checkbox3: true,
        })
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const modalStatus = ref(false)
        const modalPrint = ref(false)
        const modalSendEmail = ref(false)
        const dataCall = ref()
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
            dataSource.value = res.data.searchTaxWithholdingStatusReports
            trigger.value = false
        })
        errorTable(res => {
            notification('error', res.message)
        })

        //  Mutation : changeTaxWithholdingStatusReportStatus
        const {
            mutate: actionChangeStatus,
            onDone: doneChangeStatus,
            onError: errChangeStatus
        } = useMutation(mutations.changeTaxWithholdingStatusReportStatus);
        doneChangeStatus(() => {
            notification('success', `업부상태 변경되었습니다!`)
            trigger.value = true
            refetchTable()
        })
        errChangeStatus((error) => {
            notification('error', error.message)
        })


        /*
         * ============== WATCHING ============== 
         */
        watch(() => globalYear, (newVal: any) => {
            dataSearch.filter.paymentYearMonth = parseInt(newVal.value + "01")
            trigger.value = true
            refetchTable()

        }, { deep: true })
        // watch(() => dataSearch.filter.regular, (val: any) => {
        //     if (val == true && dataSearch.filter.revised == true && dataSearch.filter.afterDeadline == true)
        //         reportType.value.checkAllTypeFication = true
        //     else
        //         reportType.value.checkAllTypeFication = false
        // }, { deep: true })
        // watch(() => dataSearch.filter.revised, (val: any) => {
        //     if (val == true && dataSearch.filter.regular == true && dataSearch.filter.afterDeadline == true)
        //         reportType.value.checkAllTypeFication = true
        //     else
        //         reportType.value.checkAllTypeFication = false
        // }, { deep: true })
        // watch(() => dataSearch.filter.afterDeadline, (val: any) => {
        //     if (val == true && dataSearch.filter.revised == true && dataSearch.filter.regular == true)
        //         reportType.value.checkAllTypeFication = true
        //     else
        //         reportType.value.checkAllTypeFication = false
        // }, { deep: true })
        watch(() => [
            dataSearch.filter.regular,
            dataSearch.filter.revised,
            dataSearch.filter.afterDeadline
        ], ([newA, newB, newC]) => {
            if (!newA || !newB || !newC) { // if 1 cell is false
                reportType.value.checkAllTypeFication = false
            }
            if (newA && newB && newC) { // if all is true
                reportType.value.checkAllTypeFication = true
            }
        });

        // watch(() => reportType.value.checkbox2, (val: any) => {
        //     if (val == true && reportType.value.checkbox3 == true)
        //         reportType.value.checkbox1 = true
        //     else
        //         reportType.value.checkbox1 = false
        // }, { deep: true })
        // watch(() => reportType.value.checkbox3, (val: any) => {
        //     if (val == true && reportType.value.checkbox2 == true)
        //         reportType.value.checkbox1 = true
        //     else
        //         reportType.value.checkbox1 = false
        // }, { deep: true })

        watch(() => [ reportType.value.checkbox2, reportType.value.checkbox3 ], ([newA, newB]) => {
            if (!newA || !newB) { // if 1 cell is false
                reportType.value.checkbox1 = false
            }
            if (newA && newB) { // if all is true
                reportType.value.checkbox1 = true
            }
        });

        watch(() => [ statuses.checkbox1, statuses.checkbox2, statuses.checkbox3, statuses.checkbox4, ], ([newA, newB, newC, newD]) => {
            if (!newA || !newB || !newC || !newD) { // if 1 cell is false
                statuses.all = false
            }
            if (newA && newB && newC && newD) { // if all is true
                statuses.all = true
            }
        });



        /*
         * ============== FUNCTION ============== 
         */
        const searching = () => {
            // Import data to reportType (1, 6, null)
            if (reportType.value.checkbox2 == true && reportType.value.checkbox3 == false)
                dataSearch.filter.reportType = 1
            else if (reportType.value.checkbox3 == true && reportType.value.checkbox2 == false)
                dataSearch.filter.reportType = 6
            else
                dataSearch.filter.reportType = null
            // Add value to array statuses
            dataSearch.filter.statuses = []
            if (statuses.checkbox1 == true)
                dataSearch.filter.statuses.push(10)
            if (statuses.checkbox2 == true)
                dataSearch.filter.statuses.push(20)
            if (statuses.checkbox3 == true)
                dataSearch.filter.statuses.push(30)
            if (statuses.checkbox4 == true)
                dataSearch.filter.statuses.push(40)
            trigger.value = true
            refetchTable()
        }

        const closePopup = () => {
            modalStatus.value = false
            trigger.value = true
            refetchTable()
        }

        const closePopupPrint = () => {
            modalPrint.value = false
        }

        const closeSendEmail = () => {
            modalSendEmail.value = false
        }

        const openModalStatus = (data: any) => {
            dataCall.value = {
                reportId: data.reportId,
                companyId: data.companyId,
                imputedYear: data.imputedYear,
            }
            modalStatus.value = true
        }

        const changeStatusRowTable = (data: any) => {
            let dataChangeStatus = {
                "companyId": data.companyId,
                "imputedYear": data.imputedYear,
                "reportId": data.reportId,
                "status": data.status
            }
            actionChangeStatus(dataChangeStatus)
        }

        const actionPrint = (data: any) => {
            dataCall.value = {
                reportId: data.reportId,
                companyId: data.companyId,
                imputedYear: data.imputedYear,
            }
            modalPrint.value = true
        }
        const actionSendEmail = (data: any) => {
            dataCall.value = {
                reportId: data.reportId,
                companyId: data.companyId,
                imputedYear: data.imputedYear,
            }
            modalSendEmail.value = true
        }

        const checkAll1 = () => {
            reportType.value.checkbox2 = reportType.value.checkbox1
            reportType.value.checkbox3 = reportType.value.checkbox1
        }
        const checkAll2 = () => {
            dataSearch.filter.regular = reportType.value.checkAllTypeFication
            dataSearch.filter.revised = reportType.value.checkAllTypeFication
            dataSearch.filter.afterDeadline = reportType.value.checkAllTypeFication
        }
        const checkAll3 = () => {
            statuses.checkbox1 = statuses.all
            statuses.checkbox2 = statuses.all
            statuses.checkbox3 = statuses.all
            statuses.checkbox4 = statuses.all
        }
        return {
            modalSendEmail,
            // arraySelectBox, 
            dataSource, loadingTable, dataSearch, arraySelectBox2, statuses, reportType, move_column, colomn_resize, modalStatus, modalPrint, dataCall,
            checkAll1, checkAll2, checkAll3, searching, closePopup, openModalStatus, changeStatusRowTable, closePopupPrint, actionPrint, closeSendEmail, actionSendEmail
        }
    }
})
</script>
<style scoped lang="scss" src="./style/style.scss">

</style> 