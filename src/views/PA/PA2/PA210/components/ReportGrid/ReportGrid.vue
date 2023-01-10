<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" footer=""
        style="top: 20px" width="1368px" :bodyStyle="{ height: '890px' }">
    <a-spin tip="Loading..." :spinning="loading">
      <div class="report-grid">
        <div class="header-1">원천세신고서</div>
        <div class="action-right">
          <DxButton class="ml-3">
              <img style="width: 30px;" src="@/assets/images/icon_delete.png" alt="">
          </DxButton>
          <DxButton class="ml-3">
              <img style="width: 34px;" src="@/assets/images/save_icon.svg" alt="">
          </DxButton>
          <button-basic  :width="150" text="새로불러오기" class="btn-get-income" @onClick="loadNew"></button-basic>
        </div>
        <div class="table-detail">
          <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
            :show-borders="true" key-expr="index" :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize" :column-auto-width="true" 
            :focused-row-enabled="true">
            <DxColumn caption="마감 현황" cell-template="status" css-class="cell-center"/>
            <template #status="{ data }">
              <process-status-tooltip v-model:valueStatus="data.data.status" :height="32"
                          :dataRow="data.data" @dataRow="changeStatus" />
            </template>
            <DxColumn caption="귀속연월" cell-template="imputedYear-imputedMonth" css-class="cell-center" />
            <template #imputedYear-imputedMonth="{ data }">
              {{data.data.imputedYear}}- {{data.data.imputedMonth}}
            </template>
            <DxColumn caption="지급연월" cell-template="paymentYear-paymentMonth" css-class="cell-center"/>
            <template #paymentYear-paymentMonth="{ data }">
              {{data.data.paymentYear}}- {{data.data.paymentMonth}}
            </template>
            <DxColumn caption="신고 종류" cell-template="afterDeadline-index" css-class="cell-center"/>
            <template #afterDeadline-index="{ data }">
              {{data.data.afterDeadline}} {{data.data.index}}
            </template>
            <DxColumn caption="연말" data-field="yearEndTaxAdjustment"/>
      
            <DxColumn caption="환급" cell-template="refund" :width="80" css-class="cell-center"/>
            <template #refund="{ data }">
              <switch-basic v-model:valueSwitch="data.data.refund" :textCheck="'X'" :textUnCheck="'O'" />
            </template>
            <DxColumn caption="제출일" cell-template="submission-date" :width="160"/>
            <template #submission-date="{ data }">
              <date-time-box v-model:valueDate="data.data.submissionDate"></date-time-box>
            </template>
            <DxScrolling column-rendering-mode="virtual"/>
          </DxDataGrid>
        </div>
        <div class="table-grid">
          <hot-table ref="wrapper" :settings="hotSettings"></hot-table>
        </div> 
        <div class="header-2">원천징수세액환급신청서 / 기납부세액명세서 검증 결과</div>
        <div class="verification-result">
          <div class="form-item">
            <label for="">저장가능여부</label>
          </div>
        </div>
        <div class="header-text-3">
          환급신청액 일치 여부
          <span>
            <img src="@/assets/images/iconInfo.png" style="width: 14px" />
            <p>아래 내역들의 값이 일치해야 정상입니다.</p>
          </span>
        </div>
        <a-row :gutter="[0, 10]">
              <a-col span="10"> 원천세신고서 > (21)환급신청액</a-col>
              <a-col span="12">
                <text-number-box :disabled="true" width="150px"></text-number-box>
              </a-col>
              <a-col span="10">원천징수세액환급신청서 > 기납부원천징수세액 (2)계 (합계)</a-col>
              <a-col span="12">
                <text-number-box :disabled="true" width="150px"></text-number-box>
              </a-col>
        </a-row>
        <div class="header-text-3">
          징수세액과 기납부세액 일치 여부 (A04(연말정산) 포함된 경우 해당)
          <span>
            <img src="@/assets/images/iconInfo.png" style="width: 14px" />
            <p>A04(연말정산) 포함된 경우 아래 내역들의 값이 일치해야 정상입니다.</p>
          </span>
        </div>
        <a-row :gutter="[0, 10]">
              <a-col span="10">원천징수세액환급신청서 > 기납부원천징수세액 (2)계 (A04)</a-col>
              <a-col span="12">
                <text-number-box :disabled="true" width="150px"></text-number-box>
              </a-col>
              <a-col span="10">기납부세액명세서 > 지급명세서기납부세액현황 (3)소득세등 (합계)</a-col>
              <a-col span="12">
                <text-number-box :disabled="true" width="150px"></text-number-box>
              </a-col>
        </a-row>
        <div class="header-text-3">
          기납부세액 차이조정현황
          <span>
            <img src="@/assets/images/iconInfo.png" style="width: 14px" />
            <p>차이금액 > 0 이면, 사유가 있어야 합니다.</p>
          </span>
        </div>
        <a-row :gutter="[0, 10]">
              <a-col span="10">(1)소득세 등 합계 (징수세액)</a-col>
              <a-col span="12">
                <text-number-box :disabled="true" width="150px"></text-number-box>
              </a-col>
              <a-col span="10">(3)소득세 등 합계 (기납부세액)</a-col>
              <a-col span="12">
                <text-number-box :disabled="true" width="150px"></text-number-box>
              </a-col>
              <a-col span="10">(차이금액 ((3)-(1))</a-col>
              <a-col span="12">
                <text-number-box :disabled="true" width="150px"></text-number-box>
              </a-col>
              <a-col span="10">사유</a-col>
              <a-col span="12">
                <text-number-box :disabled="true" width="150px"></text-number-box>
              </a-col>
        </a-row>
        <a-row style="margin-top: 20px;">
          <a-col :span="16" :offset="9">
              <button-basic text="저장 취소" :type="'default'" mode="outlined" 
                  :width="120" style="margin-right: 10px;" />
              <button-basic text="저장" :type="'default'" mode="'contained'"
                  :width="120" />
          </a-col>
        </a-row>
      </div>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxPaging, DxScrolling } from "devextreme-vue/data-grid";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { useQuery } from "@vue/apollo-composable";
import { mergeCells, cellsSetting, dataInit ,inputPosition} from "./Gridsetting"
import queries from "@/graphql/queries/PA/PA2/PA210/index";
import { useStore } from "vuex";
import { companyId } from "@/helpers/commonFunction";
import { ProcessStatus, WagePaymentType, WageReportType, WithholdingStatusReport } from "@bankda/jangbuda-common";
// register Handsontable's modules
registerAllModules();
// GraphQL로 원천징수이행상황신고서 작성을 위한 소득정보 데이터 유형
interface IncomeForTaxWithholdingStatusReport {
    code: string;
    numberOfPeople: number;
    totalPayment: number;
    collectedIncomeTax: number;
}
// 원천징수이행상황신고서 명세 및 납부세액 입력 
interface TaxWithholdingStatusReportStatementAndAmountOfTaxPaidInput {
    code: string;
    numberOfPeople: number;
    numberOfPeopleModified?: number;
    totalPayment: number;
    totalPaymentModified?: number;
    collectedIncomeTax: number;
    collectedIncomeTaxModified?: number;
    collectedRuralSpecialTax?: number;
    collectedRuralSpecialTaxModified?: number;
    collectedExtraTax?: number;
    collectedExtraTaxModified?: number;
    thisMonthAdjustedRefundTaxAmount?: number;
    thisMonthAdjustedRefundTaxAmountModified?: number;
    incomeTaxPaid?: number;
    incomeTaxPaidModified?: number;
    ruralSpecialTaxPaid?: number;
    ruralSpecialTaxPaidModified?: number;
}


export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
      default: false,
    },
    dataReport: {
      type: Array,
      default: [],
    }
  },
  components: {
    HotTable,
    DxDataGrid,
    DxColumn,
    DxToolbar, DxPaging,
    DxItem, DxScrolling
  },
  setup(props, { emit }) {
    const wrapper = ref()
    
    
    const hotSettings =  {
          comments: true,
          fillHandle: true,
          colWidths: 100,
          beforeKeyDown: (e: any) => {
              var reg = /[^\D\p{Hangul}!@#\$%\^\&*\)\(+=._]/g;
        if (!reg.test(e.key) && e.key != 'Backspace' && e.key != '-') {
          e.preventDefault()
        }
      },
      afterValidate: (isValid: boolean, value: any, row: any, prop: any, source: any) => {
        let hot = wrapper.value.hotInstance;
        
        if (isValid == false) {
          hot.setDataAtCell(row, hot.propToCol(prop), 0);
        }
      },
      hotRef: null,
      data: dataInit,
      mergeCells: mergeCells,
      cell: [
        ...cellsSetting,
      ],
      height: "auto",
      width: 'auto',
      licenseKey: "non-commercial-and-evaluation",
    };
    const store = useStore();
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const trigger = ref<boolean>(false)
    const dataSource = ref(props.dataReport);
    const originData = ref({
      companyId: companyId,
      input:{
        imputedYear: 2023,
        imputedMonth: 1,
        paymentYear: 2023,
        paymentMonth: 1,
        reportType: 1,
        index: 0,
        paymentType: 1,
        yearEndTaxAdjustment: true,
      }
    })
    const setModalVisible = () => {
      emit('closePopup', false)
    }

    const changeStatus = (data: any) => {
      //console.log(data);
      
    }
    watch(() => props.modalStatus, (newValue) => {
      if (newValue) {
       
      }
    })
    watch(() => props.dataReport,(newValue) => {
      dataSource.value = newValue
    })

    const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getIncomesForTaxWithholdingStatusReport, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
    }));
    watch(result, (data) => {
      if (data) {
        const newData = data.getIncomesForTaxWithholdingStatusReport.map((item: any) => {
          return {
            code: item.code,
            numberOfPeople: item.numberOfPeople,
            totalPayment: item.totalPayment,
            collectedIncomeTax: item.collectedIncomeTax,
          }
        });
        const output = WithholdingStatusReport.getWithholdingStatusReport(newData);
        console.log(output);
        
        if (output.incomeWages.length > 0) { // 근로소득 [간이세액(A01), 중도퇴사(A02), 일용근로(A03), 연말정산-합계(A04), 연말정산-분납신청(A05), 연말정산-납부금액(A06), 가감계(A10)]
          output.incomeWages.forEach((item) => {
            setValueDataTable(item.code,item)
          })
        }
        if (output.incomeRetirements.length > 0) { // 퇴직소득 [연금계좌(A12), 그외(A22), 가감계(A20)]
          output.incomeRetirements.forEach((item) => {
            setValueDataTable(item.code,item)
          })
        }
        if (output.incomeBusinesses.length > 0) { // 사업소득 [매월징수(A25), 연말정산(A26), 가감계(A30)]
          output.incomeBusinesses.forEach((item) => {
            setValueDataTable(item.code,item)
          })
        }
        if (output.incomeExtras.length > 0) { // 기타소득 [연금계좌(A41), 종교인소득-매월징수(A43), 종교인소득-연말정산(A44), 그외(A42), 가감계(A40)]
          output.incomeExtras.forEach((item) => {
            setValueDataTable(item.code,item)
          })
        }
        if (output.incomePensions.length > 0) { // 연금소득 [연금계좌(A48), 공적연금(A45), 연말정산(A46), 가감계(A47)]
          output.incomePensions.forEach((item) => {
            setValueDataTable(item.code,item)
          })
        }
        if (output.incomeInterest) { // 이자소득(A50)
           
        }
        if (output.incomeDividend) { // 배당소득(A60)
            
        }
        if (output.incomeSaving) { // 저축등해지추징세액등(A69)
           
        }
        if (output.modifyReport) { // 수정신고세액(A90)
            
        }
        setValueDataTable(output.summary.code,output.summary)
        //r.push(output.summary); // 총합계(A99)
      }
    })

    const loadNew = () => {
        trigger.value = true;
        refetchData()
    }
    const setValueDataTable = (code: string, data: any) => {
      let hot = wrapper.value.hotInstance;
      const rowPosition = inputPosition.find(item => item.className == code);
      if (data.numberOfPeople)
        hot.setDataAtCell(rowPosition?.value[0][0], rowPosition?.value[0][1], data.numberOfPeople);
      if (data.totalPayment)
        hot.setDataAtCell(rowPosition?.value[1][0], rowPosition?.value[1][1], data.totalPayment);
      if (data.collectedIncomeTax)
        hot.setDataAtCell(rowPosition?.value[2][0], rowPosition?.value[2][1], data.collectedIncomeTax);
      if (data.collectedRuralSpecialTax)
        hot.setDataAtCell(rowPosition?.value[3][0], rowPosition?.value[3][1], data.collectedRuralSpecialTax);
      if (data.collectedExtraTax)
        hot.setDataAtCell(rowPosition?.value[4][0], rowPosition?.value[4][1], data.collectedExtraTax);
      if (data.thisMonthAdjustedRefundTaxAmount)
        hot.setDataAtCell(rowPosition?.value[5][0], rowPosition?.value[5][1], data.thisMonthAdjustedRefundTaxAmount);
      if (data.incomeTaxPaid)
        hot.setDataAtCell(rowPosition?.value[6][0], rowPosition?.value[6][1], data.incomeTaxPaid);
      if (data.ruralSpecialTaxPaid)
        hot.setDataAtCell(rowPosition?.value[7][0], rowPosition?.value[7][1], data.ruralSpecialTaxPaid);
    }
    return {
      setModalVisible,
      loading,
      hotSettings,
      dataSource,
      per_page,
      wrapper,
      move_column,
      colomn_resize,
      changeStatus,
      loadNew
    }
  }
});
</script>
<style lang="scss" scoped>
:deep .ant-modal-body{
  padding-top: 30px;
}
:deep .cell-center {
    text-align: center !important
}
.report-grid{
  padding: 20px 0px 0px 5px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 860px;
  :deep td.disable-cell {
    color: #fff;
    background-color: #b3b4b3;
  }
  .action-right{
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-end;
  }
  .table-detail{
    margin-bottom: 5px;
  }
  .btn-get-income{
      color: white;
      background-color: #558ED5;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      height: 35px;
  }
  .table-grid{
   
    padding-bottom: 20px;
  }
  :deep .wtHolder {
    width: 100% !important;
   }

  :deep .ht_clone_left .wtHolder {
      overflow:hidden;
  }
  .header-1{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .header-2{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .header-text-3 {
    background-color: #C6D9F1;
    padding: 5px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
    margin-top: 10px;
    span {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #b3b4b3;
      float: right;

      p {
        margin: 5px 0px 3px 10px;
      }
    }
  }
}

</style>
