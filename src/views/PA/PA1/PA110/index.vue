<template>
  <action-header title="기타소득자등록" @actionSave="actionAddItem ? onSubmit($event) : updateData($event)" />
  <div id="pa-110" class="page-content">
    <a-row>
      <a-spin :spinning="(loadingIncomeProcessWages || loadingIncomeWages || loadingTaxPayInfo || loadingIncomeWage)"
        size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          key-expr="companyId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          :column-auto-width="true" :focused-row-enabled="true">
          <DxScrolling column-rendering-mode="virtual" />
          <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string" />
          <template #col-first="{ data }">
            <b>지급연월</b>
          </template>
          <DxColumn caption="1" width="100px" cell-template="month-1" />
          <template #month-1="{ data }">
            <div class="hover-underlined" v-if="data.data.month1"
              @click="showDetailSelected(data.data.month1.imputedMonth, data.data.month1.imputedYear, data.data.month1.paymentYear, data.data.month1.paymentMonth)">
              <colorful-badge :value="data.data.month1.status" :year="data.data.month1.imputedYear"
                :month="data.data.month1.imputedMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="addMonth(1)"> [+]
            </div>
          </template>
          <DxColumn caption="2" width="100px" cell-template="month-2" />
          <template #month-2="{ data }">
            <div class="hover-underlined" v-if="data.data.month2"
              @click="showDetailSelected(data.data.month2.imputedMonth, data.data.month2.imputedYear, data.data.month2.paymentYear, data.data.month2.paymentMonth)">
              <colorful-badge :value="data.data.month2.status" :year="data.data.month2.imputedYear"
                :month="data.data.month2.imputedMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="addMonth(2)"> [+]
            </div>
          </template>
          <DxColumn caption="3" width="100px" cell-template="month-3" />
          <template #month-3="{ data }">
            <div class="hover-underlined" v-if="data.data.month3"
              @click="showDetailSelected(data.data.month3.imputedMonth, data.data.month3.imputedYear, data.data.month3.paymentYear, data.data.month3.paymentMonth)">
              <colorful-badge :value="data.data.month3.status" :year="data.data.month3.imputedYear"
                :month="data.data.month3.imputedMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="addMonth(3)"> [+]
            </div>
          </template>
          <DxColumn caption="4" width="100px" cell-template="month-4" />
          <template #month-4="{ data }">
            <div class="hover-underlined" v-if="data.data.month4"
              @click="showDetailSelected(data.data.month4.imputedMonth, data.data.month4.imputedYear, data.data.month4.paymentYear, data.data.month4.paymentMonth)">
              <colorful-badge :value="data.data.month4.status" :year="data.data.month4.imputedYear"
                :month="data.data.month4.imputedMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="addMonth(4)"> [+]
            </div>
          </template>
          <DxColumn caption="5" width="100px" cell-template="month-5" />
          <template #month-5="{ data }">
            <div class="hover-underlined" v-if="data.data.month5"
              @click="showDetailSelected(data.data.month5.imputedMonth, data.data.month5.imputedYear, data.data.month5.paymentYear, data.data.month5.paymentMonth)">
              <colorful-badge :value="data.data.month5.status" :year="data.data.month5.imputedYear"
                :month="data.data.month5.imputedMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="addMonth(5)"> [+]
            </div>
          </template>
          <DxColumn caption="6" width="100px" cell-template="month-6" />
          <template #month-6="{ data }">
            <div class="hover-underlined" v-if="data.data.month6"
              @click="showDetailSelected(data.data.month6.imputedMonth, data.data.month6.imputedYear, data.data.month6.paymentYear, data.data.month6.paymentMonth)">
              <colorful-badge :value="data.data.month6.status" :year="data.data.month6.imputedYear"
                :month="data.data.month6.imputedMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="addMonth(6)"> [+]
            </div>
          </template>
          <DxColumn caption="7" width="100px" cell-template="month-7" />
          <template #month-7="{ data }">
            <div class="hover-underlined" v-if="data.data.month7"
              @click="showDetailSelected(data.data.month7.imputedMonth, data.data.month7.imputedYear, data.data.month7.paymentYear, data.data.month7.paymentMonth)">
              <colorful-badge :value="data.data.month7.status" :year="data.data.month7.imputedYear"
                :month="data.data.month7.imputedMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="addMonth(7)"> [+]
            </div>
          </template>
          <DxColumn caption="8" width="100px" cell-template="month-8" />
          <template #month-8="{ data }">
            <div class="hover-underlined" v-if="data.data.month8"
              @click="showDetailSelected(data.data.month8.imputedMonth, data.data.month8.imputedYear, data.data.month8.paymentYear, data.data.month8.paymentMonth)">
              <colorful-badge :value="data.data.month8.status" :year="data.data.month8.imputedYear"
                :month="data.data.month8.imputedMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="addMonth(8)"> [+]
            </div>
          </template>
          <DxColumn caption="9" width="100px" cell-template="month-9" />
          <template #month-9="{ data }">
            <div class="hover-underlined" v-if="data.data.month9"
              @click="showDetailSelected(data.data.month9.imputedMonth, data.data.month9.imputedYear, data.data.month9.paymentYear, data.data.month9.paymentMonth)">
              <colorful-badge :value="data.data.month9.status" :year="data.data.month9.imputedYear"
                :month="data.data.month9.imputedMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="addMonth(9)"> [+]
            </div>
          </template>
          <DxColumn caption="10" width="100px" cell-template="month-10" />
          <template #month-10="{ data }">
            <div class="hover-underlined" v-if="data.data.month10"
              @click="showDetailSelected(data.data.month10.imputedMonth, data.data.month10.imputedYear, data.data.month10.paymentYear, data.data.month10.paymentMonth)">
              <colorful-badge :value="data.data.month10.status" :year="data.data.month10.imputedYear"
                :month="data.data.month10.imputedMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="addMonth(10)"> [+]
            </div>
          </template>
          <DxColumn caption="11" width="100px" cell-template="month-11" />
          <template #month-11="{ data }">
            <div class="hover-underlined" v-if="data.data.month11"
              @click="showDetailSelected(data.data.month11.imputedMonth, data.data.month11.imputedYear, data.data.month11.paymentYear, data.data.month11.paymentMonth)">
              <colorful-badge :value="data.data.month11.status" :year="data.data.month11.imputedYear"
                :month="data.data.month11.imputedMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="addMonth(11)"> [+]
            </div>
          </template>
          <DxColumn caption="12" width="100px" cell-template="month-12" />
          <template #month-12="{ data }">
            <div class="hover-underlined" v-if="data.data.month12"
              @click="showDetailSelected(data.data.month12.imputedMonth, data.data.month12.imputedYear, data.data.month12.paymentYear, data.data.month12.paymentMonth)">
              <colorful-badge :value="data.data.month12.status" :year="data.data.month12.imputedYear"
                :month="data.data.month12.imputedMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="addMonth(12)"> [+]
            </div>
          </template>
          <DxMasterDetail class="table-detail" :enabled="true" template="detailRow" />
          <template #detailRow="{ data }">
            <div>
              <DxDataGrid key-expr="id" :data-source="dataCustomRes" :show-borders="false" :column-auto-width="true"
                :allow-column-reordering="move_column" :show-column-headers="false"
                :allow-column-resizing="colomn_resize" :focused-row-enabled="true">
                <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string" />
                <template #col-first="{ data }">
                  <b>{{ data.data.name }}</b><br>
                </template>
                <DxColumn caption="1" width="100px" cell-template="month-1" />
                <template #month-1="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month1.imputedMonth, data.data.month1.imputedYear, data.data.month1.paymentYear, data.data.month1.paymentMonth)"
                    v-if="data.data.month1"> {{ data.data.month1.value }}</div>
                </template>
                <DxColumn caption="2" width="100px" cell-template="month-2" />
                <template #month-2="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month2.imputedMonth, data.data.month2.imputedYear, data.data.month2.paymentYear, data.data.month2.paymentMonth)"
                    v-if="(data.data.month2)"> {{ data.data.month2.value }}</div>
                </template>
                <DxColumn caption="3" width="100px" cell-template="month-3" />
                <template #month-3="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month3.imputedMonth, data.data.month3.imputedYear, data.data.month3.paymentYear, data.data.month3.paymentMonth)"
                    v-if="(data.data.month3)"> {{ data.data.month3.value }}</div>
                </template>
                <DxColumn caption="4" width="100px" cell-template="month-4" />
                <template #month-4="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month4.imputedMonth, data.data.month4.imputedYear, data.data.month4.paymentYear, data.data.month4.paymentMonth)"
                    v-if="(data.data.month4)"> {{ data.data.month4.value }}</div>
                </template>
                <DxColumn caption="5" width="100px" cell-template="month-5" />
                <template #month-5="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month5.imputedMonth, data.data.month5.imputedYear, data.data.month5.paymentYear, data.data.month5.paymentMonth)"
                    v-if="(data.data.month5)"> {{ data.data.month5.value }}</div>
                </template>
                <DxColumn caption="6" width="100px" cell-template="month-6" />
                <template #month-6="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month6.imputedMonth, data.data.month6.imputedYear, data.data.month6.paymentYear, data.data.month6.paymentMonth)"
                    v-if="(data.data.month6)"> {{ data.data.month6.value }}</div>
                </template>
                <DxColumn caption="7" width="100px" cell-template="month-7" />
                <template #month-7="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month7.imputedMonth, data.data.month7.imputedYear, data.data.month7.paymentYear, data.data.month7.paymentMonth)"
                    v-if="(data.data.month7)"> {{ data.data.month7.value }}</div>
                </template>
                <DxColumn caption="8" width="100px" cell-template="month-8" />
                <template #month-8="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month8.imputedMonth, data.data.month8.imputedYear, data.data.month8.paymentYear, data.data.month8.paymentMonth)"
                    v-if="(data.data.month8)"> {{ data.data.month8.value }}</div>
                </template>
                <DxColumn caption="9" width="100px" cell-template="month-9" />
                <template #month-9="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month9.imputedMonth, data.data.month9.imputedYear, data.data.month9.paymentYear, data.data.month9.paymentMonth)"
                    v-if="(data.data.month9)"> {{ data.data.month9.value }}</div>
                </template>
                <DxColumn caption="10" width="100px" cell-template="month-10" />
                <template #month-10="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month10.imputedMonth, data.data.month10.imputedYear, data.data.month10.paymentYear, data.data.month10.paymentMonth)"
                    v-if="data.data.month10">
                    {{ data.data.month10.value }}
                  </div>
                </template>
                <DxColumn caption="11" width="100px" cell-template="month-11" />
                <template #month-11="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month11.imputedMonth, data.data.month11.imputedYear, data.data.month11.paymentYear, data.data.month11.paymentMonth)"
                    v-if="(data.data.month11)">
                    {{ data.data.month11.value }}
                  </div>
                </template>
                <DxColumn caption="12" width="100px" cell-template="month-12" />
                <template #month-12="{ data }">
                  <div class="hover-underlined"
                    @click="showDetailSelected(data.data.month12.imputedMonth, data.data.month12.imputedYear, data.data.month12.paymentYear, data.data.month12.paymentMonth)"
                    v-if="(data.data.month12)">
                    {{ data.data.month12.value }}
                  </div>
                </template>
              </DxDataGrid>
            </div>
          </template>
        </DxDataGrid>
      </a-spin>
    </a-row>
    <a-row style="border: 1px solid #d7d7d7; padding: 10px; margin-top: 10px; justify-content: space-between;">
      <a-col>
        <DxButton :text="'귀' + processKey.paymentYear + '-' + processKey.paymentMonth"
          :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
        <DxButton :text="'지' + processKey.paymentYear + '-' + processKey.paymentMonth"
          :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" />
        <ProcessStatus v-model:valueStatus="status" />
      </a-col>
      <a-col class="">
        <SelectActionComponent :modalStatus="true" :dataRows="dataRows" @actionAddItem="actionAddItem = true"
          @loadingTableInfo="loadingTableInfo" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12" class="custom-layout">
        <a-spin :spinning="loadingTaxPayInfo" size="large">
          <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataTaxPayInfo"
            :show-borders="true" :allow-column-reordering="move_column" :focused-row-enabled="true"
            :allow-column-resizing="colomn_resize" :column-auto-width="true" key-expr="employeeId"
            :onRowClick="actionEditTaxPay" @selection-changed="selectionChanged">
            <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
            <DxColumn width="200" caption="사원" cell-template="tag" />
            <template #tag="{ data }" class="custom-action">
              <div class="custom-action">
                <employee-info :idEmployee="data.data.employee.employeeId" :name="data.data.employee.name"
                  :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
                  :foreigner="data.data.employee.foreigner" :checkStatus="false" />
              </div>
            </template>
            <DxColumn caption="급여" data-field="totalPay" />
            <DxColumn caption="공제" data-field="totalDeduction" />
            <DxColumn caption="차인지급액" data-field="actualPayment" />
            <DxColumn width="250" caption="비고" cell-template="four-major-insurance" />
            <template #four-major-insurance="{ data }" class="custom-action">
              <div class="custom-action">
                <four-major-insurance v-if="data.data.employee.nationalPensionDeduction" :typeTag="1" :typeValue="1" />
                <four-major-insurance v-if="data.data.employee.healthInsuranceDeduction" :typeTag="2" :typeValue="1" />
                <four-major-insurance v-if="data.data.employee.employeementInsuranceDeduction" :typeTag="4"
                  :typeValue="1" />
                <four-major-insurance v-if="data.data.employee.nationalPensionSupportPercent" :typeTag="6"
                  :ratio="data.data.employee.nationalPensionSupportPercent" />
                <four-major-insurance v-if="data.data.employee.employeementInsuranceSupportPercent" :typeTag="7"
                  :ratio="data.data.employee.employeementInsuranceSupportPercent" />
                <four-major-insurance v-if="data.data.employee.employeementReductionRatePercent" :typeTag="8"
                  :ratio="data.data.employee.employeementReductionRatePercent" />
                <four-major-insurance v-if="data.data.employee.incomeTaxMagnification" :typeTag="10"
                  :ratio="data.data.employee.incomeTaxMagnification" />
              </div>
            </template>
            <DxColumn caption="지급일" data-field="paymentDay" />
            <DxSummary>
              <DxTotalItem column="사원" summary-type="count" display-format="사원수: {0}" />
              <DxTotalItem column="totalPay" summary-type="sum" display-format="급여합계: {0}" />
              <DxTotalItem column="totalDeduction" summary-type="sum" display-format="공제합계: {0}" />
              <DxTotalItem column="actualPayment" summary-type="sum" display-format="차인지급액합계: {0}" />
            </DxSummary>
          </DxDataGrid>
        </a-spin>
      </a-col>
      <a-col :span="12" class="custom-layout" style="padding-right: 0px;">
        <FormDataComponent :dataIncomeWage="dataIncomeWage" :arrayEmploySelect="arrayEmploySelect"
          :actionUpdateItem="actionUpdateItem" />
      </a-col>
      <CopyMonth :modalStatus="modalCopy" @closePopup="actionCopySuccess" />
    </a-row>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from "vue"
import DxButton from "devextreme-vue/button"
import dayjs from 'dayjs';
import { useStore } from 'vuex'
import { useQuery } from "@vue/apollo-composable"
import { companyId } from "@/helpers/commonFunction"
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxSummary, DxTotalItem, DxMasterDetail } from "devextreme-vue/data-grid"
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue"
import SelectActionComponent from "./components/SelectActionComponent.vue"
import FormDataComponent from "./components/FormDataComponent2.vue"
import queries from "@/graphql/queries/PA/PA1/PA110/index"
import { sampleDataIncomeWage, sampleFormIncomeWage } from "./utils/index"
import filters from "@/helpers/filters";

import EmploySelect from "@/components/common/EmploySelect.vue"
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import DeductionPopup from "./components/Popup/DeductionPopup.vue"
import InsurancePopup from "./components/Popup/InsurancePopup.vue"
import CopyMonth from "./components/CopyMonth.vue";
export default defineComponent({
  components: {
    DxMasterDetail,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxScrolling,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    DxButton,
    DxSummary,
    DxTotalItem,
    EditOutlined,
    HistoryOutlined,
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
    SelectActionComponent,
    EmploySelect,
    ProcessStatus,
    DeductionPopup,
    InsurancePopup,
    FormDataComponent, CopyMonth
  },
  setup() {
    const store = useStore()
    const globalYear = computed(() => store.state.settings.globalYear)
    const per_page = computed(() => store.state.settings.per_page)
    const move_column = computed(() => store.state.settings.move_column)
    const colomn_resize = computed(() => store.state.settings.colomn_resize)
    const modalCopy = ref<boolean>(false);
    const triggerIncomeWage = ref<boolean>(true)
    const triggerProcessIncomeWages = ref<boolean>(true)
    const triggerIncomeWages = ref<boolean>(true)
    const triggeraxPayInfo = ref<boolean>(true)
    const dataRows: any = ref([])
    const actionAddItem: any = ref<boolean>(true)
    const actionUpdateItem: any = ref<number>(0)
    store.state.common.processKeyPA110 = {
      imputedYear: globalYear,
      imputedMonth: dayjs().month() + 1,
      paymentYear: globalYear.value,
      paymentMonth: dayjs().month() + 1,
    }
    const processKey = computed(() => store.state.common.processKeyPA510)
    let dataCustomRes: any = ref([])
    const dataIncomeWage: any = ref({ ...sampleDataIncomeWage })

    const dataSource: any = ref([])
    let status: any = ref()
    const dataTaxPayInfo: any = ref([])
    const formIncomeWageDaily = reactive({ ...sampleFormIncomeWage })
    const imputedYear = ref('')
    const imputedMonth = ref('')
    const arrayEmploySelect: any = ref([])
    const originDataProcessIncome = ref({
      companyId: companyId,
      imputedYear: globalYear,
      // imputedMonth: dayjs().month(),
    })
    const originDataIncomeWage = ref({
      companyId: companyId,
      processKey: processKey.value,
      incomeId: 0,
    })
    let originDataIncomeWages = reactive({
      companyId: companyId,
      processKey: processKey.value,
    })

    let popupData = ref([])
    // ======================= GRAPQL ================================
    const {
      refetch: refetchDataProcessIncomeWages,
      onResult: resIncomeProcessWages,
      loading: loadingIncomeProcessWages
    } = useQuery(queries.getIncomeProcessWages, originDataProcessIncome, () => ({
      enabled: triggerProcessIncomeWages.value,
      fetchPolicy: "no-cache",
    }))
    const {
      refetch: refetchDataIncomeWages,
      onResult: resIncomeWages,
      loading: loadingIncomeWages
    } = useQuery(queries.getIncomeWages, originDataIncomeWages, () => ({
      enabled: triggerIncomeWages.value,
      fetchPolicy: "no-cache",
    }))
    const {
      refetch: refetchDataIncomeWage,
      result: resultIncomeWage,
      loading: loadingIncomeWage,
    } = useQuery(queries.getIncomeWage, originDataIncomeWage, () => ({
      enabled: triggerIncomeWage.value,
      fetchPolicy: "no-cache",
    }))
    const {
      refetch: refetchDataTaxPayInfo,
      result: resultTaxPayInfo,
      loading: loadingTaxPayInfo,
    } = useQuery(queries.getIncomeWages, originDataIncomeWages, () => ({
      enabled: triggeraxPayInfo.value,
      fetchPolicy: "no-cache",
    }))

    // ======================= WATCH ==================================
    // get data table detail getIncomeProcessWages
    resIncomeProcessWages(res => {
      console.log('processKey.value', processKey.value)
      let respon = res.data.getIncomeProcessWages

      dataSource.value = [{
        companyId: companyId,
      }]
      dataCustomRes.value = [
        { id: 1, name: "재직(퇴사) " },
        { id: 2, name: "과세급여", },
        { id: 3, name: "비과세급여", },
        { id: 4, name: "급여총액", },
        { id: 5, name: "국민연금", },
        { id: 6, name: "건강보험", },
        { id: 7, name: "장기요양", },
        { id: 8, name: "고용보험", },
        { id: 9, name: "소득세", },
        { id: 10, name: "지방소득세", },
        { id: 11, name: "공제총액", },
        { id: 12, name: "차인지급액", },
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

        dataCustomRes.value[0]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val),
          ...dataAdd
        }
        dataCustomRes.value[1]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.totalTaxPay),
          ...dataAdd
        }
        dataCustomRes.value[2]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.totalTaxfreePay),
          ...dataAdd
        }
        dataCustomRes.value[3]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val.incomeStat.withholdingLocalIncomeTax),
          ...dataAdd
        }
        dataCustomRes.value[4]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val),
          ...dataAdd
        }
        dataCustomRes.value[5]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val),
          ...dataAdd
        }
        dataCustomRes.value[6]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val),
          ...dataAdd
        }
        dataCustomRes.value[7]['month' + val.imputedMonth] = {
          value: filters.formatCurrency(val),
          ...dataAdd
        }
        dataCustomRes.value[8]['month' + val.imputedMonth] = {

          value: filters.formatCurrency(val.incomeStat.withholdingIncomeTax),
          ...dataAdd
        }
        dataCustomRes.value[9]['month' + val.imputedMonth] = {

          value: filters.formatCurrency(val.incomeStat.withholdingLocalIncomeTax),
          ...dataAdd
        }
        dataCustomRes.value[10]['month' + val.imputedMonth] = {

          value: filters.formatCurrency(val.incomeStat.totalDeduction),
          ...dataAdd
        }
        dataCustomRes.value[11]['month' + val.imputedMonth] = {

          value: filters.formatCurrency(val.incomeStat.actualPayment),
          ...dataAdd
        }

      })
    })


    watch(resultIncomeWage, (value) => {
      if (value) {
        dataIncomeWage.value = value.getIncomeWage
      }
    })
    watch(resultTaxPayInfo, (value) => {
      console.log('valuearraaaaaaaa', value)
      dataTaxPayInfo.value = value.getIncomeWages
      dataTaxPayInfo.value.map((value: any) => {
        arrayEmploySelect.value.push({
          employeeId: value.employee.employeeId,
          name: value.employee.name,
          idCardNumber: value.employee.idCardNumber,
          status: value.employee.status,
          foreigner: value.employee.foreigner
        }
        )
      })
    })
    const loadingTableInfo = () => {
      refetchDataTaxPayInfo()
    }
    // ======================= FUNCTION ================================
    const onSubmit = (e: any) => {
    }
    const updateData = (e: any) => {
      actionUpdateItem.value++
    }
    const actionEditTaxPay = (data: any) => {
      dataIncomeWage.value = data.data
      actionAddItem.value = false
    }
    const addMonth = (month: number) => {
      modalCopy.value = true
    }
    const actionCopySuccess = () => {
      modalCopy.value = false
    }
    const selectionChanged = (data: any) => {
      dataRows.value = data.selectedRowsData
    }
    const showDetailSelected = (imputedMonth: any, imputedYear: any, paymentYear: any, paymentMonth: any) => {
      status.value = status
      store.state.common.processKeyPA110.paymentYear = paymentYear
      store.state.common.processKeyPA110.paymentMonth = paymentMonth
      store.state.common.processKeyPA110.imputedMonth = imputedMonth
      store.state.common.processKeyPA110.imputedYear = imputedYear
    }
    return {
      loadingIncomeProcessWages, loadingTaxPayInfo, loadingIncomeWages, loadingIncomeWage,
      status, processKey,
      dataSource, originDataIncomeWages, globalYear,
      per_page, move_column, colomn_resize,
      refetchDataProcessIncomeWages, refetchDataIncomeWages,
      onSubmit,
      dataIncomeWage,
      popupData,
      selectionChanged,
      arrayEmploySelect,
      imputedYear,
      imputedMonth,
      dataCustomRes,
      formIncomeWageDaily,
      showDetailSelected,
      dataTaxPayInfo, dataRows, actionAddItem, loadingTableInfo, updateData, actionUpdateItem,
      actionEditTaxPay, modalCopy, actionCopySuccess, addMonth
    }

  },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
