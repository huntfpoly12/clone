<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" footer=""
        style="top: 20px" width="1368px" :bodyStyle="{ height: '890px' }">
      <div class="report-grid">
        <div class="header-1">원천세신고서</div>
        <div class="action-right">
          <img style="width: 30px;cursor: pointer;height: 36px;" src="@/assets/images/icon_delete.png" alt="" class="ml-3" @click="actionConfirmDelete">
          <img style="width: 35px;cursor: pointer;height: 38px;" src="@/assets/images/save_icon.svg" alt="" class="ml-3" @click="updateTaxWithholdingModifiy">
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
                          :dataRow="data.data" />
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
               <DxButton :text="getAfterDeadline(data.data.index,data.data.afterDeadline)?.tag_name" :style="getAfterDeadline(data.data.index,data.data.afterDeadline)?.style" :height="'33px'" />
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
      </div>
  </a-modal>
  <confirm-delete v-if="confirmStatus" :modalStatus="confirmStatus" @closePopup="actionCloseConfirm" :imputedYear="dataSource.imputedYear" :reportId="dataSource.reportId"></confirm-delete>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import DxButton from "devextreme-vue/button";
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxPaging, DxScrolling } from "devextreme-vue/data-grid";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { useQuery ,useMutation} from "@vue/apollo-composable";
import { mergeCellsModified, cellsSettingModified, dataModified ,calculateWithholdingStatusReportModified,inputPositionModified} from "./GridsettingModify"
import mutations from "@/graphql/mutations/PA/PA2/PA210/index";
import notification from "@/utils/notification"
import { useStore } from "vuex";
import { companyId } from "@/helpers/commonFunction";
import { getAfterDeadline} from "../../utils/index"
import ConfirmDelete from "./ConfirmDelete.vue"

// register Handsontable's modules
registerAllModules();

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
    DxItem, DxScrolling,DxButton,
    ConfirmDelete
  },
  setup(props, { emit }) {
    const wrapper =  ref<any>(null);
    const confirmStatus = ref<boolean>(false)
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
      data: dataModified,
      mergeCells: mergeCellsModified,
      cell: [
        ...cellsSettingModified,
      ],
      height: "auto",
      width: 'auto',
      licenseKey: "non-commercial-and-evaluation",
    };
    const store = useStore();
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const dataSource = ref<any>(props.dataReport);
    const setModalVisible = () => {
      emit('closePopup', false)
    }

    watch(() => props.dataReport,(newValue : any) => {
      dataSource.value = newValue
    })
    onMounted(() => {
      let hot  = wrapper.value?.hotInstance; 
      dataSource.value[0]?.statementAndAmountOfTaxPaids.forEach((data : any)=>{
          const rowPosition = inputPositionModified.find(item => item.className == data.code);
          if (data.numberOfPeople)
            hot.setDataAtCell(rowPosition?.value.inputPosition[0][0], rowPosition?.value.inputPosition[0][1], data.numberOfPeople);
          if (data.totalPayment)
            hot.setDataAtCell(rowPosition?.value.inputPosition[1][0], rowPosition?.value.inputPosition[1][1], data.totalPayment);
          if (data.collectedIncomeTax)
            hot.setDataAtCell(rowPosition?.value.inputPosition[2][0], rowPosition?.value.inputPosition[2][1], data.collectedIncomeTax);
          if (data.collectedRuralSpecialTax)
            hot.setDataAtCell(rowPosition?.value.inputPosition[3][0], rowPosition?.value.inputPosition[3][1], data.collectedRuralSpecialTax);
          if (data.collectedExtraTax)
            hot.setDataAtCell(rowPosition?.value.inputPosition[4][0], rowPosition?.value.inputPosition[4][1], data.collectedExtraTax);
          if (data.thisMonthAdjustedRefundTaxAmount)
            hot.setDataAtCell(rowPosition?.value.inputPosition[5][0], rowPosition?.value.inputPosition[5][1], data.thisMonthAdjustedRefundTaxAmount);
          if (data.incomeTaxPaid)
            hot.setDataAtCell(rowPosition?.value.inputPosition[6][0], rowPosition?.value.inputPosition[6][1], data.incomeTaxPaid);
          if (data.ruralSpecialTaxPaid)
            hot.setDataAtCell(rowPosition?.value.inputPosition[7][0], rowPosition?.value.inputPosition[7][1], data.ruralSpecialTaxPaid);

          // set modify value
          if (data.numberOfPeopleModified)
            hot.setDataAtCell(rowPosition?.value.modifiedPosition[0][0], rowPosition?.value.modifiedPosition[0][1], data.numberOfPeopleModified);
          if (data.totalPaymentModified)
            hot.setDataAtCell(rowPosition?.value.modifiedPosition[1][0], rowPosition?.value.modifiedPosition[1][1], data.totalPaymentModified);
          if (data.collectedIncomeTaxModified)
            hot.setDataAtCell(rowPosition?.value.modifiedPosition[2][0], rowPosition?.value.modifiedPosition[2][1], data.collectedIncomeTaxModified);
          if (data.collectedRuralSpecialTaxModified)
            hot.setDataAtCell(rowPosition?.value.modifiedPosition[3][0], rowPosition?.value.modifiedPosition[3][1], data.collectedRuralSpecialTaxModified);
          if (data.collectedExtraTaxModified)
            hot.setDataAtCell(rowPosition?.value.modifiedPosition[4][0], rowPosition?.value.modifiedPosition[4][1], data.collectedExtraTaxModified);
          if (data.thisMonthAdjustedRefundTaxAmountModified)
            hot.setDataAtCell(rowPosition?.value.modifiedPosition[5][0], rowPosition?.value.modifiedPosition[5][1], data.thisMonthAdjustedRefundTaxAmountModified);
          if (data.incomeTaxPaidModified)
            hot.setDataAtCell(rowPosition?.value.modifiedPosition[6][0], rowPosition?.value.modifiedPosition[6][1], data.incomeTaxPaidModified);
          if (data.ruralSpecialTaxPaidModified)
            hot.setDataAtCell(rowPosition?.value.modifiedPosition[7][0], rowPosition?.value.modifiedPosition[7][1], data.ruralSpecialTaxPaidModified);
      })
      // adjustment Of Refund Tax Amount
      const adjustment = dataSource.value[0]?.adjustmentOfRefundTaxAmount
      const adjustmentPosition = inputPositionModified.find(item => item.className == 'adjustmentOfRefundTaxAmount');
      if (adjustment?.prevMonthNonRefundableTaxAmount)
        hot.setDataAtCell(adjustmentPosition?.value.inputPosition[0][0], adjustmentPosition?.value.inputPosition[0][1], adjustment?.prevMonthNonRefundableTaxAmount);
      if (adjustment?.preRefundApplicationTaxAmount)
        hot.setDataAtCell(adjustmentPosition?.value.inputPosition[1][0], adjustmentPosition?.value.inputPosition[1][1], adjustment?.preRefundApplicationTaxAmount);
      if (adjustment?.deductibleBalance)
        hot.setDataAtCell(adjustmentPosition?.value.inputPosition[2][0], adjustmentPosition?.value.inputPosition[2][1], adjustment?.deductibleBalance);
      if (adjustment?.thisMonthRefundTaxGeneral)
        hot.setDataAtCell(adjustmentPosition?.value.inputPosition[3][0], adjustmentPosition?.value.inputPosition[3][1], adjustment?.thisMonthRefundTaxGeneral);
      if (adjustment?.thisMonthRefundTaxOtherFinancialCompany)
        hot.setDataAtCell(adjustmentPosition?.value.inputPosition[4][0], adjustmentPosition?.value.inputPosition[4][1], adjustment?.thisMonthRefundTaxOtherFinancialCompany);
      if (adjustment?.thisMonthRefundTaxOtherMerge)
        hot.setDataAtCell(adjustmentPosition?.value.inputPosition[5][0], adjustmentPosition?.value.inputPosition[5][1], adjustment?.thisMonthRefundTaxOtherMerge);
      if (adjustment?.refundTaxSubjectToAdjustment)
        hot.setDataAtCell(adjustmentPosition?.value.inputPosition[6][0], adjustmentPosition?.value.inputPosition[6][1], adjustment?.refundTaxSubjectToAdjustment);
      if (adjustment?.thisMonthTotalAdjustedRefundTaxAmount)
        hot.setDataAtCell(adjustmentPosition?.value.inputPosition[7][0], adjustmentPosition?.value.inputPosition[7][1], adjustment?.thisMonthTotalAdjustedRefundTaxAmount);
      if (adjustment?.nextMonthRefundTaxAmount)
        hot.setDataAtCell(adjustmentPosition?.value.inputPosition[8][0], adjustmentPosition?.value.inputPosition[8][1], adjustment?.nextMonthRefundTaxAmount);
      if (adjustment?.refundApplicationAmount)
        hot.setDataAtCell(adjustmentPosition?.value.inputPosition[9][0], adjustmentPosition?.value.inputPosition[9][1], adjustment?.refundApplicationAmount);

      // adjustment Of Refund Tax Amount modified
      if (adjustment?.prevMonthNonRefundableTaxAmountModified)
        hot.setDataAtCell(adjustmentPosition?.value.modifiedPosition[0][0], adjustmentPosition?.value.modifiedPosition[0][1], adjustment?.prevMonthNonRefundableTaxAmountModified);
      if (adjustment?.preRefundApplicationTaxAmountModified)
        hot.setDataAtCell(adjustmentPosition?.value.modifiedPosition[1][0], adjustmentPosition?.value.modifiedPosition[1][1], adjustment?.preRefundApplicationTaxAmountModified);
      if (adjustment?.deductibleBalanceModified)
        hot.setDataAtCell(adjustmentPosition?.value.modifiedPosition[2][0], adjustmentPosition?.value.modifiedPosition[2][1], adjustment?.deductibleBalanceModified);
      if (adjustment?.thisMonthRefundTaxGeneralModified)
        hot.setDataAtCell(adjustmentPosition?.value.modifiedPosition[3][0], adjustmentPosition?.value.modifiedPosition[3][1], adjustment?.thisMonthRefundTaxGeneralModified);
      if (adjustment?.thisMonthRefundTaxOtherFinancialCompanyModified)
        hot.setDataAtCell(adjustmentPosition?.value.modifiedPosition[4][0], adjustmentPosition?.value.modifiedPosition[4][1], adjustment?.thisMonthRefundTaxOtherFinancialCompanyModified);
      if (adjustment?.thisMonthRefundTaxOtherMergeModified)
        hot.setDataAtCell(adjustmentPosition?.value.modifiedPosition[5][0], adjustmentPosition?.value.modifiedPosition[5][1], adjustment?.thisMonthRefundTaxOtherMergeModified);
      if (adjustment?.refundTaxSubjectToAdjustmentModified)
        hot.setDataAtCell(adjustmentPosition?.value.modifiedPosition[6][0], adjustmentPosition?.value.modifiedPosition[6][1], adjustment?.refundTaxSubjectToAdjustmentModified);
      if (adjustment?.thisMonthTotalAdjustedRefundTaxAmountModified)
        hot.setDataAtCell(adjustmentPosition?.value.modifiedPosition[7][0], adjustmentPosition?.value.modifiedPosition[7][1], adjustment?.thisMonthTotalAdjustedRefundTaxAmountModified);
      if (adjustment?.nextMonthRefundTaxAmountModified)
        hot.setDataAtCell(adjustmentPosition?.value.modifiedPosition[8][0], adjustmentPosition?.value.modifiedPosition[8][1], adjustment?.nextMonthRefundTaxAmountModified);
      if (adjustment?.refundApplicationAmountModified)
        hot.setDataAtCell(adjustmentPosition?.value.modifiedPosition[9][0], adjustmentPosition?.value.modifiedPosition[9][1], adjustment?.refundApplicationAmountModified);
    })

    const loadNew = () => {
      calculateWithholdingStatusReportModified(wrapper)
    }

    const {
            mutate: actionUpdateTaxWithholding,
            onDone: doneUpdate,
            onError: errUpdate
        } = useMutation(mutations.updateTaxWithholdingStatusReport);
    doneUpdate(() => {
        notification('success', `업부상태 변경되었습니다!`)
    })
    errUpdate((error) => {
        notification('error', error.message)
    })

    const updateTaxWithholdingModifiy = () => {
      let hot = wrapper.value.hotInstance;
      const arrData = hot.getData()
      let statement = Array()
      for (let index = 0; index < arrData.length; index++) {
        if (index >= 4 && index <= 61 && arrData[index][4] != null) {
          statement.push({
            code: arrData[index][4],
            numberOfPeople: arrData[index+1][5] != '' ? arrData[index+1][5] : 0,
            numberOfPeopleModified: arrData[index][5] != '' ? arrData[index][5] : 0,

            totalPayment: arrData[index+1][6] != '' ? arrData[index+1][6] : 0,
            totalPaymentModified: arrData[index][6] != '' ? arrData[index][6] : 0,

            collectedIncomeTaxModified: arrData[index+1][7] != '' ? arrData[index+1][7] : 0,
            collectedIncomeTax: arrData[index][7] != '' ? arrData[index][7] : 0,

            collectedRuralSpecialTax: arrData[index+1][8] != '' ? arrData[index+1][8] : 0,
            collectedRuralSpecialTaxModified: arrData[index][8] != '' ? arrData[index][8] : 0,

            collectedExtraTax: arrData[index+1][9] != '' ? arrData[index+1][9] : 0,
            collectedExtraTaxModified: arrData[index][9] != '' ? arrData[index][9] : 0,

            thisMonthAdjustedRefundTaxAmount: arrData[index+1][10] != '' ? arrData[index+1][10] : 0,
            thisMonthAdjustedRefundTaxAmountModified: arrData[index][10] != '' ? arrData[index][10] : 0,

            incomeTaxPaid: arrData[index+1][11] != '' ? arrData[index+1][11] : 0,
            incomeTaxPaidModified: arrData[index][11] != '' ? arrData[index][11] : 0,

            ruralSpecialTaxPaid: arrData[index+1][12] != '' ? arrData[index+1][12] : 0,
            ruralSpecialTaxPaidModified: arrData[index][12] != '' ? arrData[index][12] : 0,
          });
        }
      }

      const variables = {
        companyId:companyId,
        reportId:dataSource.value[0].reportId,
        key:{
          imputedYear: dataSource.value[0].imputedYear,
          imputedMonth: dataSource.value[0].imputedMonth,
          paymentYear: dataSource.value[0].paymentYear,
          paymentMonth: dataSource.value[0].paymentMonth,
          reportType: dataSource.value[0].reportType,
          index: dataSource.value[0].index,
        },
        input:{
          paymentType: dataSource.value[0].paymentType,
          yearEndTaxAdjustment: dataSource.value[0].yearEndTaxAdjustment,
          additionalIncome: false,
          refund: dataSource.value[0].refund,
          afterDeadline: dataSource.value[0].afterDeadline,
          submissionDate: dataSource.value[0].submissionDate,
          reportClassCode: dataSource.value[0].reportClassCode,
          header:{
            withholdingDutyName: dataSource.value[0].header.withholdingDutyName,
            withholdingDutyPresidentName: dataSource.value[0].header.withholdingDutyPresidentName,
            withholdingDutyBizNumber: dataSource.value[0].header.withholdingDutyBizNumber,
            withholdingDutyAddress: dataSource.value[0].header.withholdingDutyAddress,
            withholdingDutyCollectivePayment: dataSource.value[0].header.withholdingDutyCollectivePayment,
            withholdingDutyTaxForEachBusiness: dataSource.value[0].header.withholdingDutyTaxForEachBusiness,
            withholdingDutyTelephone:  dataSource.value[0].header.withholdingDutyTelephone,
            withholdingDutyEmail: dataSource.value[0].header.withholdingDutyEmail,
          },
          statementAndAmountOfTaxPaids: statement,
          adjustmentOfRefundTaxAmount:{
            prevMonthNonRefundableTaxAmount: arrData[67][0] != '' ? arrData[67][0] : 0,
            prevMonthNonRefundableTaxAmountModified: arrData[66][0] != '' ? arrData[66][0] : 0,

            preRefundApplicationTaxAmount:  arrData[67][2] != '' ? arrData[67][2] : 0,
            preRefundApplicationTaxAmountModified:  arrData[66][2] != '' ? arrData[66][2] : 0,

            deductibleBalance:  arrData[67][4] != '' ? arrData[67][4] : 0,
            deductibleBalanceModified:  arrData[66][4] != '' ? arrData[66][4] : 0,

            thisMonthRefundTaxGeneral:  arrData[67][5] != '' ? arrData[67][5] : 0,
            thisMonthRefundTaxGeneralModified:  arrData[66][5] != '' ? arrData[66][5] : 0,

            thisMonthRefundTaxFiduciaryEstates:  arrData[67][6] != '' ? arrData[67][6] : 0,
            thisMonthRefundTaxFiduciaryEstatesModified:  arrData[66][6] != '' ? arrData[66][6] : 0,

            thisMonthRefundTaxOtherFinancialCompany:  arrData[67][7] != '' ? arrData[67][7] : 0,
            thisMonthRefundTaxOtherFinancialCompanyModified:  arrData[66][7] != '' ? arrData[66][7] : 0,

            thisMonthRefundTaxOtherMerge:  arrData[67][8] != '' ? arrData[67][8] : 0,
            thisMonthRefundTaxOtherMergeModified:  arrData[66][8] != '' ? arrData[66][8] : 0,

            refundTaxSubjectToAdjustment:  arrData[67][9] != '' ? arrData[67][9] : 0,
            refundTaxSubjectToAdjustmentModified:  arrData[66][9] != '' ? arrData[66][9] : 0,

            thisMonthTotalAdjustedRefundTaxAmount:  arrData[67][10] != '' ? arrData[67][10] : 0,
            thisMonthTotalAdjustedRefundTaxAmountModified:  arrData[66][10] != '' ? arrData[66][10] : 0,

            nextMonthRefundTaxAmount:  arrData[67][11] != '' ? arrData[67][11] : 0,
            nextMonthRefundTaxAmountModified:  arrData[66][11] != '' ? arrData[66][11] : 0,

            refundApplicationAmount:  arrData[67][12] != '' ? arrData[37][67] : 0,
            refundApplicationAmountModified:  arrData[66][12] != '' ? arrData[66][12] : 0,
          }
        }
      }
      actionUpdateTaxWithholding(variables)
    }

    const actionConfirmDelete = ()=>{
      confirmStatus.value = true
    }

    const actionCloseConfirm = (data: any) => {
      confirmStatus.value = false
    }
    return {
      setModalVisible,
      hotSettings,
      dataSource,
      per_page,
      wrapper,
      move_column,
      colomn_resize,
      loadNew,
      getAfterDeadline,
      updateTaxWithholdingModifiy,
      actionConfirmDelete,
      confirmStatus,
      actionCloseConfirm
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
