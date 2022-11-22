<template>
  <a-spin :spinning="loading" size="large">
    <action-header title="퇴직소득원천징수영수증" />
    <div id="pa-430">
      <div class="page-content">
        <a-row>
          <a-col :span="36" class="custom-layout">
            <div>
              <div>
                <div>
                  <span>귀속/지급: </span>
                  <switch-basic
                    :textCheck="'지급'"
                    :textUnCheck="'귀속'"
                  ></switch-basic>
                </div>
                <div>
                  <span> 기간 :</span>
                </div>
                <div>
                  <span>구분 :</span>
                </div>
                <div>
                  <radio-group
                    :arrayValue="arrayRadioCheck"
                    v-model:valueRadioCheck="valueRadioBox"
                    :layoutCustom="'horizontal'"
                  />
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useQuery } from "@vue/apollo-composable";
import notification from "../../../../utils/notification";
import queries from "../../../../graphql/queries/PA/PA6/PA610/index";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
  DxToolbar,
  DxEditing,
  DxGrouping,
  DxScrolling,
  DxItem,
} from "devextreme-vue/data-grid";
import {
  EditOutlined,
  HistoryOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  PrinterOutlined,
  DeleteOutlined,
  SaveOutlined,
  InfoCircleFilled,
} from "@ant-design/icons-vue";
import { onExportingCommon } from "../../../../helpers/commonFunction";
import { origindata, ArrForeigner } from "./utils";
import DxButton from "devextreme-vue/button";
import { companyId } from "../../../../../src/helpers/commonFunction";
import dayjs from "dayjs";
import { Moment } from "moment";
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxScrolling,
    EditOutlined,
    HistoryOutlined,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
    ArrForeigner,
    DxButton,
    InfoCircleFilled,
  },
  setup() {
    const loading = ref(false);
    const arrayRadioCheck = ref([
      { id: 0, text: "전체"},
      { id: 1, text: "퇴직소득" },
      { id: 2, text: "중간정산"},
    ]);
    const valueRadioBox = ref(arrayRadioCheck.value[2]);
// const selectBoxBackground=ref(arrayRadioCheck.value)
// console.log('selectBoxbackground', selectBoxBackground.value)
    // ================GRAPQL==============================================

    // ================FUNCTION============================================

    return {
      loading,
      valueRadioBox,
      arrayRadioCheck,
    };
  },
});
</script>
<style scoped lang="scss" src="./style/style.scss">
</style>
