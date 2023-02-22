<template>
  <action-header title="기타소득자료입력" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false" />
  <div id="pa-720" class="page-content">
    <a-row>
      <a-spin :spinning="loadingIncomeProcessExtras || isRunOnce" size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="columnData" :show-borders="true"
          :allow-column-reordering="move_column" key-expr="globalYear" :key="globalYear"
          :allow-column-resizing="colomn_resize" :column-auto-width="true" :focused-row-enabled="true">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn :caption="globalYear + '귀속월'" cell-template="imputed-year" />
          <template #imputed-year>
            <span>지급연월 </span>
          </template>
          <DxColumn caption="01" width="100px" cell-template="imputed-month1" />
          <template #imputed-month1="{ data }">
            <colorful-badge v-if="data.data.month_1" :value="data.data.month_1?.status"
              :year="data.data.month_1?.paymentYear" :month="data.data.month_1?.paymentMonth" :isUnder="month == 1"
              @click="showDetailSelected(data.data.month_1)" />
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
          <template #row-detail>
            <div class="table-detail">
              <DxDataGrid key-expr="id" :data-source="IncomeProcessExtrasCustom" :show-borders="false"
                :column-auto-width="true" :allow-column-reordering="move_column" :show-column-headers="false"
                :allow-column-resizing="colomn_resize" :focused-row-enabled="true">
                <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string" />
                <template #col-first="{ data }">
                  <b>{{ data.data.name }}</b><br />
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
        <DxButton :text="'귀 ' + inputDateTax"
          :style="{ color: 'white', backgroundColor: 'gray', height: $config_styles.HeightInput }" class="btn-date" />
        <DxButton :text="'지 ' + paymentDateTax"
          :style="{ color: 'white', backgroundColor: 'black', height: $config_styles.HeightInput }" class="btn-date" />
        <ProcessStatus v-model:value-status="statusParam.status"
          @checkConfirm="mutateChangeIncomeProcessExtraStatus(statusParam)" />
      </a-col>
      <a-col style="display: inline-flex; align-items: center">
        <DxButton class="ml-4" icon="plus" @click="openAddNewModal" :disabled="!isColumnData" />
        <DxButton class="ml-3" @click="onDeleteItem" :disabled="!isColumnData">
          <img style="width: 17px" src="@/assets/images/icon_delete.png" alt="" />
        </DxButton>
        <DxButton @click="onSave" size="large" class="ml-4" :disabled="!isColumnData" id="save-js">
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
            <checkbox-basic :valueCheckbox="true" disabled="true" />
            <span class="fz-12 pl-5">지급일변경</span>
          </div>
        </DxButton>
        <div class="custom-select-tab ml-4">
          <button class="button-open-tab"
            @click="openTab({ name: '기타소득자등록', url: '/dashboard/pa-710', id: 'pa-710' })">기타소득자등록</button>
        </div>
      </a-col>
    </a-row>
    <!-- {{ processKeyPA720 }} processKeyPA720 <br /> -->
    <!-- {{ dataActionUtilsPA720 }} dataActionUtilsPA720 <br />
    {{ compareType2() }} compareType2() <br />
    {{ compareType1() }} compareType1() <br />
    {{ compareType }} compareType <br />
    {{ isNewRowPA720 }} isNewRowPA720 <br />
    {{ resetFormNum }} resetFormNum <br /> -->
    <a-row class="content-btm">
      <a-col :span="13" class="custom-layout">
        <TaxPayInfo ref="taxPayRef" :dataCallTableDetail="processKeyPA720" @editTax="editTax"
          :changeFommDone="changeFommDone" :isRunOnce="isRunOnce" :addItemClick="addItemClick" />
      </a-col>
      <a-col :span="11" class="custom-layout" style="padding-right: 0px">
        <FormTaxPayInfo ref="formTaxRef" :editTax="editTaxParam" :isLoadNewForm="isLoadNewForm"
          :isColumnData="isColumnData" @changeFommDone="onFormDone" :key="resetFormNum"
          :addNewIncomeExtra="processKeyPA720.processKey" />
      </a-col>
    </a-row>
  </div>
  <DeletePopup @delDone="onDelDone" :modalStatus="modalDelete" @closePopup="modalDelete = false"
    :data="deleteIncomeExtrasParam" />

  <HistoryPopup :modalStatus="modalHistory" @closePopup="modalHistory = false" :data="processKeyPA720.processKey"
    title="변경이력" typeHistory="pa-720" />
  <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
    :data="processKeyPA720.processKey" title="업무상태 변경이력" typeHistory="pa-720-status" />
  <EditPopup :modalStatus="modalEdit" @closePopup="actionEditDaySuccess" :data="changeIncomeExtraPaymentDayParam" />
  <CopyMonth :modalStatus="modalCopy" :month="dataModalCopy" @closePopup="modalCopy = false; statusParam.status = 10;"
    :dateType="dateType" :paymentDay="paymentDay" @loadingTable="onCopyDone"
    @dataAddIncomeProcess="onAddIncomeProcess" />
  <PopupMessage :modalStatus="rowChangeStatus" @closePopup="rowChangeStatus = false" :typeModal="'confirm'"
    :title="titleModalConfirm" :content="''" :cancelText="'아니요 '" :okText="'네 '" @checkConfirm="onRowChangeComfirm"
    :isConfirmIcon="false" />
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from 'vue';
import DxButton from 'devextreme-vue/button';
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { companyId, openTab } from '@/helpers/commonFunction';
import { DxDataGrid, DxColumn, DxScrolling, DxMasterDetail } from 'devextreme-vue/data-grid';
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
import queriesHolding from '@/graphql/queries/CM/CM130/index';
import { Message } from '@/configs/enum';
import { formatMonth } from './utils/index';
export default defineComponent({
  components: {
    DxMasterDetail,
    DxDataGrid,
    DxColumn,
    DxButton,
    DxScrolling,
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
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const modalDelete = ref<boolean>(false);
    const modalEdit = ref<boolean>(false);
    const modalHistory = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);
    const editTaxParam = ref<any>({});
    const changeFommDone = ref(1);
    const formTaxRef = ref();
    const resetFormNum = ref(1);
    const taxPayRef = ref();
    const deleteIncomeExtrasParam = ref<any>({});
    const changeIncomeExtraPaymentDayParam = ref<any>({ day: null });
    store.commit('common/processKeyPA720', globalYear.value);
    const processKeyPA720 = computed(() => store.getters['common/processKeyPA720']);
    const modalCopy = ref<boolean>(false);
    const dataModalCopy = ref<number>(1);
    const popupAddStatus = ref<boolean>(false);
    const dataActionUtilsPA720 = computed(() => store.getters['common/dataActionUtilsPA720']);
    // ------------mes popup--------------------
    const messageSave = Message.getMessage('COMMON', '501').message;
    const messageDelNoItem = Message.getMessage('COMMON', '404').message;
    const titleModalConfirm = ref(messageSave);

    const inputDateTax = computed(() => {
      if (isColumnData.value) {
        return processKeyPA720.value.processKey?.imputedYear + '-' + formatMonth(processKeyPA720.value.processKey?.imputedMonth);
      }
      return '';
    });
    const paymentDateTax = computed(() => {
      if (isColumnData.value) {
        return processKeyPA720.value.processKey?.paymentYear + '-' + formatMonth(processKeyPA720.value.processKey?.paymentMonth);
      }
      return '';
    });

    // =======================get incomeProcessExtras data-source ================================

    const incomeProcessExtrasParam = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    //custom data in top table
    const IncomeProcessExtrasCustom = ref<any>([]);
    let columnData = ref<any>([
      {
        globalYear: globalYear.value,
        hasData: false,
      },
    ]);
    const isRunOnce = ref<boolean>(true);
    const toNumber = (num: any) => (!num ? '' : num);
    const isColumnData = ref<boolean>(false);
    const {
      refetch: refetchIncomeProcessExtras,
      loading: loadingIncomeProcessExtras,
      result: resultIncomeProcessExtras,
    } = useQuery(queries.getIncomeProcessExtras, incomeProcessExtrasParam, () => ({
      fetchPolicy: 'no-cache',
    }));
    watch(resultIncomeProcessExtras, (newVal: any) => {
      let responeData = newVal?.getIncomeProcessExtras ?? [];
      columnData.value = [
        {
          globalYear: globalYear.value,
          hasData: false,
        },
      ];
      IncomeProcessExtrasCustom.value = [
        { id: 1, name: '인원' },
        { id: 2, name: '지급액' },
        { id: 3, name: '소득세' },
        { id: 4, name: '지방소득세' },
        { id: 5, name: '공제총액' },
        { id: 6, name: '차인지급액' },
      ];
      if (responeData.length > 0) {
        columnData.value[0].hasData = true;
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
          columnData.value[0]['month_' + val.imputedMonth] = val;
        });
      }
      if (isRunOnce.value) {
        isRunOnce.value = false;
        if (columnData.value[0]['month_' + processKeyPA720.value.processKey.imputedMonth]) {
          showDetailSelected(columnData.value[0]['month_' + `${dayjs().month() + 1}`]);
        }
      }
      if (!columnData.value[0].hasData) {
        showDetailSelected({
          imputedMonth: dayjs().month() + 1,
          imputedYear: globalYear.value,
          paymentMonth: dayjs().month() + 1,
          paymentYear: globalYear.value,
        });
      }
      isColumnData.value = columnData.value[0].hasData ? true : false;
    });
    //change year
    watch(globalYear, (newVal) => {
      incomeProcessExtrasParam.imputedYear = newVal;
      isRunOnce.value = true;
      store.commit('common/processKeyPA720', newVal);
      resetForm();
    });

    // -----------------change income process extra status------------------------

    const { mutate: mutateChangeIncomeProcessExtraStatus, onDone: onDoneChangeIncomeProcessExtraStatusDone } = useMutation(mutations.changeIncomeProcessExtraStatus);
    onDoneChangeIncomeProcessExtraStatusDone(() => {
      notification('success', `업데이트 완료!`);
      refetchIncomeProcessExtras();
    });

    // ======================= after change data ==================================

    const onFormDone = () => {
      changeFommDone.value++;
      formTaxRef.value.isEdit = true;
      // c onsole.log(`output->`, formPA720.value.input.incomeId);
      taxPayRef.value.focusedRowKey = formPA720.value.input.incomeId;
    };
    const onDelDone = () => {
      changeFommDone.value++;
      taxPayRef.value.focusedRowKey = null;
      resetForm();
    };
    watch(changeFommDone, () => {
      refetchIncomeProcessExtras();
    });
    const actionEditDaySuccess = (emit: String) => {
      if (emit) {
        changeFommDone.value++;
        taxPayRef.value.focusedRowKey = null;
        resetForm();
      }
      modalEdit.value = false;
    };
    const onAddIncomeProcess = (emit: any) => {
      resetForm();
      columnData.value[0]['month_' + emit.imputedMonth] = emit;
      isColumnData.value = true;
      // columnData.value[0]['month_' + emit.imputedMonth].status = 10;
    };
    const onCopyDone = () => {
      setTimeout(() => refetchIncomeProcessExtras(), 100);
      taxPayRef.value.firsTimeRow = true;
    };

    // ======================= track change of form ================================

    const formPA720 = computed(() => store.getters['common/formPA720']);
    const formEditPA720 = computed(() => store.getters['common/formEditPA720']);
    const isNewRowPA720 = computed(() => store.state.common.isNewRowPA720);
    //compare Data
    const compareType = ref(1); //0 is row change. 1 is add button;
    const compareType1 = () => {
      if (JSON.stringify(dataActionUtilsPA720.value.input) == JSON.stringify(formPA720.value.input)) {
        return true;
      }
      return false;
    };
    const compareType2 = () => {
      if (JSON.stringify(formEditPA720.value.input) == JSON.stringify(formPA720.value.input)) {
        return true;
      } else {
        return false;
      }
    };
    //function common
    const resetForm = async () => {
      store.commit('common/formPA720', dataActionUtilsPA720.value);
      store.commit('common/formEditPA720', formPA720.value);
      resetFormNum.value++;
      formTaxRef.value.newDateLoading = false;
    };
    const addNewRow = () => {
      resetForm();
      taxPayRef.value.dataSourceDetail = taxPayRef.value.dataSourceDetail.concat(formPA720.value.input);
      taxPayRef.value.focusedRowKey = formPA720.value.input.incomeId;
      store.state.common.isNewRowPA720 = true;
      compareType.value = 1;
    };
    const delNewRow = async () => {
      await resetForm();
      taxPayRef.value.dataSourceDetail = taxPayRef.value.dataSourceDetail.splice(0, taxPayRef.value.dataSourceDetail.length - 1);
      store.state.common.isNewRowPA720 = false;
      compareType.value = 2;
    };
    //on add row
    const rowChangeStatus = ref<Boolean>(false);
    const openAddNewModal = async () => {
      addItemClick.value = !addItemClick.value;
      if (isNewRowPA720.value) {
        if (!compareType1()) {
          rowChangeStatus.value = true;
          return;
        }
        // c onsole.log(`output- dang co new row compare ko loi`);
        return;
      }
      setTimeout(() => {
        // c onsole.log(`output->type ko co newrow`, compareType1());
        addNewRow();
      }, 50);
      return;
    };
    //row change confirm
    const onRowChangeComfirm = async (ok: boolean) => {
      if (ok) {
        let ele = document.getElementById('save-js') as HTMLInputElement;
        ele.click();
        taxPayRef.value.focusedRowKey = formPA720.value.input.incomeId;
      } else {
        if (isNewRowPA720.value) {
          taxPayRef.value.dataSourceDetail = taxPayRef.value.dataSourceDetail.splice(0, taxPayRef.value.dataSourceDetail.length - 1);
          if (compareType.value == 1) {
            // c onsole.log(`output-> toi dang o so 1`);
            addNewRow();
            setTimeout(() => {
              taxPayRef.value.focusedRowKey = formPA720.value.input.incomeId;
            }, 50);
            return;
          }
        }
        if (compareType.value == 2) {
          // c onsole.log(`output-> toi dang o so 2 `);
          editTaxParam.value = editTaxParamFake.value;
          store.state.common.isNewRowPA720 = false;
        }
        compareType.value = 2;
      }
    };
    // enable load form when row change
    const isLoadNewForm = ref(false);
    const editTaxParamFake = ref();
    const editTax = async (emit: any, firsTimeRow: boolean) => {
      compareType.value = 2;
      if (isNewRowPA720.value) {
        if (compareType1()) {
          await delNewRow();
          taxPayRef.value.focusedRowKey = emit.incomeId;
          editTaxParam.value = emit;
          // c onsole.log(`output->chuyen row bth`, isNewRowPA720.value, emit);
          formTaxRef.value.isEdit = true;
          return;
        }
        // c onsole.log(`output->co new row, khac nhau`);
        editTaxParamFake.value = emit;
        rowChangeStatus.value = true;
        return;
      }
      if (!compareType2()) {
        // c onsole.log(`output->row khac`);
        rowChangeStatus.value = true;
        editTaxParamFake.value = emit;
        return;
      } else {
        // c onsole.log(`output->chuyen row bth. ko co newrow`);
        formTaxRef.value.isEdit = true;
        editTaxParam.value = emit;
      }
    };
    // -------------------- Delete item in tax table --------------------
    const onDeleteItem = () => {
      deleteIncomeExtrasParam.value = {
        ...processKeyPA720.value,
        incomeIds: taxPayRef.value.incomeIdDels,
      };
      if (deleteIncomeExtrasParam.value.incomeIds.length > 0) {
        modalDelete.value = true;
      } else {
        notification('warning', messageDelNoItem);
      }
    };
    // -------------------- Edit item in tax table --------------------
    const editItem = () => {
      if (taxPayRef.value.paymentData.length > 0) {
        modalEdit.value = true;
        changeIncomeExtraPaymentDayParam.value = taxPayRef.value.paymentData;
      } else {
        notification('warning', messageDelNoItem);
      }
    };
    //---------------submit-------------------
    const isErrorFormPA720 = computed(() => store.getters['common/isErrorFormPA720']);
    const keyActivePA720 = computed(() => store.getters['common/keyActivePA720']);
    const addItemClick = ref(true);
    const onSubmit = async () => {
      // c onsole.log(`output- on submit is called`,)
      setTimeout(() => {
        if (isErrorFormPA720.value) {
          taxPayRef.value.focusedRowKey = formPA720.value.input.incomeId;
          addItemClick.value = !addItemClick.value;
          // c onsole.log(`error-back ve back ve form`, formPA720);
        } else {
          editTaxParam.value = compareType.value == 2 && editTaxParamFake.value;
          taxPayRef.value.focusedRowKey = compareType.value == 1 ? formPA720.value.input.incomeId : editTaxParamFake.value.incomeId;
          store.state.common.isNewRowPA720 = false;
        }
      }, 1000);
    };
    const onSave = async (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        store.state.common.isErrorFormPA720 = true;
        addItemClick.value = !addItemClick.value;
      } else {
        store.commit('common/actionSavePA720');
        await onSubmit();
      }
    };
    // -------------------Add data in month---------------------
    const onAddMonth = (val: number) => {
      dataModalCopy.value = val;
      modalCopy.value = true;
      month.value = val;
    };
    //get config to check default date type
    const dateType = ref<number>(1);
    const paymentDay = ref<number>(1);
    const dataQuery = ref({ companyId: companyId, imputedYear: globalYear.value });
    const { result: resultConfig } = useQuery(queriesHolding.getWithholdingConfig, dataQuery, () => ({
      fetchPolicy: 'no-cache',
    }));
    watch(resultConfig, (newVal) => {
      const data = newVal.getWithholdingConfig;
      dateType.value = data.paymentType;
      store.commit('common/paymentDayPA720', data.paymentDay);
    });

    //--------compute data function--------------
    const checkLen = (text: String) => {
      if (text.length > 10) {
        return text.substring(0, 10) + '...';
      }
      return text;
    };
    // -------------------------click month in table top--------------
    const month = ref<number>(0); //active tab
    // fnc click month
    const showDetailSelected = (obj: any) => {
      taxPayRef.value.firsTimeRow = true;
      let datObj = {
        imputedYear: obj?.imputedYear,
        imputedMonth: obj?.imputedMonth,
        paymentYear: obj?.paymentYear,
        paymentMonth: obj?.paymentMonth,
      };
      store.state.common.processKeyPA720.processKey = datObj;
      statusParam.value = { ...processKeyPA720.value, status: obj.status };
      // resetForm();
      month.value = obj.imputedMonth;
    };

    return {
      statusParam,
      loadingIncomeProcessExtras,
      per_page,
      move_column,
      colomn_resize,
      modalDelete,
      modalEdit,
      globalYear,
      IncomeProcessExtrasCustom,
      columnData,
      processKeyPA720,
      editTaxParam,
      changeFommDone,
      formTaxRef,
      resetFormNum,
      taxPayRef,
      deleteIncomeExtrasParam,
      changeIncomeExtraPaymentDayParam,
      modalHistory,
      modalHistoryStatus,
      modalCopy,
      dataModalCopy,
      popupAddStatus,
      isRunOnce,
      month,
      isLoadNewForm,
      titleModalConfirm,
      isColumnData,
      paymentDateTax,
      inputDateTax,
      dateType,
      addItemClick,
      keyActivePA720,
      formPA720,
      paymentDay,
      rowChangeStatus,
      onDeleteItem,
      editItem,
      checkLen,
      showDetailSelected,
      editTax,
      onFormDone,
      onAddMonth,
      mutateChangeIncomeProcessExtraStatus,
      actionEditDaySuccess,
      onCopyDone,
      onAddIncomeProcess,
      resetForm,
      openTab,
      openAddNewModal,
      onSave,
      onRowChangeComfirm,
      editTaxParamFake,
      isErrorFormPA720,
      dataActionUtilsPA720,
      compareType1,
      compareType2,
      compareType,
      isNewRowPA720,
      onDelDone,
    };
  },
});
</script> 
<style lang="scss" scoped src="./style/style.scss" ></style>
