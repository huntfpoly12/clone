<template>
  <div class="tab-group">
    <SearchArea :tab1="false" />
    <a-row class="top-table">
      <a-col class="d-flex-center">
        <span class="mr-10">파일 제작 설정</span>
        <switch-basic :textCheck="'세무대리인신고'" :textUnCheck="'납세자자진신고'" />
        <span style="font-size: 11px; color: #888888" class="ml-5">
          <img src="@/assets/images/iconInfo.png" style="width: 14px" /> 제작전은 제작요청되지 않은 상태입니다.
        </span>
      </a-col>
      <a-col style="display: flex">
        <div class="d-flex-center">
          <label class="lable-item ml-15">작성일(지방소득세납부서):</label>
          <date-time-box width="150px" default="2022-12-12" dateFormat="YYYY-MM-DD" />
        </div>
        <a-tooltip placement="topLeft" color="black">
          <template #title>전자신고파일 제작 요청</template>
          <div class="btn-modal-save" @click="onRequestFile">
            <SaveOutlined class="fz-20 ml-5 action-save" />
            <span style="margin-left: 5px">파일제작요청</span>
          </div>
        </a-tooltip>
      </a-col>
    </a-row>
    <div class="content-grid">
      <DxDataGrid :show-load-panel="true" :show-row-lines="true" :hoverStateEnabled="true"
        :data-source="filteredDataSource" :show-borders="true" key-expr="companyId" class="mt-10"
        :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
        @selection-changed="selectionChanged">
        <DxScrolling mode="standard" show-scrollbar="always" />
        <DxLoadPanel :enabled="true" :showPane="true" />
        <DxSelection mode="multiple" :fixed="true" />
        <DxColumn caption="사업자코드" data-field="code" width="90" />
        <DxColumn caption="상호 주소" cell-template="companyName" width="270" />
        <template #companyName="{ data }: any">
          {{ data.data.name }}
          {{ data.data.address }}
        </template>
        <DxColumn caption="귀속연월" cell-template="inputYearMonth" width="102px" />
        <template #inputYearMonth=" { data }: any ">
          <!-- {{ data.data.imputedYear }} -->
          <a-tooltip color="black">
            <template #title>삭제</template>
            <DxButton :text=" '귀 ' + data.data.imputedYear + '-' + formatMonth(data.data.imputedMonth) " :style="
              {
                color: 'white',
                  backgroundColor: 'gray',
                    height: $config_styles.HeightInput
              }
            " class="btn-date" />
          </a-tooltip>
        </template>
        <DxColumn caption="지급연월" cell-template="paymentYearMonth" width="102px" />
        <template #paymentYearMonth=" { data }: any ">
          <DxButton :text=" '지 ' + data.data.paymentYear + '-' + formatMonth(data.data.paymentMonth) " :style="
            {
              color: 'white',
                backgroundColor: 'black',
                  height: $config_styles.HeightInput
            }
          " class="btn-date" />
        </template>
        <DxColumn caption="신고 주기" cell-template="reportType" width="100px" />
        <template #reportType=" { data }: any ">
          <div v-if=" data.data.reportType == 1 " class="px-3 py-4 report-tag-black">매월</div>
          <div v-if=" data.data.reportType == 6 " class="px-3 py-4 report-tag-gray">반기</div>
          <div v-else></div>
        </template>
        <DxColumn caption="신고 종류" cell-template="afterDeadline" width="155px" />
        <template #afterDeadline=" { data }: any ">
          <div v-if=" !data.data.afterDeadline && data.data.index == 0 " class="deadline-tag tag-white">정기</div>
          <div v-if=" !data.data.afterDeadline && data.data.index > 0 " class="deadline-tag tag-black">기한후</div>
          <div v-if=" data.data.afterDeadline " class="deadline-tag tag-orange">수정 {{ data.data.index }}</div>
        </template>
        <DxColumn caption="지방소득세 납부세액" data-field="localIncomeTaxAmount" format="0,###" alignment="right" width="140px" />
        <DxColumn caption="최종마감일시" data-field="statusUpdatedAt" data-type="date" format="yyyy-MM-dd HH:mm" />
        <DxColumn caption="최종제작요청일시" data-field="lastProductionRequestedAt" data-type="date" format="yyyy-MM-dd HH:mm"
          width="120" />
        <DxColumn caption="제작현황" cell-template="productionStatus" width="355" />
        <template #productionStatus=" { data }: any ">
          <GetStatusTable :dataProcduct=" data.data " :message=" data.data?.causeOfProductionFailure " />
          <span class="before-production-tag" v-if=" data.data.beforeProduction ">제작요청전</span>
        </template>
        <DxSummary>
          <DxTotalItem column="사업자코드" summary-type="count" display-format="전체: {0}" />
          <DxTotalItem cssClass="custom-sumary" column="신고 주기" :customize-text=" reportTypeSummary " />
          <DxTotalItem cssClass="custom-sumary" column="신고 종류" :customize-text=" afterDeadlineSummary " />
          <DxTotalItem cssClass="custom-sumary" column="제작현황" :customize-text=" productStatusSummary " />
        </DxSummary>
      </DxDataGrid>
    </div>
    <RequestFilePopup v-if=" modalStatus " :modalStatus=" modalStatus " :requestFileData=" requestFileData " tab-name="tab2"
      @cancel=" onRequestDone " />
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue';
import SearchArea from './SearchArea.vue';
import RequestFilePopup from './RequestFilePopup.vue';
import queries from '@/graphql/queries/BF/BF6/BF620/index';
import { useApolloClient, useQuery } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import DxButton from 'devextreme-vue/button';
import { DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxLoadPanel } from 'devextreme-vue/data-grid';
import { SaveOutlined } from '@ant-design/icons-vue';
import notification from '@/utils/notification';
import dayjs from 'dayjs';
import { formatMonth } from '../utils/index'
import { isNumber } from 'lodash';
import { Message } from '@/configs/enum';
import GetStatusTable from './GetStatusTable.vue';

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
    DxLoadPanel,
    GetStatusTable,
  },
  props: {
    search: {
      type: Number,
    },
    onSearch: {
      type: Function,
      default: () => { },
    }
  },
  setup(props) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const filterBF620 = computed(() => store.state.common.filterBF620);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const userInfor = computed(() => store.state.auth.userInfor);

    //-----------------------Fcn common-----------------------------------------

    const changeWithholdingTaxType = (index: Number, afterDeadline: boolean) => {
      if (index === 0) {
        return afterDeadline ? 3 : 1;
      }
      return 2;
    }

    // --------------------search production status-----------------------------------------

    const { client } = useApolloClient();
    const fetchDataStatus = async (companies: any) => {
      if (companies.length === 0) return;
      for (let i = 0; i < companies.length; i++) {
        await client.query({
          query: queries.getElectronicFilingsByLocalIncomeTax, variables: {
            input: {
              companyId: companies[i].companyId,
              imputedYear: companies[i].imputedYear,
              reportId: companies[i].reportId,
            }
          }
        }).then((res) => {
          let { productionStatus, causeOfProductionFailure } = res.data.getElectronicFilingsByLocalIncomeTax[0];
          productionCount.value--;
          dataSource.value.forEach((item: any) => {
            if (item.reportId == companies[i].reportId) {
              item.productionStatus = productionStatus;
              if (productionStatus == -1) {
                item.causeOfProductionFailure = causeOfProductionFailure;
              }
              if (productionStatus == 2){
                item.allowSelection = false;
              }
            }
          })
        }).catch((err: any) => err);
      }
    };

    //-----------------------Search Local and data source----------------

    const dataSource = ref<any[]>([]);
    const filteredDataSource = ref<any[]>([]);
    let searchLocalIncomeParam = ref({
      paymentMonth: filterBF620.value.paymentMonth,
      paymentYear: filterBF620.value.paymentYear,
    })
    const {
      refetch: searchLocalIncomeRefetch,
      result: searchLocalIncomeResult,
      loading: searchLocalIncomeLoading,
      onError: searchLocalIncomeError,
    } = useQuery(queries.searchLocalIncomeTaxElectronicFilingsByYearMonth, searchLocalIncomeParam, () => ({
      fetchPolicy: 'no-cache',
    }));
    const productionCount = ref(0);
    watch(searchLocalIncomeResult, async (newVal) => {
      let data = newVal.searchLocalIncomeTaxElectronicFilingsByYearMonth.map((item: any) => {
        let arrData = {};
        if (item) {
          arrData = {
            code: item.company?.code,
            name: item.company?.name,
            address: item.company?.address,
            manageUserId: item.companyServiceContract.manageUserId,
            salesRepresentativeId: item.companyServiceContract.salesRepresentativeId,
            active: item.companyServiceContract.active,
            reportType: item.reportType,
            afterDeadline: item.afterDeadline,
            reportId: item.reportId,
            index: item.index,
            localIncomeTaxAmount: item?.localIncomeTaxAmount,
            statusUpdatedAt: item?.statusUpdatedAt,
            lastProductionRequestedAt: item?.lastProductionRequestedAt,
            companyId: item.companyId,
            paymentYear: item.paymentYear,
            paymentMonth: item.paymentMonth,
            imputedYear: item.imputedYear,
            imputedMonth: item.imputedMonth,
            beforeProduction: item.lastProductionRequestedAt ? false : true,
            allowSelection: true,
            causeOfProductionFailure: '',
            withholdingTaxType: changeWithholdingTaxType(item.index, item.afterDeadline),
          }
        }
        return arrData;
      });
      let result = Object.values(data.reduce((acc: any, curr: any) => {
        if (!acc[curr.companyId] || dayjs(curr.lastProductionRequestedAt).isBefore(dayjs(acc[curr.companyId].lastProductionRequestedAt))) {
          acc[curr.companyId] = curr;
        }
        return acc;
      }, {}));
      dataSource.value = [...result];
      await fetchDataStatus(dataSource.value.map((item: any) => {
        if (item.lastProductionRequestedAt) {
          productionCount.value = item.lastProductionRequestedAt ? productionCount.value + 1 : productionCount.value;
          return { companyId: item.companyId, imputedYear: item.imputedYear, reportId: item.reportId }
        }
        return;
      }));
      if (props.onSearch && productionCount.value == 0) {
        props.onSearch();
      }
    });
    searchLocalIncomeError((res: any) => {
      notification('error', res.message)
    })
    watchEffect(() => {
      if (filterBF620.value.paymentYear && filterBF620.value.paymentMonth) {
        searchLocalIncomeParam.value = {
          paymentMonth: filterBF620.value.paymentMonth,
          paymentYear: filterBF620.value.paymentYear,
        }
      }
    })
    const productionStatusData = (emitVal: any, index: number) => {
      productionStatusArr.value = [emitVal];
      productionCount.value--;
      if (emitVal?.companyId != 'undefined') {
        productionStatusArr.value = [...productionStatusArr.value, emitVal];
        filteredDataSource.value[index].productionStatus = emitVal.productionStatus;
        filteredDataSource.value[index].allowSelection = false;
      }
      if (props.onSearch && productionCount.value == 0) {
        props.onSearch();
      }
    };

    //------------------------SUM AREA------------------------------ 

    // count the number of status
    let productionStatusArr = ref<any>([]);
    const countStatus = (arr: any[], type: number | Boolean, propertyCompare: string) => {
      if (Object.keys(arr).length === 0 || arr.length === 0) {
        return 0;
      }
      let typeCustom: number = 0;
      if (typeof type === 'boolean') {
        typeCustom = 0;
      }
      if (isNumber(type)) {
        typeCustom = type;
      }
      let count = arr.reduce((acc: any, crr: any) => {
        let item = typeof (crr[propertyCompare]) == 'boolean' && crr[propertyCompare] == type ? 0 : crr[propertyCompare];
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
      return `매월 ${countStatus(filteredDataSource.value, 1, 'reportType')} 반기 ${countStatus(filteredDataSource.value, 6, 'reportType')}`
    };
    const afterDeadlineSummary = () => {
      return `정기 ${countStatus(filteredDataSource.value, 1, 'withholdingTaxType')} 수정 ${countStatus(filteredDataSource.value, 2, 'withholdingTaxType')} 기한후 ${countStatus(
        filteredDataSource.value, 3, 'withholdingTaxType')}`;
    };
    const productStatusSummary = () => {
      return `제작요청전 ${countStatus(filteredDataSource.value, true, 'beforeProduction')} 제작대기 ${countStatus(filteredDataSource.value, 0, 'productionStatus')} 제작중 ${countStatus(
        filteredDataSource.value, 1, 'productionStatus')} 제작성공 ${countStatus(filteredDataSource.value, 2, 'productionStatus')} 제작실패 ${countStatus(filteredDataSource.value, -1, 'productionStatus')} `;
    };


    //on Search

    watch([() => filterBF620.value.index, () => filterBF620.value.afterDeadline], ([newIndex, newAfter]) => {
      filterBF620.value.withholdingTaxType = changeWithholdingTaxType(newIndex, newAfter);
    });
    watch(
      () => props.search,
      () => {
        if (filterBF620.value.reportType == null) {
          filterBF620.value.reportType = 1;
        }
        let { paymentYear, paymentMonth, imputedYear, imputedMonth, afterDeadline, index, withholdingTaxType, ...compareObj } = filterBF620.value;
        let arr = dataSource.value.filter((item: any) => {
          return Object.keys(compareObj).every((key: any) => {
            if (key === 'productionStatuses') {
              return compareObj.productionStatuses.length > 0 ? compareObj.productionStatuses.findIndex((status: any) => status === item.productionStatus) > -1 : true;
            }
            if (compareObj[key]) {
              return compareObj[key] == item[key];
            }
            return true;
          })
        })
        filteredDataSource.value = arr;
      },
      { immediate: true }
    );

    // request file withholding

    const requestFileData = ref<any>({
      reportKeyInputs: [],
      filter: filterBF620.value,
      emailInput: {
        receiverName: userInfor.value?.name,
        receiverAddress: userInfor.value?.email,
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
        requestFileData.value.reportKeyInputs = event.selectedRowsData.map((item: any) => {
          return { companyId: item.companyId, imputedYear: item.imputedYear, reportId: item.reportId };
        });
    };
    const modalStatus = ref<boolean>(false);
    const messageDelNoItem = Message.getMessage('COMMON', '404').message;
    const onRequestFile = () => {
      requestFileData.value.emailInput = {
        receiverName: userInfor?.value?.name,
        receiverAddress: userInfor?.value?.email,
      };
      const { active, withholdingTaxType, ...customFilter } = filterBF620.value;
      requestFileData.value.filter = customFilter;
      if (requestFileData.value.reportKeyInputs.length > 0) {
        modalStatus.value = true;
      } else {
        notification('warning', messageDelNoItem);
      }
    };
    const onRequestDone = () => {
      searchLocalIncomeRefetch();
      modalStatus.value = false;
    }

    return {
      filterBF620,
      searchLocalIncomeLoading,
      move_column,
      colomn_resize,
      dataSource,
      onRequestFile, onRequestDone,
      modalStatus,
      requestFileData,
      userInfor,
      formatMonth,
      filteredDataSource,
      reportTypeSummary, afterDeadlineSummary, productStatusSummary,
      selectionChanged, productionStatusData,
      productionCount,

    };
  },
});
</script>
<style scoped lang="scss">
@import '../style/style.scss';

.lable-item {
  display: inline-block;
}

:deep .dx-datagrid {
  height: calc(62vh);

  :deep .dx-datagrid-total-footer {
    height: 77px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
  }

  :deep .dx-datagrid-headers {
    height: 27px;
  }

  :deep .dx-datagrid-rowsview {
    max-height: calc(calc(62vh) - 77px - 27px); // chiều cao bảng - chiều cao header - chiều cao footer
  }

  :deep .dx-freespace-row {
    display: none !important; // cục lúc hiện lúc không
  }
}
</style>
