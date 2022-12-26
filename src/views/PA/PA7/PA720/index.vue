<template>
  <action-header title="기타소득자등록" @actionSave="onSubmit($event)" :buttonSave="false" />
  <div id="pa-720" class="page-content">
    <a-row>
      <a-spin :spinning="loadingIncomeProcessExtras || isRunOnce" size="large">
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="columnData"
          :show-borders="true"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
        >
          <DxColumn :caption="globalYear + '귀속월'" cell-template="imputed-year" />
          <template #imputed-year>
            <span>지급연월 </span>
          </template>
          <DxColumn caption="01" width="100px" cell-template="imputed-month1" />
          <template #imputed-month1="{ data }">
            <colorful-badge
              v-if="data.data.month_1"
              :value="data.data.month_1?.status"
              :year="data.data.month_1?.paymentYear"
              :month="data.data.month_1?.paymentMonth"
              :isUnder="month == 1"
              @click="showDetailSelected(data.data.month_1)"
            />
            <div v-else @click="onAddMonth(1)">[+]</div>
          </template>
          <DxColumn caption="02" width="100px" cell-template="imputed-month2" />
          <template #imputed-month2="{ data }">
            <colorful-badge
              v-if="data.data.month_2"
              :value="data.data.month_2?.status"
              :year="data.data.month_2?.paymentYear"
              :month="data.data.month_2?.paymentMonth"
              @click="showDetailSelected(data.data.month_2)"
              :isUnder="month == 2"
            />
            <div v-else @click="onAddMonth(2)">[+]</div>
          </template>
          <DxColumn caption="03" width="100px" cell-template="imputed-month3" />
          <template #imputed-month3="{ data }">
            <colorful-badge
              v-if="data.data.month_3"
              :value="data.data.month_3?.status"
              :year="data.data.month_3?.paymentYear"
              :month="data.data.month_3?.paymentMonth"
              @click="showDetailSelected(data.data.month_3)"
              :isUnder="month == 3"
            />
            <div v-else @click="onAddMonth(3)">[+]</div>
          </template>
          <DxColumn caption="04" width="100px" cell-template="imputed-month4" />
          <template #imputed-month4="{ data }">
            <colorful-badge
              v-if="data.data.month_4"
              :value="data.data.month_4?.status"
              :year="data.data.month_4?.paymentYear"
              :month="data.data.month_4?.paymentMonth"
              @click="showDetailSelected(data.data.month_4)"
              :isUnder="month == 4"
            />
            <div v-else @click="onAddMonth(4)">[+]</div>
          </template>
          <DxColumn caption="05" width="100px" cell-template="imputed-month5" />
          <template #imputed-month5="{ data }">
            <colorful-badge
              v-if="data.data.month_5"
              :value="data.data.month_5?.status"
              :year="data.data.month_5?.paymentYear"
              :month="data.data.month_5?.paymentMonth"
              @click="showDetailSelected(data.data.month_5)"
              :isUnder="month == 5"
            />
            <div v-else @click="onAddMonth(5)">[+]</div>
          </template>
          <DxColumn caption="06" width="100px" cell-template="imputed-month6" />
          <template #imputed-month6="{ data }">
            <colorful-badge
              v-if="data.data.month_6"
              :value="data.data.month_6?.status"
              :year="data.data.month_6?.paymentYear"
              :month="data.data.month_6?.paymentMonth"
              @click="showDetailSelected(data.data.month_6)"
              :isUnder="month == 6"
            />
            <div v-else @click="onAddMonth(6)">[+]</div>
          </template>
          <DxColumn caption="07" width="100px" cell-template="imputed-month7" />
          <template #imputed-month7="{ data }">
            <colorful-badge
              v-if="data.data.month_7"
              :value="data.data.month_7?.status"
              :year="data.data.month_7?.paymentYear"
              :month="data.data.month_7?.paymentMonth"
              @click="showDetailSelected(data.data.month_7)"
              :isUnder="month == 7"
            />
            <div v-else @click="onAddMonth(7)">[+]</div>
          </template>
          <DxColumn caption="08" width="100px" cell-template="imputed-month8" />
          <template #imputed-month8="{ data }">
            <colorful-badge
              v-if="data.data.month_8"
              :value="data.data.month_8?.status"
              :year="data.data.month_8?.paymentYear"
              :month="data.data.month_8?.paymentMonth"
              @click="showDetailSelected(data.data.month_8)"
              :isUnder="month == 8"
            />
            <div v-else @click="onAddMonth(8)">[+]</div>
          </template>
          <DxColumn caption="09" width="100px" cell-template="imputed-month9" />
          <template #imputed-month9="{ data }">
            <colorful-badge
              v-if="data.data.month_9"
              :value="data.data.month_9?.status"
              :year="data.data.month_9?.paymentYear"
              :month="data.data.month_9?.paymentMonth"
              @click="showDetailSelected(data.data.month_9)"
              :isUnder="month == 9"
            />
            <div v-else @click="onAddMonth(9)">[+]</div>
          </template>
          <DxColumn caption="10" width="100px" cell-template="imputed-month10" />
          <template #imputed-month10="{ data }">
            <colorful-badge
              v-if="data.data.month_10"
              :value="data.data.month_10?.status"
              :year="data.data.month_10?.paymentYear"
              :month="data.data.month_10?.paymentMonth"
              @click="showDetailSelected(data.data.month_10)"
              :isUnder="month == 10"
            />
            <div v-else @click="onAddMonth(10)">[+]</div>
          </template>
          <DxColumn caption="11" width="100px" cell-template="imputed-month11" />
          <template #imputed-month11="{ data }">
            <colorful-badge
              v-if="data.data.month_11"
              :value="data.data.month_11?.status"
              :year="data.data.month_11?.paymentYear"
              :month="data.data.month_11?.paymentMonth"
              @click="showDetailSelected(data.data.month_11)"
              :isUnder="month == 11"
            />
            <div v-else @click="onAddMonth(11)">[+]</div>
          </template>
          <DxColumn caption="12" width="100px" cell-template="imputed-month12" />
          <template #imputed-month12="{ data }">
            <colorful-badge
              v-if="data.data.month_12"
              :value="data.data.month_12?.status"
              :year="data.data.month_12?.paymentYear"
              :month="data.data.month_12?.paymentMonth"
              @click="showDetailSelected(data.data.month_12)"
              :isUnder="month == 12"
            />
            <div v-else @click="onAddMonth(12)">[+]</div>
          </template>
          <DxMasterDetail :enabled="true" template="row-detail" />
          <template #row-detail="{ data }">
            <div class="table-detail">
              <DxDataGrid
                key-expr="id"
                :data-source="IncomeProcessExtrasCustom"
                :show-borders="false"
                :column-auto-width="true"
                :allow-column-reordering="move_column"
                :show-column-headers="false"
                :allow-column-resizing="colomn_resize"
                :focused-row-enabled="true"
              >
                <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string" />
                <template #col-first="{ data }">
                  <b>{{ data.data.name }}</b
                  ><br />
                </template>
                <DxColumn caption="1" width="100px" cell-template="month-1" />
                <template #month-1="{ data }">
                  <div class="hover-underlined" @click="showDetailSelected(data.data.month1)" v-if="data.data.month1">
                    {{ data.data.month1.value }}
                  </div>
                </template>
                <DxColumn caption="2" width="100px" cell-template="month-2" />
                <template #month-2="{ data }">
                  <div class="hover-underlined" @click="showDetailSelected(data.data.month2)" v-if="data.data.month2">
                    {{ data.data.month2.value }}
                  </div>
                </template>
                <DxColumn caption="3" width="100px" cell-template="month-3" />
                <template #month-3="{ data }">
                  <div class="hover-underlined" @click="showDetailSelected(data.data.month3)" v-if="data.data.month3">
                    {{ data.data.month3.value }}
                  </div>
                </template>
                <DxColumn caption="4" width="100px" cell-template="month-4" />
                <template #month-4="{ data }">
                  <div class="hover-underlined" @click="showDetailSelected(data.data.month4)" v-if="data.data.month4">
                    {{ data.data.month4.value }}
                  </div>
                </template>
                <DxColumn caption="5" width="100px" cell-template="month-5" />
                <template #month-5="{ data }">
                  <div class="hover-underlined" @click="showDetailSelected(data.data.month5)" v-if="data.data.month5">
                    {{ data.data.month5.value }}
                  </div>
                </template>
                <DxColumn caption="6" width="100px" cell-template="month-6" />
                <template #month-6="{ data }">
                  <div class="hover-underlined" @click="showDetailSelected(data.data.month6)" v-if="data.data.month6">
                    {{ data.data.month6.value }}
                  </div>
                </template>
                <DxColumn caption="7" width="100px" cell-template="month-7" />
                <template #month-7="{ data }">
                  <div class="hover-underlined" @click="showDetailSelected(data.data.month7)" v-if="data.data.month7">
                    {{ data.data.month7.value }}
                  </div>
                </template>
                <DxColumn caption="8" width="100px" cell-template="month-8" />
                <template #month-8="{ data }">
                  <div class="hover-underlined" @click="showDetailSelected(data.data.month8)" v-if="data.data.month8">
                    {{ data.data.month8.value }}
                  </div>
                </template>
                <DxColumn caption="9" width="100px" cell-template="month-9" />
                <template #month-9="{ data }">
                  <div class="hover-underlined" @click="showDetailSelected(data.data.month9)" v-if="data.data.month9">
                    {{ data.data.month9.value }}
                  </div>
                </template>
                <DxColumn caption="10" width="100px" cell-template="month-10" />
                <template #month-10="{ data }">
                  <div class="hover-underlined" @click="showDetailSelected(data.data.month10)" v-if="data.data.month10">
                    {{ data.data.month10.value }}
                  </div>
                </template>
                <DxColumn caption="11" width="100px" cell-template="month-11" />
                <template #month-11="{ data }">
                  <div class="hover-underlined" @click="showDetailSelected(data.data.month11)" v-if="data.data.month11">
                    {{ data.data.month11.value }}
                  </div>
                </template>
                <DxColumn caption="12" width="100px" cell-template="month-12" />
                <template #month-12="{ data }">
                  <div class="hover-underlined" @click="showDetailSelected(data.data.month12)" v-if="data.data.month12">
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
      <a-col>
        <DxButton
          :text="'귀' + incomeExtrasParams?.processKey?.imputedYear + '-' + formatMonth(incomeExtrasParams?.processKey?.imputedMonth)"
          :style="{ color: 'white', backgroundColor: 'gray' }"
          :height="'33px'"
        />
        <DxButton
          :text="'지' + incomeExtrasParams?.processKey?.paymentYear + '-' + formatMonth(incomeExtrasParams?.processKey?.paymentMonth)"
          :style="{ color: 'white', backgroundColor: 'black' }"
          :height="'33px'"
        />
        <ProcessStatus v-model:valueStatus="statusParam.status" @checkConfirm="mutateChangeIncomeProcessExtraStatus(statusParam)" />
      </a-col>
      <a-col style="display: inline-flex; align-items: center">
        <DxButton class="ml-4" icon="plus" @click="resetForm" />
        <DxButton class="ml-3" @click="deleteItem">
          <img style="width: 17px" src="@/assets/images/icon_delete.png" alt="" />
        </DxButton>
        <DxButton @click="onSubmit($event)" size="large" class="ml-4" >
          <SaveOutlined style="font-size: 17px"/>
        </DxButton>
        
        <DxButton class="ml-4 d-flex" style="cursor: pointer" @click="modalHistory = true">
          <a-tooltip placement="top">
            <template #title>근로소득자료 변경이력</template>
            <div class="text-center">
              <HistoryOutlined style="font-size: 16px" />
            </div>
          </a-tooltip>
        </DxButton>
        <DxButton class="ml-4" style="cursor: pointer" @click="modalHistoryStatus = true">
          <a-tooltip placement="top">
            <template #title>근로소득 마감상태 변경이력</template>
            <div class="text-center">
              <img src="@/assets/images/icon_status_history.png" alt="" style="width: 16px; height: 16px" />
            </div>
          </a-tooltip>
        </DxButton>
        <DxButton @click="editItem" class="ml-4 custom-button-checkbox">
          <div class="d-flex-center">
            <checkbox-basic size="13" :valueCheckbox="true" disabled="true" />
            <span class="fz-12 pl-5">지급일변경</span>
          </div>
        </DxButton>
        <div class="custom-select-tab ml-4">
          <button class="button-open-tab" @click="openTab({ name: '기타소득자등록', url: '/dashboard/pa-710', id: 'pa-710' })">기타소득자등록</button>
        </div>
      </a-col>
    </a-row>
    <a-row class="content-btm">
      <a-col :span="13" class="custom-layout">
        <TaxPayInfo ref="taxPayRef" :dataCallTableDetail="incomeExtrasParams" @editTax="editTax" :changeFommDone="changeFommDone" :isRunOnce="isRunOnce" />
      </a-col>
      <a-col :span="11" class="custom-layout" style="padding-right: 0px">
        <FormTaxPayInfo ref="formTaxRef" :actionSave="actionSave" :editTax="editTaxParam" @changeFommDone="onFormDone" :key="resetFormNum" :addNewIncomeExtra="dataAddIncomeProcess" />
      </a-col>
    </a-row>
  </div>
  <DeletePopup @delDone="changeFommDone++" :modalStatus="modalDelete" @closePopup="actionDeleteSuccess" :data="deleteIncomeExtrasParam" />

  <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="incomeExtrasParams.processKey" title="변경이력" typeHistory="pa-720" />
  <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="" :data="incomeExtrasParams.processKey" title="변경이력" typeHistory="pa-720-status" />
  <EditPopup :modalStatus="modalEdit" @closePopup="actionEditDaySuccess" :data="changeIncomeExtraPaymentDayParam" />
  <CopyMonth :modalStatus="modalCopy" :month="dataModalCopy" @closePopup="modalCopy = false" @loadingTableInfo="onLoadingTable" @dataAddIncomeProcess="onAddIncomeProcess" />
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from 'vue';
import DxButton from 'devextreme-vue/button';
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { companyId, openTab } from '@/helpers/commonFunction';
import { DxDataGrid, DxColumn, DxMasterDetail } from 'devextreme-vue/data-grid';
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
export default defineComponent({
  components: {
    DxMasterDetail,
    DxDataGrid,
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
    const dataSource = ref<[]>([]);
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const trigger = ref<boolean>(true);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    // const modalPrintSalaryStatement = ref<boolean>(false);
    const modalDelete = ref<boolean>(false);
    const modalEdit = ref<boolean>(false);
    const modalHistory = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);
    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear,
    });
    let actionSave = ref(0);
    const editTaxParam = ref<any>({});
    const editTax = (emit: any) => {
      editTaxParam.value = emit;
    };
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
        imputedYear: +dayjs().format('YYYY'),
        imputedMonth: +dayjs().format('MM'),
        paymentYear: +dayjs().format('YYYY'),
        paymentMonth: +dayjs().format('MM'),
      },
    });
    const modalCopy = ref<boolean>(false);
    const dataModalCopy = ref<number>(1);
    const dataAddIncomeProcess = ref({});
    const popupAddStatus = ref<boolean>(false);
    // ======================= GRAPQL ================================
    const {
      refetch: refetchIncomeProcessExtras,
      result: resultIncomeProcessExtras,
      loading: loadingIncomeProcessExtras,
      onResult: onResultIncomeProcessExtras,
    } = useQuery(queries.getIncomeProcessExtras, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: 'no-cache',
    }));
    const { mutate: mutateChangeIncomeProcessExtraStatus, onDone: onDoneChangeIncomeProcessExtraStatusDone } = useMutation(mutations.changeIncomeProcessExtraStatus);
    // ======================= WATCH ==================================
    watch(resultIncomeProcessExtras, (value) => {
      dataSource.value = value.getIncomeProcessExtras;
      trigger.value = false;
    });
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
        console.log(`output->`,taxPayRef.value.paymentData)
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
    const onSubmit = (e: any) => {
      actionSave.value++;
    };
    const onFormDone = () => {
      changeFommDone.value++;
      resetForm();
    };
    onDoneChangeIncomeProcessExtraStatusDone((res) => {
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
    const onAddMonth = (month: number) => {
      dataModalCopy.value = month;
      modalCopy.value = true;
    };
    const onLoadingTable = () => {
      trigger.value = true;
      refetchIncomeProcessExtras();
    };
    const onAddIncomeProcess = (emit: any) => {
      dataAddIncomeProcess.value = emit;
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
      incomeExtrasParams.processKey.imputedMonth = obj.imputedMonth;
      incomeExtrasParams.processKey.imputedYear = obj.imputedYear;
      incomeExtrasParams.processKey.paymentYear = obj.paymentYear;
      incomeExtrasParams.processKey.paymentMonth = obj.paymentMonth;
      dataAddIncomeProcess.value = { ...incomeExtrasParams.processKey };
      statusParam.value = { ...incomeExtrasParams, status: obj.status };
      resetForm();
      month.value = obj.imputedMonth;
    };
    const IncomeProcessExtrasCustom = ref<any>([]);
    let columnData = ref<any>([{}]);
    const isRunOnce = ref<boolean>(true);
    const toNumber = (num: any) => (!num ? '' : num);
    onResultIncomeProcessExtras((res: any) => {
      let responeData = res.data.getIncomeProcessExtras;
      IncomeProcessExtrasCustom.value = [
        { id: 1, name: '인원' },
        { id: 2, name: '지급액' },
        { id: 3, name: '소득세' },
        { id: 4, name: '지방소득세' },
        { id: 5, name: '공제총액' },
        { id: 6, name: '차인지급액' },
      ];
      const addObj = (monthNum: number, val: any) => {
        if (val.imputedMonth == monthNum) {
          columnData.value[0]['month_' + val.imputedMonth] = {
            paymentYear: val.paymentYear,
            status: val.status,
            paymentMonth: val.paymentMonth,
            imputedMonth: val.imputedMonth,
            imputedYear: val.imputedYear,
          };
        }
      };
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
        for (var i = 1; i < 13; i++) {
          addObj(i, val);
        }
      });
      if (isRunOnce.value) {
        isRunOnce.value = false;
        showDetailSelected(columnData.value[0]['month_' + `${dayjs().month() + 1}`]);
      }
    });
    return {
      statusParam,
      loadingIncomeProcessExtras,
      dataSource,
      per_page,
      move_column,
      colomn_resize,
      onSubmit,
      deleteItem,
      modalDelete,
      popupDataDelete,
      editItem,
      modalEdit,
      checkLen,
      globalYear,
      showDetailSelected,
      IncomeProcessExtrasCustom,
      columnData,
      incomeExtrasParams,
      actionSave,
      editTax,
      editTaxParam,
      changeFommDone,
      formTaxRef,
      resetFormNum,
      onFormDone,
      actionDeleteSuccess,
      taxPayRef,
      deleteIncomeExtrasParam,
      onAddMonth,
      mutateChangeIncomeProcessExtraStatus,
      changeIncomeExtraPaymentDayParam,
      actionEditDaySuccess,
      modalHistory,
      modalHistoryStatus,
      modalCopy,
      dataModalCopy,
      onLoadingTable,
      dataAddIncomeProcess,
      onAddIncomeProcess,
      formatMonth,
      popupAddStatus,
      resetForm,
      isRunOnce,
      month,
      openTab,
    };
  },
});
</script> 
<style lang="scss" scoped src="./style/style.scss" >
</style>
