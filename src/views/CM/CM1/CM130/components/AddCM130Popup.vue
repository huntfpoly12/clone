<template>
  <div id="edit-popup-130">
    <a-modal
      :visible="modalStatus"
      :title="title"
      centered
      okText="저장하고 나가기"
      cancelText="그냥 나가기"
      @cancel="setModalVisible()"
      width="50%"
    >
      <h2 style="font-weight: 600; color: gray" class="title_modal">
        급여상세항목
      </h2>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="코드">
            <a-input style="width: 150px; margin-right: 10px" />
          </a-form-item>
          <a-form-item label="항목명">
            <a-input style="width: 150px; margin-right: 10px" />
            <button>중복체크</button>
          </a-form-item>
          <a-form-item label="과세구분/유형 ">
            <a-cascader
              v-model:value="value"
              :options="options"
              expand-trigger="hover"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12"> </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, computed } from "vue";
import type { UnwrapRef } from "vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import type { CascaderProps } from "ant-design-vue";
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
interface FormState {
  name: string;
  영업자코드: string;
  영업자명: string;
  사업자유형: string;
  상태: string;
  등급: string;
  switch: boolean;
  은행: string;
  계좌번호: string;
  등록번호: string;
  예금주: string;
  가입일자: string;
  사업자등록번호: string;
  휴대폰: string;
  비고: string;
  이메일: string;
  연락처: string;
  팩스: string;
  전자세금계산서수신이메일: string;
}
const options: CascaderProps["options"] = [
  {
    value: "과세",
    label: "과세",
    children: [
      {
        value: "G01 비과세항목1 (월10만원), 제출X  ",
        label: "G01 비과세항목1 (월10만원), 제출X  ",
      },
      {
        value: "G02 비과세항목2 (월100만원),  제출O",
        label: "G02 비과세항목2 (월100만원),  제출O",
      },
      {
        value: "G03 비과세항목3, 제출X",
        label: "G03 비과세항목3, 제출X",
      },
      {
        value: "P01  비과세항목4, 제출X",
        label: "P01  비과세항목4, 제출X",
      },
      {
        value: "H01  비과세항목5, 제출O",
        label: "H01  비과세항목5, 제출O",
      },
    ],
  },
  {
    value: "비과세",
    label: "비과세",
    children: [
      {
        value: "G01 비과세항목1 (월10만원), 제출X  ",
        label: "G01 비과세항목1 (월10만원), 제출X  ",
      },
      {
        value: "G02 비과세항목2 (월100만원),  제출O",
        label: "G02 비과세항목2 (월100만원),  제출O",
      },
      {
        value: "G03 비과세항목3, 제출X",
        label: "G03 비과세항목3, 제출X",
      },
      {
        value: "P01  비과세항목4, 제출X",
        label: "P01  비과세항목4, 제출X",
      },
      {
        value: "H01  비과세항목5, 제출O",
        label: "H01  비과세항목5, 제출O",
      },
    ],
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
  },
  created() {},
  data() {
    return {};
  },
  computed: {},
  setup(props) {
    return {
      options,
      value: ref<string[]>([]),
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
::v-deep .ant-form-item-label > label {
  width: 110px;
}
::v-deep .ant-form-item {
  margin-bottom: 10px;
}
</style>
