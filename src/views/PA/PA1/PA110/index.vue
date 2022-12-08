<template>
  <action-header title="기타소득자등록" @actionSave="onSubmit($event)" />
  <div id="pa-110" class="page-content">
    <a-row>
      <a-spin :spinning="(loadingIncomeProcessWages || loadingIncomeWages || loadingTaxPayInfo || loadingIncomeWage)"
        size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" key-expr="imputedYear"
          :focused-row-enabled="true" :show-borders="true" :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize" :column-auto-width="true">
          <DxColumn :caption="imputedYear + '귀속월'" cell-template="imputed-year" width="350px" />
          <template #imputed-year="{ data }">
            <span>지급연월</span>
          </template>
          <!-- <DxColumn :caption="imputedMonth" cell-template="imputed-month" />
                  <template #imputed-month="{ data }">
                      <span>{{ data.data.paymentYear }}-{{ data.data.paymentMonth }}</span>
                  </template> -->
          <DxColumn caption="01" cell-template="imputed-month1" />
          <template #imputed-month1="{ data }">
            <div v-if="data.data.month1">
              <colorful-badge @click="showDetailSelected(month)" v-for="(month, index) in data.data.month1" :key="index"
                :value="month.status" :year="month.paymentYear" :month="month.paymentMonth" />
            </div>
          </template>
          <DxColumn caption="02" cell-template="imputed-month2" />
          <template #imputed-month2="{ data }">
            <div v-if="data.data.month2">
              <colorful-badge @click="showDetailSelected(month)" v-for="(month, index) in data.data.month2" :key="index"
                :value="month.status" :year="month.paymentYear" :month="month.paymentMonth" />
            </div>
          </template>
          <DxColumn caption="03" cell-template="imputed-month3" />
          <template #imputed-month3="{ data }">
            <div v-if="data.data.month3">
              <colorful-badge @click="showDetailSelected(month)" v-for="(month, index) in data.data.month3" :key="index"
                :value="month.status" :year="month.paymentYear" :month="month.paymentMonth" />
            </div>
          </template>
          <DxColumn caption="04" cell-template="imputed-month4" />
          <template #imputed-month4="{ data }">
            <div v-if="data.data.month4">
              <colorful-badge @click="showDetailSelected(month)" v-for="(month, index) in data.data.month4" :key="index"
                :value="month.status" :year="month.paymentYear" :month="month.paymentMonth" />
            </div>
          </template>
          <DxColumn caption="05" cell-template="imputed-month5" />
          <template #imputed-month5="{ data }">
            <div v-if="data.data.month5">
              <colorful-badge @click="showDetailSelected(month)" v-for="(month, index) in data.data.month5" :key="index"
                :value="month.status" :year="month.paymentYear" :month="month.paymentMonth" />
            </div>
          </template>
          <DxColumn caption="06" cell-template="imputed-month6" />
          <template #imputed-month6="{ data }">
            <div v-if="data.data.month6">
              <colorful-badge @click="showDetailSelected(month)" v-for="(month, index) in data.data.month6" :key="index"
                :value="month.status" :year="month.paymentYear" :month="month.paymentMonth" />
            </div>
          </template>
          <DxColumn caption="07" cell-template="imputed-month7" />
          <template #imputed-month7="{ data }">
            <div v-if="data.data.month7">
              <colorful-badge @click="showDetailSelected(month)" v-for="(month, index) in data.data.month7" :key="index"
                :value="month.status" :year="month.paymentYear" :month="month.paymentMonth" />
            </div>
          </template>
          <DxColumn caption="08" cell-template="imputed-month8" />
          <template #imputed-month8="{ data }">
            <div v-if="data.data.month8">
              <colorful-badge @click="showDetailSelected(month)" v-for="(month, index) in data.data.month8" :key="index"
                :value="month.status" :year="month.paymentYear" :month="month.paymentMonth" />
            </div>
          </template>
          <DxColumn caption="09" cell-template="imputed-month9" />
          <template #imputed-month9="{ data }">
            <div v-if="data.data.month9">
              <colorful-badge @click="showDetailSelected(month)" v-for="(month, index) in data.data.month9" :key="index"
                :value="month.status" :year="month.paymentYear" :month="month.paymentMonth" />
            </div>
          </template>
          <DxColumn caption="10" cell-template="imputed-month10" />
          <template #imputed-month10="{ data }">
            <div v-if="data.data.month10">
              <colorful-badge @click="showDetailSelected(month)" v-for="(month, index) in data.data.month10"
                :key="index" :value="month.status" :year="month.paymentYear" :month="month.paymentMonth" />
            </div>
          </template>
          <DxColumn caption="11" cell-template="imputed-month11" />
          <template #imputed-month11="{ data }">
            <div v-if="data.data.month11">
              <colorful-badge @click="showDetailSelected(month)" v-for="(month, index) in data.data.month11"
                :key="index" :value="month.status" :year="month.paymentYear" :month="month.paymentMonth" />
            </div>
          </template>
          <DxColumn caption="12" cell-template="imputed-month12" />
          <template #imputed-month12="{ data }">
            <div v-if="data.data.month12">
              <colorful-badge @click="showDetailSelected(month)" v-for="(month, index) in data.data.month12"
                :key="index" :value="month.status" :year="month.paymentYear" :month="month.paymentMonth" />
            </div>
          </template>
          <DxColumn cell-template="button-add" />
          <template #button-add>
            <DxButton class="ml-3" icon="plus" />
          </template>
          <DxMasterDetail :enabled="true" template="row-detail" />
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
              <DxColumnHeaderFilter width="100px" cell-template="month-11" />
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
        <DxButton :text="'귀' + imputedYear + '-' + imputedMonth" :style="{ color: 'white', backgroundColor: 'gray' }"
          :height="'33px'" />
        <DxButton :text="'지' + imputedYear + '-' + imputedMonth" :style="{ color: 'white', backgroundColor: 'black' }"
          :height="'33px'" />
        <ProcessStatus v-model:valueStatus="status" />
      </a-col>
      <a-col class="">
        <SelectActionComponent :modalStatus="true" :historyData="originDataIncomeWages" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="14" class="custom-layout">
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
              <DxTotalItem column="totalPay" summary-type="sum" />
              <DxTotalItem column="totalDeduction" summary-type="sum" />
              <DxTotalItem column="actualPayment" summary-type="sum" />
            </DxSummary>
          </DxDataGrid>
        </a-spin>
      </a-col>
      <a-col :span="10" class="custom-layout" style="padding-right: 0px;">
        <FormDataComponent :dataIncomeWage="dataIncomeWage" :arrayEmploySelect="arrayEmploySelect" />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from "vue"
import DxButton from "devextreme-vue/button"
import dayjs, { Dayjs } from 'dayjs';
import { useStore } from 'vuex'
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId } from "@/helpers/commonFunction"
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxSummary, DxTotalItem, DxMasterDetail } from "devextreme-vue/data-grid"
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue"
import notification from "@/utils/notification"
import SelectActionComponent from "./components/SelectActionComponent.vue"
import FormDataComponent from "./components/FormDataComponent.vue"
import queries from "@/graphql/queries/PA/PA1/PA110/index"
import mutations from "@/graphql/mutations/PA/PA1/PA110/index"
import { Message } from "@/configs/enum"
import { sampleDataIncomeWage, sampleFormIncomeWage } from "./utils/index"
import filters from "@/helpers/filters";

import EmploySelect from "@/components/common/EmploySelect.vue"
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import DeductionPopup from "./components/Popup/DeductionPopup.vue"
import InsurancePopup from "./components/Popup/InsurancePopup.vue"
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
    FormDataComponent,
  },
  setup() {
    const store = useStore()
    const globalYear = computed(() => store.state.settings.globalYear)
    const per_page = computed(() => store.state.settings.per_page)
    const move_column = computed(() => store.state.settings.move_column)
    const colomn_resize = computed(() => store.state.settings.colomn_resize)

    const triggerIncomeWage = ref<boolean>(true)
    const triggerProcessIncomeWages = ref<boolean>(true)
    const triggerIncomeWages = ref<boolean>(true)
    const triggeraxPayInfo = ref<boolean>(true)

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
      processKey: {
        imputedYear: 2022,
        imputedMonth: 12,
        paymentYear: 2022,
        paymentMonth: 12,
      },
      incomeId: 1,
    })
    const originDataIncomeWages = ref({
      companyId: companyId,
      processKey: {
        imputedYear: 2022,
        imputedMonth: 12,
        paymentYear: 2022,
        paymentMonth: 12,
      }
    })
    const originDataTaxPayInfo = ref({
      companyId: companyId,
      processKey: {
        imputedYear: 2022,
        imputedMonth: 12,
        paymentYear: 2022,
        paymentMonth: 12,
      },
      incomeId: 1,
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
      result: resIncomeWages,
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
    } = useQuery(queries.getIncomeWage, originDataTaxPayInfo, () => ({
      enabled: triggeraxPayInfo.value,
      fetchPolicy: "no-cache",
    }))

    // ======================= WATCH ==================================
    watch(resIncomeProcessWages, (value) => {
      if (value) {
        let respon = value.getIncomeProcessWages
        imputedYear.value = respon[0].imputedYear
        imputedMonth.value = respon[0].imputedMonth
        status.value = respon[0].status
        dataSource.value = [{
          companyId: respon[0].companyId,
          imputedYear: respon[0].imputedYear,

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
        console.log('dataCustomRes2', dataCustomRes.value)
        console.log('respon', respon)

        respon.forEach((val: any, index: any) => {
          let dataAdd = {
            imputedMonth: val.imputedMonth,
            paymentYear: val.paymentYear,
            paymentMonth: val.paymentMonth,
          }
          if (!dataSource.value[0]['month' + val.imputedMonth]) {
            dataSource.value[0]['month' + val.imputedMonth] = []
          }
          dataSource.value[0]['month' + val.imputedMonth][index] = val

          // data table detail
          dataCustomRes.value[0]['month' + val.imputedMonth] = {
            value: filters.formatCurrency(val),
            ...dataAdd
          }
          dataCustomRes.value[1]['month' + val.imputedMonth] = {
            value: filters.formatCurrency(val),
            ...dataAdd
          }
          dataCustomRes.value[2]['month' + val.imputedMonth] = {
            value: filters.formatCurrency(val),
            ...dataAdd
          }
          dataCustomRes.value[3]['month' + val.imputedMonth] = {
            value: filters.formatCurrency(val),
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
            value: filters.formatCurrency(val),
            ...dataAdd
          }
          dataCustomRes.value[9]['month' + val.imputedMonth] = {
            value: filters.formatCurrency(val),
            ...dataAdd
          }
          dataCustomRes.value[10]['month' + val.imputedMonth] = {
            value: filters.formatCurrency(val),
            ...dataAdd
          }
          dataCustomRes.value[11]['month' + val.imputedMonth] = {
            value: filters.formatCurrency(val),
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
    watch(resIncomeWages, (value) => {
    })
    watch(resultTaxPayInfo, (value) => {
      if (value) {
        dataTaxPayInfo.value = value.getIncomeWage
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
      }
    })

    // ======================= FUNCTION ================================
    const onSubmit = (e: any) => {
    }

    const actionEditTaxPay = (data: any) => {
      dataIncomeWage.value = data.data
      console.log(dataIncomeWage.value);
    }

    const selectionChanged = (data: any) => {

    }
    const showDetailSelected = (data: any) => {
      console.log(data);
      // dataTaxPayInfo.value = data
    }
    return {
      loadingIncomeProcessWages, loadingTaxPayInfo, loadingIncomeWages, loadingIncomeWage,
      status,
      dataSource, originDataIncomeWages,
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
      dataTaxPayInfo,
      actionEditTaxPay,
    }

  },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
