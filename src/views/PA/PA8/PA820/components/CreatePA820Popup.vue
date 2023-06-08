<template>
  <a-modal class="form-modal" width="900px" :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }" :visible="true"
    title="상실신고 신규 등록" centered @cancel="onCanCelModal" :footer="null">
    <a-spin :spinning="getEmployeeWageDailyLoading || getEmployeeWageLoading">
      <standard-form ref="formPa820Ref">
        <div class="form-container">
          <div class="form-first pl-15">
            <a-row>
              <a-col :span="12">
                <a-form-item label="직원유행" label-align="right">
                  <radio-group :arrayValue="employeeFashionArr" v-model:valueRadioCheck="formState.employeeType"
                    layoutCustom="horizontal" class="mt-1"></radio-group>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="직원선택" class="red">
                  <div class="d-flex-center">
                    <employ-select :arrayValue="employeeArr" :required="true" v-model:valueEmploy="formState.employeeId"
                      width="200" />
                  </div>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div class="form-group">
            <a-row>
              <a-col :span="12">
                <a-form-item label="업체명" label-align="right">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="showData.name" :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="대표자명" label-align="right">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="showData.presidentName"
                    :required="true" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="mt-10">
              <a-col :span="12">
                <a-form-item label="사업자등록번호" label-align="right">
                  <biz-number-text-box v-model:valueInput="showData.bizNumber" width="200px" :disabled="true"
                    messRequired="이항목은 필수 입력사항입니다!" nameInput="companyBizNumber" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="사업장관리번호" label-align="right">
                  <id-number-text-box disabled v-model:valueInput="infoMajorInsuranceConsignStatus.manageId"
                    mask="000-00-00000-0" width="200px" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div class="form-group">
            <a-row>
              <a-col :span="12">
                <a-form-item label="성명" label-align="right">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="showData.name1" :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="주민등록번호" label-align="right">
                  <id-number-text-box :disabled="true" width="200px" v-model:valueInput="showData.residentId"
                    :mask="'######-######*'" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="mt-10">
              <a-col :span="12">
                <a-form-item label="취득일(입사일)" label-align="right">
                  <date-time-box text="지" v-model:valueDate="showData.joinedAt" bgColor="white" :clearable="false"
                    width="200px" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="상실년월일(퇴사일)" label-align="right">
                  <date-time-box text="지" v-model:valueDate="showData.leavedAt" bgColor="white" :clearable="false"
                    width="200px" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div class="form-group">
            <a-form-item label="4대보험 선택" label-align="left" class="mb-0">
              <div class="check-box-group">
                <checkbox-basic size="14" label="국민연금" class="mr-35"
                  v-model:valueCheckbox="formState.nationalPensionReport" />
                <checkbox-basic size="14" label="건강보험" class="mr-35"
                  v-model:valueCheckbox="formState.healthInsuranceReport" />
                <checkbox-basic size="14" label="고용보험" class="mr-35"
                  v-model:valueCheckbox="formState.employeementInsuranceReport" />
                <checkbox-basic size="14" label="산재보험"
                  v-model:valueCheckbox="formState.industrialAccidentInsuranceReport" />
              </div>
            </a-form-item>
            <a-row class="mt-10">
              <a-form-item label="국민연금" label-align="left" class="mb-0">
                <div class="input-text">
                  <div class="select-group">
                    <span>상실부호</span>
                    <SelectCustomField :dataSource="nationaPersionSelectbox" :disabled="!formState.nationalPensionReport"
                      v-model:valueInput="formState.nationalPensionLossCode" width="357px" />
                  </div>
                  <span class="ml-40">
                    <checkbox-basic size="14" label="취득월 국민연금 납부" v-model:valueCheckbox="showData.acquisitionMonthPayment"
                      :disabled="!formState.nationalPensionReport" />
                  </span>
                  <a-tooltip color="black" placement="top">
                    <template #title>1일취득은 만근퇴사의 경우 의무납부</template>
                    <img src="@/assets/images/iconInfo.png" class="img-info" />
                  </a-tooltip>
                </div>
              </a-form-item>
            </a-row>
            <a-row class="mt-10">
              <a-form-item label="건강보험" label-align="left" class="mb-0">
                <div class="input-text">
                  <div class="select-group">
                    <span>상실부호</span>
                    <SelectCustomField :dataSource="healthInsuranceSelectbox" :disabled="!formState.healthInsuranceReport"
                      v-model:valueInput="formState.healthInsuranceLossCode" width="357px" />
                  </div>
                </div>
              </a-form-item>
            </a-row>
            <a-row class="mt-10">
              <a-form-item label="고용산재" label-align="left" class="mb-0">
                <div class="input-text">
                  <div class="select-group">
                    <span>상실부호</span>
                    <SelectCustomField :dataSource="includeDependentsSelectbox" :disabled="isDisabled1"
                      v-model:valueInput="formState.employeementInsuranceLossCode" width="357px" />
                  </div>
                  <span class="ml-40">
                    <checkbox-basic size="14" label="이직확인서 발급희망"
                      v-model:valueCheckbox="formState.employeementInsuranceJobChangeReport"
                      :disabled="isDisabled1 || !isDisabled2" />
                  </span>
                </div>
              </a-form-item>
            </a-row>
            <a-row class="mt-10">
              <div class="input-text jobtype-margin">
                <div class="text-detail">상실사유 (10자이내 간략히)</div>
                <text-number-box :disabled="true" width="540px"
                  v-model:valueInput="formState.employeementInsuranceLossDescription" />
              </div>
            </a-row>
          </div>
          <div class="form-group">
            <a-row>
              <a-col :span="12">
                <a-form-item label="당해년도 보수총액" label-align="right">
                  <number-box-money width="200px" :disabled="false" v-model:valueInput="formState.totalSalaryThisYear"
                    :required="false" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="당해년도 산정월수" label-align="right">
                  <number-box-money width="200px" :disabled="false" v-model:valueInput="formState.workMonthThisYear"
                    :required="false" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-item label="전년도 보수총액" label-align="right">
                  <number-box-money width="200px" :disabled="false" v-model:valueInput="formState.totalSalaryLastYear"
                    :required="false" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="전년도 산정월수" label-align="right">
                  <number-box-money width="200px" :disabled="false" v-model:valueInput="formState.workMonthLastYear"
                    :required="false" />
                </a-form-item>
              </a-col>
            </a-row>

          </div>
          <a-row class="mt-15">
            <a-col :span="8" :offset="8" style="text-align: center;">
              <button-basic text="저장" type="default" mode="contained" :width="90" id="btn-save"
                @onClick=" onSubmit($event)" />
            </a-col>
          </a-row>
        </div>
      </standard-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import mutations from "@/graphql/mutations/PA/PA8/PA820/index";
import queries from "@/graphql/queries/PA/PA8/PA820/index";
import { companyId, makeDataClean } from "@/helpers/commonFunction";

// import INITIAL_DATA, {Company, DependentsType} from "./../utils";
import {
  DeleteOutlined,
  HistoryOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import {
  employeeFashionArr, productionStatusesCheckbox, nationaPersionSelectbox, healthInsuranceSelectbox,
  includeDependentsSelectbox,
} from "../utils/index";
import { useMutation, useQuery } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import DxSelectBox from "devextreme-vue/select-box";
import { DxColumn, DxDataGrid, DxScrolling } from "devextreme-vue/data-grid";
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import notification from "@/utils/notification";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import { getCurrentInstance } from "vue";
import { DxTextBox } from "devextreme-vue";
import useGetMajorInsuranceConsignStatus from "@/utils/usegetMajorInsuranceConsignStatus";
import dayjs from 'dayjs';
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxButton,
    DxScrolling,
    HistoryOutlined,
    DeleteOutlined,
    SearchOutlined,
    DxSelectBox,
    DxTextBox
  },
  setup(props, { emit }) {
    const globalYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const employeeArr = ref([]);
    const showData = reactive({
      name: '',
      name1: '',
      bizNumber: '',
      presidentName: '',
      adding: 'ADDING',
      leavedAt: null,
      residentId: '',
      joinedAt: '',
      acquisitionMonthPayment: false,
    })
    const formState: any = reactive({
      employeeType: 10,
      employeeId: null,
      nationalPensionReport: false,
      healthInsuranceReport: true,
      employeementInsuranceReport: true,
      industrialAccidentInsuranceReport: true,
      nationalPensionLossCode: 0,
      nationalPensionPaymentCurrentMonthLoss: '',
      employeementInsuranceLossCode: null,
      employeementInsuranceJobChangeReport: false,
      healthInsuranceLossCode: '1',
      employeementInsuranceLossDescription: '',
      totalSalaryThisYear: 100000,
      totalSalaryLastYear: 100000,
      workMonthThisYear: 1300,
      workMonthLastYear: 100000,
      retireDate: null
    })
    const formStateToCompare = ref({ ...formState });

    // -----------------FNC COMMON--------------------------

    const resetEmployeeWage = () => {
      showData.name1 = '';
      showData.joinedAt = '';
      showData.residentId = '';
      showData.leavedAt = null;
    }
    // getMajorInsuranceConsignStatus
    const { infoMajorInsuranceConsignStatus } = useGetMajorInsuranceConsignStatus(companyId);

    //-------------------------- get Company-----------------------

    const myCompanyParam = reactive({
      companyId: companyId,
    });
    const {
      result: myCompanyResult,
      loading: myCompanyLoading,
    } = useQuery(
      queries.getMyCompany,
      myCompanyParam,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    watch(myCompanyResult, (value) => {
      if (value) {
        let data = value.getMyCompany;
        showData.name = data.name;
        showData.bizNumber = data.bizNumber;
        showData.presidentName = data.presidentName;
        formStateToCompare.value = { ...formState };
      }
    });

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
        employeeArr.value = value.getEmployeeWages.filter((employee: any) => !!employee.leavedAt)
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
      employeeId: formState.employeeId,
    });
    const { result: getEmployeeWageResult, onError: getEmployeeWageOnError, loading: getEmployeeWageLoading } = useQuery(queries.getEmployeeWage, getEmployeeWageParam, () => ({
      enabled: getEmployeeWageTrigger.value,
    }));
    watch(getEmployeeWageResult, (value) => {
      if (value) {
        let data = value.getEmployeeWage;
        if (formState.employeeType == 10) {
          showData.name1 = data.name || '';
          showData.joinedAt = data?.joinedAt || '';
          showData.residentId = data.residentId || '';
          showData.leavedAt = data.leavedAt || null;
          formStateToCompare.value = { ...formState };
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
      employeeId: formState.employeeId,
    });
    const { result: getEmployeeWageDailyResult, loading: getEmployeeWageDailyLoading, onError: getEmployeeWageDailyOnError } = useQuery(queries.getEmployeeWageDaily, getEmployeeWageDailyParam, () => ({
      enabled: getEmployeeWageDailyTrigger.value,
    }));
    watch(
      getEmployeeWageDailyResult, (value) => {
        if (value) {
          let data = value.getEmployeeWageDaily;
          if (formState.employeeType == 20) {
            showData.name1 = data.name || '';
            showData.joinedAt = data.joinedAt || '';
            showData.residentId = data.residentId || '';
            showData.leavedAt = data.leavedAt || null;
            formStateToCompare.value = { ...formState };
          }
          getEmployeeWageDailyTrigger.value = false;
        }
      }, { deep: true });
    getEmployeeWageDailyOnError((res: any) => {
      notification('error', res.message);
      resetEmployeeWage();
    })

    //-----------------------UPDATE DATA WHEN EMPLOYEE CHANGE------------------------

    watch(() => formState.employeeId, (newVal: any) => {
      if (newVal) {
        if (formState.employeeType == 10) {
          getEmployeeWageParam.employeeId = newVal;
          getEmployeeWageTrigger.value = true;
          // return;
        }
        if (formState.employeeType == 20) {
          getEmployeeWageDailyParam.employeeId = newVal;
          getEmployeeWageDailyTrigger.value = true;
          // return;
        }
        formState.nationalPensionReport = false;
        formState.healthInsuranceReport = true;
        formState.employeementInsuranceReport = true;
        formState.industrialAccidentInsuranceReport = true;
        formState.healthInsuranceLossCode = '1';
        formState.employeementInsuranceLossCode = 0;
        formState.employeementInsuranceJobChangeReport = false;
        formState.employeementInsuranceLossDescription = '';
      }
    }, { deep: true })
    watch(() => formState.employeeType, (newVal: any) => {
      if (newVal == 10) {
        employeeArr.value = employeeWages.value.filter((employee: any) => !!employee.leavedAt)
      } else {
        employeeArr.value = employeeWageDailies.value.filter((employee: any) => !!employee.leavedAt)
      }
    }, { deep: true })

    //--------------------------------CHANGE DATA---------------------------------------

    watch(() => [showData.joinedAt, showData.leavedAt, formState.nationalPensionReport], ([newVal1, newVal2, newVal3]: any) => {
      const joinedAt: any = newVal1;
      const leavedAt: any = newVal2;
      if (!!joinedAt && !!leavedAt) {
        const joinedAtFomat = `${joinedAt.toString().slice(0, 4)}-${joinedAt.toString().slice(4, 6)}-${joinedAt.toString().slice(6)}`
        const leavedAtFomat = `${leavedAt.toString().slice(0, 4)}-${leavedAt.toString().slice(4, 6)}-${leavedAt.toString().slice(6)}`
        const firstDayInMonth = `${joinedAt.toString().slice(0, 4)}-${joinedAt.toString().slice(4, 6)}-01`
        const lastDayInMonth = `${joinedAt.toString().slice(0, 4)}-${joinedAt.toString().slice(4, 6)}-${dayjs(joinedAtFomat).daysInMonth()}`
        if (joinedAtFomat === firstDayInMonth && leavedAtFomat === lastDayInMonth && newVal3) {
          showData.acquisitionMonthPayment = true;
        } else {
          showData.acquisitionMonthPayment = false;
        }
      }
      if (!newVal3) {
        formState.nationalPensionLossCode = 0;
        showData.acquisitionMonthPayment = false;
      } else {
        formState.nationalPensionLossCode = 3;
      }
    }, {
      deep: true
    })

    watch(() => formState.employeementInsuranceLossCode, (newVal: any) => {
      if (newVal) {
        formState.employeementInsuranceLossDescription = getValue(newVal, includeDependentsSelectbox)
      }
    }, {
      deep: true,
      immediate: true
    })

    const getValue = (id: any, arr: any[]) => {
      let data = arr.find((item: any) => item.id == id);
      return !!data ? data.name : ''
    }

    //---------------------------------DISABLED FIELD--------------------------------

    const isDisabled1 = computed(() => !formState.employeementInsuranceReport && !formState.industrialAccidentInsuranceReport)
    const isDisabled2 = computed(() => {
      const arr = [23, 26, 31];
      let check = arr.includes(formState.employeementInsuranceLossCode);
      formState.employeementInsuranceJobChangeReport = check;
      formStateToCompare.value.employeementInsuranceJobChangeReport = check;
      return check;
    })

    // --------------------------------WATCH CHECK BOX--------------------------------

    watch(() => formState.nationalPensionReport, (newVal: Boolean) => {
      if (!newVal) {
        formState.nationalPensionLossCode = 0;
        showData.acquisitionMonthPayment = false;
      } else {
        formState.nationalPensionLossCode = 3;
      }
    }, { deep: true });
    watch(() => formState.healthInsuranceReport, (newVal: Boolean) => {
      if (!newVal) {
        formState.healthInsuranceLossCode = '';
      } else {
        formState.healthInsuranceLossCode = '1';
      }
    }, { deep: true });
    watchEffect(() => {
      if (!formState.employeementInsuranceReport && !formState.industrialAccidentInsuranceReport) {
        formState.employeementInsuranceLossCode = 0;
        formState.employeementInsuranceJobChangeReport = false;
        formState.employeementInsuranceLossDescription = '';
      }
    });

    //-----------------------------------FORM ACTION--------------------------------

    const messageCreate = messages.getCommonMessage('101').message;
    const {
      mutate: createCompanyEmployeeLossMutate,
      onDone: createCompanyEmployeeLossDone,
      onError: createCompanyEmployeeLossError }
      = useMutation(mutations.createMajorInsuranceCompanyEmployeeLoss);
    createCompanyEmployeeLossDone((res: any) => {
      notification('success', messageCreate);
      emit('closeModal', true);
    })
    createCompanyEmployeeLossError((res: any) => {
      notification('error', res.message);
    })
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        formState.retireDate = showData.leavedAt
        makeDataClean(formState, ['presidentResidentNumber']);
        createCompanyEmployeeLossMutate({ companyId: companyId, imputedYear: globalYear.value, input: formState });
      }
    }

    // ---------------------------------ON CANCEL MODAL--------------------------------

    const onCanCelModal = () => {
      if (JSON.stringify(formStateToCompare.value) == JSON.stringify(formState)) {
        emit('closeModal');
      } else {
        comfirmClosePopup(() => emit('closeModal'))
      }
    }
    return {
      globalYear, employeeWages, employeeWageDailies, employeeArr,
      employeeFashionArr, productionStatusesCheckbox, nationaPersionSelectbox, healthInsuranceSelectbox, includeDependentsSelectbox,
      formState, onSubmit, showData, formStateToCompare,
      isDisabled1, isDisabled2,
      onCanCelModal,
      getEmployeeWageLoading, getEmployeeWageDailyLoading, infoMajorInsuranceConsignStatus
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";

:deep .dx-dropdowneditor-field-template-wrapper {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 322px;
}

:deep .ant-tag {
  width: 29px;
  text-align: center;
}
</style>
