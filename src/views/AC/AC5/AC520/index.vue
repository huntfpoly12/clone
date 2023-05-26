<template>
  <action-header title="예산서" :buttonDelete="false"/>
  <a-space :size="16" class="mx-10 my-10">
    <a-space :size="4">
      <span>서식 설정:</span>
      <info-tool-tip>본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.</info-tool-tip>
    </a-space>
    <a-space :size="4" align="center">
      <checkbox-basic class="" label="예산서 (세목까지 출력)" :size="'20'"/>
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
        {{ data.data?.spendingBudgetSum ? data.data.employeePaySum / data.data?.spendingBudgetSum * 100 : '' }}
      </template>
      <DxColumn caption="임직원보수일람표" cell-template="employeeSalaryTable" alignment="center" :allow-sorting="false"/>
      <DxColumn caption="세출예산서" cell-template="expenseBudget" alignment="center" :allow-sorting="false"/>
      <DxColumn caption="세입예산서" cell-template="revenueBudget" alignment="center" :allow-sorting="false"/>
      <DxColumn caption="예산총괄표" alignment="center" :allow-sorting="false"/>
      <DxColumn caption="" width="100px" cell-template="action" alignment="center"/>
      <template #action="{data}">
        <DxButton type="ghost"
                  @click="handleDeleteBudget(data.data)"
                  :disabled="data.data.index !== (dataSource?.totalCount() || 0) - 1"
        >
          <DeleteOutlined/>
        </DxButton>
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
                    @click="openModalEditEmployeeTable(data.data.index)"/>
          <DxButton type="ghost" @click="actionSendMail(data.data)">
            <img src="@/assets/images/email.svg" alt="" width="18"/>
          </DxButton>
          <DxButton type="ghost" @click="actionPrint(data.data)">
            <img src="@/assets/images/print.svg" alt="" width="18" />
          </DxButton>
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
          <DxButton type="ghost" @click="actionSendMail(data.data)">
            <img src="@/assets/images/email.svg" alt="" width="18"/>
          </DxButton>
          <DxButton type="ghost" @click="actionPrint(data.data)">
            <img src="@/assets/images/print.svg" alt="" width="18" />
          </DxButton>
        </div>
        <a-tooltip v-else title="세출예산서 작성">
          <div>
            <DxButton type="ghost" icon="plus"
                      @click="openModalBudget({data: {...data.data, budgetType: 5, action: ACTION.ADD}, type: ComponentCreateBudget.ExpenseAndRevenueBudget, })"/>
          </div>
        </a-tooltip>
      </template>
      <template #revenueBudget="{data}">
        <div v-if="data.data.revenueBudgetSum !== null" class="d-flex-center justify-content-center gap-6">
          <DxButton type="ghost" icon="edit"
                    @click="openModalBudget({data: {...data.data, budgetType: 4, action: ACTION.EDIT}, type: ComponentCreateBudget.ExpenseAndRevenueBudget, })"/>
          <DxButton type="ghost" @click="actionSendMail(data.data)">
            <img src="@/assets/images/email.svg" alt="" width="18"/>
          </DxButton>
          <DxButton type="ghost" @click="actionPrint(data.data)">
            <img src="@/assets/images/print.svg" alt="" width="18" />
          </DxButton>
        </div>
        <a-tooltip v-else title="세입예산서 작성 234">
          <div>
            <DxButton type="ghost" icon="plus"
                      @click="openModalBudget({data: {...data.data, budgetType: 4, action: ACTION.ADD}, type: ComponentCreateBudget.ExpenseAndRevenueBudget})"/>
          </div>
        </a-tooltip>
      </template>
    </DxDataGrid>
    <BudgetPopup
      :modal-status="modal.budget"
      @close-popup="closePopupBudget"
      :index="index"
    />
    <PopupSendMail
      :isModalSendMail="isModal.employeeRemunerationList"
      @closePopup="handleEmitClosePopup"
      :variable="query"
      :index="index"
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
    <AddRowPopup :visible="isModal.addRow" @close-popup="handleClosePopupAddRow"/>
  </div>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {useStore} from "vuex";
import {DeleteOutlined, HistoryOutlined} from '@ant-design/icons-vue';
import {DxColumn, DxDataGrid, DxItem, DxToolbar} from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import BudgetPopup from "@/views/AC/AC5/AC520/components/BudgetPopup.vue";
import {ACTION, ComponentCreateBudget} from "@/views/AC/AC5/AC520/type";
import InfoToolTip from "@/components/common/InfoToolTip.vue";
import {useMutation, useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC5/AC520"
import {companyId} from "@/helpers/commonFunction";
import {Store} from "devextreme/data";
import DataSource from "devextreme/data/data_source";
import {initialState, useGetEmployeePayTableReportViewUrl} from "./utils/index";
import PopupSendMail from "./components/PopupSendMail.vue";
import EditEmployeeSalaryTable from "./components/EditEmployeeSalaryTable.vue";
import mutations from "@/graphql/mutations/AC/AC5/AC520";
import deletePopup from "@/utils/deletePopup";
import AccountingProcessStatusEdit from "./components/AccountingProcessStatusEdit.vue"
import AddRowPopup from "./components/AddRowPopup.vue";
import { Action } from "rxjs/internal/scheduler/Action";
const store = useStore();
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);
const globalFacilityBizId = computed<number>(() => parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));
const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
const disableAddRow = ref(false)
const modalHistory = ref(false)
const gridRef = ref();
const dataSource = ref<DataSource>()
const query = reactive({
  companyId,
  fiscalYear: acYear.value ,// acYear.value
  facilityBusinessId: globalFacilityBizId.value,
})
const isModal = reactive({
  employeeRemunerationList: false,
  appropriationStatement: false,
  revenueBudgetStatement: false,
  addRow: false
})
const index = ref(0)
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

const {onResult: onResultBudget, refetch: refetchBudget, onError} = useQuery(queries.getBudgets, query, () => ({
  fetchPolicy: "no-cache",
}))
onResultBudget(({data}) => {
  dataSource.value = new DataSource({
    store: {
      type: "array",
      key: "createdAt",
      data: data.getBudgets.reverse() || [],
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
    refetchBudget()
  }
})
onErrorDelete((error) => {
  console.log('error', error)
})

const {onResult: onResultBudgetPreYear, onError: onErrorPreYear} = useQuery(queries.getBudgets,
  {...query, fiscalYear: acYear.value - 1},
  () => ({
    fetchPolicy: "no-cache",
  })
)
// get previous year budgets
onResultBudgetPreYear(({data}) => {
  if (data.getBudgets.length) {
    store.commit('common/setDataBudgetPreYear', data.getBudgets[data.getBudgets.length - 1])
  } else {
    store.commit('common/setDataBudgetPreYear', null)
  }
})
onErrorPreYear((error) => {
  console.log('error', error)
  store.commit('common/setDataBudgetPreYear', null)
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
  if (e){
    query.fiscalYear = acYear.value
    refetchBudget()
    disableAddRow.value = false
  }
  modal.budget = false
};
const openModalBudget = (data: any) => {

  modal.budget = true;
  store.dispatch('common/setDataBudget', data)
}
const openModalEditEmployeeTable = (i: number) => {
  index.value = i
  modal.editEmployeeSalaryTable = true;
}
const actionPrint = (data: any) => {
  const {onResult} = useGetEmployeePayTableReportViewUrl({
    ...query,
    index: data.index
  })
  onResult(({data}) => {
    window.open(data.getEmployeePayTableReportViewUrl, '_blank')
  })
}
const actionSendMail = (data: any) => {
  index.value = data.index as number
  isModal.employeeRemunerationList = true
}
const handleEmitClosePopup = (e: boolean) => {
  if (e){
    isModal.employeeRemunerationList = false
  }
}
const closePopupEditEmployeeTable = (e: boolean) => {
  if (e){
    refetchBudget()
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
  });
}
const closePopupProcessStatus = (e: boolean) => {
  if (e) {
    refetchBudget()
  }
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
