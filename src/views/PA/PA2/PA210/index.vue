<template>
  <action-header title="원천징수이행상황신고서" />
  <div class="page-content">
    <a-spin :spinning="loading" size="large">
      <DxDataGrid
        id="dataGridPA210"
        noDataText="내역이 없습니다"
        :show-row-lines="true"
        :hoverStateEnabled="true"
        :data-source="dataSource"
        :show-borders="true"
        key-expr="reportId"
        :allow-column-reordering="move_column"
        :focused-row-enabled="true"
        :allow-column-resizing="colomn_resize"
        :column-auto-width="true"
        :focused-row-key="store.state.common.focusedRowKeyPA210"
        :onRowClick="onRowClick"
      >
        <DxScrolling mode="standard" show-scrollbar="always" />
        <DxToolbar>
          <DxItem
            location="after"
            template="button-template"
            css-class="cell-button-add"
          />
          <DxItem
            location="after"
            template="button-history"
            css-class="cell-button-add"
          />
        </DxToolbar>
        <template #button-history>
          <DxButton>
            <HistoryOutlined @click="openModalHistory" class="fz-18" />
          </DxButton>
        </template>
        <template #button-template>
          <a-tooltip placement="topLeft" color="black">
            <template #title>정기(기한후)신고서 새로 작성</template>
            <div class="custom-grade-cell">
              <DxButton icon="plus" @click="openAddNewModal" />
            </div>
          </a-tooltip>
        </template>
        <DxColumn
          caption="마감 현황"
          cell-template="process-status"
          width="120"
        />
        <template #process-status="{ data }">
          <process-status
            v-model:valueStatus="data.data.status"
            :dataRow="data.data"
            @checkConfirmRowTable="changeStatusRowTable"
            :disabled="(data.data.status == 40 || data.data.status == 30) && userType !== 'm'"
          />
        </template>
        <DxColumn
          caption="귀속 연월"
          cell-template="imputed"
          sort-order="asc"
          data-field="imputedMonth"
          :sort-index="1"
        />
        <template #imputed="{ data }">
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
          caption="지급 연월"
          cell-template="payment"
          sort-order="desc"
          data-field="paymentFinishYearMonth"
          :sort-index="0"
        />
        <template #payment="{ data }">
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
        <DxColumn caption="신고 주기" cell-template="reportType" />
        <template #reportType="{ data }">
          <DxButton
            :text="getReportType(data.data.reportType)?.text"
            :style="getReportType(data.data.reportType)?.style"
            :height="$config_styles.HeightInput"
          />
        </template>
        <DxColumn
          caption="신고 종류"
          cell-template="afterDeadline"
          sort-order="desc"
          data-field="index"
          :sort-index="2"
        />
        <template #afterDeadline="{ data }">
          <DxButton
            :text="
              getAfterDeadline(data.data.index, data.data.afterDeadline)
                ?.tag_name
            "
            :style="
              getAfterDeadline(data.data.index, data.data.afterDeadline)?.style
            "
            :height="$config_styles.HeightInput"
          />
        </template>

        <DxColumn
          data-field="yearEndTaxAdjustment"
          caption="연말"
          css-class="cell-center"
          cell-template="yearEndTaxAdjustment"
        />
        <template #yearEndTaxAdjustment="{ data }">
          <div class="showO">
            {{ data.data.yearEndTaxAdjustment ? "ㅇ" : "" }}
          </div>
        </template>

        <DxColumn
          data-field="refund"
          caption="환급"
          css-class="cell-center"
          cell-template="refund"
        />
        <template #refund="{ data }">
          <div class="showO">{{ data.data.refund ? "ㅇ" : "" }}</div>
        </template>

        <DxColumn
          data-field="wageIncomeSimplified"
          caption="근로 간이"
          css-class="cell-center"
          cell-template="wageIncomeSimplified"
        />
        <template #wageIncomeSimplified="{ data }">
          <div class="showO">
            {{ data.data.wageIncomeSimplified ? "ㅇ" : "" }}
          </div>
        </template>

        <DxColumn
          data-field="yearEndAdjustmentRetirement"
          caption="근로 중도"
          css-class="cell-center"
          cell-template="yearEndAdjustmentRetirement"
        />
        <template #yearEndAdjustmentRetirement="{ data }">
          <div class="showO">
            {{ data.data.yearEndAdjustmentRetirement ? "ㅇ" : "" }}
          </div>
        </template>

        <DxColumn
          data-field="dailyWageIncome"
          caption="근로 일용"
          css-class="cell-center"
          cell-template="dailyWageIncome"
        />

        <template #dailyWageIncome="{ data }">
          <div class="showO">{{ data.data.dailyWageIncome ? "ㅇ" : "" }}</div>
        </template>

        <DxColumn
          data-field="yearEndAdjustment"
          caption="근로 연말"
          css-class="cell-center"
          cell-template="yearEndAdjustment"
        />
        <template #yearEndAdjustment="{ data }">
          <div class="showO">{{ data.data.yearEndAdjustment ? "ㅇ" : "" }}</div>
        </template>

        <DxColumn
          data-field="retirementIncome"
          caption="퇴직 소득"
          css-class="cell-center"
          cell-template="retirementIncome"
        />
        <template #retirementIncome="{ data }">
          <div class="showO">{{ data.data.retirementIncome ? "ㅇ" : "" }}</div>
        </template>

        <DxColumn
          data-field="businessIncome"
          caption="사업 소득"
          css-class="cell-center"
          cell-template="businessIncome"
        />
        <template #businessIncome="{ data }">
          <div class="showO">{{ data.data.businessIncome ? "ㅇ" : "" }}</div>
        </template>

        <DxColumn
          data-field="extraIncome"
          caption="기타 소득"
          css-class="cell-center"
          cell-template="extraIncome"
        />
        <template #extraIncome="{ data }">
          <div class="showO">{{ data.data.extraIncome ? "ㅇ" : "" }}</div>
        </template>

        <DxColumn
          data-field="totalPayment"
          caption="총지급액 (A99)"
          css-class="money-column "
          format="fixedPoint"
        />
        <DxColumn
          data-field="totalCollectedTaxAmount"
          caption="납부세액 소득세등 (A99)"
          css-class="money-column"
          format="fixedPoint"
        />
        <DxColumn
          data-field="nextMonthRefundTaxAmount"
          caption="(20) 차월이월 환급세액계"
          css-class="money-column"
          format="fixedPoint"
        />
        <DxColumn
          data-field="refundApplicationAmount"
          caption="(21) 환급 신청액"
          css-class="money-column"
          format="fixedPoint"
        />

        <DxColumn
          caption="신고서"
          cell-template="editIcon"
          :fixed="true"
          fixedPosition="right"
        />
        <template #editIcon="{ data }">
          <DxButton
            class="ml-3"
            @click="editRow(data.data, 'iconEdit')"
            style="border: none; margin-top: -2px; width: 35px; height: 35px"
          >
            <div v-if="!loading">
              <zoom-in-outlined
                v-if="(userType !== 'm' && data.data.status > 20) || (userType === 'm' && data.data.status > 30)"
                :style="{ fontSize: '20px', color: 'black' }"
              />
              <edit-outlined
                v-else
                :style="{ fontSize: '20px', color: 'black' }"
              />
            </div>
          </DxButton>
        </template>
        <DxColumn
          caption="수정 신고"
          css-class="cell-center"
          cell-template="add"
          :fixed="true"
          fixedPosition="right"
        />
        <template #add="{ data }">
          <a-tooltip v-if="checkModify(data.data)" color="black">
            <template #title
              >본 신고서에 대한 수정신고서를 작성합니다.</template
            >
            <div
              class="custom-grade-cell"
              @click="editRow(data.data, 'iconAdd')"
            >
              <div style="width: 100%; text-align: center; margin-top: 5px">
                [+]
              </div>
            </div>
          </a-tooltip>
        </template>
        <DxColumn
          :width="80"
          cell-template="pupop"
          caption="출력 메일"
          :fixed="true"
          fixedPosition="right"
        />
        <template #pupop="{ data }">
          <div class="custom-action" style="text-align: center">
            <a-tooltip color="black">
              <template #title>출력 / 저장</template>
              <img
                @click="openPopupPrint(data.data)"
                src="@/assets/images/print.svg"
                alt=""
                style="width: 28px"
              />
            </a-tooltip>
            <img
              @click="openPopupEmail(data.data)"
              src="@/assets/images/email.svg"
              alt=""
              style="width: 28px; margin-left: 10px"
            />
          </div>
        </template>
      </DxDataGrid>
    </a-spin>
  </div>
  <AddPA210Popup
    v-if="modalAddNewStatus"
    :modalStatus="modalAddNewStatus"
    @closePopup="closePopupAddNew"
    :dataPopupAdd="dataPopupAdd"
    :dataSourceIndex="dataSource"
  />
  <HistoryPopup
    :modalStatus="modalHistoryStatus"
    @closePopup="modalHistoryStatus = false"
    title="변경이력"
    typeHistory="pa-210"
  />
  <PopupPrint
    :modalStatus="modalPrintStatus"
    @closePopup="modalPrintStatus = false"
    :dataCall="dataPopup"
  />
  <PopupSendEmail
    :modalStatus="modalSendEmailStatus"
    @closePopup="modalSendEmailStatus = false"
    :dataCall="dataPopup"
  />
  <ReportGridEdit
    v-if="statusReportGridEdit"
    :modalStatus="statusReportGridEdit"
    @closePopup="closeReportGridEdit"
    :dataReport="dataReport"
    :key="resetComponentEdit"
  />
  <ReportGridModify
    v-if="statusReportGridModify"
    :modalStatus="statusReportGridModify"
    @closePopup="closeReportGridModify"
    :dataReport="dataReport"
    :key="resetComponentModify"
  />
  <ReportGridEditModify
    v-if="statusReportGridEditModify"
    :modalStatus="statusReportGridEditModify"
    @closePopup="closeReportGridEditModify"
    :dataReport="dataReport"
    :key="resetComponentModify"
  />
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import dayjs from "dayjs";
import { companyId, userType } from "@/helpers/commonFunction";
import { useStore } from "vuex";
import notification from "@/utils/notification";
import { useQuery, useMutation } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import ReportGridEdit from "./components/ReportGrid/ReportGridEdit.vue";
import AddPA210Popup from "./components/AddPA210Popup.vue";
import PopupPrint from "./components/PopupPrint.vue";
import PopupSendEmail from "./components/PopupSendEmail.vue";
import HistoryPopup from "@/components/HistoryPopup.vue";
import {
  DxDataGrid,
  DxColumn,
  DxToolbar,
  DxItem,
  DxScrolling,
} from "devextreme-vue/data-grid";
import {
  HistoryOutlined,
  ZoomInOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import queries from "@/graphql/queries/PA/PA2/PA210/index";
import mutations from "@/graphql/mutations/PA/PA2/PA210/index";
import ReportGridModify from "./components/ReportGrid/ReportGridModify.vue";
import ReportGridEditModify from "./components/ReportGrid/ReportGridEditModify.vue";
import {
  getAfterDeadline,
  getReportType,
  showTooltipYearMonth,
} from "./utils/index";
import comfirmClosePopup from "@/utils/comfirmClosePopup";

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxToolbar,
    DxScrolling,
    DxItem,
    DxButton,
    HistoryOutlined,
    AddPA210Popup,
    HistoryPopup,
    PopupPrint,
    PopupSendEmail,
    ReportGridEdit,
    ReportGridModify,
    ReportGridEditModify,
    ZoomInOutlined,
    EditOutlined,
  },
  setup() {
    const store = useStore();
    store.dispatch("auth/getUserInfor", sessionStorage.getItem("token"));
    const hasChangedPopupPA210 = computed(
      () => store.getters["common/hasChangedPopupPA210"]
    );
    const globalYear = computed(() =>
      parseInt(sessionStorage.getItem("paYear") ?? "0")
    );

    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);

    const modalAddNewStatus = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);
    const modalPrintStatus = ref<boolean>(false);
    const modalSendEmailStatus = ref<boolean>(false);
    const statusReportGridEdit = ref<boolean>(false);
    const statusReportGridModify = ref<boolean>(false);
    const statusReportGridEditModify = ref<boolean>(false);
    const resetComponentEdit = ref(0);
    const resetComponentModify = ref(0);
    const dataReport: any = ref([]);
    const dataSource: any = ref([]);
    const dataPopup = ref();
    const dataPopupAdd: any = ref({
      reportType: 0,
      paymentType: 0,
      withholdingDutyName: "",
      withholdingDutyPresidentName: "",
      withholdingDutyBizNumber: "",
      withholdingDutyAddress: "",
      withholdingDutyTelephone: "",
      withholdingDutyEmail: "",
      withholdingDutyCollectivePayment: false,
      withholdingDutyTaxForEachBusiness: false,
      reportClassCodes: [],
    });
    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear,
    });

    // ================GRAPQL====================================
    const {
      refetch: refetchData,
      result,
      loading,
    } = useQuery(queries.getTaxWithholdingStatusReports, originData, () => ({
      fetchPolicy: "no-cache",
    }));
    const { result: resultConfig } = useQuery(
      queries.getWithholdingConfig,
      originData,
      () => ({ fetchPolicy: "no-cache" })
    );
    const { result: resultCompany } = useQuery(
      queries.getMyCompany,
      { companyId: companyId },
      () => ({ fetchPolicy: "no-cache" })
    );
    const {
      mutate: actionChangeStatus,
      onDone: doneChangeStatus,
      onError: errChangeStatus,
    } = useMutation(mutations.changeTaxWithholdingStatusReportStatus);
    doneChangeStatus(() => {
      notification("success", `업부상태 변경되었습니다!`);
      refetchData();
    });
    errChangeStatus((error) => {
      ////notification('error', error.message)
    });

    // ===================WATCH==================================
    watch(result, (value) => {
      if (value) {
        dataPopupAdd.value.reportClassCodes = [];
        dataSource.value = value.getTaxWithholdingStatusReports;
        value.getTaxWithholdingStatusReports.map((data: any) => {
          dataPopupAdd.value.reportClassCodes.push(data.reportClassCode);
        });
        // dataPopupAdd.value.reportClassCodes[0] = "반당2"
        // dataPopupAdd.value.reportClassCodes[1] = "반당1"
        // dataPopupAdd.value.reportClassCodes[3] = "매당1"
      }
    });
    watch(resultConfig, (value) => {
      if (value) {
        dataPopupAdd.value.reportType = value.getWithholdingConfig.reportType;
        dataPopupAdd.value.paymentType = value.getWithholdingConfig.paymentType;
        dataPopupAdd.value.withholdingDutyCollectivePayment =
          value.getWithholdingConfig.collectivePayment;
        dataPopupAdd.value.withholdingDutyTaxForEachBusiness =
          value.getWithholdingConfig.taxForEachBusiness;
        // dataPopupAdd.value.reportType = 1;
        // dataPopupAdd.value.paymentType = 2;
      }
    });
    watch(resultCompany, (value) => {
      let data = value.getMyCompany;
      if (data) {
        dataPopupAdd.value.withholdingDutyName = data.name;
        dataPopupAdd.value.withholdingDutyPresidentName = data.presidentName;
        dataPopupAdd.value.withholdingDutyBizNumber = data.bizNumber;
        dataPopupAdd.value.withholdingDutyAddress = data.address;
        dataPopupAdd.value.withholdingDutyTelephone = data.phone;
        dataPopupAdd.value.withholdingDutyEmail =
          data.extendInfo.president.email;
      }
    });

    // ===================FUNCTION===============================
    const openAddNewModal = () => {
      modalAddNewStatus.value = true;
    };
    const closePopupAddNew = () => {
      modalAddNewStatus.value = false;
      refetchData();
    };

    const closeReportGridEdit = () => {
      if (hasChangedPopupPA210.value) {
        notification("destroy", "");
        comfirmClosePopup(() => {
          statusReportGridEdit.value = false;
          refetchData();
          store.commit("common/setHasChangedPopupPA210", false);
        });
      } else {
        statusReportGridEdit.value = false;
        refetchData();
      }
    };

    const closeReportGridModify = () => {
      if (hasChangedPopupPA210.value) {
        notification("destroy", "");
        comfirmClosePopup(() => {
          statusReportGridModify.value = false;
          refetchData();
          store.commit("common/setHasChangedPopupPA210", false);
        });
      } else {
        statusReportGridModify.value = false;
        refetchData();
      }
    };

    const closeReportGridEditModify = () => {
      if (hasChangedPopupPA210.value) {
        notification("destroy", "");
        comfirmClosePopup(() => {
          statusReportGridEditModify.value = false;
          refetchData();
          store.commit("common/setHasChangedPopupPA210", false);
        });
      } else {
        statusReportGridEditModify.value = false;
        refetchData();
      }
    };

    const openModalHistory = (data: any) => {
      modalHistoryStatus.value = true;
    };
    const openPopupEmail = (data: any) => {
      dataPopup.value = {
        reportId: data.reportId,
        companyId: data.companyId,
        imputedYear: data.imputedYear,
      };
      modalSendEmailStatus.value = true;
    };
    const openPopupPrint = (data: any) => {
      dataPopup.value = {
        reportId: data.reportId,
        companyId: data.companyId,
        imputedYear: data.imputedYear,
      };
      modalPrintStatus.value = true;
    };
    const changeStatusRowTable = (data: any) => {
      actionChangeStatus({
        companyId: data.companyId,
        imputedYear: data.imputedYear,
        reportId: data.reportId,
        status: data.status,
      });
    };
    const editRow = (value: any, icon: string) => {
      dataReport.value = [
        {
          reportId: value.reportId,
          additionalIncome: value.additionalIncome,
          afterDeadline: value.afterDeadline,
          imputedYear: value.imputedYear,
          imputedMonth: value.imputedMonth,
          paymentYear: value.paymentYear,
          paymentMonth: value.paymentMonth,
          reportType: value.reportType,
          paymentType: value.paymentType,
          reportClassCode: value.reportClassCode,
          index: value.index,
          status: value.status,
          refund: value.refund,
          submissionDate: value.submissionDate,
          yearEndTaxAdjustment: value.yearEndTaxAdjustment,
          imputedFinishYearMonth: value.imputedFinishYearMonth,
          paymentFinishYearMonth: value.paymentFinishYearMonth,
          imputedStartYearMonth: value.imputedStartYearMonth,
          paymentStartYearMonth: value.paymentStartYearMonth,
          detailId: value.detailId,
          ...value.detail,
        },
      ];
      if (icon == "iconEdit" && value.index == 0) {
        statusReportGridEdit.value = true;
        resetComponentEdit.value++;
      } else if (icon == "iconAdd") {
        // set day to current day if is modify action
        dataReport.value[0].submissionDate = dayjs().format("YYYYMMDD");
        statusReportGridModify.value = true;
        resetComponentModify.value++;
      } else {
        // set day to current day if is modify action
        dataReport.value[0].submissionDate = dayjs().format("YYYYMMDD");
        statusReportGridEditModify.value = true;
        resetComponentModify.value++;
      }
    };
    const checkModify = (data: any) => {
      let reportClassCodes = dataSource.value.filter(
        (value: any) => value.reportClassCode == data.reportClassCode
      );
      let indexMax = Math.max(
        ...reportClassCodes.map(
          (dataReportClassCode: any) => dataReportClassCode.index
        )
      );
      if (indexMax == data.index && data.status == 40) {
        return true;
      } else {
        return false;
      }
    };

    const onRowClick = (data: any) => {
      store.state.common.focusedRowKeyPA210 = data.reportId;
    };
    return {
      globalYear,
      move_column,
      colomn_resize,
      dayjs,
      dataSource,
      loading,
      store,
      getReportType,
      dataPopupAdd,
      openAddNewModal,
      modalAddNewStatus,
      openModalHistory,
      modalHistoryStatus,
      openPopupEmail,
      modalSendEmailStatus,
      openPopupPrint,
      modalPrintStatus,
      closePopupAddNew,
      closeReportGridEdit,
      closeReportGridModify,
      closeReportGridEditModify,
      editRow,
      statusReportGridEdit,
      dataReport,
      statusReportGridModify,
      statusReportGridEditModify,
      dataPopup,
      changeStatusRowTable,
      resetComponentEdit,
      resetComponentModify,
      getAfterDeadline,
      checkModify,
      showTooltipYearMonth,
      onRowClick,
      userType
    };
  },
});
</script>
<style scoped lang="scss" src="./style/style.scss"></style>
