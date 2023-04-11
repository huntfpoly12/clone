<template>
  <div class="tab-group">
    <section>
      {{ modalStatus }}
      <a-row :gutter="[0, 5]">
        <a-rol class="mr-15">
          <a-form-item label="업체명">
            <default-text-box width="150px" v-model:valueInput="formState.companyName1" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="사업자등록번호">
            <biz-number-text-box width="150px" v-model:valueInput="formState.companyName2" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="사업장관리번호">
            <text-number-box width="150px" v-model:valueInput="formState.companyName3" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="신고구분">
            <select-box-common :arrSelect="reportTypeSelectbox" v-model:valueInput="formState.companyName4"
              displayeExpr="text" valueExpr="id" width="150px" placeholder="사업유형 선택" :searchEnabled="false" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="상태">
            <select-box-common :arrSelect="situationSelectbox" v-model:valueInput="formState.companyName5"
              displayeExpr="text" valueExpr="id" width="150px" placeholder="사업유형 선택" :searchEnabled="false" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="수임상태">
            <select-box-common :arrSelect="acceptanceStatusSelectbox" v-model:valueInput="formState.companyName6"
              displayeExpr="text" valueExpr="id" width="150px" placeholder="사업유형 선택" :searchEnabled="false" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="수임상태">
            <select-box-common :arrSelect="healthSelectbox" v-model:valueInput="formState.companyName7"
              displayeExpr="text" valueExpr="id" width="150px" placeholder="사업유형 선택" :searchEnabled="false" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="수임상태">
            <select-box-common :arrSelect="healthSelectbox" v-model:valueInput="formState.companyName8"
              displayeExpr="text" valueExpr="id" width="150px" placeholder="사업유형 선택" :searchEnabled="false" />
          </a-form-item>
        </a-rol>
        <a-col>
          <a-form-item label="제작요청일(기간)">
            <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true" />
          </a-form-item>
        </a-col>
      </a-row>
    </section>
    <a-row class="top-table" justify="end">
      <button-basic @onClick="handleOkConfirm" mode="contained" type="default" text="팩스발송" />
    </a-row>
    <div class="content-grid">
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="filteredDataSource" :show-borders="true"
        key-expr="companyId" class="mt-10" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
        :column-auto-width="true" @selection-changed="selectionChanged" :allowSelection="true"
        @editor-preparing="onEditorPreparing">
        <DxScrolling mode="standard" show-scrollbar="always" />
        <DxLoadPanel :enabled="true" :showPane="true" />
        <DxSelection mode="multiple" :fixed="true" />
        <DxColumn caption="일련번호" data-field="companyCode" cell-template="companyCode" />
        <template #companyCode="{ data }">
          {{ data.data.companyCode }}
          {{ data.data.active ? '' : '해지' }}
        </template>
        <DxColumn caption="업체명" cell-template="companyName" />
        <template #companyName="{ data }">
          {{ data.data.companyName }}
          {{ data.data.address }}
        </template>
        <DxColumn caption="사업자등록번호" cell-template="inputYearMonth" width="102px" />
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
        <DxColumn caption="사업장관리번호" cell-template="paymentYearMonth" width="102px" />
        <template #paymentYearMonth="{ data }">
          <DxButton :text="'지 ' + data.data.paymentYear + '-' + formatMonth(data.data.paymentMonth)" :style="{
            color: 'white',
            backgroundColor: 'black',
            height: $config_styles.HeightInput
          }" class="btn-date" />
        </template>
        <DxColumn caption="대표자명" cell-template="reportType" width="95px" />
        <template #reportType="{ data }">
          <div v-if="data.data.reportType == 1" class="px-3 py-4 report-tag-black">매월</div>
          <div v-if="data.data.reportType == 6" class="px-3 py-4 report-tag-gray">반기</div>
          <div v-else></div>
        </template>
        <DxColumn caption="직원수" cell-template="afterDeadline" width="155px" />
        <template #afterDeadline="{ data }">
          <div v-if="!data.data.afterDeadline && data.data.index == 0" class="deadline-tag tag-white">정기</div>
          <div v-if="data.data.afterDeadline && data.data.index == 0" class="deadline-tag tag-black">기한후</div>
          <div v-if="!data.data.afterDeadline && data.data.index > 0" class="deadline-tag tag-orange">수정 {{
            data.data.index }}</div>
        </template>
        <DxColumn caption="수임상태(A99)" data-field="totalCollectedTaxAmount" format=",###" />
        <DxColumn caption="상태(처리상태) " data-field="statusUpdatedAt" data-type="date" format="yyyy-MM-dd HH:mm" />
        <DxColumn caption="수임일" data-field="lastProductionRequestedAt" data-type="date" format="yyyy-MM-dd HH:mm" />
        <DxColumn caption="해지일" cell-template="productionStatus" />
        <template #productionStatus="{ data }">
          <GetStatusTable :dataProcduct="data.data" v-if="data.data.lastProductionRequestedAt"
            @productionStatusData="productionStatusData" />
          <span class="before-production-tag" v-if="!data.data.beforeProduction">제작요청전</span>
        </template>
        <DxSummary>
          <DxTotalItem column="사업자코드" summary-type="count" display-format="전체: {0}" />
          <DxTotalItem cssClass="custom-sumary" column="신고 주기" :customize-text="reportTypeSummary" />
          <DxTotalItem cssClass="custom-sumary" column="신고 종류" :customize-text="afterDeadlineSummary" />
          <DxTotalItem cssClass="custom-sumary" column="제작현황" :customize-text="productStatusSummary" />
        </DxSummary>
      </DxDataGrid>
    </div>
    <Tab1PopUp1 v-if="modalStatus" @closeModal="modalStatus = false"/>
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
import { DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxLoadPanel } from 'devextreme-vue/data-grid';
import { SaveOutlined } from '@ant-design/icons-vue';
import GetStatusTable from './GetStatusTable.vue';
import notification from '@/utils/notification';
import { Message } from '@/configs/enum';
import { reportTypeSelectbox, situationSelectbox, acceptanceStatusSelectbox, healthSelectbox, formatMonth } from '../utils/index'
import dayjs from 'dayjs';
import { isNumber } from 'lodash';
import Tab1PopUp1 from './Tab1PopUp1.vue';
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
    Tab1PopUp1
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
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const rangeDate: any = ref([parseInt(dayjs().subtract(1, 'week').format('YYYYMMDD')), parseInt(dayjs().format('YYYYMMDD'))]);
    const formState = reactive({
      companyName1: '',
      companyName2: '',
      companyName3: '',
      companyName4: '',
      companyName5: '',
      companyName6: '',
      companyName7: '',
      companyName8: '',
      paymentMonth: '',
      paymentYear: '',
    });
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

    // watch range date

    watch(rangeDate, (newVal) => {
      // ElecFilingFileFilter.requesteStartDate = newVal[0];
      // ElecFilingFileFilter.requesteFinishDate = newVal[1];
    });

    //-----------------------Search with holding and data source----------------

    const dataSource = ref<any[]>([]);
    const filteredDataSource = ref<any[]>([]);
    let searchWithholdingParam = ref({
      paymentMonth: formState.paymentMonth,
      paymentYear: formState.paymentYear,
    })
    // const {
    //   result: searchWithholdingResult,
    //   loading: searchWithholdingLoading,
    //   onError: searchWithholdingError,
    // } = useQuery(
    //   queries.searchWithholdingTaxElectronicFilingsByYearMonth,
    //   searchWithholdingParam,
    //   () => ({
    //     // enabled: eletroFillingTrigger.value,
    //     fetchPolicy: 'no-cache',
    //   })
    // );
    // watch(searchWithholdingResult, (newVal) => {
    //   let data = newVal.searchWithholdingTaxElectronicFilingsByYearMonth.map((item: any) => {
    //     let arrData = {};
    //     if (item) {
    //       arrData = {
    //         companyCode: item.company.code,
    //         companyName: item.company.name,
    //         address: item.company.address,
    //         manageUserId: item.companyServiceContract.manageUserId,
    //         salesRepresentativeId: item.companyServiceContract.salesRepresentativeId,
    //         active: item.companyServiceContract.active,
    //         reportType: item.reportType,
    //         afterDeadline: item.afterDeadline,
    //         index: item.index,
    //         reportId: item.reportId,
    //         totalCollectedTaxAmount: item.totalCollectedTaxAmount,
    //         statusUpdatedAt: item.statusUpdatedAt,
    //         lastProductionRequestedAt: item.lastProductionRequestedAt,
    //         companyId: item.companyId,
    //         paymentYear: item.paymentYear,
    //         paymentMonth: item.paymentMonth,
    //         imputedYear: item.imputedYear,
    //         imputedMonth: item.imputedMonth,
    //         beforeProduction: item.lastProductionRequestedAt ? true : false,
    //         allowSelection: true,
    //         withholdingTaxType: changeWithholdingTaxType(item.index, item.afterDeadline),
    //       }
    //       // formState.imputedYear = item.imputedYear;
    //       // formState.imputedMonth = item.imputedMonth;
    //     }
    //     return arrData;
    //   });
    //   let result = Object.values(data.reduce((acc: any, curr: any) => {
    //     if (!acc[curr.companyId] || dayjs(curr.lastProductionRequestedAt).isBefore(dayjs(acc[curr.companyId].lastProductionRequestedAt))) {
    //       acc[curr.companyId] = curr;
    //     }
    //     return acc;
    //   }, {}));
    //   dataSource.value = [...result];
    //   filteredDataSource.value = [...result];
    //   if (props.onSearch) {
    //     props.onSearch();
    //   }
    // });
    // searchWithholdingError((res: any) => {
    //   notification('error', res.message)
    // })
    watchEffect(() => {
      if (formState.paymentYear && formState.paymentMonth) {
        searchWithholdingParam.value = {
          paymentMonth: formState.paymentMonth,
          paymentYear: formState.paymentYear,
        }
      }
    })

    //------------------------SUM AREA------------------------------ 

    // count the number of status
    let productionStatusArr = ref<any>([]);
    const countStatus = (arr: any[], type: number | Boolean, propertyCompare: string) => {
      if (Object.keys(arr).length === 0 || arr.length === 0) {
        return 0;
      }
      let typeCustom: number = 0;
      if (typeof type === 'boolean') {
        typeCustom = type ? 1 : 0;
      }
      if (isNumber(type)) {
        typeCustom = type;
      }
      let count = arr.reduce((acc: any, crr: any) => {
        let item = crr[propertyCompare] === false ? 0 : crr[propertyCompare];
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
      return `제작요청전 ${countStatus(filteredDataSource.value, false, 'beforeProduction')} 제작대기 ${countStatus(productionStatusArr.value, 0, 'productionStatus')} 제작중 ${countStatus(
        productionStatusArr.value,
        1, 'productionStatus'
      )} 제작실패 ${countStatus(productionStatusArr.value, -1, 'productionStatus')} 제작성공 ${countStatus(productionStatusArr.value, 2, 'productionStatus')}`;
    };
    // caculator sum
    const productionStatusData = (emitVal: any) => {
      productionStatusArr.value = [emitVal];
      filteredDataSource.value = filteredDataSource.value.map((item: any) => {
        if (item.companyId == emitVal.companyId) {
          return { ...item, productionStatus: emitVal.productionStatus, beforeProduction: true, allowSelection: false }
        }
        return { ...item, beforeProduction: false, allowSelection: false };
      })
      // reFreshDataGrid();
    };

    //--------------------on Search----------------------

    // watch([() => formState.index, () => formState.afterDeadline], ([newIndex, newAfter]) => {
    //   formState.withholdingTaxType = changeWithholdingTaxType(newIndex, newAfter);
    // });
    // watch(
    //   () => props.search,
    //   () => {
    //     let { paymentYear, paymentMonth, imputedYear, imputedMonth, afterDeadline, index, ...compareObj } = formState;
    //     let arr = dataSource.value.filter((item: any) => {
    //       return Object.keys(compareObj).every((key: any) => {
    //         // if (key == 'index' || key == 'afterDeadline') {
    //         //   if (compareObj.afterDeadline !== item.afterDeadline) {
    //         //     return false;
    //         //   }
    //         //   if ((compareObj.index && item.index) || (compareObj.index === item.index)) {
    //         //     return true;
    //         //   }
    //         //   return false;
    //         // }
    //         if (key === 'productionStatuses') {  //error search main reason is 
    //           return compareObj.productionStatuses.length > 0 ? compareObj.productionStatuses.findIndex((status: any) => status === item.productionStatus) > -1 : true;
    //         }
    //         if (compareObj[key]) {
    //           return compareObj[key] == item[key];
    //         }
    //         return true;
    //       })
    //     })
    //     filteredDataSource.value = arr;
    //   },
    //   { immediate: true }
    // );

    // ----------------request file withholding---------

    const requestFileData = ref<any>({
      reportKeyInputs: [],
      filter: formState,
      emailInput: {
        receiverName: userInfor.value.name,
        receiverAddress: userInfor.value.email,
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
      // checkBoxUpdating = true;
      // selectAllCheckBox.option("value", true);
      // checkBoxUpdating = false;
      if (event.selectedRowsData)
        requestFileData.value.reportKeyInputs = event.selectedRowsData.map((item: any) => {
          return { companyId: item.companyId, imputedYear: item.imputedYear, reportId: item.reportId };
        });
      // requestFileData.value.filter
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

    //------------------------disable selection row--------------------------------

    const onEditorPreparing = (e: any) => {
      // if (e.command === 'select') {
      //   if (e.parentType === 'dataRow' && e.row) {
      //     if (!e.row.data.allowSelection) {
      //       e.editorOptions.disabled = true;
      //     }
      //   }
      // }
    }
    //handleOkConfirm
    const handleOkConfirm = () => {
      modalStatus.value = true;
    }
    return {
      formState, rangeDate,
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
      searchWithholdingParam,
      filteredDataSource,
      onEditorPreparing,
      reportTypeSelectbox, situationSelectbox, acceptanceStatusSelectbox, healthSelectbox,
      handleOkConfirm,
    };
  },
})
</script>
<style lang="scss">
@import '../style/style.scss';
</style>
