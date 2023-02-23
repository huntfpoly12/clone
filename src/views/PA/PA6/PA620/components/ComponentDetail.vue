<template>
    <div class="d-flex-center mt-10 title-action">
        <div>
            <DxButton :text="'귀' + inputDateTax" :disabled="isDisabledForm"
                :style="{ color: 'white', backgroundColor: 'gray' , height: $config_styles.HeightInput}" class="btn-date"  />
            <DxButton :text="'지' + paymentDateTax" :disabled="isDisabledForm"
                :style="{ color: 'white', backgroundColor: 'black' , height: $config_styles.HeightInput}" class="btn-date"/>
            <process-status v-model:valueStatus="statusButton" @checkConfirm="statusComfirm" v-if="!isDisabledForm" :disable="statusButton==30||statusButton==40"/>
        </div>
        <div class="d-flex">
            <DxButton class="ml-3" icon="plus" @click="openAddNewModal" :disabled="isDisabledForm || statusButton==30||statusButton==40" />
            <DxButton class="ml-3" icon="trash" @click="deleteItem" :disabled="isDisabledForm || statusButton==30||statusButton==40" />
            <DxButton @click="onSave" id="save-js-620" size="large" class="ml-4" :disabled="isDisabledForm || statusButton==30||statusButton==40">
                <SaveOutlined style="font-size: 17px" />
            </DxButton>
            <DxButton class="ml-4 d-flex" style="cursor: pointer" @click="modalHistory = true"
                :disabled="isDisabledForm">
                <a-tooltip placement="top">
                    <template #title>사업소득자료 변경이력</template>
                    <div style="text-align: center;" @click="onItemClick('history')">
                        <HistoryOutlined style="font-size: 16px" />
                    </div>
                </a-tooltip>
            </DxButton>
            <DxButton class="ml-4" style="cursor: pointer" @click="modalHistoryStatus = true"
                :disabled="isDisabledForm">
                <a-tooltip placement="top">
                    <template #title>사업소득 마감상태 변경이력</template>
                    <div style="text-align: center;" @click="onItemClick('historyEdit')">
                        <img src="@/assets/images/icon_status_history.png" alt="" class="icon_status_history" />
                    </div>
                </a-tooltip>
            </DxButton>
            <DxButton @click="editPaymentDate" class="ml-4 custom-button-checkbox" :disabled="isDisabledForm || statusButton==30||statusButton==40">
                <div class="d-flex-center">
                    <checkbox-basic :valueCheckbox="true" :disabled="true" />
                    <span class="fz-12 pl-5">지급일변경</span>
                </div>
            </DxButton>
            <div class="custom-select-tab ml-4">
                <button class="button-open-tab" @click="onItemClick('openTab')">사업소득자등록</button>
            </div>
        </div>
    </div>
    <a-row>
        <a-col :span="14" class="custom-layout">
            <a-spin :spinning="(loadingTableDetail || loadingCreated || loadingEdit || loadingOption)" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail"
                    :show-borders="true" key-expr="incomeId" :allow-column-reordering="move_column"
                    :onRowClick="onRowClick" :allow-column-resizing="colomn_resize" :column-auto-width="true"
                    :focused-row-enabled="true" @selection-changed="selectionChanged"
                    v-model:focused-row-key="focusedRowKey" ref="gridRefName">
                    <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
                    <DxColumn caption="기타소득자 [소득구분]" cell-template="tag" />
                    <template #tag="{ data }">
                      <div>
                        <button style="margin-right: 5px">
                          {{ data.data.incomeTypeCode }}
                        </button>
                        {{ data.data?.employee?.name }}
                        <a-tooltip placement="top" v-if="data.data?.employee?.incomeTypeName">
                          <template #title v-if="data.data?.employee?.incomeTypeName?.length > 10">
                            <span>{{ data.data?.employee?.incomeTypeName }}</span>
                          </template>

                          {{ checkLen(data.data?.employee?.incomeTypeName) }}
                        </a-tooltip>
                      </div>
                    </template>
                    <DxColumn width="80px" caption="지급일" data-field="paymentDay" :format="amountFormat"
                        data-type="string" />
                    <DxColumn caption="지급액" width="100px" data-field="paymentAmount" :format="amountFormat"
                        data-type="string" />
                    <DxColumn caption="세율" width="80px" data-field="taxRate" data-type="string"
                        :format="amountFormat" />
                    <DxColumn caption="공제" cell-template="income-tax" width="100px" />
                    <template #income-tax="{ data }">
                        {{
                            $filters.formatCurrency(data.data.withholdingIncomeTax + data.data.withholdingLocalIncomeTax)
                        }}
                    </template>
                    <DxColumn caption="차인지급액" width="120px" data-field="actualPayment" data-type="string"
                        :format="amountFormat" />
                    <DxSummary>
                        <DxTotalItem column="기타소득자 [소득구분]" summary-type="count" display-format="사업소득자[소득구분]수:{0}" />
                        <DxTotalItem class="custom-sumary" column="지급액" summary-type="sum" display-format="지급액합계: {0}"
                            value-format="#,###" />
                        <DxTotalItem class="custom-sumary" column="공제" :customize-text="customTextSummary" />
                        <DxTotalItem class="custom-sumary" column="actualPayment" summary-type="sum"
                            display-format="차인지급액합계: {0}" value-format="#,###" />
                    </DxSummary>
                </DxDataGrid>
            </a-spin>
        </a-col>
        <a-col :span="10" class="custom-layout form-action" style="padding-right: 0px;">
            <a-spin :spinning="(loadingCreated || loadingDetailEdit || loadingEdit || loadingTableDetail)" size="large">
              <!-- {{ dataAction }} dataAction <br/>
              {{ dataActionEdit }} dataActionEdit <br/>
              {{ dataCallApiDetailEdit }} dataCallApiDetailEdit <br/>
              {{ isNewRow }} isNewRow <br/>
              {{ compareForm() }} compareForm <br/> -->
                <a-form-item label="사업소득자" label-align="right">
                    <employ-type-select :arrayValue="arrayEmploySelect"
                        v-model:valueEmploy="dataAction.input.employeeId" width="350px" :required="true"
                        @incomeTypeCode="changeIncomeTypeCode" :disabled="disabledInput || isDisabledForm" />
                </a-form-item>
                <div class="header-text-1 mb-10">소득내역</div>
                <div class="income-details">
                    <a-row>
                        <a-col :span="13">
                            <a-form-item label="귀속/지급연월" label-align="right">
                                <div class="d-flex-center">
                                  <DxButton :text="'귀' + inputDateTax" :disabled="isDisabledForm"
                                      :style="{ color: 'white', backgroundColor: 'gray' , height: $config_styles.HeightInput}" class="btn-date"  />
                                  <DxButton :text="'지' + paymentDateTax" :disabled="isDisabledForm"
                                      :style="{ color: 'white', backgroundColor: 'black' , height: $config_styles.HeightInput}" class="btn-date"/>
                                </div>
                            </a-form-item>
                            <a-form-item label="지급일" label-align="right">
                                <number-box :max="31" :min="1" width="150px" class="mr-5"
                                    v-model:valueInput="dataAction.input.paymentDay"
                                    :disabled="disabledInput || isDisabledForm" />
                            </a-form-item>
                            <a-form-item label="지급액" label-align="right">
                                <number-box-money :min="0" width="150px" class="mr-5" :max="2147483647" :disabled="isDisabledForm || statusButton==30||statusButton==40"
                                    v-model:valueInput="dataAction.input.paymentAmount" @changeInput="caclInput" />
                            </a-form-item>
                            <a-form-item label="세율" label-align="right">
                                3%
                            </a-form-item>
                        </a-col>
                        <a-col :span="11">
                            <div class="header-text-2 mb-10">공제합계
                                <b>
                                    {{
                                        $filters.formatCurrency(dataAction.input.withholdingIncomeTax +
                                            dataAction.input.withholdingLocalIncomeTax)
                                    }}
                                </b>원
                            </div>
                            <div>
                                <a-form-item label="소득세(공제)" label-align="right">
                                    <div class="d-flex-center">
                                        <number-box-money :min="0" width="150px" class="mr-5" :disabled="true"
                                            v-model:valueInput="dataAction.input.withholdingIncomeTax" /> 원
                                    </div>
                                </a-form-item>
                                <a-form-item label="지방소득세(공제)" label-align="right">
                                    <div class="d-flex-center">
                                        <number-box-money :min="0" width="150px" class="mr-5" :disabled="true"
                                            v-model:valueInput="dataAction.input.withholdingLocalIncomeTax" /> 원
                                    </div>
                                </a-form-item>
                            </div>
                            <div class="header-text-2 mb-10">
                                <div>
                                  차인지급액 <b class="ml-5"> {{ $filters.formatCurrency(dataAction.input.actualPayment)}}</b>원
                                    <span class="fz-11 ml-10" style="color: gray;">
                                        <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                            class="mr-5">
                                        지급액 - 공제합계
                                    </span>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-spin>
        </a-col>
    </a-row>
    <DeletePopup :modalStatus="modalDelete" @closePopup="actionDeleteSuccess" :data="popupDataDelete"
        :processKey="dataTableDetail.processKey" />
    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="dataTableDetail.processKey"
        title="변경이력" typeHistory="pa-620" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="actionDeleteSuccess" :data="dataTableDetail.processKey"
        title="변경이력" typeHistory="pa-620-status" />
    <EditPopup :modalStatus="modalEdit" @closePopup="actionDeleteSuccess" :data="editParam"
        :processKey="dataTableDetail.processKey" />
    <PopupMessage :modalStatus="rowChangeStatus" @closePopup="rowChangeStatus = false" typeModal="confirm"
        :title="titleModalConfirm" content="" cancelText="아니요" okText="네" @checkConfirm="onRowChangeComfirm"
        :isConfirmIcon="false" />
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery, useMutation } from "@vue/apollo-composable";
import { DxDataGrid, DxColumn, DxPaging, DxSelection, DxToolbar, DxEditing, DxScrolling, DxMasterDetail, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { companyId, openTab } from "@/helpers/commonFunction";
import { dataActionUtils, dataGetDetailEdit, arrDropDownUtil, DataAddNew } from "../utils/index";
import { Formula } from '@bankda/jangbuda-common';
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA6/PA620/index";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index";
import DxButton from "devextreme-vue/button";
import dayjs from "dayjs";
import DeletePopup from "./DeletePopup.vue"
import EditPopup from "./EditPopup.vue"
import filters from "@/helpers/filters";
import { Message } from '@/configs/enum';
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxScrolling, DxToolbar, DxEditing, DxButton, DxMasterDetail, DxSummary, DxTotalItem,
        EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined,
        MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined,
        DeletePopup, EditPopup
    },
    props: {
        statusBt: {
            type: Number
        },
        isDisabledForm: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        let disabledInput = ref(false)
        let switchAction = ref<boolean>(true)
        let month1: any = ref(dayjs().format("YYYY-MM"))
        let month2: any = ref(dayjs().format("YYYY-MM"))
        let statusButton = ref(props.statusBt)
        let dataSourceDetail = ref([]);
        const modalEdit = ref<boolean>(false)
        const popupDataDelete: any = ref([])
        const modalDelete = ref<boolean>(false)
        const amountFormat = ref({ currency: 'VND', useGrouping: true })
        const triggerDetail = ref<boolean>(false);
        const triggerDetailOption = ref<boolean>(true);
        const triggerDetailDetailEdit = ref<boolean>(false);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const globalYear = computed(() => store.state.settings.globalYear)
        const modalHistory = ref<boolean>(false)
        const modalHistoryStatus = ref<boolean>(false)
        let arrayEmploySelect: any = ref([]);
        let paymentDayPA620 = computed(() => store.state.common.paymentDayPA620);
        const processKeyPA620 = computed(() => store.getters['common/processKeyPA620']);
        let dataAction: any = ref({...dataActionUtils})
        let dataAddDefaul: any = ref(
          JSON.parse(JSON.stringify(dataActionUtils))
        )
        let dataCallApiGetOption = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
        })
        let dataTableDetail: any = reactive({
            companyId: companyId,
            processKey: processKeyPA620.value
        })
        let dataCallApiDetailEdit = reactive({
            processKey: processKeyPA620.value,
            companyId: companyId,
            incomeId:0
        })
        const arrDropDown = [
            ...arrDropDownUtil
          ]
       
        const focusedRowKey = ref();
        const gridRefName: any = ref();
        const popupAddStatus = ref<boolean>(false);
        const messageSave = Message.getMessage('COMMON', '501').message;
        const titleModalConfirm = ref(messageSave);
        const popupAddType = ref(1);
        const isCompare = ref(false);
        const copyFocusRowKey = ref();
        const oldIncomeId = ref(1);
        const inputDateTax = computed(() => {
            if (!props.isDisabledForm) {
                return processKeyPA620.value.imputedYear + '-' + formatMonth(processKeyPA620.value.imputedMonth)
            }
            return '';
        })
        const paymentDateTax = computed(() => {
            if (!props.isDisabledForm) {
                return processKeyPA620.value.paymentYear + '-' + formatMonth(processKeyPA620.value.paymentMonth)
            }
            return '';
        })
        let arrCallApiDelete: any = ref([]);
        const messageDelNoItem = Message.getMessage('COMMON', '404').message;
        const editParam = ref([])

        // ================GRAPQL==============================================
        // API QUERY TABLE SMALL LEFT SIDE
        const { refetch: refetchTableDetail, loading: loadingTableDetail, onError: errorGetIncomeProcessBusinessesDetail, onResult: resIncomeProcessBusinessesDetail } = useQuery(queries.getIncomeBusinesses, dataTableDetail, () => ({
            enabled: triggerDetail.value,
            fetchPolicy: "no-cache",
        }));
        const isFirstChange = ref(true);
        resIncomeProcessBusinessesDetail(res => {
            const val = res.data.getIncomeBusinesses;
            store.state.common.actionAddRow.dataSource = val;
            //If you change the current year and no data, return the values to empty
            if (isFirstChange.value) {
                let rowData: any = {};
                isCompare.value = false;
                focusedRowKey.value = val[0]?.incomeId;
                // rowData.paymentDay = val[0]?.paymentDay ?? '';
                // if(!props.isDisabledForm) {
                //   rowData.paymentDay = val[0]?.paymentDay ?? paymentDayPA620.value;
                // }
                // rowData.employeeId = val[0]?.employeeId ?? '';
                // rowData.incomeTypeCode = val[0]?.incomeTypeCode;
                // rowData.paymentAmount = val[0]?.paymentAmount;
                // rowData.taxRate = val[0]?.taxRate;
                // rowData.withholdingIncomeTax = val[0]?.withholdingIncomeTax;
                // rowData.withholdingLocalIncomeTax = val[0]?.withholdingLocalIncomeTax;
                // console.log(`output->rowData`,rowData)
                // dataActionEdit.value.input = {...JSON.parse(JSON.stringify(rowData))};
                // dataAction.value.input = {...rowData};
                isFirstChange.value = false;
                disabledInput.value = true;
                dataCallApiDetailEdit.incomeId = val[0]?.incomeId;
            }
            if (val.length == 0) {
                disabledInput.value = false;
            }
            triggerDetail.value = false
        })
        errorGetIncomeProcessBusinessesDetail(res => {
            notification('error', res.message)
        })
        // API QUERY GET VALUE OPTION
        const { refetch: refetchOption, loading: loadingOption, onError: errorOption, result: resOption } = useQuery(queries.getEmployeeBusinesses, dataCallApiGetOption, () => ({
            enabled: triggerDetailOption.value,
            fetchPolicy: "no-cache",
        }));
        watch(() => resOption, (newValue, old) => {
          triggerDetailOption.value = false;
            let respon = newValue.value.getEmployeeBusinesses
            respon.map((val: any) => {
                arrayEmploySelect.value.push({
                    employeeId: val.employeeId,
                    incomeTypeCode: val.incomeTypeCode,
                    name: val.name,
                    incomeTypeName: val.incomeTypeName,
                })
            })
        }, { deep: true })
        // API QUERY DETAIL VALUE TO EDIT
        const { refetch: refetchDetailEdit, loading: loadingDetailEdit, onError: errorDetailEdit, result: resDetailEdit } = useQuery(queries.getIncomeBusiness, dataCallApiDetailEdit, () => ({
            enabled: triggerDetailDetailEdit.value,
            fetchPolicy: "no-cache",
        }));
        watch(resDetailEdit, (newValue) => {
            if (newValue) {
                let data = newValue.getIncomeBusiness;
                let rowData: any = {};
                rowData.paymentDay = data.paymentDay
                rowData.employeeId = data.employeeId
                rowData.incomeTypeCode = data.incomeTypeCode
                rowData.paymentAmount = data.paymentAmount
                rowData.taxRate = data.taxRate
                rowData.withholdingIncomeTax = data.withholdingIncomeTax
                rowData.withholdingLocalIncomeTax = data.withholdingLocalIncomeTax;
                rowData.actualPayment = data.actualPayment;
                triggerDetailDetailEdit.value = false;
                dataAction.value.input = rowData;
                dataActionEdit.value.input = {...JSON.parse(JSON.stringify(rowData))};
                disabledInput.value = true;
            }
        })
        errorDetailEdit(res => {
            notification('error', res.message)
        })
       
        // ===================================== WATCHING ============================================  
        // watch(() => dataAction, (newValue) => {
        //     if (store.state.common.actionAddRow.activeRowAdd == true) {
        //         //update data newly entered in row add by table
        //         let dataEmploy = arrayEmploySelect.value.filter((val: any) => val.employeeId == newValue.input.employeeId);
        //         let rowNewInTable = store.state.common.actionAddRow.dataSource[store.state.common.actionAddRow.dataSource.length - 1]
        //         if (dataEmploy.length > 0) {
        //             rowNewInTable.incomeTypeCode = dataEmploy[0].incomeTypeCode
        //             rowNewInTable.employee.incomeTypeName = dataEmploy[0].incomeTypeName
        //             rowNewInTable.employee.name = dataEmploy[0].name
        //         }
        //         rowNewInTable.paymentDay = newValue.input.paymentDay
        //         rowNewInTable.paymentAmount = newValue.input.paymentAmount
        //         rowNewInTable.taxRate = newValue.input.taxRate
        //         rowNewInTable.withholdingIncomeTax = newValue.input.withholdingIncomeTax
        //         rowNewInTable.withholdingLocalIncomeTax = newValue.input.withholdingLocalIncomeTax
        //         rowNewInTable.actualPayment = newValue.input.paymentAmount - newValue.input.withholdingIncomeTax - newValue.input.withholdingLocalIncomeTax
        //         setTimeout(() => {
        //             let a = document.body.querySelectorAll('[aria-rowindex]');
        //             (a[a.length - 1] as HTMLInputElement).classList.add("dx-row-focused");
        //         }, 100);
        //     }
        // }, { deep: true })
        watch(() => props.statusBt, (newValue) => {
            statusButton.value = newValue
        })
        watch(() => store.state.common.actionAddRow.dataSource, (newValue) => {
            dataSourceDetail.value = newValue
        })
        watch(processKeyPA620, (newVal: any, oldV) => {
            isCompare.value = false;
            // focusedRowKey.value = 0;
            isFirstChange.value = true;
            dataTableDetail.processKey = processKeyPA620.value;
            dataCallApiDetailEdit.processKey = newVal;
            delete dataTableDetail.processKey.status;
            isNewRow.value = false;
            triggerDetail.value = true;
            refetchOption()
            let date1 = processKeyPA620.value.imputedYear + '-' + processKeyPA620.value.imputedMonth
            let date2 = processKeyPA620.value.paymentYear + '-' + processKeyPA620.value.paymentMonth
            month1.value = dayjs(date1).format("YYYY-MM")
            month2.value = dayjs(date2).format("YYYY-MM");
        })
        // ================FUNCTION============================================ 
        const caclInput = () => {
            let objIncomeTax: any = Formula.getIncomeTax(dataAction.value.input.paymentAmount, dataAction.value.input.taxRate);
            dataAction.value.input.withholdingIncomeTax = objIncomeTax.incomeTax;
            dataAction.value.input.withholdingLocalIncomeTax = objIncomeTax.localIncomeTax;
            dataAction.value.input.actualPayment = dataAction.value.input.paymentAmount - dataAction.value.input.withholdingIncomeTax -dataAction.value.input.withholdingLocalIncomeTax;
        };
        // const resetForm = () => {
        //     disabledInput.value = false
        //     dataAction.value.input.paymentDay = paymentDayPA620.value;
        //     dataAction.value.input.employeeId = 0
        //     dataAction.value.input.incomeTypeCode = ""
        //     dataAction.value.input.paymentAmount = 0
        //     dataAction.value.input.withholdingIncomeTax = 0
        //     dataAction.value.input.withholdingLocalIncomeTax = 0
        //     switchAction.value = true;
        //     focusedRowKey.value = null;
        // }
        // const onRowChangeComfirm = (e: any) => {
        //     if (e) {
        //         if (store.state.common.actionAddRow.activeRowAdd == false) {
        //             if (popupAddType.value == 2) {
        //                 onSave();
        //                 // isCompare.value = true;
        //                 focusedRowKey.value = copyFocusRowKey.value;
        //                 triggerDetailDetailEdit.value = true;
        //                 refetchDetailEdit()
        //                 return
        //             } else {
        //                 resetForm();
        //                 return
        //             }
        //         } else {
        //             dataAction.value.processKey.imputedMonth = parseInt(month1.value.split('-')[1])
        //             dataAction.value.processKey.imputedYear = parseInt(month1.value.split('-')[0])
        //             dataAction.value.processKey.paymentMonth = parseInt(month2.value.split('-')[1])
        //             dataAction.value.processKey.paymentYear = parseInt(month2.value.split('-')[0])
        //             actionCreated(dataAction)
        //         }
        //     } else {
        //         if (popupAddType.value == 2) {
        //             isCompare.value = true;
        //             dataCallApiDetailEdit.incomeId = oldIncomeId.value;
        //             triggerDetailDetailEdit.value = true
        //             refetchDetailEdit()
        //         }
        //         // isLoadNewForm.value = true;
        //     }
        //     dataCallApiDetailEdit.processKey = processKey.value
        //     dataCallApiDetailEdit.incomeId = store.state.common.actionAddRow.incomeIdStore;
        //     triggerDetailDetailEdit.value = true
        //     refetchDetailEdit();
        //     setTimeout(() => {
        //         isCompare.value = true;
        //     }, 100)
        //     store.state.common.actionAddRow.activeRowAdd = false
        //     store.state.common.actionAddRow.dataSource = store.state.common.actionAddRow.dataSource.splice(0, store.state.common.actionAddRow.dataSource.length - 1)
        // };














        // ======================= TRACK FORM CHANGE ================================

        const dataActionEdit = ref({input:{}});
        const isNewRow = ref(false);
        //compare Data
        const compareType = ref(1); //0 is row change. 1 is add button;
        const compareForm = () => {
          let daActionCompare = JSON.parse(JSON.stringify(dataAction.value));
          delete daActionCompare.input.employee;
          let daActionEditCompare = JSON.parse(JSON.stringify(dataActionEdit.value));
          delete daActionEditCompare.input.employee;
          if (JSON.stringify(daActionCompare.input) == JSON.stringify(daActionEditCompare.input)) {
            return true;
          } else {
            return false;
          }
        };
        //function common
        const resetForm = async () => {
          //Reset form tax
          dataAction.value.input = {...dataActionUtils.input, paymentDay: paymentDayPA620.value};
          dataActionEdit.value.input = {...dataActionUtils.input, paymentDay: paymentDayPA620.value};
        };
        const addNewRow = () => {
          resetForm();
          dataSourceDetail.value = dataSourceDetail.value.concat(dataAction.value.input);
          focusedRowKey.value = dataAction.value.input.incomeId;
          isNewRow.value = true;
          compareType.value = 1;
        };
        const delNewRow = async () => {
          await resetForm();
          dataSourceDetail.value = dataSourceDetail.value.splice(0, dataSourceDetail.value.length - 1);
          // dataSourceDetail.value = newArr;
          isNewRow.value = false;
          compareType.value = 2;
        };
        //on add row
        const rowChangeStatus = ref<Boolean>(false);
        const openAddNewModal = async () => {
          if (isNewRow.value) {
            if (!compareForm()) {
              rowChangeStatus.value = true;
              return;
            }
            return;
          }
          setTimeout(() => {
            disabledInput.value = false;
            addNewRow();
          }, 50);
          return;
        };
        //row change confirm
        const onRowChangeComfirm = async (ok: boolean) => {
          if (ok) {
            let ele = document.getElementById('save-js-620') as HTMLInputElement;
            ele.click();
          } else {
            if (isNewRow.value) {
              dataSourceDetail.value = dataSourceDetail.value.splice(0, dataSourceDetail.value.length - 1);
              if (compareType.value == 1) {
                addNewRow();
                setTimeout(() => {
                  focusedRowKey.value = dataAction.value.input.incomeId;
                }, 50);
                return;
              }
            }
            if (compareType.value == 2) {
              dataCallApiDetailEdit.incomeId = idRowFake.value;
              isNewRow.value = false;
            }
            compareType.value = 2;
          }
        };
        // enable load form when row change
        const idRowFake = ref();
        const onRowClick = async (item: any) => {
          compareType.value = 2;
          if (isNewRow.value) {
            if (compareForm()) {
              await delNewRow();
              focusedRowKey.value = item.data.incomeId;
              dataCallApiDetailEdit.incomeId = item.data.incomeId;
              return;
            }
            idRowFake.value = item.data.incomeId;
            rowChangeStatus.value = true;
            return;
          }
          if (!compareForm()) {
            rowChangeStatus.value = true;
            idRowFake.value = item.data.incomeId;
            return;
          } else {
            dataCallApiDetailEdit.incomeId = item.data.incomeId;
          }
        };
        //watch to refetch datadetail
        watch(()=>dataCallApiDetailEdit.incomeId,async(newVal)=>{
          if(newVal) {
            triggerDetailDetailEdit.value = true;
            // await refetchDetailEdit();
          }
        },{deep:true})









        // const openAddNewModal = () => {
        //     // If row new is not created
        //     resetForm();
        //     if (store.state.common.actionAddRow.activeRowAdd == false) {
        //         store.state.common.actionAddRow.activeRowAdd = true
        //         let newVal = {
        //             ...DataAddNew
        //         }
        //         store.state.common.actionAddRow.dataSource = JSON.parse(JSON.stringify(store.state.common.actionAddRow.dataSource)).concat(newVal)
        //         setTimeout(() => {
        //             let a = document.body.querySelectorAll('[aria-rowindex]');
        //             (a[a.length - 1] as HTMLInputElement).classList.add("dx-row-focused");
        //         }, 100);
        //     // } else {
        //     //     notification('error', "Hoàn thành thao tác nhập trước đó")
        //     }
        // }
        // const onRowClick = (data: any) => {
        //     let dataRow: any = dataSourceDetail.value.filter((val: any) => val.incomeId === data.key)[0]
        //     if (dataRow.incomeId) {
        //         disabledInput.value = true;
        //         switchAction.value = false
        //         store.state.common.actionAddRow.incomeIdStore = dataRow?.incomeId;
        //         if (store.state.common.actionAddRow.activeRowAdd == true) {
        //             if (JSON.stringify(dataAction.value.input) === JSON.stringify(dataAddDefaul.value.input)) {
        //                 store.state.common.actionAddRow.activeRowAdd = false
        //                 store.state.common.actionAddRow.dataSource = store.state.common.actionAddRow.dataSource.splice(0, store.state.common.actionAddRow.dataSource.length - 1)
        //             } else {
        //                 popupAddStatus.value = true;
        //                 titleModalConfirm.value = '변경 내용을 저장하시겠습니까?';
        //                 return
        //             }
        //         } else {
        //             if (isCompare.value && JSON.stringify(dataAction.value.input) != JSON.stringify(dataActionEditInit.value)) {
        //                 popupAddType.value = 2
        //                 popupAddStatus.value = true;
        //                 titleModalConfirm.value = '변경 내용을 저장하시겠습니까?';
        //                 copyFocusRowKey.value = dataRow.incomeId;
        //                 oldIncomeId.value = dataRow.incomeId
        //                 return
        //             }
        //         }
        //         dataCallApiDetailEdit.processKey = processKey.value
        //         dataCallApiDetailEdit.incomeId = dataRow?.incomeId;
        //         triggerDetailDetailEdit.value = true
        //         refetchDetailEdit();
        //         setTimeout(() => {
        //             isCompare.value = true;
        //         }, 100)
        //     } else {
        //         resetForm()
        //     }
        // }
        const changeIncomeTypeCode = (res: string) => {
            dataAction.value.input.incomeTypeCode = res;
            dataAction.value.input.employee = arrayEmploySelect.value.filter((val: any) => val.incomeTypeCode == res)[0];
        } 
        const selectionChanged = (event: any) => {
            popupDataDelete.value = event.selectedRowKeys;
            editParam.value = event.selectedRowsData.map((item: any)=> item.incomeId)
        }
        const deleteItem = () => {
            if (popupDataDelete.value.length > 0) {
                modalDelete.value = true;
            }else {
                notification('warning',messageDelNoItem)
            }
        };
        const actionDeleteSuccess = () => {
            modalDelete.value = false
            modalEdit.value = false
            triggerDetail.value = true
            refetchTableDetail()
            resetForm()
            emit('createdDone', true);
            isNewRow.value = false;
        }
        const onItemClick = (key: String) => {
            switch (key) {
                case 'history':
                    modalHistory.value = true
                    break;
                case 'historyEdit':
                    modalHistoryStatus.value = true
                    break;
                case 'openTab':
                    openTab({ name: "사업소득자등록", url: "/dashboard/pa-610", id: "pa-610" })
                    break;
                default:
                    break;
            }
        }
        const editPaymentDate = () => {
            if (popupDataDelete.value.length > 0) {
                modalEdit.value = true
            } else {
                notification('warning',messageDelNoItem)
            }
        }
        const customTextSummary = () => {
            let total = 0
            dataSourceDetail.value.map((val: any) => {
                total += val.withholdingIncomeTax + val.withholdingLocalIncomeTax
            })
            return '공제합계: ' + filters.formatCurrency(total)
        }

        
        //---------------------- Action save status ----------------------
        const {
            mutate: actionChangeIncomeProcessBusinessStatus,
            onError: errorChangeIncomeProcessBusinessStatus,
            onDone: successChangeIncomeProcessBusinessStatus,
        } = useMutation(mutations.changeIncomeProcessBusinessStatus)
        errorChangeIncomeProcessBusinessStatus(e => {
            notification('error', e.message)
        })
        successChangeIncomeProcessBusinessStatus(e => {
            focusedRowKey.value = dataAction.value.input.incomeId;
            notification('success', `업데이트 완료!`);
            emit('createdDone', true)
        })
        const statusComfirm = () => {
            actionChangeIncomeProcessBusinessStatus({
                companyId: companyId,
                processKey: { ...processKeyPA620.value },
                status: statusButton.value
            })
        }

        // -------------------------ACTION FORM--------------------------------

        const {
            mutate: actionCreated,
            onError: errorCreated,
            loading: loadingCreated,
            onDone: doneCreated,
        } = useMutation(mutations.createIncomeBusiness);
        doneCreated(res => {
            focusedRowKey.value = res.data.createIncomeBusiness.incomeId
            emit('createdDone', true)
            notification('success', `업데이트 완료!`)
            triggerDetail.value = true
            refetchTableDetail()
            isErrorForm.value = false;
            disabledInput.value = true;
            dataActionEdit.value.input = dataAction.value.input;
        })
        errorCreated(res => {
            notification('error', res.message)
            isErrorForm.value = true;
        })
        // API EDIT 
        const {
            mutate: actionEdit,
            onError: errorEdit,
            loading: loadingEdit,
            onDone: doneEdit,
        } = useMutation(mutations.updateIncomeBusiness);
        doneEdit(() => {
            emit('createdDone', true)
            notification('success', `업데이트 완료!`)
            triggerDetail.value = true
            refetchTableDetail();
            isErrorForm.value = false;
        })
        errorEdit(res => {
            notification('error', res.message);
            isErrorForm.value = true;
        })
        const isErrorForm = ref(false);
        const onSave = (e:any) => {
          var res = e.validationGroup.validate();
          if (!res.isValid) {
            res.brokenRules[0].validator.focus();
            isErrorForm.value = true;
          } else {
            isErrorForm.value = false;
            let params = JSON.parse(JSON.stringify(dataAction.value));
            delete params.input.incomeId;
            delete params.input.employee;
            delete params.input.actualPayment;
            if (!disabledInput.value) {
                let createData = params;
                actionCreated({
                  companyId: companyId,
                  processKey: processKeyPA620.value,
                  input: createData.input
                })
            } else {
                delete params.input.paymentDay;
                delete params.input.employeeId;
                delete params.input.incomeTypeCode;
                let inputEdit = {
                    ...dataCallApiDetailEdit,
                    input: {...params.input}
                }
                actionEdit(inputEdit)
            }
            setTimeout(() => {
              if (isErrorForm.value) {
                focusedRowKey.value = dataAction.value.input.incomeId;
              } else {
                dataCallApiDetailEdit.incomeId = compareType.value == 2 && idRowFake.value;
                focusedRowKey.value = compareType.value == 1 ? dataAction.value.input.incomeId : idRowFake.value;
                isNewRow.value =false;
              }
            }, 1000);
          }
        };
        //---------------------------------------------fn common--------------------------------
        const formatMonth = (month: any) => {
            if (+month < 10) {
                return '0' + month;
            }
            return month;
        };
        const checkLen = (text: String) => {
          if (text.length > 10) {
            return text.substring(0, 10) + '...';
          }
          return text;
        };
        // --------- clear selection --------------------
        // const gridRefName: any = ref("grid");
        // const clearSelection = () => {
        //   const dataGrid = this.$refs[this.dataGridRefName].instance;

        //   dataGrid.clearSelection();
        // };
        return {
            arrCallApiDelete, loadingOption, month1, month2, arrayEmploySelect, statusButton, dataActionUtils, dataTableDetail, dataAction, rowTable, per_page, move_column, colomn_resize, loadingTableDetail, dataSourceDetail, amountFormat, loadingCreated, loadingDetailEdit, arrDropDown, loadingEdit, disabledInput, modalDelete, popupDataDelete, modalHistory, modalHistoryStatus, modalEdit, processKeyPA620, focusedRowKey, inputDateTax, paymentDateTax, gridRefName, popupAddStatus, titleModalConfirm, copyFocusRowKey, isCompare, editParam,companyId,
            caclInput, openAddNewModal, deleteItem, changeIncomeTypeCode, selectionChanged, actionDeleteSuccess, onItemClick, editPaymentDate, customTextSummary, statusComfirm, onSave, formatMonth, onRowClick, onRowChangeComfirm,
            paymentDayPA620,rowChangeStatus,dataActionEdit,dataCallApiDetailEdit,isNewRow,checkLen,compareForm
        }
    }
});
</script>
<style scoped src="../style/style.scss" >

</style>
