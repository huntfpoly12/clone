<template>
  <a-modal :visible="isModalItemDetail" @cancel="cancel" :mask-closable="false" class="confirm-md ac-110-popup-detail"
    footer="" :width="1000">
    <p class="ac-110-popup-detail-title">물품내역</p>
    <a-spin :spinning="loadingSaveStatementOfGoods || loadingDeleteStatementOfGoods" size="large">
      <standard-form>
        <DxDataGrid id="DxDataGrid-ac-110-popup-detail" key-expr="id" class="mt-20" :show-row-lines="true" v-model:focused-row-key="rowKeyfocused"
          :data-source="dataSource.statementOfGoodsItems" :show-borders="true" :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize" :column-auto-width="true">
          <DxToolbar>
            <DxItem location="after" template="button-add" css-class="cell-button-add" />
          </DxToolbar>
          <template #button-add>
            <a-tooltip placement="top">
              <template #title>신규</template>
              <div>
                <DxButton icon="plus" @click="addNewRow" :disabled="disabled"/>
              </div>
            </a-tooltip>
          </template>
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn caption="품목" cell-template="item" width="150" />
          <template #item="{ data }">
            <custom-item-select-box v-model:valueInput="data.data.item" :arrSelect="arrSelectItem" :required="true" :readOnly="disabled" />
          </template>
          <DxColumn caption="규격" cell-template="standard" width="150" />
          <template #standard="{ data }">
            <custom-item-select-box v-model:valueInput="data.data.standard" :arrSelect="arrSelectStandard"
              :required="true" :readOnly="disabled" />
          </template>
          <DxColumn caption="단위" cell-template="unit" width="150" />
          <template #unit="{ data }">
            <custom-item-select-box v-model:valueInput="data.data.unit" :arrSelect="arrSelectUnit" :required="true" :readOnly="disabled"/>
          </template>
          <DxColumn caption="수량" cell-template="quantity" />
          <template #quantity="{ data }">
            <number-box-money v-model:valueInput="data.data.quantity" :required="true" height="26" @changeInput="changeInput('quantity', data.rowIndex)" :readOnly="disabled" />
          </template>
          <DxColumn caption="단가" cell-template="unitPrice" />
          <template #unitPrice="{ data }">
            <number-box-money v-model:valueInput="data.data.unitPrice" :required="true" height="26" @changeInput="changeInput('unitPrice', data.rowIndex)" :readOnly="disabled" />
          </template>
          <DxColumn caption="금액" cell-template="amount"/>
          <template #amount="{ data }">
            <number-box-money v-model:valueInput="data.data.amount" 
            :value="data.data.quantity && data.data.unitPrice ? data.data.quantity * data.data.unitPrice : 0" 
            height="26" :readOnly="disabled"  :required="true" @changeInput="changeInput('amount', data.rowIndex)"/>
          </template>
          <DxColumn caption="비고" cell-template="remark" />
          <template #remark="{ data }">
            <default-text-box v-model:valueInput="data.data.remark" :readOnly="disabled"/>
          </template>
          <DxColumn caption="삭제" cell-template="action" alignment="center" width="60" />
          <template #action="{ data }">
            <DeleteOutlined style="font-size: 12px" @click="openPopupDeleteItem(data.data)" />
          </template>

          <DxSummary>
            <DxTotalItem column="품목" summary-type="count" display-format="전체: {0}" />
            <DxTotalItem cssClass="custom-sumary refPopupDetail110TotalValue" column="단위" :customize-text="totalValue" />
            <DxTotalItem cssClass="custom-sumary" column="단가" :customize-text="totalExpenditure" />
            <DxTotalItem cssClass="custom-sumary refPopupDetail110TotalDifference" column="비고" :customize-text="totalDifference" />
          </DxSummary>
        </DxDataGrid>
        <div class="ac-110-popup-detail-btn">
          <button-basic text="저장" type="default" :mode="'contained'" @onClick="submitFormDetail($event)" :disabled="disabled" />
        </div>
      </standard-form>
    </a-spin>
  </a-modal>
  <PopupMessage :modalStatus="isModalDelete" @closePopup="isModalDelete = false" :typeModal="'confirm'"
    title="물품내역을 삭제하시겠습니까?" content="" okText="네. 삭제합니다" :cancelText="Message.getMessage('COMMON', '501').no"
    @checkConfirm="handleDelete" />
  <PopupMessage :modalStatus="isModalConfirmSaveChange" @closePopup="isModalConfirmSaveChange = false"
    :typeModal="'confirm'" title="정보가 저장되지 않았습니다. 닫으시겠습니까?" content="" :okText="Message.getMessage('COMMON', '501').yes"
    :cancelText="Message.getMessage('COMMON', '501').no" @checkConfirm="handleConfirmChange" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, nextTick } from 'vue'
import { useStore } from 'vuex';
import { useMutation } from "@vue/apollo-composable";
import { InitStatementOfGoods } from '../utils/index'
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxToolbar } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { Message } from "@/configs/enum"
import notification from '@/utils/notification';
import mutations from "@/graphql/mutations/AC/AC1/AC110";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxSelectBox from "devextreme-vue/select-box";
import { cloneDeep, isEqual } from 'lodash';
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
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DeleteOutlined, DxToolbar, DxButton, DxValidator, DxRequiredRule, DxSelectBox,
  },

  setup(props, { emit }) {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    let isModalDelete = ref(false)
    let isModalConfirmSaveChange = ref(false)
    let dataSource: any = ref([])
    let arrSelectItem: any = ref([])
    let arrSelectStandard: any = ref([])
    let arrSelectUnit: any = ref([])
    let dataSourceCopy: any = ref()
    let itemDelete: any = ref()
    let rowKeyfocused: any = ref(null)
    // graphql
    const {
      mutate: deleteStatementOfGoods,
      onDone: doneDeleteStatementOfGoods,
      onError: errorDeleteStatementOfGoods,
      loading: loadingDeleteStatementOfGoods,
    } = useMutation(mutations.deleteStatementOfGoods);
    doneDeleteStatementOfGoods((e) => {
      dataSource.value.statementOfGoodsItems = []
      emit("updateGoodsCount",  props.data.accountingDocumentId, dataSource.value.statementOfGoodsItems)
      setData()
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
      emit("updateGoodsCount",  props.data.accountingDocumentId, dataSource.value.statementOfGoodsItems)
      setData()
      notification('success', Message.getMessage('COMMON', '106').message)
    })
    errorSaveStatementOfGoods(e => {
      notification('error', e.message)
    })
    watch(() => props.data, (value) => {
      dataSource.value = cloneDeep(value)
      setData()
    })
    const setData = () => {
      if (!!dataSource.value.statementOfGoodsItems) {
        dataSource.value.statementOfGoodsItems = dataSource.value.statementOfGoodsItems.map((item: any, index: number) => {
          return {
            ...item,
            id: index
          }
        })
      } else {
        dataSource.value.statementOfGoodsItems = []
      }
      dataSourceCopy.value = cloneDeep(dataSource.value.statementOfGoodsItems)
    }
    watch(() => dataSource.value.statementOfGoodsItems, (value, oldValue) => {
      if(!value) return
      const lengthOldVal = !!oldValue ? oldValue.length : 0
      if(value.length !== lengthOldVal){
        setDataSelect()
      }
    }, {
      deep: true,
    }) 

    const setDataSelect = () => {
      dataSource.value.statementOfGoodsItems.forEach((item: any, index: number) => {
        if(!!item.item && !arrSelectItem.value.some((option: any) => option.value === item.item.toString().trim())){
          arrSelectItem.value = [...arrSelectItem.value, { id: index, value: item.item.toString().trim() }]
        }
        if(!!item.standard && !arrSelectStandard.value.some((option: any) =>  option.value === item.standard.toString().trim())){
          arrSelectStandard.value = [...arrSelectStandard.value, { id: index, value: item.standard.toString().trim() }]
        }
        if(!!item.unit && !arrSelectUnit.value.some((option: any) =>  option.value === item.unit.toString().trim())){
          arrSelectUnit.value = [...arrSelectUnit.value, { id: index, value: item.unit.toString().trim() }]
        }
      })
    }

    const cancel = () => {
      if (!isEqual(dataSourceCopy.value, dataSource.value.statementOfGoodsItems)) {
        isModalConfirmSaveChange.value = true
      } else {
        emit("closePopup", false)
      }
    };
    const handleConfirmChange = (status: Boolean) => {
      if (status) {
        isModalConfirmSaveChange.value = false
        emit("closePopup", false)
      } else {
        isModalConfirmSaveChange.value = false
      }
    }
    const totalValue = (key: string, index: number) => {
      let total = 0;
      dataSource.value.statementOfGoodsItems.forEach((item: any, i: number) => {
        if(index === i) {
          if(key === 'amount') {
            if(item.amount){
              total += item.amount
            }
          }else{
            if(item.quantity && item.unitPrice){
              total += item.quantity * item.unitPrice
            }
          }
        }else {
          if(item.amount){
            total += item.amount
          }
        }
      });
      return `금액합계: ${formatNumber(total)}`
    }
    const totalExpenditure = () => {
      const spending = dataSource.value.spending || 0
      return `지출액: ${formatNumber(spending)}`
    }
    const totalDifference = (key: string, index: number) => {
      let total = 0;
      const spending = dataSource.value.spending || 0
      dataSource.value.statementOfGoodsItems.forEach((item: any, i: number) => {
        if(index === i) {
          if(key === 'amount') {
            if(item.amount){
              total += item.amount
            }
          }else{
            if(item.quantity && item.unitPrice){
              total += item.quantity * item.unitPrice
            }
          }
        }else {
          if(item.amount){
            total += item.amount
          }
        }
      });
      const result = spending - total
      return `차액: ${formatNumber(result)}`
    }
    const openPopupDeleteItem = (data: any) => {
      if(props.disabled) return
      itemDelete.value = data
      isModalDelete.value = true
    }
    const handleDelete = (status: Boolean) => {
      if (!status) return
      if (dataSource.value.statementOfGoodsItems.length === 1 && !dataSource.value.accountingDocumentId.toString().includes('create')) {
        const payloadRequest = { ...props.payload }
        delete payloadRequest.bankbookDetailDate
        delete payloadRequest.bankbookDetailId
        deleteStatementOfGoods({
          ...payloadRequest,
          transactionDetailDate: dataSource.value.transactionDetailDate,
          accountingDocumentId: dataSource.value.accountingDocumentId
        })
      } else {
        dataSource.value.statementOfGoodsItems = dataSource.value.statementOfGoodsItems.filter((item: any) => item.id.toString() !== itemDelete.value.id.toString())
      }
    }
    const submitFormDetail = (event: any) => {
      const res = event.validationGroup.validate();
      if (!res.isValid) return
      const payloadRequest = { ...props.payload }
      const dataTable = dataSource.value.statementOfGoodsItems.map((item: any) => {
        return {
          amount: item.amount,
          item: item.item,
          quantity: item.quantity,
          remark: item.remark,
          standard: item.standard,
          unit: item.unit,
          unitPrice: item.unitPrice
        }
      })
      if(!dataSource.value.accountingDocumentId.toString().includes('create')) {
        const payloadClear = makeDataClean({
          ...payloadRequest,
          transactionDetailDate: dataSource.value.transactionDetailDate,
          accountingDocumentId: dataSource.value.accountingDocumentId,
          items: dataTable
        })
        saveStatementOfGoods(payloadClear)
      }else {
        setData()
        emit("updateGoodsCount",  props.data.accountingDocumentId, dataTable)
        notification('success', Message.getMessage('COMMON', '106').message)
      }
    }
    const addNewRow = () => {
      const lengthArr = dataSource.value.statementOfGoodsItems.length
      let newObj: any = {}
      if (!!dataSource.value.statementOfGoodsItems && lengthArr) {
        newObj = { ...InitStatementOfGoods, id: dataSource.value.statementOfGoodsItems[lengthArr - 1].id + 'create' }
        dataSource.value.statementOfGoodsItems = [ ...dataSource.value.statementOfGoodsItems, {...newObj} ]
        nextTick(() => {
          setTimeout(() => {
            rowKeyfocused.value = newObj.id
          }, 100)
        })
      } else {
        newObj = { ...InitStatementOfGoods, id: 'create' }
        dataSource.value.statementOfGoodsItems = [{ ...newObj }]
      }
    }

    const formatNumber = (value: number) => {
      if (Number.isInteger(value)) {
        return new Intl.NumberFormat().format(value)
      } else {
        return 0
      }
    }
    const changeInput = (key: string, index: number) => {
      const elTotalValue: any = document.querySelector('.refPopupDetail110TotalValue')
      const elTotalDifference = document.querySelector('.refPopupDetail110TotalDifference')
      if(elTotalValue){
        elTotalValue.textContent = totalValue(key, index)
      }
      if(elTotalDifference){
        elTotalDifference.textContent = totalDifference(key, index)
      }
    }
    return {
      move_column,
      colomn_resize,
      cancel,
      openPopupDeleteItem,
      totalValue,
      totalExpenditure,
      totalDifference,
      isModalDelete,
      isModalConfirmSaveChange,
      Message,
      handleDelete,
      submitFormDetail,
      loadingSaveStatementOfGoods,
      loadingDeleteStatementOfGoods,
      addNewRow,
      dataSource,
      arrSelectItem,
      arrSelectStandard,
      arrSelectUnit,
      handleConfirmChange,
      changeInput,
      rowKeyfocused
    }
  },
})
</script>

<style lang="scss" scoped>
.ac-110-popup-detail {
  &-title {
    text-align: center;
    margin: 0;
    font-size: 18px;
  }

  &-btn {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}

#DxDataGrid-ac-110-popup-detail {
  height: 60vh;

  :deep .dx-freespace-row {
    display: none !important;
  }
}
</style>
