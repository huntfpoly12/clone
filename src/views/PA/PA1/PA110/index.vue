<template>
  <action-header title="기타소득자등록" @actionSave="actionAddItem ? onSubmit($event) : updateData($event)" />
  <div id="pa-110" class="page-content">
    <a-row>
      <a-spin :spinning="(loadingIncomeProcessWages || loadingIncomeWages || loadingTaxPayInfo || loadingIncomeWage)"
        size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" key-expr="companyId"
          :focused-row-enabled="true" :show-borders="true" :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize" :column-auto-width="true">
          <DxColumn :caption="processKey.imputedYear + '귀속월'" cell-template="imputed-year" />
          <template #imputed-year="{ data }">
            <span>지급연월</span>
          </template>
          <DxColumn width="100px" caption="01" cell-template="imputed-month1" />
          <template #imputed-month1="{ data }">
            <div v-if="data.data.month1">
              <colorful-badge class="hover-underlined" :value="data.data.month1.status"
                @click="showDetailSelected(data.data.month1)" :year="data.data.month1.paymentYear"
                :month="data.data.month1.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(1)">[+]</div>
          </template>
          <DxColumn width="100px" caption="02" cell-template="imputed-month2" />
          <template #imputed-month2="{ data }">
            <div v-if="data.data.month2">
              <colorful-badge class="hover-underlined" :value="data.data.month2.status"
                @click="showDetailSelected(data.data.month2)" :year="data.data.month2.paymentYear"
                :month="data.data.month2.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(2)">[+]</div>
          </template>
          <DxColumn width="100px" caption="03" cell-template="imputed-month3" />
          <template #imputed-month3="{ data }">
            <div v-if="data.data.month3">
              <colorful-badge class="hover-underlined" :value="data.data.month3.status"
                @click="showDetailSelected(data.data.month3)" :year="data.data.month3.paymentYear"
                :month="data.data.month3.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(3)">[+]</div>
          </template>
          <DxColumn width="100px" caption="04" cell-template="imputed-month4" />
          <template #imputed-month4="{ data }">
            <div v-if="data.data.month4">
              <colorful-badge class="hover-underlined" :value="data.data.month4.status"
                @click="showDetailSelected(data.data.month4)" :year="data.data.month4.paymentYear"
                :month="data.data.month4.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(4)">[+]</div>
          </template>
          <DxColumn width="100px" caption="05" cell-template="imputed-month5" />
          <template #imputed-month5="{ data }">
            <div v-if="data.data.month5">
              <colorful-badge class="hover-underlined" :value="data.data.month5.status"
                @click="showDetailSelected(data.data.month5)" :year="data.data.month5.paymentYear"
                :month="data.data.month5.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(5)">[+]</div>
          </template>
          <DxColumn width="100px" caption="06" cell-template="imputed-month6" />
          <template #imputed-month6="{ data }">
            <div v-if="data.data.month6">
              <colorful-badge class="hover-underlined" :value="data.data.month6.status"
                @click="showDetailSelected(data.data.month6)" :year="data.data.month6.paymentYear"
                :month="data.data.month6.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(6)">[+]</div>
          </template>
          <DxColumn width="100px" caption="07" cell-template="imputed-month7" />
          <template #imputed-month7="{ data }">
            <div v-if="data.data.month7">
              <colorful-badge class="hover-underlined" :value="data.data.month7.status"
                @click="showDetailSelected(data.data.month7)" :year="data.data.month7.paymentYear"
                :month="data.data.month7.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(7)">[+]</div>
          </template>
          <DxColumn width="100px" caption="08" cell-template="imputed-month8" />
          <template #imputed-month8="{ data }">
            <div v-if="data.data.month8">
              <colorful-badge class="hover-underlined" :value="data.data.month8.status"
                @click="showDetailSelected(data.data.month8)" :year="data.data.month8.paymentYear"
                :month="data.data.month8.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(8)">[+]</div>
          </template>
          <DxColumn width="100px" caption="09" cell-template="imputed-month9" />
          <template #imputed-month9="{ data }">
            <div v-if="data.data.month9">
              <colorful-badge class="hover-underlined" :value="data.data.month9.status"
                @click="showDetailSelected(data.data.month9)" :year="data.data.month9.paymentYear"
                :month="data.data.month9.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(9)">[+]</div>
          </template>
          <DxColumn width="100px" caption="10" cell-template="imputed-month10" />
          <template #imputed-month10="{ data }">
            <div v-if="data.data.month10">
              <colorful-badge class="hover-underlined" :value="data.data.month10.status"
                @click="showDetailSelected(data.data.month10)" :year="data.data.month10.paymentYear"
                :month="data.data.month10.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(10)">[+]</div>
          </template>
          <DxColumn width="100px" caption="11" cell-template="imputed-month11" />
          <template #imputed-month11="{ data }">
            <div v-if="data.data.month11">
              <colorful-badge class="hover-underlined" :value="data.data.month11.status"
                @click="showDetailSelected(data.data.month11)" :year="data.data.month11.paymentYear"
                :month="data.data.month11.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(11)">[+]</div>
          </template>
          <DxColumn width="100px" caption="12" cell-template="imputed-month12" />
          <template #imputed-month12="{ data }">
            <div v-if="data.data.month12">
              <colorful-badge class="hover-underlined" :value="data.data.month12.status"
                @click="showDetailSelected(data.data.month12)" :year="data.data.month12.paymentYear"
                :month="data.data.month12.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(12)">[+]</div>
          </template>
          <DxMasterDetail class="table-detail" :enabled="true" template="row-detail" />
          <template #row-detail="{ data }">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataCustomRes"
              :show-borders="true" :column-auto-width="true" :show-column-headers="false">
              <DxColumn cell-template="col-first" data-type="string" />
              <template #col-first="{ data }">
                <b>{{ data.data.name }}</b><br>
              </template>
              <DxColumn width="100px" cell-template="month-1" />
              <template #month-1="{ data }">
                <div v-if="(data.data.month1)">{{ data.data.month1.value }}</div>
              </template>
              <DxColumn width="100px" cell-template="month-2" />
              <template #month-2="{ data }">
                <div v-if="(data.data.month2)">{{ data.data.month2.value }}</div>
              </template>
              <DxColumn width="100px" cell-template="month-3" />
              <template #month-3="{ data }">
                <div v-if="(data.data.month3)">{{ data.data.month3.value }}</div>
              </template>
              <DxColumn width="100px" cell-template="month-4" />
              <template #month-4="{ data }">
                <div v-if="(data.data.month4)">{{ data.data.month4.value }}</div>
              </template>
              <DxColumn width="100px" cell-template="month-5" />
              <template #month-5="{ data }">
                <div v-if="(data.data.month5)">{{ data.data.month5.value }}</div>
              </template>
              <DxColumn width="100px" cell-template="month-6" />
              <template #month-6="{ data }">
                <div v-if="(data.data.month6)">{{ data.data.month6.value }}</div>
              </template>
              <DxColumn width="100px" cell-template="month-7" />
              <template #month-7="{ data }">
                <div v-if="(data.data.month7)">{{ data.data.month7.value }}</div>
              </template>
              <DxColumn width="100px" cell-template="month-8" />
              <template #month-8="{ data }">
                <div v-if="(data.data.month8)">{{ data.data.month8.value }}</div>
              </template>
              <DxColumn width="100px" cell-template="month-9" />
              <template #month-9="{ data }">
                <div v-if="(data.data.month9)">{{ data.data.month9.value }}</div>
              </template>
              <DxColumn width="100px" cell-template="month-10" />
              <template #month-10="{ data }">
                <div v-if="data.data.month10">{{ data.data.month10.value }}</div>
              </template>
              <DxColumn width="100px" cell-template="month-11" />
              <template #month-11="{ data }">
                <div v-if="(data.data.month11)">{{ data.data.month11.value }}
                </div>
              </template>
              <DxColumn width="100px" cell-template="month-12" />
              <template #month-12="{ data }">
                <div v-if="(data.data.month12)">{{ data.data.month12.value }}
                </div>
              </template>

            </DxDataGrid>
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
          :actionUpdateItem="actionUpdateItem" :actionAddItem="actionAddItem" :statusButton="statusButton"
          @createdDone="createdDone" :updateData="updateData" />
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
    let statusButton = ref()
    const modalCopy = ref<boolean>(false);
    const triggerIncomeWage = ref<boolean>(true)
    const triggerProcessIncomeWages = ref<boolean>(true)
    const triggerIncomeWages = ref<boolean>(true)
    const triggeraxPayInfo = ref<boolean>(true)
    const dataRows: any = ref([])
    const actionAddItem: any = ref<boolean>(true)
    const actionUpdateItem: any = ref<number>(1)
    const dataModalCopy: any = ref()
    const arrDataPoint: any = ref([])

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
      result: resIncomeProcessWages,
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
    watch(resIncomeProcessWages, (value) => {
      arrDataPoint.value = [];
      if (value) {
        let respon = value.getIncomeProcessWages
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
        console.log('res', respon)
        respon.forEach((val: any, index: any) => {
          arrDataPoint.value.push({
            imputedYear: val.imputedYear,
            imputedMonth: val.imputedMonth,
            paymentYear: val.paymentYear,
            paymentMonth: val.paymentMonth,
          })
          status.value = respon[0].status
          let dataAdd = {
            imputedYear: val.imputedYear,
            imputedMonth: val.imputedMonth,
            paymentYear: val.paymentYear,
            paymentMonth: val.paymentMonth,
          }
          if (JSON.stringify(dataAdd) == JSON.stringify(processKey.value)) {
            status.value = val.status
          }

          dataSource.value[0]['month' + val.imputedMonth] = val
          // data table detail
          dataCustomRes.value[0]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.withholdingIncomeTax.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
          dataCustomRes.value[1]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.withholdingIncomeTax.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
          dataCustomRes.value[2]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.totalTaxPay.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
          dataCustomRes.value[3]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.totalTaxfreePay.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
          dataCustomRes.value[4]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.withholdingLocalIncomeTax.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
          dataCustomRes.value[5]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.incomePayment.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
          dataCustomRes.value[6]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.incomePayment.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
          dataCustomRes.value[7]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.incomePayment.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
          dataCustomRes.value[8]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.incomePayment.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
          dataCustomRes.value[9]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.withholdingIncomeTax.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
          dataCustomRes.value[10]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.withholdingLocalIncomeTax.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
          dataCustomRes.value[11]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.totalDeduction.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
          dataCustomRes.value[11]['month' + val.imputedMonth] = {
            value: val.incomeStat ? val.incomeStat.actualPayment.toLocaleString('en-US', { currency: 'VND' }) : 0,
            ...dataAdd
          }
        })
      }
    })
    watch(resultIncomeWage, (value) => {
      if (value) {
        dataIncomeWage.value = value.getIncomeWage
      }
    })
    watch(resultTaxPayInfo, (value) => {

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
    const copyMonth = (month: number) => {
      dataModalCopy.value = month
      modalCopy.value = true

    }
    const createdDone = () => {
      triggerProcessIncomeWages.value = true
      refetchDataIncomeWages()
    }
    const showDetailSelected = (data: any) => {
      status.value = data.status
      store.state.common.processKeyPA510.paymentYear = data.paymentYear
      store.state.common.processKeyPA510.paymentMonth = data.paymentMonth
    }
    return {
      loadingIncomeProcessWages, loadingTaxPayInfo, loadingIncomeWages, loadingIncomeWage,
      status, processKey,
      dataSource, originDataIncomeWages, globalYear, statusButton,
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
      formIncomeWageDaily, copyMonth, dataModalCopy, arrDataPoint,
      showDetailSelected,
      dataTaxPayInfo, dataRows, actionAddItem, loadingTableInfo, updateData, actionUpdateItem, createdDone,
      actionEditTaxPay, modalCopy, actionCopySuccess, addMonth
    }

  },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
