<template>
    <div class="d-flex-center mt-10 title-action" :class="{'ele-opacity':!compareForm()}">
        <div>
            <DxButton :text="'귀 ' + inputDateTax" :disabled="isDisabledForm"
                :style="{ color: 'white', backgroundColor: 'gray' , height: $config_styles.HeightInput}" class="btn-date"  />
            <DxButton :text="'지 ' + paymentDateTax" :disabled="isDisabledForm"
                :style="{ color: 'white', backgroundColor: 'black' , height: $config_styles.HeightInput}" class="btn-date"/>
            <process-status v-model:valueStatus="statusButton" @checkConfirm="statusComfirm" v-if="!isDisabledForm" :disabled="statusButton==30||statusButton==40||!compareForm()"/>
        </div>
        <div class="d-flex">
            <DxButton class="ml-3" icon="plus" @click="openAddNewModal" :disabled="isDisabledForm || isExpiredStatus" />
            <DxButton class="ml-3" icon="trash" @click="deleteItem" :disabled="isDisabledForm || isExpiredStatus || isNewRow" />
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
            <DxButton @click="editPaymentDate" class="ml-4 custom-button-checkbox" :disabled="isDisabledForm || isExpiredStatus || isNewRow">
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
        <a-col :span="14" class="custom-layout" :class="{'ele-opacity':!compareForm()}">
            <a-spin :spinning="(loadingTableDetail  || loadingOption)" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail"
                    :show-borders="true" key-expr="incomeId" :allow-column-reordering="move_column"
                    :onRowClick="onRowClick" :allow-column-resizing="colomn_resize" :column-auto-width="true"
                    :focused-row-enabled="true" @selection-changed="selectionChanged" @cell-click="onCellClick"
                    v-model:focused-row-key="focusedRowKey" v-model:selected-row-keys="selectedRowKeys">
                    <DxSelection select-all-mode="allPages" mode="multiple" />
                    <DxColumn caption="기타소득자 [소득구분]" cell-template="tag" />
                    <template #tag="{ data }">
                      <div>
                        <button class="btn-container">
                          {{ data.data.employeeId }}
                        </button>
                        {{ data.data?.employee?.name }}
                        <a-tooltip placement="top" v-if="data.data?.employee?.incomeTypeName">
                          <template #title>
                            {{ data.data.incomeTypeCode }}
                            <span v-if="data.data?.employee?.incomeTypeName?.length > 10">{{ data.data?.employee?.incomeTypeName
                            }}</span>
                          </template>
                          {{ checkLen(data.data?.employee?.incomeTypeName) }}
                        </a-tooltip>
                      </div>
                    </template>
                    <DxColumn width="80px" caption="지급일" cell-template="paymentDay" :format="amountFormat"
                        data-type="string" />
                        <template #paymentDay="{data}">
                          {{ formatMonth(data.data.paymentDay) }}
                        </template>
                    <DxColumn caption="지급액" width="100px" data-field="paymentAmount" :format="amountFormat"
                        data-type="string"  alignment="right"/>
                    <DxColumn caption="세율" width="60px" data-field="taxRate" cell-template="taxRateSlot" alignment="left"/>
                    <template #taxRateSlot="{data}">
                      {{ data.value }}%
                    </template>
                    <DxColumn caption="공제" cell-template="income-tax" width="100px" alignment="right"/>
                    <template #income-tax="{ data }">
                      <a-tooltip placement="top">
                        <template #title>소득세 {{ $filters.formatCurrency(data.data.withholdingIncomeTax) }} / 지방소득세
                            {{ $filters.formatCurrency(data.data.withholdingLocalIncomeTax) }}
                        </template>
                        <span>
                            {{ $filters.formatCurrency(data.data.withholdingIncomeTax + data.data.withholdingLocalIncomeTax) }}
                        </span>
                    </a-tooltip>
                    </template>
                    <DxColumn caption="차인지급액" width="120px" data-field="actualPayment" data-type="string"
                        :format="amountFormat" alignment="right"/>
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
          <a-spin :spinning="(loadingDetailEdit || loadingTableDetail)" size="large">
            {{ isNewRow }} isNewRow <br/>
            {{ compareType }} compareType <br/>
            {{ dataAction }} dataAction <br/>
              <StandardForm formName="pa-620-form" ref="pa620FormRef">
                <a-form-item label="사업소득자" label-align="right" class="red">
                    <employ-type-select :arrayValue="arrayEmploySelect"
                        v-model:valueEmploy="dataAction.input.employeeId" width="350px" :required="true"
                        @incomeTypeCode="changeIncomeTypeCode" :disabled="disabledInput || isDisabledForm || isExpiredStatus" />
                </a-form-item>
                <div class="header-text-1 mb-10">소득내역</div>
                <div class="income-details">
                    <a-row>
                        <a-col :span="13">
                            <a-form-item label="귀속/지급연월" label-align="right">
                                <div class="d-flex-center">
                                  <DxButton :text="'귀 ' + inputDateTax" :disabled="isDisabledForm"
                                      :style="{ color: 'white', backgroundColor: 'gray' , height: $config_styles.HeightInput}" class="btn-date"  />
                                  <DxButton :text="'지 ' + paymentDateTax" :disabled="isDisabledForm"
                                      :style="{ color: 'white', backgroundColor: 'black' , height: $config_styles.HeightInput}" class="btn-date"/>
                                </div>
                            </a-form-item>
                            <a-form-item label="지급일" label-align="right" class="red">
                                <number-box :max="31" :min="1" width="150px" class="mr-5"
                                    v-model:valueInput="dataAction.input.paymentDay" :isFormat="true"
                                    :disabled="disabledInput || isDisabledForm || isExpiredStatus" :required="true"/>
                            </a-form-item>
                            <a-form-item label="지급액" label-align="right" class="red">
                                    <div class="d-flex-center">
                                <number-box-money :min="1" width="150px" class="mr-5" :max="2147483647" :disabled="isDisabledForm || isExpiredStatus"
                                    v-model:valueInput="dataAction.input.paymentAmount" @changeInput="caclInput" :required="true" /> 원
                                    </div>
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
                <a-row justify="center" class="my-10 mt-20">
                  <button-basic text="저장" type="default" mode="contained" :width="90"
                  @onClick="onSave($event)" id="save-js-620" size="large" class="ml-4" :disabled="isDisabledForm || isExpiredStatus">
                  </button-basic>
                </a-row>
              </StandardForm>
            </a-spin>
        </a-col>
    </a-row>
    <DeletePopup :modalStatus="modalDelete" @closePopup="actionDeleteSuccess" :data="popupDataDelete" :processKey="dataTableDetail.processKey" />
    <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="dataTableDetail.processKey"
        title="변경이력" typeHistory="pa-620" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus=false" :data="dataTableDetail.processKey"
        title="변경이력" typeHistory="pa-620-status" />
    <EditPopup :modalStatus="modalEdit" @closePopup="actionEditSuccess" :data="editParam"
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
import { dataActionUtils, } from "../utils/index";
import { Formula } from '@bankda/jangbuda-common';
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA6/PA620/index";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index";
import DxButton from "devextreme-vue/button";
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
        const { per_page, move_column, colomn_resize } = store.state.settings;
        const globalYear = computed(() => store.state.settings.globalYear)
        const modalHistory = ref<boolean>(false)
        const modalHistoryStatus = ref<boolean>(false)
        let paymentDayPA620 = computed(() => store.state.common.paymentDayPA620);
        const processKeyPA620 = computed(() => store.getters['common/processKeyPA620']);
        let dataAction: any = ref({...dataActionUtils})
        const dataActionEdit = ref({...dataActionUtils});
        let dataTableDetail: any = reactive({
            companyId: companyId,
            processKey: processKeyPA620.value
        })
        let dataCallApiDetailEdit = reactive({
            processKey: processKeyPA620.value,
            companyId: companyId,
            incomeId:0
        })
        const focusedRowKey = ref();
        const popupAddStatus = ref<boolean>(false);
        const messageSave = Message.getMessage('COMMON', '501').message;
        const titleModalConfirm = ref(messageSave);
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
        const messageDelNoItem = Message.getMessage('COMMON', '404').message;
        const editParam = ref([])
        const pa620FormRef = ref();
        const isExpiredStatus = computed(()=>{
          if(!statusButton.value){
            return false;
          }
          return +statusButton.value>10 ?true:false;
        })
        const messageUpdate = Message.getMessage('COMMON', '106').message;

        // ================GRAPQL==============================================
        // API QUERY TABLE SMALL LEFT SIDE
        const { loading: loadingTableDetail, onError: errorGetIncomeProcessBusinessesDetail, onResult: resIncomeProcessBusinessesDetail } = useQuery(queries.getIncomeBusinesses, dataTableDetail, () => ({
            enabled: triggerDetail.value,
            fetchPolicy: "no-cache",
        }));
        const isFirstChange = ref(true);
        resIncomeProcessBusinessesDetail(res => {
            const val = res.data.getIncomeBusinesses;
            dataSourceDetail.value = val;
            //If you change the current year and no data, return the values to empty
            if (isFirstChange.value) {
                focusedRowKey.value = val[0]?.incomeId;
                selectedRowKeys.value = [val[0]?.incomeId];
                idRowFake.value = dataAction.value.input.incomeId;
                isFirstChange.value = false;
                disabledInput.value = true;
                dataCallApiDetailEdit.incomeId = val[0]?.incomeId;
            }
            if (val.length == 0) {
                disabledInput.value = false;
                resetForm();
            }
            if(compareType.value == 3) {
              addNewRow();
            }
            triggerDetail.value = false
        })
        errorGetIncomeProcessBusinessesDetail(res => {
            notification('error', res.message)
        })
        // API QUERY GET VALUE OPTION

        let arrayEmploySelect: any = ref([]);
        let dataCallApiGetOption = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
        })
        const { refetch: refetchOption, loading: loadingOption, onError: errorOption, result: resOption } = useQuery(queries.getEmployeeBusinesses, dataCallApiGetOption, () => ({
          enabled: triggerDetailOption.value,  
          fetchPolicy: "no-cache",
        }));
        watch(resOption, (newValue: any) => {
          triggerDetailOption.value = false;
          arrayEmploySelect.value = newValue.getEmployeeBusinesses;
        });
        errorOption((res)=>{
          notification('error', res.message);
        })
        // API QUERY DETAIL VALUE TO EDIT
        const {loading: loadingDetailEdit, onError: errorDetailEdit, result: resDetailEdit } = useQuery(queries.getIncomeBusiness, dataCallApiDetailEdit, () => ({
            enabled: triggerDetailDetailEdit.value,
            fetchPolicy: "no-cache",
        }));
        watch(resDetailEdit, (newValue) => {
            if (newValue) {
                let data = newValue.getIncomeBusiness;
                let rowData: any = {};
                rowData.paymentDay = data.paymentDay
                rowData.employeeId = data.employeeId
                rowData.incomeId = data.incomeId
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
            }else {
              resetForm();
            }
        })
        errorDetailEdit(res => {
            notification('error', res.message)
        })
       
        // ===================================== WATCHING ============================================
        
        watch(() => props.statusBt, (newValue) => {
            statusButton.value = newValue
        })
        watch(processKeyPA620, (newVal: any, oldV) => {
            isFirstChange.value = true;
            dataTableDetail.processKey = processKeyPA620.value;
            dataCallApiDetailEdit.processKey = newVal;
            delete dataTableDetail.processKey.status;
            isNewRow.value = false;
            triggerDetail.value = true;
            refetchOption()
        })
        // ================FUNCTION============================================ 
        const caclInput = () => {
            let objIncomeTax: any = Formula.getIncomeTax(dataAction.value.input.paymentAmount, dataAction.value.input.taxRate);
            dataAction.value.input.withholdingIncomeTax = objIncomeTax.incomeTax;
            dataAction.value.input.withholdingLocalIncomeTax = objIncomeTax.localIncomeTax;
            dataAction.value.input.actualPayment = dataAction.value.input.paymentAmount - dataAction.value.input.withholdingIncomeTax -dataAction.value.input.withholdingLocalIncomeTax;
        };

        // ======================= TRACK FORM CHANGE ================================

        const isNewRow = ref(false);
        const isClickMonthDiff = ref(false);
        const isClickYearDiff = ref(false);
        const changeYearDataFake = ref();
        //compare Data
        const compareType = ref(2); //2 is row change. 1 is add button;
        const compareForm = () => {
          let daActionCompare = JSON.parse(JSON.stringify(dataAction.value));
          delete daActionCompare.input.employee;
          let daActionEditCompare = JSON.parse(JSON.stringify(dataActionEdit.value));
          delete daActionEditCompare.input.employee;
          if (JSON.stringify(daActionCompare.input) == JSON.stringify(daActionEditCompare.input)) {
            return true;
          } 
          return false;
        };
        //function common
        const resetForm = async () => {
          await pa620FormRef.value.resetValidate();
          dataAction.value.input = {...dataActionUtils.input, paymentDay: paymentDayPA620.value};
          dataActionEdit.value.input = {...dataActionUtils.input, paymentDay: paymentDayPA620.value};
        };
        const addNewRow = async() => {
          await resetForm();
          dataSourceDetail.value = dataSourceDetail.value.concat(dataAction.value.input);
          focusedRowKey.value = dataAction.value.input.incomeId;
          selectedRowKeys.value = [dataAction.value.input.incomeId];
          isNewRow.value = true;
          compareType.value = 1;
          dataCallApiDetailEdit.incomeId = dataAction.value.input.incomeId;
        };
        const delNewRow = async () => {
          dataSourceDetail.value = dataSourceDetail.value.splice(0, dataSourceDetail.value.length - 1);
          isNewRow.value = false;
          compareType.value = 2;
        };
        let watchGlobalYear = watch(globalYear, (newVal, oldVal) => {
          if (compareForm()) {
            emit('noSave', 1, newVal);
            dataCallApiGetOption.value.imputedYear = newVal;
            triggerDetailOption.value = true;
          } else {
            rowChangeStatus.value = true;
            isClickYearDiff.value = true;
            changeYearDataFake.value = oldVal;
          }
        });
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
          if (!compareForm()) {
            rowChangeStatus.value = true;
            compareType.value = 1;
            return;
          }
          disabledInput.value = false;
          addNewRow();
          return;
        };
        //row change confirm
        const onRowChangeComfirm = async (ok: boolean) => {
          if (ok) {
            if(compareType.value==1){
              compareType.value = 3;
            }
            let ele = document.getElementById('save-js-620') as HTMLInputElement;
            ele.click();
          } else {
            if (isClickYearDiff.value) {
              emit('noSave', 1, globalYear.value);
              isClickYearDiff.value = false;
              compareType.value = 1;
              return;
            }
            if (isClickEditDiff.value) {
              onEditItem();
              isClickEditDiff.value = false;
              return;
            }
            if(isClickMonthDiff.value){
              emit('noSave', 0);
              isClickMonthDiff.value = false;
              compareType.value = 1;
              return;
            }
            if (isNewRow.value) {
              dataSourceDetail.value = dataSourceDetail.value.splice(0, dataSourceDetail.value.length - 1);
              if (compareType.value == 1) {
                addNewRow();
                return;
              }
            }
            if (compareType.value === 1) {
              addNewRow();
              return;
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
          idRowFake.value = item.data.incomeId;
          // selectedRowKeys.value = [item.data.incomeId];
          if (isNewRow.value) {
            if (compareForm()) {
              await delNewRow();
              focusedRowKey.value = item.data.incomeId;
              selectedRowKeys.value = [item.data.incomeId];
              dataCallApiDetailEdit.incomeId = item.data.incomeId;
              return;
            }
            rowChangeStatus.value = true;
            return;
          }
          if (!compareForm()) {
            rowChangeStatus.value = true;
            return;
          } else {
            dataCallApiDetailEdit.incomeId = item.data.incomeId;
          }
        };
        //watch to refetch datadetail
        watch(()=>dataCallApiDetailEdit.incomeId,(newVal)=>{
          if(+newVal>0) {
            triggerDetailDetailEdit.value = true;
          }
        },{deep:true})
        // click row
        const changeIncomeTypeCode = (res: string, id: any) => {
            dataAction.value.input.incomeTypeCode = res;
            dataAction.value.input.employee = arrayEmploySelect.value.filter((val: any) => val.employeeId == id)[0];
        } 
        const selectedRowKeys = ref<any>([]);
        const onCellClick = (e: any) => {
          if(e.columnIndex === 0 && e.column.type =='selection') {
            focusedRowKey.value = dataAction.value.input?.incomeId;
            return;
          }
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
        const actionDeleteSuccess = (val: Boolean) => {
            if(val){
              triggerDetail.value = true;
              emit('createdDone', true);
              isFirstChange.value = true;
            }
            modalDelete.value = false;
        }
        const actionEditSuccess = (val: Boolean) => {
            if(val){
              triggerDetail.value = true;
              dataActionEdit.value.input = {...dataAction.value.input};
              triggerDetailDetailEdit.value = true;
              selectedRowKeys.value = [dataAction.value.input.incomeId]
              emit('createdDone', true);
            }
            modalEdit.value = false;
        };
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
        const isClickEditDiff = ref(false);
        const onEditItem = () => {
        if (popupDataDelete.value.length > 0) {
            modalEdit.value = true;
          } else {
            notification('warning', messageDelNoItem);
          }
        }
        const editPaymentDate = () => {
          if (!compareForm()) {
            rowChangeStatus.value = true;
            isClickEditDiff.value = true;
            return;
          }
          onEditItem();
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
            selectedRowKeys.value = [dataAction.value.input.incomeId];
            notification('success', `업데이트 완료!`);
            emit('statusDone', e.data.changeIncomeProcessBusinessStatus.status);
        })
        const statusComfirm = () => {
            actionChangeIncomeProcessBusinessStatus({
                companyId: companyId,
                processKey: { ...processKeyPA620.value },
                status: statusButton.value
            })
        }

        // -------------------------ACTION FORM--------------------------------

        const onChangeFormdone = () => {
            dataCallApiDetailEdit.incomeId = compareType.value == 2 && idRowFake.value;
            triggerDetail.value =  true;
            disabledInput.value = true;
            dataActionEdit.value.input = {...dataAction.value.input};
            isNewRow.value = false;
            focusedRowKey.value = compareType.value == 1 ? dataAction.value.input.incomeId : idRowFake.value;
            selectedRowKeys.value=[focusedRowKey.value];
            if (isClickYearDiff.value) {
              emit('noSave', 1, globalYear.value);
              isClickYearDiff.value = false;
              compareType.value = 1;
              return;
            }
            if (isClickMonthDiff.value) {
              emit('noSave', 0);
              isClickMonthDiff.value = false;
              return;
            }
            if (isClickYearDiff.value) {
              emit('noSave', 1);
              isClickYearDiff.value = false;
              return;
            }
        }
        const {
            mutate: actionCreated,
            onError: errorCreated,
            loading: loadingCreated,
            onDone: doneCreated,
        } = useMutation(mutations.createIncomeBusiness);

        doneCreated(res => {
            emit('createdDone', true)
            notification('success', messageSave)
            if(compareType.value == 3){
              dataActionEdit.value.input = {...dataAction.value.input};
              triggerDetail.value = true;
              disabledInput.value = false;
              return;
            }
            dataAction.value.input.incomeId = res.data.createIncomeBusiness.incomeId;
            dataActionEdit.value.input.incomeId = res.data.createIncomeBusiness.incomeId;
            onChangeFormdone();           
        })
        errorCreated(res => {
            notification('error', res.message)
            focusedRowKey.value = dataAction.value.input.incomeId;
            selectedRowKeys.value = [dataAction.value.input.incomeId];
        })
        // API EDIT 
        const {
            mutate: actionEdit,
            onError: errorEdit,
            loading: loadingEdit,
            onDone: doneEdit,
        } = useMutation(mutations.updateIncomeBusiness);
        doneEdit((res) => {
          emit('createdDone', true)
          notification('success', messageUpdate)
          if(compareType.value == 3){
            dataActionEdit.value.input = {...dataAction.value.input};
            triggerDetail.value = true;
            disabledInput.value = false;
            return;
          }
          onChangeFormdone();
          if (isClickEditDiff.value) {
            onEditItem();
          }
        })
        errorEdit(res => {
            notification('error', res.message);
            focusedRowKey.value = dataAction.value.input.incomeId;
            selectedRowKeys.value = [dataAction.value.input.incomeId];
        })
        //
        const onSave = (e:any) => {
          var res = e.validationGroup.validate();
          if (!res.isValid) {
            res.brokenRules[0].validator.focus();
            focusedRowKey.value = dataAction.value.input.incomeId;
            selectedRowKeys.value = [dataAction.value.input.incomeId];
            if (isClickYearDiff.value) {
              watchGlobalYear();
              store.state.settings.globalYear = changeYearDataFake.value;
              watchGlobalYear = watch(globalYear, (newVal, oldVal) => {
                if (compareForm()) {
                  emit('noSave', 1, newVal);
                  dataCallApiGetOption.value.imputedYear = newVal;
                  triggerDetailOption.value = true;
                } else {
                  rowChangeStatus.value = true;
                  isClickYearDiff.value = true;
                  changeYearDataFake.value = oldVal;
                }
              });
            }
          } else {
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
                    incomeId:dataAction.value.input.incomeId,
                    input: {...params.input}
                }
                actionEdit(inputEdit)
            }
          }
        };
        //---------------------------------------------fn common--------------------------------
        const formatMonth = (month: any) => {
            if(month==null){
              return '';
            }
            if (+month < 10) {
                return '0' + month;
            }
            return month ? month :'';
        };
        const checkLen = (text: String) => {
          if (text.length > 10) {
            return text.substring(0, 10) + '...';
          }
          return text ? text : '';
        };
        return {
            loadingOption, arrayEmploySelect, statusButton, dataActionUtils, dataTableDetail, dataAction, per_page, move_column, colomn_resize, loadingTableDetail, dataSourceDetail, amountFormat, loadingCreated, loadingDetailEdit, loadingEdit, disabledInput, modalDelete, popupDataDelete, modalHistory, modalHistoryStatus, modalEdit, processKeyPA620, focusedRowKey, inputDateTax, paymentDateTax, popupAddStatus, titleModalConfirm, editParam,companyId,
            caclInput, openAddNewModal, deleteItem, changeIncomeTypeCode, selectionChanged, actionDeleteSuccess, onItemClick, editPaymentDate, customTextSummary, statusComfirm, onSave, formatMonth, onRowClick, onRowChangeComfirm,
            paymentDayPA620,rowChangeStatus,checkLen,compareForm, resetForm, dataActionEdit, dataCallApiDetailEdit, isNewRow, isClickMonthDiff, selectedRowKeys, onCellClick, pa620FormRef,isExpiredStatus, actionEditSuccess,compareType
        }
    }
});
</script>
<style scoped src="../style/style.scss" >

</style>
