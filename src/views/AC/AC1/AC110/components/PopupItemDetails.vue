<template>
  <a-modal :visible="isModalItemDetail" @cancel="cancel" :mask-closable="false" class="confirm-md ac-110-popup-detail"
    footer="" :width="1000">
    <a-spin :spinning="loadingSaveStatementOfGoods || loadingDeleteStatementOfGoods" size="large">
      <standard-form>
        <DxDataGrid class="mt-20" :show-row-lines="true" :hoverStateEnabled="true"
          :data-source="dataSource.statementOfGoodsItems" :show-borders="true" :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize" :column-auto-width="true">
          <DxToolbar>
            <DxItem location="after" template="button-add" css-class="cell-button-add" />
          </DxToolbar>
          <template #button-add>
            <a-tooltip placement="top">
              <template #title>신규</template>
              <div>
                <DxButton icon="plus" @click="addNewRow" />
              </div>
            </a-tooltip>
          </template>
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn caption="품목" cell-template="item" width="100" />
          <template #item="{ data }">
            <select-box-common v-model:valueInput="data.data.item"
              :arrSelect="[{ value: data.data.item, id: data.data.item }]" displayeExpr="id" valueExpr="value"
              :required="true" />
          </template>
          <DxColumn caption="규격" cell-template="standard" width="100" />
          <template #standard="{ data }">
            <select-box-common v-model:valueInput="data.data.standard"
              :arrSelect="[{ value: data.data.standard, id: data.data.standard }]" displayeExpr="id" valueExpr="value"
              :required="true" />
          </template>
          <DxColumn caption="단위" cell-template="unit" width="100" />
          <template #unit="{ data }">
            <select-box-common v-model:valueInput="data.data.unit"
              :arrSelect="[{ value: data.data.unit, id: data.data.unit }]" displayeExpr="id" valueExpr="value"
              :required="true" />
          </template>
          <DxColumn caption="수량" data-field="quantity"></DxColumn>
          <DxColumn caption="단가" data-field="unitPrice" format="fixedPoint" alignment="end"></DxColumn>
          <DxColumn caption="금액" data-field="amount" format="fixedPoint" alignment="end"></DxColumn>
          <DxColumn caption="비고" data-field="remark"></DxColumn>
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
          <button-basic text="저장" type="default" :mode="'contained'" @onClick="submitFormDetail($event)" />
        </div>
      </standard-form>
    </a-spin>
  </a-modal>
  <PopupMessage :modalStatus="isModalDelete" @closePopup="isModalDelete = false" :typeModal="'confirm'"
    title="물품내역을 삭제하시겠습니까?" content="" okText="네. 삭제합니다" :cancelText="Message.getMessage('COMMON', '501').no"
    @checkConfirm="handleDelete" />
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { useStore } from 'vuex';
import { useMutation, useQuery } from "@vue/apollo-composable";
import { InitStatementOfGoods } from '../utils/index'
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxToolbar } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { Message } from "@/configs/enum"
import notification from '@/utils/notification';
import mutations from "@/graphql/mutations/AC/AC1/AC110";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxSelectBox from "devextreme-vue/select-box";
import { cloneDeep } from 'lodash';
import { makeDataClean } from "@/helpers/commonFunction"
export default defineComponent({
  props: {
    isModalItemDetail: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => { }
    },
    payload: {
      type: Object,
      default: () => { }
    }
  },
  components: {
    DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DeleteOutlined, DxToolbar, DxButton, DxValidator, DxRequiredRule, DxSelectBox
  },

  setup(props, { emit }) {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    let isModalDelete = ref(false)
    let dataSource: any = ref([])
    // graphql
    const {
      mutate: deleteStatementOfGoods,
      onDone: doneDeleteStatementOfGoods,
      onError: errorDeleteStatementOfGoods,
      loading: loadingDeleteStatementOfGoods,
    } = useMutation(mutations.deleteStatementOfGoods);
    doneDeleteStatementOfGoods((e) => {
      notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorDeleteStatementOfGoods(e => {
      notification('error', e.message)
    })
    const {
      mutate: saveStatementOfGoods,
      onDone: doneSaveStatementOfGoods,
      onError: errorSaveStatementOfGoods,
      loading: loadingSaveStatementOfGoods,
    } = useMutation(mutations.saveStatementOfGoods);
    doneSaveStatementOfGoods((e) => {
      notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorSaveStatementOfGoods(e => {
      notification('error', e.message)
    })
    watch(() => props.data, (value) => {
      dataSource.value = cloneDeep(value)
    })
    const cancel = () => {
      emit("closePopup", false)
    };
    const submit = () => {
      emit("submit")
    }
    const totalValue = () => {
      let total = 0;
      dataSource.value.statementOfGoodsItems.forEach((item: any) => {
        total += item.amount
      });
      return `금액합계: ${total}`
    }
    const totalExpenditure = () => {
      return `지출액: ${dataSource.value.spending || 0}`
    }
    const totalDifference = () => {
      let total = 0;
      dataSource.value.statementOfGoodsItems.forEach((item: any) => {
        total += item.amount
      });
      return `차액: ${dataSource.value.spending || 0}-${total}`
    }
    const openPopupDeleteItem = (data: any) => {
      isModalDelete.value = true
    }
    const handleDelete = () => {
      const payloadRequest = { ...props.payload }
      delete payloadRequest.bankbookDetailDate
      delete payloadRequest.bankbookDetailId
      deleteStatementOfGoods({
        ...payloadRequest,
        transactionDetailDate: dataSource.value.transactionDetailDate,
        accountingDocumentId: dataSource.value.accountingDocumentId
      })
    }
    const submitFormDetail = (event: any) => {
      const res = event.validationGroup.validate();
      if (!res.isValid) return
      const payloadRequest = { ...props.payload }
      const payloadClear = makeDataClean({
        ...payloadRequest,
        transactionDetailDate: dataSource.value.transactionDetailDate,
        accountingDocumentId: dataSource.value.accountingDocumentId,
        items: dataSource.value.statementOfGoodsItems
      })
      saveStatementOfGoods(payloadClear)
    }
    const addNewRow = () => {
      if (dataSource.value.statementOfGoodsItems) {
        dataSource.value.statementOfGoodsItems = [...dataSource.value.statementOfGoodsItems, InitStatementOfGoods]
      } else {
        dataSource.value.statementOfGoodsItems = [InitStatementOfGoods]
      }
    }
    return {
      move_column,
      colomn_resize,
      submit,
      cancel,
      openPopupDeleteItem,
      totalValue,
      totalExpenditure,
      totalDifference,
      isModalDelete,
      Message,
      handleDelete,
      submitFormDetail,
      loadingSaveStatementOfGoods,
      loadingDeleteStatementOfGoods,
      addNewRow,
      dataSource
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
