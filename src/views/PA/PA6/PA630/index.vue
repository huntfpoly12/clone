<template>
    <a-spin :spinning="loading" size="large">
        <action-header title="거주자의 사업소득원천징수영수증 " @actionSearch="searching" />
        <div id="pa-630">
            <div class="search-form">
                <a-row>
                    <a-col :span="22">
                        <a-row :gutter="[24, 8]">
                            <a-col>
                                <div class="dflex custom-flex global-year">
                                    <label class="lable-item">귀속연도 :</label>
                                    <a-tag color="#a3a2a0">{{ globalYear }}</a-tag>
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </div>
            <div class="page-content">
                <a-row class="header-group">
                    <a-col :span="12">
                        <div class="format-settings">
                            <strong>서식 설정 : </strong>
                            <div class="format-settings-text">
                                <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                                <span class="style-note">본 설정으로 적용된 서식으로 출력 및
                                    메일발송 됩니다.</span>
                            </div>
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div class="created-date">
                            <label class="lable-item">영수일 :</label>
                            <date-time-box width="150px"
                                v-model:valueDate="valueDefaultIncomeBusiness.input.receiptDate"></date-time-box>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <label class="lable-item">소득자보관용</label>
                        <switch-basic style="width: 120px;" v-model:valueSwitch="valueSwitch" :textCheck="'소득자보관용'"
                            :textUnCheck="'지급자 보관용'" />
                    </a-col>
                </a-row>
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" @exporting="onExporting" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true"
                    @selection-changed="selectionChanged">
                    <DxToolbar>
                        <DxItem template="send-group-mail" />
                        <DxItem template="send-group-print" />
                    </DxToolbar>
                    <template #send-group-mail>
                        <div class="custom-mail-group">
                            <DxButton @click="actionOpenPopupEmailMulti">
                                <img src="@/assets/images/emailGroup.png" alt="" style="width: 33px;" />
                            </DxButton>
                        </div>
                    </template>
                    <template #send-group-print>
                        <div class="custom-mail-group">
                            <DxButton @click="onPrintGroup">
                                <img src="@/assets/images/printGroup.png" alt=""
                                    style="width: 35px; margin-right: 3px; cursor: pointer" />
                            </DxButton>
                        </div>
                    </template>
                    <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
                    <DxColumn :width="250" caption="성명 (상호)" cell-template="tag" />
                    <template #tag="{ data }" class="custom-action">
                        <div class="custom-action">
                            <employee-info :idEmployee="data.data.employee.employeeId" :name="data.data.employee.name"
                                :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
                                :foreigner="data.data.employee.foreigner" :checkStatus="false" />
                        </div>
                    </template>
                    <DxColumn caption="주민등록번호" data-field="employee.residentId" />
                    <DxColumn caption="소득부분" cell-template="grade-cell" :width="200" />
                    <template #grade-cell="{ data }" class="custom-action">
                        <income-type :typeCode="data.data.employee.incomeTypeCode"
                            :typeName="data.data.employee.incomeTypeName"></income-type>
                    </template>
                    <DxColumn caption="지급총액" data-field="paymentAmount" :format="amountFormat" />
                    <DxColumn caption="원천징수세액 소득세" data-field="withholdingIncomeTax" :format="amountFormat" />
                    <DxColumn caption="원천징수세액 지방소득세" data-field="withholdingLocalIncomeTax" :format="amountFormat" />
                    <DxColumn caption="원천징수세액 계" data-field="employee.withholdingRuralSpecialTax"
                        :format="amountFormat" />
                    <DxSummary>
                        <DxTotalItem column="성명 (상호)" summary-type="count" display-format="전체: {0}" />
                        <DxTotalItem column="지급총액" summary-type="sum" display-format="지급총액합계: {0}"
                            value-format="#,###" />
                        <DxTotalItem column="원천징수세액 소득세" summary-type="sum" display-format="원천징수세액 소득세합계: {0}"
                            value-format="#,###" />
                        <DxTotalItem column="원천징수세액 지방소득세" summary-type="sum" display-format="원천징수세액 지방소득세합계: {0}"
                            value-format="#,###" />
                        <DxTotalItem column="원천징수세액 계" summary-type="sum" display-format="원천징수세액 계합계: {0}"
                            value-format="#,###" />
                    </DxSummary>
                    <DxColumn :width="80" cell-template="pupop" />
                    <template #pupop="{ data }" class="custom-action">
                        <div class="custom-action" style="text-align: center;">
                            <img @click="actionOpenPopupEmailSingle(data.data)" src="@/assets/images/email.svg" alt=""
                                style="width: 25px; margin-right: 3px;" />
                            <img @click="actionPrint(data.data)" src="@/assets/images/print.svg" alt=""
                                style="width: 25px;" />
                        </div>
                    </template>
                </DxDataGrid>
                <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="onCloseEmailSingleModal"
                    :data="popupDataEmailSingle" />
                <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="onCloseEmailMultiModal"
                    :data="popupDataEmailMulti" :emailUserLogin="emailUserLogin" />
            </div>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import notification from "@/utils/notification";
import { useQuery } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
    DxToolbar,
    DxItem,
    DxTotalItem,
    DxSummary,
} from "devextreme-vue/data-grid";
import { companyId, onExportingCommon, userId } from "@/helpers/commonFunction";
import dayjs, { Dayjs } from 'dayjs';
import queries from "@/graphql/queries/PA/PA6/PA630/index";
import EmailSinglePopup from "./components/EmailSinglePopup.vue";
import EmailMultiPopup from "./components/EmailMultiPopup.vue";
import queriesGetUser from "@/graphql/queries/BF/BF2/BF210/index";

export default defineComponent({
    components: {
        DxSummary,
        DxButton,
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection,
        DxExport,
        DxSearchPanel,
        DxTotalItem,
        DxToolbar,
        DxItem,
        EmailSinglePopup,
        EmailMultiPopup
    },
    setup() {
        const valueSwitch = ref(true);
        const popupDataEmailSingle = ref({})
        const popupDataEmailMulti = ref({})
        const dataSelect = ref<any>([])
        const store = useStore();

        const globalYear = computed(() => store.state.settings.globalYear);
        const trigger = ref<boolean>(true);
        const triggerPrint = ref<boolean>(false);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const modalEmailSingle = ref(false)
        const modalEmailMulti = ref(false)
        const dataSource: any = ref({})
        const amountFormat = ref({ currency: 'VND', useGrouping: true })
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        });
        const valueDefaultIncomeBusiness = ref({
            companyId: companyId,
            input: {
                imputedYear: globalYear,
                type: 1,
                receiptDate: parseInt(dayjs().format('YYYYMMDD')),
            },
            employeeKeys: [{
                employeeId: 0,
                incomeTypeCode: ""
            }]
        });
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.searchIncomeBusinessWithholdingReceipts, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        const {
            refetch,
            result: resultPrint
        } = useQuery(queries.getIncomeBusinessWithholdingReceiptReportViewUrl, valueDefaultIncomeBusiness, () => ({
            enabled: triggerPrint.value,
            fetchPolicy: "no-cache",
        }));
        watch(resultPrint, (value) => {
            if (value) {
                window.open(value.getIncomeBusinessWithholdingReceiptReportViewUrl)
                triggerPrint.value = false
            }
        });
        const onExporting = (e: { component: any; cancel: boolean }) => {
            onExportingCommon(e.component, e.cancel, "계약정보관리&심사");
        };
        const actionOpenPopupEmailSingle = (data: any) => {
            popupDataEmailSingle.value = {
                companyId: companyId,
                input: {
                    imputedYear: globalYear,
                    type: valueDefaultIncomeBusiness.value.input.type,
                    receiptDate: valueDefaultIncomeBusiness.value.input.receiptDate,
                },
                employeeInputs: {
                    senderName: sessionStorage.getItem("username"),
                    receiverName: data.employee.name,
                    receiverAddress: data.employee.email,
                    employeeId: data.employee.employeeId,
                    incomeTypeCode: data.employee.incomeTypeCode
                }
            }
            modalEmailSingle.value = true
        }
        const onCloseEmailSingleModal = () => {
            modalEmailSingle.value = false
        }
        const onCloseEmailMultiModal = () => {
            modalEmailMulti.value = false
        }

        const actionOpenPopupEmailMulti = () => {
            if (dataSelect.value.length) {
                popupDataEmailMulti.value = {
                    companyId: companyId,
                    input: {
                        imputedYear: globalYear,
                        type: valueDefaultIncomeBusiness.value.input.type,
                        receiptDate: valueDefaultIncomeBusiness.value.input.receiptDate,
                    },
                    employeeInputs: dataSelect.value
                }
                modalEmailMulti.value = true
            } else {
                notification('error', '항목을 최소 하나 이상 선택해야합니다')
            }
        }
        const onPrintGroup = () => {
            if (dataSelect.value.length) {
                var array: any = [];
                dataSelect.value.map((val: any) => {
                    array.push({
                        employeeId: val.employeeId,
                        incomeTypeCode: val.incomeTypeCode
                    })
                })
                valueDefaultIncomeBusiness.value.employeeKeys = array
                triggerPrint.value = true;
            } else {
                notification('error', '항목을 최소 하나 이상 선택해야합니다')
            }
        };
        const selectionChanged = (data: any) => {
            dataSelect.value = []
            data.selectedRowKeys.forEach((data: any) => {
                dataSelect.value.push({
                    senderName: sessionStorage.getItem("username"),
                    receiverName: data.employee.name,
                    receiverAddress: data.employee.email,
                    employeeId: data.employee.employeeId,
                    incomeTypeCode: data.employee.incomeTypeCode
                })
            })
        }
        const {
            onResult: onResultUserInf
        } = useQuery(queriesGetUser.getUser, { id: userId }, () => ({
            fetchPolicy: "no-cache",
        }));
        const emailUserLogin = ref('')
        onResultUserInf(e => {
            emailUserLogin.value = e.data.getUser.email
        })

        watch(result, (value) => {
            if (value) {
                dataSource.value = value.searchIncomeBusinessWithholdingReceipts;
                trigger.value = false;
            }
        });
        watch(valueSwitch, (newValue) => {
            if (newValue) {
                valueDefaultIncomeBusiness.value.input.type = 1
            } else {
                valueDefaultIncomeBusiness.value.input.type = 2
            }
        });

        const searching = () => {
            trigger.value = true;
            refetchData();
        };

        const actionPrint = (data: any) => {
            valueDefaultIncomeBusiness.value.employeeKeys = [
                { employeeId: data.employee.employeeId, incomeTypeCode: data.employee.incomeTypeCode }
            ]
            triggerPrint.value = true;
        }

        return {
            valueDefaultIncomeBusiness,
            valueSwitch,
            loading,
            popupDataEmailSingle,
            popupDataEmailMulti,
            actionOpenPopupEmailSingle,
            actionOpenPopupEmailMulti,
            searching,
            globalYear,
            dataSource,
            move_column,
            colomn_resize,
            onExporting,
            modalEmailSingle,
            modalEmailMulti,
            onCloseEmailSingleModal,
            onCloseEmailMultiModal,
            selectionChanged,
            emailUserLogin,
            actionPrint, onPrintGroup,
            amountFormat,
        };
    },
});
</script>








<style lang="scss" scoped src="./style/style.scss" />
