<template>
  <div id="edit-popup-130">
    <a-modal :visible="modalStatus" :title="title" centered okText="저장하고 나가기" cancelText="그냥 나가기"
      @cancel="setModalVisible()" :mask-closable="false" width="50%">
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
          <a-col :span="12">
            <a-form-item label="코드">
              <DxNumberBox v-model:value="formState.itemCode" :min="0" :max="30" :show-spin-buttons="true"
                :width="150" />
            </a-form-item>
            <a-form-item label="항목명">
              <a-input style="width: 150px; margin-right: 10px" v-model:value="formState.name" />
              <button>중복체크</button>
            </a-form-item>
            <a-form-item label="과세구분/유형 ">
              <a-cascader v-model:value="value" :options="options" expand-trigger="hover" />
            </a-form-item>
          </a-col>
          <a-col :span="12"> </a-col>
        </a-row>
      </a-spin>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, computed } from "vue";
import { companyId } from "../../../../../helpers/commonFunction";
import { useQuery, useMutation } from "@vue/apollo-composable";
import mutations from "../../../../../graphql/mutations/CM/CM130/index";
import { DxSelectBox } from "devextreme-vue/select-box";
import type { CascaderProps } from "ant-design-vue";
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
import { any } from "vue-types";
import themes from "devextreme/ui/themes";

const options: CascaderProps["options"] = [
  {
    value: "과세",
    label: "과세",
    children: [
      {
        value: "G01",
        label: "G01 비과세항목1 (월10만원), 제출X  ",
      },
      {
        value: "G02",
        label: "G02 비과세항목2 (월100만원),  제출O",
      },
      {
        value: "G03",
        label: "G03 비과세항목3, 제출X",
      },
      {
        value: "P01",
        label: "P01  비과세항목4, 제출X",
      },
      {
        value: "H01",
        label: "H01  비과세항목5, 제출O",
      },
    ],
  },
  {
    value: "비과세",
    label: "비과세",
  },
];

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
    DxNumberBox
  },

  setup(props, { emit }) {
    const initialState = {
      itemCode: 0,
      taxfreePayItemCode: '',
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
      message.success(`Add new with holding Config pay item success !`, 5);
      setModalVisible();
    })

    const onSubmit = () => {
      formState.taxfreePayItemCode = value.value.length > 1 ? value.value[1] : value.value[0];
      let variables = {
        companyId: companyId,
        imputedYear: parseInt(dayjs().format('YYYY')),
        input: {
          itemCode: formState.itemCode,
          name: formState.name,
          use: formState.use,
          sort: formState.formula,
          tax: true,
          taxfreePayItemCode: formState.taxfreePayItemCode,
        }
      }
      creactConfigPayItem(variables);
    }
    const setModalVisible = () => {
      emit("closePopup", false);
    }
    return {
      formState,
      error,
      onSubmit,
      loading,
      options,
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
