<template>
  <div class="d-flex-center mt-10 title-action" :class="{ 'ele-opacity': !compareForm() }">
    <div>
      <DxButton :text="'귀 ' + inputDateTax" :disabled="isDisabledForm" :style="{
        color: 'white',
        backgroundColor: 'gray',
        height: $config_styles.HeightInput,
      }" class="btn-date" />
      <DxButton :text="'지 ' + paymentDateTax" :disabled="isDisabledForm" :style="{
        color: 'white',
        backgroundColor: 'black',
        height: $config_styles.HeightInput,
      }" class="btn-date" />
      <process-status v-model:valueStatus="statusButton" @checkConfirm="statusComfirm" v-if="!isDisabledForm"
        :disabled="(statusButton == 30 || statusButton == 40 || !compareForm()) && userType !== 'm'" />
    </div>
    <div class="d-flex option-action">
      <DxButton class="ml-3" icon="plus" @click="openAddNewModal" :disabled="isDisabledForm || isExpiredStatus" />
      <DxButton class="ml-3" @click="deleteItem" :disabled="isDisabledForm || isExpiredStatus || isNewRow">
        <img style="width: 17px" src="@/assets/images/icon_delete.png" alt="" />
      </DxButton>
      <DxButton class="ml-4 d-flex" style="cursor: pointer" @click="modalHistory = true" :disabled="isDisabledForm">
        <a-tooltip placement="top">
          <template #title>사업소득자료 변경이력</template>
          <div style="text-align: center" @click="onItemClick('history')">
            <HistoryOutlined style="font-size: 16px" />
          </div>
        </a-tooltip>
      </DxButton>
      <DxButton class="ml-4" style="cursor: pointer" @click="modalHistoryStatus = true" :disabled="isDisabledForm">
        <a-tooltip placement="top">
          <template #title>사업소득 마감상태 변경이력</template>
          <div style="text-align: center" @click="onItemClick('historyEdit')">
            <img src="@/assets/images/icon_status_history.png" alt="" class="icon_status_history" />
          </div>
        </a-tooltip>
      </DxButton>
      <DxButton @click="editPaymentDate" class="ml-4 custom-button-checkbox"
        :disabled="isDisabledForm || isExpiredStatus || isNewRow">
        <div class="d-flex-center">
          <checkbox-basic :valueCheckbox="true" :disabled="true" />
          <span class="fz-12 pl-5">지급일변경</span>
        </div>
      </DxButton>
      <div class="custom-select-tab ml-4">
        <DxButton class="button-open-tab" @click="onItemClick('openTab')">사업소득자등록</DxButton>
      </div>
    </div>
  </div>
  <a-row class="mt-10">
    <a-col span="15" class="col-tax" :class="{ 'ele-opacity': !compareForm() }">
      <a-spin :spinning="loadingIncomeBusinesses" size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail" :show-borders="true"
          key-expr="incomeId" :allow-column-reordering="move_column" :onRowClick="onRowClick"
          :allow-column-resizing="colomn_resize" :column-auto-width="true" :focused-row-enabled="true"
          @selection-changed="selectionChanged" v-model:focused-row-key="focusedRowKey"
          v-model:selected-row-keys="selectedRowKeys" ref="gridRef" @focused-row-changing="onFocusedRowChanging"
          id="tax-pay-620" noDataText="내역이 없습니다">
          <DxSelection select-all-mode="allPages" mode="multiple" />
          <DxColumn caption="사업소득자 [소득구분]" cell-template="tag" data-field="employeeId" alignment="left" />
          <template #tag="{ data }">
            <div v-if="data.data.employeeId" class="d-flex-center">
              <span class="btn-container">
                {{ data.data.employeeId }}
              </span>
              <a-tooltip placement="top" zIndex="999999" :title="data.data?.employee?.name">
                <div class="name-w-1 text-overflow mr-5 ml-5">
                  {{ data.data?.employee?.name }}
                </div>
              </a-tooltip>
              <!-- <div class="name-w-1 text-overflow" v-else>
            {{ data.data?.employee?.name }}
          </div> -->
              <a-tooltip placement="top" zIndex="999999"
                :title="data.data?.employee?.incomeTypeCode + ' ' + data.data?.employee?.incomeTypeName">
                <a-tag class="py-1 mr-0 text-overflow">{{ data.data?.employee?.incomeTypeName }}</a-tag>
              </a-tooltip>
            </div>
            <div v-else></div>
            <!-- <employ-type-select :readOnly="true"
              :arrayValue="arrayEmploySelect" v-model:valueEmploy="data.data.employeeId" :newLoadKey="data.data.employeeId"/> -->
          </template>
          <DxColumn width="80px" caption="지급일" data-field="paymentDay" cell-template="paymentDay" />
          <template #paymentDay="{ data }">
            {{ formatMonth(data.data.paymentDay) }}
          </template>
          <DxColumn caption="지급액" width="100px" data-field="paymentAmount" :format="amountFormat" data-type="string"
            alignment="right" />
          <DxColumn caption="세율" width="60px" data-field="taxRate" cell-template="taxRateSlot" alignment="left" />
          <template #taxRateSlot="{ data }"> {{ data.value }}% </template>
          <DxColumn caption="공제" cell-template="income-tax" data-field="withholdingLocalIncomeTax" width="100px"
            alignment="right" :calculateCellValue="calculateIncomeTypeCodeAndName" />
          <template #income-tax="{ data }">
            <a-tooltip placement="top">
              <template #title>소득세
                {{ $filters.formatCurrency(data.data.withholdingIncomeTax) }} /
                지방소득세
                {{
                  $filters.formatCurrency(data.data.withholdingLocalIncomeTax)
                }}
              </template>
              <span>
                {{
                  $filters.formatCurrency(
                    data.data.withholdingIncomeTax +
                    data.data.withholdingLocalIncomeTax
                  )
                }}
              </span>
            </a-tooltip>
          </template>
          <DxColumn caption="차인지급액" width="120px" data-field="actualPayment" data-type="string" :format="amountFormat"
            alignment="right" />
        </DxDataGrid>
        <a-row style="
            border: 1px solid #ddd;
            border-top: none;
            display: flex;
            padding: 5px 10px;
          " class="fs-14">
          <a-col class="sum-item">
            <div class="dx-datagrid-summary-item dx-datagrid-text-content">
              사업소득자[소득구분]수
              <span style="font-size: 16px">[{{ dataSourceDetail.length }}]</span>
            </div>
          </a-col>
          <a-col class="sum-item">
            <div class="dx-datagrid-summary-item dx-datagrid-text-content">
              지급액합계
              <span style="font-size: 16px">[{{ calcSummary(dataSourceDetail, "paymentAmount") }}]</span>
            </div>
          </a-col>
          <a-col class="sum-item">
            <div class="dx-datagrid-summary-item dx-datagrid-text-content">
              공제합계
              <span style="font-size: 16px">[{{ customTextSummary() }}]</span>
            </div>
          </a-col>
          <a-col class="sum-item">
            <div class="dx-datagrid-summary-item dx-datagrid-text-content">
              차인지급액합계
              <span style="font-size: 16px">[{{ calcSummary(dataSourceDetail, "actualPayment") }}]</span>
            </div>
          </a-col>
        </a-row>
      </a-spin>
    </a-col>
    <a-col span="9" class="form-tax form-action">
      <a-spin :spinning="loadingIncomeBusiness || loadingIncomeBusinesses" size="large">
        <StandardForm formName="pa-620-form" ref="pa620FormRef">
          <a-form-item label="사업소득자" label-align="right" class="red">
            <employ-type-select :arrayValue="arrayEmploySelect" v-model:valueEmploy="dataAction.input.employeeId"
              :required="true" :newLoadKey="dataAction.input.employee.key"
              @incomeTypeCode="changeIncomeTypeCode" :disabled="disabledInput || idDisableNoData"
              :popupAttributes="{ id: 'pa-620-popup' }" />
          </a-form-item>
          <div class="header-text-1 mb-10 mt-10">소득내역</div>
          <div class="income-details">
            <a-row>
              <a-col :span="13"  class="input-group-left">
                <a-form-item label="귀속/지급연월" label-align="right">
                  <!-- <div class="d-flex-center"> -->
                    <DxButton :text="'귀 ' + inputDateTax" :disabled="isDisabledForm" :style="{
                      color: 'white',
                      backgroundColor: 'gray',
                      height: $config_styles.HeightInput,
                    }" class="btn-date" />
                    <DxButton :text="'지 ' + paymentDateTax" :disabled="isDisabledForm" :style="{
                      color: 'white',
                      backgroundColor: 'black',
                      height: $config_styles.HeightInput,
                    }" class="btn-date" />
                  <!-- </div> -->
                </a-form-item>
                <a-form-item label="지급일" label-align="right" class="red">
                  <!-- <div> -->
                    <date-time-box-custom width="150px" class="mr-5" :required="true" :startDate="startDate"
                      :finishDate="finishDate" v-model:valueDate="dayDate" :clearable="false"
                      :disabled="disabledInput || idDisableNoData" />
                    <div v-if="isLoopDay" class="error-group" style="max-width: 150px;">
                      동일 소득자의 동일 지급일로 중복 등록 불가합니다.
                    </div>
                  <!-- </div> -->
                </a-form-item>
                <a-form-item label="지급액" label-align="right" class="red">
                  <div class="d-flex-center">
                    <number-box-money :min="0" width="150px" class="mr-5" :max="2147483647" :disabled="idDisableNoData"
                      v-model:valueInput="dataAction.input.paymentAmount" @changeInput="caclInput" :required="true"
                      format="0,###" />
                    원
                  </div>
                </a-form-item>
                <a-form-item label="세율" label-align="right"> 3% </a-form-item>
              </a-col>
              <a-col :span="11"  class="input-group-right">
                <div class="header-text-2 mb-10">
                  공제합계
                  <b>
                    {{
                      $filters.formatCurrency(
                        dataAction.input.withholdingIncomeTax +
                        dataAction.input.withholdingLocalIncomeTax
                      )
                    }} </b>원
                </div>
                <div>
                  <a-form-item label="소득세(공제)" label-align="right">
                    <div class="d-flex-center">
                      <number-box-money :min="0" width="135px" class="mr-5" :disabled="idDisableNoData"
                        v-model:valueInput="dataAction.input.withholdingIncomeTax
                          " format="0,###" />
                      원
                    </div>
                  </a-form-item>
                  <a-form-item label="지방소득세(공제)" label-align="right">
                    <div class="d-flex-center">
                      <number-box-money :min="0" width="135px" class="mr-5" :disabled="idDisableNoData"
                        v-model:valueInput="dataAction.input.withholdingLocalIncomeTax
                          " format="0,###" />
                      원
                    </div>
                  </a-form-item>
                </div>
                <div class="header-text-2 mb-10">
                  <div class="input-text">
                    차인지급액
                    <b class="ml-5">
                      {{
                        $filters.formatCurrency(dataAction.input.actualPayment)
                      }}</b>원
                    <a-tooltip placement="top" class="custom-tooltip">
                      <template #title> 지급액 - 공제합계 </template>
                      <div style="text-align: center">
                        <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px" class="mb-3 ml-10" />
                      </div>
                    </a-tooltip>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
          <a-row justify="center" class="my-10 mt-20">
            <button-basic text="저장" type="default" mode="contained" :width="90" @onClick="onSave($event)" id="save-js-620"
              size="large" class="ml-4" :disabled="idDisableNoData">
            </button-basic>
          </a-row>
        </StandardForm>
      </a-spin>
    </a-col>
  </a-row>
  <DeletePopup :modalStatus="modalDelete" @closePopup="actionDeleteSuccess" :data="popupDataDelete"
    :processKey="paramIncomeBusinesses.processKey" />
  <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="paramIncomeBusinesses.processKey"
    title="변경이력" typeHistory="pa-620" />
  <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
    :data="paramIncomeBusinesses.processKey" title="변경이력" typeHistory="pa-620-status" />
  <EditPopup :modalStatus="modalEdit" @closePopup="actionEditSuccess" :data="editParam"
    :processKey="paramIncomeBusinesses.processKey" :dataUpdate="changeDayData" :dayArr="dayArr" />
  <PopupMessage :modalStatus="rowChangeStatus" @closePopup="rowChangeStatus = false" typeModal="confirm"
    :title="titleModalConfirm" content="" cancelText="아니요" okText="네" @checkConfirm="onRowChangeComfirm"
    :isConfirmIcon="false" />
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useQuery, useMutation } from "@vue/apollo-composable";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxSelection,
  DxToolbar,
  DxEditing,
  DxScrolling,
  DxMasterDetail,
  DxSummary,
  DxTotalItem,
} from "devextreme-vue/data-grid";
import {
  EditOutlined,
  HistoryOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons-vue";
import { calcSummary, companyId, openTab, userType } from "@/helpers/commonFunction";
import { dataActionUtils } from "../utils/index";
import { Formula } from "@bankda/jangbuda-common";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA6/PA620/index";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index";
import DxButton from "devextreme-vue/button";
import DeletePopup from "./DeletePopup.vue";
import EditPopup from "./EditPopup.vue";
import filters from "@/helpers/filters";
import { Message } from "@/configs/enum";
import dayjs from "dayjs";
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxScrolling,
    DxToolbar,
    DxEditing,
    DxButton,
    DxMasterDetail,
    DxSummary,
    DxTotalItem,
    EditOutlined,
    HistoryOutlined,
    DeleteOutlined,
    SaveOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    DeletePopup,
    EditPopup,
  },
  props: {
    statusBt: {
      type: Number,
    },
    isDisabledForm: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    let disabledInput = ref(false);
    let statusButton = ref(props.statusBt);
    let dataSourceDetail = ref<any>([]);
    const modalEdit = ref<boolean>(false);
    const popupDataDelete: any = ref([]);
    const modalDelete = ref<boolean>(false);
    const amountFormat = ref({ currency: "VND", useGrouping: true });
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const globalYear = ref<number>(
      parseInt(sessionStorage.getItem("paYear") ?? "0")
    );
    const modalHistory = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);
    let paymentDayPA620 = computed(() => {
      let day = store.state.common.paymentDayPA620;
      const daysInMonth = +dayjs(
        `${paramIncomeBusinesses.processKey.paymentMonth}`
      ).daysInMonth();
      let newDay = day > daysInMonth || day == 0 ? daysInMonth : day;
      return newDay;
    });
    const processKeyPA620 = computed(
      () => store.getters["common/processKeyPA620"]
    );
    let dataAction: any = ref({ ...dataActionUtils });
    const dataActionEdit: any = ref({ ...dataActionUtils });
    const focusedRowKey = ref();
    const popupAddStatus = ref<boolean>(false);
    const messageConfirm = Message.getMessage("COMMON", "501").message;
    const messageCreate = Message.getMessage("COMMON", "101").message;
    const titleModalConfirm = ref(messageConfirm);
    const inputDateTax = computed(() => {
      if (!props.isDisabledForm) {
        return (
          processKeyPA620.value.imputedYear +
          "-" +
          formatMonth(processKeyPA620.value.imputedMonth)
        );
      }
      return "";
    });
    const paymentDateTax = computed(() => {
      if (!props.isDisabledForm) {
        return (
          processKeyPA620.value.paymentYear +
          "-" +
          formatMonth(processKeyPA620.value.paymentMonth)
        );
      }
      return "";
    });
    const messageDelNoItem = Message.getMessage("COMMON", "404").message;
    const editParam = ref([]);
    const pa620FormRef = ref();
    const isExpiredStatus = computed(() => {
      if (!statusButton.value) {
        return false;
      }
      return (userType === 'm' && +statusButton.value === 40)  || (userType !== 'm' && +statusButton.value > 20)
    });
    const messageUpdate = Message.getMessage("COMMON", "106").message;
    const idDisableNoData = computed(() => {
      if (!props.isDisabledForm && !disabledInput.value && !isNewRow.value) {
        return true;
      }
      if (props.isDisabledForm || isExpiredStatus.value) {
        return true;
      }
      return false;
    });
    let paramIncomeBusinesses: any = reactive({
      companyId: companyId,
      processKey: processKeyPA620.value,
    });
    const savePA610 = computed(() => store.state.common.savePA610);
    const dayDate = ref<any>(null);
    watch(
      () => dayDate.value,
      (newVal: any) => {
        dataAction.value.input.paymentDay = +newVal.toString().slice(-2);
        dataActionEdit.value.input.paymentDay = +newVal.toString().slice(-2);
      },
      { deep: true }
    );
    const startDate = computed(() => {
      let day = dayjs(
        `${paramIncomeBusinesses.processKey.paymentYear}${paramIncomeBusinesses.processKey.paymentMonth}`
      )
        .startOf("month")
        .toDate();
      return day;
    });
    const finishDate = computed(() => {
      let day = dayjs(
        `${paramIncomeBusinesses.processKey.paymentYear}${paramIncomeBusinesses.processKey.paymentMonth}`
      )
        .endOf("month")
        .toDate();
      return day;
    });
    // ================GRAPQL==============================================
    // API QU`ERY TABLE SMALL LEFT SIDE
    const triggerIncomeBusinesses = ref<boolean>(false);
    const {
      loading: loadingIncomeBusinesses,
      onError: errorIncomeBusinesses,
      onResult: resIncomeBusinesses,
    } = useQuery(queries.getIncomeBusinesses, paramIncomeBusinesses, () => ({
      enabled: triggerIncomeBusinesses.value,
      fetchPolicy: "no-cache",
    }));
    const isFirstChange = ref(true);
    resIncomeBusinesses((res) => {
      const val = res.data.getIncomeBusinesses;
      dataSourceDetail.value = val;
      if (isFirstChange.value && val.length > 0) {
        focusedRowKey.value = dataSourceDetail.value[0]?.incomeId;
        selectedRowKeys.value = [dataSourceDetail.value[0]?.incomeId];
        idRowFake.value = dataAction.value.input.incomeId;
        disabledInput.value = true;
        dataCallApiIncomeBusiness.incomeId = val[0]?.incomeId;
        triggerIncomeBusiness.value = true;
      }
      if (val.length == 0) {
        disabledInput.value = false;
        resetForm();
      }
      if (compareType.value == 3) {
        addNewRow();
      }
      triggerIncomeBusinesses.value = false;
      isFirstChange.value = false;
    });
    errorIncomeBusinesses((res) => {
      notification("error", res.message);
    });
    // API QUERY GET VALUE OPTION

    let arrayEmploySelect: any = ref([]);
    let dataCallApiGetOption = ref({
      companyId: companyId,
      imputedYear: globalYear,
    });
    const triggerOption = ref<boolean>(true);
    const {
      refetch: refetchOption,
      loading: loadingOption,
      onError: errorOption,
      result: resOption,
    } = useQuery(queries.getEmployeeBusinesses, dataCallApiGetOption, () => ({
      enabled: triggerOption.value,
      fetchPolicy: "no-cache",
    }));
    watch(resOption, (newValue: any) => {
      arrayEmploySelect.value = newValue.getEmployeeBusinesses.map(
        (item: any) => ({
          ...item,
          key: item.employeeId,
        })
      );
      triggerOption.value = false;
    });
    errorOption((res) => {
      notification("error", res.message);
    });

    watch(savePA610, () => {
      // watch PA610 save or update success
      triggerOption.value = true;
      refetchOption();
    });
    // API QUERY getIncomeBusiness
    let dataCallApiIncomeBusiness = reactive({
      processKey: processKeyPA620.value,
      companyId: companyId,
      incomeId: 0,
    });
    const triggerIncomeBusiness = ref<boolean>(false);
    const {
      loading: loadingIncomeBusiness,
      onError: errorIncomeBusiness,
      result: resIncomeBusiness,
    } = useQuery(queries.getIncomeBusiness, dataCallApiIncomeBusiness, () => ({
      enabled: triggerIncomeBusiness.value,
      fetchPolicy: "no-cache",
    }));
    watch(resIncomeBusiness, (newValue) => {
      if (newValue) {
        let data = newValue.getIncomeBusiness;
        if (isClickEditClick.value) {
          isClickEditClick.value = false;
        } else {
          selectedRowKeys.value = [data.incomeId];
        }
        let rowData: any = {};
        rowData.paymentDay = data.paymentDay;
        rowData.employeeId = data.employeeId;
        rowData.incomeId = data.incomeId;
        rowData.paymentAmount = data.paymentAmount;
        rowData.taxRate = data.taxRate;
        rowData.withholdingIncomeTax = data.withholdingIncomeTax;
        rowData.withholdingLocalIncomeTax = data.withholdingLocalIncomeTax;
        rowData.actualPayment = data.actualPayment;
        rowData.employee = { key: data.employeeId };
        dataAction.value.input = rowData;
        dataActionEdit.value.input = { ...JSON.parse(JSON.stringify(rowData)) };
        disabledInput.value = true;
        dayDate.value = `${processKeyPA620.value.paymentYear
          }${filters.formatMonth(processKeyPA620.value.paymentMonth)}${data.paymentDay
          }`;
      } else {
        resetForm();
      }
      triggerIncomeBusiness.value = false;
    });
    errorIncomeBusiness((res) => {
      notification("error", res.message);
    });

    // ===================================== WATCHING PROCESSKEY TO CHANGE TABLE DATA ============================================

    watch(
      () => props.statusBt,
      (newValue) => {
        statusButton.value = newValue;
      }
    );
    watch(processKeyPA620, (newVal: any, oldV) => {
      isFirstChange.value = true;
      isNewRow.value = false;
      paramIncomeBusinesses.processKey = processKeyPA620.value;
      delete paramIncomeBusinesses.processKey.status;
      triggerIncomeBusinesses.value = true;
      dataCallApiIncomeBusiness.processKey = newVal;
    });
    // ================FUNCTION============================================
    const caclInput = () => {
      let objIncomeTax: any = Formula.getIncomeTax(
        dataAction.value.input.paymentAmount,
        dataAction.value.input.taxRate * 100
      );
      dataAction.value.input.withholdingIncomeTax = objIncomeTax.incomeTax;
      dataAction.value.input.withholdingLocalIncomeTax =
        objIncomeTax.localIncomeTax;
      dataAction.value.input.actualPayment =
        dataAction.value.input.paymentAmount -
        dataAction.value.input.withholdingIncomeTax -
        dataAction.value.input.withholdingLocalIncomeTax;
    };

    // ======================= TRACK FORM CHANGE ================================

    const isNewRow = ref(false);
    const isClickMonthDiff = ref(false);
    const isClickYearDiff = ref(false);
    const isClickAddMonthDiff = ref(false);
    //compare Data
    const compareType = ref(2); //2 is row change. 1 is add button;
    const compareForm = () => {
      let daActionCompare = JSON.parse(JSON.stringify(dataAction.value));
      delete daActionCompare.input.employee;
      let daActionEditCompare = JSON.parse(
        JSON.stringify(dataActionEdit.value)
      );
      delete daActionEditCompare.input.employee;
      if (
        JSON.stringify(daActionCompare.input) ==
        JSON.stringify(daActionEditCompare.input)
      ) {
        return true;
      }
      return false;
    };
    //function common
    const resetForm = async () => {
      await pa620FormRef.value.resetValidate();
      dayDate.value = `${processKeyPA620.value.paymentYear
        }${filters.formatMonth(processKeyPA620.value.paymentMonth)}${paymentDayPA620.value
        }`;
      dataAction.value.input = {
        ...dataActionUtils.input,
        paymentDay: paymentDayPA620.value,
      };
      dataActionEdit.value.input = {
        ...dataActionUtils.input,
        paymentDay: paymentDayPA620.value,
      };
    };
    const addNewRow = async () => {
      await resetForm();
      dataSourceDetail.value = dataSourceDetail.value.concat(
        dataAction.value.input
      );
      focusedRowKey.value = dataAction.value.input.incomeId;
      setTimeout(() => {
        selectedRowKeys.value = [0];
      }, 10);
      isNewRow.value = true;
      compareType.value = 1;
      dataCallApiIncomeBusiness.incomeId = dataAction.value.input.incomeId;
      disabledInput.value = false;
    };
    const delNewRow = async () => {
      dataSourceDetail.value = dataSourceDetail.value.splice(
        0,
        dataSourceDetail.value.length - 1
      );
      isNewRow.value = false;
      compareType.value = 2;
    };
    //on add row
    const rowChangeStatus = ref<Boolean>(false);
    const openAddNewModal = async () => {
      compareType.value = 3;
      if (isNewRow.value) {
        if (!compareForm()) {
          rowChangeStatus.value = true;
          return;
        }
        return;
      }
      if (!compareForm()) {
        rowChangeStatus.value = true;
        return;
      }
      disabledInput.value = false;
      addNewRow();
      return;
    };
    //row change confirm
    const onRowChangeComfirm = async (ok: boolean) => {
      if (ok) {
        let ele = document.getElementById("save-js-620") as HTMLInputElement;
        ele.click();
      } else {
        removeHoverRowKey();
        if (isClickEditDiff.value) {
          onEditItem();
          compareType.value = 1;
          return;
        }
        if (isClickMonthDiff.value) {
          emit("noSave", 0);
          isClickMonthDiff.value = false;
          compareType.value = 1;
          return;
        }
        if (isClickAddMonthDiff.value) {
          emit("noSave", 2);
          isClickAddMonthDiff.value = false;
          return;
        }
        if (isNewRow.value) {
          dataSourceDetail.value = dataSourceDetail.value.splice(
            0,
            dataSourceDetail.value.length - 1
          );
          if (compareType.value == 1) {
            addNewRow();
            return;
          }
        }
        if (compareType.value === 1 || compareType.value == 3) {
          addNewRow();
          return;
        }
        if (compareType.value == 2) {
          dataCallApiIncomeBusiness.incomeId = idRowFake.value;
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
      if (isNewRow.value) {
        if (compareForm()) {
          await delNewRow();
          focusedRowKey.value = item.data.incomeId;
          selectedRowKeys.value = [item.data.incomeId];
          dataCallApiIncomeBusiness.incomeId = item.data.incomeId;
          return;
        }
        item.component.selectRows(dataAction.value.input.incomeId, true);
        rowChangeStatus.value = true;
        return;
      }
      if (!compareForm()) {
        item.component.selectRows(dataAction.value.input.incomeId, true);
        rowChangeStatus.value = true;
        return;
      } else {
        dataCallApiIncomeBusiness.incomeId = item.data.incomeId;
      }
    };
    //watch to refetch datadetail
    watch(
      () => dataCallApiIncomeBusiness.incomeId,
      (newVal) => {
        if (+newVal > 0) {
          triggerIncomeBusiness.value = true;
        }
      },
      { deep: true }
    );
    // click row
    const changeIncomeTypeCode = (emitVal: any) => {
      dataAction.value.input.employee = emitVal;
    };

    const selectedRowKeys = ref<any>([]);
    const selectionChanged = (event: any) => {
      changeDayData.value = {
        employeeId: event.selectedRowsData[0]?.employeeId,
      };
      popupDataDelete.value = event.selectedRowKeys;
      var days: any = [];
      var employeeIds: any[] = [];
      editParam.value = event.selectedRowsData.map((item: any) => {
        if (employeeIds.indexOf(item.employeeId) < 0) {
          employeeIds.push(item.employeeId);
          days = [
            ...days,
            ...dataSourceDetail.value
              .filter((item2: any) => item2.employeeId == item.employeeId)
              .map((item1: any) => item1.paymentDay),
          ];
        }
        return {
          param: { incomeId: item.incomeId },
          errorInfo: {
            employeeId: item.employeeId,
            incomeTypeName: item.employee.incomeTypeName,
            name: item.employee.name,
          },
        };
      });
      dayArr.value = days;
    };
    const deleteItem = () => {
      if (popupDataDelete.value.length > 0) {
        modalDelete.value = true;
      } else {
        notification("warning", messageDelNoItem);
      }
    };
    const actionDeleteSuccess = (val: Boolean) => {
      if (val) {
        triggerIncomeBusinesses.value = true;
        emit("createdDone", true);
        isFirstChange.value = true;
      }
      modalDelete.value = false;
    };
    const actionEditSuccess = (val: any) => {
      if (val.length > 0) {
        triggerIncomeBusinesses.value = true;
        dataCallApiIncomeBusiness.incomeId = val[0];
        triggerIncomeBusiness.value = true;
        selectedRowKeys.value = [...val];
        focusedRowKey.value = val[0];
      } else {
        isClickEditClick.value = false;
        isClickEditDiff.value = false;
      }
      modalEdit.value = false;
    };
    const onItemClick = (key: String) => {
      switch (key) {
        case "history":
          modalHistory.value = true;
          break;
        case "historyEdit":
          modalHistoryStatus.value = true;
          break;
        case "openTab":
          openTab({
            name: "사업소득자등록",
            url: "/pa-610",
            id: "pa-610",
          });
          break;
        default:
          break;
      }
    };
    //===============change day=========================
    const isClickEditDiff = ref(false);
    const isClickEditClick = ref(false);
    const changeDayData = ref<Object>({});
    const onEditItem = () => {
      if (popupDataDelete.value.length > 0) {
        modalEdit.value = true;
        isClickEditClick.value = true;
      } else {
        notification("warning", messageDelNoItem);
      }
    };
    const editPaymentDate = () => {
      isClickEditClick.value = true;
      if (!compareForm()) {
        compareType.value = 1;
        rowChangeStatus.value = true;
        isClickEditDiff.value = true;
        return;
      }
      onEditItem();
    };
    const customTextSummary = () => {
      let total = 0;
      dataSourceDetail.value.map((val: any) => {
        total += val.withholdingIncomeTax + val.withholdingLocalIncomeTax;
      });
      return filters.formatCurrency(total);
    };

    //---------------------- Action save status ----------------------

    const {
      mutate: actionChangeIncomeProcessBusinessStatus,
      onError: errorChangeIncomeProcessBusinessStatus,
      onDone: successChangeIncomeProcessBusinessStatus,
    } = useMutation(mutations.changeIncomeProcessBusinessStatus);
    errorChangeIncomeProcessBusinessStatus((e) => {
      //notification('error', e.message);
    });
    successChangeIncomeProcessBusinessStatus((e) => {
      focusedRowKey.value = dataAction.value.input.incomeId;
      selectedRowKeys.value = [dataAction.value.input.incomeId];
      notification("success", messageCreate);
      emit("statusDone", e.data.changeIncomeProcessBusinessStatus.status);
    });
    const statusComfirm = () => {
      actionChangeIncomeProcessBusinessStatus({
        companyId: companyId,
        processKey: { ...processKeyPA620.value },
        status: statusButton.value,
      });
    };

    // -------------------------ACTION FORM--------------------------------

    const onChangeFormdone = () => {
      disabledInput.value = true;
      isNewRow.value = false;
      focusedRowKey.value =
        compareType.value == 1
          ? dataAction.value.input.incomeId
          : idRowFake.value;
      dataActionEdit.value.input = { ...dataAction.value.input };
      emit("createdDone", true);
      if (!isClickEditClick.value) {
        selectedRowKeys.value =
          compareType.value == 1
            ? [dataAction.value.input.incomeId]
            : [idRowFake.value];
      }
      if (isClickMonthDiff.value) {
        emit("noSave", 0);
        isClickMonthDiff.value = false;
        return;
      }
      if (isClickAddMonthDiff.value) {
        emit("noSave", 2);
        isClickAddMonthDiff.value = false;
        return;
      }
      triggerIncomeBusinesses.value = true;
      dataCallApiIncomeBusiness.incomeId =
        compareType.value == 2
          ? idRowFake.value
          : dataAction.value.input.incomeId;
    };
    const onChangeFormError = () => {
      removeHoverRowKey();
      emit("subValidate");
      resetOnError();
      focusedRowKey.value = dataAction.value.input.incomeId;
    };
    const {
      mutate: actionCreated,
      onError: errorCreated,
      loading: loadingCreated,
      onDone: doneCreated,
    } = useMutation(mutations.createIncomeBusiness);

    doneCreated((res) => {
      notification("success", messageCreate);
      if (compareType.value == 3) {
        dataActionEdit.value.input = { ...dataAction.value.input };
        triggerIncomeBusinesses.value = true;
        disabledInput.value = false;
        emit("createdDone", true);
        triggerIncomeBusinesses.value = true;
        return;
      }
      dataAction.value.input.incomeId = res.data.createIncomeBusiness.incomeId;
      dataActionEdit.value.input.incomeId =
        res.data.createIncomeBusiness.incomeId;
      onChangeFormdone();
    });
    errorCreated((res) => {
      notification("error", res.message);
      onChangeFormError();
    });
    // API EDIT
    const {
      mutate: actionEdit,
      onError: errorEdit,
      loading: loadingEdit,
      onDone: doneEdit,
    } = useMutation(mutations.updateIncomeBusiness);
    doneEdit((res) => {
      notification("success", messageUpdate);
      if (compareType.value == 3) {
        dataActionEdit.value.input = { ...dataAction.value.input };
        triggerIncomeBusinesses.value = true;
        disabledInput.value = false;
        emit("createdDone", true);
        triggerIncomeBusinesses.value = true;
        return;
      }
      onChangeFormdone();
      if (isClickEditDiff.value) {
        onEditItem();
      }
    });
    errorEdit((res) => {
      notification("error", res.message);
      onChangeFormError();
    });
    //
    const resetOnError = () => {
      removeHoverRowKey();
      emit("subValidate");
      focusedRowKey.value = dataAction.value.input.incomeId;
      selectedRowKeys.value = [dataAction.value.input.incomeId];
      isClickEditDiff.value = false;
      isClickMonthDiff.value = false;
      isClickAddMonthDiff.value = false;
      compareType.value = 1;
    };
    const onSave = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid || isLoopDay.value) {
        res.brokenRules[0]?.validator?.focus();
        resetOnError();
      } else {
        let params = JSON.parse(JSON.stringify(dataAction.value));
        delete params.input.incomeId;
        delete params.input.employee;
        delete params.input.actualPayment;
        params.input.paymentDay = +dayDate.value.toString().slice(-2);
        if (!disabledInput.value) {
          let createData = params;
          actionCreated({
            companyId: companyId,
            processKey: processKeyPA620.value,
            input: createData.input,
          });
        } else {
          delete params.input.paymentDay;
          delete params.input.employeeId;
          let inputEdit = {
            ...dataCallApiIncomeBusiness,
            incomeId: dataAction.value.input.incomeId,
            input: { ...params.input },
          };
          actionEdit(inputEdit);
        }
      }
    };
    //---------------------------------------------fn common--------------------------------
    const formatMonth = (month: any) => {
      if (month == null) {
        return "";
      }
      if (+month < 10) {
        return "0" + month;
      }
      return month ? month : "";
    };

    const checkLen = (text: String, num: number) => {
      if (text.length > num) {
        return text.substring(0, num - 3) + "...";
      }
      return text;
    };
    const checkLenTooltip = (text: String, num: number) => {
      return text.length > num ? text : "";
    };
    //-----------------------hover when click diff row----------------
    const gridRef = ref(); // ref of grid
    const dataGridRef = computed(() => gridRef.value?.instance as any); // ref of grid Instance
    const onFocusedRowChanging = (e: any) => {
      if (
        e.event.target.classList.value == "dx-checkbox-icon" ||
        e.event.target.classList.contains("dx-command-select")
      ) {
        e.cancel = true;
      }
      const rowElement = e.rowElement[0];
      // if (focusedRowKey.value == e.rows[e.newRowIndex].key) {
      //   e.cancel = true;
      //   return;
      // }
      if (!compareForm()) {
        e.cancel = true;
        rowElement?.classList.add("dx-state-hover-custom");
      }
    };
    const removeHoverRowKey = () => {
      const element = document.querySelector(".dx-state-hover-custom");
      if (element) dataGridRef.value?.refresh();
      focusedRowKey.value =
        compareType.value == 1
          ? dataAction.value.input.incomeId
          : idRowFake.value;
      selectedRowKeys.value =
        compareType.value == 1
          ? [dataAction.value.input.incomeId]
          : [idRowFake.value];
    };

    const isLoopDay = ref(false);
    const dayArr = ref<any[]>([]);
    function countOccurrences(arr: any[], number: number) {
      return arr.reduce((count, element) => {
        if (element === number) {
          return count + 1;
        }
        return count;
      }, 0);
    }
    const checkLoopDay = () => {
      let employeeId = dataAction.value.input.employeeId;
      if (dataSourceDetail.value.length) {
        dayArr.value = dataSourceDetail.value
          .filter((item: any) => item.employeeId == employeeId)
          .map((item1: any) => item1.paymentDay);
        if (
          countOccurrences(dayArr.value, dataAction.value.input.paymentDay) > 1
        ) {
          isLoopDay.value = true;
        } else {
          isLoopDay.value = false;
        }
      }
    };
    watch(
      () => [
        dataAction.value.input.employeeId,
        dataAction.value.input.paymentDay,
      ],
      ([newVal]) => {
        if (newVal) {
          checkLoopDay();
        }
      },
      { deep: true }
    );
    function calculateIncomeTypeCodeAndName(rowData: any) {
      return rowData.withholdingIncomeTax + rowData.withholdingLocalIncomeTax;
    }
    return {
      loadingOption,
      arrayEmploySelect,
      statusButton,
      dataActionUtils,
      paramIncomeBusinesses,
      dataAction,
      per_page,
      move_column,
      colomn_resize,
      loadingIncomeBusinesses,
      dataSourceDetail,
      amountFormat,
      loadingCreated,
      loadingIncomeBusiness,
      loadingEdit,
      disabledInput,
      modalDelete,
      popupDataDelete,
      modalHistory,
      modalHistoryStatus,
      modalEdit,
      processKeyPA620,
      focusedRowKey,
      inputDateTax,
      paymentDateTax,
      caclInput,
      openAddNewModal,
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
      onRowClick,
      onRowChangeComfirm,
      onFocusedRowChanging,
      removeHoverRowKey,
      gridRef,
      changeDayData,
      savePA610,
      popupAddStatus,
      titleModalConfirm,
      editParam,
      companyId,
      paymentDayPA620,
      rowChangeStatus,
      checkLen,
      compareForm,
      triggerOption,
      refetchOption,
      resetForm,
      dataActionEdit,
      dataCallApiIncomeBusiness,
      isNewRow,
      isClickMonthDiff,
      selectedRowKeys,
      pa620FormRef,
      isExpiredStatus,
      actionEditSuccess,
      compareType,
      idDisableNoData,
      isClickAddMonthDiff,
      isClickEditDiff,
      isClickYearDiff,
      triggerIncomeBusiness,
      isClickEditClick,
      calcSummary,
      checkLenTooltip,
      startDate,
      finishDate,
      dayDate,
      isLoopDay,
      calculateIncomeTypeCodeAndName,
      dayArr,
      userType
    };
  },
});
</script>
<style scoped src="../style/style.scss"></style>
