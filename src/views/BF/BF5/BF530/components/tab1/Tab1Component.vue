<template>
  <div class="tab-group">
    <section>
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
        <!-- <a-rol class="mr-15">
          <a-form-item label="신고구분">
            <SelectBoxCT :arrSelect="reportTypeSelectbox" v-model:valueInput="formState.companyName4"
              displayeExpr="text" valueExpr="id" width="150px" placeholder="선택" :searchEnabled="false" />
          </a-form-item>
        </a-rol> -->
        <a-rol class="mr-15">
          <a-form-item label="상태">
            <SelectBoxCT :searchEnabled="true" :arrSelect="situationSelectbox" v-model:valueInput="formState.companyName5"
              displayeExpr="text" valueExpr="id" width="150px" placeholder="선택" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="수임상태">
            <SelectBoxCT :searchEnabled="true" :arrSelect="acceptanceStatusSelectbox"
              v-model:valueInput="formState.companyName6" displayeExpr="text" valueExpr="id" width="150px"
              placeholder="선택" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="건강ED 연계상태">
            <SelectBoxCT :searchEnabled="true" :arrSelect="healthSelectbox" v-model:valueInput="formState.companyName7"
              displayeExpr="text" valueExpr="id" width="150px" placeholder="선택" />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="연금EDI 연계상태">
            <SelectBoxCT :searchEnabled="true" :arrSelect="healthSelectbox" v-model:valueInput="formState.companyName8"
              displayeExpr="text" valueExpr="id" width="150px" placeholder="선택" />
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
    <div class="content-grid">
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
        key-expr="id" class="mt-10" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
        :column-auto-width="true" @selection-changed="selectionChanged" :allowSelection="true" ref="tab1Bf520Ref">
        <DxScrolling mode="standard" show-scrollbar="always" />
        <!-- <DxColumnFixing :enabled="true" /> -->
        <DxEditing mode="row"/>
        <DxLoadPanel :enabled="true" :showPane="true" />
        <DxSelection mode="multiple" :fixed="true" />
        <DxColumn caption="일련번호" data-field="companyCode" :allow-editing="false" />
        <DxColumn caption="업체명" data-field="companyName" :allow-editing="false" />
        <DxColumn caption="사업자등록번호" data-field="inputYearMonth" :allow-editing="false" />
        <DxColumn caption="사업장관리번호" data-field="paymentYearMonth" :allow-editing="false" />
        <DxColumn caption="대표자명" data-field="reportType" width="95px" :allow-editing="false" />
        <DxColumn data-field="totalCollectedTaxAmount" caption="수임상태" width="125"
          edit-cell-template="totalCollectedTaxAmount" />
        <template #totalCollectedTaxAmount="{ data } : any">
          <SelectBoxCT :searchEnabled=" true " :arrSelect=" states1 "
            v-model:valueInput=" data.data.totalCollectedTaxAmount " displayeExpr="text" valueExpr="id" width="125px"
            placeholder="선택" />
        </template>
        <DxColumn data-field="statusUpdatedAt" caption="상태(처리상태)" width="125" edit-cell-template="statusUpdatedAt" />
        <template #statusUpdatedAt=" { data } : any ">
          <SelectBoxCT :searchEnabled=" true " :arrSelect=" states1 " v-model:valueInput=" data.data.statusUpdatedAt "
            displayeExpr="text" valueExpr="id" width="125px" placeholder="선택" />
        </template>
        <DxColumn data-field="productionStatus1" caption="메모" width="125" :allow-editing=" false ">
        </DxColumn>
        <DxColumn data-field="productionStatus2" caption="건강EDI 연계상태 " width="125" edit-cell-template="productionStatus2"  />
        <template #productionStatus2=" { data } : any ">
          <SelectBoxCT :searchEnabled=" true " :arrSelect=" states1 " v-model:valueInput=" data.data.productionStatus2 "
            displayeExpr="text" valueExpr="id" width="125px" placeholder="선택" />
        </template>
        <DxColumn data-field="productionStatus3" caption="연금EDI 연계상태 " width="125" edit-cell-template="productionStatus3"  />
        <template #productionStatus3=" { data } : any ">
          <SelectBoxCT :searchEnabled=" true " :arrSelect=" states1 " v-model:valueInput=" data.data.productionStatus3 "
            displayeExpr="text" valueExpr="id" width="125px" placeholder="선택" />
        </template>
        <DxColumn caption="관할지사정보수정" cell-template="productionStatus" :allow-editing=" false " />
        <template #productionStatus>
          <button-basic @onClick=" onOpenPop2 " mode="contained" type="default" text="수정" />
        </template>
        <DxColumn caption="리포트파일다운로드" cell-template="downA" alignment="right" :allow-editing=" false " />
        <template #downA=" { data } : any " class="custom-action">
          <div class="d-flex justify-content-center">
            <DxButton type="ghost" class="" style="cursor: pointer" @click=" onGetAcquistionRp(data.data.workId) ">
              <DownloadOutlined :style="{fontSize: 12}"/>
            </DxButton>
          </div>
        </template>
        <DxColumn caption="신청일" cell-template="downB" alignment="right" :allow-editing=" false " />
        <template #downB=" { data } : any " class="custom-action">
          <div class="d-flex justify-content-center">
            <!-- <DxButton type="ghost" class="" style="cursor: pointer" @click=" onGetAcquistionRp(data.data.workId) ">
              <DownloadOutlined :style="{fontSize: 12}"/>
            </DxButton> -->
          </div>
        </template>
        <DxColumn caption="완료일" cell-template="downC" alignment="right" :allow-editing=" false " />
        <template #downC=" { data } : any " class="custom-action">
          <div class="d-flex justify-content-center">
            <!-- <DxButton type="ghost" class="" style="cursor: pointer" @click=" onGetAcquistionRp(data.data.workId) ">
              <DownloadOutlined :style="{fontSize: 12}"/>
            </DxButton> -->
          </div>
        </template>
        <DxColumn caption="팩스발송" cell-template="downD" :allow-editing=" false " width="100px" />
        <template #downD=" { data } : any " class="custom-action">
          <div class="d-flex justify-content-center">
            <!-- <DxButton type="ghost" class="" style="cursor: pointer" @click="onGetAcquistionRp(data.data.workId)">
              <DownloadOutlined :size="12" />
            </DxButton> -->
            <button-basic @onClick=" onOpenPop1 " mode="contained" type="default" text="팩스발송" />
          </div>
        </template>
        <DxColumn caption="팩스상태" cell-template="downE" alignment="right" :allow-editing=" false " />
        <template #downE=" { data } : any " class="custom-action">
          <div class="d-flex justify-content-center">
            <!-- <DxButton type="ghost" class="" style="cursor: pointer" @click=" onGetAcquistionRp(data.data.workId) ">
              <DownloadOutlined :style="{fontSize: 12}"/>
            </DxButton> -->
          </div>
        </template>
        <DxColumn cell-template="history" :allow-editing=" false " />
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
import queries from '@/graphql/queries/BF/BF6/BF620/index';
import { useQuery } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import DxButton from 'devextreme-vue/button';
import { DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxLoadPanel, DxEditing, DxLookup, DxColumnFixing } from 'devextreme-vue/data-grid';
import { DownloadOutlined, SaveOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import notification from '@/utils/notification';
import { Message } from '@/configs/enum';
import { reportTypeSelectbox, situationSelectbox, acceptanceStatusSelectbox, healthSelectbox, formatMonth, dataTableTab1, states1 } from '../../utils/index'
import dayjs from 'dayjs';
import { isNumber } from 'lodash';
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
    const { move_column, colomn_resize } = store.state.settings;
    const tab1Bf520Ref = ref();

    //-----------------------Fcn common-----------------------------------------


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
      let {currentSelectedRowKeys, selectedRowsData} = event;
      tab1Bf520Ref.value.instance.editRow(currentSelectedRowKeys[0]-1);
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
      move_column, colomn_resize, dataSource,
      modalStatus1, modalStatus2,
      selectionChanged,
      formatMonth,
      searchWithholdingParam,
      filteredDataSource,
      reportTypeSelectbox, situationSelectbox, acceptanceStatusSelectbox, healthSelectbox, states1,
      onOpenPop1, onOpenPop2,
      onGetAcquistionRp,
      onOpenLogs, modalHistory,
      onSave,
      tab1Bf520Ref,
    };
  },
})
</script>
<style lang="scss">
@import '../../style/style.scss';
</style>
