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
                <a-row style="margin-bottom: 20px;">
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
                <a-row style="margin-bottom: 20px;">
                    <a-col :span="24">
                        <label class="lable-item">소득자보관용</label>
                        <switch-basic style="width: 120px;" v-model:valueSwitch="valueSwitch" :textCheck="'소득자보관용'"
                            :textUnCheck="'지급자 보관용'" />
                    </a-col>
                </a-row>
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource.employee"
                    :show-borders="true" @exporting="onExporting" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true"
                    @selection-changed="selectionChanged">
                    <!-- <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                    <DxExport :enabled="true" :allow-export-selected-data="true" /> -->
                    <DxToolbar>
                        <!-- <DxItem name="searchPanel" />
                        <DxItem name="exportButton" />
                        <DxItem name="groupPanel" />
                        <DxItem name="addRowButton" show-text="always" />
                        <DxItem name="columnChooserButton" /> -->
                        <DxItem template="send-group-mail" />
                    </DxToolbar>
                    <template #send-group-mail>
                        <div class="custom-mail-group">
                            <DxButton @click="actionOpenPopupEmailMulti">
                                <img src="@/assets/images/emailGroup.png" alt="" style="width: 33px;" />
                            </DxButton>
                        </div>
                    </template>
                    <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
                    <DxColumn :width="250" caption="성명 (상호)" cell-template="tag" />
                    <template #tag="{ data }" class="custom-action">
                        <div class="custom-action">
                            <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                :idCardNumber="data.data.residentId" :status="data.data.status"
                                :foreigner="data.data.foreigner" :checkStatus="false" />
                        </div>
                    </template>
                    <DxColumn caption="주민등록번호" data-field="residentId" />
                    <DxColumn caption="소득부분" cell-template="grade-cell" :width="150" />
                    <template #grade-cell="{ data }" class="custom-action">
                        <income-type :typeCode="data.data.incomeTypeCode"
                            :typeName="data.data.incomeTypeName"></income-type>
                    </template>
                    <DxColumn caption="지급총액" data-field="paymentAmount" />
                    <DxColumn caption="원천징수세액 소득세" data-field="withholdingIncomeTax" />
                    <DxColumn caption="원천징수세액 지방소득세" data-field="withholdingLocalIncomeTax" />
                    <DxColumn caption="원천징수세액 계" data-field="withholdingRuralSpecialTax" />
                    <DxSummary>
                        <DxTotalItem :customize-text="customizeTotal" show-in-column="성명 (상호)" />
                        <DxTotalItem :customize-text="customizeTotalTaxPay" show-in-column="과세소득" />
                        <DxTotalItem :customize-text="customizeTotalTaxfreePay" show-in-column="비과세소득" />
                        <DxTotalItem :customize-text="customizeIncomeTax" column="withholdingIncomeTax" />
                        <DxTotalItem :customize-text="customizeDateLocalIncomeTax" column="withholdingLocalIncomeTax" />
                    </DxSummary>
                    <DxColumn :width="80" cell-template="pupop" />
                    <template #pupop="{ data }" class="custom-action">
                        <div class="custom-action" style="text-align: center;">
                            <img @click="actionOpenPopupEmailSingle(data.data)"
                                src="@/assets/images/email.svg" alt=""
                                style="width: 25px; margin-right: 3px;" />
                            <img @click="actionPrint(data.data)" src="@/assets/images/print.svg" alt="" style="width: 25px;" />
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
    DxSummary,
} from "devextreme-vue/data-grid";
import {
    companyId,
    onExportingCommon,
    userId,
} from "@/helpers/commonFunction";
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
        const dataSource = ref(
            {
                paymentAmount: 2,
                withholdingIncomeTax: 5,
                withholdingLocalIncomeTax: 20,
                employee: [{
                    type: 1,
                    employeeId: 40,
                    incomeTypeCode: 'sfhahf',
                    name: 'hihi',
                    email: 'khiem@gmail.com',
                    foreigner: true,
                    residentIdValidity: true,
                    status: 1,
                    residentId: 'g32rsd',
                    incomeTypeName: 'hahahha'
                },
                {
                    type: 1,
                    employeeId: 40,
                    incomeTypeCode: 'fsa34',
                    name: 'kkkkkkk',
                    email: '',
                    foreigner: true,
                    residentIdValidity: true,
                    status: 1,
                    residentId: 'ge234',
                    incomeTypeName: 'hhhhhh'
                }]
            },
        );
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        });
        const valueDefaultIncomeBusiness = ref({
            companyId: companyId,
            input: {
                imputedYear: globalYear,
                type: 1,
                receiptDate: new Date().toJSON().slice(0, 10),
            },
            employeeKeys: {
                employeeId: 0,
                incomeTypeCode: ""
            }
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
            refetch
        } = useQuery(queries.getIncomeBusinessWithholdingReceiptReportViewUrl, valueDefaultIncomeBusiness, () => ({
            enabled: triggerPrint.value,
            fetchPolicy: "no-cache",
        }));
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
                    receiverName: data.name,
                    receiverAddress: data.email,
                    employeeId: data.employeeId,
                    incomeTypeCode: data.incomeTypeCode
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
        }

        const selectionChanged = (data: any) => {
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
                // dataSource.value = value.searchIncomeBusinessWithholdingReceipts;
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
            valueDefaultIncomeBusiness.value.employeeKeys.employeeId = data.employee.employeeId
            valueDefaultIncomeBusiness.value.employeeKeys.incomeTypeCode = data.employee.incomeTypeCode
            triggerPrint.value = true;
        }

        const customizeIncomeTax = () => {
            // return dataSource.value.withholdingLocalIncomeTax
        }
        const customizeDateLocalIncomeTax = () => {
            // return dataSource.value.withholdingIncomeTax
        }
        const customizeTotal = () => {
            return dataSource.value.employee.length
        }
        const customizeTotalTaxfreePay = () => {
            // return dataSource.value.totalTaxfreePay
        }
        const customizeTotalTaxPay = () => {
            // return dataSource.value.totalTaxPay
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
            actionPrint,
            customizeTotal,
            customizeIncomeTax,
            customizeDateLocalIncomeTax,
            customizeTotalTaxPay,
            customizeTotalTaxfreePay,
        };
    },
});
</script>
  



<style lang="scss" scoped src="./style/style.scss" />
  