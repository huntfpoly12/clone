<template>
  <a-col :span="24">
        <a-row style="border: 1px solid #d7d7d7; padding: 10px; margin-top: 10px; justify-content: space-between">
            <a-col style="display: flex">
              <DxButton
                    :text="'귀' + inputDateTax" :disabled="isDisabledForm"
                    :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
              <DxButton
                    :text="'지' + paymentDateTax" :disabled="isDisabledForm"
                    :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" />
              <process-status v-model:valueStatus="statusButton" @checkConfirm="statusComfirm" v-if="!isDisabledForm"/>
            </a-col>
            <a-col style="display: inline-flex; align-items: center">
              <DxButton class="ml-3" icon="plus" @click="addRow" :disabled="isDisabledForm"/>
              <DxButton class="ml-4" @click="deleteItem" :disabled="isDisabledForm">
                <img style="width: 17px" src="@/assets/images/icon_delete.png" alt="" />
              </DxButton>
              <DxButton @click="onSave" size="large" class="ml-4" :disabled="isDisabledForm">
                  <SaveOutlined style="font-size: 17px" />
              </DxButton>
              <DxButton class="ml-4 d-flex" style="cursor: pointer" @click="modalHistory = true" :disabled="isDisabledForm">
                <a-tooltip placement="top">
                  <template #title>사업소득자료 변경이력</template>
                  <div style="text-align: center;" @click="onItemClick('history')">
                    <HistoryOutlined style="font-size: 16px" />
                  </div>
              </a-tooltip>
              </DxButton>
              <DxButton class="ml-4" style="cursor: pointer" @click="modalHistoryStatus = true" :disabled="isDisabledForm">
                <a-tooltip placement="top">
                  <template #title>사업소득 마감상태 변경이력</template>
                  <div style="text-align: center;" @click="onItemClick('historyEdit')">
                    <img src="@/assets/images/icon_status_history.png" alt="" class="icon_status_history" />
                  </div>
                </a-tooltip>
              </DxButton>
              <DxButton @click="editPaymentDate" class="ml-4 custom-button-checkbox" :disabled="isDisabledForm">
                  <div class="d-flex-center">
                      <checkbox-basic size="13" :valueCheckbox="true" disabled="true" />
                      <span class="fz-12 pl-5">지급일변경</span>
                  </div>
              </DxButton>
              <div class="custom-select-tab ml-4">
                <button class="button-open-tab" @click="onItemClick('openTab')">사업소득자등록</button>
              </div>
            </a-col>
        </a-row>
      <!-- </div> -->
  </a-col>

  <a-col :span="14" class="custom-layout ">
      <a-spin :spinning="(loadingTableDetail || loadingCreated || loadingEdit)" size="large">
          <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail"
              :show-borders="true" key-expr="employeeId" :allow-column-reordering="move_column" @focused-row-changed="onFocusedRowChanged"
              :allow-column-resizing="colomn_resize" :column-auto-width="true"
              :focused-row-enabled="true" @selection-changed="selectionChanged" v-model:focused-row-key="focusedRowKey" ref="gridRefName">
              <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
              <DxScrolling column-rendering-mode="virtual" />
              <DxColumn caption="기타소득자 [소득구분]" cell-template="tag" />
              <template #tag="{ data }" class="custom-action">
                  <income-type :typeCode="data.data.incomeTypeCode" :typeName="(data.data.employee.name)"
                      :incomeTypeName="data.data.employee.incomeTypeName" />
              </template>
              <DxColumn width="80px" caption="지급일" data-field="paymentDay" data-type="string"
                  :format="amountFormat" />
              <DxColumn caption="지급액" width="100px" data-field="paymentAmount" data-type="string"
                  :format="amountFormat" />
              <DxColumn caption="세율" width="80px" data-field="taxRate" data-type="string" :format="amountFormat" />
              <DxColumn caption="공제" cell-template="income-tax" width="100px" />
              <template #income-tax="{ data }" class="custom-action">
                  {{ $filters.formatCurrency(data.data.withholdingIncomeTax + data.data.withholdingLocalIncomeTax)
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
  <a-col :span="10" class="custom-layout form-action">
      <a-spin :spinning="(loadingCreated || loadingDetailEdit || loadingEdit || loadingTableDetail)" size="large">
          <a-form-item label="사업소득자" label-align="right">
              <employ-type-select :arrayValue="arrayEmploySelect"
                  v-model:valueEmploy="dataAction.input.employeeId" width="350px" :required="true"
                  @incomeTypeCode="changeIncomeTypeCode"  :disabled="disabledInput || isDisabledForm" />
          </a-form-item>
          <div class="header-text-1 mb-10">소득내역</div>
          <div class="income-details">
              <a-row>
                  <a-col :span="13">
                      <a-form-item label="귀속/지급연월" label-align="right">
                          <div class="d-flex-center">
                              <div class="month-custom-1 d-flex-center" v-if="!isDisabledForm">
                                  귀 <month-picker-box v-model:valueDate="month1" width="65px" class="mr-5 ml-5" :readonly="true" />
                              </div>
                              <DxButton
                                        :text="'귀'" :disabled="isDisabledForm"
                                        :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" v-else/>
                              <div class="month-custom-2 d-flex-center" v-if="!isDisabledForm">
                                  지 <month-picker-box v-model:valueDate="month2" class="ml-5" width="65px" :readonly="true"/>
                              </div>
                                <DxButton
                                        :text="'지'" :disabled="isDisabledForm"
                                        :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" v-else />
                          </div>
                      </a-form-item>
                      <a-form-item label="지급일" label-align="right">
                          <number-box :max="31" :min="1" width="150px" class="mr-5"
                              v-model:valueInput="dataAction.input.paymentDay" :disabled="disabledInput || isDisabledForm" />
                      </a-form-item>
                      <a-form-item label="지급액" label-align="right">
                          <number-box-money min="0" width="150px" class="mr-5" :disabled="isDisabledForm"
                              v-model:valueInput="dataAction.input.paymentAmount" @changeInput="changeInput"/>
                      </a-form-item>
                      <a-form-item label="세율" label-align="right">
                          3%
                      </a-form-item>
                  </a-col>
                  <a-col :span="11">
                      <div class="header-text-2 mb-10">공제합계 <b>{{
                              ($filters.formatCurrency(dataAction.input.withholdingIncomeTax +
                                  dataAction.input.withholdingLocalIncomeTax))
                      }}</b>원</div>
                      <div>
                          <a-form-item label="소득세(공제)" label-align="right">
                              <div class="d-flex-center">
                                  <number-box-money min="0" width="150px" class="mr-5" :disabled="true"
                                      v-model:valueInput="dataAction.input.withholdingIncomeTax" /> 원
                              </div>
                          </a-form-item>
                          <a-form-item label="지방소득세(공제)" label-align="right">
                              <div class="d-flex-center">
                                  <number-box-money min="0" width="150px" class="mr-5" :disabled="true"
                                      v-model:valueInput="dataAction.input.withholdingLocalIncomeTax" /> 원
                              </div>
                          </a-form-item>
                      </div>
                      <div class="header-text-2 mb-10">
                        <div>
                          공제합계 <b class="ml-5"> {{ ($filters.formatCurrency(dataAction.input.paymentAmount -
                                  dataAction.input.withholdingIncomeTax -
                                  dataAction.input.withholdingLocalIncomeTax))
                          }}</b>원
                          <span class="fz-11 ml-10" style="color: gray;">
                              <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                              지급액 - 공제합계
                          </span>
                        </div>
                      </div>
                  </a-col>
              </a-row>
          </div>
      </a-spin>
  </a-col>
  <DeletePopup :modalStatus="modalDelete" @closePopup="actionDeleteSuccess" :data="popupDataDelete"
      :processKey="dataTableDetail.processKey" />

  <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="dataTableDetail.processKey"
      title="변경이력" typeHistory="pa-620" />
  <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="actionDeleteSuccess" :data="dataTableDetail.processKey"
      title="변경이력" typeHistory="pa-620-status" />
  <EditPopup :modalStatus="modalEdit" @closePopup="actionDeleteSuccess" :data="popupDataDelete"
      :processKey="dataTableDetail.processKey"/>
  <PopupMessage :modalStatus="popupAddStatus" @closePopup="popupAddStatus = false" :typeModal="'confirm'"
    :title="titleModalConfirm" :content="''" :cancelText="'아니요 '" :okText="'네 '" @checkConfirm="onPopupComfirm"
    :isConfirmIcon="false" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA6/PA620/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxMasterDetail, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index";
import DxButton from "devextreme-vue/button";
import { companyId,openTab } from "@/helpers/commonFunction";
import { dataActionUtils, dataGetDetailEdit, arrDropDownUtil } from "../utils/index";
import dayjs from "dayjs";
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import type { DropdownProps } from "ant-design-vue";
import DeletePopup from "./DeletePopup.vue"
import EditPopup from "./EditPopup.vue"
import filters from "@/helpers/filters";
import { Formula } from '@bankda/jangbuda-common';

export default defineComponent({
  components: {
      DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxDropDownButton, DxGrouping, DxItem, DxButton, DxMasterDetail, DxSummary, DxTotalItem,
      EditOutlined, HistoryOutlined, SearchOutlined, DeleteOutlined, SaveOutlined,
      MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined,
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
      const triggerDetail = ref<boolean>(true);
      const triggerDetailOption = ref<boolean>(true);
      const triggerDetailDetailEdit = ref<boolean>(false);
      const store = useStore();
      const per_page = computed(() => store.state.settings.per_page);
      const move_column = computed(() => store.state.settings.move_column);
      const colomn_resize = computed(() => store.state.settings.colomn_resize);
      const rowTable = ref(0);
      const globalYear = computed(() => store.state.settings.globalYear)

    //   let dateCustom = {
    //       imputedYear: globalYear.value,
    //       imputedMonth: dayjs().month() + 1,
    //       paymentYear: globalYear.value,
    //       paymentMonth: dayjs().month() + 1,
    //   }
    //   store.commit('common/processKeyPA620', dateCustom)
      const processKey = computed(() => store.getters['common/processKeyPA620']);
      
      const modalHistory = ref<boolean>(false)
      const modalHistoryStatus = ref<boolean>(false)
      let arrayEmploySelect: any = ref([])
      let placements = ["bottomRight"] as DropdownProps["placement"][];
      const inputDateTax = computed(()=> {
            if(!props.isDisabledForm){
                return processKey.value.imputedYear + '-' + formatMonth(processKey.value.imputedMonth)
            }
            return '';
        })
        const paymentDateTax = computed(()=> {
            if(!props.isDisabledForm){
                return processKey.value.paymentYear + '-' + formatMonth(processKey.value.paymentMonth)
            }
            return '';
        })
      let dataAction: any = reactive({
          ...dataActionUtils
      })
      let dataCallApiGetOption = ref({
          companyId: companyId,
          imputedYear: globalYear.value,
      })
      let dataTableDetail: any = reactive({
          companyId: companyId,
          processKey: processKey.value
      })
      let dataCallApiDetailEdit = reactive({
          ...dataGetDetailEdit
      })
      const arrDropDown = [
          ...arrDropDownUtil
      ]


      // ================GRAPQL==============================================

      // API QUERY TABLE SMALL LEFT SIDE
      const { refetch: refetchTableDetail, loading: loadingTableDetail, onError: errorGetIncomeProcessBusinessesDetail, onResult: resIncomeProcessBusinessesDetail } = useQuery(queries.getIncomeBusinesses, dataTableDetail, () => ({
          enabled: triggerDetail.value,
          fetchPolicy: "no-cache",
      }));
    const isFirstChange = ref(true);
    resIncomeProcessBusinessesDetail(res => {
        const val = res.data.getIncomeBusinesses;
          dataSourceDetail.value = val;
          console.log(`output->isFirstChange.value`,isFirstChange.value)
          if(isFirstChange.value) {
            isCompare.value = false;
            focusedRowKey.value = val[0]?.employeeId;
            dataAction.input.paymentDay = val[0]?.paymentDay ?? '';
            dataAction.input.employeeId = val[0]?.employeeId ?? '';
            dataAction.input.incomeTypeCode = val[0]?.incomeTypeCode;
            dataAction.input.paymentAmount = val[0]?.paymentAmount;
            dataAction.input.withholdingIncomeTax = val[0]?.withholdingIncomeTax;
            dataAction.input.withholdingLocalIncomeTax = val[0]?.withholdingLocalIncomeTax;
            isFirstChange.value = false;
          }
          if(val.length == 0){
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
    //   actionEditFuc
      // API QUERY DETAIL VALUE TO EDIT
      const { refetch: refetchDetailEdit, loading: loadingDetailEdit, onError: errorDetailEdit, result: resDetailEdit } = useQuery(queries.getIncomeBusiness, dataCallApiDetailEdit, () => ({
          enabled: triggerDetailDetailEdit.value,
          fetchPolicy: "no-cache",
      }));
      watch(() => resDetailEdit, (newValue, old) => {
          if (newValue.value) {
              let respon = newValue.value.getIncomeBusiness
              dataAction.input.paymentDay = respon.paymentDay
              dataAction.input.employeeId = respon.employeeId
              dataAction.input.incomeTypeCode = respon.incomeTypeCode
              dataAction.input.paymentAmount = respon.paymentAmount
              dataAction.input.withholdingIncomeTax = respon.withholdingIncomeTax
              dataAction.input.withholdingLocalIncomeTax = respon.withholdingLocalIncomeTax
              triggerDetailDetailEdit.value = false;
              dataActionEditInit.value = JSON.parse(JSON.stringify(dataAction.input));
              // isCompare.value=false;
          }
      }, { deep: true })
      errorDetailEdit(res => {
          notification('error', res.message)
      })

      // API CREATED 
      const {
          mutate: actionCreated,
          onError: errorCreated,
          loading: loadingCreated,
          onDone: doneCreated,
      } = useMutation(mutations.createIncomeBusiness);
      doneCreated(res => {
          emit('createdDone', true)
          notification('success', `업데이트 완료!`)
          triggerDetail.value = true
          refetchTableDetail()
      })
      errorCreated(res => {
          notification('error', res.message)
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
          refetchTableDetail()
      })
      errorEdit(res => {
          notification('error', res.message)
      })

      // ================WATCHING============================================
    //   watch(() => processKey.value, (newValue) => {
    //       dataTableDetail = newValue
    //       triggerDetail.value = true
    //       refetchTableDetail()
    //   }, { deep: true })

    //   watch(() => processKeyPA620, (newValue) => {
    //       let date1 = processKeyPA620.value.processKey.imputedYear + '-' + processKeyPA620.value.processKey.imputedMonth
    //       let date2 = processKeyPA620.value.processKey.paymentYear + '-' + processKeyPA620.value.processKey.paymentMonth
    //       month1.value = dayjs(date1).format("YYYY-MM")
    //       month2.value = dayjs(date2).format("YYYY-MM")
    //   }, { deep: true })

      watch(() => props.statusBt, (newValue) => {
          statusButton.value = newValue
      })

      // Action save value

      const {
          mutate: actionChangeIncomeProcessBusinessStatus,
          onError: errorChangeIncomeProcessBusinessStatus,
          onDone: successChangeIncomeProcessBusinessStatus,
      } = useMutation(mutations.changeIncomeProcessBusinessStatus)
      errorChangeIncomeProcessBusinessStatus(e => {
          notification('error', e.message)
      })
      successChangeIncomeProcessBusinessStatus(e => {
          focusedRowKey.value = dataAction.input.employeeId;
          notification('success', `업데이트 완료!`);
          emit('createdDone', true)
      })

      // ================FUNCTION============================================ 

      const caclInput = () => {
      let objIncomeTax: any = Formula.getIncomeTax(dataAction.input.paymentAmount, dataAction.input.taxRate);
      dataAction.input.withholdingIncomeTax = objIncomeTax.incomeTax;
      dataAction.input.withholdingLocalIncomeTax = objIncomeTax.localIncomeTax;
    };
    const changeInput = () => {
        caclInput();
    }
    const popupAddStatus = ref<boolean>(false);
    const titleModalConfirm = ref('Do you want to reset your form?');
    const dataActionToCompare = ref({
      paymentDay: null,
      employeeId: 0,
      incomeTypeCode: "",
      paymentAmount: 0,
      taxRate: 3,
      withholdingIncomeTax: 0,
      withholdingLocalIncomeTax: 0,
    });
    const popupAddType = ref(1);
    const dataActionEditInit = ref({});
    const isCompare = ref(false);
    const copyFocusRowKey = ref();
    const oldIncomeId = ref(1);
    const resetForm = () => {
      disabledInput.value = false
        dataAction.input.paymentDay = null
        dataAction.input.employeeId = 0
        dataAction.input.incomeTypeCode = ""
        dataAction.input.paymentAmount = 0
        dataAction.input.withholdingIncomeTax = 0
        dataAction.input.withholdingLocalIncomeTax = 0
        switchAction.value = true;
        gridRefName.value.instance.option("selectedRowKeys", -[]);
        gridRefName.value.instance.option("focusedRowIndex", -1);
    }
    const onPopupComfirm = (e: any) => {
      if (e) {
        if (popupAddType.value == 2) {
          onSave();
          // isCompare.value = true;
          focusedRowKey.value = copyFocusRowKey.value;
          triggerDetailDetailEdit.value = true;
          refetchDetailEdit()
        } else {
          resetForm();
        }
      } else {
        if (popupAddType.value == 2) {
          // isCompare.value = true;
          dataCallApiDetailEdit.incomeId = oldIncomeId.value;
          triggerDetailDetailEdit.value = true
          refetchDetailEdit()
        }
          // isLoadNewForm.value = true;
      }
    };
    const addRow = () => {
      if(!disabledInput.value){
        if (JSON.stringify(dataAction.input) != JSON.stringify(dataActionToCompare.value)) {
          popupAddStatus.value = true;
          titleModalConfirm.value = 'Do you want to reset your form?';
        }
      }else {
        resetForm();
      }
    }
      const onFocusedRowChanged = (data: any) => {
          const dataRow = data.row && data.row.data;
          console.log(`output-> focus row key hihi`,)
          if(!dataRow){
            disabledInput.value = false;
          }
          if(dataRow){
            disabledInput.value = true;
            switchAction.value = false
            
            if (isCompare.value){
              if ( JSON.stringify(dataAction.input) != JSON.stringify(dataActionEditInit.value)) {
                popupAddType.value = 2
                popupAddStatus.value = true;
                titleModalConfirm.value = '변경 내용을 저장하시겠습니까?';
                copyFocusRowKey.value = dataRow.employeeId;
                oldIncomeId.value = dataRow?.incomeId
              }else {
              dataCallApiDetailEdit.processKey = processKey.value
              dataCallApiDetailEdit.incomeId = dataRow?.incomeId;
              triggerDetailDetailEdit.value = true
              refetchDetailEdit();
            }
            }else {
              dataCallApiDetailEdit.processKey = processKey.value
              dataCallApiDetailEdit.incomeId = dataRow?.incomeId;
              triggerDetailDetailEdit.value = true
              refetchDetailEdit();
              setTimeout(()=> {
                isCompare.value = true;
              }, 100)
            }
          } 
      }

      const changeIncomeTypeCode = (res: string) => {
          dataAction.input.incomeTypeCode = res
      }

      const selectionChanged = (event: any) => {
          popupDataDelete.value = event.selectedRowKeys
      }

      const deleteItem = () => {
          if (popupDataDelete.value.length > 0) {
              modalDelete.value = true;
          }
      };

      const actionDeleteSuccess = () => {
          modalDelete.value = false
          modalEdit.value = false
          triggerDetail.value = true
          refetchTableDetail()
          addRow()
          emit('createdDone', true)
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
            notification('error', `항목을 하나 선택하세요!`)
          }
      }

      const customTextSummary = () => {
          let total = 0
          dataSourceDetail.value.map((val: any) => {
              total += val.withholdingIncomeTax + val.withholdingLocalIncomeTax
          })
          return '공제합계: ' + filters.formatCurrency(total)
      }

      const statusComfirm = () => {
        actionChangeIncomeProcessBusinessStatus({
              companyId: companyId,
              processKey: { ...processKey.value },
              status: statusButton.value
          })
      }
      const onSave = () => {
        dataAction.processKey.imputedMonth = parseInt(month1.value.split('-')[1])
          dataAction.processKey.imputedYear = parseInt(month1.value.split('-')[0])
          dataAction.processKey.paymentMonth = parseInt(month2.value.split('-')[1])
          dataAction.processKey.paymentYear = parseInt(month2.value.split('-')[0])
          if (switchAction.value == true) {
              actionCreated(dataAction)
          }
          else {
            let inputEdit = {
              ...dataAction,
              incomeId: dataCallApiDetailEdit.incomeId,
              input: {
                  paymentAmount: dataAction.input.paymentAmount,
                  taxRate: 3,
                  withholdingIncomeTax: dataAction.input.withholdingIncomeTax,
                  withholdingLocalIncomeTax: dataAction.input.withholdingLocalIncomeTax,
              }
            }
            actionEdit(inputEdit)
        }
        };
      const formatMonth = (month: any) => {
        if (+month < 10) {
            return '0' + month;
        }
        return month;
      };

      const processKeyPA620 = computed(() => store.getters['common/processKeyPA620']);
      watch(processKeyPA620,(newVal: any,oldV)=>{
          isCompare.value = false;
          focusedRowKey.value = 0;
          isFirstChange.value = true;
          dataTableDetail.processKey = processKeyPA620.value;
          delete dataTableDetail.processKey.status;
            triggerDetail.value = true;
            refetchOption()
            let date1 = processKeyPA620.value.imputedYear + '-' + processKeyPA620.value.imputedMonth
            let date2 = processKeyPA620.value.paymentYear + '-' + processKeyPA620.value.paymentMonth
            month1.value = dayjs(date1).format("YYYY-MM")
            month2.value = dayjs(date2).format("YYYY-MM");
        })
      const focusedRowKey = ref<Number>();
      const gridRefName: any = ref();
// COMPARE DATA TO CHECK FORM WHEN ROW CHANGE
      //TH1: NO EDITED
      
      return {
          month1, month2,
          arrayEmploySelect,
          statusButton,dataActionUtils,
          dataTableDetail,
          dataAction,
          rowTable, per_page, move_column, colomn_resize,
          loadingTableDetail,
          dataSourceDetail,
          amountFormat,
          loadingCreated,
          loadingDetailEdit,
          arrDropDown,
          placements,
          loadingEdit,
          disabledInput,
          modalDelete,
          popupDataDelete,
          modalHistory,
          modalHistoryStatus,
          modalEdit,
          addRow,processKey,
          deleteItem,
          changeIncomeTypeCode,
          selectionChanged,
          actionDeleteSuccess,
          onItemClick,
          editPaymentDate,
          customTextSummary,
          statusComfirm,
          onSave,
          formatMonth,
          processKeyPA620,
          focusedRowKey,
          inputDateTax,
          paymentDateTax,
          onFocusedRowChanged,
          changeInput,
          gridRefName,
          popupAddStatus,
          titleModalConfirm,
          onPopupComfirm,
          copyFocusRowKey,
          isCompare
      }
  }
});
</script>
<style scoped src="../style/style.scss" >

</style>
