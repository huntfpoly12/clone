<template>
  <div>
    <div class="title">임직원보수일람표</div>
    <DxDataGrid
      :show-row-lines="true"
      :hoverStateEnabled="true"
      :show-borders="true"
      :data-source="dataSource"
      :allow-column-reordering="move_column"
      :allow-column-resizing="colomn_resize"
      :column-auto-width="true"
      @cell-prepared="onCellPrepared"
      @row-prepared="onRowPrepared"
    >
      <DxColumn caption="" width="30px"/>
      <DxColumn caption="성명" data-field="name" alignment="left"/>
      <DxColumn caption="직종" data-field="position"/>
      <DxColumn caption="인건비구분" data-field="payrollType"/>
      <DxColumn caption="급여" data-field="salary"/>
      <DxColumn caption="재수당" data-field="bonus" cell-template="employeeSalaryTable"/>
      <DxColumn caption="일용잡금" data-field="dailyWage"/>
      <DxColumn caption="퇴직금 및 퇴직적립금" data-field="severancePay"/>
      <DxColumn caption="사회보험 부담금" data-field="socialInsurancePremiums"/>
      <DxColumn caption="계" cell-template="total"/>
      <DxColumn caption="" width="80px" cell-template="action" alignment="center"/>
      <template #total="{ data }">
        <span>{{ data.data.position +   data.data.salary  }}</span>
      </template>

      <template #action="{data}">
        <a-space :size="4">
          <DxButton type="ghost">
            <edit-outlined />
          </DxButton>

          <DxButton type="ghost" @click="handleDelete(data.data.id)">
            <DeleteOutlined/>
          </DxButton>
        </a-space>
      </template>
      <DxSummary :calculate-custom-summary="calculate">
        <DxTotalItem cssClass="custom" column="" display-format="소계"/>
        <DxTotalItem show-in-column="name" alignment="center" display-format="직접인건비 계"/>
        <DxTotalItem show-in-column="name" alignment="center" display-format="간접인건비 계"/>
        <DxTotalItem cssClass="custom" show-in-column="name" alignment="center" display-format="총 인건비 계"/>

        <DxTotalItem  name="SelectedRowsSummary" summary-type="custom" show-in-column="position" alignment="right" />
        <DxTotalItem show-in-column="position" alignment="right"/>
        <DxTotalItem cssClass="custom" show-in-column="position" alignment="right" />

        <DxTotalItem name="SelectedRowsSummary" summary-type="custom" show-in-column="payrollType" alignment="right" />
        <DxTotalItem show-in-column="payrollType" alignment="right"/>
        <DxTotalItem cssClass="custom" show-in-column="payrollType" alignment="right" />

        <DxTotalItem name="SelectedRowsSummary" summary-type="custom" show-in-column="salary" alignment="right" />
        <DxTotalItem show-in-column="salary" alignment="right"/>
        <DxTotalItem cssClass="custom" show-in-column="salary" alignment="right" />

        <DxTotalItem name="SelectedRowsSummary" summary-type="custom" show-in-column="bonus" alignment="right" />
        <DxTotalItem show-in-column="bonus" alignment="right"/>
        <DxTotalItem cssClass="custom" show-in-column="bonus" alignment="right" />

        <DxTotalItem name="SelectedRowsSummary" summary-type="custom" show-in-column="dailyWage" alignment="right" />
        <DxTotalItem show-in-column="dailyWage" alignment="right"/>
        <DxTotalItem cssClass="custom" show-in-column="dailyWage" alignment="right" />

        <DxTotalItem name="SelectedRowsSummary" summary-type="custom" show-in-column="severancePay" alignment="right" />
        <DxTotalItem show-in-column="severancePay" alignment="right"/>
        <DxTotalItem cssClass="custom" show-in-column="severancePay" alignment="right" />
      </DxSummary>
    </DxDataGrid>

  </div>
</template>

<script lang="ts">
import {DxColumn, DxDataGrid, DxGroupItem, DxSummary, DxTotalItem} from 'devextreme-vue/data-grid';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons-vue';
import DxButton from 'devextreme-vue/button';

import {computed, defineComponent, ref} from 'vue'
import {useStore} from "vuex";
import deletePopup from "@/utils/deletePopup";

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxButton,
    DxSummary,
    DxGroupItem,
    DxTotalItem,
    DeleteOutlined,
    EditOutlined
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const data = [
      {id: 1, name: 'John', position: 42, payrollType: 'New York', salary: 12, bonus: 1, dailyWage: 'aa', severancePay: 'sf', socialInsurancePremiums: 'ag', total: 100},
      {id: 2, name: 'John 1', position: 42, payrollType: 'New York', salary: 12, bonus: 1, dailyWage: 'aa', severancePay: 'sf', socialInsurancePremiums: 'ag', total: 100},
      {id: 3, name: 'John 2', position: 42, payrollType: 'New York', salary: 12, bonus: 1, dailyWage: 'aa', severancePay: 'sf', socialInsurancePremiums: 'ag', total: 100},
    ]
    const dataSource = ref(data)

    const handleDelete = (id: number) => {
      deletePopup({
        callback: () => {
          dataSource.value = dataSource.value.filter((item: any) => item.id !== id)
        }
      })
    }
    const calculate = (options: any) => {
      if (options.name === 'SelectedRowsSummary') {
        if (options.summaryProcess === 'start') {
          options.totalValue = 0;
        } else if (options.summaryProcess === 'calculate') {
          // if (options.component.isRowSelected(options.value.ID)) {
            options.totalValue += options.value.position;
          // }
        }
      }
    }
    return {
      move_column,
      colomn_resize,
      dataSource,
      DeleteOutlined,
      calculate,
      handleDelete
    }
  },
  methods: {
    onCellPrepared(e: any) {
      if(!e.cellElement.getAttributeNames().includes('aria-describedby') && e.cellElement.getAttribute('role') === 'gridcell' &&  e.cellElement.getAttribute('aria-colindex') === '2'){
        e.cellElement.colSpan = 3
      }
    },
    onRowPrepared(e: any) {
      const isRowSummary = e.rowElement.classList.contains('dx-footer-row')
      if(isRowSummary){
        e.rowElement.removeChild(e.rowElement.lastChild)
        e.rowElement.removeChild(e.rowElement.lastChild)
      }
    },

  }
})
</script>

<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 0px 10px;
  background-color: #97c0e1;
}

:deep(.dx-datagrid-total-footer) {
  .dx-datagrid-content {
    padding: 0px;
    .dx-footer-row {
      td {
        border-right: 1px solid #ddd;
        padding: 0px;
        .custom {
          border-bottom: none;
          &:first-child {
            padding: 0 10px;
          }
        }
        div {
          border-bottom: 1px solid #ddd;
          padding: 0 10px 0 0;
        }
      }
      .dx-datagrid-text-content {
        text-overflow: inherit;
      }
      td:last-child {
        border-right: none;
      }
    }
  }

  td {
    white-space: normal !important;
  }
}

</style>
