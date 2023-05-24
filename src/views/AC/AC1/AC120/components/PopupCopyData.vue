<template>
  <a-modal :visible="modalStatus" width="75%" footer="" @cancel="setModalVisible()" :mask-closable="false">
    <div style="text-align: center; margin-top: 32px">
      <h2>여입 대상 지출결의서 검색</h2>
      <span>
        이전 원본 지출결의서를 복사하면 정확하고 빠르게 여입결의서 작성이
        가능합니다.
      </span>
    </div>
    <a-row class="mt-10">
      <a-col :span="24">
        <div class="top-content">
          <a-typography-title :level="5" style="margin-bottom: 0">원본 지출결의서 검색</a-typography-title>
        </div>
      </a-col>
    </a-row>
    <a-row class="mt-10">
      <a-col :span="18">
        <a-form-item class="red" label="대상월">
          <radio-group :arrayValue="arrayRadioMonth" v-model:valueRadioCheck="dataQuerySearchSpendingAccountingDocuments.month
            " :layoutCustom="'horizontal'" :required="true" />
        </a-form-item>
      </a-col>
      <!-- <a-col :span="6">
                <a-form-item label="검색">
                    <default-text-box width="150px"
                        v-model:valueInput="dataQuerySearchSpendingAccountingDocuments.resolutionNumber" />
                </a-form-item>
            </a-col> -->
    </a-row>
    <!-- <div style="margin-top: 10px; display: flex; justify-content: center;">
            <button-basic class="button-form-modal" :text="'검색'" :type="'default'" :mode="'contained'"
                @onClick="onSearch" />
        </div> -->
    <a-spin tip="Loading..." :spinning="loadingSearchSpendingAccountingDocuments">
      <div style="margin: 5px 0 48px 0">
        <DxDataGrid noDataText="내역이 없습니다" id="formItemAC120" :show-row-lines="true" :hoverStateEnabled="true"
          :data-source="dataSource" :show-borders="true" key-expr="accountingDocumentId"
          :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          v-model:focused-row-key="focusedRowKey" focused-row-enabled="true" :onRowClick="onSelectionChanged"
          :column-auto-width="true">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
          <DxColumn caption="선택" cell-template="radioCheck" />
          <template #radioCheck="{ data }">
            <div class="text-align-center">
              <input type="radio" name="radioCheck" :checked="focusedRowKey == data.data.accountingDocumentId ? true : false
                " />
            </div>
          </template>
          <DxColumn data-field="resolutionNumber" caption="결의번호" />
          <DxColumn caption="통장" cell-template="bankbook" data-field="bankbook" />
          <template #bankbook="{ data }">
            <a-tooltip placement="top" :title="data.data.bankbook?.type +
              ' ' +
              data.data.bankbook?.bankbookNumber
              ">
              <div>{{ data.data.bankbook?.bankbookNickname }}</div>
            </a-tooltip>
          </template>
          <DxColumn caption="일자" data-field="transactionDetailDate" cell-template="transactionDetailDate" />
          <template #transactionDetailDate="{ data }">
            {{ $filters.formatDate(data.value) }}
          </template>
          <DxColumn caption="결의 구분" data-field="resolutionClassification" cell-template="resolutionClassification"
            width="75" />
          <template #resolutionClassification="{ data }">
            {{
              store.state.common.ac120.arrResolutionClassification.find(
                (item: any) => data.data.resolutionClassification == item.id
              )?.text
            }}
          </template>
          <DxColumn data-field="income" caption="수입액" />
          <DxColumn data-field="spending" caption="지출액" format="fixedPoint" />
          <DxColumn data-field="summaryOfBankbookDetail" caption="통장적요" />
          <DxColumn data-field="summary" caption="적요" />
          <DxColumn caption="계정과목" data-field="accountCode" width="220" cell-template="accountCode" />
          <template #accountCode="{ data }">
            <account-code-select :valueInput="data.data.accountCode" :readOnly="true" />
          </template>
          <DxColumn caption="상대계정" data-field="relationCode" width="220" cell-template="relationCode" />
          <template #relationCode="{ data }">
            <account-code-select :valueInput="data.data.relationCode" :readOnly="true" />
          </template>
          <DxColumn caption="자금원천" data-field="fundingSource" css-class="cell-left" cell-template="fundingSource"
            width="75" />
          <template #fundingSource="{ data }">
            {{
              store.state.common.ac120.arrFundingSource?.find(
                (item: any) => data.data.fundingSource == item.id
              )?.text
            }}
          </template>
          <DxColumn caption="거래처" data-field="clientId" cell-template="clientId" width="75" />
          <template #clientId="{ data }">
            {{
              store.state.settings.clients?.find(
                (item: any) => item.value == data.data.clientId
              )?.label
            }}
          </template>
        </DxDataGrid>
      </div>
    </a-spin>
    <div class="btn_submit">
      <a-tooltip placement="top" title="원본결의서 참조없이 여입결의서로 변경">
        <span>
          <button-basic class="button-form-modal1" :text="'원본결의서 반영 안함'" :type="'default'" :mode="'contained'"
            @onClick="onChange" />
        </span>
      </a-tooltip>

      <a-tooltip placement="top" title="선택한 원본결의서 반영하여 여입결의서로 변경">
        <span>
          <button-basic class="button-form-modal2" :text="'원본결의서 반영'" :type="'default'" :mode="'contained'"
            @onClick="onCopy" />
        </span>
      </a-tooltip>

      <button-basic class="button-form-modal3" :text="'반영 취소'" :type="'default'" :mode="'contained'"
        @onClick="setModalVisible()" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue";
import { useStore } from "vuex";
import { DxSelectBox } from "devextreme-vue/select-box";
import queries from "@/graphql/queries/AC/AC1/AC120";
import { useQuery } from "@vue/apollo-composable";
import { companyId, makeDataClean } from "@/helpers/commonFunction";
import { initialArrayRadioMonth } from "../utils";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";
import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import dayjs from "dayjs";

export default defineComponent({
  props: ["modalStatus", "data", "title"],

  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxSelectBox,
    DxSearchPanel,
  },
  setup(props, { emit }) {
    const arrayRadioMonth = initialArrayRadioMonth;
    // config grid
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const acYear = ref<number>(
      parseInt(sessionStorage.getItem("acYear") ?? "0")
    );
    const globalFacilityBizId = ref<number>(
      parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0")
    );
    // let showEmployeeInfo = ref(false);
    const dataSource = ref([]);
    // const search = ref<string>("");
    let dataSelect = ref();
    const formData = computed(() => store.state.common.ac120.formData);
    const triggerQuerySearchSpendingAccountingDocuments = ref<boolean>(true);
    const dataQuerySearchSpendingAccountingDocuments = ref({
      companyId: companyId,
      fiscalYear: acYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      year: acYear.value,
      month: dayjs().month() + 1,
    });

    const focusedRowKey = ref<Number>(1);

    // =================== GRAPHQL ===================
    // query searchSpendingAccountingDocuments
    const {
      result: resSearchSpendingAccountingDocuments,
      loading: loadingSearchSpendingAccountingDocuments,
      onError: errorSearchSpendingAccountingDocuments,
    } = useQuery(
      queries.searchSpendingAccountingDocuments,
      dataQuerySearchSpendingAccountingDocuments.value,
      () => ({
        enabled: triggerQuerySearchSpendingAccountingDocuments.value,
        fetchPolicy: "no-cache",
      })
    );

    // ================== WATCH ================
    // 1. searchSpendingAccountingDocuments
    watch(resSearchSpendingAccountingDocuments, (value) => {
      triggerQuerySearchSpendingAccountingDocuments.value = false;
      dataSource.value = value.searchSpendingAccountingDocuments;
    });
    watch(
      () => dataQuerySearchSpendingAccountingDocuments.value.month,
      (value) => {
        triggerQuerySearchSpendingAccountingDocuments.value = true;
      }
    );

    // ================ FUNCTION ============================================
    errorSearchSpendingAccountingDocuments((e) => {
      dataSource.value = [];
      //notification('error', e.message)
    });

    const setModalVisible = () => {
      emit("closePopup", false);
    };

    const onCopy = () => {
      if (dataSelect.value) {
        formData.value.accountCode = dataSelect.value.accountCode;
        formData.value.relationCode = dataSelect.value.relationCode;
        formData.value.fundingSource = dataSelect.value.fundingSource;
        formData.value.clientId = dataSelect.value.clientId;
        formData.value.letterOfApprovalType =
          dataSelect.value.letterOfApprovalType;
        formData.value.causeUsage = dataSelect.value.causeUsage;
        formData.value.memo =
          `원본 지출결의서: ` + dataSelect.value.accountingDocumentId;

        formData.value.resolutionType = 22;
        formData.value.amount = -formData.value.amount;
        emit("closePopup", false);
        notification("success", Message.getMessage("AC120", "002").message);
      } else {
        notification("error", "항목을 하나만 선택하십시오");
      }
      // emit("dataEmit", dataEmit.value);
    };
    const onChange = () => {
      // if (formData.value.resolutionType == 22) {
      //     formData.value.resolutionType = 11
      // } else if (formData.value.resolutionType == 11) {
      formData.value.resolutionType = 22;
      // }
      formData.value.amount = -formData.value.amount;
      emit("closePopup", false);
      // notification('success', Message.getMessage('AC120', '001').message)
    };
    const onSelectionChanged = (data: any) => {
      dataSelect.value = data.data;
    };

    return {
      store,
      move_column,
      colomn_resize,
      // search,
      // onSearch,
      setModalVisible,
      focusedRowKey,
      onSelectionChanged,
      // showEmployeeInfo,
      dataSource,
      onCopy,
      onChange,
      loadingSearchSpendingAccountingDocuments,

      arrayRadioMonth,
      dataQuerySearchSpendingAccountingDocuments,
    };
  },
});
</script>
<style scoped>
.btn_submit {
  text-align: center;
}

.button-form-modal1 {
  background-color: orange;
}

.button-form-modal1:hover {
  background-color: rgb(207, 135, 0);
}

.button-form-modal2 {
  margin: 0 10px;
}

.button-form-modal3 {
  background-color: gray;
}

.button-form-modal3:hover {
  background-color: rgb(100, 100, 100);
}

:deep .dx-datagrid-header-panel {
  position: absolute;
  top: -40px;
  right: 0;
}

#formItemAC120 {
  max-height: 450px;
  overflow: inherit;
}
</style>
