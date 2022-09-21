<template>
  <div id="components-modal-demo-position">
    <a-modal
      :visible="modalStatus"
      :title="title"
      centered
      width="50%"
      :footer="null"
      @cancel="setModalVisible()"
    >
      <h2 style="font-weight: 600; color: gray">
        관할세무서, 지방소득세 납세지 검색
      </h2>
      <div style="text-align: center; margin-top: 32px">
        <search-outlined />
        주소 또는 소재지 ‘읍.면.동’ 이름을 입력하세요
      </div>
      <div style="text-align: center; margin-top: 10px">
        <a-input-search
          v-model:value="search"
          enter-button="검색"
          style="width: 400px"
          @search="onSearch"
        />
      </div>
      <div style="margin: 48px 0">
        <DxDataGrid
          :data-source="dataSource"
          :show-borders="true"
          key-expr="ID"
          :allow-column-reordering="true"
          :allow-column-resizing="true"
          :column-auto-width="true"
          :selection="{ mode: 'single' }"
          @selection-changed="onSelectionChanged"
        >
          <DxSelection mode="single" :show-borders="true" />

          <DxColumn data-field="관할세무서" />

          <DxColumn data-field="지방소득세납세지" />

          <DxColumn data-field="주소" />
        </DxDataGrid>
      </div>
      <div class="btn_submit">
        <a-button type="primary" :disabled="!showEmployeeInfo">확인</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, computed } from "vue";
import { employees } from "../data.js";
import type { UnwrapRef } from "vue";
import { DxSelectBox } from "devextreme-vue/select-box";

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

export default defineComponent({
  props: ["modalStatus", "data", "title"],

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
    return {
      dataSource: employees,
      showEmployeeInfo: false,
      selectedRowNotes: "",
      selectedRowPicture: "",
      employees,
    };
  },
  computed: {},
  setup(props) {
    const data = props.data;
    const visible = ref<boolean>(false);
    const search = ref<string>("");
    const onSearch = (searchValue: string) => {
      console.log("use value", searchValue);
      console.log("or use this.value", search.value);
    };
    return { data, visible, search, onSearch };
  },
  methods: {
    setModalVisible() {
      this.$emit("closePopup", false);
    },
    onSelectionChanged({ selectedRowsData }: any) {
      const data = selectedRowsData[0];

      this.showEmployeeInfo = !!data;
      this.selectedRowNotes = data && data.관할세무서;
      this.selectedRowPicture = data && data.주소;
    },
  },
});
</script>
<style scoped>
#components-modal-demo-position {
  position: relative;
}
.btn_submit {
  position: absolute;
  bottom: 0;
  margin-top: 48px;
  margin-bottom: 16px;
  left: 0;
  right: 0;
  text-align: center;
}
/* .btn_submit button {
  width: 100px;
  height: 32px;
  border: none;
  background-color: #1890ff;
  color: #fff;
  border-radius: 4px;
} */
</style>
