<template>
  <a-modal :visible="isModalItemDetail" @cancel="cancel" :mask-closable="false" class="confirm-md" footer=""
    :width="1000">
    <DxDataGrid key-expr="id" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataDemoMain"
            :show-borders="true" :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize" :column-auto-width="true">
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxColumn caption="품목" cell-template="item" />
            <template #item="{data}">
              <select-box-common :arrSelect="arraySelectBox" :required="true" />
            </template>
            <DxColumn caption="규격" cell-template="standard" />
            <template #standard="{data}">
              <select-box-common :arrSelect="arraySelectBox" :required="true" />
            </template>
            <DxColumn caption="단위" cell-template="unit" />
            <template #unit="{data}">
              <select-box-common :arrSelect="arraySelectBox" :required="true" />
            </template>
            <DxColumn caption="수량" data-field="fill4"></DxColumn>
            <DxColumn caption="단가" data-field="fill4"></DxColumn>
            <DxColumn caption="금액" data-field="fill4"></DxColumn>
            <DxColumn caption="비고" data-field="fill4"></DxColumn>
            <DxColumn caption="삭제" cell-template="action" />
            <template #action="{ data }">
              <DeleteOutlined style="font-size: 12px" @click="deleteItem(data.data)"/>
            </template>

            <DxSummary>
              <DxTotalItem column="결의구분" summary-type="count" display-format="통장내역수: {0}" />
              <!-- <DxTotalItem cssClass="custom-sumary" column="수입액" :customize-text="sumOfIncome" />
               <DxTotalItem cssClass="custom-sumary" column="지출액" :customize-text="sumOfExpenses" /> -->
            </DxSummary>
          </DxDataGrid>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { useStore } from 'vuex';
import { dataDemoMain } from '../utils/index'
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  props: {
    isModalItemDetail: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DeleteOutlined
  },

  setup(props, { emit }) {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    let arraySelectBox = reactive([
      {
        value: 1,
        label: '수익사업'
      },
      {
        value: 2,
        label: '자부담'
      },
      {
        value: 3,
        label: '보조금'
      },
      {
        value: 4,
        label: '후원듬'
      }
    ])

    const cancel = () => {
      emit("closePopup", false)
    };
    const submit = () => {
      emit("submit")
    }

    const deleteItem = (data: any) => {
    }
    return {
      move_column,
      colomn_resize,
      arraySelectBox,
      dataDemoMain,
      submit,
      cancel,
      deleteItem
    }
  },
})
</script>

<style lang="scss" scoped>
.ac-110-popup-registrantion-selected {
  &-form {
    &-input {
      display: flex;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
  }
}

.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}

.mr-10 {
  margin-right: 10px;
}

.mt-10 {
  margin-top: 10px;
}
</style>
