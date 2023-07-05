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
    <a-spin :spinning="loading">
      <div class="report-grid">
        <div class="header-report">
          <div class="header-1">원천세신고서</div>
          <div class="action-right">
            <!-- <img style="width: 30px;cursor: pointer;height: 36px;" src="@/assets/images/icon_delete.png" alt="" class="ml-3"> -->
            <img
              style="width: 31px; cursor: pointer"
              src="@/assets/images/save_icon.svg"
              alt=""
              class="ml-3"
              @click="createTaxWithholding"
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
                <process-status v-model:valueStatus="data.data.status"/>
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
                <DxCheckBox v-model:value="data.data.yearEndTaxAdjustment"  :disabled="true"/>
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
                  v-model:valueDate="data.data.submissionDate"
                  :teleport="true"
                ></date-time-box>
              </template>
            </DxDataGrid>
          </div>
        </div>
        <div class="table-grid">
          <hot-table ref="wrapper" :settings="hotSettings"></hot-table>
        </div>
        <!-- backend Chưa làm xong -->
        <!-- <div class="header-2">원천징수세액환급신청서 / 기납부세액명세서 검증 결과</div>
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
                  :width="120" @onClick="createTaxWithholding" />
          </a-col>
        </a-row> -->
      </div>
    </a-spin>
  </a-modal>
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
import { useQuery, useMutation } from "@vue/apollo-composable";
import {
  mergeCells,
  cellsSetting,
  dataInit,
  calculateWithholdingStatusReport,
  clearAllCellValue,
} from "./Gridsetting";
import queries from "@/graphql/queries/PA/PA2/PA210/index";
import mutations from "@/graphql/mutations/PA/PA2/PA210/index";
import notification from "@/utils/notification";
import { useStore } from "vuex";
import { companyId } from "@/helpers/commonFunction";
import { getAfterDeadline, showTooltipYearMonth } from "../../utils/index";
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
      default: Array(),
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
    ConfirmloadNew,
  },
  setup(props, { emit }) {
    const store = useStore();
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const disabledRefund = ref<boolean>(false);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const cellNegativeNumber = [[5,7],[9,7],[31,7]]
    const wrapper = ref<any>(null);
    const confirmLoadNewStatus = ref<boolean>(false);
    const firstTimeLoad = ref<boolean>(false);
    const cellPageSettings = ref<any>(cellsSetting);

    const trigger = ref<boolean>(false);
    const dataSource = ref<any>(JSON.parse(JSON.stringify(props.dataReport)));
    const originData = ref();

    // The above code is setting up the hot table.
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
          if(e.key == 'Process') hot.setDataAtCell(selection[0][0], selection[0][1],null,'validateEdit'); // kiểm tra xem có phải kí tự hangul không nếu là hanggul thì key sẽ trả về là process
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
            } else  if (dataSource.value[0].reportType == 1 && dataSource.value[0].paymentType == 1 && dataSource.value[0].imputedMonth == 2 && dataSource.value[0].paymentMonth == 2) { 
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
      data: [...dataInit],
      mergeCells: mergeCells,
      cell: [...cellPageSettings.value],
      width: "auto",
      licenseKey: "non-commercial-and-evaluation",
    };

    const setModalVisible = () => {
      emit("closePopup", false);
    };

    onMounted(() => {
      clearAllCellValue(wrapper);
      loadNew(true);
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
    onError((error) => {
      ////notification('error', error.message)
    });
    watch(result, async (data) => {
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
        const { checkYETaxAdj } = await calculateWithholdingStatusReport(wrapper, newData);
        // set lại checkbox yearEndTaxAdjustment
        dataSource.value[0].yearEndTaxAdjustment = checkYETaxAdj
      }
    });

    const actionConfirmLoadNew = () => {
      confirmLoadNewStatus.value = true;
    };

    // A function that is called when the user clicks on the "Load New" button.
    const loadNew = async (firstLoad: boolean) => {
      let oldPropsData : any = props.dataReport[0]
      clearAllCellValue(wrapper);
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
      trigger.value = true;
      refetchData();
      if (!firstLoad) {
        store.commit("common/setHasChangedPopupPA210", true);
      }
      await checkDisableRefund()
      await checkDisableA04A06()
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
      emit("isDoneReport", false);
    });
    errChangeStatus((error) => {
      ////notification('error', error.message)
    });

    // The above code is creating a tax withholding report.
    const createTaxWithholding = () => {
      let hot = wrapper.value.hotInstance;
      const arrData = hot.getData();
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
      const variables = {
        companyId: companyId,
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
            withholdingDutyName: dataSource.value[0].withholdingDutyName,
            withholdingDutyPresidentName:
              dataSource.value[0].withholdingDutyPresidentName,
            withholdingDutyBizNumber:
              dataSource.value[0].withholdingDutyBizNumber,
            withholdingDutyAddress: dataSource.value[0].withholdingDutyAddress,
            withholdingDutyCollectivePayment:
              dataSource.value[0].withholdingDutyCollectivePayment,
            withholdingDutyTaxForEachBusiness:
              dataSource.value[0].withholdingDutyTaxForEachBusiness,
            withholdingDutyTelephone:
              dataSource.value[0].withholdingDutyTelephone,
            withholdingDutyEmail: dataSource.value[0].withholdingDutyEmail,
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
      actionCreateTaxWithholding(variables);
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
    return {
      setModalVisible,
      loading,
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
      createTaxWithholding,
      showTooltipYearMonth,
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
  .mytooltip {
    margin-left: -45px;
  }

}
.ant-modal-close {
  height: 43px !important;
}
</style>
