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
                                <InfoCircleFilled /> 본 설정으로 적용된 서식으로 출력 및
                                메일발송 됩니다.
                            </div>
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div class="created-date">
                            <label class="lable-item">영수일 :</label>
                            <date-time-box width="150px" v-model:valueDate="valueDefaultIncomeBusiness.input.receiptDate"></date-time-box>
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
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" @exporting="onExporting" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <!-- <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                    <DxExport :enabled="true" :allow-export-selected-data="true" /> -->
                    <!-- <DxToolbar>
                        <DxItem name="searchPanel" />
                        <DxItem name="exportButton" />
                        <DxItem name="groupPanel" />
                        <DxItem name="addRowButton" show-text="always" />
                        <DxItem name="columnChooserButton" />
                    </DxToolbar> -->
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
                    <DxColumn caption="소득부분" cell-template="grade-cell" :width="150"/>
                    <template #grade-cell="{ data }" class="custom-action">
                        <income-type :typeCode="data.data.employee.incomeTypeCode" :typeName="data.data.employee.incomeTypeName" ></income-type>
                    </template>
                    <DxColumn caption="지급총액" data-field="paymentAmount" />
                    <DxColumn caption="원천징수세액 소득세" data-field="withholdingIncomeTax" />
                    <DxColumn caption="원천징수세액 지방소득세" data-field="withholdingLocalIncomeTax" />
                    <DxColumn caption="원천징수세액 계" data-field="employee.withholdingRuralSpecialTax" />
                    <DxColumn :width="80" cell-template="pupop" />
                    <template #pupop="{ data }" class="custom-action">
                        <div class="custom-action" style="text-align: center;">
                            <img @click="actionOpenPopupEmailSingle(data.data)" src="../../../../assets/images/email.svg" alt="" 
                            style="width: 25px; margin-right: 3px;" />
                            <img src="../../../../assets/images/print.svg" alt="" style="width: 25px;" />
                        </div>
                    </template>
                </DxDataGrid>
                <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="onCloseEmailSingleModal" :data="popupData" />
            </div>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import { useQuery } from "@vue/apollo-composable";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
    DxToolbar,
    DxItem,
} from "devextreme-vue/data-grid";
import {
    companyId,
    onExportingCommon,
} from "../../../../helpers/commonFunction";
import queries from "../../../../graphql/queries/PA/PA6/PA630/index";
import EmailSinglePopup from "./components/EmailSinglePopup.vue";

export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection,
        DxExport,
        DxSearchPanel,
        DxToolbar,
        DxItem,
        InfoCircleFilled,
        EmailSinglePopup,
    },
    setup() {
        const valueSwitch = ref(true);
        const popupData = ref({})
        const store = useStore();

        const globalYear = computed(() => store.state.settings.globalYear);
        const trigger = ref<boolean>(true);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const modalEmailSingle = ref(false)
        const dataSource = ref([
            {
                paymentAmount: 2,
                withholdingIncomeTax: 5,
                withholdingLocalIncomeTax: 20,
                employee: {
                    type: 1,
                    employeeId: 40,
                    incomeTypeCode: '23',
                    name: 'hihi',
                    email: 'khiem@gmail.com',
                    foreigner: true,
                    residentIdValidity: true,
                    status: 1,
                    residentId: '23',
                    incomeTypeName: 'hahahha'
                }
            }
        ]);
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
        const onExporting = (e: { component: any; cancel: boolean }) => {
            onExportingCommon(e.component, e.cancel, "계약정보관리&심사");
        };
        const actionOpenPopupEmailSingle = (data: any) => {
            modalEmailSingle.value = true
            popupData.value = data
        }
        const onCloseEmailSingleModal = () => {
            modalEmailSingle.value = false
        }

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

        const sendMail = (sendType: string) => {
            alert(sendType);
        }
        return {
            valueDefaultIncomeBusiness,
            valueSwitch,
            loading,
            popupData,
            actionOpenPopupEmailSingle,
            searching,
            globalYear,
            dataSource,
            sendMail,
            move_column,
            colomn_resize,
            onExporting,
            modalEmailSingle,
            onCloseEmailSingleModal,
        };
    },
});
</script>
  

<style lang="scss" scoped src="./style/style.scss" />
  