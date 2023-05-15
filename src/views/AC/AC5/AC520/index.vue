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
    >
      <DxToolbar>
        <DxItem location="after" template="button-template" css-class="cell-button-add"/>
        <DxItem location="after" template="button-history" css-class="cell-button-add"/>
      </DxToolbar>
      <template #button-history>
        <DxButton icon="plus">
          <HistoryOutlined style="font-size: 18px;"/>
        </DxButton>
      </template>
      <template #button-template>
        <a-tooltip placement="topLeft" title="예산서 신규 작성">
          <div>
            <DxButton icon="plus" :disabled="disableAddRow" @click="addRow"/>
          </div>
        </a-tooltip>
      </template>
      <DxColumn caption="구분(차수)" data-field="index" cell-template="budget" alignment="left"/>
      <DxColumn caption="마감상태" data-field="status" cell-template="status" alignment="center"/>
      <DxColumn caption="최종저장일시" data-field="savedAt"  alignment="center"/>
      <DxColumn caption="최종저장아이디" data-field="savedBy"  alignment="center"/>
      <DxColumn caption="인건비비율 (%)" data-field="employeePaySum"  alignment="center"/>

      <DxColumn caption="임직원보수일람표" cell-template="employeeSalaryTable" alignment="center"/>
      <DxColumn caption="세출예산서" cell-template="expenseBudget" alignment="center"/>
      <DxColumn caption="세입예산서" cell-template="revenueBudget" alignment="center"/>
      <DxColumn caption="예산총괄표" alignment="center"/>
      <DxColumn caption="" width="100px" cell-template="action" alignment="center"/>
      <template #action="{}">
        <DxButton type="ghost">
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
        <accounting-process-status-edit :valueStatus="data.data.status"/>
      </template>
      <template #employeeSalaryTable="{data}">
        <DxButton type="ghost" icon="plus"
                  @click="openModalBudget({data: data.data, type: ComponentCreateBudget.EmployeeSalaryTable})"/>
      </template>
      <template #expenseBudget="{data}">
        <DxButton type="ghost" icon="plus"
                  @click="openModalBudget({data: data.data, type: ComponentCreateBudget.ExpenseAndRevenueBudget})"/>
      </template>
      <template #revenueBudget="{data}">
        <DxButton type="ghost" icon="plus"
                  @click="openModalBudget({data: data.data, type: ComponentCreateBudget.ExpenseAndRevenueBudget})"/>
      </template>
    </DxDataGrid>
    <BudgetPopup
      :modal-status="modalBudget"
      @close-popup="closePopupBudget"
    />
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {DeleteOutlined, HistoryOutlined} from '@ant-design/icons-vue';
import {DxColumn, DxDataGrid, DxItem, DxToolbar} from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import BudgetPopup from "@/views/AC/AC5/AC520/components/BudgetPopup.vue";
import {Budget, ComponentCreateBudget} from "@/views/AC/AC5/AC520/type";
import InfoToolTip from "@/components/common/InfoToolTip.vue";
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC5/AC520"
import {companyId, accountSubject} from "@/helpers/commonFunction";
import {Store} from "devextreme/data";
import DataSource from "devextreme/data/data_source";
import {initialState} from "./utils/index";
import { BudgetType } from '@bankda/jangbuda-common'

const store = useStore();
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);
const globalFacilityBizId = computed<number>(() => parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));

const disableAddRow = ref(false)
const gridRef = ref();
const dataSource = ref<DataSource>()

const dataGridRef = computed(() => gridRef.value?.instance as any); // ref of grid Instance

const storeDataSource = computed(() => dataSource.value?.store() as Store);
console.log('companyId', companyId)
console.log('globalFacilityBizId', globalFacilityBizId.value)
console.log('accountSubject', accountSubject)
const {onResult: onResultBudget, refetch: refetchBudget, onError} = useQuery(queries.getBudgets, {
  companyId: companyId,
  fiscalYear: 2024,
  facilityBusinessId: globalFacilityBizId.value
}, () => ({
  fetchPolicy: "no-cache",
}))
onResultBudget(({data}) => {
  dataSource.value = new DataSource({
    store: {
      type: "array",
      key: "createdAt",
      data: data.getBudgets || [],
    },
  });
  console.log('result', data.getBudgets)
});

onError((param) => {
  disableAddRow.value = true
})

// function add row
const addRow = () => {
  storeDataSource.value.insert(initialState).then((result) => {
    dataGridRef.value?.refresh();
  });
}
const modalBudget = ref(false);
const closePopupBudget = () => modalBudget.value = false;
const openModalBudget = (data: any) => {
  modalBudget.value = true;
  store.dispatch('common/setDataBudget', data)
}
</script>

<style scoped>
.ant-tag {
  width: 50px;
  text-align: center;
}
</style>
