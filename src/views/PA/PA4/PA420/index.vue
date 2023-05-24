<template>
  <action-header title="퇴직소득자료입력" @actionSave="saving" :buttonSave="true"/>
  <div id="pa-420">
    <div class="page-content">
      <a-row>
        <a-col :span="24" class="mt-10">
          <a-spin :spinning="loadingGetIncomeProcessBusinesses" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                        :show-borders="true" key-expr="companyId" :allow-column-reordering="move_column"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true"
                        :focused-row-enabled="true">
              <DxScrolling mode="standard" show-scrollbar="always"/>
              <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string"/>
              <template #col-first="{}">
                <b>지급연월</b>
              </template>
              <DxColumn caption="01" width="100px" cell-template="month-1" alignment="center"
                        :cssClass="selectMonthColumn.imputedMonth == 1 ? 'column-focus': ''"/>
              <template #month-1="{ data }">
                <div class="hover-underlined" v-if="data.data.month1"
                     @click="showDetailSelected(data.data.month1.imputedMonth, data.data.month1.imputedYear, data.data.month1.paymentYear, data.data.month1.paymentMonth,data.data.month1.status)">
                  <colorful-badge :value="data.data.month1.status"
                                  :year="data.data.month1.paymentYear" :month="data.data.month1.paymentMonth"
                                  :isUnder="selectMonthColumn.imputedMonth == 1"
                  />
                </div>
                <div v-else :class="!disableAddMonth(1) ? `add-month` : `add-month disabled`" @click="!disableAddMonth(1) && addMonth(1)"> [+]</div>
              </template>
              <DxColumn caption="02" width="100px" cell-template="month-2" alignment="center"
                        :cssClass="selectMonthColumn.imputedMonth == 2 ? 'column-focus': ''"/>
              <template #month-2="{ data }">
                <div class="hover-underlined" v-if="data.data.month2"
                     @click="showDetailSelected(data.data.month2.imputedMonth, data.data.month2.imputedYear, data.data.month2.paymentYear, data.data.month2.paymentMonth,data.data.month2.status)">
                  <colorful-badge :value="data.data.month2.status"
                                  :year="data.data.month2.paymentYear" :month="data.data.month2.paymentMonth"
                                  :isUnder="selectMonthColumn.imputedMonth == 2"
                  />
                </div>
                <div v-else :class="!disableAddMonth(2) ? `add-month` : `add-month disabled`" @click="!disableAddMonth(2) && addMonth(2)">[+]</div>
              </template>
              <DxColumn caption="03" width="100px" cell-template="month-3" alignment="center"
                        :cssClass="selectMonthColumn.imputedMonth == 3 ? 'column-focus': ''"/>
              <template #month-3="{ data }">
                <div class="hover-underlined" v-if="data.data.month3"
                     @click="showDetailSelected(data.data.month3.imputedMonth, data.data.month3.imputedYear, data.data.month3.paymentYear, data.data.month3.paymentMonth,data.data.month3.status)">
                  <colorful-badge :value="data.data.month3.status"
                                  :year="data.data.month3.paymentYear" :month="data.data.month3.paymentMonth"
                                  :isUnder="selectMonthColumn.imputedMonth == 3"
                  />
                </div>
                <div v-else :class="!disableAddMonth(3) ? `add-month` : `add-month disabled`" @click="!disableAddMonth(3) && addMonth(3)">[+]</div>
              </template>
              <DxColumn caption="04" width="100px" cell-template="month-4" alignment="center"
                        :cssClass="selectMonthColumn.imputedMonth == 4 ? 'column-focus': ''"/>
              <template #month-4="{ data }">
                <div class="hover-underlined" v-if="data.data.month4"
                     @click="showDetailSelected(data.data.month4.imputedMonth, data.data.month4.imputedYear, data.data.month4.paymentYear, data.data.month4.paymentMonth,data.data.month4.status)">
                  <colorful-badge :value="data.data.month4.status"
                                  :year="data.data.month4.paymentYear" :month="data.data.month4.paymentMonth"
                                  :isUnder="selectMonthColumn.imputedMonth == 4"
                  />
                </div>
                <div v-else :class="!disableAddMonth(4) ? `add-month` : `add-month disabled`" @click="!disableAddMonth(4) && addMonth(4)">[+]</div>
              </template>
              <DxColumn caption="05" width="100px" cell-template="month-5" alignment="center"
                        :cssClass="selectMonthColumn.imputedMonth == 5 ? 'column-focus': ''"/>
              <template #month-5="{ data }">
                <div class="hover-underlined" v-if="data.data.month5"
                     @click="showDetailSelected(data.data.month5.imputedMonth, data.data.month5.imputedYear, data.data.month5.paymentYear, data.data.month5.paymentMonth,data.data.month5.status)">
                  <colorful-badge :value="data.data.month5.status"
                                  :year="data.data.month5.paymentYear" :month="data.data.month5.paymentMonth"
                                  :isUnder="selectMonthColumn.imputedMonth == 5"
                  />
                </div>
                <div v-else :class="!disableAddMonth(5) ? `add-month` : `add-month disabled`" @click="!disableAddMonth(5) && addMonth(5)">[+]</div>
              </template>
              <DxColumn caption="06" width="100px" cell-template="month-6" alignment="center"
                        :cssClass="selectMonthColumn.imputedMonth == 6 ? 'column-focus': ''"/>
              <template #month-6="{ data }">
                <div class="hover-underlined" :class="{}" v-if="data.data.month6"
                     @click="showDetailSelected(data.data.month6.imputedMonth, data.data.month6.imputedYear, data.data.month6.paymentYear, data.data.month6.paymentMonth,data.data.month6.status)">
                  <colorful-badge :value="data.data.month6.status"
                                  :year="data.data.month6.paymentYear" :month="data.data.month6.paymentMonth"
                                  :isUnder="selectMonthColumn.imputedMonth == 6"
                  />
                </div>
                <div v-else :class="!disableAddMonth(6) ? `add-month` : `add-month disabled`" @click="!disableAddMonth(6) && addMonth(6)">[+]</div>
              </template>
              <DxColumn caption="07" width="100px" cell-template="month-7" alignment="center"
                        :cssClass="selectMonthColumn.imputedMonth == 7 ? 'column-focus': ''"/>
              <template #month-7="{ data }">
                <div class="hover-underlined" v-if="data.data.month7"
                     @click="showDetailSelected(data.data.month7.imputedMonth, data.data.month7.imputedYear, data.data.month7.paymentYear, data.data.month7.paymentMonth,data.data.month7.status)">
                  <colorful-badge :value="data.data.month7.status"
                                  :year="data.data.month7.paymentYear" :month="data.data.month7.paymentMonth"
                                  :isUnder="selectMonthColumn.imputedMonth == 7"
                  />
                </div>
                <div v-else :class="!disableAddMonth(7) ? `add-month` : `add-month disabled`" @click="!disableAddMonth(7) && addMonth(7)">[+]</div>
              </template>
              <DxColumn caption="08" width="100px" cell-template="month-8" alignment="center"
                        :cssClass="selectMonthColumn.imputedMonth == 8 ? 'column-focus': ''"/>
              <template #month-8="{ data }">
                <div class="hover-underlined" v-if="data.data.month8"
                     @click="showDetailSelected(data.data.month8.imputedMonth, data.data.month8.imputedYear, data.data.month8.paymentYear, data.data.month8.paymentMonth,data.data.month8.status)">
                  <colorful-badge :value="data.data.month8.status"
                                  :year="data.data.month8.paymentYear" :month="data.data.month8.paymentMonth"
                                  :isUnder="selectMonthColumn.imputedMonth == 8"
                  />
                </div>
                <div v-else :class="!disableAddMonth(8) ? `add-month` : `add-month disabled`" @click="!disableAddMonth(8) && addMonth(8)">[+]</div>
              </template>
              <DxColumn caption="09" width="100px" cell-template="month-9" alignment="center"
                        :cssClass="selectMonthColumn.imputedMonth == 9 ? 'column-focus': ''"/>
              <template #month-9="{ data }">
                <div class="hover-underlined" v-if="data.data.month9"
                     @click="showDetailSelected(data.data.month9.imputedMonth, data.data.month9.imputedYear, data.data.month9.paymentYear, data.data.month9.paymentMonth,data.data.month9.status)">
                  <colorful-badge :value="data.data.month9.status"
                                  :year="data.data.month9.paymentYear" :month="data.data.month9.paymentMonth"
                                  :isUnder="selectMonthColumn.imputedMonth == 9"
                  />
                </div>
                <div v-else :class="!disableAddMonth(9) ? `add-month` : `add-month disabled`" @click="!disableAddMonth(9) && addMonth(9)">[+]</div>
              </template>
              <DxColumn caption="10" width="100px" cell-template="month-10"
                        :cssClass="selectMonthColumn.imputedMonth == 10 ? 'column-focus': ''"/>
              <template #month-10="{ data }">
                <div class="hover-underlined" v-if="data.data.month10" alignment="center"
                     @click="showDetailSelected(data.data.month10.imputedMonth, data.data.month10.imputedYear, data.data.month10.paymentYear, data.data.month10.paymentMonth,data.data.month10.status)">
                  <colorful-badge :value="data.data.month10.status"
                                  :year="data.data.month10.paymentYear" :month="data.data.month10.paymentMonth"
                                  :isUnder="selectMonthColumn.imputedMonth == 10"
                  />
                </div>
                <div v-else :class="!disableAddMonth(10) ? `add-month` : `add-month disabled`" @click="!disableAddMonth(10) && addMonth(10)">[+]</div>
              </template>
              <DxColumn caption="11" width="100px" cell-template="month-11" alignment="center"
                        :cssClass="selectMonthColumn.imputedMonth == 11 ? 'column-focus': ''"/>
              <template #month-11="{ data }">
                <div class="hover-underlined" v-if="data.data.month11"
                     @click="showDetailSelected(data.data.month11.imputedMonth, data.data.month11.imputedYear, data.data.month11.paymentYear, data.data.month11.paymentMonth,data.data.month11.status)">
                  <colorful-badge :value="data.data.month11.status"
                                  :year="data.data.month11.paymentYear" :month="data.data.month11.paymentMonth"
                                  :isUnder="selectMonthColumn.imputedMonth == 11"
                  />
                </div>
                <div v-else :class="!disableAddMonth(11) ? `add-month` : `add-month disabled`" @click="!disableAddMonth(11) && addMonth(11)">[+]</div>
              </template>
              <DxColumn caption="12" width="100px" cell-template="month-12" alignment="center"
                        :cssClass="selectMonthColumn.imputedMonth == 12 ? 'column-focus': ''"/>
              <template #month-12="{ data }">
                <div class="hover-underlined" v-if="data.data.month12"
                     @click="showDetailSelected(data.data.month12.imputedMonth, data.data.month12.imputedYear, data.data.month12.paymentYear, data.data.month12.paymentMonth,data.data.month12.status)">
                  <colorful-badge :value="data.data.month12.status"
                                  :year="data.data.month12.paymentYear" :month="data.data.month12.paymentMonth"
                                  :isUnder="selectMonthColumn.imputedMonth == 12"
                  />
                </div>
                <div v-else :class="!disableAddMonth(12) ? `add-month` : `add-month disabled`" @click="!disableAddMonth(12) && addMonth(12)">[+]</div>
              </template>
              <DxMasterDetail class="table-detail" :enabled="true" template="detailRow"/>
              <template #detailRow="{}">
                <DxDataGrid key-expr="id" :data-source="dataCustomRes" :show-borders="false"
                            :column-auto-width="true" :allow-column-reordering="move_column"
                            :show-column-headers="false" :allow-column-resizing="colomn_resize"
                            :focused-row-enabled="true">
                  <DxScrolling mode="standard" show-scrollbar="always"/>
                  <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first"
                            data-type="string"/>
                  <template #col-first="{ data }">
                    <b>{{ data.data.name }}</b><br>
                  </template>
                  <DxColumn caption="1" width="100px" cell-template="month-1" alignment="right"
                            :cssClass="selectMonthColumn.imputedMonth == 1 ? 'column-focus': ''"/>
                  <template #month-1="{ data }">
                    <div class="hover-underlined"
                         @click="showDetailSelected(data.data.month1.imputedMonth, data.data.month1.imputedYear, data.data.month1.paymentYear, data.data.month1.paymentMonth,data.data.month1.status)"
                         v-if="data.data.month1"> {{ data.data.month1.value }}
                    </div>
                  </template>
                  <DxColumn caption="2" width="100px" cell-template="month-2" alignment="right"
                            :cssClass="selectMonthColumn.imputedMonth == 2 ? 'column-focus': ''"/>
                  <template #month-2="{ data }">
                    <div class="hover-underlined"
                         @click="showDetailSelected(data.data.month2.imputedMonth, data.data.month2.imputedYear, data.data.month2.paymentYear, data.data.month2.paymentMonth,data.data.month2.status)"
                         v-if="(data.data.month2)"> {{ data.data.month2.value }}
                    </div>
                  </template>
                  <DxColumn caption="3" width="100px" cell-template="month-3" alignment="right"
                            :cssClass="selectMonthColumn.imputedMonth == 3 ? 'column-focus': ''"/>
                  <template #month-3="{ data }">
                    <div class="hover-underlined"
                         @click="showDetailSelected(data.data.month3.imputedMonth, data.data.month3.imputedYear, data.data.month3.paymentYear, data.data.month3.paymentMonth,data.data.month3.status)"
                         v-if="(data.data.month3)"> {{ data.data.month3.value }}
                    </div>
                  </template>
                  <DxColumn caption="4" width="100px" cell-template="month-4" alignment="right"
                            :cssClass="selectMonthColumn.imputedMonth == 4 ? 'column-focus': ''"/>
                  <template #month-4="{ data }">
                    <div class="hover-underlined"
                         @click="showDetailSelected(data.data.month4.imputedMonth, data.data.month4.imputedYear, data.data.month4.paymentYear, data.data.month4.paymentMonth,data.data.month4.status)"
                         v-if="(data.data.month4)"> {{ data.data.month4.value }}
                    </div>
                  </template>
                  <DxColumn caption="5" width="100px" cell-template="month-5" alignment="right"
                            :cssClass="selectMonthColumn.imputedMonth == 5 ? 'column-focus': ''"/>
                  <template #month-5="{ data }">
                    <div class="hover-underlined"
                         @click="showDetailSelected(data.data.month5.imputedMonth, data.data.month5.imputedYear, data.data.month5.paymentYear, data.data.month5.paymentMonth,data.data.month5.status)"
                         v-if="(data.data.month5)"> {{ data.data.month5.value }}
                    </div>
                  </template>
                  <DxColumn caption="6" width="100px" cell-template="month-6" alignment="right"
                            :cssClass="selectMonthColumn.imputedMonth == 6 ? 'column-focus': ''"/>
                  <template #month-6="{ data }">
                    <div class="hover-underlined"
                         @click="showDetailSelected(data.data.month6.imputedMonth, data.data.month6.imputedYear, data.data.month6.paymentYear, data.data.month6.paymentMonth,data.data.month6.status)"
                         v-if="(data.data.month6)"> {{ data.data.month6.value }}
                    </div>
                  </template>
                  <DxColumn caption="7" width="100px" cell-template="month-7" alignment="right"
                            :cssClass="selectMonthColumn.imputedMonth == 7 ? 'column-focus': ''"/>
                  <template #month-7="{ data }">
                    <div class="hover-underlined"
                         @click="showDetailSelected(data.data.month7.imputedMonth, data.data.month7.imputedYear, data.data.month7.paymentYear, data.data.month7.paymentMonth,data.data.month7.status)"
                         v-if="(data.data.month7)"> {{ data.data.month7.value }}
                    </div>
                  </template>
                  <DxColumn caption="8" width="100px" cell-template="month-8" alignment="right"
                            :cssClass="selectMonthColumn.imputedMonth == 8 ? 'column-focus': ''"/>
                  <template #month-8="{ data }">
                    <div class="hover-underlined"
                         @click="showDetailSelected(data.data.month8.imputedMonth, data.data.month8.imputedYear, data.data.month8.paymentYear, data.data.month8.paymentMonth,data.data.month8.status)"
                         v-if="(data.data.month8)"> {{ data.data.month8.value }}
                    </div>
                  </template>
                  <DxColumn caption="9" width="100px" cell-template="month-9" alignment="right"
                            :cssClass="selectMonthColumn.imputedMonth == 9 ? 'column-focus': ''"/>
                  <template #month-9="{ data }">
                    <div class="hover-underlined"
                         @click="showDetailSelected(data.data.month9.imputedMonth, data.data.month9.imputedYear, data.data.month9.paymentYear, data.data.month9.paymentMonth,data.data.month9.status)"
                         v-if="(data.data.month9)"> {{ data.data.month9.value }}
                    </div>
                  </template>
                  <DxColumn caption="10" width="100px" cell-template="month-10" alignment="right"
                            :cssClass="selectMonthColumn.imputedMonth == 10 ? 'column-focus': ''"/>
                  <template #month-10="{ data }">
                    <div class="hover-underlined"
                         @click="showDetailSelected(data.data.month10.imputedMonth, data.data.month10.imputedYear, data.data.month10.paymentYear, data.data.month10.paymentMonth,data.data.month10.status)"
                         v-if="data.data.month10">
                      {{ data.data.month10.value }}
                    </div>
                  </template>
                  <DxColumn caption="11" width="100px" cell-template="month-11" alignment="right"
                            :cssClass="selectMonthColumn.imputedMonth == 11 ? 'column-focus': ''"/>
                  <template #month-11="{ data }">
                    <div class="hover-underlined"
                         @click="showDetailSelected(data.data.month11.imputedMonth, data.data.month11.imputedYear, data.data.month11.paymentYear, data.data.month11.paymentMonth,data.data.month11.status)"
                         v-if="(data.data.month11)">
                      {{ data.data.month11.value }}
                    </div>
                  </template>
                  <DxColumn caption="12" width="100px" cell-template="month-12" alignment="right"
                            :cssClass="selectMonthColumn.imputedMonth == 12 ? 'column-focus': ''"/>
                  <template #month-12="{ data }">
                    <div class="hover-underlined"
                         @click="showDetailSelected(data.data.month12.imputedMonth, data.data.month12.imputedYear, data.data.month12.paymentYear, data.data.month12.paymentMonth,data.data.month12.status)"
                         v-if="(data.data.month12)">
                      {{ data.data.month12.value }}
                    </div>
                  </template>
                </DxDataGrid>
              </template>
            </DxDataGrid>
          </a-spin>
        </a-col>
        <ComponentDetail :statusButton="statusButton"
                         :actionSave="actionSave" @createdDone="createdDone"/>
        <CopyMonth :modalStatus="modalCopy" @closePopup="actionCopySuccess"
                   :processKey="selectMonthColumn" :data="dataModalCopy"
                   @dataAddIncomeProcess="dataAddIncomeProcess"/>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, reactive, ref, watch} from "vue";
import {useStore} from 'vuex';
import {useQuery} from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import {DxColumn, DxDataGrid, DxMasterDetail, DxScrolling} from "devextreme-vue/data-grid";
import {dataAddTableBigUtils, origindata} from "./utils";
import {companyId, startYearMonth} from "@/helpers/commonFunction";
import dayjs from 'dayjs';
import filters from "@/helpers/filters";
import ComponentDetail from "./components/ComponentDetail.vue";
import CopyMonth from "./components/CopyMonth.vue";

const retirementStatus = computed(() => store.getters['common/getRetirementStatus']);
let statusButton = ref(0)
let actionSave = ref(0)
let dataSource: any = ref([]);
const store = useStore();
const globalYear = computed(() => parseInt(sessionStorage.getItem("paYear") ?? '0'))
const per_page = computed(() => store.state.settings.per_page);
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);
const rowTable = ref(0);
const originData = reactive({...origindata, rows: per_page});
const trigger = ref<boolean>(true);
const modalCopy = ref<boolean>(false);
const dataModalCopy: any = ref()
// const selectMonthColumn = computed(() => store.state.common.monthSelectedPA420);
const selectMonthColumn = computed(() => store.getters['common/getSelectMonthColumn'])
const paymentDate = computed(() => store.getters['common/getPaymentDay'])
let dataCustomRes: any = ref([])
// const showMonth = (month: number) => (month > 3 && globalYear.value > 2022) || globalYear.value > 2023
// ================GRAPQL==============================================

// API QUERY TABLE BIG
const {
  refetch: refetchData,
  loading: loadingGetIncomeProcessBusinesses,
  onError: errorGetIncomeProcessBusinesses,
  onResult: resIncomeProcessBusinesses
} = useQuery(queries.getIncomeProcessRetirements, {
  companyId: companyId,
  imputedYear: globalYear,
  // imputedMonth: dayjs().month(),
}, () => ({
  //enabled: trigger.value,
  fetchPolicy: "no-cache",
}));
resIncomeProcessBusinesses(res => {
  //set status to 10 if data is empty, status will default to 10
  let respon = res.data.getIncomeProcessRetirements
  dataSource.value = [{
    companyId: companyId,
  }]
  dataCustomRes.value = JSON.parse(JSON.stringify(dataAddTableBigUtils))
  if (respon.length > 0) {
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
          value: filters.formatCurrency(val.employeeStat?.employeeCount) + " (" + filters.formatCurrency(val.employeeStat?.retireEmployeeCount) + ")",
          ...dataAdd
        }
      dataCustomRes.value[1]['month' + val.imputedMonth] =
        {
          value: filters.formatCurrency(val.incomeStat?.retirementBenefits),
          ...dataAdd
        }
      dataCustomRes.value[2]['month' + val.imputedMonth] = {
        value: filters.formatCurrency(val.incomeStat?.nonTaxableRetirementBenefits),
        ...dataAdd
      }
      dataCustomRes.value[3]['month' + val.imputedMonth] = {
        value: filters.formatCurrency(val.incomeStat?.taxableRetirementBenefits),
        ...dataAdd
      }
      dataCustomRes.value[4]['month' + val.imputedMonth] = {
        value: filters.formatCurrency(val.incomeStat?.withholdingIncomeTax),
        ...dataAdd
      }
      dataCustomRes.value[5]['month' + val.imputedMonth] = {
        value: filters.formatCurrency(val.incomeStat?.withholdingLocalIncomeTax),
        ...dataAdd
      }
      dataCustomRes.value[6]['month' + val.imputedMonth] = {
        value: filters.formatCurrency(val.incomeStat?.withholdingIncomeTax + val.incomeStat?.withholdingLocalIncomeTax),
        ...dataAdd
      }
      dataCustomRes.value[7]['month' + val.imputedMonth] = {
        value: filters.formatCurrency(val.incomeStat?.retirementBenefits - val.incomeStat?.withholdingIncomeTax - val.incomeStat?.withholdingLocalIncomeTax),
        ...dataAdd
      }
      if (val.imputedMonth == dayjs().month() + 1 && selectMonthColumn.value.imputedMonth === dayjs().month() + 1) {
        store.commit('common/setSelectMonthColumn', {
          imputedMonth: val.imputedMonth,
          imputedYear: val.imputedYear,
          paymentYear: val.paymentYear,
          paymentMonth: val.paymentMonth,
        })
        //If there is data, then assign the status with the status of the month in focus
        statusButton.value = val.status
        store.commit('common/setRetirementStatus', val.status)
        statusButton.value = val.status
      }

    })
    store.commit('common/sethasIncProcRetirements', true)
  } else { //If the data is empty, set the value datetime as 0
    store.commit('common/sethasIncProcRetirements', false)
  }
})
errorGetIncomeProcessBusinesses(res => {
  notification('error', res.message)
})
// ================FUNCTION============================================
const showDetailSelected = (imputedMonth: any, imputedYear: any, paymentYear: any, paymentMonth: any, status: any) => {
  //assign status with the status of the selected month
  statusButton.value = status
  store.commit('common/setRetirementStatus', status)
  store.commit('common/setSelectMonthColumn', {
    imputedMonth: imputedMonth,
    imputedYear: imputedYear,
    paymentYear: paymentYear,
    paymentMonth: paymentMonth,
  })
}
// watch year
watch(globalYear, (val) => {
  store.commit('common/setSelectMonthColumn', {
    imputedMonth: selectMonthColumn.value.imputedMonth,
    imputedYear: val,
    paymentYear: val,
    paymentMonth: selectMonthColumn.value.paymentMonth,
  })
})
const saving = () => {
  actionSave.value++;
}
const createdDone = () => {
  trigger.value = true
  refetchData()
}
const addMonth = (month: number) => {
  store.commit('common/setSelectMonthColumnOld', {
    imputedMonth: month,
    imputedYear: globalYear.value,
    paymentYear: globalYear.value,
    paymentMonth: month,
  })
  dataModalCopy.value = month
  modalCopy.value = true
}
const dataAddIncomeProcess = (data: any) => {
  dataSource.value[0]['month' + data.imputedMonth] = data
  dataSource.value[0]['month' + data.imputedMonth].status = 10
  statusButton.value = 10
  store.commit('common/setRetirementStatus', 10)
}
const actionCopySuccess = () => {
  modalCopy.value = false
}
const disableAddMonth = (val: any) => {
      let date = dayjs(globalYear.value + '' + val);
      let dateToCompare = dayjs(`${startYearMonth}`, 'YYYYMM')
      if (date.isBefore(dateToCompare)) {
        return true;
      }
      return false;
    }
</script>
<style scoped lang="scss" src="./style/style.scss">

</style>
