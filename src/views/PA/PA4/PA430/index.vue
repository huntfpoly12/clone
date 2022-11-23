<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- <a-spin :spinning="loading" size="large"> -->
  <action-header title="계약정보관리&심사" @actionSearch="searching" />
  <div id="pa-430">
    <div class="search-form">
      <a-row :gutter="[24, 8]">
        <div class="dflex custom-flex">
          <a-col>
            <strong class="lable-item">귀속/지급 :</strong>
            <switch-basic
              v-model:valueSwitch="originData.excludeCancel"
              :textCheck="'포함'"
              :textUnCheck="'제외'"
            />
          </a-col>
          <a-col>
            <div class="dflex custom-flex">
              <label class="lable-item">영수일:</label>
              <a-range-picker
                :placeholder="['2022-09', '2022-11']"
                format="YYYY-MM"
                :value="value"
                :mode="mode2"
                locale="ko"
                :format-locale="ko"
                @panelChange="handlePanelChange2"
                @change="handleChange"
              />
            </div>
          </a-col>
          <a-col>
            <div class="dflex selectRatio">
              <strong class="lable-item">구분 :</strong>
              <radio-group
                :arrayValue="arrayRadioCheck"
                v-model:valueRadioCheck="valueRadioBox"
                :layoutCustom="'horizontal'"
              />
            </div>
          </a-col>
        </div>
      </a-row>
    </div>
    <div class="page-content">
      <a-col>
        <div class="content-flex">
          <a-col>
            <div class="dflex custom-flex">
              <strong class="lable-item">서식 설정 :</strong
              ><InfoCircleFilled />
              <span class="content-text-detail">
                본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.
              </span>
            </div>
          </a-col>
          <a-col>
            <div class="dflex custom-flex">
              <label class="lable-item">영수일:</label>
              <date-time-box
                width="220px"
                dateFormat="YYYY-MM-DD"
              ></date-time-box>
            </div>
          </a-col>
        </div>
      </a-col>
      <a-col>
        <strong class="lable-item">소득자보관용 :</strong>
        <switch-basic
          v-model:valueSwitch="originData.excludeCancel2"
          :textCheck="'발행자보관용'"
          :textUnCheck="'발행자보관용'"
        />
      </a-col>
      <DxDataGrid
        :show-row-lines="true"
        :hoverStateEnabled="true"
        :data-source="dataSource"
        :show-borders="true"
        key-expr="id"
        @exporting="onExporting"
        :allow-column-reordering="move_column"
        :allow-column-resizing="colomn_resize"
        :column-auto-width="true"
      >
        <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
        <DxPaging :page-size="rowTable" />
        <DxExport :enabled="true" :allow-export-selected-data="true" />
        <DxToolbar>
          <DxItem name="exportButton" />
          <DxItem name="page" template="pagination-table" location="after" />
          <DxItem name="searchPanel" />
        </DxToolbar>
        <template #pagination-table>
          <div v-if="rowTable > originData.rows">
            <a-pagination
              v-model:current="originData.page"
              v-model:page-size="originData.rows"
              :total="rowTable"
              show-less-items
              @change="searching"
            />
          </div>
        </template>
        <DxColumn caption="checkBox" />

        <DxColumn data-field="companyName" caption="사원" />
        <DxColumn
          data-field="status"
          caption="구분"
          cell-template="grid-cell"
          css-class="cell-center"
        />
        <template #grid-cell="{ data }">
          <a-tag :color="getColorTag(data.value)?.name">{{
            getColorTag(data.value)?.tag_name
          }}</a-tag>
        </template>
        <DxColumn data-field="presidentName" caption="입사일 (정산시작일) " />
        <DxColumn data-field="createdAt" caption="퇴사일 (정산종료일) " />
        <DxColumn data-field="presidentName" caption="지급연월" />
        <DxColumn caption="퇴직급여" />
        <DxColumn caption="비과세 퇴직급여" />
        <DxColumn caption="과세대상 퇴직급여" />
        <DxColumn caption="공제" />
        <DxColumn caption="차인지급액" />
        <DxColumn caption="비고" />
        <DxColumn :width="80" cell-template="pupop" type="buttons" />
        <template #pupop="{ data }" class="custom-action">
          <div class="custom-action">
            <div style="color: blue; cursor: pointer">
              <img
                src="../../../../assets/images/email.png"
                alt=""
                height="20"
                class="mail-430"
                @click="showModal"
              />
            </div>
          </div>
        </template>
      </DxDataGrid>
      <div class="pagination-table" v-if="rowTable > originData.rows">
        <a-pagination
          v-model:current="originData.page"
          v-model:page-size="originData.rows"
          :total="rowTable"
          show-less-items
          @change="searching"
        />
      </div>
    </div>
    <!-- Modal -->
    <template>
      <div>
        <a-button type="primary" @click="showModal">Open Modal</a-button>
        <a-modal
          v-model:visible="visible"
          @ok="handleOk"
          okText="네. 발송합니다"
          cancelText="아니요"
          centered
        >
          <a-col class="modal-email-pa430">
            <div class="dflex custom-flex">
              <img
                src="../../../../assets/images/email.png"
                alt=""
                height="45"
                class="modal-mail-430"
              />
              <input
                class="input-email"
                type="text"
                placeholder="abc@example.com"
              />
              <label class="lable-item">로 메일을 발송하시겠습니까? </label>
            </div>
          </a-col>
        </a-modal>
      </div>
    </template>
  </div>
  <!-- </a-spin> -->
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import { useQuery } from "@vue/apollo-composable";
import dayjs from "dayjs";
import { ko } from "date-fns/locale";

import {
  SearchOutlined,
  EditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  PrinterOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons-vue";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
  DxPager,
  DxToolbar,
  DxItem,
} from "devextreme-vue/data-grid";
import { InfoCircleFilled } from "@ant-design/icons-vue";

import PA430Popup from "./components/PA430Popup.vue";
import { dataSearchIndex } from "./utils/index";
import { onExportingCommon } from "../../../../helpers/commonFunction";
// import queries from "../../../../graphql/queries/PA/PA4/PA430/index";
import mutations from "../../../../graphql/mutations/PA/PA4/PA430";
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    PA430Popup,
    SearchOutlined,
    EditOutlined,
    DxPager,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
    DxToolbar,
    DxItem,
    InfoCircleFilled,
  },
  setup() {
    const store = useStore();
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const rangeDate = ref([dayjs().subtract(1, "year"), dayjs()]);
    // const dataSource = ref([]);
    const modalStatus = ref(false);
    const idSubRequest = ref();
    const statuses: any = ref([]);
    const trigger = ref<boolean>(true);
    const rowTable = ref();
    const originData = reactive({
      ...dataSearchIndex,
      rows: per_page,
    });
    // fake data
    const dataSource = [
      {
        id: 187,
        status: 10,
        code: "R22111001",
        companyCode: null,
        companyName: "AnTus",
        companyAddress: "서울 강동구 천중로43길 20 213asdq23",
        presidentName: "1251512",
        createdAt: 1668069496098,
        simpleAccountingInfos: [
          {
            name: "12314",
            startYearMonth: "2022/11/18",
            __typename: "SimpleServiceInfo",
          },
        ],
        simpleWithholdingInfo: {
          name: null,
          startYearMonth: "",
          __typename: "SimpleServiceInfo",
        },
        compactSalesRepresentative: {
          id: 11,
          code: "S0011",
          name: "sale 13",
          active: true,
          __typename: "CompactSalesRepresentative",
        },
        __typename: "SubscriptionRequestView",
      },
      {
        id: 186,
        status: 20,
        code: "R22110301",
        companyCode: null,
        companyName: "123",
        companyAddress: "서울 강동구 천중로43길 20 123",
        presidentName: "1241245",
        createdAt: 1667464309560,
        simpleAccountingInfos: [
          {
            name: "5",
            startYearMonth: "2022/11/11",
            __typename: "SimpleServiceInfo",
          },
          {
            name: "66",
            startYearMonth: "2022/11/12",
            __typename: "SimpleServiceInfo",
          },
        ],
        simpleWithholdingInfo: {
          name: null,
          startYearMonth: "2022-02-03T08:31:28.240Z",
          __typename: "SimpleServiceInfo",
        },
        compactSalesRepresentative: {
          id: 1,
          code: "S0001",
          name: "본사",
          active: true,
          __typename: "CompactSalesRepresentative",
        },
        __typename: "SubscriptionRequestView",
      },
      {
        id: 185,
        status: 99,
        code: "R22110201",
        companyCode: null,
        companyName: "121412",
        companyAddress: "서울 강동구 천중로43길 20 ",
        presidentName: "1251251",
        createdAt: 1667383854804,
        simpleAccountingInfos: [
          {
            name: "2",
            startYearMonth: "2022/11/09",
            __typename: "SimpleServiceInfo",
          },
        ],
        simpleWithholdingInfo: {
          name: null,
          startYearMonth: "2022-02-02T10:10:17.012Z",
          __typename: "SimpleServiceInfo",
        },
        compactSalesRepresentative: {
          id: 1,
          code: "S0001",
          name: "본사",
          active: true,
          __typename: "CompactSalesRepresentative",
        },
        __typename: "SubscriptionRequestView",
      },
    ];
    console.log("datafake", dataSource);
    const arrayRadioCheck = ref([
      { id: 0, text: "전체" },
      { id: 1, text: "퇴직소득" },
      { id: 2, text: "중간정산" },
    ]);
    const valueRadioBox = ref(0);
    const mode2 = ref(["month", "month"]);
    const value = ref([]);
    const handleChange = (val: any) => {
      value.value = val;
    };
    const handlePanelChange2 = (val: any, mode: any) => {
      value.value = val;
      mode2.value = [
        mode[0] === "date" ? "month" : mode[0],
        mode[1] === "date" ? "month" : mode[1],
      ];
    };
    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    const getColorTag = (data: any) => {
      if (data == 10) {
        return { name: "red", tag_name: "신청" };
      } else if (data == 20) {
        return { name: "blue", tag_name: "심사중" };
      } else if (data == 30) {
        return { name: "green", tag_name: "승인" };
      } else if (data == 99) {
        return { name: "grey", tag_name: "반려" };
      }
    };
    // const {
    //   refetch: refetchData,
    //   loading,
    //   error,
    //   result,
    // } = useQuery(
    //   queries.searchIncomeRetirementWithholdingReceipts,
    //   { filter: originData },
    //   () => ({
    //     enabled: trigger.value,
    //     fetchPolicy: "no-cache",
    //   })
    // );
    const onExporting = (e: { component: any; cancel: boolean }) => {
      onExportingCommon(e.component, e.cancel, "계약정보관리&심사");
    };

    const formarDate = (date: any) => {
      return dayjs(date).format("YYYY-MM-DD");
    };
    const searching = () => {
      originData.startDate = formarDate(rangeDate.value[0]);
      originData.finishDate = formarDate(rangeDate.value[1]);
      originData.statuses =
        statuses.value == 0 ? [10, 20, 30, 99] : statuses.value;
      trigger.value = true;
      // refetchData();
    };
    // watch(result, (value) => {
    //   if (value) {
    //     rowTable.value =
    //       value.searchIncomeRetirementWithholdingReceipts.totalCount;
    //     dataSource.value =
    //       value.searchIncomeRetirementWithholdingReceipts.datas;
    //     trigger.value = false;
    //   }
    // });
    return {
      // loading,
      valueRadioBox,
      arrayRadioCheck,
      mode2,
      value,
      handleChange,
      handlePanelChange2,
      move_column,
      colomn_resize,
      rangeDate,
      idSubRequest,
      dataSource,
      modalStatus,
      rowTable,
      visible,
      showModal,
      handleOk,
      originData,
      statuses,
      searching,
      onExporting,
      getColorTag,
      ko,
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss" />
