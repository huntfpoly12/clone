<template>
  <div class="tab-group">
    <SearchArea :rerenderReport="search" :tab1="true" />
    <div class="content-grid">
      <a-spin :spinning="loadingTable">
        <DxDataGrid
          id="tab1-bf620"
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="filteredDataSource"
          :show-borders="true"
          key-expr="companyId"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          @selection-changed="selectionChanged"
          :allowSelection="true"
          noDataText="내역이 없습니다"
        >
          <DxPaging :enabled="false" />
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxLoadPanel :enabled="false" />
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSearchPanel
            :visible="true"
            :highlight-case-sensitive="true"
            placeholder="검색"
          />
          <DxExport :enabled="true" />
          <DxToolbar>
            <DxItem name="request" template="request" location="after" />
            <DxItem name="searchPanel" location="after" />
            <DxItem
              name="exportButton"
              css-class="cell-button-export"
              location="after"
            />
            <DxItem template="total-user" location="before" />
          </DxToolbar>
          <template #total-user>
            <div>
              <a-row>
                <a-col class="d-flex-center">
                  <span class="mr-10">파일 제작 설정</span>
                  <switch-basic
                    :textCheck="'세무대리인신고'"
                    :textUnCheck="'납세자자진신고'"
                  />
                  <info-tool-tip>
                    <span>본 설정으로 적용된 파일로 다운로드 및 메일발송 됩니다.</span>
                  </info-tool-tip>
                </a-col>
              </a-row>
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
            data-field="companyCode"
            cell-template="companyCode"
          />
          <template #companyCode="{ data }: any">
            {{ data.data.companyCode }}
            {{ data.data.active ? "" : "해지" }}
          </template>
          <DxColumn
            caption="상호 주소"
            cell-template="companyName"
            data-field="companyName"
            :calculateCellValue="cellCompanyCode"
          />
          <template #companyName="{ data }: any">
            {{ data.data.companyName }}
            {{ data.data.address }}
          </template>
          <DxColumn
            caption="귀속연월"
            cell-template="inputYearMonth"
            width="110px"
            alignment="center"
          />
          <template #inputYearMonth="{ data }: any">
            <!-- {{ data.data.imputedYear }} -->
            <a-tooltip color="black">
              <template #title>삭제</template>
              <DxButton
                :text="
                  '귀 ' +
                  data.data.imputedYear +
                  '-' +
                  formatMonth(data.data.imputedMonth)
                "
                :style="{
                  color: 'white',
                  backgroundColor: 'gray',
                  height: $config_styles.HeightInput,
                }"
                class="btn-date"
              />
            </a-tooltip>
          </template>
          <DxColumn
            caption="지급연월"
            cell-template="paymentYearMonth"
            width="110px"
            alignment="center"
          />
          <template #paymentYearMonth="{ data }: any">
            <DxButton
              :text="
                '지 ' +
                data.data.paymentYear +
                '-' +
                formatMonth(data.data.paymentMonth)
              "
              :style="{
                color: 'white',
                backgroundColor: 'black',
                height: $config_styles.HeightInput,
              }"
              class="btn-date"
            />
          </template>
          <DxColumn
            caption="신고 주기"
            cell-template="reportType"
            width="115px"
            alignment="center"
          />
          <template #reportType="{ data }: any">
            <div class="d-flex-center justify-content-center">
              <div
              :class="
                data.data.reportType == 6 ? 'tag-custom-1' : 'tag-custom-2'
              "
            >
              {{ data.data.reportType == 6 ? "반기" : "매월" }}
            </div>
            </div>
          </template>
          <DxColumn
            caption="신고 종류"
            cell-template="afterDeadline"
            alignment="center"
          />
          <template #afterDeadline="{ data }: any">
            <div class="d-flex-center justify-content-center">
              <div
                v-if="!data.data.afterDeadline && data.data.index == 0"
                class="deadline-tag tag-white"
              >
                정기
              </div>
              <div
                v-if="data.data.afterDeadline && data.data.index == 0"
                class="deadline-tag tag-black"
              >
                기한후
              </div>
              <div
                v-if="!data.data.afterDeadline && data.data.index > 0"
                class="deadline-tag tag-orange"
              >
                수정 {{ data.data.index }}
              </div>
            </div>
          </template>
          <DxColumn
            caption="납부세액(A99)"
            data-field="totalCollectedTaxAmount"
            format=",###"
            width="100"
          />
          <DxColumn
            caption="최종마감일시"
            data-field="statusUpdatedAt"
            data-type="date"
            format="yyyy-MM-dd HH:mm"
          />
          <DxColumn
            caption="최종제작요청일시"
            data-field="lastProductionRequestedAt"
            data-type="date"
            format="yyyy-MM-dd HH:mm"
            width="120"
          />
          <DxColumn caption="제작현황" cell-template="productionStatus" width="180" />
          <template #productionStatus="{ data }: any">
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
          <a-col span="3" class="sum-item">
            <div
              class="dx-datagrid-summary-item dx-datagrid-text-content"
              v-html="reportTypeSummary()"
            ></div>
          </a-col>
          <a-col span="3" class="sum-item">
            <div
              class="dx-datagrid-summary-item dx-datagrid-text-content"
              v-html="afterDeadlineSummary()"
            ></div>
          </a-col>
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
      tab-name="tab1"
      @cancel="onRequestDone"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, watchEffect } from "vue";
import SearchArea from "./SearchArea.vue";
import RequestFilePopup from "./RequestFilePopup.vue";
import queries from "@/graphql/queries/BF/BF6/BF620/index";
import { useApolloClient, useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import DxButton from "devextreme-vue/button";
import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxSelection,
  DxSummary,
  DxTotalItem,
  DxLoadPanel,
  DxPaging,
  DxItem,
  DxSearchPanel,
  DxExport,
  DxToolbar,
} from "devextreme-vue/data-grid";
import { SaveOutlined } from "@ant-design/icons-vue";
import GetStatusTable from "./GetStatusTable.vue";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";
import { formatMonth } from "../utils/index";
import dayjs from "dayjs";
import { isNumber } from "lodash";
export default defineComponent({
  components: {
    SearchArea,
    RequestFilePopup,
    DxButton,
    DxDataGrid,
    DxScrolling,
    DxSelection,
    DxColumn,
    SaveOutlined,
    DxSummary,
    DxTotalItem,
    GetStatusTable,
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
    const store = useStore();
    const filterBF620 = computed(() => store.state.common.filterBF620);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const userInfor = computed(() => store.state.auth.userInfor);
    const statusRef = ref();
    const loadingTable = ref(true);

    //-----------------------Fcn common-----------------------------------------

    const changeWithholdingTaxType = (
      index: Number,
      afterDeadline: boolean
    ) => {
      if (index === 0) {
        return afterDeadline ? 3 : 1;
      }
      return 2;
    };

    // --------------------search production status-----------------------------------------

    const { client } = useApolloClient();
    const fetchDataStatus = async (companies: any) => {
      if (companies.length === 0) return;
      for (let i = 0; i < companies.length; i++) {
        if (companies[i]) {
          await client
            .query({
              query: queries.getElectronicFilingsByWithholdingTax,
              variables: {
                input: {
                  companyId: companies[i].companyId,
                  imputedYear: companies[i].imputedYear,
                  reportId: companies[i].reportId,
                },
              },
            })
            .then((res) => {
              let productionStatus =
                res.data.getElectronicFilingsByWithholdingTax[0]
                  .productionStatus;
              let causeOfProductionFailure =
                res.data.getElectronicFilingsByWithholdingTax[0]
                  ?.causeOfProductionFailure;
              productionCount.value--;
              dataSource.value.forEach((item: any) => {
                if (item.reportId == companies[i].reportId) {
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

    //-----------------------Search with holding and data source----------------

    const dataSource = ref<any[]>([]);
    const filteredDataSource = ref<any[]>([]);
    let searchWithholdingParam = ref({
      paymentMonth: filterBF620.value.paymentMonth,
      paymentYear: filterBF620.value.paymentYear,
    });
    const {
      refetch: searchWithholdingRefetch,
      result: searchWithholdingResult,
      loading: searchWithholdingLoading,
      onError: searchWithholdingError,
    } = useQuery(
      queries.searchWithholdingTaxElectronicFilingsByYearMonth,
      searchWithholdingParam,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    const productionCount = ref(0);
    const beforeCount = ref(0);
    watch(searchWithholdingResult, async (newVal) => {
      loadingTable.value = true;
      beforeCount.value = 0;
      let data = newVal.searchWithholdingTaxElectronicFilingsByYearMonth.map(
        (item: any) => {
          let arrData = {};
          if (item) {
            arrData = {
              companyCode: item.company.code,
              companyName: item.company.name,
              address: item.company.address,
              manageUserId: item.companyServiceContract.manageUserId,
              salesRepresentativeId:
                item.companyServiceContract.salesRepresentativeId,
              active: item.companyServiceContract.active,
              reportType: item.reportType,
              afterDeadline: item.afterDeadline,
              index: item.index,
              reportId: item.reportId,
              totalCollectedTaxAmount: item.totalCollectedTaxAmount,
              statusUpdatedAt: item.statusUpdatedAt,
              lastProductionRequestedAt: item.lastProductionRequestedAt,
              companyId: item.companyId,
              paymentYear: item.paymentYear,
              paymentMonth: item.paymentMonth,
              imputedYear: item.imputedYear,
              imputedMonth: item.imputedMonth,
              beforeProduction: item.lastProductionRequestedAt ? false : true,
              allowSelection: true,
              causeOfProductionFailure: "",
              withholdingTaxType: changeWithholdingTaxType(
                item.index,
                item.afterDeadline
              ),
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
              imputedYear: item.imputedYear,
              reportId: item.reportId,
            };
          }
          return;
        })
      );
      if (props.onSearch && productionCount.value == 0) {
        props.onSearch();
      }
    });
    searchWithholdingError((res: any) => {
      notification("error", res.message);
    });
    watchEffect(() => {
      if (filterBF620.value.paymentYear && filterBF620.value.paymentMonth) {
        searchWithholdingParam.value = {
          paymentMonth: filterBF620.value.paymentMonth,
          paymentYear: filterBF620.value.paymentYear,
        };
        loadingTable.value = true;
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
    const reportTypeSummary = () => {
      return `매월 <span style="font-size: 16px;">[${countStatus(
        filteredDataSource.value,
        1,
        "reportType"
      )}]</span> 반기 <span style="font-size: 16px;">[${countStatus(
        filteredDataSource.value,
        6,
        "reportType"
      )}]</span>`;
    };
    const afterDeadlineSummary = () => {
      return `정기 <span style="font-size: 16px;">[${countStatus(
        filteredDataSource.value,
        1,
        "withholdingTaxType"
      )}]</span> 수정 <span style="font-size: 16px;">[${countStatus(
        filteredDataSource.value,
        2,
        "withholdingTaxType"
      )}]</span>  기한후 <span style="font-size: 16px;">[${countStatus(
        filteredDataSource.value,
        3,
        "withholdingTaxType"
      )}]</span>`;
    };
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
      [() => filterBF620.value.index, () => filterBF620.value.afterDeadline],
      ([newIndex, newAfter]) => {
        filterBF620.value.withholdingTaxType = changeWithholdingTaxType(
          newIndex,
          newAfter
        );
      }
    );
    watch(
      () => props.search,
      () => {
        // if (!filterBF620.value.beforeProduction && beforeCount.value == 1) {
        //   searchWithholdingRefetch();
        // } else {
        let {
          paymentYear,
          paymentMonth,
          imputedYear,
          imputedMonth,
          afterDeadline,
          index,
          ...compareObj
        } = filterBF620.value;
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
        setTimeout(() => {
          loadingTable.value = false;
        }, 0);
      },
      { deep: true }
    );

    // ----------------request file withholding---------

    const requestFileData = ref<any>({
      reportKeyInputs: [],
      filter: filterBF620.value,
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
        requestFileData.value.reportKeyInputs = event.selectedRowsData.map(
          (item: any) => {
            return {
              companyId: item.companyId,
              imputedYear: item.imputedYear,
              reportId: item.reportId,
              imputedMonth: item.imputedMonth,
            };
          }
        );
    };
    const modalStatus = ref<boolean>(false);
    const messageDelNoItem = Message.getMessage("COMMON", "404").message;
    const onRequestFile = () => {
      requestFileData.value.emailInput = {
        receiverName: userInfor?.value?.name,
        receiverAddress: userInfor?.value?.email,
      };
      const { active, ...customFilter } = filterBF620.value;
      requestFileData.value.filter = customFilter;
      if (requestFileData.value.reportKeyInputs.length > 0) {
        modalStatus.value = true;
      } else {
        notification("warning", messageDelNoItem);
      }
    };
    const onRequestDone = () => {
      searchWithholdingRefetch();
      modalStatus.value = false;
      loadingTable.value = true;
    };

    //------------------------------SEARCH COLUMN CUSTOM----------------------

    const cellCompanyCode = (rowData: any) => {
      return `${rowData.companyName}+${rowData.address}`;
    };

    return {
      filterBF620,
      searchWithholdingLoading,
      move_column,
      colomn_resize,
      dataSource,
      onRequestFile,
      onRequestDone,
      modalStatus,
      requestFileData,
      userInfor,
      reportTypeSummary,
      afterDeadlineSummary,
      productStatusSummary,
      selectionChanged,
      formatMonth,
      searchWithholdingParam,
      filteredDataSource,
      productionCount,
      statusRef,
      loadingTable,
      cellCompanyCode,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../style/style.scss";
</style>
