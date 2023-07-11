<template>
  <action-header title="사업소득자료입력" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false" />
  <div id="pa-620" class="page-content">
      <a-row>
        <a-col :span="24" :class="{ 'ele-opacity': !isCompareForm }">
          <a-spin :spinning="loadingGetIncomeProcessBusinesses" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
              key-expr="companyId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
              :column-auto-width="true">
              <DxColumn width="calc(100% - 400px)" :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string" />
              <template #col-first>
                <b>지급연월</b>
              </template>
              <DxColumn caption="01" width="100px" cell-template="month-1" :cssClass="customColumnClass(1)"
                alignment="center" />
              <template #month-1="{ data }">
                <div class="hover-underlined" v-if="data.data.month1"
                  :class="setUnderline(data.data.month1.imputedMonth) ? 'current-underlined' : ''"
                  @click="showDetailSelected(data.data.month1)">
                  <colorful-badge :value="data.data.month1.status" :year="data.data.month1.paymentYear"
                    :month="data.data.month1.paymentMonth" />
                </div>
                <div v-else style="width: 100%;text-align: center;" @click="onAddMonth(1)"
                  :class="{ disabled: disableAddMonth(1) }"> [+]
                </div>
              </template>
              <DxColumn caption="02" width="100px" cell-template="month-2" :cssClass="customColumnClass(2)"
                alignment="center" />
              <template #month-2="{ data }">
                <div class="hover-underlined" v-if="data.data.month2"
                  :class="setUnderline(data.data.month2.imputedMonth) ? 'current-underlined' : ''"
                  @click="showDetailSelected(data.data.month2)">
                  <colorful-badge :value="data.data.month2.status" :year="data.data.month2.paymentYear"
                    :month="data.data.month2.paymentMonth" />
                </div>
                <div v-else style="width: 100%;text-align: center;" @click="onAddMonth(2)"
                  :class="{ 'disabled': disableAddMonth(2) }"> [+]</div>
              </template>
              <DxColumn caption="03" width="100px" cell-template="month-3" :cssClass="customColumnClass(3)"
                alignment="center" />
              <template #month-3="{ data }">
                <div class="hover-underlined" v-if="data.data.month3"
                  :class="setUnderline(data.data.month3.imputedMonth) ? 'current-underlined' : ''"
                  @click="showDetailSelected(data.data.month3)">
                  <colorful-badge :value="data.data.month3.status" :year="data.data.month3.paymentYear"
                    :month="data.data.month3.paymentMonth" />
                </div>
                <div v-else style="width: 100%;text-align: center;" @click="onAddMonth(3)"
                  :class="[{ 'disabled': disableAddMonth(3) }]"> [+]</div>
              </template>
              <DxColumn caption="04" width="100px" cell-template="month-4" :cssClass="customColumnClass(4)"
                alignment="center" />
              <template #month-4="{ data }">
                <div class="hover-underlined" v-if="data.data.month4"
                  :class="setUnderline(data.data.month4.imputedMonth) ? 'current-underlined' : ''"
                  @click="showDetailSelected(data.data.month4)">
                  <colorful-badge :value="data.data.month4.status" :year="data.data.month4.paymentYear"
                    :month="data.data.month4.paymentMonth" />
                </div>
                <div v-else style="width: 100%;text-align: center;" @click="onAddMonth(4)"
                  :class="{ disabled: disableAddMonth(4) }"> [+]
                </div>
              </template>
              <DxColumn caption="05" width="100px" cell-template="month-5" :cssClass="customColumnClass(5)"
                alignment="center" />
              <template #month-5="{ data }">
                <div class="hover-underlined" v-if="data.data.month5"
                  :class="setUnderline(data.data.month5.imputedMonth) ? 'current-underlined' : ''"
                  @click="showDetailSelected(data.data.month5)">
                  <colorful-badge :value="data.data.month5.status" :year="data.data.month5.paymentYear"
                    :month="data.data.month5.paymentMonth" />
                </div>
                <div v-else style="width: 100%;text-align: center;" @click="onAddMonth(5)"
                  :class="{ disabled: disableAddMonth(5) }"> [+]
                </div>
              </template>
              <DxColumn caption="06" width="100px" cell-template="month-6" :cssClass="customColumnClass(6)"
                alignment="center" />
              <template #month-6="{ data }">
                <div class="hover-underlined" v-if="data.data.month6"
                  :class="setUnderline(data.data.month6.imputedMonth) ? 'current-underlined' : ''"
                  @click="showDetailSelected(data.data.month6)">
                  <colorful-badge :value="data.data.month6.status" :year="data.data.month6.paymentYear"
                    :month="data.data.month6.paymentMonth" />
                </div>
                <div v-else style="width: 100%;text-align: center;" @click="onAddMonth(6)"
                  :class="{ disabled: disableAddMonth(6) }"> [+]
                </div>
              </template>
              <DxColumn caption="07" width="100px" cell-template="month-7" :cssClass="customColumnClass(7)"
                alignment="center" />
              <template #month-7="{ data }">
                <div class="hover-underlined" v-if="data.data.month7"
                  :class="setUnderline(data.data.month7.imputedMonth) ? 'current-underlined' : ''"
                  @click="showDetailSelected(data.data.month7)">
                  <colorful-badge :value="data.data.month7.status" :year="data.data.month7.paymentYear"
                    :month="data.data.month7.paymentMonth" />
                </div>
                <div v-else style="width: 100%;text-align: center;" @click="onAddMonth(7)"
                  :class="{ disabled: disableAddMonth(7) }"> [+]
                </div>
              </template>
              <DxColumn caption="08" width="100px" cell-template="month-8" :cssClass="customColumnClass(8)"
                alignment="center" />
              <template #month-8="{ data }">
                <div class="hover-underlined" v-if="data.data.month8"
                  :class="setUnderline(data.data.month8.imputedMonth) ? 'current-underlined' : ''"
                  @click="showDetailSelected(data.data.month8)">
                  <colorful-badge :value="data.data.month8.status" :year="data.data.month8.paymentYear"
                    :month="data.data.month8.paymentMonth" />
                </div>
                <div v-else style="width: 100%;text-align: center;" @click="onAddMonth(8)"
                  :class="{ disabled: disableAddMonth(8) }"> [+]
                </div>
              </template>
              <DxColumn caption="09" width="100px" cell-template="month-9" :cssClass="customColumnClass(9)"
                alignment="center" />
              <template #month-9="{ data }">
                <div class="hover-underlined" v-if="data.data.month9"
                  :class="setUnderline(data.data.month9.imputedMonth) ? 'current-underlined' : ''"
                  @click="showDetailSelected(data.data.month9)">
                  <colorful-badge :value="data.data.month9.status" :year="data.data.month9.paymentYear"
                    :month="data.data.month9.paymentMonth" />
                </div>
                <div v-else style="width: 100%;text-align: center;" @click="onAddMonth(9)"
                  :class="{ disabled: disableAddMonth(9) }"> [+]
                </div>
              </template>
              <DxColumn caption="10" width="100px" cell-template="month-10" :cssClass="customColumnClass(10)"
                alignment="center" />
              <template #month-10="{ data }">
                <div class="hover-underlined" v-if="data.data.month10"
                  :class="setUnderline(data.data.month10.imputedMonth) ? 'current-underlined' : ''"
                  @click="showDetailSelected(data.data.month10)">
                  <colorful-badge :value="data.data.month10.status" :year="data.data.month10.paymentYear"
                    :month="data.data.month10.paymentMonth" />
                </div>
                <div v-else style="width: 100%;text-align: center;" @click="onAddMonth(10)"
                  :class="{ disabled: disableAddMonth(10) }"> [+]
                </div>
              </template>
              <DxColumn caption="11" width="100px" cell-template="month-11" :cssClass="customColumnClass(11)"
                alignment="center" />
              <template #month-11="{ data }">
                <div class="hover-underlined" v-if="data.data.month11"
                  :class="setUnderline(data.data.month11.imputedMonth) ? 'current-underlined' : ''"
                  @click="showDetailSelected(data.data.month11)">
                  <colorful-badge :value="data.data.month11.status" :year="data.data.month11.paymentYear"
                    :month="data.data.month11.paymentMonth" />
                </div>
                <div v-else style="width: 100%;text-align: center;" @click="onAddMonth(11)"
                  :class="{ disabled: disableAddMonth(11) }"> [+]
                </div>
              </template>
              <DxColumn caption="12" width="100px" cell-template="month-12" :cssClass="customColumnClass(12)"
                alignment="center" />
              <template #month-12="{ data }">
                <div class="hover-underlined" v-if="data.data.month12"
                  :class="setUnderline(data.data.month12.imputedMonth) ? 'current-underlined' : ''"
                  @click="showDetailSelected(data.data.month12)">
                  <colorful-badge :value="data.data.month12.status" :year="data.data.month12.paymentYear"
                    :month="data.data.month12.paymentMonth" />
                </div>
                <div v-else style="width: 100%;text-align: center;" @click="onAddMonth(12)"
                  :class="{ disabled: disableAddMonth(12) }"> [+]
                </div>
              </template>
              <DxMasterDetail class="table-detail" :enabled="true" template="detailRow" />
              <template #detailRow>
                <DxDataGrid key-expr="id" :data-source="dataCustomRes" :show-borders="false" :column-auto-width="true"
                  :allow-column-reordering="move_column" :show-column-headers="false"
                  :allow-column-resizing="colomn_resize">
                  <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string" />
                  <template #col-first="{ data }">
                    <b>{{ data.data.name }}</b><br>
                  </template>
                  <DxColumn caption="1" width="100px" cell-template="month-1" alignment="right"
                    :cssClass="customColumnClass(1)" />
                  <template #month-1="{ data }">
                    <div class="hover-underlined" @click="showDetailSelected(data.data.month1)" v-if="data.data.month1">
                      {{ data.data.month1.value }}</div>
                  </template>
                  <DxColumn caption="2" width="100px" cell-template="month-2" alignment="right"
                    :cssClass="customColumnClass(2)" />
                  <template #month-2="{ data }">
                    <div class="hover-underlined" @click="showDetailSelected(data.data.month2)" v-if="(data.data.month2)">
                      {{ data.data.month2.value }}</div>
                  </template>
                  <DxColumn caption="3" width="100px" cell-template="month-3" alignment="right"
                    :cssClass="customColumnClass(3)" />
                  <template #month-3="{ data }">
                    <div class="hover-underlined" @click="showDetailSelected(data.data.month3)" v-if="(data.data.month3)">
                      {{ data.data.month3.value }}</div>
                  </template>
                  <DxColumn caption="4" width="100px" cell-template="month-4" alignment="right"
                    :cssClass="customColumnClass(4)" />
                  <template #month-4="{ data }">
                    <div class="hover-underlined" @click="showDetailSelected(data.data.month4)" v-if="(data.data.month4)">
                      {{ data.data.month4.value }}</div>
                  </template>
                  <DxColumn caption="5" width="100px" cell-template="month-5" alignment="right"
                    :cssClass="customColumnClass(5)" />
                  <template #month-5="{ data }">
                    <div class="hover-underlined" @click="showDetailSelected(data.data.month5)" v-if="(data.data.month5)">
                      {{ data.data.month5.value }}</div>
                  </template>
                  <DxColumn caption="6" width="100px" cell-template="month-6" alignment="right"
                    :cssClass="customColumnClass(6)" />
                  <template #month-6="{ data }">
                    <div class="hover-underlined" @click="showDetailSelected(data.data.month6)" v-if="(data.data.month6)">
                      {{ data.data.month6.value }}</div>
                  </template>
                  <DxColumn caption="7" width="100px" cell-template="month-7" alignment="right"
                    :cssClass="customColumnClass(7)" />
                  <template #month-7="{ data }">
                    <div class="hover-underlined" @click="showDetailSelected(data.data.month7)" v-if="(data.data.month7)">
                      {{ data.data.month7.value }}</div>
                  </template>
                  <DxColumn caption="8" width="100px" cell-template="month-8" alignment="right"
                    :cssClass="customColumnClass(8)" />
                  <template #month-8="{ data }">
                    <div class="hover-underlined" @click="showDetailSelected(data.data.month8)" v-if="(data.data.month8)">
                      {{ data.data.month8.value }}</div>
                  </template>
                  <DxColumn caption="9" width="100px" cell-template="month-9" alignment="right"
                    :cssClass="customColumnClass(9)" />
                  <template #month-9="{ data }">
                    <div class="hover-underlined" @click="showDetailSelected(data.data.month9)" v-if="(data.data.month9)">
                      {{ data.data.month9.value }}</div>
                  </template>
                  <DxColumn caption="10" width="100px" cell-template="month-10" alignment="right"
                    :cssClass="customColumnClass(10)" />
                  <template #month-10="{ data }">
                    <div class="hover-underlined" @click="showDetailSelected(data.data.month10)" v-if="data.data.month10">
                      {{ data.data.month10.value }}
                    </div>
                  </template>
                  <DxColumn caption="11" width="100px" cell-template="month-11" alignment="right"
                    :cssClass="customColumnClass(11)" />
                  <template #month-11="{ data }">
                    <div class="hover-underlined" @click="showDetailSelected(data.data.month11)"
                      v-if="(data.data.month11)">
                      {{ data.data.month11.value }}
                    </div>
                  </template>
                  <DxColumn caption="12" width="100px" cell-template="month-12" alignment="right"
                    :cssClass="customColumnClass(12)" />
                  <template #month-12="{ data }">
                    <div class="hover-underlined" @click="showDetailSelected(data.data.month12)"
                      v-if="(data.data.month12)">
                      {{ data.data.month12.value }}
                    </div>
                  </template>
                </DxDataGrid>
              </template>
            </DxDataGrid>
          </a-spin>
        </a-col>
        <ComponentDetail v-model:statusBt="statusButton" :isDisabledForm="isDisabledForm" @createdDone="createdDone"
          ref="formRef" @noSave="changeNoSave" @statusDone="statusDone" @subValidate="subValidate" />
        <CopyMonth :modalStatus="modalCopy" @closePopup="onCloseCopy" :monthVal="dataModalCopy"
          @loadingTable="loadingTable" @dataAddIncomeProcess="dataAddIncomeProcess" :dateType="dateType" />
      </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, onMounted } from "vue";
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA6/PA620/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxMasterDetail } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { origindata } from "./utils";
import { companyId, startYearMonth } from "@/helpers/commonFunction";
import HistoryPopup from '@/components/HistoryPopup.vue';
import filters from "@/helpers/filters";
import ComponentDetail from "./components/ComponentDetail.vue";
import CopyMonth from "./components/CopyMonth.vue";
import queriesHolding from "@/graphql/queries/CM/CM130/index";
import dayjs from "dayjs";
export default defineComponent({
  components: {
    DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxGrouping, DxItem, DxMasterDetail,
    EditOutlined, HistoryOutlined, SearchOutlined, DeleteOutlined, SaveOutlined,
    MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined,
    HistoryPopup, ComponentDetail, CopyMonth,
  },
  setup() {
    let statusButton = ref()
    let actionSave = ref(0)
    let dataSource: any = ref([]);
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const monthClicked = computed(() => store.state.common.processKeyPA620.imputedMonth);
    const monthHover = ref(0);
    const rowTable = ref(0);
    const dataModalCopy: any = ref(0)
    const originData = reactive({ ...origindata, rows: per_page });
    const trigger = ref<boolean>(true);
    const modalCopy = ref<boolean>(false);
    const globalYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));
    const processKeyPA620 = computed(() => store.state.common.processKeyPA620);
    const valueCallApiGetIncomeProcessBusinesses = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    })
    let dataCustomRes: any = ref([])
    const isRunOnce = ref<boolean>(true);
    const isDisabledForm = ref<boolean>(false);
    const formRef = ref();
    // ================GRAPQL==============================================
    // API QUERY TABLE BIG
    const { refetch: refetchData, loading: loadingGetIncomeProcessBusinesses, onError: errorGetIncomeProcessBusinesses, onResult: resIncomeProcessBusinesses } = useQuery(queries.getIncomeProcessBusinesses, valueCallApiGetIncomeProcessBusinesses, () => ({
      enabled: trigger.value,
      fetchPolicy: "no-cache",
    }));
    resIncomeProcessBusinesses(res => {
      if (res.data?.getIncomeProcessBusinesses) {
        let respon = res.data.getIncomeProcessBusinesses
        dataSource.value = [{
          companyId: companyId,
        }]
        if (respon.length == 0) {
          isDisabledForm.value = true;
        } else {
          isDisabledForm.value = false;
        }
        dataCustomRes.value = [
          {
            id: 1,
            name: "인원",
          },
          {
            id: 2,
            name: "지급액",
          },
          {
            id: 3,
            name: "소득세",
          },
          {
            id: 4,
            name: "지방소득세",
          },
          {
            id: 5,
            name: "공제총액",
          },
          {
            id: 6,
            name: "차인지급액",
          },
        ]
        respon.map((val: any) => {
          // data table minify
          let dataAdd = {
            imputedMonth: val.imputedMonth,
            imputedYear: val.imputedYear,
            paymentYear: val.paymentYear,
            paymentMonth: val.paymentMonth,
          }
          dataSource.value[0]['month' + val.imputedMonth] = val
          // data table detail
          dataCustomRes.value[0]['month' + val.imputedMonth] =
          {
            value: filters.formatCurrency(val.employeeStat?.employeeCount),
            ...dataAdd
          }
          dataCustomRes.value[1]['month' + val.imputedMonth] =
          {
            value: filters.formatCurrency(val.incomeStat?.incomePayment),
            ...dataAdd
          }
          dataCustomRes.value[2]['month' + val.imputedMonth] = {
            value: filters.formatCurrency(val.incomeStat?.withholdingIncomeTax),
            ...dataAdd
          }
          dataCustomRes.value[3]['month' + val.imputedMonth] = {
            value: filters.formatCurrency(val.incomeStat?.withholdingLocalIncomeTax),
            ...dataAdd
          }
          dataCustomRes.value[4]['month' + val.imputedMonth] = {
            value: filters.formatCurrency(val.incomeStat?.withholdingIncomeTax + val.incomeStat?.withholdingLocalIncomeTax),
            ...dataAdd
          }
          dataCustomRes.value[5]['month' + val.imputedMonth] = {
            value: filters.formatCurrency(val.incomeStat?.actualPayment),
            ...dataAdd
          }
        })
        if (isRunOnce.value) {
          if (dataSource.value[0]['month' + monthClicked.value]) {
            showDetailSelected(dataSource.value[0]['month' + monthClicked.value]);
          } else {
            isDisabledForm.value = true;
            showDetailSelected({
              imputedMonth: processKeyPA620.value.imputedMonth,
              imputedYear: globalYear.value,
              paymentMonth: processKeyPA620.value.imputedMonth,
              paymentYear: globalYear.value,
            });
          }
          isRunOnce.value = false;
        }
        trigger.value = false;
      }
    })
    errorGetIncomeProcessBusinesses(res => {
      notification('error', res.message)
    })
    // ================FUNCTION============================================ 
    // fnc click month fake
    const changeMonthDataFake = ref({ imputedMonth: 0 });
    const onChangeMonth = (data: any) => {
      store.commit("common/processKeyPA620", { imputedMonth: data.imputedMonth });
      statusButton.value = data.status;
      store.state.common.processKeyPA620.imputedYear = data.imputedYear
      store.state.common.processKeyPA620.imputedMonth = data.imputedMonth
      store.state.common.processKeyPA620.paymentYear = data.paymentYear
      store.state.common.processKeyPA620.paymentMonth = data.paymentMonth;
      dataQuery.value.imputedYear = globalYear.value;
      configTrigger.value = true;
      refetchHolding();
      monthHover.value = 0;
    }
    const showDetailSelected = (data: any) => {
      if (!isRunOnce.value) {
        isDisabledForm.value = false;
      }
      if (formRef.value.compareForm()) {
        onChangeMonth(data)
      } else {
        formRef.value.compareType = 1;
        formRef.value.isClickMonthDiff = true;
        formRef.value.rowChangeStatus = true;
        changeMonthDataFake.value = data;
        monthHover.value = data.imputedMonth;
      }
    }
    const changeNoSave = (val: Number, year: any) => {
      if (val === 0) {
        onChangeMonth(changeMonthDataFake.value);
      }
      if (val == 1) {
        changeYear(globalYear.value);
      }
      if (val == 2) {
        addMonth(changeMonthDataFake.value);
      }
    }
    const subValidate = () => {
      monthHover.value = 0;
      formRef.value.isClickEditDiff = false;
      formRef.value.isClickMonthDiff = false;
      formRef.value.isClickAddMonthDiff = false;
    }
    const createdDone = () => {
      if (!formRef.value.isClickYearDiff) {
        trigger.value = true;
        refetchData();
      }
    }
    const statusDone = (emitVal: any) => {
      trigger.value = true;
      refetchData();
      statusButton.value = emitVal;
    }
    const disableAddMonth = (val: any) => {
      let date = dayjs(globalYear.value + '' + val);
      let dateToCompare = dayjs(`${startYearMonth}`, 'YYYYMM')
      if (date.isBefore(dateToCompare)) {
        return true;
      }
      return false;
    }
    const addMonth = (val: any) => {
      modalCopy.value = true;
      dataModalCopy.value = val.imputedMonth;
      dataQuery.value.imputedYear = globalYear.value;
      configTrigger.value = true;
      refetchHolding();
    }
    const onAddMonth = (month: number) => {
      monthHover.value = month;
      if (!formRef.value.compareForm()) {
        formRef.value.compareType = 1;
        formRef.value.rowChangeStatus = true;
        formRef.value.isClickAddMonthDiff = true;
        changeMonthDataFake.value = { imputedMonth: month };
        return;
      }
      addMonth({ imputedMonth: month });
    }
    const loadingTable = () => {
      isRunOnce.value = true;
      trigger.value = true;
      refetchData();
    }
    const dataAddIncomeProcess = (data: any) => {
      dataSource.value[0]['month' + data.imputedMonth] = data
      dataSource.value[0]['month' + data.imputedMonth].status = 10
      isDisabledForm.value = false;
      setUnderline(data);
      statusButton.value = 10;
      monthHover.value = 0;
      changeMonthDataFake.value = { ...processKeyPA620.value };
      formRef.value.isClickAddMonthDiff = false;
    }
    const setUnderline = (monthInputed: any) => {
      return monthClicked.value == monthInputed;
    }
    const onCloseCopy = () => {
      modalCopy.value = false;
      statusButton.value = 10;
      monthHover.value = 0;
      // if (!isCompareForm.value && formRef.value.compareType == 2) {
      //   formRef.value.isClickAddMonthDiff = false;
      //   formRef.value.triggerIncomeBusiness = true;
      // }
    }
    // ======================================== WATCH =========================================
    //change year
    const changeYear = (newVal: any) => {
      formRef.value.resetForm();
      valueCallApiGetIncomeProcessBusinesses.imputedYear = newVal;
      isRunOnce.value = true;
      trigger.value = true;
      formRef.value.isClickYearDiff = false;
      formRef.value.triggerOption = true;
      formRef.value.refetchOption();
    };
    const isCompareForm = computed(() => formRef.value?.compareForm());
    // -----------------get config to check default date type--------------
    const dateType = ref<number>(1);
    const configTrigger = ref<boolean>(false);
    const dataQuery = ref({ companyId: companyId, imputedYear: globalYear.value });
    const { result: resultConfig, refetch: refetchHolding, onError: onErrorConfig } = useQuery(
      queriesHolding.getWithholdingConfig,
      dataQuery,
      () => ({
        enabled: configTrigger.value,
        fetchPolicy: "no-cache",
      })
    );
    onErrorConfig(() => {
      store.state.common.paymentDayPA620 = 1;
      configTrigger.value = false;
    })
    watch(resultConfig, (newVal) => {
      if (newVal) {
        const data = newVal.getWithholdingConfig;
        dateType.value = data.paymentType;
        store.state.common.paymentDayPA620 = data.paymentDay;
        store.state.common.paymentDayDefaultPA620 = data.paymentDay;
        configTrigger.value = false;
      }
    });
    //-----------------------------hover column-----------------------------

    const customColumnClass = (month: any) => {
      return month == monthClicked.value ? 'column-focus' : '' + ' ' + monthHover.value == month ? 'td-hover-custom' : '';
    };
    return {
      modalCopy, actionSave, statusButton, dataCustomRes, globalYear, loadingGetIncomeProcessBusinesses, rowTable, dataSource, per_page, move_column, colomn_resize, originData, dataModalCopy, isDisabledForm,
      setUnderline, createdDone, onAddMonth, showDetailSelected, loadingTable, dataAddIncomeProcess, processKeyPA620, formRef, changeNoSave, monthClicked,
      isCompareForm, statusDone, dateType, changeMonthDataFake, onCloseCopy, trigger, customColumnClass, subValidate, disableAddMonth,
    };
  },
});
</script>  
<style scoped lang="scss" src="./style/style.scss" ></style>
