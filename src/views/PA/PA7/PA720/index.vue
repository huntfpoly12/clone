<template>
    <action-header title="기타소득자료입력" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false"
        :buttonSave="false" />
    <div id="pa-720" class="page-content">
        <a-row>
            <a-spin :spinning="loadingIncomeProcessExtras || isRunOnce" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="columnData"
                    :show-borders="true" :allow-column-reordering="move_column" key-expr="globalYear" :key="globalYear"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true"
                    :focused-row-enabled="true">
                    <DxScrolling mode="standard" show-scrollbar="always"/>
                    <DxColumn :caption="globalYear + '귀속월'" cell-template="imputed-year" />
                    <template #imputed-year>
                        <span>지급연월 </span>
                    </template>
                    <DxColumn caption="01" width="100px" cell-template="imputed-month1" />
                    <template #imputed-month1="{ data }">
                        <colorful-badge v-if="data.data.month_1" :value="data.data.month_1?.status"
                            :year="data.data.month_1?.paymentYear" :month="data.data.month_1?.paymentMonth"
                            :isUnder="month == 1" @click="showDetailSelected(data.data.month_1)" />
                        <div v-else @click="onAddMonth(1)">[+]</div>
                    </template>
                    <DxColumn caption="02" width="100px" cell-template="imputed-month2" />
                    <template #imputed-month2="{ data }">
                        <colorful-badge v-if="data.data.month_2" :value="data.data.month_2?.status"
                            :year="data.data.month_2?.paymentYear" :month="data.data.month_2?.paymentMonth"
                            @click="showDetailSelected(data.data.month_2)" :isUnder="month == 2" />
                        <div v-else @click="onAddMonth(2)">[+]</div>
                    </template>
                    <DxColumn caption="03" width="100px" cell-template="imputed-month3" />
                    <template #imputed-month3="{ data }">
                        <colorful-badge v-if="data.data.month_3" :value="data.data.month_3?.status"
                            :year="data.data.month_3?.paymentYear" :month="data.data.month_3?.paymentMonth"
                            @click="showDetailSelected(data.data.month_3)" :isUnder="month == 3" />
                        <div v-else @click="onAddMonth(3)">[+]</div>
                    </template>
                    <DxColumn caption="04" width="100px" cell-template="imputed-month4" />
                    <template #imputed-month4="{ data }">
                        <colorful-badge v-if="data.data.month_4" :value="data.data.month_4?.status"
                            :year="data.data.month_4?.paymentYear" :month="data.data.month_4?.paymentMonth"
                            @click="showDetailSelected(data.data.month_4)" :isUnder="month == 4" />
                        <div v-else @click="onAddMonth(4)">[+]</div>
                    </template>
                    <DxColumn caption="05" width="100px" cell-template="imputed-month5" />
                    <template #imputed-month5="{ data }">
                        <colorful-badge v-if="data.data.month_5" :value="data.data.month_5?.status"
                            :year="data.data.month_5?.paymentYear" :month="data.data.month_5?.paymentMonth"
                            @click="showDetailSelected(data.data.month_5)" :isUnder="month == 5" />
                        <div v-else @click="onAddMonth(5)">[+]</div>
                    </template>
                    <DxColumn caption="06" width="100px" cell-template="imputed-month6" />
                    <template #imputed-month6="{ data }">
                        <colorful-badge v-if="data.data.month_6" :value="data.data.month_6?.status"
                            :year="data.data.month_6?.paymentYear" :month="data.data.month_6?.paymentMonth"
                            @click="showDetailSelected(data.data.month_6)" :isUnder="month == 6" />
                        <div v-else @click="onAddMonth(6)">[+]</div>
                    </template>
                    <DxColumn caption="07" width="100px" cell-template="imputed-month7" />
                    <template #imputed-month7="{ data }">
                        <colorful-badge v-if="data.data.month_7" :value="data.data.month_7?.status"
                            :year="data.data.month_7?.paymentYear" :month="data.data.month_7?.paymentMonth"
                            @click="showDetailSelected(data.data.month_7)" :isUnder="month == 7" />
                        <div v-else @click="onAddMonth(7)">[+]</div>
                    </template>
                    <DxColumn caption="08" width="100px" cell-template="imputed-month8" />
                    <template #imputed-month8="{ data }">
                        <colorful-badge v-if="data.data.month_8" :value="data.data.month_8?.status"
                            :year="data.data.month_8?.paymentYear" :month="data.data.month_8?.paymentMonth"
                            @click="showDetailSelected(data.data.month_8)" :isUnder="month == 8" />
                        <div v-else @click="onAddMonth(8)">[+]</div>
                    </template>
                    <DxColumn caption="09" width="100px" cell-template="imputed-month9" />
                    <template #imputed-month9="{ data }">
                        <colorful-badge v-if="data.data.month_9" :value="data.data.month_9?.status"
                            :year="data.data.month_9?.paymentYear" :month="data.data.month_9?.paymentMonth"
                            @click="showDetailSelected(data.data.month_9)" :isUnder="month == 9" />
                        <div v-else @click="onAddMonth(9)">[+]</div>
                    </template>
                    <DxColumn caption="10" width="100px" cell-template="imputed-month10" />
                    <template #imputed-month10="{ data }">
                        <colorful-badge v-if="data.data.month_10" :value="data.data.month_10?.status"
                            :year="data.data.month_10?.paymentYear" :month="data.data.month_10?.paymentMonth"
                            @click="showDetailSelected(data.data.month_10)" :isUnder="month == 10" />
                        <div v-else @click="onAddMonth(10)">[+]</div>
                    </template>
                    <DxColumn caption="11" width="100px" cell-template="imputed-month11" />
                    <template #imputed-month11="{ data }">
                        <colorful-badge v-if="data.data.month_11" :value="data.data.month_11?.status"
                            :year="data.data.month_11?.paymentYear" :month="data.data.month_11?.paymentMonth"
                            @click="showDetailSelected(data.data.month_11)" :isUnder="month == 11" />
                        <div v-else @click="onAddMonth(11)">[+]</div>
                    </template>
                    <DxColumn caption="12" width="100px" cell-template="imputed-month12" />
                    <template #imputed-month12="{ data }">
                        <colorful-badge v-if="data.data.month_12" :value="data.data.month_12?.status"
                            :year="data.data.month_12?.paymentYear" :month="data.data.month_12?.paymentMonth"
                            @click="showDetailSelected(data.data.month_12)" :isUnder="month == 12" />
                        <div v-else @click="onAddMonth(12)">[+]</div>
                    </template>
                    <DxMasterDetail :enabled="true" template="row-detail" />
                    <template #row-detail="{ data }">
                        <div class="table-detail">
                            <DxDataGrid key-expr="id" :data-source="IncomeProcessExtrasCustom" :show-borders="false"
                                :column-auto-width="true" :allow-column-reordering="move_column"
                                :show-column-headers="false" :allow-column-resizing="colomn_resize"
                                :focused-row-enabled="true">
                                <DxScrolling mode="standard" show-scrollbar="always"/>
                                <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string" />
                                <template #col-first="{ data }">
                                    <b>{{ data.data.name }}</b><br />
                                </template>
                                <DxColumn caption="1" width="100px" cell-template="month-1" />
                                <template #month-1="{ data }">
                                    <div class="hover-underlined" @click="showDetailSelected(data.data.month1)"
                                        v-if="data.data.month1">
                                        {{ data.data.month1.value }}
                                    </div>
                                </template>
                                <DxColumn caption="2" width="100px" cell-template="month-2" />
                                <template #month-2="{ data }">
                                    <div class="hover-underlined" @click="showDetailSelected(data.data.month2)"
                                        v-if="data.data.month2">
                                        {{ data.data.month2.value }}
                                    </div>
                                </template>
                                <DxColumn caption="3" width="100px" cell-template="month-3" />
                                <template #month-3="{ data }">
                                    <div class="hover-underlined" @click="showDetailSelected(data.data.month3)"
                                        v-if="data.data.month3">
                                        {{ data.data.month3.value }}
                                    </div>
                                </template>
                                <DxColumn caption="4" width="100px" cell-template="month-4" />
                                <template #month-4="{ data }">
                                    <div class="hover-underlined" @click="showDetailSelected(data.data.month4)"
                                        v-if="data.data.month4">
                                        {{ data.data.month4.value }}
                                    </div>
                                </template>
                                <DxColumn caption="5" width="100px" cell-template="month-5" />
                                <template #month-5="{ data }">
                                    <div class="hover-underlined" @click="showDetailSelected(data.data.month5)"
                                        v-if="data.data.month5">
                                        {{ data.data.month5.value }}
                                    </div>
                                </template>
                                <DxColumn caption="6" width="100px" cell-template="month-6" />
                                <template #month-6="{ data }">
                                    <div class="hover-underlined" @click="showDetailSelected(data.data.month6)"
                                        v-if="data.data.month6">
                                        {{ data.data.month6.value }}
                                    </div>
                                </template>
                                <DxColumn caption="7" width="100px" cell-template="month-7" />
                                <template #month-7="{ data }">
                                    <div class="hover-underlined" @click="showDetailSelected(data.data.month7)"
                                        v-if="data.data.month7">
                                        {{ data.data.month7.value }}
                                    </div>
                                </template>
                                <DxColumn caption="8" width="100px" cell-template="month-8" />
                                <template #month-8="{ data }">
                                    <div class="hover-underlined" @click="showDetailSelected(data.data.month8)"
                                        v-if="data.data.month8">
                                        {{ data.data.month8.value }}
                                    </div>
                                </template>
                                <DxColumn caption="9" width="100px" cell-template="month-9" />
                                <template #month-9="{ data }">
                                    <div class="hover-underlined" @click="showDetailSelected(data.data.month9)"
                                        v-if="data.data.month9">
                                        {{ data.data.month9.value }}
                                    </div>
                                </template>
                                <DxColumn caption="10" width="100px" cell-template="month-10" />
                                <template #month-10="{ data }">
                                    <div class="hover-underlined" @click="showDetailSelected(data.data.month10)"
                                        v-if="data.data.month10">
                                        {{ data.data.month10.value }}
                                    </div>
                                </template>
                                <DxColumn caption="11" width="100px" cell-template="month-11" />
                                <template #month-11="{ data }">
                                    <div class="hover-underlined" @click="showDetailSelected(data.data.month11)"
                                        v-if="data.data.month11">
                                        {{ data.data.month11.value }}
                                    </div>
                                </template>
                                <DxColumn caption="12" width="100px" cell-template="month-12" />
                                <template #month-12="{ data }">
                                    <div class="hover-underlined" @click="showDetailSelected(data.data.month12)"
                                        v-if="data.data.month12">
                                        {{ data.data.month12.value }}
                                    </div>
                                </template>
                            </DxDataGrid>
                        </div>
                    </template>
                </DxDataGrid>
            </a-spin>
        </a-row>
        <a-row style="border: 1px solid #d7d7d7; padding: 10px; margin-top: 10px; justify-content: space-between">
            <a-col style="display: flex">
                <DxButton
                    :text="'귀' + inputDateTax" :disabled="!isColumnData"
                    :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
                <DxButton
                    :text="'지' + paymentDateTax" :disabled="!isColumnData"
                    :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" />
                <ProcessStatus v-model:valueStatus="statusParam.status"
                    @checkConfirm="mutateChangeIncomeProcessExtraStatus(statusParam)" />
            </a-col>
            <a-col style="display: inline-flex; align-items: center">
                <DxButton class="ml-4" icon="plus" @click="addItem" :disabled="!isColumnData" />
                <DxButton class="ml-3" @click="deleteItem" :disabled="!isColumnData">
                    <img style="width: 17px" src="@/assets/images/icon_delete.png" alt=""/>
                </DxButton>
                <DxButton @click="onSave" size="large" class="ml-4" :disabled="!isColumnData">
                    <SaveOutlined style="font-size: 17px" />
                </DxButton>

                <DxButton class="ml-4 d-flex" style="cursor: pointer" @click="modalHistory = true" :disabled="!isColumnData">
                    <a-tooltip placement="top">
                        <template #title>근로소득자료 변경이력</template>
                        <div class="text-center">
                            <HistoryOutlined style="font-size: 16px" />
                        </div>
                    </a-tooltip>
                </DxButton>
                <DxButton class="ml-4" style="cursor: pointer" @click="modalHistoryStatus = true" :disabled="!isColumnData">
                    <a-tooltip placement="top">
                        <template #title>근로소득 마감상태 변경이력</template>
                        <div class="text-center">
                            <img src="@/assets/images/icon_status_history.png" alt="" class="icon_status_history" />
                        </div>
                    </a-tooltip>
                </DxButton>
                <DxButton @click="editItem" class="ml-4 custom-button-checkbox" :disabled="!isColumnData">
                    <div class="d-flex-center">
                        <checkbox-basic size="13" :valueCheckbox="true" disabled="true" />
                        <span class="fz-12 pl-5">지급일변경</span>
                    </div>
                </DxButton>
                <div class="custom-select-tab ml-4">
                    <button class="button-open-tab"
                        @click="openTab({ name: '기타소득자등록', url: '/dashboard/pa-710', id: 'pa-710' })">기타소득자등록</button>
                </div>
            </a-col>
        </a-row>
        <a-row class="content-btm">
            <a-col :span="13" class="custom-layout">
                <TaxPayInfo ref="taxPayRef" :dataCallTableDetail="incomeExtrasParams" @editTax="editTax"
                :changeFommDone="changeFommDone" :isRunOnce="isRunOnce" />
            </a-col>
            <a-col :span="11" class="custom-layout" style="padding-right: 0px">
                <FormTaxPayInfo ref="formTaxRef" :editTax="editTaxParam" :isLoadNewForm="isLoadNewForm" :isColumnData="isColumnData"
                    @changeFommDone="onFormDone" :key="resetFormNum" :addNewIncomeExtra="incomeExtrasParams.processKey" />
            </a-col>
        </a-row>
    </div>
    <DeletePopup @delDone="changeFommDone++" :modalStatus="modalDelete" @closePopup="actionDeleteSuccess"
        :data="deleteIncomeExtrasParam" />

    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="incomeExtrasParams.processKey"
        title="변경이력" typeHistory="pa-720" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
        :data="incomeExtrasParams.processKey" title="변경이력" typeHistory="pa-720-status" />
    <EditPopup :modalStatus="modalEdit" @closePopup="actionEditDaySuccess" :data="changeIncomeExtraPaymentDayParam" />
    <CopyMonth :modalStatus="modalCopy" :month="dataModalCopy" @closePopup="modalCopy = false" :dateType="dateType"
        @loadingTableInfo="onLoadingTable" @dataAddIncomeProcess="onAddIncomeProcess" />
    <PopupMessage :modalStatus="popupAddStatus" @closePopup="popupAddStatus = false" :typeModal="'confirm'"
        :title="titleModalConfirm" :content="''" :cancelText="'아니요 '" :okText="'네 '" @checkConfirm="onPopupComfirm"
        :isConfirmIcon="false" />
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from 'vue';
import DxButton from 'devextreme-vue/button';
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { companyId, openTab } from '@/helpers/commonFunction';
import { DxDataGrid, DxColumn, DxScrolling,DxMasterDetail } from 'devextreme-vue/data-grid';
import queries from '@/graphql/queries/PA/PA7/PA720/index';
import DeletePopup from './components/Popup/DeletePopup.vue';
import EditPopup from './components/Popup/EditPopup.vue';
import ProcessStatus from '@/components/common/ProcessStatus.vue';
import TaxPayInfo from './components/TaxPayInfo.vue';
import FormTaxPayInfo from './components/FormTaxPayInfo.vue';
import mutations from '@/graphql/mutations/PA/PA7/PA720/index';
import notification from '@/utils/notification';
import { HistoryOutlined, SaveOutlined } from '@ant-design/icons-vue';
import CopyMonth from './components/Popup/CopyMonth.vue';
import { DownOutlined } from '@ant-design/icons-vue';
import DxCheckBox from 'devextreme-vue/check-box';
import { dataActionUtils } from './utils/index';
import queriesHolding from "@/graphql/queries/CM/CM130/index";
export default defineComponent({
    components: {
        DxMasterDetail,
        DxDataGrid,
        DxScrolling,
        DxColumn,
        DxButton,
        DeletePopup,
        EditPopup,
        ProcessStatus,
        TaxPayInfo,
        FormTaxPayInfo,
        HistoryOutlined,
        CopyMonth,
        DownOutlined,
        DxCheckBox,
        SaveOutlined,
    },
    setup() {
        const statusParam = ref<any>({ status: 10 });
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear);
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const trigger = ref<boolean>(true);
        const colomn_resize = computed(() => store.state.settings.colomn_resize); 
        const modalDelete = ref<boolean>(false);
        const modalEdit = ref<boolean>(false);
        const modalHistory = ref<boolean>(false);
        const modalHistoryStatus = ref<boolean>(false);
        const originData = reactive({
            companyId: companyId,
            imputedYear: globalYear.value,
        });
        const editTaxParam = ref<any>({});
        const changeFommDone = ref(1);
        const formTaxRef = ref();
        const resetFormNum = ref(1);
        const actionDeleteSuccess = () => {
            modalDelete.value = false;
        };
        const popupDataDelete: any = ref([]);
        const taxPayRef = ref();
        const deleteIncomeExtrasParam = ref<any>({});
        const changeIncomeExtraPaymentDayParam = ref<any>({ day: null });
        const incomeExtrasParams = reactive({
            companyId: companyId,
            processKey: {
                imputedYear: globalYear.value,
                imputedMonth: +dayjs().format('MM')+1,
                paymentYear: globalYear.value,
                paymentMonth: +dayjs().format('MM')+1,
            },
        });
        const modalCopy = ref<boolean>(false);
        const dataModalCopy = ref<number>(1);
        const popupAddStatus = ref<boolean>(false);
        const inputDateTax = computed(()=> {
            if(isColumnData.value){
                return incomeExtrasParams.processKey?.imputedYear + '-' + formatMonth(incomeExtrasParams.processKey?.imputedMonth)
            }
            return '';
        })
        const paymentDateTax = computed(()=> {
            if(isColumnData.value){
                return incomeExtrasParams.processKey?.paymentYear + '-' + formatMonth(incomeExtrasParams.processKey?.paymentMonth)
            }
            return '';
        })
        // ======================= GRAPQL ================================
        const {
            refetch: refetchIncomeProcessExtras,
            loading: loadingIncomeProcessExtras,
            onResult: onResultIncomeProcessExtras,
        } = useQuery(queries.getIncomeProcessExtras, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: 'no-cache',
        }));
        const { mutate: mutateChangeIncomeProcessExtraStatus, onDone: onDoneChangeIncomeProcessExtraStatusDone } = useMutation(mutations.changeIncomeProcessExtraStatus);
        // ======================= WATCH ==================================
        watch(changeFommDone, () => {
            trigger.value = true;
            refetchIncomeProcessExtras();
        });
        // ======================= form ================================
        const deleteItem = () => {
            modalDelete.value = true;
            deleteIncomeExtrasParam.value.incomeIds = taxPayRef.value.incomeIdDels;
            deleteIncomeExtrasParam.value.companyId = incomeExtrasParams.companyId;
            deleteIncomeExtrasParam.value.processKey = incomeExtrasParams.processKey;
        };
        const editItem = () => {
            modalEdit.value = true;
            changeIncomeExtraPaymentDayParam.value = taxPayRef.value.paymentData;
        };
        const resetForm = () => {
            resetFormNum.value++;
            formTaxRef.value.triggerIncomeExtra = false;
            formTaxRef.value.newDateLoading = false;
            setTimeout(() => {
                formTaxRef.value.isResetComponent = !formTaxRef.value.isResetComponent;
            }, 200);
        };
        //submit
        const isErrorFormPA720 = computed(() => store.getters['common/isErrorFormPA720']);
        const actionSaveTypePA720 = computed(() => store.getters['common/actionSaveTypePA720']);
        const onSubmit = () => {
            store.commit('common/actionSavePA720');
            setTimeout(() => {
                if (!isErrorFormPA720.value) {
                    isLoadNewForm.value = true;
                    taxPayRef.value.firsTimeRow = true;
                }
            }, 100);
        };
        const onSave = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
                // focusedRowKey.value = formState.employeeId
            } else {
            store.commit('common/actionSaveTypePA720', 1);
            onSubmit();
            }
        };
        const onFormDone = () => {
            changeFommDone.value++;
            formTaxRef.value.isEdit = true;
        };
        onDoneChangeIncomeProcessExtraStatusDone(() => {
            notification('success', `업데이트 완료!`);
            trigger.value = true;
            refetchIncomeProcessExtras();
        });
        const actionEditDaySuccess = (emit: String) => {
            if (emit == 'onDone') {
                taxPayRef.value.triggerDetail = true;
                taxPayRef.value.refetchIncomeExtras();
            }
            modalEdit.value = false;
        };
        const onAddMonth = (val: number) => {
            dataModalCopy.value = val;
            modalCopy.value = true;
            month.value = val;
        };
        const onLoadingTable = () => {
            trigger.value = true;
            refetchIncomeProcessExtras();
        };
        const onAddIncomeProcess = (emit: any) => {
            resetForm();
            incomeExtrasParams.processKey = { ...emit };
            columnData.value[0]['month_' + emit.imputedMonth] = emit
            columnData.value[0]['month_' + emit.imputedMonth].status = 10;
            isColumnData.value = true;
        };
        const addItem = () => {
            if (!formTaxRef.value.isEdit) {
                if (JSON.stringify(formTaxRef.value.dataAction.input) != JSON.stringify(dataActionUtils.input)) {
                    popupAddStatus.value = true;
                    titleModalConfirm.value = 'Do you want to reset your form?';
                }
            } else {
                resetForm();
            }
        };
        //does save when data and row change ?
        const titleModalConfirm = ref('Do you want to reset your form?');
        const onPopupComfirm = (e: any) => {
            if (e) {
                if (!isLoadNewForm.value) {
                    onSubmit();
                    store.commit('common/actionSaveTypePA720', 0);
                } else {
                    resetForm();
                }
            } else {
                isLoadNewForm.value = true;
            }
        };
        // enable load form when row change
        const isLoadNewForm = ref(false);
        const editTax = (emit: any, firsTimeRow: boolean) => {
            editTaxParam.value = emit;
            if (firsTimeRow) {
                isLoadNewForm.value = true;
                return;
            }
            let formInputInit: any;
            if (formTaxRef.value?.resultIncomeExtra?.getIncomeExtra != undefined) {
                let { employeeId, incomeTypeCode, paymentAmount, paymentDay, requiredExpenses, taxRate, withholdingIncomeTax, withholdingLocalIncomeTax } = formTaxRef.value?.resultIncomeExtra.getIncomeExtra;
                formInputInit = { paymentDay, employeeId, incomeTypeCode, paymentAmount, requiredExpenses, taxRate, withholdingIncomeTax, withholdingLocalIncomeTax };
            } else {
                formInputInit = store.state.common.formInputInit;
            }
            let formInputData = formTaxRef.value.dataAction.input;
            if(actionSaveTypePA720.value == 0) {
                
                if (JSON.stringify(formInputData) != JSON.stringify(formInputInit)) {
                    isLoadNewForm.value = false;
                    titleModalConfirm.value = '변경 내용을 저장하시겠습니까?';
                    popupAddStatus.value = true;
                }
            } 
        };
        //compute data function
        const checkLen = (text: String) => {
            if (text.length > 10) {
                return text.substring(0, 10) + '...';
            }
            return text;
        };
        const formatMonth = (month: number) => {
            if (month < 10) {
                return '0' + month;
            }
            return month;
        };
        // active tab
        const month = ref<number>(0);
        // fnc click month
        const showDetailSelected = (obj: any) => {
            taxPayRef.value.firsTimeRow = true;
            incomeExtrasParams.processKey.imputedMonth = obj?.imputedMonth;
            incomeExtrasParams.processKey.imputedYear = obj.imputedYear;
            incomeExtrasParams.processKey.paymentYear = obj.paymentYear;
            incomeExtrasParams.processKey.paymentMonth = obj.paymentMonth;
            statusParam.value = { ...incomeExtrasParams, status: obj.status };
            resetForm();
            month.value = obj.imputedMonth;
        };
        //custom data in top table
        const IncomeProcessExtrasCustom = ref<any>([]);
        let columnData = ref<any>([{
            globalYear: globalYear.value,
            hasData: false,
        }]);
        const isRunOnce = ref<boolean>(true);
        const toNumber = (num: any) => (!num ? '' : num);
            //columnData has data
        const isColumnData = ref<boolean>(false);
        onResultIncomeProcessExtras((res: any) => {
            let responeData = res.data?.getIncomeProcessExtras ?? [];
            columnData.value = [{
                globalYear: globalYear.value,
                hasData: false,
            }]
            IncomeProcessExtrasCustom.value = [
                { id: 1, name: '인원' },
                { id: 2, name: '지급액' },
                { id: 3, name: '소득세' },
                { id: 4, name: '지방소득세' },
                { id: 5, name: '공제총액' },
                { id: 6, name: '차인지급액' },
            ]
            if(responeData.length > 0) {
                columnData.value[0].hasData= true;
                responeData.forEach((val: any) => {
                    let dataAdd = {
                        imputedMonth: val.imputedMonth,
                        imputedYear: val.imputedYear,
                        paymentYear: val.paymentYear,
                        paymentMonth: val.paymentMonth,
                    };
                    IncomeProcessExtrasCustom.value[0]['month' + val.imputedMonth] = {
                        value: toNumber(val?.employeeStat?.employeeCount + val?.employeeStat?.retireEmployeeCount)?.toLocaleString('en-US', { currency: 'VND' }),
                        ...dataAdd,
                    };
                    IncomeProcessExtrasCustom.value[1]['month' + val?.imputedMonth] = {
                        value: val?.incomeStat?.incomePayment?.toLocaleString('en-US', {
                            currency: 'VND',
                        }),
                        ...dataAdd,
                    };
                    IncomeProcessExtrasCustom.value[2]['month' + val?.imputedMonth] = {
                        value: val?.incomeStat?.withholdingIncomeTax?.toLocaleString('en-US', {
                            currency: 'VND',
                        }),
                        ...dataAdd,
                    };
                    IncomeProcessExtrasCustom.value[3]['month' + val?.imputedMonth] = {
                        value: val?.incomeStat?.withholdingLocalIncomeTax?.toLocaleString('en-US', { currency: 'VND' }),
                        ...dataAdd,
                    };
                    IncomeProcessExtrasCustom.value[4]['month' + val?.imputedMonth] = {
                        value: toNumber(val?.incomeStat?.withholdingIncomeTax + val?.incomeStat?.withholdingLocalIncomeTax).toLocaleString('en-US', {
                            currency: 'VND',
                        }),
                        ...dataAdd,
                    };
                    IncomeProcessExtrasCustom.value[5]['month' + val?.imputedMonth] = {
                        value: val?.incomeStat?.actualPayment?.toLocaleString('en-US', {
                            currency: 'VND',
                        }),
                        ...dataAdd,
                    };
                    columnData.value[0]['month_' + val.imputedMonth] = val
                });
            }
            if (isRunOnce.value) {
                isRunOnce.value = false;
                if (columnData.value[0]['month_' + `${dayjs().month() + 1}`]) {
                    showDetailSelected(columnData.value[0]['month_' + `${dayjs().month() + 1}`]);
                }
            }
            if(!columnData.value[0].hasData) {
                showDetailSelected({
                    imputedMonth: dayjs().month() +1 ,
                    imputedYear: globalYear.value,
                    paymentMonth: dayjs().month() +1 ,
                    paymentYear: globalYear.value,
                })
            }
            isColumnData.value = columnData.value[0].hasData ? true : false;
            trigger.value = false;
        });
        watch(globalYear,(newVal)=> {
            originData.imputedYear=newVal;
            isRunOnce.value = true;
            incomeExtrasParams.processKey.imputedYear = globalYear.value;
            incomeExtrasParams.processKey.paymentYear = globalYear.value;
            trigger.value = true;
            refetchIncomeProcessExtras()
        })
        // get config to check default date type
        const dateType = ref<number>(1)
        const dataQuery = ref({ companyId: companyId, imputedYear: globalYear.value });
        const { result: resultConfig} = useQuery(
            queriesHolding.getWithholdingConfig,
            dataQuery,
            () => ({
                fetchPolicy: "no-cache",
            })
        );
        watch(resultConfig,(newVal)=> {
            dateType.value = newVal.paymentType;
        });
        return {
            statusParam,loadingIncomeProcessExtras,per_page,move_column,colomn_resize,modalDelete,popupDataDelete,modalEdit,globalYear,IncomeProcessExtrasCustom,columnData,incomeExtrasParams,editTaxParam,changeFommDone,formTaxRef,resetFormNum,taxPayRef,deleteIncomeExtrasParam,changeIncomeExtraPaymentDayParam,modalHistory,modalHistoryStatus,modalCopy,dataModalCopy,popupAddStatus,isRunOnce,month,isLoadNewForm,titleModalConfirm,isColumnData,
            onSubmit,deleteItem,editItem,checkLen,showDetailSelected,editTax,onFormDone,actionDeleteSuccess,onAddMonth,mutateChangeIncomeProcessExtraStatus,actionEditDaySuccess,onLoadingTable,onAddIncomeProcess,formatMonth,resetForm,openTab,onPopupComfirm,addItem,onSave,
            paymentDateTax, inputDateTax, dateType
        };
    },
});
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
