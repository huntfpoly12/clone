<template>
  <div id="step1">
    <a-row gutter="24" class="search-form-custom">
      <a-col>
        <a-form-item label="지급연월">
          <month-picker-box-custom
            v-model:valueDate="datePayment"
            :minDate="new Date('2022-1-1')"
            bgColor="black"
            text="지"
          />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="제작요청상태" label-align="left">
          <div class="custom-note d-flex-center">
            <switch-basic
              v-model:valueSwitch="filter.beforeProduction"
              textCheck="제작요청후"
              textUnCheck="제작요청전"
            />
            <info-tool-tip class="ml-5">
              제작전은 제작요청되지 않은 상태입니다.
            </info-tool-tip>
          </div>
        </a-form-item>
        <div id="checkBoxSearchBF650">
          <CheckboxGroup
            :disabled="!filter.beforeProduction"
            :options="productionStatusesCheckbox"
            v-model:valueCheckbox="filter.productionStatuses"
            size="18"
          />
        </div>
      </a-col>
      <a-col>
        <a-form-item
          label="매니저리스트"
          label-align="left"
          class="fix-width-label"
        >
          <list-manager-dropdown
            v-model:valueInput="filter.companyServiceContractManageUserId"
            width="200px"
            clearButton
          />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item
          label="영업자리스트"
          label-align="left"
          class="fix-width-label"
        >
          <list-sales-dropdown
            v-model:valueInput="filter.companyServiceContractSalesRepresentativeId"
            width="200px"
            clearButton
          />
        </a-form-item>
      </a-col>
      <a-col>
        <switch-basic
          textCheck="해지제외"
          textUnCheck="해지포함"
          v-model:valueSwitch="filter.companyServiceContractActive"
        />
      </a-col>
    </a-row>
    <div class="form-table">
      <a-spin :spinning="loadingTable">
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          :show-borders="true"
          key-expr="index"
          class="mt-10"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          noDataText="내역이 없습니다"
          @selection-changed="selectionChanged"
          style="height: calc(100vh - 320px)"
        >
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" :search-visible-columns="['CompanyNameAndAddress']"/>
          <DxExport :enabled="true" />
          <DxToolbar>
            <DxItem location="before" template="settingExport" />
            <DxItem location="after" template="filterSearch" />
            <DxItem name="searchPanel" />
            <DxItem location="after" name="exportButton" css-class="cell-button-export" />
          </DxToolbar>
          <template #settingExport>
            <DxField label="파일 제작 설정" class="field-custom-auto">
              <div class="custom-note d-flex-center">
                <switch-basic
                  :disabled="true"
                  v-model:valueSwitch="valueDefaultSwitch"
                  textCheck="세무대리인신고"
                  textUnCheck="납세자자진신고"
                />
                <info-tool-tip class="ml-5">
                  본 설정으로 적용된 파일로 다운로드 및 메일발송 됩니다.
                </info-tool-tip>
              </div>
            </DxField>
          </template>
          <template #filterSearch>
            <DxField label="제출연월일" class="field-custom-auto">
              <div class="d-flex-center">
                <date-time-box
                  width="150px"
                  dateFormat="YYYY-MM-DD"
                  v-model:valueDate="dateTime"
                />
                <a-tooltip placement="top" color="black">
                  <template #title>전자신고파일 제작 요청</template>
                  <div
                    class="btn-modal-save"
                    @click="openModalSave()"
                  >
                    <SaveOutlined class="fz-24 ml-5 action-save" />
                    <span style="margin-left: 5px">파일제작요청</span>
                  </div>
                </a-tooltip>
              </div>
            </DxField>
          </template>
          <DxSelection mode="multiple" :fixed="true" />
          <DxColumn
            caption="사업자코드"
            data-field="company.code"
            cell-template="companyCode"
          />
          <template #companyCode="{ data }">
            {{
              `${data.data.company.code} ${
                data.data.companyServiceContract.active ? "" : "[해지]"
              }`
            }}
          </template>
          <DxColumn caption="상호-주소" data-field="CompanyNameAndAddress" cell-template="company" :calculateCellValue="calculateCompanyNameAndAddress"/>
          <template #company="{ data }">
            {{ data.data.company.name }} - {{ data.data.company.address }}
          </template>
          <DxColumn caption="사업자등록번호" data-field="company.bizNumber" cell-template="bizNumber" />
          <template #bizNumber="{ data }">
            <span>
              {{ data.data.company.bizNumber.toString().slice(0, 3) }}-{{
                data.data.company.bizNumber.toString().slice(3, 5)
              }}-{{ data.data.company.bizNumber.toString().slice(5, 10) }}
            </span>
          </template>
          <DxColumn
            caption="최종제작요청일시"
            data-field="lastProductionRequestedAt"
            data-type="date"
            format="yyyy-MM-dd HH:mm"
          />
          <DxColumn caption="제작현황" cell-template="productionStatus" />
          <template #productionStatus="{ data }">
            <template v-if="data.data.lastProductionRequestedAt === null">
              <span class="status-3">제작요청전</span>
            </template>
            <GetStatusTable :data="data.data" />
          </template>
        </DxDataGrid>
        <div
          style="
            border: 1px solid #ddd;
            border-top: none;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 5px 20px;
          "
          class="fs-14"
        >
          <div style="margin-left: 70px">
            <div class="dx-datagrid-summary-item dx-datagrid-text-content">
              전체
              <span style="font-size: 16px">[{{ dataSource.length }}]</span>
            </div>
          </div>
          <div style="margin-right: 20%">
            <span
              class="dx-datagrid-summary-item dx-datagrid-text-content"
              v-html="customTextSummary()"
            />
          </div>
        </div>
      </a-spin>
    </div>
  </div>
  <PopupConfirmSave
    v-if="modalConfirmMail"
    :modalStatus="modalConfirmMail"
    @refresh="refetch"
    @closePopup="modalConfirmMail = false"
    :data="dataModalSave"
  />
</template>
<script lang="ts">
import dayjs from "dayjs";
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { dataSearchUtils } from "../utils";
import { SaveOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import {
  DxColumn,
  DxDataGrid,
  DxItem,
  DxScrolling,
  DxSelection,
  DxSummary,
  DxToolbar,
  DxTotalItem,
  DxSearchPanel,
  DxExport
} from "devextreme-vue/data-grid";
import PopupConfirmSave from "./PopupConfirmSave.vue";
import GetStatusTable from "./GetStatusTable.vue";
import queries from "@/graphql/queries/BF/BF6/BF650/index";
import { useApolloClient, useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";

export default defineComponent({
  components: {
    SaveOutlined,
    DxDataGrid,
    DxToolbar,
    DxSelection,
    DxColumn,
    DxItem,
    DxScrolling,
    DxSummary,
    DxTotalItem,
    PopupConfirmSave,
    GetStatusTable,
    DxSearchPanel,
    DxExport
  },
  props: {
    searchStep: Number,
  },
  setup(props) {
    let datePayment = ref(parseInt(dayjs().format("YYYYMM")));
    let dateTime = ref(dayjs().endOf("month"));
    let valueDefaultSwitch = ref(true);
    let keySelect = ref([]);

    const productionStatusesCheckbox = [
      { id: 0, text: "제작대기" },
      { id: 1, text: "제작중" },
      { id: 2, text: "제작성공" },
      { id: -1, text: "제작실패" },
    ];
    const dataSource: any = ref([]);
    const dataSourceOriginal: any = ref([]);
    const store = useStore();
    const userInfor = computed(() => store.state.auth.userInfor);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const globalYear = computed(() => dayjs().year());
    let trigger = ref(true);
    let modalConfirmMail = ref(false);
    let dataModalSave = ref();
    // ================== GRAPHQL=================
    const filter = reactive(dataSearchUtils);
    const paramSearch = ref({
      paymentYear: globalYear.value,
      paymentMonth: dayjs().month() + 1,
    });
    //  QUERY : searchIncomeBusinessSimplifiedPaymentStatementElectronicFilings
    let {
      refetch: refetchTable,
      loading: loadingTable,
      onError: errorTable,
      result: resultTable,
    } = useQuery(
      queries.searchIncomeWageDailyPaymentStatementElectronicFilingsByYearMonth,
      paramSearch.value,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );

    interface CompanyVariable {
      companyId: number;
      paymentYear: number;
      paymentMonth: number;
    }

    const { client } = useApolloClient();

    const fetchDataStatus = async (companies: CompanyVariable[]) => {
      if (companies.length === 0) return;
      const total = [];
      for (let i = 0; i < companies.length; i++) {
        total.push(
          client
            .query({
              query:
                queries.getElectronicFilingsByIncomeWageDailyPaymentStatement,
              variables: {
                input: {
                  companyId: companies[i].companyId,
                  paymentYear: companies[i].paymentYear,
                  paymentMonth: companies[i].paymentMonth,
                },
              },
            })
            .then(
              (res) =>
                res.data
                  .getElectronicFilingsByIncomeWageDailyPaymentStatement[0]
            )
        );
      }
      try {
        return await Promise.all(total);
      } catch (error) {
        console.error("Error fetching data:", error);
        return false;
      }
    };
    watch(resultTable, async (value: any) => {
      // Filtering the dataSource.value to remove duplicate data.
      let arrDataConvert: any = [];
      value.searchIncomeWageDailyPaymentStatementElectronicFilingsByYearMonth.map(
        (val: any) => {
          let row = arrDataConvert.find(
            (data: any) => data.companyId == val.companyId
          );
          if (row) {
            if (row.lastProductionRequestedAt < val.lastProductionRequestedAt) {
              arrDataConvert.push(val);
            }
          } else {
            arrDataConvert.push(val);
          }
        }
      );
      dataSourceOriginal.value = arrDataConvert.map(
        (item: any, index: number) => ({
          ...item,
          productionStatus: 3,
          index,
        })
      );

      const arrayStatus = await fetchDataStatus(
        arrDataConvert
          .filter((i: any) => i.lastProductionRequestedAt)
          .map((item: any) => ({
            companyId: item.companyId,
            paymentYear: item.paymentYear,
            paymentMonth: item.paymentMonth,
          }))
      );
      if (arrayStatus) {
        dataSourceOriginal.value = dataSourceOriginal.value.map(
          (item: any, index: number) => {
            item.productionStatus = arrayStatus[index]?.productionStatus ?? 3;
            return item;
          }
        );
      }
      dataSource.value = dataSourceOriginal.value.filter(
        (item: any, index: number) => {
          return (
            (filter.companyServiceContractActive
              ? item.companyServiceContract.active
              : item) &&
            (filter.beforeProduction
              ? filter.productionStatuses.length > 0 //
                ? filter.productionStatuses.includes(item.productionStatus)
                : item.productionStatus === 3
              : item.productionStatus === 3)
          );
        }
      );
      trigger.value = false
    });

    errorTable((error: any) => {
      //notification('error', error.message)
    });
    // watch listen productionStatuses change, if all false then beforeProduction = false
    const isBeforeProduction = computed(
      () => filter.productionStatuses.length > 0
    );
    watch(isBeforeProduction, (newValue) => {
      if (!newValue) filter.beforeProduction = false;
    });

    // watch datePayment then refreshTable
    watch(
      datePayment,
      async (value) => {
        paramSearch.value.paymentYear = parseInt(
          value.toString().slice(0, 4)
        );
        paramSearch.value.paymentMonth = parseInt(
          value.toString().slice(4, 6)
        );
        dateTime.value = dayjs(`${value}01`).endOf("month");
        trigger.value = true
      },
      { deep: true }
    );

    // =================== WATCH ====================
    watch(
      () => props.searchStep,
      (newValue) => {
        // trigger.value = true;
        dataSource.value = dataSourceOriginal.value.filter(
          (item: any, index: number) => {
            return (
              (filter.companyServiceContractActive
                ? item.companyServiceContract.active
                : item) &&
              (filter.beforeProduction
                ? filter.productionStatuses.length > 0 //
                  ? filter.productionStatuses.includes(item.productionStatus)
                  : item.productionStatus === 3
                : item.productionStatus === 3) &&
              (filter.companyServiceContractManageUserId
                ? item.companyServiceContract.manageUserId ===
                  filter.companyServiceContractManageUserId
                : item) &&
              (filter.companyServiceContractSalesRepresentativeId
                ? item.companyServiceContract.salesRepresentativeId ===
                  filter.companyServiceContractSalesRepresentativeId
                : item)

            );
          }
        );
      },
      { deep: true }
    );

    // watch beforeProduction of dataSearch
    watch(
      () => filter.beforeProduction,
      (value) => {
        filter.productionStatuses = value ?  [0, 1, 2, -1] : []
      },
      { deep: true }
    );

    let beforeProductionRequest = 0;
    let waitingForProduction = 0;
    let productionInProgress = 0;
    let productionFailed = 0;
    let productionSuccess = 0;
    watch(
      dataSource,
      (value) => {
        const result = value.reduce(
          (acc: any, curr: any) => {
            return [
              acc[0] + (curr.productionStatus === 3 ? 1 : 0),
              acc[1] + (curr.productionStatus === 0 ? 1 : 0),
              acc[2] + (curr.productionStatus === 1 ? 1 : 0),
              acc[3] + (curr.productionStatus === -1 ? 1 : 0),
              acc[4] + (curr.productionStatus === 2 ? 1 : 0),
            ];
          },
          [0, 0, 0, 0, 0]
        );
        beforeProductionRequest = result[0];
        waitingForProduction = result[1];
        productionInProgress = result[2];
        productionFailed = result[3];
        productionSuccess = result[4];
      },
      { deep: true }
    );
    // ================== FUNCTION ==================
    const openModalSave = () => {
      if(keySelect.value.length === 0) {
        notification('warning', Message.getCommonMessage('404').message)
        return
      }
      modalConfirmMail.value = true;
      console.log('%c filter.beforeProduction', 'color: red;', filter.beforeProduction);
      dataModalSave.value = {
        filter: {
          paymentYear: paramSearch.value.paymentYear,
          paymentMonth: paramSearch.value.paymentMonth,
        },
        emailInput: {
          receiverName: userInfor.value.name,
          receiverAddress: userInfor.value.email,
        },
        companyIds: keySelect.value,
      };
    };
    const selectionChanged = (res: any) => {
      keySelect.value = res.selectedRowsData.map((i: any) => i.companyId);
    };
    const customTextSummary = () => {
      return `
      제작요청전 <span style="font-size: 16px">[${beforeProductionRequest}]</span>
      제작대기 <span style="font-size: 16px">[${waitingForProduction}]</span>
      제작중 <span style="font-size: 16px">[${productionInProgress}]</span>
      제작실패 <span style="font-size: 16px">[${productionFailed}]</span>
      제작성공 <span style="font-size: 16px">[${productionSuccess}]</span>`;
    };
    let arr = ref<any>([]);
    let productionStatusArr = ref<any>([]);
    const watchFirstRun = ref(true);

    const reFreshDataGrid = () => {
      if (watchFirstRun.value) {
        dataSource.value = dataSource.value.concat([]);
        dataSource.value = dataSource.value.splice(
          dataSource.value.length - 1,
          1
        );
        watchFirstRun.value = false;
      }
    };
    const refetch = () => {
      trigger.value = true;
      // refetchTable();
    };
    const calculateCompanyNameAndAddress = (rowData: any) => {
      return `${rowData.company.name} - ${rowData.company.address}`
    }
    return {
      customTextSummary,
      loadingTable,
      valueDefaultSwitch,
      datePayment,
      dataModalSave,
      // checkBoxSearch,
      productionStatusesCheckbox,
      filter,
      dataSource,
      colomn_resize,
      move_column,
      modalConfirmMail,
      selectionChanged,
      openModalSave,
      dateTime,
      keySelect,
      refetch,
      calculateCompanyNameAndAddress
    };
  },
});
</script>
<style scoped lang="scss" src="../style/style.scss"></style>
