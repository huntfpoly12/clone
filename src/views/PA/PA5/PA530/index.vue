<template>
    <action-header title="일용직근로소득원천징수영수증" @actionSearch="searching" />
    <div id="pa-530">
        <div class="search-form">
            <a-row :gutter="[24, 8]">
                <a-col :span="3">
                    <label class="lable-item">귀속연도 :</label>
                    <a-tag color="#a3a2a0">귀 {{ globalYear }}</a-tag>
                </a-col>
                <a-col :span="21">
                    <div class="custom-flex">
                        <label class="lable-item">지급월 :</label>
                        <a-row :gutter="[24, 8]">
                            <!-- ================== Row 1 =========================== -->
                            <a-col :span="6">
                                <checkbox-basic size="14" label="전체" v-model:valueCheckbox="checkAllValue" />
                            </a-col>
                            <a-col :span="6">
                                <checkbox-basic size="14" v-model:valueCheckbox="year1.value" :label="year1.label" />
                            </a-col>
                            <a-col :span="4">
                                <checkbox-basic size="14" v-model:valueCheckbox="year2.value" :label="year2.label" />
                            </a-col>
                            <a-col :span="8" class="custom-info">
                                <div>
                                    <img src="@/assets/images/iconInfo.png" alt="">
                                </div>
                                <span>
                                    12월 말일까지 미지급한 경우,
                                    서식 출력시 12월에 지급한걸로 표시됩니다.
                                </span>
                            </a-col>
                            <!-- ================== Row 2 =========================== -->
                            <a-col :span="6">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.quarter1.value"
                                    :label="arrCheckBoxSearch.quarter1.label" />
                            </a-col>
                            <a-col :span="6">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.quarter2.value"
                                    :label="arrCheckBoxSearch.quarter2.label" />
                            </a-col>
                            <a-col :span="6">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.quarter3.value"
                                    :label="arrCheckBoxSearch.quarter3.label" />
                            </a-col>
                            <a-col :span="6">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.quarter4.value"
                                    :label="arrCheckBoxSearch.quarter4.label" />
                            </a-col>
                            <!-- ================== Row 3 =========================== -->
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month1.value"
                                    :label="arrCheckBoxSearch.month1.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month2.value"
                                    :label="arrCheckBoxSearch.month2.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month3.value"
                                    :label="arrCheckBoxSearch.month3.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month4.value"
                                    :label="arrCheckBoxSearch.month4.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month5.value"
                                    :label="arrCheckBoxSearch.month5.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month6.value"
                                    :label="arrCheckBoxSearch.month6.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month7.value"
                                    :label="arrCheckBoxSearch.month7.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month8.value"
                                    :label="arrCheckBoxSearch.month8.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month9.value"
                                    :label="arrCheckBoxSearch.month9.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month10.value"
                                    :label="arrCheckBoxSearch.month10.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month11.value"
                                    :label="arrCheckBoxSearch.month11.label" />
                            </a-col>
                            <a-col :span="2">
                                <checkbox-basic size="14" v-model:valueCheckbox="arrCheckBoxSearch.month12.value"
                                    :label="arrCheckBoxSearch.month12.label" />
                            </a-col>
                        </a-row>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="page-content">
            <div class="title-body">
                <a-row>
                    <a-col :span="12">
                        <div class="title-body-left-1">
                            <div>
                                서식 설정 :
                            </div>
                            <div>
                                <img src="@/assets/images/iconInfo.png" alt="">
                            </div>
                            <span>
                                본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.
                            </span>
                        </div>
                        <div class="title-body-left-2">
                            <span>소득자보관용 :</span>
                            <div>
                                <switch-basic v-model:valueSwitch="valueSwitchChange" textCheck="소득자 보관용"
                                    textUnCheck="지급자보관용" />
                            </div>
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div class="title-body-right">
                            <date-time-box width="160px" v-model:valueDate="dateSendEmail" dateFormat="YYYY-MM-DD" />
                        </div>
                    </a-col>
                </a-row>
            </div>
            <a-spin :spinning="loadingGetEmployeeBusinesses" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="employeeId" @exporting="onExporting"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                    @selection-changed="selectionChanged" :column-auto-width="true">
                    <DxScrolling column-rendering-mode="virtual" />
                    <DxToolbar>
                        <DxItem location="after" template="pagination-table" />
                        <DxItem template="pagination-send-group-mail" />
                    </DxToolbar>
                    <template #pagination-table>
                        <div v-if="rowTable > originData.rows">
                            <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                                :total="rowTable" show-less-items />
                        </div>
                    </template>
                    <template #pagination-send-group-mail>
                        <div class="custom-mail-group">
                            <DxButton><img src="@/assets/images/emailGroup.png" alt="" style="width: 33px;"
                                    @click="sendMailGroup" />
                            </DxButton>
                        </div>
                    </template>
                    <DxSelection mode="multiple" />
                    <DxColumn caption="성명 (상호)" cell-template="tag" width="300px" />
                    <template #tag="{ data }" class="custom-action">
                        <div class="custom-action" v-if="data.data.employeeId != '-1'">
                            <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                :idCardNumber="data.data.residentId" :status="data.data.status"
                                :foreigner="data.data.foreigner" :checkStatus="false" />
                        </div>
                        <div v-else>
                            {{ data.data.summary }}
                        </div>
                    </template>
                    <DxColumn caption="주민등록번호" data-field="residentId" width="150px" />
                    <DxColumn caption="비고" cell-template="four-major" />
                    <template #four-major="{ data }" class="custom-action">
                        <div>
                            <four-major-insurance :typeTag="1" :typeValue="1" />
                        </div>
                    </template>
                    <DxColumn caption="과세소득" />
                    <DxColumn caption="비과세소득" />
                    <DxColumn caption="원천징수세액 소득세" data-field="withholdingIncomeTax" />
                    <DxColumn caption="원천징수세액 지방소득세" data-field="withholdingLocalIncomeTax" />
                    <DxSummary>
                        <DxTotalItem :customize-text="customizeTotal" show-in-column="성명 (상호)" />
                        <DxTotalItem :customize-text="customizeTotalTaxPay" show-in-column="과세소득" />
                        <DxTotalItem :customize-text="customizeTotalTaxfreePay" show-in-column="비과세소득" />
                        <DxTotalItem :customize-text="customizeIncomeTax" column="withholdingIncomeTax" />
                        <DxTotalItem :customize-text="customizeDateLocalIncomeTax" column="withholdingLocalIncomeTax" />
                    </DxSummary>
                    <DxColumn :width="80" cell-template="pupop" />
                    <template #pupop="{ data }">
                        <div class="custom-action" style="text-align: center;">
                            <img src="@/assets/images/email.svg" alt=""
                                style="width: 25px; margin-right: 3px; cursor: pointer;"
                                @click="openPopup(data.data)" />
                            <img src="@/assets/images/print.svg" alt="" style="width: 25px;cursor: pointer"
                                @click="actionPrint(data.data)" />
                        </div>
                    </template>
                </DxDataGrid>
                <div class="pagination-table" v-if="rowTable > originData.rows">
                    <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                        :total="rowTable" show-less-items style="margin-top: 10px" @change="searching" />
                </div>
            </a-spin>
            <PA530Popup :groupSendMail="actionSendEmailGroup" :modalStatus="modalStatus" :dataPopup="dataCallModal"
                :imputedYear="globalYear" :paymentYearMonths="paymentYearMonthsModal" :type="valueSwitchChange"
                :receiptDate="dateSendEmail.toString()" @closePopup="closePopupSendMail" :companyId="companyId"
                :emailUserLogin="emailUserLogin" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA5/PA530/index";
import queriesGetUser from "@/graphql/queries/BF/BF2/BF210/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { onExportingCommon } from "@/helpers/commonFunction"
import { origindata, dataDemo } from "./utils";
import DxButton from "devextreme-vue/button";
import { companyId, userId } from "@/../src/helpers/commonFunction";
import PA530Popup from "./components/PA530Popup.vue";
import dayjs from 'dayjs';
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxGrouping, DxItem, DxButton, DxSummary, DxTotalItem,
        EditOutlined,
        HistoryOutlined,
        SearchOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        MailOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined,
        PA530Popup
    },
    setup() {
        let popupData = ref([])
        let modalHistoryStatus = ref<boolean>(false)
        let dataCallApiPrint = ref()
        let paymentYearMonthsModal: any = ref()
        let dataCallModal: any = ref()
        let checkAllValue = ref(true)
        let customTextWithholdingLocalIncomeTax = ref('')
        let customTextWithholdingIncomeTax = ref('')
        let selectedItemKeys = ref([])
        const emailUserLogin = ref()
        const actionSendEmailGroup = ref(false)
        const dateSendEmail = ref(new Date)
        const valueSwitchChange = ref(true)
        const dataSource: any = ref([]);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const originData = reactive({ ...origindata, rows: per_page });
        const dataDemoUltil = reactive({ ...dataDemo })
        const trigger = ref<boolean>(true);
        const triggerPrint = ref<boolean>(false);
        const globalYear: any = computed(() => store.state.settings.globalYear);
        const arrCheckBoxSearch = reactive({
            quarter1: {
                label: "1/4분기",
                value: true,
            },
            quarter2: {
                label: "2/4분기",
                value: true,
            },
            quarter3: {
                label: "3/4분기",
                value: true,
            },
            quarter4: {
                label: "4/4분기",
                value: true,
            },
            month1: {
                label: "01월",
                value: true,
                subValue: globalYear.value + "-01"
            },
            month2: {
                label: "02월",
                value: true,
                subValue: globalYear.value + "-02"
            },
            month3: {
                label: "03월",
                value: true,
                subValue: globalYear.value + "-03"
            },
            month4: {
                label: "04월",
                value: true,
                subValue: globalYear.value + "-04"
            },
            month5: {
                label: "05월",
                value: true,
                subValue: globalYear.value + "-05"
            },
            month6: {
                label: "06월",
                value: true,
                subValue: globalYear.value + "-06"
            },
            month7: {
                label: "07월",
                value: true,
                subValue: globalYear.value + "-07"
            },
            month8: {
                label: "08월",
                value: true,
                subValue: globalYear.value + "-08"
            },
            month9: {
                label: "09월",
                value: true,
                subValue: globalYear.value + "-09"
            },
            month10: {
                label: "10월",
                value: true,
                subValue: globalYear.value + "-10"
            },
            month11: {
                label: "11월",
                value: true,
                subValue: globalYear.value + "-11"
            },
            month12: {
                label: "12월",
                value: true,
                subValue: globalYear.value + "-12"
            },
        })
        const getArrPaymentYearMonth = () => {
            let arrVal = []
            if (arrCheckBoxSearch.month1.value == true)
                arrVal.push(arrCheckBoxSearch.month1.subValue)
            if (arrCheckBoxSearch.month2.value == true)
                arrVal.push(arrCheckBoxSearch.month2.subValue)
            if (arrCheckBoxSearch.month3.value == true)
                arrVal.push(arrCheckBoxSearch.month3.subValue)
            if (arrCheckBoxSearch.month4.value == true)
                arrVal.push(arrCheckBoxSearch.month4.subValue)
            if (arrCheckBoxSearch.month5.value == true)
                arrVal.push(arrCheckBoxSearch.month5.subValue)
            if (arrCheckBoxSearch.month6.value == true)
                arrVal.push(arrCheckBoxSearch.month6.subValue)
            if (arrCheckBoxSearch.month7.value == true)
                arrVal.push(arrCheckBoxSearch.month7.subValue)
            if (arrCheckBoxSearch.month8.value == true)
                arrVal.push(arrCheckBoxSearch.month8.subValue)
            if (arrCheckBoxSearch.month9.value == true)
                arrVal.push(arrCheckBoxSearch.month9.subValue)
            if (arrCheckBoxSearch.month10.value == true)
                arrVal.push(arrCheckBoxSearch.month10.subValue)
            if (arrCheckBoxSearch.month11.value == true)
                arrVal.push(arrCheckBoxSearch.month11.subValue)
            if (arrCheckBoxSearch.month12.value == true)
                arrVal.push(arrCheckBoxSearch.month12.subValue)
            if (year1.value == true)
                arrVal.push(year1.subValue)
            if (year2.value == true)
                arrVal.push(year2.subValue)
            return arrVal
        }
        const year1 = reactive({
            label: globalYear.value + 1 + '년 01월',
            value: true,
            subValue: globalYear.value + 1 + '-01'
        })
        const year2 = reactive({
            label: globalYear.value + 1 + '년 02월',
            value: true,
            subValue: globalYear.value + 1 + '-02'
        }) 
        const modalStatus = ref(false)
        const textResidentId = ref('주민등록번호') 
        const dataApiSearch = reactive({
            companyId: companyId,
            filter: {
                imputedYear: parseInt(dayjs().format('YYYY')),
                paymentYearMonths: getArrPaymentYearMonth()
            }
        })
        // ================GRAPQL==============================================
        // QUERY NAME : searchIncomeWageDailyWithholdingReceipts
        const { refetch: refetchData, loading: loadingGetEmployeeBusinesses, onError: errorGetEmployeeBusinesses, onResult: resEmployeeBusinesses } = useQuery(queries.search, dataApiSearch, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        resEmployeeBusinesses(res => {
            // dataSource.value = res.data.getEmployeeBusinesses  
            dataSource.value = dataDemoUltil.employee
        })
        errorGetEmployeeBusinesses(res => {
            notification('error', res.message)
        })
        // QUERY NAME : getIncomeWageDailyWithholdingReceiptReportViewUrl
        const {
            refetch: refetchPrint,
            loading: loadingPrint,
            onError,
            onResult,
        } = useQuery(queries.print, dataCallApiPrint, () => ({
            enabled: triggerPrint.value,
            fetchPolicy: "no-cache",
        }));

        // QUERY NAME : getUser
        const {
            onResult: onResultUserInf
        } = useQuery(queriesGetUser.getUser, { id: userId }, () => ({
            fetchPolicy: "no-cache",
        }));
        onResultUserInf(e => {
            emailUserLogin.value = e.data.getUser.email
        })
        // ================WATCHING============================================
        watch(checkAllValue, (value) => {
            arrCheckBoxSearch.quarter1.value = value
            arrCheckBoxSearch.quarter2.value = value
            arrCheckBoxSearch.quarter3.value = value
            arrCheckBoxSearch.quarter4.value = value
            year1.value = value
            year2.value = value
        }, { deep: true });
        watch(arrCheckBoxSearch, (val) => {
            if (val.month1.value == true && val.month2.value == true && val.month3.value == true)
                val.quarter1.value = true
            else
                val.quarter1.value = false
            if (val.month4.value == true && val.month5.value == true && val.month6.value == true)
                val.quarter2.value = true
            else
                val.quarter2.value = false
            if (val.month7.value == true && val.month8.value == true && val.month9.value == true)
                val.quarter3.value = true
            else
                val.quarter3.value = false
            if (val.month10.value == true && val.month11.value == true && val.month12.value == true)
                val.quarter4.value = true
            else
                val.quarter4.value = false
            if (val.quarter1.value == true && val.quarter2.value == true && val.quarter3.value == true && val.quarter4.value == true && year1.value == true && year2.value == true)
                checkAllValue.value = true
            else
                checkAllValue.value = false
        }, { deep: true });
        watch(() => year2.value, (val) => {
            if (arrCheckBoxSearch.quarter1.value == true && arrCheckBoxSearch.quarter2.value == true && arrCheckBoxSearch.quarter3.value == true && arrCheckBoxSearch.quarter4.value == true && val == true && year1.value == true)
                checkAllValue.value = true
            else
                checkAllValue.value = false
        })
        watch(() => year1.value, (val) => {
            if (arrCheckBoxSearch.quarter1.value == true && arrCheckBoxSearch.quarter2.value == true && arrCheckBoxSearch.quarter3.value == true && arrCheckBoxSearch.quarter4.value == true && val == true && year2.value == true)
                checkAllValue.value = true
            else
                checkAllValue.value = false
        })
        watch(arrCheckBoxSearch.quarter1, (val) => {
            arrCheckBoxSearch.month1.value = val.value
            arrCheckBoxSearch.month2.value = val.value
            arrCheckBoxSearch.month3.value = val.value
        },);
        watch(arrCheckBoxSearch.quarter2, (val) => {
            arrCheckBoxSearch.month4.value = val.value
            arrCheckBoxSearch.month5.value = val.value
            arrCheckBoxSearch.month6.value = val.value
        },);
        watch(arrCheckBoxSearch.quarter3, (val) => {
            arrCheckBoxSearch.month7.value = val.value
            arrCheckBoxSearch.month8.value = val.value
            arrCheckBoxSearch.month9.value = val.value
        },);
        watch(arrCheckBoxSearch.quarter4, (val) => {
            arrCheckBoxSearch.month10.value = val.value
            arrCheckBoxSearch.month11.value = val.value
            arrCheckBoxSearch.month12.value = val.value
        },);
        // ================FUNCTION============================================
        const onExporting = (e: any) => {
            onExportingCommon(e.component, e.cancel, '영업자관리')
        };
        const searching = () => {
            dataApiSearch.filter.paymentYearMonths = getArrPaymentYearMonth()
            refetchData()
        };
        const openPopup = (res: any) => {
            actionSendEmailGroup.value = false
            dataCallModal.value = {
                senderName: sessionStorage.getItem("username"),
                receiverName: res.name,
                receiverAddress: res.email,
                employeeId: res.employeeId,
            }
            paymentYearMonthsModal.value = getArrPaymentYearMonth()
            modalStatus.value = true
        }
        const customizeIncomeTax = () => {
            return dataDemoUltil.withholdingLocalIncomeTax
        }
        const customizeDateLocalIncomeTax = () => {
            return dataDemoUltil.withholdingIncomeTax
        }
        const customizeTotal = () => {
            return dataSource.value.length
        }
        const customizeTotalTaxfreePay = () => {
            return dataDemoUltil.totalTaxfreePay
        }
        const customizeTotalTaxPay = () => {
            return dataDemoUltil.totalTaxPay
        }
        const actionPrint = (res: any) => {
            dataCallApiPrint.value = {
                companyId: companyId,
                employeeIds: [res.employeeId],
                input: {
                    imputedYear: globalYear,
                    paymentYearMonths: getArrPaymentYearMonth(),
                    type: valueSwitchChange.value == true ? 1 : 2,
                    receiptDate: dateSendEmail.value
                }
            }
            triggerPrint.value = true
            refetchPrint()
        }
        const sendMailGroup = () => {
            if (selectedItemKeys.value.length > 0) {
                actionSendEmailGroup.value = true
                let dataCall: any = []
                dataDemoUltil.employee.map((val: any) => {
                    if (check(val) == 1) {
                        dataCall.push({
                            senderName: sessionStorage.getItem("username"),
                            receiverName: val.name,
                            receiverAddress: val.email,
                            employeeId: val.employeeId,
                        })
                    }
                })
                dataCallModal.value = dataCall
                paymentYearMonthsModal.value = getArrPaymentYearMonth()
                modalStatus.value = true
            } else {
                notification('error', "일용직근로자들을 선택하세요!")
            }
        }
        const check = (val: any) => {
            let value = 0
            selectedItemKeys.value.map((val: any) => {
                if (val.employeeId == val)
                    value = 1
            })
            return value
        }
        const selectionChanged = (data: any) => {
            selectedItemKeys.value = data.selectedRowKeys
        }
        const closePopupSendMail = () => {
            modalStatus.value = false
            refetchData()
        }
        return {
            emailUserLogin,
            actionSendEmailGroup,
            selectedItemKeys,
            companyId,
            paymentYearMonthsModal,
            dataCallModal,
            modalStatus,
            valueSwitchChange,
            dateSendEmail,
            customTextWithholdingLocalIncomeTax, customTextWithholdingIncomeTax,
            year1,
            year2,
            checkAllValue,
            arrCheckBoxSearch,
            textResidentId,
            popupData,
            modalHistoryStatus,
            loadingGetEmployeeBusinesses,
            rowTable,
            dataSource,
            per_page, move_column, colomn_resize,
            originData,
            globalYear,
            closePopupSendMail,
            selectionChanged,
            sendMailGroup,
            actionPrint,
            openPopup,
            onExporting,
            searching,
            customizeTotal,
            customizeIncomeTax,
            customizeDateLocalIncomeTax,
            customizeTotalTaxPay,
            customizeTotalTaxfreePay,
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss">

</style>
