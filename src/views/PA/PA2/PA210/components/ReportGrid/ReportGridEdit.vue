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
    <a-spin :spinning="false">
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
              v-if="isEdit"
            />
            <img
              style="width: 31px; cursor: pointer"
              src="@/assets/images/save_icon.svg"
              alt=""
              class="ml-3"
              @click="updateTaxWithholding"
              v-if="isEdit"
            />
            <button-basic
              :width="150"
              text="새로불러오기"
              class="btn-get-income"
              @onClick="actionConfirmLoadNew"
              :disabled="!isEdit"
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
                <process-status
                  v-model:valueStatus="data.data.status"
                  :dataRow="data.data"
                  @checkConfirmRowTable="changeStatusRowTable"
                  :disabled="!isEdit"
                />
                <!-- <process-status-tooltip v-model:valueStatus="data.data.status" :height="32"
                            :dataRow="data.data"/> -->
              </template>
              <DxColumn
                caption="귀속연월"
                cell-template="imputedYear-imputedMonth"
                css-class="cell-center"
              />
              <template #imputedYear-imputedMonth="{ data }">
                <a-tooltip color="black">
                  <template #title>
                    귀속기간 {{
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
                <a-tooltip color="black">
                  <template #title>
                    지급기간 {{
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
                    getAfterDeadline(data.data.index, data.data.afterDeadline)
                      ?.tag_name
                  "
                  :style="
                    getAfterDeadline(data.data.index, data.data.afterDeadline)
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
                <a-tooltip  :title="'환급신청여부'" color="black">
                  <div>
                    <switch-basic
                      v-model:valueSwitch="data.data.refund"
                      :textCheck="'O'"
                      :textUnCheck="'X'"
                      :disabled="disabledRefund || !isEdit"
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
                  v-model:valueDate="data.data.submissionDate"
                  :disabled="!isEdit"
                  :teleport="true"
                ></date-time-box>
              </template>
            </DxDataGrid>
          </div>
        </div>
        <div class="table-grid">
          <hot-table
            ref="wrapper"
            :settings="hotSettings"
            :readOnly="!isEdit"
          ></hot-table>
        </div>
      </div>
    </a-spin>
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
    @loadNewAction="loadNew(false)"
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
  mergeCells,
  cellsSetting,
  dataInit,
  calculateWithholdingStatusReport,
  inputPosition,
  clearAllCellValue,
} from "./Gridsetting";
import mutations from "@/graphql/mutations/PA/PA2/PA210/index";
import notification from "@/utils/notification";
import { useStore } from "vuex";
import queries from "@/graphql/queries/PA/PA2/PA210/index";
import { companyId, userType } from "@/helpers/commonFunction";
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
    const cellNegativeNumber = [[5, 7], [9, 7], [31, 7]]
    const cellPageSettings = ref<any>(cellsSetting);
    const arrStatusShowBtn = [10,20]
    // The above code is setting up the hot table.
    const hotSettings = {
      comments: true,
      fillHandle: true,
      colWidths: 102.5,
      height: 740,
      fixedRowsTop: 4,
      viewportRowRenderingOffset: 70,
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
      afterValidate: (
        isValid: boolean,
        value: any,
        row: any,
        prop: any,
        source: any
      ) => {
        let hot = wrapper.value.hotInstance;
        if (isValid == false) {
          hot.setDataAtCell(row, hot.propToCol(prop),null,'validateEdit');
        }
      },
      afterChange: async (changes: any, source: string) => {
        if (source == "edit" && firstTimeLoad.value) {
          const { checkYETaxAdj, cell12 } = await calculateWithholdingStatusReport(wrapper);
          // kiểm tra disable refun theo cell 12
          if (!cell12) {
            dataSource.value[0].refund = false
            //[thanh toán 6 tháng 1, tháng 1-2] [EDIT] ô (21)=0 thì switch refund vẫn enable (enable và false)
            if (dataSource.value[0].reportType == 1 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 2) {
              disabledRefund.value = false
            } else {
              disabledRefund.value = true
            }

          }
          dataSource.value[0].yearEndTaxAdjustment = checkYETaxAdj
          store.commit("common/setHasChangedPopupPA210", true);
        } else if (source == "edit") {
          firstTimeLoad.value = true;
        }
      },
      afterScrollVertically: () => {
        let hot = wrapper.value.hotInstance;
        hot.render()
      },
      hotRef: null,
      data: dataInit,
      mergeCells: mergeCells,
      cell: [...cellPageSettings.value],
      stretchH: 'all',
      width: "auto",
      licenseKey: "non-commercial-and-evaluation",
    };
    const store = useStore();
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const dataSource = ref<any>(JSON.parse(JSON.stringify(props.dataReport)));
    const trigger = ref<boolean>(false);
    const isEdit = computed(() => (userType !== 'm' && dataSource.value?.[0]?.status < 30) || (userType === 'm' && dataSource.value?.[0]?.status !== 40))
    const originData = ref();
    const setModalVisible = () => {
      emit("closePopup", false);
    };

    watch(
      () => dataSource.value,
      (newValue: any) => {
        dataSource.value = newValue;
      }
    );
    onMounted(() => {
      setTimeout(() => {
        loadNew(true);
      }, 200)
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
        calculateWithholdingStatusReport(wrapper, newData);
      }
    });
    // The above code is used to fill the data into the table.
    const loadNew = async (firstLoad: boolean) => {
      let oldPropsData : any = props.dataReport[0]
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
          yearEndTaxAdjustment: oldPropsData.yearEndTaxAdjustment,
          reportClassCode : dataSource.value[0].reportClassCode
        },
      };
      if (!firstLoad) {
        trigger.value = true;
        refetchData();
        store.commit("common/setHasChangedPopupPA210", true);
        return
      }
      let hot = wrapper.value?.hotInstance;
      // fill value to table report
      dataSource.value[0]?.statementAndAmountOfTaxPaids.forEach((data: any) => {
        const rowPosition = inputPosition.find(
          (item) => item.className == data.code
        );
        if (data.numberOfPeople)
          hot.setDataAtCell(
            rowPosition?.value[0][0],
            rowPosition?.value[0][1],
            data.numberOfPeople,
            "initTable"
          );
        if (data.totalPayment)
          hot.setDataAtCell(
            rowPosition?.value[1][0],
            rowPosition?.value[1][1],
            data.totalPayment,
            "initTable"
          );
        if (data.collectedIncomeTax)
          hot.setDataAtCell(
            rowPosition?.value[2][0],
            rowPosition?.value[2][1],
            data.collectedIncomeTax,
            "initTable"
          );
        if (data.collectedRuralSpecialTax)
          hot.setDataAtCell(
            rowPosition?.value[3][0],
            rowPosition?.value[3][1],
            data.collectedRuralSpecialTax,
            "initTable"
          );
        if (data.collectedExtraTax)
          hot.setDataAtCell(
            rowPosition?.value[4][0],
            rowPosition?.value[4][1],
            data.collectedExtraTax,
            "initTable"
          );
        if (data.thisMonthAdjustedRefundTaxAmount)
          hot.setDataAtCell(
            rowPosition?.value[5][0],
            rowPosition?.value[5][1],
            data.thisMonthAdjustedRefundTaxAmount,
            "initTable"
          );
        if (data.incomeTaxPaid)
          hot.setDataAtCell(
            rowPosition?.value[6][0],
            rowPosition?.value[6][1],
            data.incomeTaxPaid,
            "initTable"
          );
        if (data.ruralSpecialTaxPaid)
          hot.setDataAtCell(
            rowPosition?.value[7][0],
            rowPosition?.value[7][1],
            data.ruralSpecialTaxPaid,
            "initTable"
          );
      });
      // fill value to table report adjustmentOfRefundTaxAmount
      const adjustment = dataSource.value[0]?.adjustmentOfRefundTaxAmount;
      const adjustmentPosition = inputPosition.find(
        (item) => item.className == "adjustmentOfRefundTaxAmount"
      );
      if (adjustment?.prevMonthNonRefundableTaxAmount)
        hot.setDataAtCell(
          adjustmentPosition?.value[0][0],
          adjustmentPosition?.value[0][1],
          adjustment?.prevMonthNonRefundableTaxAmount,
          "initTable"
        );
      if (adjustment?.preRefundApplicationTaxAmount)
        hot.setDataAtCell(
          adjustmentPosition?.value[1][0],
          adjustmentPosition?.value[1][1],
          adjustment?.preRefundApplicationTaxAmount,
          "initTable"
        );
      if (adjustment?.deductibleBalance)
        hot.setDataAtCell(
          adjustmentPosition?.value[2][0],
          adjustmentPosition?.value[2][1],
          adjustment?.deductibleBalance,
          "initTable"
        );
      if (adjustment?.thisMonthRefundTaxGeneral)
        hot.setDataAtCell(
          adjustmentPosition?.value[3][0],
          adjustmentPosition?.value[3][1],
          adjustment?.thisMonthRefundTaxGeneral,
          "initTable"
        );
      if (adjustment?.thisMonthRefundTaxOtherFinancialCompany)
        hot.setDataAtCell(
          adjustmentPosition?.value[4][0],
          adjustmentPosition?.value[4][1],
          adjustment?.thisMonthRefundTaxOtherFinancialCompany,
          "initTable"
        );
      if (adjustment?.thisMonthRefundTaxOtherMerge)
        hot.setDataAtCell(
          adjustmentPosition?.value[5][0],
          adjustmentPosition?.value[5][1],
          adjustment?.thisMonthRefundTaxOtherMerge,
          "initTable"
        );
      if (adjustment?.refundTaxSubjectToAdjustment)
        hot.setDataAtCell(
          adjustmentPosition?.value[6][0],
          adjustmentPosition?.value[6][1],
          adjustment?.refundTaxSubjectToAdjustment,
          "initTable"
        );
      if (adjustment?.thisMonthTotalAdjustedRefundTaxAmount)
        hot.setDataAtCell(
          adjustmentPosition?.value[7][0],
          adjustmentPosition?.value[7][1],
          adjustment?.thisMonthTotalAdjustedRefundTaxAmount,
          "initTable"
        );
      if (adjustment?.nextMonthRefundTaxAmount)
        hot.setDataAtCell(
          adjustmentPosition?.value[8][0],
          adjustmentPosition?.value[8][1],
          adjustment?.nextMonthRefundTaxAmount,
          "initTable"
        );
      if (adjustment?.refundApplicationAmount)
        hot.setDataAtCell(
          adjustmentPosition?.value[9][0],
          adjustmentPosition?.value[9][1],
          adjustment?.refundApplicationAmount,
          "initTable"
        );
      await checkDisableRefund()
      if(dataSource.value[0].status == 10) await checkDisableA04A06()
    };

    const {
      mutate: actionUpdateTaxWithholding,
      onDone: doneUpdate,
      onError: errUpdate,
    } = useMutation(mutations.updateTaxWithholdingStatusReport);
    doneUpdate((result: any) => {
      store.state.common.focusedRowKeyPA210 =
        result.data.updateTaxWithholdingStatusReport.reportId;
      store.commit("common/setHasChangedPopupPA210", false);
      notification("success", Message.getMessage("COMMON", "106").message);
      setModalVisible();
    });
    errUpdate((error) => {
      ////notification('error', error.message)
      setModalVisible();
    });

    const updateTaxWithholding = () => {
      let hot = wrapper.value.hotInstance;
      const arrData = hot.getData();
      // create data of statementAndAmountOfTaxPaids
      let statement = Array();
      for (let index = 0; index < arrData.length; index++) {
        if (
          index >= 4 &&
          index <= 32 &&
          (
            arrData[index][5] != null ||
            arrData[index][6] != null ||
            arrData[index][7] != null ||
            arrData[index][8] != null ||
            arrData[index][9] != null ||
            arrData[index][10] != null ||
            arrData[index][11] != null ||
            arrData[index][12] != null
          )
        ) {
          statement.push({
            code: arrData[index][4],
            numberOfPeople: arrData[index][5] != null ? arrData[index][5] : 0,
            totalPayment: arrData[index][6] != null ? arrData[index][6] : 0,
            collectedIncomeTax: arrData[index][7] != null ? arrData[index][7] : 0,
            collectedRuralSpecialTax:
              arrData[index][8] != null ? arrData[index][8] : 0,
            collectedExtraTax: arrData[index][9] != null ? arrData[index][9] : 0,
            thisMonthAdjustedRefundTaxAmount:
              arrData[index][10] != null ? arrData[index][10] : 0,
            incomeTaxPaid: arrData[index][11] != null ? arrData[index][11] : 0,
            ruralSpecialTaxPaid:
              arrData[index][12] != null ? arrData[index][12] : 0,
          });
        }
      }
      // create payload to query updateTaxWithholdingStatusReport
      const variables = {
        companyId: companyId,
        reportId: dataSource.value[0].reportId,
        key: {
          imputedYear: dataSource.value[0].imputedYear,
          imputedMonth: dataSource.value[0].imputedMonth,
          paymentYear: dataSource.value[0].paymentYear,
          paymentMonth: dataSource.value[0].paymentMonth,
          reportType: dataSource.value[0].reportType,
          index: dataSource.value[0].index,
        },
        input: {
          paymentType: dataSource.value[0].paymentType,
          yearEndTaxAdjustment: dataSource.value[0].yearEndTaxAdjustment,
          additionalIncome: false,
          refund: dataSource.value[0].refund,
          afterDeadline: dataSource.value[0].afterDeadline,
          submissionDate: dataSource.value[0].submissionDate,
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
              arrData[37][0] != null ? arrData[37][0] : 0,
            preRefundApplicationTaxAmount:
              arrData[37][2] != null ? arrData[37][2] : 0,
            deductibleBalance: arrData[37][3] != null ? arrData[37][3] : 0,
            thisMonthRefundTaxGeneral:
              arrData[37][5] != null ? arrData[37][5] : 0,
            thisMonthRefundTaxFiduciaryEstates:
              arrData[37][6] != null ? arrData[37][6] : 0,
            thisMonthRefundTaxOtherFinancialCompany:
              arrData[37][7] != null ? arrData[37][7] : 0,
            thisMonthRefundTaxOtherMerge:
              arrData[37][8] != null ? arrData[37][8] : 0,
            refundTaxSubjectToAdjustment:
              arrData[37][9] != null ? arrData[37][9] : 0,
            thisMonthTotalAdjustedRefundTaxAmount:
              arrData[37][10] != null ? arrData[37][10] : 0,
            nextMonthRefundTaxAmount:
              arrData[37][11] != null ? arrData[37][11] : 0,
            refundApplicationAmount:
              arrData[37][12] != null ? arrData[37][12] : 0,
          },
        },
      };
      // Calling the actionUpdateTaxWithholding function with the variables object as a parameter.
      actionUpdateTaxWithholding(variables);
    };
    // update cell settings flow condition
    const checkDisableA04A06 = async () => {
      let hot = wrapper.value.hotInstance;
      // check các trường hợp để disable A04 A06
      if (
        (dataSource.value[0].reportType == 1 && dataSource.value[0].paymentType == 1 && dataSource.value[0].imputedMonth == 2 && dataSource.value[0].paymentMonth == 2 && dataSource.value[0].reportClassCode == "매당2") ||
        (dataSource.value[0].reportType == 1 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 2 && dataSource.value[0].paymentMonth == 2 && dataSource.value[0].reportClassCode == "매익0") ||
        (dataSource.value[0].reportType == 6 && dataSource.value[0].paymentType == 1 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 2 && dataSource.value[0].reportClassCode == "반당0") ||
        (dataSource.value[0].reportType == 6 && dataSource.value[0].paymentType == 1 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 6 && dataSource.value[0].reportClassCode == "반당1") ||
        (dataSource.value[0].reportType == 6 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 2 && dataSource.value[0].reportClassCode == "반익0") ||
        (dataSource.value[0].reportType == 6 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 6 && dataSource.value[0].reportClassCode == "반익1")
        ) {
          cellPageSettings.value[123].readOnly = false
          cellPageSettings.value[123].className = "htMiddle htRight"
          cellPageSettings.value[124].readOnly = false
          cellPageSettings.value[124].className = "htMiddle htRight"
          cellPageSettings.value[141].readOnly = false
          cellPageSettings.value[141].className = "htMiddle htRight"
          cellPageSettings.value[143].readOnly = false
          cellPageSettings.value[143].className = "htMiddle htRight"
      } else {
        cellPageSettings.value[123].readOnly = true
        cellPageSettings.value[123].className = "htMiddle htRight disable-cell"
        cellPageSettings.value[124].readOnly = true
        cellPageSettings.value[124].className = "htMiddle htRight disable-cell"
        cellPageSettings.value[141].readOnly = true
        cellPageSettings.value[141].className = "htMiddle htRight disable-cell"
        cellPageSettings.value[143].readOnly = true
        cellPageSettings.value[143].className = "htMiddle htRight disable-cell"
      }
      hot.updateSettings({
        cell: cellPageSettings.value
      });
    }

    // check disable switch refund
    const checkDisableRefund = async () => {
      let hot = wrapper.value.hotInstance;
      let cell12 = hot.getDataAtCell(37, 12);
      if (
        (dataSource.value[0].index == 0 && dataSource.value[0].afterDeadline == false && dataSource.value[0].reportType == 1 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 2 && dataSource.value[0].paymentMonth == 2) ||
        (dataSource.value[0].index == 0 && dataSource.value[0].afterDeadline == true) ||
        (dataSource.value[0].index > 0 && dataSource.value[0].afterDeadline == false)
      ){
        dataSource.value[0].refund = false
        disabledRefund.value = true
      }

      if (
        (dataSource.value[0].index == 0 && dataSource.value[0].afterDeadline == false && dataSource.value[0].reportType == 6 && dataSource.value[0].paymentType == 1 && dataSource.value[0].imputedMonth == 2 && dataSource.value[0].paymentMonth == 2) ||
        (dataSource.value[0].index == 0 && dataSource.value[0].afterDeadline == false && dataSource.value[0].reportType == 6 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 2)
      ) {
        dataSource.value[0].refund = true
        disabledRefund.value = true
      }

      if (dataSource.value[0].index == 0 && dataSource.value[0].afterDeadline == false && dataSource.value[0].reportType == 1 && dataSource.value[0].paymentType == 1 && dataSource.value[0].imputedMonth == 2 && dataSource.value[0].paymentMonth == 2)
      {
        dataSource.value[0].refund = cell12 ? true : false
        disabledRefund.value = false
      }

      if(dataSource.value[0].index == 0 && dataSource.value[0].afterDeadline == false && dataSource.value[0].reportType == 1 && dataSource.value[0].paymentType == 2 && dataSource.value[0].imputedMonth == 1 && dataSource.value[0].paymentMonth == 2)
      {
        dataSource.value[0].refund = cell12 ? true : false
        disabledRefund.value = false
      }
    }

    // theo dõi refund status thay đổi trạng thái call 12 và 13
    watch(()=>dataSource.value[0].refund, (newVal) => {
      let hot = wrapper.value.hotInstance;
      if (newVal) {
        cellPageSettings.value[331].readOnly = false
        cellPageSettings.value[331].className = "htMiddle htRight"
        cellPageSettings.value[332].readOnly = false
        cellPageSettings.value[332].className = "htMiddle htRight"
      } else {
        cellPageSettings.value[331].readOnly = true
        cellPageSettings.value[331].className = "htMiddle htRight gray-cell"
        cellPageSettings.value[332].readOnly = true
        cellPageSettings.value[332].className = "htMiddle htRight disable-cell"
      }

      hot.updateSettings({
        cell: cellPageSettings.value
      });
    })
    // The above code is creating a function called actionConfirmDelete. This function is setting the value
    // of confirmStatus.value to true.
    const actionConfirmDelete = () => {
      confirmStatus.value = true;
    };

    const actionCloseConfirm = (data: any) => {
      confirmStatus.value = false;
      setModalVisible();
    };
    const {
      mutate: actionChangeStatus,
      onDone: doneChangeStatus,
      onError: errChangeStatus,
    } = useMutation(mutations.changeTaxWithholdingStatusReportStatus);
    doneChangeStatus(() => {
      notification("success", `업부상태 변경되었습니다!`);
    });
    errChangeStatus((error) => {
      ////notification('error', error.message)
    });
    // A function that is called when the user clicks on the button to change the status of the report.
    const changeStatusRowTable = (data: any) => {
      actionChangeStatus({
        companyId: companyId,
        imputedYear: data.imputedYear,
        reportId: data.reportId,
        status: data.status,
      });
    };
    return {
      setModalVisible,
      hotSettings,
      dataSource,
      per_page,
      wrapper,
      move_column,
      colomn_resize,
      loadNew,
      confirmLoadNewStatus,
      actionConfirmLoadNew,
      getAfterDeadline,
      updateTaxWithholding,
      actionConfirmDelete,
      actionCloseConfirm,
      confirmStatus,
      showTooltipYearMonth,
      changeStatusRowTable,
      disabledRefund,
      arrStatusShowBtn,
      isEdit
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
  .mytooltip {
    margin-left: -45px;
  }
}
:deep .ant-modal-close-x {
  height: 43px !important;
}
</style>
