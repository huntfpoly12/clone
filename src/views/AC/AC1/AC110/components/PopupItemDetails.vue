<template>
  <a-modal
    :visible="isModalItemDetail"
    @cancel="cancel"
    :mask-closable="false"
    class="confirm-md ac-110-popup-detail"
    footer=""
    :width="1000"
  >
    <p class="ac-110-popup-detail-title">물품내역 {{ indexInputChange }}{{ keyInputChange }}</p>
    <a-spin :spinning="false" size="large">
      <standard-form>
        <DxDataGrid
          id="DxDataGrid-ac-110-popup-detail"
          key-expr="id"
          class="mt-20"
          :show-row-lines="true"
          v-model:focused-row-key="rowKeyfocused"
          :data-source="dataSource.statementOfGoodsItems"
          :show-borders="true"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          noDataText="내역이 없습니다"
        >
          <DxToolbar>
            <DxItem
              location="after"
              template="button-add"
              css-class="cell-button-add"
            />
          </DxToolbar>
          <template #button-add>
            <a-tooltip placement="top">
              <template #title>신규</template>
              <div>
                <DxButton icon="plus" @click="addNewRow" :disabled="disabled" />
              </div>
            </a-tooltip>
          </template>
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn caption="품목" cell-template="item" width="150" />
          <template #item="{ data }">
            <SelectSearchEdit
              v-model:valueInput="data.data.item"
              v-model:data="arrSelectItem"
              :required="true"
            />
          </template>
          <DxColumn caption="규격" cell-template="standard" width="150" />
          <template #standard="{ data }">
            <SelectSearchEdit
              v-model:valueInput="data.data.standard"
              v-model:data="arrSelectStandard"
              :required="true"
            />
          </template>
          <DxColumn caption="단위" cell-template="unit" width="150" />
          <template #unit="{ data }">
            <SelectSearchEdit
              v-model:valueInput="data.data.unit"
              v-model:data="arrSelectUnit"
              :required="true"
            />
          </template>
          <DxColumn caption="수량" cell-template="quantity" />
          <template #quantity="{ data }">
            <number-box-money
              v-model:valueInput="data.data.quantity"
              :required="true"
              height="26"
              @changeInput="changeInput('quantity', data.rowIndex)"
              :readOnly="disabled"
            />
          </template>
          <DxColumn caption="단가" cell-template="unitPrice" />
          <template #unitPrice="{ data }">
            <number-box-money
              v-model:valueInput="data.data.unitPrice"
              :required="true"
              height="26"
              @changeInput="changeInput('unitPrice', data.rowIndex)"
              :readOnly="disabled"
            />
          </template>
          <DxColumn caption="금액" cell-template="amount" />
          <template #amount="{ data }">
            <number-box-money
              v-model:valueInput="data.data.amount"
              :value="
                data.data.quantity && 
                data.data.unitPrice &&
                 indexInputChange === data.rowIndex && 
                 (keyInputChange == 'quantity' || keyInputChange == 'unitPrice')
                  ? data.data.quantity * data.data.unitPrice
                  : data.data.amount
              "
              height="26"
              :readOnly="disabled"
              :required="true"
              @changeInput="changeInput('amount', data.rowIndex)"
            />
          </template>
          <DxColumn caption="비고" cell-template="remark" />
          <template #remark="{ data }">
            <default-text-box
              v-model:valueInput="data.data.remark"
              :readOnly="disabled"
            />
          </template>
          <DxColumn
            caption="삭제"
            cell-template="action"
            alignment="center"
            width="60"
          />
          <template #action="{ data }">
            <div :class="{ disabledBtnDelete: disabled }">
              <DeleteOutlined
                style="font-size: 12px"
                @click="openPopupDeleteItem(data.data)"
              />
            </div>
          </template>
        </DxDataGrid>
        <div class="popup-detail-ac-110-sumary">
          <div
            v-html="
              `전체: <span style='font-size: 16px !important'>[${
                dataSource?.statementOfGoodsItems.length || 0
              }]</span>`
            "
          ></div>
          <div v-html="totalValue()"></div>
          <div v-html="totalExpenditure()"></div>
          <div v-html="totalDifference()"></div>
        </div>
        <div class="ac-110-popup-detail-btn">
          <button-basic
            text="반영"
            type="default"
            :mode="'contained'"
            @onClick="submitFormDetail($event)"
            :disabled="isDisableBtnSave || disabled"
          />
        </div>
      </standard-form>
    </a-spin>
  </a-modal>
  <PopupMessage
    :modalStatus="isModalDelete"
    @closePopup="isModalDelete = false"
    :typeModal="'confirm'"
    title="물품내역을 삭제하시겠습니까?"
    content=""
    okText="네. 삭제합니다"
    :cancelText="Message.getMessage('COMMON', '501').no"
    @checkConfirm="handleDelete"
  />
  <PopupMessage
    :modalStatus="isModalConfirmSaveChange"
    @closePopup="isModalConfirmSaveChange = false"
    :typeModal="'confirm'"
    title="정보가 저장되지 않았습니다. 닫으시겠습니까?"
    content=""
    :okText="Message.getMessage('COMMON', '501').yes"
    :cancelText="Message.getMessage('COMMON', '501').no"
    @checkConfirm="handleConfirmChange"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, nextTick } from "vue";
import { useStore } from "vuex";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { InitStatementOfGoods } from "../utils/index";
import {
  DxItem,
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxSelection,
  DxSummary,
  DxTotalItem,
  DxToolbar,
} from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { Message } from "@/configs/enum";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/AC/AC1/AC110";
import { cloneDeep, isEqual } from "lodash";
import { companyId } from "@/helpers/commonFunction";
export default defineComponent({
  props: {
    isModalItemDetail: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
    payload: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DxItem,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxSelection,
    DxSummary,
    DxTotalItem,
    DeleteOutlined,
    DxToolbar,
    DxButton,
  },

  setup(props, { emit }) {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const isModalDelete = ref(false);
    const isModalConfirmSaveChange = ref(false);
    const dataSource: any = ref([]);
    const arrSelectItem: any = ref([]);
    const arrSelectStandard: any = ref([]);
    const arrSelectUnit: any = ref([]);
    const dataSourceCopy: any = ref();
    const itemDelete: any = ref();
    const rowKeyfocused: any = ref(null);
    const triggerSearchStatementOfGoodsItems = ref(false);
    const triggerSearchStatementOfGoodsStandards = ref(false);
    const triggerSearchStatementOfGoodsUnits = ref(false);
    const indexInputChange: any = ref(null);
    const keyInputChange: any = ref('');
    const isDisableBtnSave = ref(true);
    const { onResult: onResultSearchStatementOfGoodsItems } = useQuery(
      queries.searchStatementOfGoodsItems,
      {
        companyId: companyId,
        keyword: null,
      },
      () => ({
        enabled: triggerSearchStatementOfGoodsItems.value,
        fetchPolicy: "no-cache",
      })
    );
    onResultSearchStatementOfGoodsItems((res) => {
      arrSelectItem.value = res.data.searchStatementOfGoodsItems.map(
        (item: any) => ({ value: item })
      );
      triggerSearchStatementOfGoodsItems.value = false;
    });

    const { onResult: onResultSearchStatementOfGoodsStandards } = useQuery(
      queries.searchStatementOfGoodsStandards,
      {
        companyId: companyId,
        keyword: null,
      },
      () => ({
        enabled: triggerSearchStatementOfGoodsStandards.value,
        fetchPolicy: "no-cache",
      })
    );

    onResultSearchStatementOfGoodsStandards((res) => {
      arrSelectStandard.value = res.data.searchStatementOfGoodsStandards.map(
        (item: any) => ({ value: item })
      );
      triggerSearchStatementOfGoodsStandards.value = false;
    });

    const { onResult: onResultSearchStatementOfGoodsUnits } = useQuery(
      queries.searchStatementOfGoodsUnits,
      {
        companyId: companyId,
        keyword: null,
      },
      () => ({
        enabled: triggerSearchStatementOfGoodsUnits.value,
        fetchPolicy: "no-cache",
      })
    );

    onResultSearchStatementOfGoodsUnits((res) => {
      arrSelectUnit.value = res.data.searchStatementOfGoodsUnits.map(
        (item: any) => ({ value: item })
      );
      triggerSearchStatementOfGoodsUnits.value = false;
    });

    watch(
      () => props.data,
      (value) => {
        indexInputChange.value = null
        keyInputChange.value = ''
        if (!props.isModalItemDetail) return;
        triggerSearchStatementOfGoodsItems.value = true;
        triggerSearchStatementOfGoodsStandards.value = true;
        triggerSearchStatementOfGoodsUnits.value = true;
        dataSource.value = cloneDeep(value);
        setData();
      }
    );
    const setData = () => {
      if (!!dataSource.value.statementOfGoodsItems) {
        dataSource.value.statementOfGoodsItems =
          dataSource.value.statementOfGoodsItems.map(
            (item: any, index: number) => {
              return {
                ...item,
                id: index,
              };
            }
          );
      } else {
        dataSource.value.statementOfGoodsItems = [];
      }
      dataSourceCopy.value = cloneDeep(dataSource.value.statementOfGoodsItems);
    };

    const cancel = () => {
      if (
        !isEqual(dataSourceCopy.value, dataSource.value.statementOfGoodsItems)
      ) {
        isModalConfirmSaveChange.value = true;
      } else {
        emit("closePopup", false);
      }
    };
    const handleConfirmChange = (status: Boolean) => {
      if (status) {
        isModalConfirmSaveChange.value = false;
        emit("closePopup", false);
      } else {
        isModalConfirmSaveChange.value = false;
      }
    };
    const totalValue = (key?: string, index?: number) => {
      let total = 0;
      dataSource.value.statementOfGoodsItems.forEach((item: any, i: number) => {
        if (index === i) {
          if (key === "amount") {
            if (item.amount) {
              total += item.amount;
            }
          } else {
            if (item.quantity && item.unitPrice) {
              total += item.quantity * item.unitPrice;
            }
          }
        } else {
          if (item.amount) {
            total += item.amount;
          }
        }
      });
      return `금액합계: <span style='font-size: 16px !important'>[${formatNumber(
        total
      )}]</span>`;
    };
    const totalExpenditure = () => {
      const spending = dataSource.value.spending || 0;
      return `지출액: <span style='font-size: 16px !important'>[${formatNumber(
        spending
      )}]<span/>`;
    };
    const totalDifference = (key?: string, index?: number) => {
      let total = 0;
      const spending = dataSource.value.spending || 0;
      dataSource.value.statementOfGoodsItems.forEach((item: any, i: number) => {
        if (index === i) {
          if (key === "amount") {
            if (item.amount) {
              total += item.amount;
            }
          } else {
            if (item.quantity && item.unitPrice) {
              total += item.quantity * item.unitPrice;
            }
          }
        } else {
          if (item.amount) {
            total += item.amount;
          }
        }
      });
      const result = spending - total;
      isDisableBtnSave.value =
        result !== 0 && dataSource.value.statementOfGoodsItems.length;
      return `차액: <span style='font-size: 16px !important'>[${formatNumber(
        result
      )}]</span>`;
    };
    const openPopupDeleteItem = (data: any) => {
      if (props.disabled) return;
      itemDelete.value = data;
      isModalDelete.value = true;
    };
    const handleDelete = (status: Boolean) => {
      indexInputChange.value = null
      keyInputChange.value = ''
      if (!status) return;
      dataSource.value.statementOfGoodsItems =
        dataSource.value.statementOfGoodsItems.filter(
          (item: any) => item.id.toString() !== itemDelete.value.id.toString()
        );
    };
    const submitFormDetail = (event: any) => {
      const res = event.validationGroup.validate();
      if (!res.isValid) return;
      const dataTable = dataSource.value.statementOfGoodsItems.map(
        (item: any) => {
          return {
            amount: item.amount,
            item: item.item,
            quantity: item.quantity,
            remark: item.remark,
            standard: item.standard,
            unit: item.unit,
            unitPrice: item.unitPrice,
          };
        }
      );
      dataSourceCopy.value = cloneDeep(dataSource.value.statementOfGoodsItems);
      emit("updateGoodsCount", props.data.accountingDocumentId, dataTable);
      notification("success", "반영되었습니다.");
      emit("closePopup", false);
    };
    const addNewRow = () => {
      indexInputChange.value = null
      keyInputChange.value = ''
      const lengthArr = dataSource.value.statementOfGoodsItems.length;
      let newObj: any = {};
      if (!!dataSource.value.statementOfGoodsItems && lengthArr) {
        newObj = {
          ...InitStatementOfGoods,
          id:
            dataSource.value.statementOfGoodsItems[lengthArr - 1].id + "create",
        };
        dataSource.value.statementOfGoodsItems = [
          ...dataSource.value.statementOfGoodsItems,
          { ...newObj },
        ];
        nextTick(() => {
          setTimeout(() => {
            rowKeyfocused.value = newObj.id;
          }, 100);
        });
      } else {
        newObj = { ...InitStatementOfGoods, id: "create" };
        dataSource.value.statementOfGoodsItems = [{ ...newObj }];
      }
    };

    const formatNumber = (value: number) => {
      if (Number.isInteger(value)) {
        return new Intl.NumberFormat().format(value);
      } else {
        return 0;
      }
    };
    const changeInput = (key: string, index: number) => {
      indexInputChange.value = index
      keyInputChange.value = key
      totalValue(key, index);
      totalDifference(key, index);
    };

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
      addNewRow,
      dataSource,
      arrSelectItem,
      arrSelectStandard,
      arrSelectUnit,
      handleConfirmChange,
      changeInput,
      rowKeyfocused,
      isDisableBtnSave,
      indexInputChange,
      keyInputChange
    };
  },
});
</script>

<style lang="scss" scoped>
.ac-110-popup-detail {
  &-title {
    text-align: center;
    margin: 0;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }

  &-btn {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}

#DxDataGrid-ac-110-popup-detail {
  max-height: 60vh;
  :deep .dx-freespace-row {
    display: none !important;
  }
}
.popup-detail-ac-110-sumary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  border: 1px solid #ddd;
  border-top: none;
  padding: 7px;
  color: rgba(51, 51, 51, 0.7);
}
.disabledBtnDelete {
  pointer-events: none;
  opacity: 0.5;
}
</style>
