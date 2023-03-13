<template>
  <action-header @actionSearch="searching" />
  <div id="bf-610">
      <div class="search-form">
          <a-row :gutter="[24, 8]">
              <a-col>
                  <!-- <a-form-item label="귀속연월" label-align="left" class="clr mb-0 label-select">
                      <imputed-year-month-select-box :dataSelect="arraySelectBox" width="150px" :required="true"
                          v-model:valueInput="dataSearch.filter.imputedYearMonth" type="1" />
                  </a-form-item> -->
                  <a-form-item label="지급연월" label-align="left" class="clr mb-0 label-select">
                      <imputed-year-month-select-box :dataSelect="arraySelectBox2" width="150px" :required="true"
                          v-model:valueInput="searchMonth" type="2" />
                  </a-form-item>
                  <!-- <a-form-item label="" label-align="left" class="clr mb-0 label-select">
                  </a-form-item> -->
              </a-col>
              <a-col>
                  <a-form-item label="신고주기" label-align="left" class="mb-0">
                      <div class="d-flex-center">
                        <checkbox-basic label="매월" v-model:valueCheckbox="reportType.oneMonth" />
                        <checkbox-basic label="반기" v-model:valueCheckbox="reportType.sixMonth" />
                      </div>
                  </a-form-item>
                  <a-form-item label="신고구분" label-align="left" class="mb-0">
                      <div class=" d-flex-center">
                        <checkbox-basic label="정기" v-model:valueCheckbox="classificationOfReport.routine" />
                        <checkbox-basic label="수정" v-model:valueCheckbox="classificationOfReport.correction" />
                        <checkbox-basic label="기한후" v-model:valueCheckbox="classificationOfReport.afterTheDueDate" />
                      </div>
                  </a-form-item>
              </a-col>
              <a-col>
                <div class="d-flex">
                  <div style="margin-right: 10px;">
                    <a-tooltip placement="top" color="black">
                      <template #title>원천징수이행상황신고서</template>
                      <div>마감상태 :</div>
                    </a-tooltip>
                  </div>
                  <div class="closing-wrapper">
                    <checkbox-basic label="입력중" class="mr-10 custom-checkbox1"
                                    v-model:valueCheckbox="statuses.checkbox1" />
                    <checkbox-basic label="입력마감" class="mr-10 custom-checkbox2"
                                    v-model:valueCheckbox="statuses.checkbox2" />
                    <checkbox-basic label="조정중" class="mr-10 custom-checkbox3"
                                    v-model:valueCheckbox="statuses.checkbox3" />
                    <checkbox-basic label="조정마감" class="mr-10 custom-checkbox4"
                                    v-model:valueCheckbox="statuses.checkbox4" />
                  </div>
                </div>
              </a-col>
              <a-col>
                  <a-form-item label="사업자코드" label-align="left" class="mb-0 label-select">
                      <default-text-box width="150px" v-model:valueInput="filter.companyCode" />
                  </a-form-item>
                  <a-form-item label="상호" label-align="left" class="mb-0 label-select">
                      <default-text-box width="150px" v-model:valueInput="filter.companyName" />
                  </a-form-item>
              </a-col>
              <a-col>
                  <a-form-item label="매니저리스트" label-align="left" class="mb-0 label-select">
                      <!-- <list-manager-dropdown v-model:valueInput="filter.manageUserId" width="150px" /> -->
                      <select-box-common 
                        :arrSelect="managerCompactUserList"
                        v-model:valueInput="filter.manageCompactUserId"
                        displayeExpr="name" valueExpr="id" width="150px" />
                  </a-form-item>
                  <a-form-item label="영업자명" label-align="left" class="mb-0 label-select">
                      <!-- <list-sales-dropdown v-model:valueInput="filter.salesRepresentativeId"
                          width="150px" /> -->
                      <select-box-common 
                        :arrSelect="managerSalesRepresentative"
                        v-model:valueInput="filter.compactSalesRepresentativeId"
                        displayeExpr="name" valueExpr="id" width="150px" />
                  </a-form-item>
              </a-col>
              <a-col>
                  <switch-basic textCheck="해지제외" textUnCheck="해지포함"
                      v-model:valueSwitch="filter.excludeCancel" />
              </a-col>
          </a-row>
      </div>
      <div class="page-content">
          <a-spin :spinning="loadingTable" size="large">
              <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                :show-borders="true" key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true">
                  <DxScrolling mode="standard" show-scrollbar="always" />
                  <DxSelection mode="multiple" :fixed="true" />
                  <DxColumn caption="출력 메일" cell-template="action" />
                  <template #action="{ data }">
                    <a-tooltip>
                      <template #title>출력 / 저장</template>
                      <img src="@/assets/images/print.svg" alt="" style="width: 25px;"
                           @click="actionPrint(data.data)">
                    </a-tooltip>

                      <img src="@/assets/images/email.svg" alt="" style="width: 25px;"
                          @click="actionSendEmail(data.data)" />
                  </template>
                  <DxColumn caption="사업자코드" data-field="company.code" />
                  <DxColumn caption="상호 주소" cell-template="company" width="100" />
                  <template #company="{ data }">
                      <a-tooltip color="black" placement="topLeft">
                          <template #title>{{ data.data.company.name + " " + data.data.company.address }}</template>
                          {{ data.data.company.name + " " + data.data.company.address }}
                      </a-tooltip>
                  </template>
                  <DxColumn caption="마감 현황" cell-template="status" width="140" />
                  <template #status="{ data }">
                      <div class="d-flex-center">
                          <!-- <process-status-tooltip v-model:valueStatus="data.data.status" style="width: 100px;"
                              :dataRow="data.data" @dataRow="changeStatus" /> -->
                          <process-status v-model:valueStatus="data.data.status" :dataRow="data.data"
                              @checkConfirmRowTable="changeStatusRowTable" />
                          <div class="pl-5 pr-5">
                              <a-tooltip color="black" placement="topLeft">
                                  <template #title>소득별 마감현황</template>
                                  <plus-outlined @click="openModalStatus(data.data)" />
                              </a-tooltip>
                          </div>
                      </div>
                  </template>
                  <DxColumn caption="귀속연월" cell-template="imputed" />
                  <template #imputed="{ data }">
                    <div class="tag-custom-1">
                      {{ data.data.imputedYear }}-{{
                          data.data.imputedMonth < 10 ? '0' + data.data.imputedMonth : data.data.imputedMonth
                      }}
                    </div>
                  </template>
                  <DxColumn caption="지급연월" cell-template="payment" />
                  <template #payment="{ data }">
                    <div class="tag-custom-2">
                      {{ data.data.paymentYear }}-{{
                          data.data.paymentMonth < 10 ? '0' + data.data.paymentMonth : data.data.paymentMonth
                      }}
                    </div>
                  </template>
                  <DxColumn caption="신고 주기" cell-template="reportType" />
                  <template #reportType="{ data }">
                      <div :class="data.data.reportType == 6 ? 'tag-custom-1' : 'tag-custom-2'">
                          {{ data.data.reportType == 6 ? '반기' : '매월' }}
                      </div>
                  </template>
                  <DxColumn caption="신고 종류" cell-template="afterDeadline" />
                  <template #afterDeadline="{ data }">
                      <div
                          :class="data.data.index == 0 && data.data.afterDeadline == true ? 'tag-custom-2' : (data.data.index == 0 && data.data.afterDeadline == false ? 'tag-custom-4' : 'tag-custom-3')">
                          {{
                              data.data.index == 0 && data.data.afterDeadline == true ? '기한후' : data.data.index == 0 &&
                                  data.data.afterDeadline == false ? '정기' : '수정 ' + data.data.index
                          }}
                      </div>
                  </template>
                  <DxColumn caption="연말" cell-template="yearEndTaxAdjustment" css-class="cell-center"/>
                  <template #yearEndTaxAdjustment="{ data }">
                      <div class="showO">{{ data.data.yearEndTaxAdjustment == false ? '' : 'ㅇ' }}</div>
                  </template>
                  <DxColumn caption="환급" cell-template="refund" css-class="cell-center"/>
                  <template #refund="{ data }">
                      <div class="showO">{{ data.data.refund == false ? '' : 'ㅇ' }}</div>
                  </template>
                  <DxColumn caption="근로 간이" cell-template="wageIncomeSimplified" css-class="cell-center"/>
                  <template #wageIncomeSimplified="{ data }">
                      <div class="showO">{{ data.data.wageIncomeSimplified == 0 ? '' : 'ㅇ' }}</div>
                  </template>
                  <DxColumn caption="근로 중도" cell-template="yearEndAdjustmentRetirement" css-class="cell-center"/>
                  <template #yearEndAdjustmentRetirement="{ data }">
                      <div class="showO">{{ data.data.yearEndAdjustmentRetirement == 0 ? '' : 'ㅇ' }}</div>
                  </template>
                  <DxColumn caption="근로 일용" cell-template="dailyWageIncome" css-class="cell-center"/>
                  <template #dailyWageIncome="{ data }">
                      <div class="showO">{{ data.data.dailyWageIncome == 0 ? '' : 'ㅇ' }}</div>
                  </template>
                  <DxColumn caption="근로 연말" cell-template="yearEndAdjustment" css-class="cell-center"/>
                  <template #yearEndAdjustment="{ data }">
                      <div class="showO">{{ data.data.yearEndAdjustment == 0 ? '' : 'ㅇ' }}</div>
                  </template>
                  <DxColumn caption="퇴직 소득" cell-template="retirementIncome" css-class="cell-center"/>
                  <template #retirementIncome="{ data }">
                      <div class="showO">{{ data.data.retirementIncome == 0 ? '' : 'ㅇ' }}</div>
                  </template>
                  <DxColumn caption="사업 소득" cell-template="businessIncome" css-class="cell-center"/>
                  <template #businessIncome="{ data }">
                      <div class="showO">{{ data.data.businessIncome == 0 ? '' : 'ㅇ' }}</div>
                  </template>
                  <DxColumn caption="기타 소득" cell-template="extraIncome" css-class="cell-center"/>
                  <template #extraIncome="{ data }">
                      <div class="showO">{{ data.data.extraIncome == 0 ? '' : 'ㅇ' }}</div>
                  </template>
                  <DxColumn caption="총지급액 (A99)" data-field="totalPayment" format="#,###" />
                  <DxColumn caption="납부세액 소득세등 (A99)" data-field="totalCollectedTaxAmount" format="#,###" />
                  <DxColumn caption="(20) 차월이월 환급세액계" data-field="nextMonthRefundTaxAmount" format="#,###" />
                  <DxColumn caption="(21) 환급 신청액" data-field="refundApplicationAmount" format="#,###" />
                  <DxSummary >
                    <DxTotalItem column="사업자코드" summary-type="count"  display-format="전체: {0}"/>
                    <DxTotalItem show-in-column="마감 현황" cell-template="summaryStatus" :customize-text="customTextSummaryEntering"/>
                    <DxTotalItem show-in-column="마감 현황" cell-template="summaryStatus" :customize-text="customTextSummaryInputDeadline"/>
                    <DxTotalItem show-in-column="마감 현황" cell-template="summaryStatus" :customize-text="customTextSummaryAdjusting"/>
                    <DxTotalItem show-in-column="마감 현황" cell-template="summaryStatus" :customize-text="customTextSummaryAdjustmentDeadline"/>

                    <DxTotalItem show-in-column="신고 주기" cell-template="reportType" :customize-text="customTextSummaryOneMonth"/>
                    <DxTotalItem show-in-column="신고 주기" cell-template="reportType" :customize-text="customTextSummarySixMonth"/>
                    
                    <DxTotalItem show-in-column="신고 종류" cell-template="afterDeadline" :customize-text="customTextSummaryRegular"/>
                    <DxTotalItem show-in-column="신고 종류" cell-template="afterDeadline" :customize-text="customTextSummaryEdit"/>
                    <DxTotalItem show-in-column="신고 종류" cell-template="afterDeadline" :customize-text="customTextSummaryAfter"/>
                  </DxSummary>
              </DxDataGrid>
          </a-spin>
      </div>
  </div>
  <PopupAddStatus :modalStatus="modalStatus" @closePopup="closePopup" :dataCall="dataCall" />
  <PopupPrint :modalStatus="modalPrint" @closePopup="closePopupPrint" :dataCall="dataCall" />
  <PopupSendEmail :modalStatus="modalSendEmail" @closePopup="closeSendEmail" :dataCall="dataCall" />
</template>

<script lang="ts">
import mutations from "@/graphql/mutations/BF/BF6/BF610/index";
import queries from "@/graphql/queries/BF/BF6/BF610/index";
import notification from "@/utils/notification";
import { PlusOutlined, } from "@ant-design/icons-vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import { DxColumn, DxDataGrid, DxItem, DxScrolling, DxSelection, DxToolbar, DxSummary, DxTotalItem, DxPaging, DxPager } from "devextreme-vue/data-grid";
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { useStore } from 'vuex';
import PopupAddStatus from "./components/PopupAddStatus.vue";
import PopupPrint from "./components/PopupPrint.vue";
import PopupSendEmail from "./components/PopupSendEmail.vue";
export default defineComponent({
  components: {
      DxDataGrid, DxToolbar, DxSelection, DxButton, DxColumn, DxItem, DxScrolling, PlusOutlined
      , PopupAddStatus, PopupPrint, PopupSendEmail, DxSummary, DxTotalItem,DxPaging, DxPager
  },
  computed: {

  },
  setup() {
      let dataSource: any = ref([])
      let trigger = ref(true)
      const store = useStore()
      const token = computed(()=>sessionStorage.getItem("token"))
      store.dispatch('auth/getUserInfor', token.value);
      const globalYear: any = computed(() => store.state.settings.globalYear)
      const userInfor: any = computed(() => store.state.auth.userInfor)

      const filter = reactive({
        page: 1,
        rows: 10,
        paymentYearMonth: parseInt(globalYear.value + "01"), // 2
        statuses: [10, 20, 30, 40], // 7
        companyCode: '', // 8
        companyName: '', // 9
        manageCompactUserId: null, // 10
        compactSalesRepresentativeId: null, // 11
        excludeCancel: true, // 12
        reportType: [0], // 3
        routine: true, // 4
        correction: true, // 5
        afterTheDueDate: true // 6
      })
      const reportType = reactive({
          oneMonth: true,
          sixMonth: true,
        })
      const classificationOfReport = reactive({
        routine : true,
        correction : true,
        afterTheDueDate : true,
      })
      let arraySelectBox2 = computed(() => [
          {
              key: 1,
              value: "지 " + globalYear.value + "-01"
          },
          {
              key: 2,
              value: "지 " + globalYear.value + "-02"
          },
          {
              key: 3,
              value: "지 " + globalYear.value + "-03"
          },
          {
              key: 4,
              value: "지 " + globalYear.value + "-04"
          },
          {
              key: 5,
              value: "지 " + globalYear.value + "-05"
          },
          {
              key: 6,
              value: "지 " + globalYear.value + "-06"
          },
          {
              key: 7,
              value: "지 " + globalYear.value + "-07"
          },
          {
              key: 8,
              value: "지 " + globalYear.value + "-08"
          },
          {
              key: 9,
              value: "지 " + globalYear.value + "-09"
          },
          {
              key: 10,
              value: "지 " + globalYear.value + "-10"
          },
          {
              key: 11,
              value: "지 " + globalYear.value + "-11"
          },
          {
              key: 12,
              value: "지 " + globalYear.value + "-12"
          },
          {
              key: 13,
              value: "지 " + (globalYear.value + 1) + "-01"
          },
      ])
      let statuses = reactive({
          checkbox1: true,
          checkbox2: true,
          checkbox3: true,
          checkbox4: true,
      })
      const move_column = computed(() => store.state.settings.move_column);
      const colomn_resize = computed(() => store.state.settings.colomn_resize);
      const modalStatus = ref(false)
      const modalPrint = ref(false)
      const modalSendEmail = ref(false)
      const dataCall = ref()
      const dataOrigin = ref(); // take data from api, use for search

      const searchMonth = ref(new Date().getMonth() + 1)
      // create computed for search

      const searchByYearAndMonth = computed(() => ({
        paymentYear: globalYear.value,
        paymentMonth: searchMonth.value,
      }))
      /*
       * ============== API ==============
       */

      //  QUERY : searchTaxWithholdingStatusReportsByImputedYearMonth
      let {
          refetch: refetchTable,
          loading: loadingTable,
          onError: errorTable,
          onResult: resTable,
      } = useQuery(queries.searchTaxWithholdingStatusReportsByYearMonth, searchByYearAndMonth, () => ({
          enabled: trigger.value,
          fetchPolicy: "no-cache"
      }));
      // get data from api set to dataSource and dataOrigin
      resTable(res => {
          dataSource.value = res.data.searchTaxWithholdingStatusReportsByYearMonth
          dataOrigin.value = res.data.searchTaxWithholdingStatusReportsByYearMonth
          trigger.value = false
      })
      errorTable(res => {
          notification('error', res.message)
      })

      //  Mutation : changeTaxWithholdingStatusReportStatus
      const {
          mutate: actionChangeStatus,
          onDone: doneChangeStatus,
          onError: errChangeStatus
      } = useMutation(mutations.changeTaxWithholdingStatusReportStatus);
      doneChangeStatus(() => {
          notification('success', `업부상태 변경되었습니다!`)
          trigger.value = true
          refetchTable()
      })
      errChangeStatus((error) => {
          notification('error', error.message)
      })

      /*
       * ============== WATCHING ==============
       */
      watch(() => [searchMonth, globalYear], ([newMonth, _]) => {
        if(newMonth.value === 13) {
          searchByYearAndMonth.value.paymentMonth = 1
          searchByYearAndMonth.value.paymentYear = globalYear.value + 1
        } else {
          searchByYearAndMonth.value.paymentMonth = newMonth.value
        }
        trigger.value = true
          refetchTable()
      }, { deep: true })

      /*
       * ============== FUNCTION ==============
       */
      function checkAllSameValue(obj: any) {
        const values = Object.values(obj);
        if (values.every(v => v === true) || values.every(v => v === false)) {
          return true;
        }
        return false;
      }
      const searching = () => {
          if(checkAllSameValue(reportType)){
            filter.reportType = [1, 6]
          } else {
            if(reportType.oneMonth) filter.reportType.push(1)
            if(reportType.sixMonth) filter.reportType.push(6)
          }

          if(checkAllSameValue(statuses)){
            filter.statuses = [10, 20, 30, 40]
          } else {
            filter.statuses = []
            if (statuses.checkbox1) filter.statuses.push(10)
            if (statuses.checkbox2) filter.statuses.push(20)
            if (statuses.checkbox3) filter.statuses.push(30)
            if (statuses.checkbox4) filter.statuses.push(40)
          }
          if(checkAllSameValue(classificationOfReport)) {
            filter.routine = true
            filter.correction = true
            filter.afterTheDueDate = true
          } else {
            filter.routine = classificationOfReport.routine
            filter.correction  = classificationOfReport.correction
            filter.afterTheDueDate = classificationOfReport.afterTheDueDate
          }
          // trigger.value = true
          dataSource.value = dataOrigin.value.filter((item: any) => {
            return filter.statuses.includes(item.status)
              && filter.reportType.includes(item.reportType)
              &&
              ((filter.routine ? (item.index === 0 && item.afterDeadline === false) : false)
                || (filter.correction ? (item.index > 0 && item.afterDeadline === false) : false)
                || (filter.afterTheDueDate ? (item.index === 0 && item.afterDeadline === true) : false))
              && item.company.code.toLocaleLowerCase().includes(filter.companyCode.toLocaleLowerCase())
              && item.company.name.toLocaleLowerCase().includes(filter.companyName.toLocaleLowerCase())
              && (filter.manageCompactUserId === null || filter.manageCompactUserId === item.companyServiceContract.manageCompactUser?.id)
              && (filter.compactSalesRepresentativeId === null || filter.compactSalesRepresentativeId === item.companyServiceContract.compactSalesRepresentative?.id)
          })
      }

      const closePopup = () => {
          modalStatus.value = false
          trigger.value = true
          refetchTable()
      }

      const closePopupPrint = () => {
          modalPrint.value = false
      }

      const closeSendEmail = () => {
          modalSendEmail.value = false
      }

      const openModalStatus = (data: any) => {
          dataCall.value = {
              reportId: data.reportId,
              companyId: data.companyId,
              imputedYear: data.imputedYear,
          }
          modalStatus.value = true
      }

      const changeStatusRowTable = (data: any) => {
          let dataChangeStatus = {
              "companyId": data.companyId,
              "imputedYear": data.imputedYear,
              "reportId": data.reportId,
              "status": data.status
          }
          actionChangeStatus(dataChangeStatus)
      }

      const actionPrint = (data: any) => {
          dataCall.value = {
              reportId: data.reportId,
              companyId: data.companyId,
              imputedYear: data.imputedYear,
          }
          modalPrint.value = true
      }
      const actionSendEmail = (data: any) => {
          dataCall.value = {
              reportId: data.reportId,
              companyId: data.companyId,
              senderName: data.company.name,
              receiverName: userInfor.value.username,
              receiverAddress: userInfor.value.email,
              imputedYear: data.imputedYear,
          }
          modalSendEmail.value = true
      }
      
      let entering = 0
      let inputDeadline = 0
      let adjusting  = 0
      let adjustmentDeadline = 0

      let oneMonthStatus = 0
      let sixMonthStatus = 0
      
      let regular = 0
      let edit = 0
      let after = 0
  
      watch(dataSource, (value) => {
        const result = value.reduce((acc: any, curr: any ) => {
          return [
            acc[0] + (curr.status === 10 ? 1 : 0),
            acc[1] + (curr.status === 20 ? 1 : 0),
            acc[2] + (curr.status === 30 ? 1 : 0),
            acc[3] + (curr.status === 40 ? 1 : 0),
            acc[4] + (curr.reportType === 1 ? 1 : 0),
            acc[5] + (curr.reportType === 6 ? 1 : 0),

            acc[6] + (curr.index === 0 && !curr.afterDeadline ? 1 : 0),
            acc[7] + (curr.index > 0 && !curr.afterDeadline ? 1 : 0),
            acc[8] + (curr.afterDeadline ? 1 : 0)
          ]
        }, [0, 0, 0, 0, 0, 0, 0, 0, 0])
        entering = result[0]
        inputDeadline = result[1]
        adjusting = result[2]
        adjustmentDeadline = result[3]
        oneMonthStatus = result[4]
        sixMonthStatus = result[5]

        regular = result[6]
        edit = result[7]
        after = result[8]

      }, {deep: true})

    const customTextSummaryEntering = () =>  `입력중 (${entering})`
    const customTextSummaryInputDeadline = () =>  `입력마감 (${inputDeadline})`
    const customTextSummaryAdjusting = () =>  `조정중 (${adjusting})`
    const customTextSummaryAdjustmentDeadline = () =>  `조정마감 (${adjustmentDeadline})`

    const customTextSummaryOneMonth = () =>  `매월 (${oneMonthStatus})`
    const customTextSummarySixMonth = () =>  `반기 (${sixMonthStatus})`

    const customTextSummaryRegular = () =>  `정기 (${regular})`
    const customTextSummaryEdit = () =>  `수정 (${edit})`
    const customTextSummaryAfter = () =>  `기한후 (${after})`

    const managerCompactUserList = computed(() =>  dataOrigin.value?.map((i:any) => ({name: i.companyServiceContract.manageCompactUser?.name, id: i.companyServiceContract.manageCompactUser?.id}))
      .filter((item: any, index: number, self: any) =>
        index === self.findIndex((t:any) => t.id === item.id && t.name === item.name && !!t.name)
      ))
    const managerSalesRepresentative = computed(() =>  dataOrigin.value?.map((i:any) => ({name: i.companyServiceContract.compactSalesRepresentative?.name, id: i.companyServiceContract.compactSalesRepresentative?.id}))
      .filter((item: any, index: number, self: any) =>
        index === self.findIndex((t:any) => t.id === item.id && t.name === item.name && !!t.name)
      ))

    const convertToDate = (date: number | null) => {
      if (date === null) return null
      return date.toString().slice(0, 4) + '-' + date.toString().slice(4)
    };
      return {
          modalSendEmail,
          // arraySelectBox,
          dataSource, loadingTable, filter, arraySelectBox2, statuses, reportType, move_column, colomn_resize, modalStatus, modalPrint, dataCall,
          searching, closePopup, openModalStatus, changeStatusRowTable, closePopupPrint, actionPrint, closeSendEmail, actionSendEmail,
          searchMonth,
          classificationOfReport,
          customTextSummaryEntering,
          customTextSummaryInputDeadline,
          customTextSummaryAdjusting,
          customTextSummaryAdjustmentDeadline,
          customTextSummaryOneMonth,
          customTextSummarySixMonth,
          managerCompactUserList,
          managerSalesRepresentative,
          convertToDate,
          customTextSummaryRegular,
          customTextSummaryEdit,
          customTextSummaryAfter
      }
  }
})
</script>
<style scoped lang="scss" src="./style/style.scss">

</style>
