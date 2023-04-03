<template>
  <action-header title="예산서" :buttonDelete="false"/>
  <a-space :size="16" class="mx-10 my-10">
    <a-space :size="4">
      <span>서식 설정:</span>
      <InfoToolTip>본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.</InfoToolTip>
    </a-space>
    <a-space :size="4" align="center">
      <checkbox-basic class="" label="예산서 (세목까지 출력)" :size="'20'"/>
      <img src="@/assets/images/iconInfo.png" style="width: 14px"/>
      <span>선택시 서식에 세목까지 표현됩니다.</span>
    </a-space>
  </a-space>
  <div class="mx-10">

    <DxDataGrid
      :show-row-lines="true"
      :hoverStateEnabled="true"
      :show-borders="true"
      :data-source="dataSource"
      :allow-column-reordering="move_column"
      :allow-column-resizing="colomn_resize"
      :column-auto-width="true"
    >
      <DxColumn caption="구분(차수)" data-field="budget" cell-template="budget" alignment="left"/>
      <DxColumn caption="마감상태" data-field="status" cell-template="status"/>
      <DxColumn caption="최종저장일시"/>
      <DxColumn caption="최종저장아이디"/>
      <DxColumn caption="인건비비율 (%)"/>

      <DxColumn caption="임직원보수일람표" cell-template="employeeSalaryTable"/>
      <DxColumn caption="세출예산서" cell-template="expenseAndRevenueBudget"/>
      <DxColumn caption="세입예산서"/>
      <DxColumn caption="예산총괄표"/>
      <DxColumn caption="" width="100px" cell-template="action"/>
      <template #action="{}">
        <DxButton type="ghost">
          <DeleteOutlined/>
        </DxButton>
      </template>
      <template #budget="{data}">
        <a-tag  :color="data.data.budget ? `black` : `gray`">{{ data.data.budget ? "본예산" : "추경" }}</a-tag>
        <span>{{ data.data.budget ? '' : "${차수}차" }}</span>
      </template>
      <template #status="{data}">
        <ProcessStatus :valueStatus="data.data.status" />
      </template>
      <template #employeeSalaryTable="{data}">
        <DxButton type="ghost" icon="plus" @click="openModalBudget({data: data.data, type: ComponentCreateBudget.EmployeeSalaryTable})"/>
      </template>
      <template #expenseAndRevenueBudget="{data}">
        <DxButton type="ghost" icon="plus" @click="openModalBudget({data: data.data, type: ComponentCreateBudget.ExpenseAndRevenueBudget})"/>
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
import InfoToolTip from "@/views/AC/AC5/components/InfoToolTip.vue";
import {useStore} from "vuex";
import {DeleteOutlined, DownloadOutlined, HistoryOutlined, ZoomInOutlined} from '@ant-design/icons-vue';
import {DxColumn, DxDataGrid, DxScrolling, DxToolbar, DxPaging} from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import ProcessStatus from "@/components/common/ProcessStatus.vue";
import BudgetPopup from "@/views/AC/AC5/AC520/components/BudgetPopup.vue";
import {Budget, ComponentCreateBudget} from "@/views/AC/AC5/AC520/type";

const store = useStore();
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);
const dataSource = ref<Budget[]>([
  {budget: true, status: 30, employeeSalaryTable: null},
  // {budget: false, status: 10},
])
const modalBudget = ref(false);
const closePopupBudget = () => modalBudget.value = false;
const openModalBudget = (data: any) => {
  modalBudget.value = true;
  store.dispatch('ac520Module/setDataBudget', data)
}
</script>

<style scoped>
.ant-tag {
  width: 50px;
  text-align: center;
}
</style>
