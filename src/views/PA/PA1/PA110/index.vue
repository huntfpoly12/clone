<template>
  <div>
  <action-header title="기타소득자등록" @actionSave="actionAddItem ? onSubmit($event) : updateData($event)" />
  <div id="pa-110" class="page-content">
    <a-row>
      <a-spin :spinning="(loadingIncomeProcessWages)" size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" key-expr="companyId"
          :focused-row-enabled="true" :show-borders="true" :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize" :column-auto-width="true">
          <DxColumn :caption="globalYear + '귀속월'" cell-template="imputed-year" />
          <template #imputed-year="{ }">
            <span>지급연월</span>
          </template>
          <DxColumn width="100px" caption="01" cell-template="imputed-month1" />
          <template #imputed-month1="{ data }">
            <div v-if="data.data.month1">
              <colorful-badge class="hover-underlined" :value="data.data.month1.status"
              :class="setUnderline(data.data.month1.imputedMonth) ?'current-underlined':''"
                @click="showDetailSelected(data.data.month1)" :year="data.data.month1.paymentYear"
                :month="data.data.month1.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(1)">[+]</div>
          </template>
          <DxColumn width="100px" caption="02" cell-template="imputed-month2" />
          <template #imputed-month2="{ data }">
            <div v-if="data.data.month2">
              <colorful-badge class="hover-underlined" :value="data.data.month2.status"
              :class="setUnderline(data.data.month2.imputedMonth) ?'current-underlined':''"
                @click="showDetailSelected(data.data.month2)" :year="data.data.month2.paymentYear"
                :month="data.data.month2.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(2)">[+]</div>
          </template>
          <DxColumn width="100px" caption="03" cell-template="imputed-month3" />
          <template #imputed-month3="{ data }">
            <div v-if="data.data.month3">
              <colorful-badge class="hover-underlined" :value="data.data.month3.status"
              :class="setUnderline(data.data.month3.imputedMonth) ?'current-underlined':''"
                @click="showDetailSelected(data.data.month3)" :year="data.data.month3.paymentYear"
                :month="data.data.month3.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(3)">[+]</div>
          </template>
          <DxColumn width="100px" caption="04" cell-template="imputed-month4" />
          <template #imputed-month4="{ data }">
            <div v-if="data.data.month4">
              <colorful-badge class="hover-underlined" :value="data.data.month4.status"
              :class="setUnderline(data.data.month4.imputedMonth) ?'current-underlined':''"
                @click="showDetailSelected(data.data.month4)" :year="data.data.month4.paymentYear"
                :month="data.data.month4.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(4)">[+]</div>
          </template>
          <DxColumn width="100px" caption="05" cell-template="imputed-month5" />
          <template #imputed-month5="{ data }">
            <div v-if="data.data.month5">
              <colorful-badge class="hover-underlined" :value="data.data.month5.status"
              :class="setUnderline(data.data.month5.imputedMonth) ?'current-underlined':''"
                @click="showDetailSelected(data.data.month5)" :year="data.data.month5.paymentYear"
                :month="data.data.month5.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(5)">[+]</div>
          </template>
          <DxColumn width="100px" caption="06" cell-template="imputed-month6" />
          <template #imputed-month6="{ data }">
            <div v-if="data.data.month6">
              <colorful-badge class="hover-underlined" :value="data.data.month6.status"
              :class="setUnderline(data.data.month6.imputedMonth) ?'current-underlined':''"
                @click="showDetailSelected(data.data.month6)" :year="data.data.month6.paymentYear"
                :month="data.data.month6.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(6)">[+]</div>
          </template>
          <DxColumn width="100px" caption="07" cell-template="imputed-month7" />
          <template #imputed-month7="{ data }">
            <div v-if="data.data.month7">
              <colorful-badge class="hover-underlined" :value="data.data.month7.status"
              :class="setUnderline(data.data.month7.imputedMonth) ?'current-underlined':''"
                @click="showDetailSelected(data.data.month7)" :year="data.data.month7.paymentYear"
                :month="data.data.month7.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(7)">[+]</div>
          </template>
          <DxColumn width="100px" caption="08" cell-template="imputed-month8" />
          <template #imputed-month8="{ data }">
            <div v-if="data.data.month8">
              <colorful-badge class="hover-underlined" :value="data.data.month8.status"
              :class="setUnderline(data.data.month8.imputedMonth) ?'current-underlined':''"
                @click="showDetailSelected(data.data.month8)" :year="data.data.month8.paymentYear"
                :month="data.data.month8.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(8)">[+]</div>
          </template>
          <DxColumn width="100px" caption="09" cell-template="imputed-month9" />
          <template #imputed-month9="{ data }">
            <div v-if="data.data.month9">
              <colorful-badge class="hover-underlined" :value="data.data.month9.status"
              :class="setUnderline(data.data.month9.imputedMonth) ?'current-underlined':''"
                @click="showDetailSelected(data.data.month9)" :year="data.data.month9.paymentYear"
                :month="data.data.month9.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(9)">[+]</div>
          </template>
          <DxColumn width="100px" caption="10" cell-template="imputed-month10" />
          <template #imputed-month10="{ data }">
            <div v-if="data.data.month10">
              <colorful-badge class="hover-underlined" :value="data.data.month10.status"
              :class="setUnderline(data.data.month10.imputedMonth) ?'current-underlined':''"
                @click="showDetailSelected(data.data.month10)" :year="data.data.month10.paymentYear"
                :month="data.data.month10.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(10)">[+]</div>
          </template>
          <DxColumn width="100px" caption="11" cell-template="imputed-month11" />
          <template #imputed-month11="{ data }">
            <div v-if="data.data.month11">
              <colorful-badge class="hover-underlined" :value="data.data.month11.status"
              :class="setUnderline(data.data.month11.imputedMonth) ?'current-underlined':''"
                @click="showDetailSelected(data.data.month11)" :year="data.data.month11.paymentYear"
                :month="data.data.month11.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(11)">[+]</div>
          </template>
          <DxColumn width="100px" caption="12" cell-template="imputed-month12" />
          <template #imputed-month12="{ data }">
            <div v-if="data.data.month12">
              <colorful-badge class="hover-underlined" :value="data.data.month12.status"
              :class="setUnderline(data.data.month12.imputedMonth) ?'current-underlined':''"
                @click="showDetailSelected(data.data.month12)" :year="data.data.month12.paymentYear"
                :month="data.data.month12.paymentMonth" />
            </div>
            <div v-else style="width: 100%;text-align: center;" @click="copyMonth(12)">[+]</div>
          </template>
          <DxMasterDetail class="table-detail" :enabled="true" template="row-detail" />
          <template #row-detail="{ }">
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
    <a-row style="border: 1px solid #d7d7d7; padding: 10px; margin-top: 10px;" justify="space-between">
      <a-col :span="5">
        <div style="display: flex;">
          <DxButton :text="'귀' + processKey.paymentYear + '-' + processKey.paymentMonth"
          :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
          <DxButton :text="'지' + processKey.paymentYear + '-' + processKey.paymentMonth"
            :style="{ color: 'white', backgroundColor: 'black' }" :height="'33px'" />
          <ProcessStatus v-model:valueStatus="status" @checkConfirm="statusComfirm" />
        </div>
      </a-col>
      <a-col :span="9">
        <div style="float: right;display: flex;">
          <SelectActionComponent :modalStatus="true" :dataRows="dataRows" @actionAddItem="actionAddItem = true"
          @loadingTableInfo="loadingTableInfo" />
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12" class="custom-layout">
        <a-spin :spinning="(loadingTaxPayInfo)" size="large">
          <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataTaxPayInfo"
            :show-borders="true" :allow-column-reordering="move_column" :focused-row-enabled="true"
            :allow-column-resizing="colomn_resize" :column-auto-width="true" key-expr="employeeId"
            :onRowClick="actionEditTaxPay" @selection-changed="selectionChanged" v-model:focused-row-key="focusedRowKey">
            <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
            <DxColumn width="200" caption="사원" cell-template="tag" />
            <template #tag="{ data }" class="custom-action">
              <div class="custom-action">
                <EmployeeInfoSettment :idEmployee="data.data.employee.employeeId" :name="data.data.employee.name"
                  :status="data.data.employee.status" :foreigner="data.data.employee.foreigner" :checkStatus="false"
                  :midTermSettlement="data.data.midTermSettlement" />
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
        <FormDataComponent :dataIncomeWage="dataIncomeWage" :actionAddItem="actionAddItem" :actionSaveItem="actionSaveItem" :actionUpdateItem="actionUpdateItem"  @createdDone="createdDone" @loadingTableInfo="loadingTableInfo" />
      </a-col>
      <CopyMonth :modalStatus="modalCopy" :data="dataModalCopy" :arrDataPoint="arrDataPoint"
        @closePopup="modalCopy = false" @loadingTableInfo="loadingTableInfo"
        @dataAddIncomeProcess="dataAddIncomeProcess" />
    </a-row>
  </div>
  
</div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from "vue"
import DxButton from "devextreme-vue/button"
import dayjs from 'dayjs';
import { useStore } from 'vuex'
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId } from "@/helpers/commonFunction"
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxSummary, DxTotalItem, DxMasterDetail } from "devextreme-vue/data-grid"
import SelectActionComponent from "./components/SelectActionComponent.vue"
import FormDataComponent from "./components/FormDataComponent2.vue"
import queries from "@/graphql/queries/PA/PA1/PA110/index"
import mutations from "@/graphql/mutations/PA/PA1/PA110/index"
import filters from "@/helpers/filters";
import notification from "@/utils/notification"
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import CopyMonth from "./components/Popup/CopyMonth.vue";
import EmployeeInfoSettment from "@/components/common/EmployeeInfoSettment.vue";
import { sampleDataIncomeWage } from "./utils/index"
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
    SelectActionComponent,
    ProcessStatus,
    FormDataComponent,
    CopyMonth,
    EmployeeInfoSettment
  },
  setup() {
    const store = useStore()
    const globalYear = computed(()=> store.state.settings.globalYear)
    const per_page = computed(() => store.state.settings.per_page)
    const move_column = computed(() => store.state.settings.move_column)
    const colomn_resize = computed(() => store.state.settings.colomn_resize)
    const processKey = computed(() => store.state.common.processKeyPA110)
    const monthClicked = computed(() => store.state.common.processKeyPA110.imputedMonth);
    const dataSource = ref<any>([])
    const dataCustomRes = ref<any>([])
    const dataTaxPayInfo = ref<any>([])
    const arrDataPoint = ref<any>([])
    const dataModalCopy = ref()
    const dataIncomeWage = ref({...sampleDataIncomeWage})
    const triggerIncomeWage = ref<boolean>(true)
    const actionAddItem = ref<boolean>(false)
    const modalCopy = ref<boolean>(false);
    const dataRows = ref([])
    const actionSaveItem= ref<number>(0)
    const actionUpdateItem = ref<number>(0)
    const focusedRowKey = ref<Number>(1);
    let status = ref()
    // call api getIncomeProcessWages for first table 
    const {
      refetch: refetchDataProcessIncomeWages,
      result: resIncomeProcessWages,
      loading: loadingIncomeProcessWages
    } = useQuery(queries.getIncomeProcessWages, {
      companyId: companyId,
      imputedYear: globalYear,
      imputedMonth: dayjs().month() + 1,
    }, () => ({
      fetchPolicy: "no-cache",
    }))
    // get data table detail getIncomeProcessWages
    watch(resIncomeProcessWages, (value) => {
      arrDataPoint.value = [];
      if (value) { 
        // set first row in table Income Process Wages
        dataSource.value = [{
          companyId: companyId,
        }]

        dataCustomRes.value = [
          { id: 1, name: "재직(퇴사)" },
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
        value.getIncomeProcessWages.forEach((data: any) => {
          // create data to copy
          arrDataPoint.value.push({
            imputedYear: data.imputedYear,
            imputedMonth: data.imputedMonth,
            paymentYear: data.paymentYear,
            paymentMonth: data.paymentMonth,
          })
          
          let dataAdd = {
            imputedYear: data.imputedYear,
            imputedMonth: data.imputedMonth,
            paymentYear: data.paymentYear,
            paymentMonth: data.paymentMonth,
          }
          dataSource.value[0]['month' + data.imputedMonth] = data
         // data table detail
          dataCustomRes.value[0]['month' + data.imputedMonth] = {
            value: `${[data.value].reduce((total, status) => (status != 0 ? total + 1 : total), 0).toLocaleString('en-US', { currency: 'VND' })} (${[data].reduce((total, status) => (status == 0 ? total + 1 : total), 0).toLocaleString('en-US', { currency: 'VND' })})`,
            ...dataAdd
          }
          dataCustomRes.value[1]['month' + data.imputedMonth] = {
            value: filters.formatCurrency(data.incomeStat?.withholdingIncomeTax),
            ...dataAdd
          }
          dataCustomRes.value[2]['month' + data.imputedMonth] = {
            value: filters.formatCurrency(data.incomeStat?.totalTaxPay),
            ...dataAdd
          }
          dataCustomRes.value[3]['month' + data.imputedMonth] = {
            value: filters.formatCurrency(data.incomeStat?.totalTaxfreePay),
            ...dataAdd
          }
          dataCustomRes.value[4]['month' + data.imputedMonth] = {

            value: filters.formatCurrency(data.incomeStat?.withholdingLocalIncomeTax),
            ...dataAdd
          }
          dataCustomRes.value[5]['month' + data.imputedMonth] = {
            value: 0,
            ...dataAdd
          }
          dataCustomRes.value[6]['month' + data.imputedMonth] = {
            value: filters.formatCurrency(data.incomeStat?.withholdingLocalIncomeTax),
            ...dataAdd
          }
          dataCustomRes.value[7]['month' + data.imputedMonth] = {
            value: filters.formatCurrency(data.incomeStat?.withholdingLocalIncomeTax),
            ...dataAdd
          }
          dataCustomRes.value[8]['month' + data.imputedMonth] = {
            value: filters.formatCurrency(data.incomeStat?.withholdingLocalIncomeTax),
            ...dataAdd
          }
          dataCustomRes.value[9]['month' + data.imputedMonth] = {
            value: filters.formatCurrency(data.incomeStat?.withholdingIncomeTax),
            ...dataAdd
          }
          dataCustomRes.value[10]['month' + data.imputedMonth] = {
            value: filters.formatCurrency(data.incomeStat?.withholdingLocalIncomeTax),
            ...dataAdd
          }
          dataCustomRes.value[11]['month' + data.imputedMonth] = {
            value: filters.formatCurrency(data.incomeStat?.totalDeduction),
            ...dataAdd
          }
          dataCustomRes.value[11]['month' + data.imputedMonth] = {
            value: filters.formatCurrency(data.incomeStat?.actualPayment),
            ...dataAdd
          }
          if (data.imputedMonth == (dayjs().month() + 1)) {
                status.value = data.status
                if(actionUpdateItem.value == 0){
                    store.state.common.processKeyPA110.imputedYear = data.imputedYear
                    store.state.common.processKeyPA110.imputedMonth = data.imputedMonth
                    store.state.common.processKeyPA110.paymentYear = data.paymentYear
                    store.state.common.processKeyPA110.paymentMonth = data.paymentMonth
                }          
              }
          
        });
      }
    }
    )

    // get getIncomeWages table
    const {
      refetch: refetchDataTaxPayInfo,
      result: resultTaxPayInfo,
      loading: loadingTaxPayInfo,
    } = useQuery(queries.getIncomeWages, {
      companyId: companyId,
      processKey: processKey,
    }, () => ({
      fetchPolicy: "no-cache",
    }))
    watch(resultTaxPayInfo, (value) => {
      if (actionUpdateItem.value == 0) {
        focusedRowKey.value = value.getIncomeWages[0]?.employeeId ?? 1;
        dataIncomeWage.value = value.getIncomeWages[0]
        actionAddItem.value = false
      }
      dataTaxPayInfo.value = value.getIncomeWages
    })

    /**
     * action edit employ tax pay
     */
    const actionEditTaxPay = (data: any) => {
      dataIncomeWage.value = data.data
      actionAddItem.value = false
    }
    const selectionChanged = (data: any) => {
      dataRows.value = data.selectedRowsData
    }
    // 
    /**
     *  Add new value
     *  Add one to change the props.
     *  When the prop changes, the action will be taken to add or update the data 
     *  */ 
    const onSubmit = (e: any) => {
      actionSaveItem.value++
    }
    /**
     *  Update value 
     */
    const updateData = (e: any) => {
      actionUpdateItem.value++
    }
    /**
     * show detail value of month
     * @param month 
     */
    const showDetailSelected = (month: any) => {
      status.value = month.status
      store.state.common.processKeyPA110.paymentYear = month.paymentYear
      store.state.common.processKeyPA110.paymentMonth = month.paymentMonth
      store.state.common.processKeyPA110.imputedMonth = month.imputedMonth
    }
    /**
     * copy data from other month
     * @param month 
     */
    const copyMonth = (month: number) => {
        dataModalCopy.value = month
        modalCopy.value = true
    }

    const loadingTableInfo = () => {
      refetchDataTaxPayInfo()
      refetchDataProcessIncomeWages()
    }

    /**
     * change income process wage status
     */
    const {
      mutate: actionChangeIncomeProcess,
      onError: errorChangeIncomeProcess,
      onDone: successChangeIncomeProcess,
    } = useMutation(mutations.changeIncomeProcessWageStatus)
    errorChangeIncomeProcess(e => {
      notification('error', e.message)
    })
    successChangeIncomeProcess(e => {
      notification('success', `업데이트 완료!`)
      refetchDataProcessIncomeWages()
    })

    /**
     * change income process wage status
     */
    const statusComfirm = () => {
      actionChangeIncomeProcess({
        companyId: companyId,
        processKey: {
        imputedYear: globalYear.value,
        imputedMonth: dayjs().month() + 1,
        paymentYear: globalYear.value,
        paymentMonth: dayjs().month() + 1,
        },
        status: status.value
      })
    }

    const dataAddIncomeProcess = (data: any) => {
      dataSource.value[0]['month' + data.imputedMonth] = data
      dataSource.value[0]['month' + data.imputedMonth].status = 10

    }
    /**
     * underlined set of selected month
     * @param monthInputed 
     */
    const setUnderline = (monthInputed : any)=>{
        return monthClicked.value == monthInputed
    }

    const createdDone = () => {
      refetchDataTaxPayInfo()
    }
    return {
      globalYear,
      per_page,
      move_column,
      colomn_resize,
      processKey,
      onSubmit,
      updateData,
      dataSource,
      dataCustomRes,
      showDetailSelected,
      actionAddItem,
      loadingIncomeProcessWages,
      copyMonth,
      loadingTaxPayInfo,
      dataTaxPayInfo,
      dataModalCopy,
      modalCopy,
      actionEditTaxPay,
      selectionChanged,
      dataIncomeWage,
      loadingTableInfo,
      dataRows,
      statusComfirm,
      actionSaveItem,
      actionUpdateItem,
      arrDataPoint,
      dataAddIncomeProcess,
      status,
      setUnderline,
      createdDone,
      focusedRowKey,
    }

  },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
