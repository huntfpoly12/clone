<template>
  <a-spin :spinning="loading || loadingReport" size="large">
    <action-header title="거주자의 사업소득원천징수영수증 " @actionSearch="searching" />
    <div id="pa-430">
      <div class="search-form">
          <a-row :gutter="20">
            <a-col >
              <div class="income-earners dflex custom-flex">
                <label class="lable-item">소득자보관용: </label>
                <div style="width: 70px;" class="label-belonging">귀속</div>
              </div>
            </a-col>
            <a-col>
              <div class="dflex custom-flex">
                <a-range-picker
                    :placeholder="['Start month', 'End month']"
                    format="YYYY-MM"
                    :value="rangeDate"
                    :mode="mode2"
                    @panelChange="handlePanelChange2"
                    @change="handleChange"
                    :locale="locale"
                  />
              </div>
            </a-col>
            <a-col>
              <div class=" selectRatio dflex custom-flex">
                <strong class="lable-item">구분 :</strong>
                <radio-group :arrayValue="arrayRadioCheck" v-model:valueRadioCheck="originData.filter.type"
                  :layoutCustom="'horizontal'" />
              </div>
            </a-col>
          </a-row>
      </div>
      <div class="page-content">
        <div class="page-content-top">
          <a-col :span="12">
            <div class="format-settings">
              <strong>서식 설정: </strong>
              <div class="style-note" >
                <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                <span>
                  본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.
                </span>
              </div>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="created-date">
              <strong class="lable-item">영수일 :</strong>
              <date-time-box width="150px" v-model:valueDate="dataInputReport.input.receiptDate">
              </date-time-box>
            </div>
          </a-col>

        </div>
        <a-col>
          <strong class="lable-item">소득자보관용 :</strong>
          <switch-basic v-model:valueSwitch="valSwitch" :textCheck="'발행자보관용'" :textUnCheck="'발행자보관용'" />
        </a-col>
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          @exporting="onExporting" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          :column-auto-width="true" @selection-changed="selectionChanged">
          <DxToolbar>
            <DxItem template="send-group-mail" />
          </DxToolbar>
          <template #send-group-mail>
            <div class="custom-mail-group">
              <DxButton @click="actionOpenPopupEmailMulti">
                <img src="@/assets/images/emailGroup.png" alt="" style="width: 33px;" />
              </DxButton>
            </div>
          </template>
          <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
          <DxColumn :width="250" caption="사원" cell-template="employee-info" />
          <template #employee-info="{ data }" class="custom-action">
            <div class="custom-action">
              <employee-info :idEmployee="data.data.employee.employeeId" :name="data.data.employee.name"
                :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
                :foreigner="data.data.employee.foreigner" :checkStatus="false" :forDailyUse="data.data.employeeType == 20 ? true: false"/>
            </div>
          </template>
          <DxColumn data-field="retirementType" caption="구분 " cell-template="grid-cell" css-class="cell-center" />
          <template #grid-cell="{ data }">
            <a-tag :color="getColorTag(data.value)?.name">{{
            getColorTag(data.value)?.tag_name
            }}</a-tag>
          </template>
          <DxColumn caption="입사일 (정산시작일) " data-field="settlementStartDate" cell-template="settlementStartDate" css-class="cell-center" :width="100"/>
          <template #settlementStartDate="{ data }">
            {{ $filters.formatDate(data.value.toString()) }}
          </template>
          <DxColumn caption="퇴사일 (정산종료일) " data-field="settlementFinishDate" cell-template="settlementFinishDate" css-class="cell-center" :width="100"/>
          <template #settlementFinishDate="{ data }">
            {{ $filters.formatDate(data.value.toString()) }}
          </template>
          <DxColumn caption="귀속연월" css-class="cell-center" cell-template="inputedYearMonth"/>
          <template #inputedYearMonth="{ data }">
            {{globalYear}}-{{ data.data.imputedMonth }}
          </template>
          <DxColumn caption="지급연월" css-class="cell-center"  cell-template="paymentYearMonth"/>
          <template #paymentYearMonth="{ data  }">
            {{ data.data.paymentYear }}-{{ data.data.paymentMonth }}
          </template>
          <DxColumn caption="퇴직급여"   data-field="retirementBenefits" css-class="cell-center" :width="130"/>
          <DxColumn caption="비과세 퇴직급여"   data-field="nonTaxableRetirementBenefits" css-class="cell-center"/>
          <DxColumn caption="과세대상 퇴직급여"  data-field="taxableRetirementBenefits" css-class="cell-center" />
          <DxColumn caption="공제"   data-field="totalDeduction" css-class="cell-center"/>
          <DxColumn caption="차인지급액" data-field="actualPayment" css-class="cell-center" />
          <DxColumn caption="비고"   css-class="cell-center" cell-template="note"/>
          <template #note="{ data  }">
              <div class="custom-action">
                <four-major-insurance v-if="data.data.employee.nationalPensionDeduction" :typeTag="1" :typeValue="1" />
                <four-major-insurance v-if="data.data.employee.healthInsuranceDeduction" :typeTag="2" :typeValue="1" />
                <four-major-insurance v-if="data.data.employee.employeementInsuranceDeduction" :typeTag="4"
                  :typeValue="1" />
                <four-major-insurance v-if="data.data.employee.nationalPensionSupportPercent" :typeTag="6"
                  :ratio="data.data.employee.nationalPensionSupportPercent" />
                <four-major-insurance v-if="data.data.employee.employeementInsuranceSupportPercent" :typeTag="7"
                  :ratio="data.data.employee.employeementInsuranceSupportPercent" />
                <four-major-insurance v-if="data.data.employee.employeementReductionRatePercent" :typeTag="8"
                  :ratio="data.data.employee.employeementReductionRatePercent" />
                <four-major-insurance v-if="data.data.employee.incomeTaxMagnification" :typeTag="10"
                  :ratio="data.data.employee.incomeTaxMagnification" />
              </div>
          </template>
          <DxColumn :width="80" cell-template="pupop" />
          <template #pupop="{ data }" class="custom-action">
            <div class="custom-action" style="text-align: center;">
              <img @click="actionOpenPopupEmailSingle(data.data)" src="@/assets/images/email.svg" alt=""
                style="width: 25px; margin-right: 3px;" />
              <img src="@/assets/images/print.svg" alt="" style="width: 25px;"  @click="actionPrint(data.data)"/>
            </div>
          </template>
          <DxSummary>
              <DxTotalItem :customize-text="employeeType1" show-in-column="사원" alignment="left"/>
              <DxTotalItem display-format="퇴직급여합계: {0}"  column="retirementBenefits" summary-type="sum" alignment="left"/>
              <DxTotalItem display-format="비과세퇴직급여합계: {0}"  column="nonTaxableRetirementBenefits" summary-type="sum" alignment="left"/>
              <DxTotalItem display-format="과세대상퇴직급여합계: {0}"  column="taxableRetirementBenefits" summary-type="sum" alignment="left"/>
              <DxTotalItem display-format="공제합계: {0}" column="totalDeduction" summary-type="sum"/> 
              <DxTotalItem display-format="차인지급액합계: {0}" column="actualPayment" summary-type="sum"/> 
          </DxSummary>
        </DxDataGrid>
        <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="onCloseEmailSingleModal"
          :data="popupDataEmailSingle" />
        <EmailMultiPopup :modalStatus="modalEmailMulti" @closePopup="onCloseEmailMultiModal" :data="popupDataEmailMulti"
          :emailUserLogin="emailUserLogin" />
      </div>
    </div>
  </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from "vue";
import { useStore } from "vuex";
import { useQuery } from "@vue/apollo-composable";
import locale from 'ant-design-vue/es/date-picker/locale/ko_KR';
import DxButton from "devextreme-vue/button";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
  DxToolbar,
  DxItem, DxSummary, DxTotalItem
} from "devextreme-vue/data-grid";
import {
  companyId,
  onExportingCommon,
  userId,
} from "@/helpers/commonFunction";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA4/PA430/index";
import EmailSinglePopup from "./components/EmailSinglePopup.vue";
import EmailMultiPopup from "./components/EmailMultiPopup.vue";
import queriesGetUser from "@/graphql/queries/BF/BF2/BF210/index";
import dayjs from 'dayjs';
import { Dayjs } from "dayjs";
import 'dayjs/locale/ko';

dayjs.locale('ko');
export default defineComponent({
  components: {
    DxButton,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxToolbar,
    DxItem, DxSummary, DxTotalItem,
    EmailSinglePopup,
    EmailMultiPopup
  },
  setup() {
    const popupDataEmailSingle = ref({})
    const popupDataEmailMulti = ref({})
    const dataSelect = ref<any>([])
    const store = useStore();
    const mode2 = ref<any>(['month', 'month']);
    const globalYear = computed(() => store.state.settings.globalYear);
    const trigger = ref<boolean>(true);
    const triggerReport = ref<boolean>(false);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const modalEmailSingle = ref(false)
    const modalEmailMulti = ref(false)
    const emplRetirementType1 = ref(0)
    const emplRetirementType2 = ref(0)
    const totalEmployee = ref(0)
    const emailUserLogin = ref('')
    const valSwitch  =  ref(false)
    const dataSource = ref([]);
    const arrayRadioCheck = ref([
      { id: null, text: "전체" },
      { id: 1, text: "퇴직소득" },
      { id: 2, text: "중간정산" },
    ]);
    const valueRadioBox = ref(0);
    const rangeDate = ref([dayjs().subtract(11, 'month'), dayjs()]);

    const getColorTag = (data: any) => {
      if (data == 1) {
        return { name: "#C73F09", tag_name: "퇴직" };
      } else if (data == 2) {
        return { name: "#77933C", tag_name: "중간" };
      } 
    };
    const originData = ref({
      companyId: companyId,
      filter: {
        imputedYear: globalYear.value,
        startMonth: dayjs().subtract(11, 'month').month()+1,
        finishMonth: dayjs().month()+1,
        type: null,
      },
    });
    const dataInputReport = reactive({
      companyId: companyId,
      input: {
        imputedYear: globalYear.value,
        type: 3,
        receiptDate: dayjs().format('YYYYMMDD')
      },
      incomeIds: Array()
    })

    watch(valSwitch, (newValue) => { 
      dataInputReport.input.type = newValue ? 2 : 3;
    })

    /**
     *  search Income Retirement Withholding Receipts
     */
    const {
      refetch: refetchData,
      onError,
      result,
      loading,
    } = useQuery(queries.searchIncomeRetirementWithholdingReceipts, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: "no-cache",
    }));

    onError(res => {
        notification('error', res.message)
    })
    const onExporting = (e: { component: any; cancel: boolean }) => {
      onExportingCommon(e.component, e.cancel, "계약정보관리&심사");
    };
    const actionOpenPopupEmailSingle = (data: any) => {
      popupDataEmailSingle.value = {
        companyId: companyId,
        input: {
          imputedYear: globalYear.value,
          type: dataInputReport.input.type,
          receiptDate: dataInputReport.input.receiptDate,
        },
        employeeInputs: {
          senderName: sessionStorage.getItem("username"),
          receiverName: data.employee.name,
          receiverAddress: data.employee.email,
          employeeId: data.employee.employeeId,
          incomeTypeCode: data.employee.incomeTypeCode
        }
      }
      modalEmailSingle.value = true
    }
    const onCloseEmailSingleModal = () => {
      modalEmailSingle.value = false
    }
    const onCloseEmailMultiModal = () => {
      modalEmailMulti.value = false
    }
    /**
     * action send multi email
     */
    const actionOpenPopupEmailMulti = () => {
      popupDataEmailMulti.value = {
        companyId: companyId,
        input: {
          imputedYear: globalYear.value,
          type: dataInputReport.input.type,
          receiptDate: dataInputReport.input.receiptDate,
        },
        employeeInputs: dataSelect.value
      }
      modalEmailMulti.value = true
    }

    /**
     * action print report
     * @param data
     */
     const {
      refetch: refetchReport,
      result: resultReport,
      onError: errorReport,
      loading : loadingReport,
    } = useQuery(queries.getIncomeRetirementWithholdingReceiptReportViewUrl, dataInputReport, () => ({
      enabled: triggerReport.value,
      fetchPolicy: "no-cache",
    }));
    errorReport(res => {
        notification('error', res.message)
    })
    const actionPrint = (data: any) => { 
      dataInputReport.incomeIds = [data.incomeId]
      triggerReport.value = true;
      refetchReport()
    }

    const selectionChanged = (data: any) => {
      data.selectedRowKeys.forEach((data: any) => {
        dataSelect.value.push({
          senderName: sessionStorage.getItem("username"),
          receiverName: data.employee.name,
          receiverAddress: data.employee.email,
          employeeId: data.employee.employeeId,
          incomeTypeCode: data.employee.incomeTypeCode
        })
      })
    }
    const {
      onResult: onResultUserInf
    } = useQuery(queriesGetUser.getUser, { id: userId }, () => ({
      fetchPolicy: "no-cache",
    }));
  
    onResultUserInf(e => {
      emailUserLogin.value = e.data.getUser.email
    })

    watch(result, (value) => {
      if (value) {
        value.searchIncomeRetirementWithholdingReceipts
        dataSource.value = value.searchIncomeRetirementWithholdingReceipts;
        totalEmployee.value = value.searchIncomeRetirementWithholdingReceipts.length
        emplRetirementType1.value = value.searchIncomeRetirementWithholdingReceipts.filter( (item : any ) => item.retirementType == 1).length;
        emplRetirementType2.value = value.searchIncomeRetirementWithholdingReceipts.filter( (item : any ) => item.retirementType == 2).length;
        trigger.value = false;
      }
    });

    const searching = () => {
      trigger.value = true;
      refetchData();
    };

    const sendMail = (sendType: string) => {
      alert(sendType);
    }

    const handleChange = (val: [Dayjs, Dayjs]) => {
      
      
      rangeDate.value = val;
    };

    const handlePanelChange2 = (val: [Dayjs, Dayjs], mode: any[]) => {
      originData.value.filter.startMonth = val[0].month()+1;
      originData.value.filter.finishMonth = val[1].month()+1
      rangeDate.value = val;
      mode2.value = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1],
      ];
    };

    const employeeType1 = () => { 
      return `사원수: ${totalEmployee.value} (퇴직: ${emplRetirementType1.value}, 중간: ${emplRetirementType2.value})`
    }    
    return {
      employeeType1,
      locale,handleChange,handlePanelChange2,mode2,dataInputReport,
      loading,loadingReport,
      actionPrint,
      popupDataEmailSingle,
      popupDataEmailMulti,
      actionOpenPopupEmailSingle,
      actionOpenPopupEmailMulti,
      searching,
      globalYear,
      dataSource,
      sendMail,
      move_column,
      colomn_resize,
      onExporting,
      modalEmailSingle,
      modalEmailMulti,
      onCloseEmailSingleModal,
      onCloseEmailMultiModal,
      selectionChanged,
      emailUserLogin,
      rangeDate,
      valueRadioBox,
      arrayRadioCheck,
      getColorTag,
      originData,
      valSwitch
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss" />
