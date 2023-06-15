<template>
  <div id="step2">
    <a-row gutter="24" class="search-form-step-1">
      <a-col>
        <a-form-item label="지급연월" label-align="left">
          <month-picker-box-custom
            v-model:valueDate="datePayment"
            bgColor="black"
            text="지"
          />
        </a-form-item>
      </a-col>
      <a-col class="ml-30">
        <a-form-item label="제작요청상태" label-align="left">
          <div class="custom-note d-flex-center">
            <switch-basic
              v-model:valueSwitch="setBefore"
              textCheck="제작요청후"
              textUnCheck="제작요청전"
            />
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title>
                제작전은 제작요청되지 않은 상태입니다.
              </template>
              <div style="text-align: center">
                <img
                  src="@/assets/images/iconInfo.png"
                  style="width: 14px; height: 14px"
                  class="mb-3 ml-10"
                />
              </div>
            </a-tooltip>
          </div>
        </a-form-item>
        <div class="production-check">
          <CheckboxGroup
            :disabled="dataSearch.beforeProduction"
            :options="productionStatusesCheckbox"
            v-model:valueCheckbox="dataSearch.productionStatuses"
            size="18"
          >
          </CheckboxGroup>
        </div>
      </a-col>
      <a-col class="ml-30 search-company">
        <a-form-item
          label="매니저리스트"
          label-align="left"
          class="fix-width-label"
        >
          <list-manager-dropdown
            v-model:valueInput="dataSearch.manageUserId"
            width="160"
          />
        </a-form-item>
        <a-form-item
          label="영업자리스트"
          label-align="left"
          class="fix-width-label"
        >
          <list-sales-dropdown
            v-model:valueInput="dataSearch.salesRepresentativeId"
            width="160"
          />
        </a-form-item>
      </a-col>
      <a-col class="search-4">
        <switch-basic
          textCheck="해지제외"
          textUnCheck="해지포함"
          v-model:valueSwitch="dataSearch.active"
        />
      </a-col>
    </a-row>

    <div class="form-table">
      <a-spin :spinning="loadingTable">
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="filteredDataSource"
          :show-borders="true"
          key-expr="companyId"
          class="mt-10"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          @selection-changed="selectionChanged"
          id="tab2-bf640"
          noDataText="내역이 없습니다"
        >
          <DxPaging :enabled="false" />
          <DxLoadPanel :enabled="true" :showPane="true" />
          <DxSearchPanel
            :visible="true"
            :highlight-case-sensitive="true"
            placeholder="검색"
          />
          <DxExport :enabled="true" />
          <DxToolbar>
            <DxItem name="total-user" template="total-user" location="before" />
            <DxItem name="request" template="request" location="after" />
            <DxItem name="searchPanel" location="after" />
            <DxItem name="exportButton" location="after" />
          </DxToolbar>
          <template #total-user>
            <div class="title-table d-flex">
              <a-form-item label="파일 제작 설정" label-align="left">
                <div class="custom-note d-flex-center">
                  <switch-basic
                    v-model:valueSwitch="valueDefaultSwitch"
                    textCheck="세무대리인신고"
                    textUnCheck="납세자자진신고"
                    :disabled="true"
                  />
                  <span class="d-flex-center">
                    <info-tool-tip>
                      <span
                        >본 설정으로 적용된 파일로 다운로드 및 메일발송
                        됩니다.</span
                      >
                    </info-tool-tip>
                  </span>
                </div>
              </a-form-item>
              <a-form-item label="제출연월일" label-align="left" class="date-group">
                <div class="d-flex-center">
                  <date-time-box width="150px" v-model:valueDate="dayReport" />
                </div>
              </a-form-item>
            </div>
          </template>
          <template #request>
            <a-tooltip placement="topLeft" color="black">
              <template #title>전자신고파일 제작 요청</template>
              <div class="btn-modal-save" @click="onRequestFile">
                <SaveOutlined class="fz-20 ml-5 action-save" />
                <span style="margin-left: 5px">파일제작요청</span>
              </div>
            </a-tooltip>
          </template>
          <DxSelection mode="multiple" :fixed="true" />
          <DxColumn
            caption="사업자코드"
            data-field="code"
            cell-template="company-code"
          />
          <template #company-code="{ data }: any">
            {{ data.data.companyCode }}
            {{ data.data.active ? "" : "해지" }}
          </template>
          <DxColumn caption="상호 주소" cell-template="상호" />
          <template #상호="{ data }: any">
            {{ data.data.companyName }} -
            {{ data.data.address }}
          </template>
          <DxColumn caption="사업자등록번호" cell-template="bizNumber" />
          <template #bizNumber="{ data }: any">
            <span>
              {{ data.data.bizNumber.toString().slice(0, 3) }}-{{
                data.data.bizNumber.toString().slice(3, 5)
              }}-{{ data.data.bizNumber.toString().slice(5, 10) }}
            </span>
          </template>
          <DxColumn
            caption="최종제작요청일시"
            data-field="lastProductionRequestedAt"
            data-type="date"
            format="yyyy-MM-dd HH:mm"
          />
          <DxColumn caption="제작현황" cell-template="제작현황" width="360" />
          <template #제작현황="{ data }: any">
            <div class="d-flex-center">
              <GetStatusTable
                :dataProcduct="data.data"
                :message="data.data.causeOfProductionFailure"
              />
              <span
                class="before-production-tag"
                v-if="data.data.beforeProduction"
                >제작요청전</span
              >
            </div>
          </template>
        </DxDataGrid>
        <a-row class="fs-14 summary-ctn">
          <a-col span="8">
            <div
              class="dx-datagrid-summary-item dx-datagrid-text-content"
              style="max-width: 60.2%"
            >
              전체
              <span style="font-size: 16px"
                >[{{ filteredDataSource.length }}]</span
              >
            </div>
          </a-col>
          <a-col span="3" class="sum-item"> </a-col>
          <a-col span="3" class="sum-item"> </a-col>
          <a-col span="10" class="sum-item">
            <div
              class="dx-datagrid-summary-item dx-datagrid-text-content"
              v-html="productStatusSummary()"
            ></div>
          </a-col>
        </a-row>
      </a-spin>
    </div>
    <RequestFilePopup
      v-if="modalStatus"
      :requestFileData="requestFileData"
      tab-name="tab2"
      @cancel="onRequestDone"
    />
    <!-- <GetStatusTableHidden :data="data" @productionStatusData="productionStatusData" /> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import {
  checkBoxSearchStep1,
  dataSearchStep2Utils,
  productionStatusesCheckbox,
} from "../utils";
import { SaveOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import {
  DxDataGrid,
  DxSelection,
  DxColumn,
  DxScrolling,
  DxSummary,
  DxTotalItem,
  DxPaging,
  DxSearchPanel,
  DxExport,
  DxToolbar,
  DxItem,
} from "devextreme-vue/data-grid";
import RequestFilePopup from "./RequestFilePopup.vue";
import GetStatusTable from "./GetStatusTable.vue";

import queries from "@/graphql/queries/BF/BF6/BF640/index";
import { useQuery, useMutation, useApolloClient } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import dayjs from "dayjs";
import { Message } from "@/configs/enum";
import CheckboxGroup from "./CheckboxGroup.vue";
import { watchEffect } from "vue";
import { isNumber } from "lodash";
import { DxLoadPanel } from "devextreme-vue";
export default defineComponent({
  components: {
    SaveOutlined,
    DxDataGrid,
    DxSelection,
    DxColumn,
    DxScrolling,
    DxSummary,
    DxTotalItem,
    RequestFilePopup,
    GetStatusTable,
    CheckboxGroup,
    DxLoadPanel,
    DxPaging,
    DxSearchPanel,
    DxExport,
    DxToolbar,
    DxItem,
  },
  props: {
    search: {
      type: Number,
    },
    onSearch: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const globalYear: any = +dayjs().format("YYYY");
    let checkBoxSearch = [...checkBoxSearchStep1];
    let valueDefaultCheckbox = ref(1);
    let valueDefaultSwitch = ref(true);
    let beforeProduction = ref(true);
    let dataSearch: any = ref({ ...dataSearchStep2Utils });
    let defaultDataSource: any = ref([]);
    const store = useStore();
    const userInfor = computed(() => store.state.auth.userInfor);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const datePayment: any = ref(
      dayjs(`${dataSearch.value.paymentYear}${dataSearch.value.paymentMonth}`)
    );
    const dayReport = ref(dayjs().format("YYYYMMDD"));
    const messageDelNoItem = Message.getMessage("COMMON", "404").message;

    // --------------------search production status-----------------------------------------

    const { client } = useApolloClient();
    const fetchDataStatus = async (companies: any) => {
      if (companies.length === 0) return;
      for (let i = 0; i < companies.length; i++) {
        if (companies[i]) {
          await client
            .query({
              query:
                queries.getElectronicFilingsByIncomeBusinessSimplifiedPaymentStatement,
              variables: {
                input: {
                  companyId: companies[i].companyId,
                  paymentYear: companies[i].paymentYear,
                  paymentMonth: companies[i].paymentMonth,
                },
              },
            })
            .then((res) => {
              let productionStatus =
                res.data
                  .getElectronicFilingsByIncomeBusinessSimplifiedPaymentStatement[0]
                  .productionStatus;
              let causeOfProductionFailure =
                res.data
                  .getElectronicFilingsByIncomeBusinessSimplifiedPaymentStatement[0]
                  ?.causeOfProductionFailure;
              productionCount.value--;
              dataSource.value.forEach((item: any) => {
                if (item.companyId == companies[i].companyId) {
                  item.productionStatus = productionStatus;
                  if (productionStatus == -1) {
                    item.causeOfProductionFailure = causeOfProductionFailure;
                  }
                  if (productionStatus == 2) {
                    item.allowSelection = false;
                  }
                }
              });
            })
            .catch((err: any) => err);
        }
      }
    };

    //  QUERY : searchIncomeWageSimplifiedPaymentStatementElectronicFilingsByHalfYear

    const dataSource = ref<any[]>([]);
    const filteredDataSource = ref<any[]>([]);
    let searchIncomeWageParam = ref({
      paymentYear: dataSearch.value.paymentYear,
      paymentMonth: dataSearch.value.paymentMonth,
    });
    let {
      refetch: refetchTable,
      loading: loadingTable,
      onError: errorTable,
      result,
    } = useQuery(
      queries.searchIncomeBusinessSimplifiedPaymentStatementElectronicFilingsByYearMonth,
      searchIncomeWageParam,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    const productionCount = ref(0);
    const beforeCount = ref(0);
    watch(
      result,
      async (newVal: any) => {
        if (newVal) {
          let data =
            newVal.searchIncomeBusinessSimplifiedPaymentStatementElectronicFilingsByYearMonth.map(
              (item: any) => {
                let arrData = {};
                if (item) {
                  arrData = {
                    companyCode: item.company.code,
                    companyName: item.company.name,
                    address: item.company.address,
                    bizNumber: item.company.bizNumber,
                    companyId: item.companyId,
                    lastProductionRequestedAt: item.lastProductionRequestedAt,
                    paymentMonth: item.paymentMonth,
                    paymentYear: item.paymentYear,
                    salesRepresentativeId:
                      item.companyServiceContract.salesRepresentativeId,
                    manageUserId: item.companyServiceContract.manageUserId,
                    active: item.companyServiceContract.active,
                    beforeProduction: item.lastProductionRequestedAt
                      ? false
                      : true,
                    allowSelection: true,
                    causeOfProductionFailure: "",
                  };
                }
                return arrData;
              }
            );
          let result = Object.values(
            data.reduce((acc: any, curr: any) => {
              if (
                !acc[curr.companyId] ||
                dayjs(curr.lastProductionRequestedAt).isBefore(
                  dayjs(acc[curr.companyId].lastProductionRequestedAt)
                )
              ) {
                acc[curr.companyId] = curr;
              }
              return acc;
            }, {})
          );
          dataSource.value = [...result];
          await fetchDataStatus(
            dataSource.value.map((item: any) => {
              if (item.lastProductionRequestedAt) {
                productionCount.value = item.lastProductionRequestedAt
                  ? productionCount.value + 1
                  : productionCount.value;
                return {
                  companyId: item.companyId,
                  paymentYear: item.paymentYear,
                  paymentMonth: item.paymentMonth,
                };
              }
              return;
            })
          );
          if (props.onSearch && productionCount.value == 0) {
            props.onSearch();
          }
        }
      },
      { deep: true }
    );

    errorTable((error: any) => {
      //notification('error', error.message)
    });
    watchEffect(() => {
      if (dataSearch.value.paymentYear && dataSearch.value.paymentMonth) {
        searchIncomeWageParam.value = {
          paymentMonth: dataSearch.value.paymentMonth,
          paymentYear: dataSearch.value.paymentYear,
        };
      }
    });

    //------------------------SUM AREA------------------------------

    // count the number of status
    const countStatus = (
      arr: any[],
      type: number | Boolean,
      propertyCompare: string
    ) => {
      if (Object.keys(arr).length === 0 || arr.length === 0) {
        return 0;
      }
      let typeCustom: number = 0;
      if (typeof type === "boolean") {
        typeCustom = 0;
      }
      if (isNumber(type)) {
        typeCustom = type;
      }
      let count = arr.reduce((acc: any, crr: any) => {
        let item =
          typeof crr[propertyCompare] == "boolean" &&
          crr[propertyCompare] == type
            ? 0
            : crr[propertyCompare];
        acc[item] = acc[item] ? acc[item] + 1 : 1;
        return acc;
      }, {});
      if (count[typeCustom]) {
        return count[typeCustom];
      }
      return 0;
    };
    // custom summary
    const productStatusSummary = () => {
      return `제작요청전 <span style="font-size: 16px;">[${countStatus(
        filteredDataSource.value,
        true,
        "beforeProduction"
      )}]</span> 제작대기 <span style="font-size: 16px;">[${countStatus(
        filteredDataSource.value,
        0,
        "productionStatus"
      )}]</span> 제작중 <span style="font-size: 16px;">[${countStatus(
        filteredDataSource.value,
        1,
        "productionStatus"
      )}]</span> 제작성공 <span style="font-size: 16px;">[${countStatus(
        filteredDataSource.value,
        2,
        "productionStatus"
      )}]</span> 제작실패 <span style="font-size: 16px;">[${countStatus(
        filteredDataSource.value,
        -1,
        "productionStatus"
      )}]</span> `;
    };

    //--------------------on Search----------------------

    watch(
      () => props.search,
      () => {
        let {
          paymentYear,
          paymentMonth,
          imputedYear,
          imputedMonth,
          ...compareObj
        } = dataSearch.value;
        let arr = dataSource.value.filter((item: any) => {
          return Object.keys(compareObj).every((key: any) => {
            if (key === "productionStatuses") {
              //error search main reason is
              return compareObj.productionStatuses.length > 0
                ? compareObj.productionStatuses.findIndex(
                    (status: any) => status === item.productionStatus
                  ) > -1
                : true;
            }
            if (compareObj[key]) {
              return compareObj[key] == item[key];
            }
            return true;
          });
        });
        filteredDataSource.value = arr;
        beforeCount.value = 1;
      },
      { deep: true }
    );

    // ----------------request file withholding---------

    const requestFileData = ref<any>({
      companyIds: [],
      filter: dataSearch.value,
      emailInput: {
        receiverName: userInfor?.value?.name,
        receiverAddress: userInfor?.value?.email,
      },
    });
    const selectionChanged = (event: any) => {
      let deselectRowKeys: any = [];
      event.selectedRowsData.forEach((item: any) => {
        if (!item.allowSelection)
          deselectRowKeys.push(event.component.keyOf(item));
      });
      if (deselectRowKeys.length) {
        event.component.deselectRows(deselectRowKeys);
        return;
      }
      if (event.selectedRowsData)
        requestFileData.value.companyIds = event.selectedRowsData.map(
          (item: any) => {
            return item.companyId;
          }
        );
    };
    const modalStatus = ref<boolean>(false);
    const onRequestFile = () => {
      requestFileData.value.emailInput = {
        receiverName: userInfor?.value?.name,
        receiverAddress: userInfor?.value?.email,
      };
      const { active, ...customFilter } = dataSearch.value;
      requestFileData.value.filter = customFilter;
      if (requestFileData.value.companyIds.length > 0) {
        modalStatus.value = true;
      } else {
        notification("warning", messageDelNoItem);
      }
    };
    const onRequestDone = () => {
      refetchTable();
      modalStatus.value = false;
    };

    // watch beforeProduction

    let setBefore = computed({
      get() {
        return !dataSearch.value.beforeProduction;
      },
      set(val) {
        dataSearch.value.beforeProduction = !val;
      },
    });
    watch(
      () => dataSearch.value.beforeProduction,
      (newVal: any) => {
        if (newVal) {
          dataSearch.value.productionStatuses = [];
        } else {
          dataSearch.value.productionStatuses = [0, 1, 2, -1];
        }
      },
      { deep: true }
    );
    watch(
      () => dataSearch.value.productionStatuses,
      (newVal: any) => {
        if (!newVal.length) {
          dataSearch.value.beforeProduction = true;
        } else {
          dataSearch.value.beforeProduction = false;
        }
      },
      { deep: true }
    );

    //watch date

    watch(datePayment, (newVal: any) => {
      if (newVal) {
        dataSearch.value.paymentYear = +newVal.toString().slice(0, 4);
        dataSearch.value.paymentMonth = +newVal.toString().slice(4, 6);
      }
    });

    return {
      userInfor,
      activeKey: ref("1"),
      valueDefaultCheckbox,
      valueDefaultSwitch,
      loadingTable,
      dayjs,
      checkBoxSearch,
      dataSearch,
      dataSource,
      filteredDataSource,
      colomn_resize,
      move_column,
      dayReport,
      defaultDataSource,
      selectionChanged,
      productStatusSummary,
      beforeProduction,
      productionStatusesCheckbox,
      onRequestFile,
      requestFileData,
      modalStatus,
      onRequestDone,
      setBefore,
      datePayment,
      beforeCount,
      searchIncomeWageParam,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../style/style.scss";
</style>
