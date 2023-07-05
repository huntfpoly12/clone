<template>
  <a-spin :spinning="loading || loadingPrint || loadingSendEmail" size="large">
    <action-header title="" @actionSearch="searching" :buttonSearch="true" />
    <div id="pa-230">
      <div class="search-form">
        <a-row >
          <a-col :span="12">
            <a-row :gutter="[24, 8]" >
              <a-col>
                <div class="d-flex-center">
                  <label class="lable-item">구분 :</label>
                  <radio-group
                    :arrayValue="radioCheckDataSearch"
                    v-model:valueRadioCheck="checkBoxOption"
                    layoutCustom="horizontal"
                    class="mt-7"
                  />
                </div>
              </a-col>
              <a-col>
                <div class="dflex custom-flex global-year">
                  <label class="lable-item">귀속연도 :</label>
                  <a-tag color="#a3a2a0">귀 {{ globalYear }}</a-tag>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
      <div class="page-content">
        <a-row class="relative">
          <a-col :span="12" class="setting ">
            <a-form-item label="서식 설정" class="red">
              <div style="width: fit-content">
                <info-tool-tip style="width: fit-content"
                  >본 설정으로 적용된 서식으로 출력 및 메일발송
                  됩니다.</info-tool-tip
                >
              </div>
            </a-form-item>
            <div class="tax-select">
              <radio-group
                :arrayValue="radioCheckData"
                v-model:valueRadioCheck="checkBoxOption2"
              />
            </div>
          </a-col>
        </a-row>
        <DxDataGrid
          ref="dataGrid"
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          :show-borders="true"
          key-expr="employeeId"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          @selection-changed="selectionChanged"
          @cell-prepared="onCellPrepared"
          @row-prepared="onRowPrepared"
          noDataText="내역이 없습니다"
          style="height: calc(100vh - 285px); margin-top: 100px; z-index: 0;"
        >
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" :search-visible-columns="['CompanyNameAndAddress']"/>
          <DxExport :enabled="true" />
          <DxToolbar>
            <DxItem >
              <div class="created-date">
              <label class="lable-item">작성일 :</label>
              <date-time-box v-model:valueDate="createDate" width="150px" />
            </div>
            </DxItem>
            <DxItem template="pagination-send-group-mail" />
            <DxItem template="send-group-print" />
            <DxItem name="searchPanel" />
            <DxItem name="exportButton" css-class="cell-button-export" />
          </DxToolbar>
          <template #pagination-send-group-mail>
            <div class="custom-mail-group">
              <DxButton @click="sendMail">
                <img
                  src="@/assets/images/emailGroup.png"
                  alt=""
                  style="width: 28px"
                />
              </DxButton>
            </div>
          </template>
          <template #send-group-print>
            <div class="custom-mail-group">
              <a-tooltip title="출력 / 저장">
                <div>
                  <DxButton @click="printFunc">
                    <img
                      src="@/assets/images/printGroup.png"
                      alt=""
                      style="width: 28px; margin-right: 3px; cursor: pointer"
                    />
                  </DxButton>
                </div>
              </a-tooltip>
            </div>
          </template>
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSelection mode="multiple" :fixed="true" />
          <DxColumn
            caption="성명"
            data-field="employee.name"
            cell-template="employee-info"
            width="300"
          />
          <template #employee-info="{ data }">
            <employee-info
              :idEmployee="data.data.employeeId"
              :name="data.data.employee.name"
              :idCardNumber="data.data.employee.residentId"
              :status="data.data.employee.status"
              :foreigner="data.data.employee.foreigner"
              :checkStatus="false"
              :employeeId="data.data.employeeId"
            />
          </template>
          <DxColumn
            caption="주민등록번호"
            data-field="employee.residentId"
            cell-template="employee-residentId"
            width="150"
          />
          <template #employee-residentId="{ data }">
            <div>{{ convertResidentId(data.data.employee.residentId) }}</div>
          </template>
          <DxColumn
            caption="비고 "
            data-field="employee.incomeTaxMagnification"
            cell-template="four-major-insurance"
            alignment="left"
          />
          <template #four-major-insurance="{ data }">
            <div>
              <four-major-insurance
                v-if="data.data.employee.nationalPensionDeduction"
                :typeTag="1"
                :typeValue="1"
              />
              <four-major-insurance
                v-if="data.data.employee.healthInsuranceDeduction"
                :typeTag="2"
                :typeValue="1"
              />
              <four-major-insurance
                v-if="data.data.employee.employeementInsuranceDeduction"
                :typeTag="4"
                :typeValue="1"
              />
              <four-major-insurance
                v-if="data.data.employee.nationalPensionSupportPercent"
                :typeTag="6"
                :ratio="data.data.employee.nationalPensionSupportPercent"
              />
              <four-major-insurance
                v-if="data.data.employee.employeementInsuranceSupportPercent"
                :typeTag="7"
                :ratio="data.data.employee.employeementInsuranceSupportPercent"
              />
              <four-major-insurance
                v-if="data.data.employee.employeementReductionRatePercent"
                :typeTag="8"
                :ratio="data.data.employee.employeementReductionRatePercent"
              />
              <four-major-insurance
                v-if="data.data.employee.incomeTaxMagnification"
                :typeTag="10"
                :ratio="data.data.employee.incomeTaxMagnification"
              />
            </div>
          </template>
          <DxColumn
            caption="구분"
            data-field="employee.status"
            cell-template="status"
            width="100"
            alignment="left"
          />
          <template #status="{ data }">
            <span class="status-blue" v-if="data.data.employee.status != 0"
              >계속</span
            >
            <span class="status-red" v-else>중도</span>
          </template>
          <DxColumn
            caption="총급여계"
            alignment="right"
            data-field="totalPay"
            format="#,###"
            data-type="string"
            width="160"
          />
          <DxColumn caption="" cell-template="pupop" width="100" />
          <template #pupop="{ data }">
            <div class="custom-action" style="text-align: center">
              <img
                src="@/assets/images/email.svg"
                alt=""
                style="width: 25px; margin-right: 3px; cursor: pointer"
                @click="sendMail(data.data.employee)"
              />
              <a-tooltip>
                <template #title>출력 / 저장</template>
                <img
                  src="@/assets/images/print.svg"
                  alt=""
                  style="width: 25px; cursor: pointer"
                  @click="printFunc(data.data.employeeId)"
                />
              </a-tooltip>
            </div>
          </template>
          <DxSummary>
            <DxTotalItem
              :customize-text="customTextSummaryInfo"
              show-in-column="성명"
            />
            <DxTotalItem
              column="totalPay"
              name="total_summary"
              summary-type="sum"
              display-format="총급여계합계: [{0}]"
              value-format="#,###"
            />
          </DxSummary>
        </DxDataGrid>
      </div>
    </div>
  </a-spin>
  <a-modal
    v-if="modalSendMail"
    :visible="modalSendMail"
    @cancel="modalSendMail = false"
    width="562px"
    footer=""
    :mask-closable="false"
  >
    <standard-form>
      <div class="d-flex-center mt-20" v-if="switchTypeSendMail == true">
        <img src="@/assets/images/email.svg" alt="" style="width: 50px" />
        <mail-text-box
          :required="true"
          width="200px"
          class="ml-5"
          v-model:valueInput="emailAddress"
          placeholder="abc@example.com"
        />
        <span class="ml-5">로 메일을 발송하시겠습니까?</span>
      </div>

      <!-- sendmail multiple users -->
      <div v-else class="form-mail-2">
        <img src="@/assets/images/emailGroup.png" alt="" />
        <div>
          <div class="ml-40 mt-10">
            개별 메일이 발송되며, 개별 메일이 등록되지 않은 경우에 한해서
          </div>
          <div class="ml-40 d-flex-center">
            <mail-text-box
              :required="true"
              width="200px"
              class="ml-5"
              v-model:valueInput="emailAddress"
              placeholder="abc@example.com"
            />
            <span class="ml-5">로 메일을 발송하시겠습니까?</span>
          </div>
        </div>
      </div>
      <a-row style="margin-top: 50px">
        <a-col :span="16" :offset="6">
          <button-basic
            text="아니요"
            type="default"
            mode="outlined"
            :width="100"
            style="margin-right: 10px"
            @onClick="modalSendMail = false"
          />
          <button-basic
            text="네. 발송합니다"
            type="default"
            mode="contained"
            :width="150"
            @onClick="confirmSendMail"
          />
        </a-col>
      </a-row>
    </standard-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { Message } from "@/configs/enum";
import mutations from "@/graphql/mutations/PA/PA2/PA230/index";
import queries from "@/graphql/queries/PA/PA2/PA230/index";
import { companyId, convertResidentId } from "@/helpers/commonFunction";
import filters from "@/helpers/filters";
import { UserInfo } from "@/store/authModule/types";
import notification from "@/utils/notification";
import { useMutation, useQuery } from "@vue/apollo-composable";
import dayjs from "dayjs";
import DxButton from "devextreme-vue/button";
import {
  DxColumn,
  DxDataGrid,
  DxItem,
  DxScrolling,
  DxSelection,
  DxSummary,
  DxToolbar,
  DxTotalItem, DxExport, DxSearchPanel
} from "devextreme-vue/data-grid";
import { computed, ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import { radioCheckData, radioCheckDataSearch } from "./utils/index";

const store = useStore();
const globalYear = computed(() =>
  parseInt(sessionStorage.getItem("paYear") ?? "0")
);
const move_column = computed(() => store.state.settings.move_column);
const colomn_resize = computed(() => store.state.settings.colomn_resize);

const token = computed(() => sessionStorage.getItem("token"));
store.dispatch("auth/getUserInfor", token.value);
const userInfo = computed<UserInfo>(
  () => store.state.auth.userInfor as UserInfo
);

const checkBoxOption = ref(1);
const checkBoxOption2 = ref(1);
const trigger = ref<boolean>(true);
const modalSendMail = ref<boolean>(false);
const triggerPrint = ref<boolean>(false);
const dataSource: any = ref([]);
const originData: any = ref({
  companyId: companyId,
  filter: {
    imputedYear: globalYear.value,
    leaved: null,
  },
});

let createDate = ref(filters.formatDateToInterger(dayjs().format("YYYYMMDD")));
let emailAddress = ref();
let dataSendEmail: any = ref({
  companyId: companyId,
  input: {
    imputedYear: globalYear.value,
    printOption: checkBoxOption2.value,
    createDate: createDate.value,
  },
  employeeInputs: [],
});
let selectedItemKeys: any = ref([]);
let dataPrint: any = ref({
  companyId: companyId,
  input: {
    imputedYear: globalYear.value,
    printOption: checkBoxOption2.value,
    createDate: createDate.value,
  },
  employeeIds: [],
});

// =========================== GRAPHQL =======================================
const {
  refetch: refetchPrint,
  onResult: onResultPrint,
  loading: loadingPrint,
} = useQuery(
  queries.getIncomeWageWithholdingTaxByEmployeeReportViewUrl,
  dataPrint,
  () => ({
    enabled: triggerPrint.value,
    fetchPolicy: "no-cache",
  })
);
onResultPrint((res) => {
  window.open(res.data?.getIncomeWageWithholdingTaxByEmployeeReportViewUrl);
  triggerPrint.value = false
});
const {
  refetch: refetchData,
  result,
  loading,
} = useQuery(
  queries.searchIncomeWageWithholdingTaxByEmployees,
  originData,
  () => ({
    enabled: trigger.value,
    fetchPolicy: "no-cache",
  })
);
watch(result, (value) => {
  if (value) {
    dataSource.value = value.searchIncomeWageWithholdingTaxByEmployees;
    trigger.value = false;
  }
});
watch(
  globalYear,
  (value) => {
    originData.value.filter.imputedYear = value;
    trigger.value = true;
    refetchData();
  },
  { deep: true }
);
// QUERY NAME : getUser
// const {
//     onResult: onResultUserInf,
//     result: resultUserInf,
// } = useQuery(queriesGetUser.getUser, { id: userId }, () => ({
//     fetchPolicy: "no-cache",
// }));
// onResultUserInf(e => {
//     emailAddress.value = e.data.getUser.email
// })
watchEffect(() => {
  emailAddress.value = userInfo.value?.email;
});
const {
  mutate: callSendEmail,
  onDone,
  onError,
  loading: loadingSendEmail,
} = useMutation(mutations.sendIncomeWageWithholdingTaxByEmployeeReportEmail);
onDone(() => {
  clearSelection();
  notification("success", Message.getCommonMessage("801").message);
});
onError((e) => {
  //notification('error', e.message)
});
// ============================== FUNCTION =====================================
const searching = () => {
  trigger.value = true;
  if (checkBoxOption.value == 1) originData.value.filter.leaved = null;
  if (checkBoxOption.value == 2) originData.value.filter.leaved = false;
  if (checkBoxOption.value == 3) originData.value.filter.leaved = true;

  if (originData.value.companyId) refetchData();
};
const switchTypeSendMail = ref(true); //If true:send one person. false: send many people.
const sendMail = (e: any) => {
  // If the retention style is number, send an email to one person. If it's an object type, send a group.
  dataSendEmail.value.companyId = companyId;
  dataSendEmail.value.input = {
    imputedYear: globalYear.value,
    printOption: checkBoxOption2.value,
    createDate: createDate.value,
  };
  if (e.employeeId) {
    console.log('%c sessionStorage.getItem("username")', 'color: red;', sessionStorage.getItem("username"));
    emailAddress.value = userInfo.value.email;
    dataSendEmail.value.employeeInputs = [
      {
        receiverName: e.name,
        receiverAddress: e.email,
        senderName: sessionStorage.getItem("username"),
        employeeId: e.employeeId,
      },
    ];
    switchTypeSendMail.value = true;
    clearSelection();
  } else {
    if (selectedItemKeys.value.length < 1) {
      notification("error", Message.getCommonMessage("404").message);
      return;
    }
    emailAddress.value = userInfo.value.email;
    switchTypeSendMail.value = false;

    dataSendEmail.value.employeeInputs = selectedItemKeys.value.map(
      (val: any) => {
        let dataChecked = dataSource.value.find(
          (data: any) => data.employeeId === val
        );
        return {
          receiverName: dataChecked.employee.name,
          receiverAddress: dataChecked.employee.email || emailAddress.value,
          senderName: sessionStorage.getItem("username"),
          employeeId: dataChecked.employeeId,
        };
      }
    );
  }
  modalSendMail.value = true;
};
const printFunc = (val: any) => {
  dataPrint.value = {
    ...dataPrint.value,
    input: {
      imputedYear: globalYear.value,
      printOption: checkBoxOption2.value,
      createDate: createDate.value,
    },
    employeeIds: [],
  };
  // Print single row
  if (typeof val == "number") {
    dataPrint.value.employeeIds = [val];
    if (dataPrint.value){
      triggerPrint.value = true;
      //  refetchPrint();
    }

  } else {
    // Print multi row
    if (selectedItemKeys.value.length == 0) {
      notification("error", Message.getCommonMessage("404").message);
      return;
    } else {
      dataPrint.value.employeeIds = selectedItemKeys.value;
      triggerPrint.value = true;
    }
    // if (dataPrint.value) refetchPrint();
  }
  clearSelection();
};
const confirmSendMail = (e: any) => {
  var res = e.validationGroup.validate();
  if (!res.isValid) {
    res.brokenRules[0].validator.focus();
  } else {
    if (switchTypeSendMail.value == true) {
      dataSendEmail.value.employeeInputs[0].receiverAddress =
        emailAddress.value;
    } else {
      dataSendEmail.value.employeeInputs.map((val: any) => {
        if (!val.receiverAddress) {
          val.receiverAddress = emailAddress.value;
        }
      });
    }
    callSendEmail(dataSendEmail.value);
    modalSendMail.value = false;
  }
};
const selectionChanged = (data: any) => {
  selectedItemKeys.value = data.selectedRowKeys;
};

const customTextSummaryInfo = () => {
  let total = 0;
  let 계속 = 0;
  let 중도 = 0;
  dataSource.value.map((val: any) => {
    total++;
    if (val.employee.status !== 0) {
      계속++;
    } else {
      중도++;
    }
  });
  return `전체: [${total}] (계속: [${계속}], 중도: [${중도}])`;
};
const dataGrid = ref();
const clearSelection = () => {
  const dataGridRef = dataGrid.value?.instance;
  dataGridRef?.clearSelection();
};

function onCellPrepared(e: any) {
  if (
    !e.cellElement.getAttributeNames().includes("aria-describedby") &&
    e.cellElement.getAttribute("role") === "gridcell" &&
    e.cellElement.getAttribute("aria-colindex") === "6"
  ) {
    e.cellElement.colSpan = 2;
  }
}
function onRowPrepared(e: any) {
  const isRowSummary = e.rowElement.classList.contains("dx-footer-row");
  if (isRowSummary) {
    e.rowElement.removeChild(e.rowElement.lastChild);
  }
}
</script>
<style lang="scss" scoped src="./style/style.scss">
:deep(.dx-freespace-row) {
  display: none !important;
}
</style>
