<template>
  <a-modal
    :visible="modalStatus"
    @cancel="setModalVisible"
    :mask-closable="false"
    footer=""
    style="top: 20px"
    width="1368px"
    :bodyStyle="{ height: '890px', padding: '8px' }"
  >
    <div class="report-grid">
      <div class="header-report">
        <div class="header-1">원천세신고서</div>
        <div class="action-right">
          <img
            style="width: 29px; cursor: pointer"
            src="@/assets/images/icon_delete.png"
            alt=""
            class="ml-3"
            @click="actionConfirmDelete"
          />
          <img
            style="width: 31px; cursor: pointer"
            src="@/assets/images/save_icon.svg"
            alt=""
            class="ml-3"
            @click="updateTaxWithholdingModifiy"
          />
          <button-basic
            :width="150"
            text="새로불러오기"
            class="btn-get-income"
            @onClick="actionConfirmLoadNew"
          ></button-basic>
        </div>
        <div class="table-detail">
          <DxDataGrid
            :show-row-lines="true"
            :hoverStateEnabled="true"
            :data-source="dataSource"
            :show-borders="true"
            key-expr="index"
            :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize"
            :column-auto-width="true"
            :focused-row-enabled="true"
          >
            <DxColumn
              caption="마감 현황"
              cell-template="status"
              css-class="cell-center"
            />
            <template #status="{ data }">
              <process-status-tooltip
                :valueStatus="10"
                :height="32"
                :dataRow="data.data"
              />
            </template>
            <DxColumn
              caption="귀속연월"
              cell-template="imputedYear-imputedMonth"
              css-class="cell-center"
            />
            <template #imputedYear-imputedMonth="{ data }">
              <a-tooltip>
                <template #title>
                  귀속기간{{
                    showTooltipYearMonth(
                      data.data.reportType,
                      data.data.imputedStartYearMonth,
                      data.data.imputedFinishYearMonth
                    )
                  }}
                </template>
                <div class="custom-grade-cell">
                  <DxButton
                    :text="
                      '귀 ' +
                      data.data.imputedYear +
                      '-' +
                      (data.data.imputedMonth > 9
                        ? data.data.imputedMonth
                        : '0' + data.data.imputedMonth)
                    "
                    :style="{ color: 'white', backgroundColor: 'gray' }"
                    :height="$config_styles.HeightInput"
                  />
                </div>
              </a-tooltip>
            </template>
            <DxColumn
              caption="지급연월"
              cell-template="paymentYear-paymentMonth"
              css-class="cell-center"
            />
            <template #paymentYear-paymentMonth="{ data }">
              <a-tooltip>
                <template #title>
                  지급기간{{
                    showTooltipYearMonth(
                      data.data.reportType,
                      data.data.paymentStartYearMonth,
                      data.data.paymentFinishYearMonth
                    )
                  }}
                </template>
                <div class="custom-grade-cell">
                  <DxButton
                    :text="
                      '지 ' +
                      data.data.paymentYear +
                      '-' +
                      (data.data.paymentMonth > 9
                        ? data.data.paymentMonth
                        : '0' + data.data.paymentMonth)
                    "
                    :style="{ color: 'white', backgroundColor: 'black' }"
                    :height="$config_styles.HeightInput"
                  />
                </div>
              </a-tooltip>
            </template>
            <DxColumn
              caption="신고 종류"
              cell-template="afterDeadline-index"
              css-class="cell-center"
            />
            <template #afterDeadline-index="{ data }">
              <DxButton
                :text="
                  getAfterDeadline(data.data.index + 1, data.data.afterDeadline)
                    ?.tag_name
                "
                :style="
                  getAfterDeadline(data.data.index + 1, data.data.afterDeadline)
                    ?.style
                "
                :height="$config_styles.HeightInput"
              />
            </template>
            <DxColumn
              caption="연말"
              cell-template="yearEndTaxAdjustment"
              css-class="cell-center"
            />
            <template #yearEndTaxAdjustment="{ data }">
              <DxCheckBox
                v-model:value="data.data.yearEndTaxAdjustment"
                :disabled="true"
              />
            </template>
            <DxColumn
              caption="환급"
              cell-template="refund"
              :width="80"
              css-class="cell-center"
            />
            <template #refund="{ data }">
              <a-tooltip  :title="'환급신청여부'">
                  <div>
                    <switch-basic
                      v-model:valueSwitch="data.data.refund"
                      :textCheck="'O'"
                      :textUnCheck="'X'"
                      :disabled="disabledRefund"
                      />
                  </div>
              </a-tooltip>
            </template>
            <DxColumn
              caption="제출일"
              cell-template="submission-date"
              :width="160"
            />
            <template #submission-date="{ data }">
              <date-time-box
                :valueDate="data.data.submissionDate"
                :disabled="true"
                :teleport="true"
              ></date-time-box>
            </template>
          </DxDataGrid>
        </div>
      </div>
      <div class="table-grid">
        <hot-table ref="wrapper" :settings="hotSettings"></hot-table>
      </div>
    </div>
  </a-modal>
  <confirm-delete
    v-if="confirmStatus"
    :modalStatus="confirmStatus"
    @closePopup="actionCloseConfirm"
    :imputedYear="dataSource[0].imputedYear"
    :reportId="dataSource[0].reportId"
  ></confirm-delete>
  <confirmload-new
    v-if="confirmLoadNewStatus"
    :modalStatus="confirmLoadNewStatus"
    @closePopup="confirmLoadNewStatus = false"
    @loadNewAction="loadNew"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import DxButton from "devextreme-vue/button";
import { DxCheckBox } from "devextreme-vue/check-box";
import {
  DxDataGrid,
  DxColumn,
  DxToolbar,
  DxItem,
  DxPaging,
  DxScrolling,
} from "devextreme-vue/data-grid";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { useMutation, useQuery } from "@vue/apollo-composable";
import {
  mergeCellsModified,
  cellsSettingModified,
  dataModified,
  calculateWithholdingStatusReportModified,
  inputPositionModified,
  clearAllCellValue,
} from "./GridsettingModify";
import mutations from "@/graphql/mutations/PA/PA2/PA210/index";
import queries from "@/graphql/queries/PA/PA2/PA210/index";
import notification from "@/utils/notification";
import { useStore } from "vuex";
import { companyId } from "@/helpers/commonFunction";
import { getAfterDeadline, showTooltipYearMonth } from "../../utils/index";
import ConfirmDelete from "./ConfirmDelete.vue";
import ConfirmloadNew from "./ConfirmloadNew.vue";
import { Message } from "@/configs/enum";
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
    },
  },
  components: {
    HotTable,
    DxDataGrid,
    DxColumn,
    DxToolbar,
    DxPaging,
    DxItem,
    DxScrolling,
    DxButton,
    DxCheckBox,
    ConfirmDelete,
    ConfirmloadNew,
  },
  setup(props, { emit }) {
    const wrapper = ref<any>(null);
    const confirmStatus = ref<boolean>(false);
    const disabledRefund = ref<boolean>(false);
    const confirmLoadNewStatus = ref<boolean>(false);
    const firstTimeLoad = ref<boolean>(false);
    const cellNegativeNumber = [[7,7],[15,7],[59,7]]
    const hotSettings = {
      comments: true,
      fillHandle: true,
      colWidths: 102.5,
      height: 740,
      fixedRowsTop: 4,
      beforeKeyDown: (e: any) => {
        let hot = wrapper.value.hotInstance;
        const selection = hot.getSelected();
        var reg = /[^\D\p{Hangul}!@#\$%\^\&*\)\(+=._]/g;
        if (
          !cellNegativeNumber.some((item : any) => item[0] === selection[0][0] && item[1] === selection[0][1]) && // kiểm tra xem có p phải thuộc ô được phép điền số âm không
          !reg.test(e.key) && 
          e.key != "Backspace"
        ) {
          if(e.key == 'Process') hot.setDataAtCell(selection[0][0], selection[0][1],null,'validateEdit'); // kiểm tra xem có phải kí tự hangul không nếu là hanggul thì key sẽ trẻ về là process
          e.preventDefault();
        }
        // nêu đang nhập ở các ô đặc biệt đươc nhập số âm thì check như sau
        if (
          cellNegativeNumber.some((item: any) => item[0] === selection[0][0] && item[1] === selection[0][1]) && 
          !reg.test(e.key) &&
          e.key != "Backspace" &&
          e.key != "-"
        ) {
          if(e.key == 'Process') hot.setDataAtCell(selection[0][0], selection[0][1],null,'validateEdit');
          e.preventDefault();
        }
      },
      afterValidate: (isValid: boolean, value: any, row: any, prop: any) => {
        let hot = wrapper.value.hotInstance;
        if (isValid == false) {
          hot.setDataAtCell(row, hot.propToCol(prop),null,'validateEdit');
        }
      },
      afterChange: async (changes: any, source: string) => {
        if (source == "edit") {
          const { checkYETaxAdj, cell12 } = await calculateWithholdingStatusReportModified(wrapper);
          // kiểm tra disable refun theo cell 12
          if (!cell12) {
            dataSource.value[0].refund = false
            disabledRefund.value = true
          }
          dataSource.value[0].yearEndTaxAdjustment = checkYETaxAdj
          store.commit("common/setHasChangedPopupPA210", true);
        }
      },
      hotRef: null,
      data: dataModified,
      mergeCells: mergeCellsModified,
      cell: [...cellsSettingModified],
      width: "auto",
      licenseKey: "non-commercial-and-evaluation",
    };
    const store = useStore();
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const dataSource = ref<any>(props.dataReport);
    const trigger = ref<boolean>(false);
    const originData = ref();
    const setModalVisible = () => {
      emit("closePopup", false);
    };

    watch(
      () => props.dataReport,
      (newValue: any) => {
        dataSource.value = newValue;
      }
    );
    // load new data when first time open popup
    onMounted(() => {
      loadNew();
    });

    // Get IncomesForTaxWithholdingStatusReport
    const {
      refetch: refetchData,
      result,
      loading,
      onError,
    } = useQuery(
      queries.getIncomesForTaxWithholdingStatusReport,
      originData,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    const actionConfirmLoadNew = () => {
      confirmLoadNewStatus.value = true;
    };
    onError((error) => {
      ////notification('error', error.message)
    });
    watch(result, (data) => {
      if (data) {
        // make new format for data
        const newData = data.getIncomesForTaxWithholdingStatusReport.map(
          (item: any) => {
            return {
              code: item.code,
              numberOfPeople: item.numberOfPeople,
              totalPayment: item.totalPayment,
              collectedIncomeTax: item.collectedIncomeTax,
            };
          }
        );
        calculateWithholdingStatusReportModified(wrapper, newData);
      }
    });
    // The above code is used to load the data from the database to the table.
    const loadNew = () => {
      clearAllCellValue(wrapper);
      // call api to set modified value
      originData.value = {
        companyId: companyId,
        input: {
          imputedYear: dataSource.value[0].imputedYear,
          imputedMonth: dataSource.value[0].imputedMonth,
          paymentYear: dataSource.value[0].paymentYear,
          paymentMonth: dataSource.value[0].paymentMonth,
          reportType: dataSource.value[0].reportType,
          index: dataSource.value[0].index,
          paymentType: dataSource.value[0].paymentType,
          yearEndTaxAdjustment: dataSource.value[0].yearEndTaxAdjustment,
        },
      };
      trigger.value = true;
      refetchData();

      let hot = wrapper.value?.hotInstance;
      //Put in a loop to set data into each cell
      dataSource.value[0]?.statementAndAmountOfTaxPaids.forEach((data: any) => {
        if (!data.code) {
          return;
        }

        const rowPosition = inputPositionModified.find(
          (item) => item.className == data.code
        );
        if (data.numberOfPeople)
          hot.setDataAtCell(
            rowPosition?.value.inputPosition[0][0],
            rowPosition?.value.inputPosition[0][1],
            data.numberOfPeople,
            "initTable"
          );
        if (data.totalPayment)
          hot.setDataAtCell(
            rowPosition?.value.inputPosition[1][0],
            rowPosition?.value.inputPosition[1][1],
            data.totalPayment,
            "initTable"
          );
        if (data.collectedIncomeTax)
          hot.setDataAtCell(
            rowPosition?.value.inputPosition[2][0],
            rowPosition?.value.inputPosition[2][1],
            data.collectedIncomeTax,
            "initTable"
          );
        if (data.collectedRuralSpecialTax)
          hot.setDataAtCell(
            rowPosition?.value.inputPosition[3][0],
            rowPosition?.value.inputPosition[3][1],
            data.collectedRuralSpecialTax,
            "initTable"
          );
        if (data.collectedExtraTax)
          hot.setDataAtCell(
            rowPosition?.value.inputPosition[4][0],
            rowPosition?.value.inputPosition[4][1],
            data.collectedExtraTax,
            "initTable"
          );
        if (data.thisMonthAdjustedRefundTaxAmount)
          hot.setDataAtCell(
            rowPosition?.value.inputPosition[5][0],
            rowPosition?.value.inputPosition[5][1],
            data.thisMonthAdjustedRefundTaxAmount,
            "initTable"
          );
        if (data.incomeTaxPaid)
          hot.setDataAtCell(
            rowPosition?.value.inputPosition[6][0],
            rowPosition?.value.inputPosition[6][1],
            data.incomeTaxPaid,
            "initTable"
          );
        if (data.ruralSpecialTaxPaid)
          hot.setDataAtCell(
            rowPosition?.value.inputPosition[7][0],
            rowPosition?.value.inputPosition[7][1],
            data.ruralSpecialTaxPaid,
            "initTable"
          );

        // set modify value
        if (data.numberOfPeopleModified)
          hot.setDataAtCell(
            rowPosition?.value.modifiedPosition[0][0],
            rowPosition?.value.modifiedPosition[0][1],
            data.numberOfPeopleModified,
            "initTable"
          );
        if (data.totalPaymentModified)
          hot.setDataAtCell(
            rowPosition?.value.modifiedPosition[1][0],
            rowPosition?.value.modifiedPosition[1][1],
            data.totalPaymentModified,
            "initTable"
          );
        if (data.collectedIncomeTaxModified)
          hot.setDataAtCell(
            rowPosition?.value.modifiedPosition[2][0],
            rowPosition?.value.modifiedPosition[2][1],
            data.collectedIncomeTaxModified,
            "initTable"
          );
        if (data.collectedRuralSpecialTaxModified)
          hot.setDataAtCell(
            rowPosition?.value.modifiedPosition[3][0],
            rowPosition?.value.modifiedPosition[3][1],
            data.collectedRuralSpecialTaxModified,
            "initTable"
          );
        if (data.collectedExtraTaxModified)
          hot.setDataAtCell(
            rowPosition?.value.modifiedPosition[4][0],
            rowPosition?.value.modifiedPosition[4][1],
            data.collectedExtraTaxModified,
            "initTable"
          );
        if (data.thisMonthAdjustedRefundTaxAmountModified)
          hot.setDataAtCell(
            rowPosition?.value.modifiedPosition[5][0],
            rowPosition?.value.modifiedPosition[5][1],
            data.thisMonthAdjustedRefundTaxAmountModified,
            "initTable"
          );
        if (data.incomeTaxPaidModified)
          hot.setDataAtCell(
            rowPosition?.value.modifiedPosition[6][0],
            rowPosition?.value.modifiedPosition[6][1],
            data.incomeTaxPaidModified,
            "initTable"
          );
        if (data.ruralSpecialTaxPaidModified)
          hot.setDataAtCell(
            rowPosition?.value.modifiedPosition[7][0],
            rowPosition?.value.modifiedPosition[7][1],
            data.ruralSpecialTaxPaidModified,
            "initTable"
          );
      });
      // adjustment Of Refund Tax Amount
      const adjustment = dataSource.value[0]?.adjustmentOfRefundTaxAmount;
      const adjustmentPosition = inputPositionModified.find(
        (item) => item.className == "adjustmentOfRefundTaxAmount"
      );
      if (adjustment?.prevMonthNonRefundableTaxAmount)
        hot.setDataAtCell(
          adjustmentPosition?.value.inputPosition[0][0],
          adjustmentPosition?.value.inputPosition[0][1],
          adjustment?.prevMonthNonRefundableTaxAmount,
          "initTable"
        );
      if (adjustment?.preRefundApplicationTaxAmount)
        hot.setDataAtCell(
          adjustmentPosition?.value.inputPosition[1][0],
          adjustmentPosition?.value.inputPosition[1][1],
          adjustment?.preRefundApplicationTaxAmount,
          "initTable"
        );
      if (adjustment?.deductibleBalance)
        hot.setDataAtCell(
          adjustmentPosition?.value.inputPosition[2][0],
          adjustmentPosition?.value.inputPosition[2][1],
          adjustment?.deductibleBalance,
          "initTable"
        );
      if (adjustment?.thisMonthRefundTaxGeneral)
        hot.setDataAtCell(
          adjustmentPosition?.value.inputPosition[3][0],
          adjustmentPosition?.value.inputPosition[3][1],
          adjustment?.thisMonthRefundTaxGeneral,
          "initTable"
        );
      if (adjustment?.thisMonthRefundTaxOtherFinancialCompany)
        hot.setDataAtCell(
          adjustmentPosition?.value.inputPosition[4][0],
          adjustmentPosition?.value.inputPosition[4][1],
          adjustment?.thisMonthRefundTaxOtherFinancialCompany,
          "initTable"
        );
      if (adjustment?.thisMonthRefundTaxOtherMerge)
        hot.setDataAtCell(
          adjustmentPosition?.value.inputPosition[5][0],
          adjustmentPosition?.value.inputPosition[5][1],
          adjustment?.thisMonthRefundTaxOtherMerge,
          "initTable"
        );
      if (adjustment?.refundTaxSubjectToAdjustment)
        hot.setDataAtCell(
          adjustmentPosition?.value.inputPosition[6][0],
          adjustmentPosition?.value.inputPosition[6][1],
          adjustment?.refundTaxSubjectToAdjustment,
          "initTable"
        );
      if (adjustment?.thisMonthTotalAdjustedRefundTaxAmount)
        hot.setDataAtCell(
          adjustmentPosition?.value.inputPosition[7][0],
          adjustmentPosition?.value.inputPosition[7][1],
          adjustment?.thisMonthTotalAdjustedRefundTaxAmount,
          "initTable"
        );
      if (adjustment?.nextMonthRefundTaxAmount)
        hot.setDataAtCell(
          adjustmentPosition?.value.inputPosition[8][0],
          adjustmentPosition?.value.inputPosition[8][1],
          adjustment?.nextMonthRefundTaxAmount,
          "initTable"
        );
      if (adjustment?.refundApplicationAmount)
        hot.setDataAtCell(
          adjustmentPosition?.value.inputPosition[9][0],
          adjustmentPosition?.value.inputPosition[9][1],
          adjustment?.refundApplicationAmount,
          "initTable"
        );

      // adjustment Of Refund Tax Amount modified
      if (adjustment?.prevMonthNonRefundableTaxAmountModified)
        hot.setDataAtCell(
          adjustmentPosition?.value.modifiedPosition[0][0],
          adjustmentPosition?.value.modifiedPosition[0][1],
          adjustment?.prevMonthNonRefundableTaxAmountModified,
          "initTable"
        );
      if (adjustment?.preRefundApplicationTaxAmountModified)
        hot.setDataAtCell(
          adjustmentPosition?.value.modifiedPosition[1][0],
          adjustmentPosition?.value.modifiedPosition[1][1],
          adjustment?.preRefundApplicationTaxAmountModified,
          "initTable"
        );
      if (adjustment?.deductibleBalanceModified)
        hot.setDataAtCell(
          adjustmentPosition?.value.modifiedPosition[2][0],
          adjustmentPosition?.value.modifiedPosition[2][1],
          adjustment?.deductibleBalanceModified,
          "initTable"
        );
      if (adjustment?.thisMonthRefundTaxGeneralModified)
        hot.setDataAtCell(
          adjustmentPosition?.value.modifiedPosition[3][0],
          adjustmentPosition?.value.modifiedPosition[3][1],
          adjustment?.thisMonthRefundTaxGeneralModified,
          "initTable"
        );
      if (adjustment?.thisMonthRefundTaxOtherFinancialCompanyModified)
        hot.setDataAtCell(
          adjustmentPosition?.value.modifiedPosition[4][0],
          adjustmentPosition?.value.modifiedPosition[4][1],
          adjustment?.thisMonthRefundTaxOtherFinancialCompanyModified,
          "initTable"
        );
      if (adjustment?.thisMonthRefundTaxOtherMergeModified)
        hot.setDataAtCell(
          adjustmentPosition?.value.modifiedPosition[5][0],
          adjustmentPosition?.value.modifiedPosition[5][1],
          adjustment?.thisMonthRefundTaxOtherMergeModified,
          "initTable"
        );
      if (adjustment?.refundTaxSubjectToAdjustmentModified)
        hot.setDataAtCell(
          adjustmentPosition?.value.modifiedPosition[6][0],
          adjustmentPosition?.value.modifiedPosition[6][1],
          adjustment?.refundTaxSubjectToAdjustmentModified,
          "initTable"
        );
      if (adjustment?.thisMonthTotalAdjustedRefundTaxAmountModified)
        hot.setDataAtCell(
          adjustmentPosition?.value.modifiedPosition[7][0],
          adjustmentPosition?.value.modifiedPosition[7][1],
          adjustment?.thisMonthTotalAdjustedRefundTaxAmountModified,
          "initTable"
        );
      if (adjustment?.nextMonthRefundTaxAmountModified)
        hot.setDataAtCell(
          adjustmentPosition?.value.modifiedPosition[8][0],
          adjustmentPosition?.value.modifiedPosition[8][1],
          adjustment?.nextMonthRefundTaxAmountModified,
          "initTable"
        );
      if (adjustment?.refundApplicationAmountModified)
        hot.setDataAtCell(
          adjustmentPosition?.value.modifiedPosition[9][0],
          adjustmentPosition?.value.modifiedPosition[9][1],
          adjustment?.refundApplicationAmountModified,
          "initTable"
        );
      checkDisableA04A06()
      checkDisableRefund()
    };

    const {
      mutate: actionCreateTaxWithholding,
      onDone: doneChangeStatus,
      onError: errChangeStatus,
    } = useMutation(mutations.createTaxWithholdingStatusReport);

    doneChangeStatus((result: any) => {
      store.state.common.focusedRowKeyPA210 =
        result.data.createTaxWithholdingStatusReport.reportId;
      store.commit("common/setHasChangedPopupPA210", false);
      notification("success", Message.getMessage("COMMON", "106").message);
      setModalVisible();
    });
    errChangeStatus((error) => {
      ////notification('error', error.message)
      setModalVisible();
    });

    // The above code is a function that is called when the user clicks the "수정" button.
    const updateTaxWithholdingModifiy = () => {
      let hot = wrapper.value.hotInstance;
      const arrData = hot.getData();
      let statement = Array();
      for (let index = 0; index < arrData.length; index++) {
        if (
          index >= 4 &&
          index <= 61 &&
          arrData[index][4] &&
          (
            arrData[index + 1][5] != null ||
            arrData[index + 1][6] != null ||
            arrData[index + 1][7] != null ||
            arrData[index + 1][8] != null ||
            arrData[index + 1][9] != null ||
            arrData[index + 1][10] != null ||
            arrData[index + 1][11] != null ||
            arrData[index + 1][12] != null
          )
        ) {
          statement.push({
            code: arrData[index][4],
            numberOfPeopleModified:
              arrData[index + 1][5] != null ? arrData[index + 1][5] : 0,
            numberOfPeople: arrData[index][5] != null ? arrData[index][5] : 0,

            totalPaymentModified:
              arrData[index + 1][6] != null ? arrData[index + 1][6] : 0,
            totalPayment: arrData[index][6] != null ? arrData[index][6] : 0,

            collectedIncomeTaxModified:
              arrData[index + 1][7] != null ? arrData[index + 1][7] : 0,
            collectedIncomeTax: arrData[index][7] != null ? arrData[index][7] : 0,

            collectedRuralSpecialTaxModified:
              arrData[index + 1][8] != null ? arrData[index + 1][8] : 0,
            collectedRuralSpecialTax:
              arrData[index][8] != null ? arrData[index][8] : 0,

            collectedExtraTaxModified:
              arrData[index + 1][9] != null ? arrData[index + 1][9] : 0,
            collectedExtraTax: arrData[index][9] != null ? arrData[index][9] : 0,

            thisMonthAdjustedRefundTaxAmountModified:
              arrData[index + 1][10] != null ? arrData[index + 1][10] : 0,
            thisMonthAdjustedRefundTaxAmount:
              arrData[index][10] != null ? arrData[index][10] : 0,

            incomeTaxPaidModified:
              arrData[index + 1][11] != null ? arrData[index + 1][11] : 0,
            incomeTaxPaid: arrData[index][11] != null ? arrData[index][11] : 0,

            ruralSpecialTaxPaidModified:
              arrData[index + 1][12] != null ? arrData[index + 1][12] : 0,
            ruralSpecialTaxPaid:
              arrData[index][12] != null ? arrData[index][12] : 0,
          });
        }
      }

      const variables = {
        companyId: companyId,
        //reportId:dataSource.value[0].reportId,
        key: {
          imputedYear: dataSource.value[0].imputedYear,
          imputedMonth: dataSource.value[0].imputedMonth,
          paymentYear: dataSource.value[0].paymentYear,
          paymentMonth: dataSource.value[0].paymentMonth,
          reportType: dataSource.value[0].reportType,
          index: dataSource.value[0].index + 1, // increase index value 1
        },
        input: {
          paymentType: dataSource.value[0].paymentType,
          yearEndTaxAdjustment: dataSource.value[0].yearEndTaxAdjustment,
          additionalIncome: false,
          refund: dataSource.value[0].refund,
          afterDeadline: dataSource.value[0].afterDeadline,
          submissionDate: parseInt(dataSource.value[0].submissionDate),
          reportClassCode: dataSource.value[0].reportClassCode,
          header: {
            withholdingDutyName: dataSource.value[0].header.withholdingDutyName,
            withholdingDutyPresidentName:
              dataSource.value[0].header.withholdingDutyPresidentName,
            withholdingDutyBizNumber:
              dataSource.value[0].header.withholdingDutyBizNumber,
            withholdingDutyAddress:
              dataSource.value[0].header.withholdingDutyAddress,
            withholdingDutyCollectivePayment:
              dataSource.value[0].header.withholdingDutyCollectivePayment,
            withholdingDutyTaxForEachBusiness:
              dataSource.value[0].header.withholdingDutyTaxForEachBusiness,
            withholdingDutyTelephone:
              dataSource.value[0].header.withholdingDutyTelephone,
            withholdingDutyEmail:
              dataSource.value[0].header.withholdingDutyEmail,
          },
          statementAndAmountOfTaxPaids: statement,
          adjustmentOfRefundTaxAmount: {
            prevMonthNonRefundableTaxAmount:
              arrData[66][0] != null ? arrData[66][0] : 0,
            prevMonthNonRefundableTaxAmountModified:
              arrData[67][0] != null ? arrData[67][0] : 0,

            preRefundApplicationTaxAmount:
              arrData[66][2] != null ? arrData[66][2] : 0,
            preRefundApplicationTaxAmountModified:
              arrData[67][2] != null ? arrData[67][2] : 0,

            deductibleBalance: arrData[66][4] != null ? arrData[66][4] : 0,
            deductibleBalanceModified:
              arrData[67][4] != null ? arrData[67][4] : 0,

            thisMonthRefundTaxGeneral:
              arrData[66][5] != null ? arrData[66][5] : 0,
            thisMonthRefundTaxGeneralModified:
              arrData[67][5] != null ? arrData[67][5] : 0,

            thisMonthRefundTaxFiduciaryEstates:
              arrData[66][6] != null ? arrData[66][6] : 0,
            thisMonthRefundTaxFiduciaryEstatesModified:
              arrData[67][6] != null ? arrData[67][6] : 0,

            thisMonthRefundTaxOtherFinancialCompany:
              arrData[66][7] != null ? arrData[66][7] : 0,
            thisMonthRefundTaxOtherFinancialCompanyModified:
              arrData[67][7] != null ? arrData[67][7] : 0,

            thisMonthRefundTaxOtherMerge:
              arrData[66][8] != null ? arrData[66][8] : 0,
            thisMonthRefundTaxOtherMergeModified:
              arrData[67][8] != null ? arrData[67][8] : 0,

            refundTaxSubjectToAdjustment:
              arrData[66][9] != null ? arrData[66][9] : 0,
            refundTaxSubjectToAdjustmentModified:
              arrData[67][9] != null ? arrData[67][9] : 0,

            thisMonthTotalAdjustedRefundTaxAmount:
              arrData[66][10] != null ? arrData[66][10] : 0,
            thisMonthTotalAdjustedRefundTaxAmountModified:
              arrData[67][10] != null ? arrData[67][10] : 0,

            nextMonthRefundTaxAmount:
              arrData[66][11] != null ? arrData[66][11] : 0,
            nextMonthRefundTaxAmountModified:
              arrData[67][11] != null ? arrData[67][11] : 0,

            refundApplicationAmount:
              arrData[66][12] != null ? arrData[37][66] : 0,
            refundApplicationAmountModified:
              arrData[67][12] != null ? arrData[67][12] : 0,
          },
        },
      };
      actionCreateTaxWithholding(variables);
    };

    // The above code is creating a function called actionConfirmDelete. This function is setting the value
    // of confirmStatus to true.
    const actionConfirmDelete = () => {
      confirmStatus.value = true;
    };

    // Creating a function that will close the confirm box.
    const actionCloseConfirm = () => {
      confirmStatus.value = false;
      setModalVisible();
    };

    // update cell settings flow condition
    const checkDisableA04A06 = () => {
      let hot = wrapper.value.hotInstance;
      let newCellSetting = [...JSON.parse(JSON.stringify(cellsSettingModified))]

      // check các trường hợp để disable A04 A06
      if (
        (dataSource.value[0].reportType == 1 && dataSource.value[0].paymentType == 1 && dataSource.value[0].imputedMonth == 2 && dataSource.value[0].paymentMonth == 2 && dataSource.value[0].reportClassCode == "매당2") ||
        (dataSource.value[0].reportType == 1 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 2 && dataSource.value[0].paymentMonth == 2 && dataSource.value[0].reportClassCode == "매익0") ||
        (dataSource.value[0].reportType == 6 && dataSource.value[0].paymentType == 1 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 2 && dataSource.value[0].reportClassCode == "반당0") ||
        (dataSource.value[0].reportType == 6 && dataSource.value[0].paymentType == 1 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 6 && dataSource.value[0].reportClassCode == "반당1") ||
        (dataSource.value[0].reportType == 6 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 2 && dataSource.value[0].reportClassCode == "반익0") ||
        (dataSource.value[0].reportType == 6 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 6 && dataSource.value[0].reportClassCode == "반익1")
      ) {
        newCellSetting[147].readOnly = false
        newCellSetting[147].className = "htMiddle htRight"
        newCellSetting[155].readOnly = false
        newCellSetting[155].className = "htMiddle htRight"

        newCellSetting[148].readOnly = false
        newCellSetting[148].className = "htMiddle htRight"
        newCellSetting[156].readOnly = false
        newCellSetting[156].className = "htMiddle htRight"

        newCellSetting[181].readOnly = false
        newCellSetting[181].className = "htMiddle htRight"
        newCellSetting[189].readOnly = false
        newCellSetting[189].className = "htMiddle htRight"

        newCellSetting[183].readOnly = false
        newCellSetting[183].className = "htMiddle htRight"
        newCellSetting[191].readOnly = false
        newCellSetting[191].className = "htMiddle htRight"

      } else {
        newCellSetting[147].readOnly = true
        newCellSetting[147].className = "htMiddle htRight disable-cell"
        newCellSetting[155].readOnly = true
        newCellSetting[155].className = "htMiddle htRight disable-cell"

        newCellSetting[148].readOnly = true
        newCellSetting[148].className = "htMiddle htRight disable-cell"
        newCellSetting[156].readOnly = true
        newCellSetting[156].className = "htMiddle htRight disable-cell"

        newCellSetting[181].readOnly = true
        newCellSetting[181].className = "htMiddle htRight disable-cell"
        newCellSetting[189].readOnly = true
        newCellSetting[189].className = "htMiddle htRight disable-cell"

        newCellSetting[183].readOnly = true
        newCellSetting[183].className = "htMiddle htRight disable-cell"
        newCellSetting[191].readOnly = true
        newCellSetting[191].className = "htMiddle htRight disable-cell"
      }
      hot.updateSettings({
        cell: newCellSetting
      });
    }
    // check disable switch refund
    const checkDisableRefund = () => {
      let hot = wrapper.value.hotInstance;
      let newCellSetting = [...JSON.parse(JSON.stringify(cellsSettingModified))]
      if (
        (dataSource.value[0].index == 0 && dataSource.value[0].afterDeadline == false && dataSource.value[0].reportType == 1 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 2 && dataSource.value[0].paymentMonth == 2) ||
        (dataSource.value[0].index == 0 && dataSource.value[0].afterDeadline == true) ||
        (dataSource.value[0].index > 0 && dataSource.value[0].afterDeadline == false)
      ){
        dataSource.value[0].refund = false
        disabledRefund.value = true
        newCellSetting[574].readOnly = true
        newCellSetting[574].className = "htMiddle htRight gray-cell"
        newCellSetting[575].readOnly = true
        newCellSetting[575].className = "htMiddle htRight disable-cell"
      } 

      if (
        (dataSource.value[0].index == 0 && dataSource.value[0].afterDeadline == false && dataSource.value[0].reportType == 6 && dataSource.value[0].paymentType == 1 && dataSource.value[0].imputedMonth == 2 && dataSource.value[0].paymentMonth == 2) ||
        (dataSource.value[0].index == 0 && dataSource.value[0].afterDeadline == false && dataSource.value[0].reportType == 6 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 2)
      ) {
        dataSource.value[0].refund = true
        disabledRefund.value = true
        newCellSetting[574].readOnly = false
        newCellSetting[574].className = "htMiddle htRight"
        newCellSetting[575].readOnly = false
        newCellSetting[575].className = "htMiddle htRight"
      }

      if (dataSource.value[0].index == 0 && dataSource.value[0].afterDeadline == false && dataSource.value[0].reportType == 1 && dataSource.value[0].paymentType == 1 && dataSource.value[0].imputedMonth == 2 && dataSource.value[0].paymentMonth == 2)
      {
        dataSource.value[0].refund = true
        disabledRefund.value = false
        newCellSetting[574].readOnly = false
        newCellSetting[574].className = "htMiddle htRight"
        newCellSetting[575].readOnly = false
        newCellSetting[575].className = "htMiddle htRight"
      }

      if(dataSource.value[0].index == 0 && dataSource.value[0].afterDeadline == false && dataSource.value[0].reportType == 1 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 2) 
      {
        dataSource.value[0].refund = false
        disabledRefund.value = false
        newCellSetting[574].readOnly = true
        newCellSetting[574].className = "htMiddle htRight gray-cell"
        newCellSetting[575].readOnly = true
        newCellSetting[575].className = "htMiddle htRight disable-cell"
      }
      hot.updateSettings({
        cell: newCellSetting
      });
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
      actionCloseConfirm,
      actionConfirmLoadNew,
      confirmLoadNewStatus,
      showTooltipYearMonth,
      dataModified,
      disabledRefund
    };
  },
});
</script>
<style lang="scss" scoped>
:deep .cell-center {
  text-align: center !important;
}
.report-grid {
  padding: 8px 0px 0px 5px;
  height: 860px;
  :deep td.disable-cell {
    color: #fff;
    background-color: #808080;
  }
  :deep td.gray-cell {
    color: black;
    background-color: #d9d9d9;
  }
  :deep td.mid-gray-cell {
    color: black;
    background-color: #aeaaaa;
  }
  .action-right {
    margin-bottom: 1px;
    display: flex;
    justify-content: flex-end;
  }
  .table-detail {
    margin-bottom: 5px;
  }
  .btn-get-income {
    color: white;
    background-color: #558ed5;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    height: 35px;
  }
  // .table-grid{
  //   overflow-x: hidden;
  //   overflow-y: scroll;
  //   max-height: 700px;
  // }
  :deep .wtHolder {
    width: 100% !important;
    // height: 730px !important;
  }

  :deep .ht_clone_left .wtHolder {
    overflow: hidden;
  }
  .header-1 {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .header-2 {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .header-text-3 {
    background-color: #c6d9f1;
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
