<template>
  <action-header title="기타소득자등록" @actionSave="onSubmit($event)" />
  <div id="pa-720" class="page-content">
    <a-row>
      <a-spin :spinning="loadingIncomeProcessExtras" size="large">
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
              :isUnder="true"
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
              :isUnder="true"
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
              :isUnder="true"
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
              :isUnder="true"
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
              :isUnder="true"
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
              :isUnder="true"
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
              :isUnder="true"
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
              :isUnder="true"
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
              :isUnder="true"
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
              :isUnder="true"
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
              :isUnder="true"
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
              :isUnder="true"
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
      <a-col class="">
        <DxButton class="ml-3" @click="deleteItem">
          <img style="width: 17px" src="@/assets/images/icon_delete.png" alt="" />
        </DxButton>
        <DxButton class="ml-3" icon="plus" @click="addItem" />
        <DxButton class="ml-3" icon="edit" @click="editItem" />
        <template v-for="(placement, index) in placements" :key="placement">
          <a-dropdown :placement="placement" class="ml-5">
            <a-button class="button-open-tab">선택</a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <div class="custom-select-tab">
                    <a href="/dashboard/pa-610" style="color: white"> 기타소득자등록 </a>
                  </div>
                </a-menu-item>
                <a-menu-item>
                  <a-tooltip placement="left">
                    <template #title>사업소득자료 변경이력</template>
                    <div style="text-align: center" @click="modalHistory = true">
                      <HistoryOutlined style="font-size: 20px" />
                    </div>
                  </a-tooltip>
                </a-menu-item>
                <a-menu-item>
                  <a-tooltip placement="left">
                    <template #title>사업소득 마감상태 변경이력</template>
                    <div style="text-align: center" @click="modalHistoryStatus = true">
                      <img src="@/assets/images/icon_status_history.png" alt="" style="width: 20px; height: 20px" />
                    </div>
                  </a-tooltip>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-col>
    </a-row>
    <a-row class="content-btm">
      <a-col :span="13" class="custom-layout">
        <TaxPayInfo ref="taxPayRef" :dataCallTableDetail="incomeExtrasParams" @editTax="editTax" :changeFommDone="changeFommDone" />
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
  <PopupMessage
    :modalStatus="popupAddStatus"
    @closePopup="popupAddStatus = false"
    :typeModal="'confirm'"
    :title="'ban co muon xoa khong'"
    :content="'Content notification'"
    :keyAccept="'1234'"
    :okText="'확인'"
    @checkConfirm="onPopupComfirm"
  />
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from 'vue';
import DxButton from 'devextreme-vue/button';
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { companyId } from '@/helpers/commonFunction';
import { DxDataGrid, DxColumn, DxMasterDetail } from 'devextreme-vue/data-grid';
import queries from '@/graphql/queries/PA/PA7/PA720/index';
import DeletePopup from './components/Popup/DeletePopup.vue';
import EditPopup from './components/Popup/EditPopup.vue';
import ProcessStatus from '@/components/common/ProcessStatus.vue';
import TaxPayInfo from './components/TaxPayInfo.vue';
import FormTaxPayInfo from './components/FormTaxPayInfo.vue';
import { taxDateIndex, dataActionUtils } from './utils/index';
import mutations from '@/graphql/mutations/PA/PA7/PA720/index';
import notification from '@/utils/notification';
import type { DropdownProps } from 'ant-design-vue';
import { HistoryOutlined } from '@ant-design/icons-vue';
import CopyMonth from './components/Popup/CopyMonth.vue';

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

    const modalEmailSingle = ref(false);
    const modalEmailSinglePayrollRegister = ref(false);
    const modalEmailMulti = ref(false);

    const popupDataEmailSingle = ref({});
    const popupDataEmailSinglePayrollRegister = ref({});
    const popupDataEmailMulti = ref({});

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
    const editTaxParam = ref<any>({ ...taxDateIndex });
    const editTax = (emit: any) => {
      editTaxParam.value = emit;
    };
    const changeFommDone = ref(1);
    const formTaxRef = ref();
    const resetFormNum = ref(1);
    const actionDeleteSuccess = () => {
      modalDelete.value = false;
      modalEdit.value = false;
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
    let placements = ['bottomRight'] as DropdownProps['placement'][];
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
    watch(changeFommDone, (value) => {
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
      if (Object.keys(taxPayRef.value.paymentData).length !== 0) {
        modalEdit.value = true;
        changeIncomeExtraPaymentDayParam.value = { ...incomeExtrasParams, ...taxPayRef.value.paymentData };
      }
    };
    const addItem = () => {
      if (JSON.stringify(formTaxRef.value.dataAction.input) != JSON.stringify(dataActionUtils.input)) {
        popupAddStatus.value = true;
      }
    };
    const onSubmit = (e: any) => {
      actionSave.value++;
    };
    const onFormDone = () => {
      changeFommDone.value++;
      resetFormNum.value++;
      formTaxRef.value.triggerIncomeExtra = false;
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
    const onPopupComfirm = () => {
      resetFormNum.value++;
      formTaxRef.value.triggerIncomeExtra = false;
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

    const showDetailSelected = (obj: any) => {
      incomeExtrasParams.processKey.imputedMonth = obj.imputedMonth;
      incomeExtrasParams.processKey.imputedYear = obj.imputedYear;
      incomeExtrasParams.processKey.paymentYear = obj.paymentYear;
      incomeExtrasParams.processKey.paymentMonth = obj.paymentMonth;
      statusParam.value = { ...incomeExtrasParams, status: obj.status };
    };
    const IncomeProcessExtrasCustom = ref<any>([]);
    let columnData = ref<any>([{}]);
    onResultIncomeProcessExtras((res: any) => {
      let responeData = res.data.getIncomeProcessExtras;
      IncomeProcessExtrasCustom.value = [
        {
          id: 1,
          name: '인원',
        },
        {
          id: 2,
          name: '지급액',
        },
        {
          id: 3,
          name: '소득세',
        },
        {
          id: 4,
          name: '지방소득세',
        },
        {
          id: 5,
          name: '공제총액',
        },
        {
          id: 6,
          name: '차인지급액',
        },
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
          value: (val?.employeeStat?.employeeCount + val?.employeeStat?.retireEmployeeCount)?.toLocaleString('en-US', { currency: 'VND' }),
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
          value: val?.incomeStat?.totalDeduction?.toLocaleString('en-US', {
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
        addObj(1, val);
        addObj(2, val);
        addObj(3, val);
        addObj(4, val);
        addObj(5, val);
        addObj(6, val);
        addObj(7, val);
        addObj(8, val);
        addObj(9, val);
        addObj(10, val);
        addObj(11, val);
        addObj(12, val);
      });
      showDetailSelected(columnData.value[0]['month_' + `${dayjs().month() + 1}`]);
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
      modalEmailSingle,
      modalEmailSinglePayrollRegister,
      modalEmailMulti,
      popupDataEmailSingle,
      popupDataEmailSinglePayrollRegister,
      popupDataEmailMulti,
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
      addItem,
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
      placements,
      modalCopy,
      dataModalCopy,
      onLoadingTable,
      dataAddIncomeProcess,
      onAddIncomeProcess,
      formatMonth,
      popupAddStatus,
      onPopupComfirm,
    };
  },
});
</script> 
<style lang="scss" scoped src="./style/style.scss" >
</style>
