<template>
  <div class="tab-group">
    <SearchArea />
    <!-- {{ filterBF620 }} filterBF620 <br />
    {{ searchWithholdingParam }} searchWithholdingParam <br /> -->
    <a-row class="top-table">
      <a-col class="d-flex-center">
        <span class="mr-10">파일 제작 설정</span>
        <switch-basic :textCheck="'세무대리인신고'" :textUnCheck="'납세자자진신고'" />
        <span style="font-size: 11px; color: #888888" class="ml-5">
          <img src="@/assets/images/iconInfo.png" style="width: 14px" />
          제작전은 제작요청되지 않은 상태입니다.
        </span>
      </a-col>
      <a-col>
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
      <a-spin :spinning="searchWithholdingLoading" size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          key-expr="companyId" class="mt-10" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          :column-auto-width="true" @selection-changed="selectionChanged">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSelection mode="multiple" :fixed="true" />
          <DxColumn caption="사업자코드" data-field="company.code" />
          <DxColumn caption="상호 주소" cell-template="companyName" />
          <template #companyName="{ data }">
            {{ data.data.company.name }}
            {{ data.data.company.address }}
          </template>
          <DxColumn caption="귀속연월" cell-template="inputYearMonth" width="102px" />
          <template #inputYearMonth="{ data }">
            <!-- {{ data.data.imputedYear }} -->
            <a-tooltip color="black">
              <template #title>삭제</template>
              <DxButton :text="'귀 ' + data.data.imputedYear + '-' + formatMonth(data.data.imputedMonth)" :style="{
                color: 'white',
                backgroundColor: 'gray',
                height: $config_styles.HeightInput
              }" class="btn-date" />
            </a-tooltip>
          </template>
          <DxColumn caption="지급연월" cell-template="paymentYearMonth" width="102px" />
          <template #paymentYearMonth="{ data }">
            <DxButton :text="'귀 ' + data.data.paymentYear + '-' + formatMonth(data.data.paymentMonth)" :style="{
              color: 'white',
              backgroundColor: 'black',
              height: $config_styles.HeightInput
            }" class="btn-date" />
          </template>
          <DxColumn caption="신고 주기" cell-template="reportType" width="95px" />
          <template #reportType="{ data }">
            <div v-if="data.data.reportType == 1" class="px-3 py-4 report-tag-black">매월</div>
            <div v-if="data.data.reportType == 6" class="px-3 py-4 report-tag-gray">반기</div>
            <div v-else></div>
          </template>
          <DxColumn caption="신고 종류" cell-template="afterDeadline" width="155px" />
          <template #afterDeadline="{ data }">
            <div v-if="!data.data.afterDeadline && data.data.index == 0" class="deadline-tag tag-white">정기</div>
            <div v-if="!data.data.afterDeadline && data.data.index > 0" class="deadline-tag tag-black">기한후</div>
            <div v-if="data.data.afterDeadline" class="deadline-tag tag-orange">수정 {{ data.data.index }}</div>
          </template>
          <DxColumn caption="납부세액(A99)" data-field="totalCollectedTaxAmount" format=",###" />
          <DxColumn caption="최종마감일시" data-field="statusUpdatedAt" data-type="date" format="yyyy-MM-dd HH:mm" />
          <DxColumn caption="최종제작요청일시" data-field="lastProductionRequestedAt" data-type="date"
            format="yyyy-MM-dd HH:mm" />
          <DxColumn caption="제작현황" cell-template="productionStatus" />
          <template #productionStatus="{ data }">
            <GetStatusTable :dataProcduct="data.data" v-if="data.data.lastProductionRequestedAt"
              @productionStatusData="productionStatusData" />
          </template>
          <DxSummary>
            <DxTotalItem column="사업자코드" summary-type="count" display-format="전체: {0}" />
            <DxTotalItem cssClass="custom-sumary" column="신고 주기" :customize-text="reportTypeSummary" />
            <DxTotalItem cssClass="custom-sumary" column="신고 종류" :customize-text="afterDeadlineSummary" />
            <DxTotalItem cssClass="custom-sumary" column="제작현황" :customize-text="productStatusSummary" />
          </DxSummary>
        </DxDataGrid>
      </a-spin>
    </div>
    <RequestFilePopup v-if="modalStatus" :data="requestFileData" tab-name="tab1" @cancel="modalStatus = false" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue';
import SearchArea from './SearchArea.vue';
import RequestFilePopup from './RequestFilePopup.vue';
import queries from '@/graphql/queries/BF/BF6/BF620/index';
import { useQuery } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import DxButton from 'devextreme-vue/button';
import { DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem } from 'devextreme-vue/data-grid';
import { SaveOutlined } from '@ant-design/icons-vue';
import { companyId, } from '@/helpers/commonFunction';
import GetStatusTable from './GetStatusTable.vue';
import notification from '@/utils/notification';
import { Message } from '@/configs/enum';
import { formatMonth } from '../utils/index'
import dayjs from 'dayjs';
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
  },
  props: {
    search: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const filterBF620 = computed(() => store.state.common.filterBF620);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const userInfor = computed(() => store.state.auth.userInfor);

    //-----------------------Search with holding and data source----------------

    const dataSource = ref<any[]>([]);
    const searchWithholdingTrigger = ref(true);
    let searchWithholdingParam = ref({
      paymentMonth: filterBF620.value.paymentMonth,
      paymentYear: filterBF620.value.paymentYear,
    })
    const {
      result: searchWithholdingResult,
      loading: searchWithholdingLoading,
      refetch: searchWithholdingRefetch,
      onError: searchWithholdingError,
    } = useQuery(
      queries.searchWithholdingTaxElectronicFilingsByYearMonth,
      searchWithholdingParam,
      () => ({
        // enabled: eletroFillingTrigger.value,
        fetchPolicy: 'no-cache',
      })
    );
    watch(searchWithholdingResult, (newVal) => {
      let data = newVal.searchWithholdingTaxElectronicFilingsByYearMonth;
      let result = Object.values(data.reduce((acc: any, curr: any) => {
        if (!acc[curr.companyId] || dayjs(curr.lastProductionRequestedAt).isBefore(dayjs(acc[curr.companyId].lastProductionRequestedAt))) {
          acc[curr.companyId] = curr;
        }
        return acc;
      }, {}));
      dataSource.value = [...result];
      searchWithholdingTrigger.value = false;
      // console.log(`output->data.beforeProduction`,data.beforeProduction)
      // filterBF620.value.beforeProduction= data?.beforeProduction;
      // filterBF620.value.productionStatuses= data.productionStatuses;
      // filterBF620.value.companyCode= data.companyCode;
      // filterBF620.value.companyName= data.companyName;
      // filterBF620.value.manageUserId= data.manageUserId;
      // filterBF620.value.salesRepresentativeId= data.salesRepresentativeId;
      // filterBF620.value.excludeCancel= data.excludeCancel;
      // filterBF620.value.reportType= data.reportType;
      // filterBF620.value.withholdingTaxType= data.withholdingTaxType;
    });
    searchWithholdingError((res: any) => {
      notification('error', res.message)
    })
    watchEffect(() => {
      if (filterBF620.value.paymentYear && filterBF620.value.paymentMonth) {
        searchWithholdingParam.value = {
          paymentMonth: filterBF620.value.paymentMonth,
          paymentYear: filterBF620.value.paymentYear,
        }
      }
    })

    //------------------------SUM AREA------------------------------ 
    // count the number of status

    let productionStatusArr = ref<any>([]);
    const watchFirstRun = ref(true);
    const countStatus = (arr: any[], type: number, propertyCompare: string) => {
      if (Object.keys(arr).length === 0 || arr.length === 0) {
        return 0;
      }
      let count = arr.reduce((acc: any, crr: any) => {
        acc[crr[propertyCompare]] = acc[crr[propertyCompare]] ? acc[crr[propertyCompare]] + 1 : 1;
        return acc;
      }, {});
      if (count[type]) {
        return count[type];
      }
      return 0;
    };
    // custom summary
    const reportTypeSummary = () => {
      return `매월 ${countStatus(dataSource.value, 1, 'reportType')} 반기 ${countStatus(dataSource.value, 6, 'reportType')}`
    };
    const afterDeadlineSummary = () => {
      return `정기 ${countStatus(dataSource.value, 0, 'afterDeadline')} 기한후 ${countStatus(dataSource.value, 0, 'afterDeadline')} 수정 ${countStatus(
        dataSource.value, 1, 'afterDeadline')}`;
    };
    const productStatusSummary = () => {
      return `제작전 ${countStatus(productionStatusArr.value, 0, 'productionStatus')} 제작대기 ${countStatus(productionStatusArr.value, 0, 'productionStatus')} 제작중 ${countStatus(
        productionStatusArr.value,
        1, 'productionStatus'
      )} 제작실패 ${countStatus(productionStatusArr.value, -1, 'productionStatus')} 제작성공 ${countStatus(productionStatusArr.value, 2, 'productionStatus')}`;
    };
    // caculator sum
    const reFreshDataGrid = () => {
      if (watchFirstRun.value) {
        dataSource.value = dataSource.value.concat([]);
        dataSource.value = dataSource.value.splice(dataSource.value.length - 1, 1);
        watchFirstRun.value = false;
      }
    };
    let arr = ref<any>([])
    const productionStatusData = (emitVal: any) => {
      arr.value.push(emitVal);
      productionStatusArr.value = [emitVal];
      reFreshDataGrid();
    };

    //--------------------on Search----------------------

    watch(
      () => props.search,
      () => {
        // variables.value = {
        //   filter: filterBF620.value,
        // };
        // searchWithholdingTrigger.value = true;
        searchWithholdingRefetch();
      },
      { deep: true }
    );

    // ----------------request file withholding---------

    const requestFileData = ref<any>({
      reportKeyInputs: [],
      filter: filterBF620.value,
      emailInput: {
        receiverName: userInfor.value.name,
        receiverAddress: userInfor.value.email,
      },
    });
    const selectionChanged = (event: any) => {
      if (event.selectedRowsData)
        requestFileData.value.reportKeyInputs = event.selectedRowsData.map((item: any) => {
          return { companyId: item.company.id, imputedYear: item.imputedYear, reportId: item.reportId };
        });
    };
    const modalStatus = ref<boolean>(false);
    const messageDelNoItem = Message.getMessage('COMMON', '404').message;
    const onRequestFile = () => {
      requestFileData.value.emailInput = {
        receiverName: userInfor.value.name,
        receiverAddress: userInfor.value.email,
      };
      if (requestFileData.value.reportKeyInputs.length > 0) {
        modalStatus.value = true;
      } else {
        notification('warning', messageDelNoItem);
      }
    };
    return {
      filterBF620,
      searchWithholdingLoading,
      move_column,
      colomn_resize,
      dataSource,
      onRequestFile,
      modalStatus,
      requestFileData,
      userInfor,
      productionStatusData,
      reportTypeSummary,
      afterDeadlineSummary,
      productStatusSummary,
      selectionChanged,
      formatMonth,
      searchWithholdingParam
    };
  },
})
</script>
<style lang="scss">
@import '../style/style.scss';
</style>
