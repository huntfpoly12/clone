<template>
  <a-modal class="form-modal" width="51%" :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }" :visible="true"
    title="휴복직신고 신규 등록" centered @cancel="onCanCelModal" :footer="null" :mask-closable="false">
    <standard-form ref="formRef">
      <!-- {{ formData.employeeId }} -->
      <a-spin :spinning="getEmployeeWageLoading || getEmployeeWageDailyLoading">
        <div class="mb-10">
          <a-row class="px-10">
            <a-col :span="12">
              <DxField label="직원유행">
                <radio-group :arrayValue="INITIAL_FORM.employeeFashionArr" v-model:valueRadioCheck="formData.employeeType"
                  layoutCustom="horizontal" class="mt-1"></radio-group>
              </DxField>
            </a-col>
            <a-col :span="12">
              <DxField label="직원선택" :required="true">
                <employ-select :arrayValue="employeeArr" :required="true" v-model:valueEmploy="formData.employeeId"
                  :width="formData.employeeType == 10 ? '220px' : '280px'" />
              </DxField>
            </a-col>
          </a-row>
        </div>
        <a-row :gutter="[0, 0]" class="item-group mb-20 row-bd">
          <a-col span="12">
            <DxField label="업체명">
              <default-text-box width="290px" v-model:valueInput="infoCompany.name" placeholder="업체명" disabled />
            </DxField>
          </a-col>
          <a-col span="12">
            <DxField label="대표자명">
              <default-text-box width="290px" v-model:valueInput="infoCompany.presidentName" placeholder="대표자명" disabled />
            </DxField>
          </a-col>
          <a-col span="12">
            <DxField label="사업자등록번호">
              <biz-number-text-box width="290px" v-model:valueInput="infoCompany.bizNumber" placeholder="사업장관리번호" disabled/>
            </DxField>
          </a-col>
          <a-col span="12">
            <DxField label="사업장관리번호">
              <id-number-text-box width="290px" disabled v-model:valueInput="majorInsuranceConsignStatus" mask="000-00-00000-0" />
            </DxField>
          </a-col>
        </a-row>

        <a-row :gutter="[0, 0]" class="item-group row-bd mb-20">
          <!-- row 1 -->
          <a-col :span="8">
            <DxField label="성명">
              <default-text-box v-model:valueInput="showData.name" placeholder="성명" disabled />
            </DxField>
          </a-col>
          <a-col :span="8">
            <DxField label="주민등록번호">
              <id-number-text-box :disabled="true" v-model:valueInput="showData.residentId" />
            </DxField>
          </a-col>
          <!-- row 2 -->
          <a-col :span="8">
            <DxField label="휴직/복직">
              <radio-group :arrayValue="EmploymentStatus" v-model:valueRadioCheck="showData.employmentStatus"
                layoutCustom="horizontal" class="mt-1"></radio-group>
            </DxField>
          </a-col>
        </a-row>

        <box-title title="휴직입력항목" style="margin-bottom: 20px">
          <a-row class="my-3">
            <a-col span="24">
              <DxField label="4대보험 선택" class="field-custom-2">
                <div class="list-insurance-selection">
                  <div class="mr-30">
                    <checkbox-basic v-model:valueCheckbox="formData.nationalPensionReport" label="국민연금" :disabled="!isStatusLeaveOfAbsence" />
                  </div>
                  <div class="mr-30">
                    <checkbox-basic v-model:valueCheckbox="formData.healthInsuranceReport" label="건강보험" :disabled="!isStatusLeaveOfAbsence" />
                  </div>
                  <div class="mr-30">
                    <checkbox-basic v-model:valueCheckbox="formData.employeementInsuranceReport" label="고용보험" :disabled="!isStatusLeaveOfAbsence" />
                  </div>
                  <div>
                    <checkbox-basic v-model:valueCheckbox="formData.industrialAccidentInsuranceReport" label="산재보험" :disabled="!isStatusLeaveOfAbsence" />
                  </div>
                </div>
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="휴직종류" class="field-custom-2">
                <DxSelectBox v-model="formData.typeOfLeave" :search-enabled="true"
                  :data-source="INITIAL_FORM.LeaveOfAbsenceDocument" display-expr="name" value-expr="id" name="type"
                  placeholder="선택" width="200px" :disabled="!isStatusLeaveOfAbsence">
                </DxSelectBox>
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="휴직계파일" class="field-custom-2">
                <div class="fileuploader-container">
                  <UploadFile label="파일 선택" @response-fileId="getFileId" :isFileList="false"
                    :disabled="!isStatusLeaveOfAbsence" />
                </div>
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="휴직시작일" class="field-custom-2">
                <date-time-box :clearable="false" dateFormat="YYYY-MM-DD" v-model:valueDate="formData.startDateOfLeave"
                  width="200px" :disabled="!isStatusLeaveOfAbsence" :teleport="true" />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="휴직종료(예정)" class="field-custom-2">
                <date-time-box :clearable="false" dateFormat="YYYY-MM-DD" v-model:valueDate="formData.endDateOfLeave"
                  :style="{ width: '200px' }" :disabled="!isStatusLeaveOfAbsence" :teleport="true" />
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="국민연금납부예외 사유부호" class="field-custom-2">
                <SelectCustomField :dataSource="INITIAL_FORM.NationalPensionPaymentExemptionCode"
                  :disabled="!isStatusLeaveOfAbsence" v-model:valueInput="formData.pensionPaymentExceptionReasonCode" />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="고용산재 보험구분" class="field-custom-2">
                <SelectCustomField :dataSource="INITIAL_FORM.TypeOfWorkersCompensationInsurance"
                  :disabled="!isStatusLeaveOfAbsence" />
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="건강보험납부유예 사유" class="field-custom-2">
                <SelectCustomField :dataSource="INITIAL_FORM.ReasonForDeferringHealthInsurancePayments"
                  :disabled="!isStatusLeaveOfAbsence"
                  v-model:valueInput="formData.healthInsurancePaymentExceptionReasonCode" />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="고용산재 휴직사유 코드" class="field-custom-2">
                <SelectCustomField :dataSource="INITIAL_FORM.EmploymentInjuryLeaveReasonCode"
                  :disabled="!isStatusLeaveOfAbsence"
                  v-model:valueInput="formData.employeementInsuranceLeaveReasonCode" />
              </DxField>
            </a-col>
          </a-row>
        </box-title>

        <box-title title="복직입력항목">
          <a-row class="my-3">
            <a-col span="24">
              <DxField label="휴직종류" class="field-custom-2">
                <div class="list-insurance-selection">
                  <div class="mr-30">
                    <checkbox-basic v-model:valueCheckbox="formData.nationalPensionReport" label="국민연금" :disabled="isStatusLeaveOfAbsence"/>
                  </div>
                  <div class="mr-30">
                    <checkbox-basic v-model:valueCheckbox="formData.healthInsuranceReport" label="건강보험" :disabled="isStatusLeaveOfAbsence"/>
                  </div>
                </div>
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="납부재개 예정일" class="field-custom-2">
                <date-time-box :clearable="false" dateFormat="YYYY-MM-DD" v-model:valueDate="formData.returnDate"
                  width="200px" :disabled="isStatusLeaveOfAbsence" :teleport="true" />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="복귀후 급여(납부재개)(원)" class="field-custom-2">
                <number-box-money width="200px" v-model:valueInput="formData.salaryAfterReturn"
                  :disabled="isStatusLeaveOfAbsence" placeholder="원" format="#,###" />
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="재개월 납부 희망 여부" class="field-custom-2">
                <radio-group :arrayValue="PaymentDesire" v-model:valueRadioCheck="formData.pensionPaymentAtReturnMonth"
                  layoutCustom="horizontal" :disabled="isStatusLeaveOfAbsence"></radio-group>
              </DxField>
            </a-col>
            <a-col span="12">
            </a-col>
          </a-row>

          <a-row>
            <a-col span="24">
              <div class="px-10">(건강) 유예기간중 지급받은 보수</div>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="연도" class="field-custom-2" alignment="right">
                <Datepicker autoApply yearPicker v-model="formData.healthSalaryPaymentYearDuringLeaveOfAbsence[0].year"
                  :year-range="[1970, globalYear + 1]" :disabled="isStatusLeaveOfAbsence" width="200px" :teleport="true"
                  :enable-time-picker="false">
                </Datepicker>
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="보수총액(원)" class="field-custom-2" alignment="right">
                <number-box-money width="200px"
                  v-model:valueInput="formData.healthSalaryPaymentYearDuringLeaveOfAbsence[0].totalSalary" placeholder="원"
                  :disabled="isStatusLeaveOfAbsence" format="#,###" />
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="연도" class="field-custom-2" alignment="right">
                <Datepicker autoApply yearPicker v-model="formData.healthSalaryPaymentYearDuringLeaveOfAbsence[1].year"
                  :year-range="[1970, globalYear + 1]" :disabled="isStatusLeaveOfAbsence" width="200px" :teleport="true"
                  :enable-time-picker="false">
                </Datepicker>
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="보수총액(원)" class="field-custom-2" alignment="right">
                <number-box-money width="200px"
                  v-model:valueInput="formData.healthSalaryPaymentYearDuringLeaveOfAbsence[1].totalSalary" placeholder="원"
                  :disabled="isStatusLeaveOfAbsence" format="#,###" />
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="연도" class="field-custom-2" alignment="right">
                <Datepicker autoApply yearPicker v-model="formData.healthSalaryPaymentYearDuringLeaveOfAbsence[2].year"
                  :year-range="[1970, globalYear + 1]" :disabled="isStatusLeaveOfAbsence" width="200px" :teleport="true"
                  :enable-time-picker="false">
                </Datepicker>
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="보수총액(원)" class="field-custom-2" alignment="right">
                <number-box-money width="200px"
                  v-model:valueInput="formData.healthSalaryPaymentYearDuringLeaveOfAbsence[2].totalSalary" placeholder="원"
                  :disabled="isStatusLeaveOfAbsence" format="#,###" />
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="분할납부횟수(건)" class="field-custom-2">
                <!-- {{ formData.heathInstallmentPaymentCount }} -->
                <number-box-money v-model:valueInput="formData.heathInstallmentPaymentCount" placeholder="건"
                  format="#,###" :disabled="isStatusLeaveOfAbsence" />
              </DxField>
            </a-col>
            <a-col span="12">
            </a-col>
          </a-row>
        </box-title>
        <div class="d-flex justify-center mt-20">
          <button-basic :width="90" id="btn-save" @onClick="onSubmit($event)" style="margin: auto" mode="contained"
            type="default" text="저장" />
        </div>
      </a-spin>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA8/PA840/index";
import mutations from "@/graphql/mutations/PA/PA8/PA840/index";
import { companyId, makeDataClean } from "@/helpers/commonFunction";

import DxSelectBox from 'devextreme-vue/select-box';
import { useCompanyInfo } from "@/utils/useCompanyInfo";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import INITIAL_FORM from '../utils';
import { EmploymentStatus, PaymentDesire, } from '../utils';
import notification from '@/utils/notification';
import { getCurrentInstance } from "vue";
import { DxTextBox } from 'devextreme-vue';
import Datepicker from "@vuepic/vue-datepicker";

export default defineComponent({
  components: {
    DxSelectBox,
    DxTextBox,
    Datepicker
  },
  props: {
    isOpenModalCreate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { infoCompany } = useCompanyInfo(companyId)
    const globalYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));
    const employeeWageSelected = ref();
    const formData = ref<any>({ ...INITIAL_FORM.INITIAL_FORM_PA840 })
    const employeeArr = ref([]);
    const formDataToCompare = ref<any>({ ...INITIAL_FORM.INITIAL_FORM_PA840 });
    const showData = reactive({
      name: '',
      residentId: '',
      employmentStatus: 4,
    })
    let majorInsuranceConsignStatus = ref('')
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageCreate = messages.getCommonMessage('101').message;

    // -----------------FNC COMMON--------------------------

    const resetEmployeeWage = () => {
      showData.name = '';
      showData.residentId = '';
    }

    // ----------------get data getMajorInsuranceConsignStatus--------------

    const { result: resultGetMajorInsuranceConsignStatus, onError: onErrorGetMajorInsuranceConsignStatus } =
      useQuery(queries.getMajorInsuranceConsignStatus, {
        companyId: companyId
      }, () => ({
        fetchPolicy: "no-cache",
      }));
    onErrorGetMajorInsuranceConsignStatus((e) => {
      majorInsuranceConsignStatus.value = ''
    })
    watch(resultGetMajorInsuranceConsignStatus, (value) => {
      if (value) {
        majorInsuranceConsignStatus.value = value.getMajorInsuranceConsignStatus.manageId
      }
    }, { deep: true });

    // ----------------get data employeeWages--------------

    const employeeWages = ref([]);
    const variables = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const { result: dataEmployeeWages } =
      useQuery(queries.getEmployeeWages, variables, () => ({
        fetchPolicy: "no-cache",
      }));
    watch(dataEmployeeWages, (value) => {
      if (value) {
        employeeWages.value = value.getEmployeeWages;
        employeeArr.value = value.getEmployeeWages;
      }
    }, { deep: true });

    // ----------------get data employeeWageDailies--------------

    const employeeWageDailies = ref([]);
    const variablesWageDailies = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const { result: getEmployeeWageDailies } =
      useQuery(queries.getEmployeeWageDailies, variablesWageDailies, () => ({
        fetchPolicy: "no-cache",
      }));
    watch(getEmployeeWageDailies, (value) => {
      if (value) {
        employeeWageDailies.value = value.getEmployeeWageDailies;
      }
    }, { deep: true });

    // ----------------GET DATA WHEN employeeType == 0--------------

    const getEmployeeWageTrigger = ref(false);
    const getEmployeeWageParam = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
      employeeId: formData.value.employeeId,
    });
    const { result: getEmployeeWageResult, onError: getEmployeeWageOnError, loading: getEmployeeWageLoading } = useQuery(queries.getEmployeeWage, getEmployeeWageParam, () => ({
      enabled: getEmployeeWageTrigger.value,
    }));
    watch(getEmployeeWageResult, (value) => {
      if (value) {
        let data = value.getEmployeeWage;
        if (formData.value.employeeType == 10) {
          showData.name = data.name || '';
          showData.residentId = data.residentId || '';
          formDataToCompare.value = { ...formData.value };
        }
        getEmployeeWageTrigger.value = false;
      }
    }, { deep: true });

    getEmployeeWageOnError((res: any) => {
      notification('error', res.message);
      resetEmployeeWage();
    })

    // ----------------GET DATA WHEN employeeType == 1--------------

    const getEmployeeWageDailyTrigger = ref(false);
    const getEmployeeWageDailyParam = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
      employeeId: formData.value.employeeId,
    });
    const { result: getEmployeeWageDailyResult, loading: getEmployeeWageDailyLoading, onError: getEmployeeWageDailyOnError } = useQuery(queries.getEmployeeWageDaily, getEmployeeWageDailyParam, () => ({
      enabled: getEmployeeWageDailyTrigger.value,
    }));
    watch(
      getEmployeeWageDailyResult, (value) => {
        if (value) {
          let data = value.getEmployeeWageDaily;
          if (formData.value.employeeType == 20) {
            showData.name = data.name || '';
            showData.residentId = data.residentId || '';
            formDataToCompare.value = { ...formData.value };
          }
          getEmployeeWageDailyTrigger.value = false;
        }
      }, { deep: true });
    getEmployeeWageDailyOnError((res: any) => {
      notification('error', res.message);
      resetEmployeeWage();
    })

    //-----------------------UPDATE DATA WHEN EMPLOYEEID CHANGE------------------------

    watch(() => formData.value.employeeId, (newVal: any) => {
      if (newVal) {
        if (formData.value.employeeType == 10) {
          getEmployeeWageParam.employeeId = newVal;
          getEmployeeWageTrigger.value = true;
          // return;
        }
        if (formData.value.employeeType == 20) {
          getEmployeeWageDailyParam.employeeId = newVal;
          getEmployeeWageDailyTrigger.value = true;
          // return;
        }
      }
    }, { deep: true })
    watch(() => formData.value.employeeType, (newVal: any) => {
      if (newVal == 10) {
        employeeArr.value = employeeWages.value;
        formData.value.employeeId = null;
        resetEmployeeWage();
      }
      if (newVal == 20) {
        employeeArr.value = employeeWageDailies.value;
        formData.value.employeeId = null;
        resetEmployeeWage();
      }
    }, { deep: true })

    //----------------------------------WATCH showData.employmentStatus CHANGE --------------------------------

    watch(() => showData.employmentStatus, (newVal: number) => {
      let { employeeId, employeeType, ...resetData }: any = INITIAL_FORM.INITIAL_FORM_PA840;
      Object.keys(resetData).forEach((item: string) => {
        formData.value[item] = resetData[item];
        if (item == 'healthSalaryPaymentYearDuringLeaveOfAbsence') {
          formData.value[item][0].totalSalary = 0;
          formData.value[item][1].totalSalary = 0;
          formData.value[item][2].totalSalary = 0;
        }
      })
      // formDataToCompare.value = resetData;
    }, { deep: true })

    //----------------------------------FORM ACTION MUTATE-------------------------------

    const {
      mutate: createLeaveOfAbsenceMutate,
      onDone: createLeaveOfAbsenceDone,
      onError: createLeaveOfAbsenceError }
      = useMutation(mutations.createMajorInsuranceCompanyEmployeeLeaveOfAbsence);
    createLeaveOfAbsenceDone((res: any) => {
      notification('success', messageCreate);
      emit('closeModal', true);
    })
    createLeaveOfAbsenceError((res: any) => {
      notification('error', res.message);
    })

    const {
      mutate: createReturnToWorkMutate,
      onDone: createReturnToWorkDone,
      onError: createReturnToWorkError }
      = useMutation(mutations.createMajorInsuranceCompanyEmployeeReturnToWork);
    createReturnToWorkDone((res: any) => {
      notification('success', messageCreate);
      emit('closeModal', true);
    })
    createReturnToWorkError((res: any) => {
      notification('error', res.message);
    })

    const onSubmit = async (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        if (showData.employmentStatus === 4) {
          let dataType1 = {
            employeeType: formData.value.employeeType,
            employeeId: formData.value.employeeId,
            nationalPensionReport: formData.value.nationalPensionReport,
            healthInsuranceReport: formData.value.healthInsuranceReport,
            employeementInsuranceReport: formData.value.employeementInsuranceReport,
            industrialAccidentInsuranceReport: formData.value.industrialAccidentInsuranceReport,
            typeOfLeave: formData.value.typeOfLeave,
            leaveOfAbsenceRequestFileStorageId: formData.value.leaveOfAbsenceRequestFileStorageId,
            startDateOfLeave: formData.value.startDateOfLeave,
            endDateOfLeave: formData.value.endDateOfLeave,
            pensionPaymentExceptionReasonCode: formData.value.pensionPaymentExceptionReasonCode,
            healthInsurancePaymentExceptionReasonCode: formData.value.healthInsurancePaymentExceptionReasonCode,
            employeementInsuranceLeaveReasonCode: formData.value.employeementInsuranceLeaveReasonCode,
          }
          makeDataClean(dataType1, ['']);
          createLeaveOfAbsenceMutate({ companyId: companyId, imputedYear: globalYear.value, input: dataType1 });
        } else {
          let dataType2 = {
            employeeType: formData.value.employeeType,
            employeeId: formData.value.employeeId,
            nationalPensionReport: formData.value.nationalPensionReport,
            healthInsuranceReport: formData.value.healthInsuranceReport,

            returnDate: formData.value.returnDate,
            salaryAfterReturn: formData.value.salaryAfterReturn,
            pensionPaymentAtReturnMonth: formData.value.pensionPaymentAtReturnMonth,

            healthSalaryPaymentYearDuringLeaveOfAbsence: formData.value.healthSalaryPaymentYearDuringLeaveOfAbsence.filter ((item: any) => !!item.year),
            heathInstallmentPaymentCount: formData.value.heathInstallmentPaymentCount,
          }
          makeDataClean(dataType2, ['']);
          createReturnToWorkMutate({ companyId: companyId, imputedYear: globalYear.value, input: dataType2 });
        }
      }
    }
    const getFileId = (fileId: { id: number }) => {
      formData.value.leaveOfAbsenceRequestFileStorageId = fileId.id;
    };
    const isStatusLeaveOfAbsence = computed(() => showData.employmentStatus === 4);
    const onCanCelModal = () => {
      if (JSON.stringify(formDataToCompare.value) == JSON.stringify(formData.value)) {
        emit('closeModal');
        formData.value.healthSalaryPaymentYearDuringLeaveOfAbsence[0].totalSalary = 0;
      } else {
        formData.value.healthSalaryPaymentYearDuringLeaveOfAbsence[0].totalSalary = 0;
        comfirmClosePopup(() => emit('closeModal'))
      }
    }
    return {
      employeeWages,
      employeeWageSelected,
      formData,
      onSubmit,
      EmploymentStatus,
      PaymentDesire,
      INITIAL_FORM,
      getFileId,
      infoCompany,
      onCanCelModal,
      isStatusLeaveOfAbsence,
      col: {
        left: 13,
        right: 9,
        space: 3,
      },
      employeeArr,
      formDataToCompare,
      showData,
      globalYear,
      getEmployeeWageDailyLoading, getEmployeeWageLoading,
      majorInsuranceConsignStatus
    }
  },
})
</script>

<style scoped>
.gap-20 {
  gap: 20px;
}

:deep(.dx-texteditor-input) {
  text-align: left !important;
}

:deep .ant-tag {
  width: 29px;
  text-align: center;
}

/* :deep .dx-template-wrapper {
  width: 100%;
  padding: 3px;
} */

:deep .dx-state-disabled input {
  color: #999 !important;
}

:deep .dp__disabled {
  color: #999 !important;
  opacity: 0.5;
}

:deep .dx-field {
  padding-right: 0;
}

.row-bd {
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #d4d2d2;
  border-radius: 10px;
}

.list-insurance-selection {
  display: flex;
  margin-bottom: 5px;
}

.mt-10 {
  margin-top: 10px;
}

.mb-10 {
  margin-bottom: 10px;
}

.mb-20 {
  margin-bottom: 20px;
}
</style>
