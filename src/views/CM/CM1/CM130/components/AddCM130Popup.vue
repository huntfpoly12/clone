<template>
  <div id="edit-popup-130">
    <a-modal :visible="modalStatus" :title="title" centered okText="저장하고 나가기" cancelText="그냥 나가기"
      @cancel="setModalVisible()" :mask-closable="false" width="650px">
      <template #footer>
        <a-button @click="setModalVisible">그냥 나가기</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="onSubmit">
          저장하고 나가기</a-button>
      </template>
      <a-spin tip="Loading..." :spinning="loading">
        <h2 style="font-weight: 600; color: gray" class="title_modal">
          급여상세항목
        </h2>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="코드">
                  <DxNumberBox v-model:value="formState.itemCode" :min="0" :max="30" :show-spin-buttons="true"
                    :width="150" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-switch v-model:checked="formState.use" checked-children="이용중" un-checked-children="이용중지"
                  style="width: 80px; margin-right: 8px" />
              </a-col>
            </a-row>

            <a-form-item label="항목명">
              <a-input style="width: 150px; margin-right: 10px" v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="과세구분/유형 ">
              <div style="width: 320px;">
                <TaxPay v-model:selectedValue="formState.taxPayCode"></TaxPay>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </a-spin>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, watch } from "vue";
import { companyId } from "../../../../../helpers/commonFunction";
import TaxPay from "../../../../../components/TaxPay.vue"
import { useMutation } from "@vue/apollo-composable";
import mutations from "../../../../../graphql/mutations/CM/CM130/index";
import { DxSelectBox } from "devextreme-vue/select-box";
import { message } from "ant-design-vue";
import { DxNumberBox } from "devextreme-vue/number-box";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import {
  SearchOutlined,
  WarningOutlined,
  MailOutlined,
  MenuOutlined,
} from "@ant-design/icons-vue";
import dayjs, { Dayjs } from "dayjs";

export default defineComponent({
  props: ["modalStatus", "data", "msg", "title"],

  components: {
    MenuOutlined,
    SearchOutlined,
    WarningOutlined,
    MailOutlined,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxSelectBox,
    DxNumberBox,
    TaxPay
  },

  setup(props, { emit }) {
    const initialState = {
      itemCode: 0,
      taxPayCode: Array(),
      name: '',
      use: false,
      formula: 0,
    };
    const formState = reactive({ ...initialState });
    const value = ref<string[]>([]);
    // Create With holding Config Pay Item
    const {
      mutate: creactConfigPayItem,
      loading: loading,
      onDone: onDoneAdd,
      onError: errorPayItem,
      error
    } = useMutation(mutations.createWithholdingConfigPayItem);

    errorPayItem((error) => {
      message.error(error.message, 5);
    })
    onDoneAdd((res) => {
      message.success(`원천항목 새로 추가되었습니다!`, 5);
      setModalVisible();
    })

    const onSubmit = () => {
      let variables = {
        companyId: companyId,
        imputedYear: parseInt(dayjs().format('YYYY')),
        input: {
          itemCode: formState.itemCode,
          name: formState.name,
          use: formState.use,
          sort: formState.formula,
          tax: true,
          taxfreePayItemCode: formState.taxPayCode[0] === '비과세' ? formState.taxPayCode[1] : null,
          taxPayItemCode: formState.taxPayCode[0] === '과세' ? formState.taxPayCode[1] : null,
        }
      }
      creactConfigPayItem(variables);
    }
    const setModalVisible = () => {
      Object.assign(formState, initialState);
      emit("closePopup", false);
    }
    return {
      formState,
      error,
      onSubmit,
      loading,
      value,
      setModalVisible
    };
  }

});
</script>
<style lang="scss" scoped>
::v-deep .ant-form-item-label>label {
  width: 110px;
}

::v-deep .ant-form-item {
  margin-bottom: 10px;
}
</style>
