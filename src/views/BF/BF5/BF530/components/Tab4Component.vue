<template>
  <!-- <div class="tab-group">
    <section>
      <a-row :gutter="[0, 5]">
        <a-rol class="mr-15">
          <a-form-item label="업체명">
            <default-text-box width="150px" v-model:valueInput="formState.companyName1" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="사업장관리번호">
            <biz-number-text-box width="150px" v-model:valueInput="formState.companyName2" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="상태">
            <select-box-common :arrSelect="reportTypeSelectbox2" v-model:valueInput="formState.companyName4"
              displayeExpr="text" valueExpr="id" width="150px" placeholder="사업유형 선택" :searchEnabled="false" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="신고구분">
            <select-box-common :arrSelect="reportTypeSelectbox2" v-model:valueInput="formState.companyName4"
              displayeExpr="text" valueExpr="id" width="150px" placeholder="사업유형 선택" :searchEnabled="false" />
          </a-form-item>
        </a-rol>
        <a-col>
          <a-form-item label="기간">
            <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true" />
          </a-form-item>
        </a-col>
      </a-row>
    </section>
    <a-row class="top-table" justify="end">
      <button-basic @onClick="handleOkConfirm" mode="contained" type="default" text="팩스발송" />
    </a-row>
    <div class="content-grid">
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
        key-expr="id" class="mt-10" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
        :column-auto-width="true" @selection-changed="selectionChanged" :allowSelection="true"
        @editor-preparing="onEditorPreparing" :repaint-changes-only="true">
        <DxScrolling mode="standard" show-scrollbar="always" />
        <DxColumnFixing :enabled="true" />
        <DxEditing :allow-updating="true" mode="row" :use-icons="true" />
        <DxLoadPanel :enabled="true" :showPane="true" />
        <DxSelection mode="multiple" :fixed="true" />
        <DxColumn caption="일련번호" data-field="companyCode" :allow-editing="false" />
        <DxColumn caption="신고구분" data-field="companyName" :allow-editing="false" />
        <DxColumn caption="업체명" data-field="inputYearMonth" :allow-editing="false" />
        <DxColumn caption="사업장관리번호" data-field="paymentYearMonth" :allow-editing="false" />
        <DxColumn caption="대표자명" data-field="reportType" width="95px" :allow-editing="false" />
        <DxColumn caption="사무대행위탁상태" data-field="afterDeadline" width="155px" :allow-editing="false" />
        <DxColumn data-field="totalCollectedTaxAmount" caption="사원명"  width="125"/>
        <DxColumn data-field="totalCollectedTaxAmount" caption="사원주민번호"  width="125"/>
        <DxColumn data-field="statusUpdatedAt" caption="신고상태" width="125">
          <DxLookup :data-source="states1" display-expr="name" value-expr="id" />
        </DxColumn>
        <DxColumn data-field="lastProductionRequestedAt" caption="등록일" width="125" :allow-editing="false" />
        <DxColumn data-field="productionStatus" caption="접수일" width="125"/>
        <DxColumn caption="완료일" data-field="afterDeadline" width="155px" :allow-editing="false" />
        <DxColumn caption="접수번호" data-field="afterDeadline" width="155px" :allow-editing="false" />
        <DxColumn caption="FAX상태" data-field="afterDeadline" width="155px" :allow-editing="false" />
        <DxColumn caption="메모" data-field="afterDeadline" width="155px" :allow-editing="false" />
        <DxColumn caption="신고서다운로드" cell-template="downA" alignment="right" :allow-editing="false" />
        <template #downA="{ data }" class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton type="ghost" class="" style="cursor: pointer" @click="onGetAcquistionRp(data.data.workId)">
              <DownloadOutlined :size="12" />
            </DxButton>
          </div>
        </template>
      </DxDataGrid>
    </div>
    <Tab1PopUp1 v-if="modalStatus1" @closeModal="modalStatus1 = false" />
    <Tab1PopUp2 v-if="modalStatus2" @closeModal="modalStatus2 = false" />
  </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue';
import queries from '@/graphql/queries/BF/BF6/BF620/index';
import { useQuery } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import DxButton from 'devextreme-vue/button';
import { DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxLoadPanel, DxEditing, DxLookup, DxColumnFixing } from 'devextreme-vue/data-grid';
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons-vue';
import notification from '@/utils/notification';
import { Message } from '@/configs/enum';
import { reportTypeSelectbox2, situationSelectbox, acceptanceStatusSelectbox, healthSelectbox, formatMonth, dataTableTab1, states1 } from '../utils/index'
import dayjs from 'dayjs';
import { isNumber } from 'lodash';
export default defineComponent({
  components: {
    DxButton,
    DxDataGrid,
    DxScrolling,
    DxSelection,
    DxColumn,
    SaveOutlined,
    DxSummary,
    DxTotalItem,
    DxLoadPanel,
    DxEditing,
    DxLookup,
    DownloadOutlined,
    DxColumnFixing
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

    const dataSource = ref<any[]>([...dataTableTab1]);
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
    const modalStatus1 = ref<boolean>(false);
    const messageDelNoItem = Message.getMessage('COMMON', '404').message;
    //handleOkConfirm
    const handleOkConfirm = () => {
      modalStatus1.value = true;
    }
    const onRequestFile = () => {
      requestFileData.value.emailInput = {
        receiverName: userInfor.value.name,
        receiverAddress: userInfor.value.email,
      };
      if (requestFileData.value.reportKeyInputs.length > 0) {
        modalStatus1.value = true;
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
    const modalStatus2 = ref<boolean>(false);
    const onOpenPop2 = () => {
      modalStatus2.value = true;
    }
    const onGetAcquistionRp = (workId: any) => {
      // actionParam.workId = workId;
      // fillRpTrigger.value = true;
      // fillRpRefetch();
    };
    return {
      formState, rangeDate,
      move_column,
      colomn_resize,
      dataSource,
      onRequestFile,
      modalStatus1, modalStatus2,
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
      reportTypeSelectbox2, situationSelectbox, acceptanceStatusSelectbox, healthSelectbox, states1,
      handleOkConfirm, onOpenPop2,
      onGetAcquistionRp,
    };
  },
})
</script>
<style lang="scss">
@import '../style/style.scss';
</style>
