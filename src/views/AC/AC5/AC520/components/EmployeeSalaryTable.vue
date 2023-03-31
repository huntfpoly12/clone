<template>
  <div>
    <div class="title">임직원보수일람표</div>
    <DxDataGrid
      :show-row-lines="true"
      :hoverStateEnabled="true"
      :show-borders="true"
      :data-source="dataSource"
      key-expr="key"
      :allow-column-reordering="move_column"
      :allow-column-resizing="colomn_resize"
      :column-auto-width="true"
      @cell-prepared="onCellPrepared"
      @row-prepared="onRowPrepared"
      @row-removing="onRowRemoving"
      @row-removed="logEvent('RowRemoved')"
      @saving="logEvent('Saving')"
      @saved="logEvent('Saved')"
    >
      <DxRowDragging
        :allow-reordering="true"
        :on-reorder="onReorder"
        :show-drag-icons="true"
        name="drag"
      />
      <DxEditing
        mode="row"
        :allow-adding="true"
        :allow-deleting="true"
        :allow-updating="true"
        :confirm-delete="false"
        :use-icons="true"
        new-row-position="last"
        v-model:changes="changes"
      />
<!--      <DxColumn caption="" width="30px"/>-->
      <DxColumn caption="성명" data-field="name" alignment="center" css-class="text-red">
        <DxRequiredRule/>
      </DxColumn>
      <DxColumn
        caption="직종"
        data-field="position"
        :editor-options="{placeholder: '선택 또는 직접입력' }"
        css-class="text-red"
        width="165"
        alignment="center"
      >
        <DxLookup
          :data-source="[{'ID': 1, 'Name': '직종1'}, {'ID': 2, 'Name': '직종2'}, {'ID': 3, 'Name': '직종3'}]"
          display-expr="Name"
          value-expr="ID"
        />
        <DxRequiredRule/>
      </DxColumn>
      <DxColumn
        caption="인건비구분"
        data-field="payrollType"
        css-class="text-red"
        :editor-options="{placeholder: '선택' }"
        alignment="center"
      >
        <DxLookup
          :data-source="[{'ID': 1, 'Name': '직접비'}, {'ID': 2, 'Name': '간접비'}]"
          display-expr="Name"
          value-expr="ID"
        />
        <DxRequiredRule/>
      </DxColumn>
      <DxColumn caption="급여" data-field="salary"/>
      <DxColumn caption="재수당" data-field="bonus" cell-template="employeeSalaryTable"/>
      <DxColumn caption="일용잡금" data-field="dailyWage"/>
      <DxColumn caption="퇴직금 및 퇴직적립금" data-field="severancePay"/>
      <DxColumn caption="사회보험 부담금" data-field="socialInsurancePremiums"/>
      <DxColumn caption="계" cell-template="total" alignment="center"/>
      <template #total="{ data }">
        <span class="px-7">{{ (data.data.salary || 0)  }}</span>
      </template>

      <DxSummary :calculate-custom-summary="calculate" :recalculate-while-editing="true">
        <DxTotalItem cssClass="custom" column="drag" display-format="소계"/>
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
import {
  DxColumn,
  DxDataGrid,
  DxEditing,
  DxGroupItem,
  DxLookup,
  DxRequiredRule,
  DxRowDragging,
  DxSummary,
  DxTotalItem
} from 'devextreme-vue/data-grid';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons-vue';
import DxButton from 'devextreme-vue/button';

import {computed, defineComponent, ref} from 'vue'
import {useStore} from "vuex";
import deletePopup from "@/utils/deletePopup";
import {RowDraggingReorderEvent, RowRemovingEvent} from "devextreme/ui/data_grid";

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxButton,
    DxSummary,
    DxGroupItem,
    DxTotalItem,
    DeleteOutlined,
    EditOutlined,
    DxRowDragging,
    DxEditing,
    DxRequiredRule,
    DxLookup
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const data = [
      {id: 1,key: 1, name: 'John', position: 1, payrollType: 1, salary: 12, bonus: 1, dailyWage: 'aa', severancePay: 'sf', socialInsurancePremiums: 'ag', total: 100},
      {id: 2,key: 2, name: 'John 1', position: 2, payrollType: 2, salary: 12, bonus: 1, dailyWage: 'aa', severancePay: 'sf', socialInsurancePremiums: 'ag', total: 100},
      {id: 3,key: 3, name: 'John 2', position: 3, payrollType: 1, salary: 12, bonus: 1, dailyWage: 'aa', severancePay: 'sf', socialInsurancePremiums: 'ag', total: 100},
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
            options.totalValue += options.value.position || 0;
          // }
        }
      }
    }
    const onReorder = (e: RowDraggingReorderEvent) => {
      const visibleRows = e.component.getVisibleRows();
      const toIndex = dataSource.value.findIndex((item) => item.id === visibleRows[e.toIndex].data.id);
      const fromIndex = dataSource.value.findIndex((item) => item.id === e.itemData.id);
      const newTasks = [...dataSource.value];

      newTasks.splice(fromIndex, 1);
      newTasks.splice(toIndex, 0, e.itemData);

      dataSource.value = newTasks;
    }
    // computed changes set and get
    const changes = computed({
      get() {
        // return store.state.settings.changes;
      },
      set(value: any) {
        // console.log('value-----', value)
        // value[0].data.total =  value[0].data?.position || 0 +  value[0].data?.salary || 0
        // store.commit('settings/setChanges', value);
      }
    });
    const onRowRemoving = async (e: RowRemovingEvent) => {
      deletePopup({
        callback: () => {
          dataSource.value = dataSource.value.filter((item: any) => item.id !== e.data.id)
        }
      })
      e.cancel = true
    }
    const logEvent = (e: any) => {
      // console.log(e)
    }
    return {
      move_column,
      colomn_resize,
      dataSource,
      DeleteOutlined,
      calculate,
      handleDelete,
      onReorder,
      changes,
      onRowRemoving,
      logEvent
    }
  },
  methods: {
    onCellPrepared(e: any) {
      if(!e.cellElement.getAttributeNames().includes('aria-describedby') && e.cellElement.getAttribute('role') === 'gridcell' &&  e.cellElement.getAttribute('aria-colindex') === '2'){
        e.cellElement.colSpan = 3
      }
      // if(e.rowType === "data" && e.column.cellTemplate === "total" && isEmpty(e.data)) {
      //   console.log(e.data)
      // }
    },
    onRowPrepared(e: any) {
      const isRowSummary = e.rowElement.classList.contains('dx-footer-row')
      if(isRowSummary){
        const rowDrag =  e.rowElement.querySelector('.dx-command-drag')
        e.rowElement.removeChild(e.rowElement.lastChild)
        e.rowElement.removeChild(e.rowElement.lastChild)
        // add text first child of e.rowElement
        const text = document.createElement('div')
        text.classList.add('custom')
        text.innerText = '소계'
        rowDrag && rowDrag.appendChild(text)
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
:deep(.dx-header-row .text-red) {
  color:  red;
}
</style>
