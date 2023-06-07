<template>
  <action-header title="예산서" :buttonDelete="false"/>
  <a-space :size="16" class="mx-10 my-10">
    <a-space :size="4">
      <span>서식 설정:</span>
      <info-tool-tip>본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.</info-tool-tip>
    </a-space>
    <a-space :size="4" align="center">
      <checkbox-basic v-model:valueCheckbox="displayCode" label="예산서 (세목까지 출력)"  :size="'20'"/>
      <info-tool-tip>선택시 서식에 세목까지 표현됩니다.</info-tool-tip>
    </a-space>
  </a-space>
  <div class="mx-10">
    <DxDataGrid
      ref="gridRef"
      :show-row-lines="true"
      :hoverStateEnabled="true"
      :show-borders="true"
      :data-source="dataSource"
      :allow-column-reordering="move_column"
      :allow-column-resizing="colomn_resize"
      :column-auto-width="true"
      noDataText="내역이 없습니다"
      :loadPanel="false"
    >
      <DxToolbar>
        <DxItem location="after" template="button-template" css-class="cell-button-add"/>
        <DxItem location="after" template="button-history" css-class="cell-button-add"/>
      </DxToolbar>
      <template #button-history>
        <DxButton >
          <HistoryOutlined style="font-size: 18px;" @click="openHistory"/>
        </DxButton>
      </template>
      <template #button-template>
        <a-tooltip placement="topLeft" title="예산서 신규 작성">
          <div>
            <DxButton icon="plus" :disabled="disableAddRow || lastRowOfDataIsNotComplete" @click="addRow"/>
          </div>
        </a-tooltip>
      </template>
      <DxColumn caption="구분(차수)" data-field="index" cell-template="budget" alignment="left" :allow-sorting="false"/>
      <DxColumn caption="마감상태" data-field="status" cell-template="status" alignment="center" :allow-sorting="false"/>
      <DxColumn caption="최종저장일시" data-field="savedAt" data-type="date" format="yyyy-MM-dd HH:mm"  alignment="center" :allow-sorting="false"/>
      <DxColumn caption="최종저장아이디" data-field="savedBy"  alignment="center" :allow-sorting="false"/>
      <DxColumn caption="인건비비율 (%)" cell-template="laborCostRadio" alignment="center" />
      <template #laborCostRadio="{ data }">
        {{ data.data?.expenditureBudgetSum ? filters.formatNumber(data.data.employeePaySum / data.data?.expenditureBudgetSum * 100, 1) : Number(0).toFixed(2) }}
      </template>
      <DxColumn caption="임직원보수일람표" cell-template="employeeSalaryTable" alignment="center" :allow-sorting="false"/>
      <DxColumn caption="세출예산서" cell-template="expenseBudget" alignment="center" :allow-sorting="false"/>
      <DxColumn caption="세입예산서" cell-template="revenueBudget" alignment="center" :allow-sorting="false"/>
      <DxColumn caption="예산총괄표" alignment="center" :allow-sorting="false" cell-template="mailPrint"/>
      <DxColumn caption="" width="100px" cell-template="action" alignment="center"/>
      <template #action="{data}">
        <div class="d-flex justify-content-center">
          <a-tooltip :trigger="data.data.index !== (dataSource?.totalCount() || 0) - 1 && data.data.status !== 10 ? '' : 'hover'" placement="left" title="예산서 (임직원보수일람표 포함) 삭제">
            <div >
              <DxButton type="ghost"
                        @click="handleDeleteBudget(data.data)"
                        :disabled="data.data.index !== (dataSource?.totalCount() || 0) - 1 && data.data.status !== 10"
              >
                <DeleteOutlined/>
              </DxButton>
            </div>
          </a-tooltip>
        </div>
      </template>

      <template #budget="{data}">
        <div class="d-flex-center">
          <a-tag :color="!data.data.index ? `black` : `gray`">{{ !data.data.index ? "본예산" : "추경" }}</a-tag>
          <span>{{ !data.data.index ? '' : `${data.data.index}차` }}</span>
        </div>
      </template>
      <template #status="{data}">
        <div v-if="data.data?.status">
          <accounting-process-status-edit :data="data.data" @close-popup="closePopupProcessStatus"/>
        </div>
      </template>
      <template #employeeSalaryTable="{data}">
        <div v-if="data.data.employeePaySum !== null" class="d-flex-center justify-content-center gap-6">
          <DxButton type="ghost" icon="edit"
                    @click="openModalEditEmployeeTable(data.data)"/>
          <DxButton type="ghost" @click="actionSendMail(data.data, TypeMail.EmployeePayTable)">
            <img src="@/assets/images/email.svg" alt="" width="18"/>
          </DxButton>
          <a-tooltip title="출력/저장">
            <div>
              <DxButton type="ghost" @click="actionPrint(data.data, TypeMail.EmployeePayTable)">
                <img src="@/assets/images/print.svg" alt="" width="18" />
              </DxButton>
            </div>
          </a-tooltip>
        </div>
        <a-tooltip v-else title="임직원보수일람표 작성. 인건비 관련 세출예산액은 임직원보수일람표의 금액이 반영됩니다.">
          <div>
            <DxButton type="ghost" icon="plus"
                      @click="openModalBudget({data: {...data.data, columnName: '임직원보수일람표'}, type: ComponentCreateBudget.EmployeeSalaryTable})"/>
          </div>
        </a-tooltip>
      </template>
      <template #expenseBudget="{data}">
        <div v-if="data.data.employeePaySum !== null || data.data.expenditureBudgetSum !== null" class="d-flex-center justify-content-center gap-6">
          <DxButton type="ghost" icon="edit"
                    @click="openModalBudget({data: {...data.data, budgetType: 5, action: ACTION.EDIT}, type: ComponentCreateBudget.ExpenseAndRevenueBudget, })"/>
          <DxButton type="ghost" @click="actionSendMail({...data.data, budgetType: 5}, TypeMail.Budget)">
            <img src="@/assets/images/email.svg" alt="" width="18"/>
          </DxButton>
          <a-tooltip title="출력/저장">
            <div>
              <DxButton type="ghost" @click="actionPrint({...data.data, budgetType: 5}, TypeMail.Budget)">
                <img src="@/assets/images/print.svg" alt="" width="18" />
              </DxButton>
            </div>
          </a-tooltip>
        </div>
        <a-tooltip v-else title="세출예산서 작성">
          <div>
            <DxButton type="ghost" icon="plus"
                      @click="openModalBudget({data: {...data.data, budgetType: 5, action: ACTION.ADD, columnName: '세출예산서'}, type: ComponentCreateBudget.ExpenseAndRevenueBudget, })"/>
          </div>
        </a-tooltip>
      </template>
      <template #revenueBudget="{data}">
        <div v-if="data.data.revenueBudgetSum !== null" class="d-flex-center justify-content-center gap-6">
          <DxButton type="ghost" icon="edit"
                    @click="openModalBudget({data: {...data.data, budgetType: 4, action: ACTION.EDIT}, type: ComponentCreateBudget.ExpenseAndRevenueBudget, })"/>
          <DxButton type="ghost" @click="actionSendMail({...data.data, budgetType: 4}, TypeMail.Budget)">
            <img src="@/assets/images/email.svg" alt="" width="18"/>
          </DxButton>
          <a-tooltip title="출력/저장">
            <div>
              <DxButton type="ghost" @click="actionPrint({...data.data, budgetType: 4}, TypeMail.Budget)">
                <img src="@/assets/images/print.svg" alt="" width="18" />
              </DxButton>
            </div>
          </a-tooltip>
        </div>
        <a-tooltip v-else title="세입예산서 작성">
          <div>
            <DxButton type="ghost" icon="plus"
                      @click="openModalBudget({data: {...data.data, budgetType: 4, action: ACTION.ADD, columnName: '세입예산서'}, type: ComponentCreateBudget.ExpenseAndRevenueBudget})"/>
          </div>
        </a-tooltip>
      </template>
      <template #mailPrint="{data}">
        <div v-if="data.data.status && data.data.employeePaySum !== null &&  data.data.employeePaySum !== null " class="d-flex-center justify-content-center gap-6">
          <DxButton type="ghost" @click="actionSendMail(data.data, TypeMail.BudgetSummaryTable)">
            <img src="@/assets/images/email.svg" alt="" width="18"/>
          </DxButton>
          <a-tooltip title="출력/저장">
            <div>
              <DxButton type="ghost" @click="actionPrint(data.data, TypeMail.BudgetSummaryTable)">
                <img src="@/assets/images/print.svg" alt="" width="18" />
              </DxButton>
            </div>
          </a-tooltip>
        </div>
      </template>
    </DxDataGrid>
    <BudgetPopup
      :modal-status="modal.budget"
      @close-popup="closePopupBudget"
      @reload="reload"
    />
    <PopupSendMail
      v-if="isModal.employeeRemunerationList"
      :isModalSendMail="isModal.employeeRemunerationList"
      @closePopup="handleEmitClosePopup"
      :variable="query"
      :index="index"
      :typeMail="stateMail.typeMail"
      :type="stateMail.type"
      :displayCode="displayCode"
    />
    <EditEmployeeSalaryTable
      v-if="modal.editEmployeeSalaryTable"
      :index="index"
      :modal-status="modal.editEmployeeSalaryTable"
      @close-popup="closePopupEditEmployeeTable"
    />
    <HistoryPopup
      :modalStatus="modalHistory"
      @closePopup="modalHistory = false"
      keyExpr="loggedAt"
      title="변경이력"
      typeHistory="ac-520" />
    <AddRowPopup :visible="isModal.addRow" @close-popup="handleClosePopupAddRow" :index="dataSource?.totalCount() || 0"/>
  </div>
</template>

<script setup lang="ts">
import InfoToolTip from "@/components/common/InfoToolTip.vue";
import mutations from "@/graphql/mutations/AC/AC5/AC520";
import queries from "@/graphql/queries/AC/AC5/AC520";
import { companyId } from "@/helpers/commonFunction";
import deletePopup from "@/utils/deletePopup";
import BudgetPopup from "@/views/AC/AC5/AC520/components/BudgetPopup.vue";
import { ACTION, ComponentCreateBudget, TypeMail } from "@/views/AC/AC5/AC520/type";
import { DeleteOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import { useMutation, useQuery } from "@vue/apollo-composable";
import DxButton from 'devextreme-vue/button';
import { DxColumn, DxDataGrid, DxItem, DxToolbar } from 'devextreme-vue/data-grid';
import { Store } from "devextreme/data";
import DataSource from "devextreme/data/data_source";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import AccountingProcessStatusEdit from "./components/AccountingProcessStatusEdit.vue";
import AddRowPopup from "./components/AddRowPopup.vue";
import EditEmployeeSalaryTable from "./components/EditEmployeeSalaryTable.vue";
import PopupSendMail from "./components/PopupSendMail.vue";
import { initialState, useGetEmployeePayTableReportViewUrl, useGetBudgetSummaryTableReportViewUrl, useGetBudgetReportViewUrl } from "./utils/index";
import filters from "@/helpers/filters";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";
const store = useStore();
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);
const globalFacilityBizId = computed<number>(() => parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));
const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
const disableAddRow = ref(false)
const modalHistory = ref(false)
const gridRef = ref();
const displayCode = ref(false)
const dataSource = ref<DataSource>()
const query = reactive({
  companyId,
  fiscalYear: acYear.value ,// acYear.value
  facilityBusinessId: globalFacilityBizId.value,
})
const triggerBudgetPreIndex = ref(false) // trigger to get budget pre index
const isModal = reactive({
  employeeRemunerationList: false,
  appropriationStatement: false,
  revenueBudgetStatement: false,
  addRow: false
})
const index = ref(0)
const stateMail = reactive({
  type: 10,
  typeMail: TypeMail.Budget,
})
const dataGridRef = computed(() => gridRef.value?.instance as any); // ref of grid Instance
const storeDataSource = computed(() => dataSource.value?.store() as Store);
const lastRowOfDataIsNotComplete = computed(() => {
  const data = dataSource.value?.items()
  if (data) {
    const lastRow = data[data.length - 1]
    if (lastRow) {
      return lastRow.employeePaySum === null || lastRow.revenueBudgetSum === null || lastRow.status === 10
    }
  }
  return false
})
const codes = sessionStorage.getItem("accountSubject")
if (!codes) {
  store.dispatch("settings/getAccountSubject", {companyId: companyId, fiscalYear: acYear.value, facilityBizType: globalFacilityBizId.value})
}

const {onResult: onResultBudget, refetch: refetchBudgets, onError} = useQuery(queries.getBudgets, query, () => ({
  fetchPolicy: "no-cache",
}))
onResultBudget(({data}) => {
  const dataBudget = data.getBudgets?.reverse() || []
  triggerBudgetPreIndex.value = dataBudget.length === 0 && acYear.value > 2023
  dataSource.value = new DataSource({
    store: {
      type: "array",
      key: "createdAt",
      data: dataBudget,
    },
  });
  // console.log('result', data.getBudgets)
});

onError((param) => {
  disableAddRow.value = true
})

// delete budget
const {mutate: deleteBudget, onDone: onDoneDelete, onError: onErrorDelete} = useMutation(mutations.deleteBudget)
onDoneDelete((result) => {
  if (result.data) {
    refetchBudgets()
    notification("success", Message.getCommonMessage('402').message);
  }
})
onErrorDelete((error) => {
  console.log('error', error)
})

// if index === 0 then get budgets of previous year and take last index
const {onResult: onResultBudgetPreYear, onError: onErrorPreYear} = useQuery(queries.getBudgets,
  {...query, fiscalYear: acYear.value - 1},
  () => ({
    fetchPolicy: "no-cache",
    enabled: triggerBudgetPreIndex.value
  })
)
onResultBudgetPreYear(({data}) => {
  if (data.getBudgets.length) {
    store.commit('common/setDataPreIndexBudget', data.getBudgets[0])
  } else {
    store.commit('common/setDataPreIndexBudget', null)
  }
})
onErrorPreYear((error) => {
  console.log('error', error)
  store.commit('common/setDataPreIndexBudget', null)
})
// function add row
const addRow = () => {
  isModal.addRow = true
}
const handleClosePopupAddRow = (e: boolean | ACTION) => {
  if(e === ACTION.ADD) {
    if(dataSource.value && (dataSource.value?.totalCount() as number) > 0) {
      initialState.index = dataSource.value.totalCount() as number
    }
    storeDataSource.value.insert(initialState).then((result) => {
      dataGridRef.value?.refresh();
      disableAddRow.value = true
    });
  } else {
    isModal.addRow = false
  }
}
const modal = reactive({
  budget: false,
  editEmployeeSalaryTable: false
});
const closePopupBudget = (e: boolean) => {
  query.fiscalYear = acYear.value
  if(e) refetchBudgets()
  disableAddRow.value = false
  modal.budget = false
  store.commit('common/setIsChangedFormAc520', false)
};
const openModalBudget = (data: any) => {
  modal.budget = true;
  store.dispatch('common/setDataBudget', data)
}
const openModalEditEmployeeTable = (data: any) => {
  index.value = data.index
  modal.editEmployeeSalaryTable = true;
  store.commit('common/setDataBudget', data)
}
const actionPrint = (data: any, type: TypeMail) => {

  if(type === TypeMail.EmployeePayTable) {
    const {onResult} = useGetEmployeePayTableReportViewUrl({
      ...query,
      index: data.index
    })
    onResult(({data}) => {
      window.open(data.getEmployeePayTableReportViewUrl, '_blank')
    })
  } else if(type === TypeMail.BudgetSummaryTable) {
    const {onResult} = useGetBudgetSummaryTableReportViewUrl({
      ...query,
      index: data.index,
    })
    onResult(({data}) => {
      window.open(data.getBudgetSummaryTableReportViewUrl, '_blank')
    })
  } else {
    const {onResult} = useGetBudgetReportViewUrl({
      ...query,
      index: data.index,
      displayCode: displayCode.value,
      type: data.budgetType
    })
    onResult(({data}) => {
      window.open(data.getBudgetReportViewUrl, '_blank')
    })
  }
}
const actionSendMail = (data: any, type: TypeMail) => {
  index.value = data.index as number
  if(data?.budgetType) stateMail.type = data?.budgetType
  stateMail.typeMail = type
  isModal.employeeRemunerationList = true
}
const handleEmitClosePopup = (e: boolean) => {
  if (e){
    isModal.employeeRemunerationList = false
  }
}
const closePopupEditEmployeeTable = (e: boolean) => {
  if (e){
    refetchBudgets()
  }
  modal.editEmployeeSalaryTable = false
}
const openHistory = () => {
  modalHistory.value = true
}
const handleDeleteBudget = (data: any) => {
  if (disableAddRow.value) {
    dataSource.value?.store().remove(data.createdAt).then(() => {
      dataGridRef.value?.refresh();
      disableAddRow.value = false
    })
    return
  }
  deletePopup({
    callback: () => {
      deleteBudget({
        ...query,
        index: data.index
      })
    },
    message: `해당 예산서(임직원보수일람표 포함)를 삭제하시겠습니까?`,
    width: 480
  });
}
const closePopupProcessStatus = (e: boolean) => {
  if (e) {
    refetchBudgets()
  }
}
const reload = () => {
  refetchBudgets()
}
</script>

<style scoped>
.ant-tag {
  width: 50px;
  text-align: center;
}
.gap-6 {
  gap: 6px;
}
</style>
