<template>
  <a-modal :visible="isModalItemDetail" @cancel="cancel" :mask-closable="false" class="confirm-md ac-110-popup-detail"
    footer="" :width="1000">
    <DxDataGrid key-expr="id" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataDemoMain"
      :show-borders="true" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
      :column-auto-width="true">
      <DxScrolling mode="standard" show-scrollbar="always" />
      <DxColumn caption="품목" cell-template="item" width="100" />
      <template #item="{ data }">
        <select-box-common :arrSelect="arraySelectBox" :required="true" />
      </template>
      <DxColumn caption="규격" cell-template="standard" width="100" />
      <template #standard="{ data }">
        <select-box-common :arrSelect="arraySelectBox" :required="true" />
      </template>
      <DxColumn caption="단위" cell-template="unit" width="100" />
      <template #unit="{ data }">
        <select-box-common :arrSelect="arraySelectBox" :required="true" />
      </template>
      <DxColumn caption="수량" data-field="fill4"></DxColumn>
      <DxColumn caption="단가" data-field="fill4"></DxColumn>
      <DxColumn caption="금액" data-field="fill4"></DxColumn>
      <DxColumn caption="비고" data-field="fill4"></DxColumn>
      <DxColumn caption="삭제" cell-template="action" alignment="center" width="60" />
      <template #action="{ data }">
        <DeleteOutlined style="font-size: 12px" @click="openPopupDeleteItem(data.data)" />
      </template>

      <DxSummary>
        <DxTotalItem column="품목" summary-type="count" display-format="통장내역수: {0}" />
        <DxTotalItem cssClass="custom-sumary" column="단위" :customize-text="totalValue" />
        <DxTotalItem cssClass="custom-sumary" column="단가" :customize-text="totalExpenditure" />
        <DxTotalItem cssClass="custom-sumary" column="비고" :customize-text="totalDifference" />
      </DxSummary>
    </DxDataGrid>

    <div class="ac-110-popup-detail-btn">
      <button-basic text="초기화" type="default" :mode="'contained'" />
    </div>
  </a-modal>
  <PopupMessage :modalStatus="isModalDelete" @closePopup="isModalDelete = false"
    :typeModal="'confirm'" title="물품내역을 삭제하시겠습니까?" content=""
    okText="네. 삭제합니다" :cancelText="Message.getMessage('COMMON', '501').no"
    @checkConfirm="handleDelete" />
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { useStore } from 'vuex';
import { dataDemoMain } from '../utils/index'
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { Message } from "@/configs/enum"
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
    let isModalDelete = ref(false)




    const cancel = () => {
      emit("closePopup", false)
    };
    const submit = () => {
      emit("submit")
    }
    const totalValue = () => {
      return '금액합계: 100'
    }
    const totalExpenditure = () => {
      return '지출액: 100'
    }
    const totalDifference = () => {
      return '차액: 100'
    }
    const openPopupDeleteItem = (data: any) => {
      isModalDelete.value = true
    }
    const handleDelete = () => {

    }
    return {
      move_column,
      colomn_resize,
      arraySelectBox,
      dataDemoMain,
      submit,
      cancel,
      openPopupDeleteItem,
      totalValue,
      totalExpenditure,
      totalDifference,
      isModalDelete,
      Message,
      handleDelete
    }
  },
})
</script>

<style lang="scss" scoped>
.ac-110-popup-detail {
  &-btn {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
