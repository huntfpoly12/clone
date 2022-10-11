<template>
  <div id="edit-popup-130">
    <a-modal :visible="modalStatus" :title="title" centered okText="저장하고 나가기" cancelText="그냥 나가기"
      @cancel="setModalVisible()" width="50%" :mask-closable="false">
      <a-spin tip="Loading..." :spinning="loading">
        <h2 style="font-weight: 600; color: gray" class="title_modal">
          급여상세항목
        </h2>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="코드">
              <a-input disabled :value="formState.itemCode" style="width: 150px; margin-right: 10px" />
            </a-form-item>
            <a-form-item label="항목명">
              <a-input v-model:value="formState.name" style="width: 150px; margin-right: 10px" />
              <button>중복체크</button>
            </a-form-item>
            <a-form-item label="과세구분/유형 ">
              <a-cascader v-model:value="value" :options="options" expand-trigger="hover" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="12"> </a-col>
        </a-row>
      </a-spin>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { getJwtObject } from "@bankda/jangbuda-common";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { ref, defineComponent, reactive, watch } from "vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import type { CascaderProps } from "ant-design-vue";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);
import queries from "../../../../../graphql/queries/CM/CM130/index";
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
  },
  created() { },
  data() {
    return {};
  },
  computed: {},
  setup(props) {
    let trigger = ref<boolean>(false);
    let companyId: number | null | undefined = null
    const token = sessionStorage.getItem("token");
    if (token) {
      const jwtObject = getJwtObject(token);
      if (jwtObject.userType === 'c') {
        companyId = jwtObject.companyId
      }
    }
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
      taxfreePayItemCode: '',
      name: ''
    };
    const formState = reactive({ ...initialState });

    const { result: resultConfigPayItem, loading, refetch: refetchConfigPayItem } = useQuery(
      queries.getWithholdingConfigPayItem,
      dataQuery,
      () => ({
        fetchPolicy: "no-cache",
      })
    );

    watch(resultConfigPayItem, (value) => {
      if (value) {
        formState.itemCode = value.getWithholdingConfigPayItem.itemCode;
        formState.taxfreePayItemCode = value.getWithholdingConfigPayItem.taxfreePayItemCode;
        formState.name = value.getWithholdingConfigPayItem.name;
      }
    });

    return {
      formState,
      loading,
      options,
      value: ref<string[]>(["과세", "G03"]),
    };
  },
  methods: {
    setModalVisible() {
      this.$emit("closePopup", false);
    },
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
