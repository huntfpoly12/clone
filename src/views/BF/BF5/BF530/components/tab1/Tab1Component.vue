<template>
  <div class="tab-group">
    <section>
      <a-row :gutter="[0, 5]">
        <a-rol class="mr-15">
          <a-form-item label="업체명">
            <default-text-box width="150px" v-model:valueInput="formState.companyName" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="사업자등록번호">
            <biz-number-text-box width="150px" v-model:valueInput="formState.companyBizNumber" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="사업장관리번호">
            <ManageIdTextBox width="150px" v-model:valueInput="formState.manageId" />
          </a-form-item>
        </a-rol>
        <!-- <a-rol class="mr-15">
          <a-form-item label="신고구분">
            <SelectBoxCT :arrSelect="reportTypeSelectbox" v-model:valueInput="formState.companyName4"
              displayeExpr="text" valueExpr="id" width="150px" placeholder="선택" :searchEnabled="false" />
          </a-form-item>
        </a-rol> -->
        <a-rol class="mr-15">
          <a-form-item label="상태">
            <SelectBoxCT :searchEnabled="true" :arrSelect="situationSelectbox"
              v-model:valueInput="formState.workingStatus" displayeExpr="text" valueExpr="id" width="150px"
              placeholder="선택" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="수임상태">
            <SelectBoxCT :searchEnabled="true" :arrSelect="acceptanceStatusSelectbox"
              v-model:valueInput="formState.companyConsignStatus" displayeExpr="text" valueExpr="id" width="150px"
              placeholder="선택" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="건강ED 연계상태">
            <SelectBoxCT :searchEnabled="true" :arrSelect="healthSelectbox"
              v-model:valueInput="formState.healthInsuranceEDIStatus" displayeExpr="text" valueExpr="id" width="150px"
              placeholder="선택" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="연금EDI 연계상태">
            <SelectBoxCT :searchEnabled="true" :arrSelect="healthSelectbox"
              v-model:valueInput="formState.nationalPensionEDIStatus" displayeExpr="text" valueExpr="id" width="150px"
              placeholder="선택" />
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
      <button-basic @onClick="onSave" mode="contained" type="default" text="상태일괄변경" />
    </a-row>
    {{ dataSource }} dataSource <br />
    {{ dataTest }} dataTest <br />
    <div class="content-grid">
      <DxDataGrid id="tab1-bf530" :show-row-lines="true" :hoverStateEnabled="true" :data-source="filteredDataSource"
        :show-borders="true" key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
        :allow-column-resizing="colomn_resize" :column-auto-width="true" @selection-changed="selectionChanged"
        :allowSelection="true" ref="tab1Bf520Ref" noDataText="내역이 없습니다">
        <DxScrolling mode="standard" show-scrollbar="always" />
        <!-- <DxColumnFixing :enabled="true" /> -->
        <!-- <DxEditing mode="row"/> -->
        <DxLoadPanel :enabled="true" :showPane="true" />
        <DxSelection mode="multiple" :fixed="true" />
        <DxColumn caption="일련번호" data-field="companyId" alignment="left" />
        <DxColumn caption="업체명" data-field="companyName" />
        <DxColumn caption="사업자등록번호" data-field="companyBizNumber" :format="$filters.formatBizNumber" />
        <DxColumn caption="사업장관리번호" data-field="manageId" :format="$filters.formatManageId" />
        <DxColumn caption="대표자명" data-field="companyPresidentName" width="95px" />
        <DxColumn data-field="companyConsignStatus" caption="수임상태" width="135" cell-template="companyConsignStatus"
          alignment="left" />
        <template #companyConsignStatus="{ data } : any">
          <SelectBoxCT :searchEnabled=" true " :arrSelect=" acceptanceStatusSelectbox "
            v-model:valueInput=" data.data.companyConsignStatus " displayeExpr="text" valueExpr="id" width="120px"
            placeholder="선택" />
        </template>
        <DxColumn data-field="workingStatus" caption="상태(처리상태)" width="135" cell-template="workingStatus"
          alignment="left" />
        <template #workingStatus=" { data } : any ">
          <SelectBoxCT :searchEnabled=" true " :arrSelect=" situationSelectbox "
            v-model:valueInput=" data.data.workingStatus " displayeExpr="text" valueExpr="id" width="120px"
            placeholder="선택" />
        </template>
        <DxColumn caption="메모" width="135" cell-template="memo" />
        <template #memo=" { data } : any ">
          <default-text-box :width=" 120 " v-model:valueInput=" data.data.memo " />
        </template>
        <DxColumn data-field="healthInsuranceEDIStatus" caption="건강EDI 연계상태 " width="135"
          cell-template="healthInsuranceEDIStatus" alignment="left" />
        <template #healthInsuranceEDIStatus=" { data } : any ">
          <SelectBoxCT :searchEnabled=" true " :arrSelect=" healthSelectbox "
            v-model:valueInput=" data.data.healthInsuranceEDIStatus " displayeExpr="text" valueExpr="id" width="120px"
            placeholder="선택" />
        </template>
        <DxColumn data-field="nationalPensionEDIStatus" caption="연금EDI 연계상태 " width="135"
          cell-template="nationalPensionEDIStatus" alignment="left" />
        <template #nationalPensionEDIStatus=" { data } : any ">
          <SelectBoxCT :searchEnabled=" true " :arrSelect=" healthSelectbox "
            v-model:valueInput=" data.data.nationalPensionEDIStatus " displayeExpr="text" valueExpr="id" width="120px"
            placeholder="선택" />
        </template>
        <DxColumn caption="관할지사정보수정" cell-template="productionStatus" alignment="center" />
        <template #productionStatus>
          <div class="d-flex justify-content-center">
            <button-basic @onClick=" onOpenPop1 " mode="contained" type="default" text="수정" />
          </div>
        </template>
        <DxColumn caption="리포트파일다운로드" cell-template="downA" alignment="right" />
        <template #downA=" { data } : any " class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton type="ghost" class="" style="cursor: pointer" @click=" onGetAcquistionRp(data.data.workId) ">
              <DownloadOutlined :style=" { fontSize: 12 } " />
            </DxButton>
          </div>
        </template>
        <DxColumn caption="신청일" data-field="registeredAt" alignment="left" data-type="date" format="yyyy-MM-dd HH:mm" />
        <DxColumn caption="완료일" data-field="completedAt" alignment="left" data-type="date" format="yyyy-MM-dd HH:mm" />
        <DxColumn caption="팩스발송" cell-template="downD" width="100px" />
        <template #downD=" { data } : any " class="custom-action">
          <div class="d-flex justify-content-center">
            <button-basic @onClick=" onOpenPop2 " mode="contained" type="default" text="팩스발송" />
          </div>
        </template>
        <DxColumn caption="팩스상태" cell-template="downE" alignment="right" />
        <template #downE=" { data } : any " class="custom-action">
          <div class="d-flex justify-content-center">
            <!-- <DxButton type="ghost" class="" style="cursor: pointer" @click=" onGetAcquistionRp(data.data.workId) ">
              <DownloadOutlined :style="{fontSize: 12}"/>
            </DxButton> -->
          </div>
        </template>
        <DxColumn cell-template="history" width="50" />
        <template #history=" { data } : any " class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton type="ghost" style="cursor: pointer" @click=" onOpenLogs ">
              <a-tooltip zIndex="9999999" placement="top" color="black">
                <template #title>
                  <div>
                    변경이력
                  </div>
                </template>
                <HistoryOutlined style="font-size: 16px" />
              </a-tooltip>
            </DxButton>
          </div>
        </template>
      </DxDataGrid>
    </div>
    <Correction v-if=" modalStatus1 " @closeModal=" modalStatus1 = false " />
    <SendTax v-if=" modalStatus2 " @closeModal=" modalStatus2 = false " />
    <History v-if=" modalHistory " @closeModal=" modalHistory = false " />
    <!-- <HistoryPopup :modalStatus=" modalHistory " @closePopup=" modalHistory = false " :data=" workIdHistory " title="변경이력"
      typeHistory="pa-820" /> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue';
import queries from '@/graphql/queries/BF/BF5/BF530/index';
import { useQuery } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import DxButton from 'devextreme-vue/button';
import { DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxLoadPanel, DxEditing, DxLookup, DxColumnFixing } from 'devextreme-vue/data-grid';
import { DownloadOutlined, SaveOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import notification from '@/utils/notification';
import { Message } from '@/configs/enum';
import { reportTypeSelectbox, situationSelectbox, acceptanceStatusSelectbox, healthSelectbox, formatMonth, dataTableTab1, states1 } from '../../utils/index'
import dayjs from 'dayjs';
import Correction from './Correction.vue';
import SendTax from './SendTax.vue';
import History from './History.vue';
import SelectBoxCT from './../SelectBoxCT.vue';
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
    Correction, SendTax, History,
    DxEditing,
    DxLookup,
    DownloadOutlined,
    DxColumnFixing,
    SelectBoxCT,
    HistoryOutlined,
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
    const countGet = ref(0);
    const rangeDate: any = computed({
      get() {
        return [parseInt(dayjs().subtract(1, 'week').format('YYYYMMDD')), parseInt(dayjs().format('YYYYMMDD'))]
      },
      set(newVal: any) {
        adminConsignStatusParam.input = {
          fromDate: newVal[0],
          toDate: newVal[1],
        };
        console.log(`output->newVal`, newVal);
        if (countGet.value == 1) {
          adminConsignStatusTrigger.value = true;
        } else {
          countGet.value = 0;
        }
      }
    }
    );
    const formState : any = reactive({
      companyName: '',
      companyBizNumber: '',
      manageId: '',
      companyName4: '',
      workingStatus: '',
      companyConsignStatus: '',
      healthInsuranceEDIStatus: '',
      nationalPensionEDIStatus: '',
    });
    const { move_column, colomn_resize } = store.state.settings;
    const tab1Bf520Ref = ref();
    const dataTest = ref();

    //-----------------------Fcn common-----------------------------------------


    // watch range date

    // watch(rangeDate, (newVal, old) => {
    //   adminConsignStatusParam.input.fromDate = newVal[0];
    //   adminConsignStatusParam.input.toDate = newVal[1];
    //   console.log(`output->newVal`, newVal)
    //   // adminConsignStatusTrigger.value = true;
    // });

    //-----------------------Get DATA SOURCE------------------------------

    const dataSource = ref<any[]>([]);
    const filteredDataSource = ref<any[]>([]);
    const adminConsignStatusParam = reactive({
      input: {
        fromDate: rangeDate.value[0],
        toDate: rangeDate.value[1],
      }
    })
    const adminConsignStatusTrigger = ref(true);
    const { refetch: adminConsignStatusRefetch, result: adminConsignStatusResult, onError: adminConsignStatusError, loading: loading1 } = useQuery(
      queries.getMajorInsuranceAdminConsignStatus,
      adminConsignStatusParam,
      () => ({
        fetchPolicy: 'no-cache',
        enabled: adminConsignStatusTrigger.value,
      })
    );
    watch(adminConsignStatusResult, (newVal) => {
      let dataArr = newVal.getMajorInsuranceAdminConsignStatus.map((item: any) => {
        return {
          companyCode: item.company.code,
          companyName: item.company.name,
          companyBizNumber: item.company.bizNumber,
          companyPresidentName: item.company.presidentName,
          ...item,
        }
      })
      dataSource.value = dataArr;
      filteredDataSource.value = dataArr;
      adminConsignStatusTrigger.value = false;
      countGet.value++;
    });
    adminConsignStatusError((res: any) => {
      notification('error', res.message)
    })

    //----------------------------ON SEARCH ------------------------------

    watch(
      () => props.search,
      () => {
        // if (!filterBF620.value.beforeProduction && beforeCount.value == 1) {
        //   searchWithholdingRefetch();
        // } else {
        let arr = dataSource.value.filter((item: any) => {
          return Object.keys(formState).every((key: any) => {
            if (formState[key]) {
              return formState[key] == item[key];
            }
            return true;
          })
        })
        filteredDataSource.value = arr;
        // }
      },
      { deep: true }
    );

    // -----------------------------HISTORY-------------------

    const modalHistory = ref(false);
    const workIdHistory = ref();
    const onOpenLogs = () => {
      modalHistory.value = true;
      // workIdHistory.value = e;
      // actionParam.workId = e;
    };
    const selectionChanged = (event: any) => {
      // let deselectRowKeys: any = [];
      let { currentSelectedRowKeys, selectedRowsData } = event;
      // tab1Bf520Ref.value.instance.editRow(currentSelectedRowKeys[0] - 1);
      // selectedRowsData.component.editRow(selectedRowsData.currentSelectedRowKeys);
      // event.selectedRowsData.forEach((item: any) => {
      //   if (!item.allowSelection)
      //     deselectRowKeys.push(event.component.keyOf(item));
      // });
      // if (deselectRowKeys.length) {
      //   event.component.deselectRows(deselectRowKeys);
      //   return;
      // }
    };
    const modalStatus1 = ref<boolean>(false);
    //handleOkConfirm
    const onOpenPop1 = () => {
      modalStatus1.value = true;
    }

    //------------------------disable selection row--------------------------------

    const modalStatus2 = ref<boolean>(false);
    const onOpenPop2 = () => {
      modalStatus2.value = true;
    }
    const onGetAcquistionRp = (workId: any) => {
      // actionParam.workId = workId;
      // fillRpTrigger.value = true;
      // fillRpRefetch();
    };
    const onSave = () => { };
    return {
      formState, rangeDate, 
      move_column, colomn_resize, dataSource,filteredDataSource,
      modalStatus1, modalStatus2,
      selectionChanged,
      formatMonth,
      reportTypeSelectbox, situationSelectbox, acceptanceStatusSelectbox, healthSelectbox, states1,
      onOpenPop1, onOpenPop2,
      onGetAcquistionRp,
      onOpenLogs, modalHistory,
      onSave,
      tab1Bf520Ref,
      dataTest,
    };
  },
})
</script>
<style lang="scss">
@import '../../style/style.scss';
</style>
