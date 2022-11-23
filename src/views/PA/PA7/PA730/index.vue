<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <a-spin :spinning="loading" size="large">
    <action-header title="기타소득원천징수영수증 " @actionSearch="searching" />
    <div id="pa-730">
      <div class="search-form">
        <a-row>
          <a-col :span="22">
            <a-row :gutter="[24, 8]">
              <a-col>
                <div class="dflex custom-flex global-year">
                  <label class="lable-item">귀속연도 :</label>
                  <a-tag color="#a3a2a0">귀 {{ globalYear }}</a-tag>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
      <div class="page-content">
        <a-row style="margin-bottom: 20px">
          <a-col :span="12">
            <div class="format-settings">
              <strong>서식 설정 : </strong>
              <div class="format-settings-text">
                <InfoCircleFilled /> 본 설정으로 적용된 서식으로 출력 및
                메일발송 됩니다.
              </div>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="created-date">
              <label class="lable-item">영수일: </label>
              <date-time-box
                width="150px"
                v-model:valueDate="valueDefaultIncomeBusiness.input.receiptDate"
              ></date-time-box>
            </div>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 20px">
          <a-col :span="24">
            <label class="lable-item">소득자보관용</label>
            <switch-basic
              style="width: 120px"
              v-model:valueSwitch="valueSwitch"
              :textCheck="'소득자보관용'"
              :textUnCheck="'지급자보관용'"
            />
          </a-col>
        </a-row>

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
          <DxExport :enabled="true" :allow-export-selected-data="true" />
          <DxToolbar>
            <DxItem name="searchPanel" />
            <DxItem name="exportButton" />
            <DxItem name="groupPanel" />
            <DxItem name="addRowButton" show-text="always" />
            <DxItem name="columnChooserButton" />
            <DxItem
              template="button-template"
              location="after"
              css-class="cell-button-add"
            />
          </DxToolbar>
          <template #button-template>
            <div>
              <DxButton name="mailgroup" icon="plus" />
              <img
                src="../../../../assets/images/group_email.png"
                alt=""
                height="35"
                class="group-mail-730"
                @click="openAddNewModal"
              />
            </div>
          </template>
          <DxColumn caption="성명 (상호)" cell-template="tag" />
          <template #tag="{ data }" class="custom-action">
            <div class="custom-action">
              <employee-info
                :idEmployee="data.data.employeeId"
                :name="data.data.name"
                :idCardNumber="data.data.residentId"
                :status="data.data.status"
                :foreigner="data.data.foreigner"
                :checkStatus="false"
              />
            </div>
          </template>
          <DxColumn caption="주민등록번호" data-field="residentId" />
          <DxColumn caption="소득구분" cell-template="grade-cell" />
          <template #grade-cell="{ data }" class="custom-action">
            <div class="custom-grade-cell">
              <div class="custom-grade-cell-tag">
                {{ data.data.incomeTypeCode }}
              </div>
              <span>{{ data.data.incomeTypeName }}</span>
            </div>
          </template>
          <DxColumn caption="지급총액" data-field="paymentAmount" />
          <DxColumn caption="비과세소득" data-field="withholdingIncomeTax" />
          <DxColumn caption="필요경비" data-field="requiredExpenses" />
          <DxColumn caption="소득금액" data-field="incomePayment" />
          <DxColumn
            caption="원천징수세액 소득세
"
            data-field=""
          />
          <DxColumn
            caption="원천징수세액 지방소득세

"
            data-field="withholdingLocalIncomeTax"
          />
          <DxColumn
            caption="원천징수세액 농어촌특별세
"
          />
          <DxColumn
            caption="원천징수세액 농어촌특별세
"
          />
          <DxColumn :width="80" cell-template="pupop" type="buttons" />
          <template #pupop="{ data }" class="custom-action">
            <div class="custom-action-icon">
              <div style="color: blue; cursor: pointer">
                <img
                  src="../../../../assets/images/email.png"
                  alt=""
                  height="20"
                  class="mail-730"
                  @click="openAddNewModal"
                />
              </div>
              <div class="printer-action">
                <PrinterOutlined />
              </div>
            </div>
          </template>
          <DxSelection
            select-all-mode="allPages"
            show-check-boxes-mode="always"
            mode="multiple"
          />
        </DxDataGrid>
      </div>
    </div>
    <PA730PopupSendMail
      :modalStatus="modalAddNewStatus"
      @closePopupAdd="closePopupAdd"
    />
  </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import { useQuery } from "@vue/apollo-composable";
import { InfoCircleFilled, PrinterOutlined } from "@ant-design/icons-vue";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
  DxToolbar,
  DxItem,
} from "devextreme-vue/data-grid";
import {
  companyId,
  onExportingCommon,
} from "../../../../helpers/commonFunction";
import queries from "../../../../graphql/queries/PA/PA7/PA730/index";
import PA730PopupSendMail from "./components/PA730PopupSendMail.vue";

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxToolbar,
    DxItem,
    InfoCircleFilled,
    PA730PopupSendMail,
    PrinterOutlined,
  },
  setup() {
    const valueSwitch = ref(true);
    const store = useStore();

    const globalYear = computed(() => store.state.settings.globalYear);
    const trigger = ref<boolean>(true);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    // const dataSource = ref([]);

    const dataSource = [
      {
        id: 187,
        paymentAmount: 20,
        withholdingIncomeTax: "R22111001",
        requiredExpenses: null,
        companyName: "AnTus",
        incomePayment: "서울 강동구 천중로43길 20 213asdq23",
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
        paymentAmount: 30,
        withholdingIncomeTax: "R22111001",
        requiredExpenses: null,
        companyName: "AnTus",
        incomePayment: "서울 강동구 천중로43길 20 213asdq23",
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
        id: 183,
        paymentAmount: 40,
        withholdingIncomeTax: "R22111002",
        requiredExpenses: null,
        companyName: "AnTus",
        incomePayment: "서울 강동구 천중로43길 20 213asdq23",
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
    ];

    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear,
    });
    const valueDefaultIncomeBusiness = ref({
      companyId: companyId,
      input: {
        imputedYear: globalYear,
        type: 1,
        receiptDate: new Date().toJSON().slice(0, 10),
      },
      employeeKeys: {
        employeeId: 0,
        incomeTypeCode: "",
      },
    });
    const {
      refetch: refetchData,
      result,
      loading,
    } = useQuery(
      queries.searchIncomeExtraWithholdingReceipts,
      originData,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    const onExporting = (e: { component: any; cancel: boolean }) => {
      onExportingCommon(e.component, e.cancel, "계약정보관리&심사");
    };

    watch(result, (value) => {
      if (value) {
        dataSource.values = value.searchIncomeExtraWithholdingReceipts;
        trigger.value = false;
      }
    });
    watch(valueSwitch, (newValue) => {
      if (newValue) {
        valueDefaultIncomeBusiness.value.input.type = 1;
      } else {
        valueDefaultIncomeBusiness.value.input.type = 2;
      }
    });

    const searching = () => {
      trigger.value = true;
      refetchData();
    };
    const modalAddNewStatus = ref(false);

    const openAddNewModal = () => {
      modalAddNewStatus.value = true;
    };
    const closePopupAdd = () => {
      modalAddNewStatus.value = false;
      refetchData();
    };

    return {
      valueDefaultIncomeBusiness,
      valueSwitch,
      loading,
      searching,
      globalYear,
      dataSource,
      move_column,
      colomn_resize,
      onExporting,
      openAddNewModal,
      closePopupAdd,
      modalAddNewStatus,
    };
  },
});
</script>

<style lang="scss" scoped src="./style/style.scss" />
