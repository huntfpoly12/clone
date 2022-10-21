<template>
  <div id="edit-popup-130">
    <a-modal :visible="modalStatus" :title="title" centered okText="저장하고 나가기" cancelText="그냥 나가기"
      @cancel="setModalVisible()" width="700px" :mask-closable="false">
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
                    :width="150" :disabled="true"/>
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
                <TaxPay v-model:selectedValue="formState.taxPayCode" :disabled="true"></TaxPay>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </a-spin>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { DxNumberBox } from "devextreme-vue/number-box";
import { companyId } from "../../../../../helpers/commonFunction";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { ref, defineComponent, reactive, watch } from "vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import { message } from "ant-design-vue";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);
import queries from "../../../../../graphql/queries/CM/CM130/index";
import mutations from "../../../../../graphql/mutations/CM/CM130/index";
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
import TaxPay from "../../../../../components/TaxPay.vue";

export default defineComponent({
  props: ["modalStatus", "data", "msg", "title", "idRowEdit"],

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
    let trigger = ref<boolean>(false);
    const dataQuery = ref();
    watch(
      () => props.modalStatus,
      (newValue) => {
        if (newValue) {
          dataQuery.value = { companyId: companyId, imputedYear: parseInt(dayjs().format('YYYY')), itemCode: props.idRowEdit };
          refetchConfigPayItem();
          trigger.value = true;
        } else {
          Object.assign(formState, initialState);
          trigger.value = false;
        }
      }
    );

    const initialState = {
      itemCode: 0,
      taxPayCode: Array(),
      name: '',
      use: false,
      formula: ''
    };
    const formState = reactive({ ...initialState });

    // get detail withholding config pay item
    const { result: resultConfigPayItem, loading, refetch: refetchConfigPayItem } = useQuery(
      queries.getWithholdingConfigPayItem,
      dataQuery,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );

    watch(resultConfigPayItem, (value) => {
      if (value) {
        formState.itemCode = value.getWithholdingConfigPayItem.itemCode;
        formState.taxPayCode = value.getWithholdingConfigPayItem.taxfreePayItemCode != null ?  ['비과세',value.getWithholdingConfigPayItem.taxfreePayItemCode] : ['과세',value.getWithholdingConfigPayItem.taxPayItemCode];
        formState.name = value.getWithholdingConfigPayItem.name;
        formState.use = value.getWithholdingConfigPayItem.use;
        formState.formula = value.getWithholdingConfigPayItem.formula;
      }
    });

    // update detail withholding config pay item
    const { mutate: actionUpdateWithholdingConfigPayItem, onDone: onDoneUpdated, onError: errorPayItem } = useMutation(
      mutations.updateWithholdingConfigPayItem
    );

    errorPayItem((error) => {
      message.error(error.message, 5);
    })
    onDoneUpdated(() => {
      message.success(`업데이트 성공되었습니다!`, 4);
      refetchConfigPayItem();
      setModalVisible();
    });

    const onSubmit = () => {
      let variables = {
        companyId: companyId,
        imputedYear: parseInt(dayjs().format('YYYY')),
        itemCode: formState.itemCode,
        input: {
          name: formState.name,
          use: formState.use,
          formula: formState.formula
        }
      };
      actionUpdateWithholdingConfigPayItem(variables)
    };
    const setModalVisible = () => {
      emit("closePopup", false);
    }
    return {
      formState,
      loading,
      onSubmit,
      setModalVisible,
      value: ref<string[]>(["과세", "G03"]),
    };
  },
  methods: {

  },
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
