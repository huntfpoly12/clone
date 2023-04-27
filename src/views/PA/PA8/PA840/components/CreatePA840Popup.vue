<template>
  <a-modal class="form-modal" width="50%" :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }" :visible="true"
    title="휴복직신고 신규 등록" centered @cancel="onCanCelModal" :footer="null" :mask-closable="false">
    <standard-form ref="formRef">
      <!-- {{ formData }} -->
      <div class="mb-10">
        <a-row>
          <a-col :span="col.left">
            <DxField label="직원유행">
              <radio-group :arrayValue="INITIAL_FORM.employeeFashionArr" v-model:valueRadioCheck="formData.employeeType"
                layoutCustom="horizontal" class="mt-1"></radio-group>
            </DxField>
          </a-col>
          <a-col :span="col.right">
            <DxField label="직원선택" :required="true">
              <employ-select :arrayValue="employeeArr" :required="true" v-model:valueEmploy="formData.employeeId"
                :width="formData.employeeType == 10 ? '220px' : '280px'" />
            </DxField>
          </a-col>
        </a-row>
      </div>
      <a-row :gutter="[0, 0]" class="item-group mb-10">
        <a-col span="8">
          <DxField label="업체명">
            <default-text-box v-model:valueInput="infoCompany.name" placeholder="업체명" disabled />
          </DxField>
        </a-col>
        <a-col span="8">
          <DxField label="대표자명">
            <default-text-box v-model:valueInput="infoCompany.presidentName" placeholder="대표자명" disabled />
          </DxField>
        </a-col>
        <a-col span="8">
          <DxField label="사업장관리번호">
            <default-text-box v-model:valueInput="infoCompany.bizNumber" placeholder="사업장관리번호" disabled />
          </DxField>
        </a-col>
      </a-row>
      <a-row :gutter="[0, 0]" class="item-group mb-10">
        <!-- row 1 -->
        <a-col :span="col.left">
          <DxField label="성명">
            <default-text-box v-model:valueInput="showData.name" placeholder="성명" width="200px" disabled />
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <DxField label="주민등록번호" class="field-custom">
            <id-number-text-box :disabled="true" width="200px" v-model:valueInput="showData.residentId" />
          </DxField>
        </a-col>

        <!-- row 2 -->
        <a-col :span="col.left">
          <DxField label="휴직/복직">
            <radio-group :arrayValue="EmploymentStatus" v-model:valueRadioCheck="showData.employmentStatus"
              layoutCustom="horizontal" class="mt-1"></radio-group>
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <DxField label="납부재개 예정일" class="field-custom">
            <date-time-box :clearable="false" dateFormat="YYYY-MM-DD" v-model="formData.returnDate" width="200px"
              :disabled="isStatusLeaveOfAbsence" />
          </DxField>
        </a-col>

        <!-- row 3 -->
        <a-col :span="col.left">
          <DxField label="휴직종류">
            <DxSelectBox v-model="formData.typeOfLeave" :search-enabled="true"
              :data-source="INITIAL_FORM.LeaveOfAbsenceDocument" display-expr="name" value-expr="id" name="type"
              placeholder="선택" width="200px" :disabled="!isStatusLeaveOfAbsence">
            </DxSelectBox>
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <DxField label="복귀후 급여(납부재개)" class="field-custom">
            <number-box-money width="200px" v-model:valueInput="formData.salaryAfterReturn"
              :disabled="isStatusLeaveOfAbsence" placeholder="원" format="#,### 원" />
          </DxField>

        </a-col>

        <!-- row 4 -->
        <a-col :span="col.left">
          <DxField label="휴직계파일">
            <div class="fileuploader-container">
              <UploadFile label="파일 선택" @response-fileId="getFileId" :isFileList="false"
                :disabled="!isStatusLeaveOfAbsence" />
            </div>
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <DxField label="재개월 납부 희망 여부" class="field-custom">
            <radio-group :arrayValue="PaymentDesire" v-model:valueRadioCheck="formData.pensionPaymentAtReturnMonth"
              layoutCustom="horizontal" :disabled="isStatusLeaveOfAbsence"></radio-group>
          </DxField>
        </a-col>

        <!-- row 5 -->
        <a-col :span="col.left">
          <DxField label="휴직시작일">
            <date-time-box :clearable="false" dateFormat="YYYY-MM-DD" v-model:valueDate="formData.startDateOfLeave"
              width="200px" :disabled="!isStatusLeaveOfAbsence" :teleport="true" />
          </DxField>
        </a-col>
        <a-col :span="col.right">
          <div class="px-10">(건강) 유예기간중 지급받은 보수</div>
        </a-col>

        <!-- row 6 -->
        <a-col :span="col.left">
          <DxField label="휴직종료(예정)">
            <date-time-box :clearable="false" dateFormat="YYYY-MM-DD" v-model:valueDate="formData.endDateOfLeave"
              :style="{width:'200px'}" :disabled="!isStatusLeaveOfAbsence" :teleport="true" />
          </DxField>
        </a-col>
        <a-col :span="col.right" class="pl-50">
          <DxField label="연도" class="field-custom">
            <Datepicker autoApply yearPicker v-model="formData.healthSalaryPaymentYearDuringLeaveOfAbsence[0].year"
              :year-range="[1970, globalYear + 1]" :disabled="isStatusLeaveOfAbsence" width="200px">
            </Datepicker>
          </DxField>
        </a-col>

        <!-- row 7 -->
        <a-col :span="col.left">
          <DxField label="국민연금납부예외 사유부호" class="field-custom-2">
            <DxSelectBox :search-enabled="false" width="200px"
              :data-source="INITIAL_FORM.NationalPensionPaymentExemptionCode" display-expr="name" value-expr="id"
              :disabled="!isStatusLeaveOfAbsence" v-model="formData.pensionPaymentExceptionReasonCode" placeholder="선택"
              field-template="field" item-template="item">
              <template #field=" { data } : any ">
                <div v-if=" data " class="text-overflow" style="padding: 2px;display: flex; align-items: center;">
                  <a-tag>{{ data?.id }}</a-tag>
                  <div>
                    {{ data.name }}
                    <DxTextBox style="display: none;" />
                  </div>
                </div>
                <div v-else class="pt-5 pl-5">
                  <span>선택</span>
                  <DxTextBox style="display: none;" />
                </div>
              </template>
              <template #item=" { data } : any ">
                <div style="display: flex; align-items: center;">
                  <a-tag>{{ data?.id }}</a-tag>
                  <div>
                    {{ data?.name }}
                    <DxTextBox style="display: none;" />
                  </div>
                </div>
              </template>
            </DxSelectBox>
            <!-- <DxSelectBox v-model=" formData.pensionPaymentExceptionReasonCode " :search-enabled=" true "
              :data-source=" INITIAL_FORM.NationalPensionPaymentExemptionCode " display-expr="name" value-expr="id"
              name="type" placeholder="선택" width="200px" :disabled=" !isStatusLeaveOfAbsence " /> -->
          </DxField>
        </a-col>
        <a-col :span=" col.right " class="pl-50">
          <DxField label="보수총액" class="field-custom">
            <number-box-money width="200px"
              v-model:valueInput=" formData.healthSalaryPaymentYearDuringLeaveOfAbsence[0].totalSalary " placeholder="원"
              :disabled=" isStatusLeaveOfAbsence " format="#,### 원" />
          </DxField>
        </a-col>

        <!-- row 8 -->
        <a-col :span=" col.left ">
          <DxField label="건강보험납부유예 사유" class="field-custom-2">
            <DxSelectBox :search-enabled=" false " width="200px"
              :data-source=" INITIAL_FORM.ReasonForDeferringHealthInsurancePayments " display-expr="name" value-expr="id"
              :disabled=" !isStatusLeaveOfAbsence " v-model=" formData.healthInsurancePaymentExceptionReasonCode "
              placeholder="선택" field-template="field" item-template="item">
              <template #field=" { data } : any ">
                <div v-if=" data " class="text-overflow" style="padding: 2px;display: flex; align-items: center;">
                  <a-tag>{{ data?.id }}</a-tag>
                  <div>
                    {{ data.name }}
                    <DxTextBox style="display: none;" />
                  </div>
                </div>
                <div v-else class="pt-5 pl-5">
                  <span>선택</span>
                  <DxTextBox style="display: none;" />
                </div>
              </template>
              <template #item=" { data } : any ">
                <div style="display: flex; align-items: center;">
                  <a-tag>{{ data?.id }}</a-tag>
                  <div>
                    {{ data?.name }}
                    <DxTextBox style="display: none;" />
                  </div>
                </div>
              </template>
            </DxSelectBox>
            <!-- <DxSelectBox v-model="formData.healthInsurancePaymentExceptionReasonCode" :search-enabled="true"
              :data-source="INITIAL_FORM.ReasonForDeferringHealthInsurancePayments" display-expr="name" value-expr="id"
              name="type" placeholder="선택" width="200px" :disabled="!isStatusLeaveOfAbsence" /> -->
          </DxField>
        </a-col>
        <a-col :span=" col.right " class="pl-50">
          <DxField label="분할납부횟수" class="field-custom">

            <number-box v-model:valueInput=" formData.heathInstallmentPaymentCount " placeholder="건" width="200px"
              :disabled=" isStatusLeaveOfAbsence " />
          </DxField>
        </a-col>

        <!-- row 9 chua co ten truong-->
        <a-col :span=" col.left ">
          <DxField label="고용산재 보험구분" class="field-custom-2">
            <DxSelectBox :search-enabled=" false " width="200px"
              :data-source=" INITIAL_FORM.TypeOfWorkersCompensationInsurance " display-expr="name" value-expr="id"
              :disabled=" !isStatusLeaveOfAbsence " placeholder="선택" field-template="field" item-template="item">
              <template #field=" { data } : any ">
                <div v-if=" data " class="text-overflow" style="padding: 2px;display: flex; align-items: center;">
                  <a-tag>{{ data?.id }}</a-tag>
                  <div>
                    {{ data.name }}
                    <DxTextBox style="display: none;" />
                  </div>
                </div>
                <div v-else class="pt-5 pl-5">
                  <span>선택</span>
                  <DxTextBox style="display: none;" />
                </div>
              </template>
              <template #item=" { data } : any ">
                <div style="display: flex; align-items: center;">
                  <a-tag>{{ data?.id }}</a-tag>
                  <div>
                    {{ data?.name }}
                    <DxTextBox style="display: none;" />
                  </div>
                </div>
              </template>
            </DxSelectBox>
            <!-- <DxSelectBox v-model=" formData.employeementInsuranceLeaveReasonCode " :search-enabled=" true "
              :data-source=" INITIAL_FORM.TypeOfWorkersCompensationInsurance " display-expr="name" value-expr="id"
              name="type" placeholder="선택" width="200px" :disabled=" !isStatusLeaveOfAbsence " /> -->
          </DxField>
        </a-col>
        <a-col :span=" col.right " />

        <!-- row 10 -->
        <a-col :span=" col.left ">
          <DxField label="고용산재 휴직사유 코드" class="field-custom-2">
            <DxSelectBox :search-enabled=" false " width="200px"
              :data-source=" INITIAL_FORM.EmploymentInjuryLeaveReasonCode " display-expr="name" value-expr="id"
              :disabled=" !isStatusLeaveOfAbsence " v-model=" formData.employeementInsuranceLeaveReasonCode "
              placeholder="선택" field-template="field" item-template="item">
              <template #field=" { data } : any ">
                <div v-if=" data " class="text-overflow" style="padding: 2px;display: flex; align-items: center;">
                  <a-tag>{{ data?.id }}</a-tag>
                  <div>
                    {{ data.name }}
                    <DxTextBox style="display: none;" />
                  </div>
                </div>
                <div v-else class="pt-5 pl-5">
                  <span>선택</span>
                  <DxTextBox style="display: none;" />
                </div>
              </template>
              <template #item=" { data } : any ">
                <div style="display: flex; align-items: center;">
                  <a-tag>{{ data?.id }}</a-tag>
                  <div>
                    {{ data?.name }}
                    <DxTextBox style="display: none;" />
                  </div>
                </div>
              </template>
            </DxSelectBox>
            <!-- <DxSelectBox :search-enabled=" true " :data-source=" INITIAL_FORM.EmploymentInjuryLeaveReasonCode "
              display-expr="name" value-expr="id" name="type" placeholder="선택" width="200px"
              :disabled=" !isStatusLeaveOfAbsence " /> -->
          </DxField>
        </a-col>
        <a-col :span=" col.right " />
      </a-row>
      <div class="d-flex justify-center mt-20">
        <button-basic :width=" 90 " id="btn-save" @onClick=" onSubmit($event) " style="margin: auto" mode="contained"
          type="default" text="저장" />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA8/PA840/index";
import mutations from "@/graphql/mutations/PA/PA8/PA840/index";
import { companyId, makeDataClean } from "@/helpers/commonFunction";
import { useStore } from "vuex";

import DxSelectBox from 'devextreme-vue/select-box';
import { useCompanyInfo } from "@/helpers/useCompanyInfo";
import { cloneDeep, isEqual } from "lodash";
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
    const formData = ref({ ...INITIAL_FORM.INITIAL_FORM_PA840 })
    const employeeArr = ref([]);
    const formDataToCompare = ref({ ...INITIAL_FORM.INITIAL_FORM_PA840 });
    const showData = reactive({
      name: '',
      residentId: '',
      employmentStatus: 4,
    })
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageCreate = messages.getCommonMessage('101').message;
    // -----------------FNC COMMON--------------------------

    const resetEmployeeWage = () => {
      showData.name = '';
      showData.residentId = '';
      showData.employmentStatus = 4;
    }

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

    //-----------------------UPDATE DATA WHEN EMPLOYEE CHANGE------------------------

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
      } else {
        employeeArr.value = employeeWageDailies.value;
      }
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
          console.log(`output->dataType1`, dataType1);
          // createLeaveOfAbsenceMutate({ companyId: companyId, imputedYear: globalYear.value, input: dataType1 });
        } else {
          let dataType2 = {
            employeeType: formData.value.employeeType,
            employeeId: formData.value.employeeId,
            nationalPensionReport: formData.value.nationalPensionReport,
            healthInsuranceReport: formData.value.healthInsuranceReport,

            returnDate: formData.value.returnDate,
            salaryAfterReturn: formData.value.salaryAfterReturn,
            pensionPaymentAtReturnMonth: formData.value.pensionPaymentAtReturnMonth,

            healthSalaryPaymentYearDuringLeaveOfAbsence: formData.value.healthSalaryPaymentYearDuringLeaveOfAbsence,
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
      } else {
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
      globalYear
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

:deep .dx-template-wrapper {
  width: 100%;
  padding: 3px;
}

:deep .dx-state-disabled input {
  color: #999 !important;
}

:deep .dp__disabled {
  color: #999 !important;
  opacity: 0.5;
}
</style>
