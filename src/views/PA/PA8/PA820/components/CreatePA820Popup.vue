<template>
  <a-modal class="form-modal" width="60%" :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }"
    :visible="modalCreate" title="상실신고 신규 등록" centered @cancel="onCanCelModal" :footer="null">
    <a-spin :spinning="getEmployeeWageDailyLoading || getEmployeeWageLoading">
      <!-- {{ formState }} formState <br />
      {{ formStateToCompare }} formStateToCompare <br /> -->
      <!-- {{ formState.employeeType }} formState.employeeType <br /> -->
      <!-- {{ employeeWageDaily }} employeeWageDaily <br /> -->
      <standard-form ref="formPa820Ref">
        <div class="form-container">
          <div class="form-first pl-15">
            <a-row>
              <a-col :span="10">
                <a-form-item label="직원유행" label-align="right">
                  <radio-group :arrayValue="employeeFashionArr" v-model:valueRadioCheck="formState.employeeType"
                    layoutCustom="horizontal" class="mt-1"></radio-group>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="직원선택" class="label-required">
                  <div class="d-flex-center">
                    <employ-select :arrayValue="employeeWages" :required="true" v-model:valueEmploy="formState.employeeId"
                      width="300px" />
                    <!-- <div class="ml-5 d-flex-center">
                      <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                      <span class="custom-waring">
                        대상: 사원과 일용직사 원 중 퇴직금 대상자.
                      </span>
                    </div> -->
                  </div>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div class="form-group">
            <a-row>
              <a-col :span="10">
                <a-form-item label="업체명" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="showData.name" :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="대표자명" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="showData.presidentName"
                    :required="true" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="mt-10">
              <a-col :span="10">
                <a-form-item label="사업자등록번호" label-align="right" class="red">
                  <biz-number-text-box v-model:valueInput="showData.bizNumber" width="200px" :disabled="true"
                    messRequired="이항목은 필수 입력사항입니다!" nameInput="companyBizNumber" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="사업장관리번호" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="showData.adding"
                    :required="true" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div class="form-group">
            <a-row>
              <a-col :span="10">
                <a-form-item label="성명" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="showData.name1"
                    :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="주민등록번호" label-align="right" class="red">
                  <id-number-text-box :disabled="true" width="200px" v-model:valueInput="showData.residentId" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="mt-10">
              <a-col :span="10">
                <a-form-item label="취득일(입사일)" label-align="right" class="red">
                  <date-time-box text="지" v-model:valueDate="showData.joinedAt" bgColor="white" :clearable="false"
                    width="200px" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="상실년월일(퇴사일)" label-align="right" class="red">
                  <date-time-box text="지" v-model:valueDate="showData.leavedAt" bgColor="white" :clearable="false"
                    width="200px" :disabled="true" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div class="form-group">
            <a-form-item label="4대보험 선택" label-align="left" class="mb-0">
              <div class="check-box-group">
                <checkbox-basic size="14" label="국민연금" class="mr-10 mx-10"
                  v-model:valueCheckbox="formState.nationalPensionReport" />
                <checkbox-basic size="14" label="건강보험" class="mr-10"
                  v-model:valueCheckbox="formState.healthInsuranceReport" />
                <checkbox-basic size="14" label="고용보험" v-model:valueCheckbox="formState.employeementInsuranceReport" />
                <checkbox-basic size="14" label="산재보험"
                  v-model:valueCheckbox="formState.industrialAccidentInsuranceReport" />
              </div>
            </a-form-item>
            <a-row class="mt-10">
              <a-form-item label="국민연금" label-align="left" class="mb-0">
                <div class="input-text">
                  <div class="select-group">
                    <span>상실부호</span>
                    <select-box-common width="348px" :arrSelect="nationaPersionSelectbox" :required="true"
                      v-model:valueInput="formState.nationalPensionLossCode"
                      :disabled="!formState.nationalPensionReport" />
                  </div>
                  <span class="ml-50">
                    <checkbox-basic size="14" label="취득월 국민연금 납부"
                      v-model:valueCheckbox="showData.acquisitionMonthPayment"
                      :disabled="!showData.acquisitionMonthPayment" />
                  </span>
                  <span class="ml-10 notice">
                    <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 1월취득은 만근퇴사의 경우 의무납부.
                  </span>
                </div>
              </a-form-item>
            </a-row>
            <a-row class="mt-10">
              <a-form-item label="건강보험" label-align="left" class="mb-0">
                <div class="input-text">
                  <div class="select-group">
                    <span>상실부호</span>
                    <select-box-common width="348px" :arrSelect="healthInsuranceSelectbox" :required="true"
                      v-model:valueInput="formState.healthInsuranceLossCode"
                      :disabled="!formState.nationalPensionReport" />
                  </div>
                </div>
              </a-form-item>
            </a-row>
            <a-row class="mt-10">
              <a-form-item label="고용산재" label-align="left" class="mb-0">
                <div class="input-text">
                  <div class="select-group">
                    <span>상실부호</span>
                    <!-- <DxSelectBox :dataSource="includeDependentsSelectbox" valueExpr="value" displayExpr="label"
                      :showDropDownButton="true" :searchEnabled="true" :searchExpr="['label']" :searchMode="'contains'"
                      :value="formState.healthInsuranceAcquisitionCode2" :disabled="!formState.healthInsuranceReport"
                      width="200px" :required="true">
                      <template #item="data">
                        <a-tooltip placement="top" zIndex="999999" color="black">
                          <template #title>
                            {{ data.data.label }}
                          </template>
                          <div class="text-overflow">{{ data.data.label }}</div>
                        </a-tooltip>
                      </template>
                    </DxSelectBox> -->
                    <select-box-common width="348px" :arrSelect="includeDependentsSelectbox" :required="true"
                      v-model:valueInput="showData.healthInsuranceAcquisitionCode2"
                      :disabled="!formState.healthInsuranceReport" />
                  </div>
                  <span class="ml-50">
                    <checkbox-basic size="14" label="이직확인서 발급희망"
                      v-model:valueCheckbox="formState.employeementInsuranceJobChangeReport"
                      :disabled="!formState.healthInsuranceReport || !isDisabled2" />
                  </span>
                </div>
              </a-form-item>
            </a-row>
            <a-row class="mt-10">
              <div class="input-text jobtype-margin">
                <div class="text-detail">상실사유 (10자이내 간략히)</div>
                <text-number-box :disabled="isDisabled1" width="200px"
                  v-model:valueInput="formState.employeementInsuranceLossDescription" />
              </div>
            </a-row>
          </div>
          <div class="form-group">
            <a-row>
              <a-col :span="10">
                <a-form-item label="당해년도 보수총액" label-align="right" class="red">
                  <number-box-money width="200px" :disabled="isDisabled1"
                    v-model:valueInput="formState.totalSalaryThisYear" :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="당해년도 산정월수" label-align="right" class="red">
                  <number-box-money width="200px" :disabled="isDisabled1" v-model:valueInput="formState.workMonthThisYear"
                    :required="true" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="10">
                <a-form-item label="전년도 보수총액" label-align="right" class="red">
                  <number-box-money width="200px" :disabled="isDisabled1"
                    v-model:valueInput="formState.totalSalaryLastYear" :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="전년도 산정월수" label-align="right" class="red">
                  <number-box-money width="200px" v-model:valueInput="formState.workMonthLastYear" :required="true" />
                </a-form-item>
              </a-col>
            </a-row>

          </div>
          <a-row class="mt-15">
            <a-col :span="8" :offset="8" style="text-align: center;">
              <button-basic text="저장" type="default" mode="contained" :width="90" id="btn-save"
                @onClick="onSubmit($event)" />
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
import getCompany from "@/graphql/queries/common/getCompany";
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
import { DependantsRelation, enum2Entries } from "@bankda/jangbuda-common";
import { useMutation, useQuery } from "@vue/apollo-composable";
import dayjs from "dayjs";
import DxButton from "devextreme-vue/button";
import DxSelectBox from "devextreme-vue/select-box";
import { DxColumn, DxDataGrid, DxScrolling } from "devextreme-vue/data-grid";
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";
import notification from "@/utils/notification";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import { getCurrentInstance } from "vue";
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
  },
  props: {
    modalCreate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const formState = reactive({
      employeeType: 10,
      employeeId: 0,
      nationalPensionReport: false,
      healthInsuranceReport: true,
      employeementInsuranceReport: true,
      industrialAccidentInsuranceReport: true,
      nationalPensionLossCode: 3,
      nationalPensionPaymentCurrentMonthLoss: '',
      employeementInsuranceLossCode: '',
      employeementInsuranceJobChangeReport: true,
      healthInsuranceLossCode: '1',
      employeementInsuranceLossDescription: '100000',
      totalSalaryThisYear: 100000,
      totalSalaryLastYear: 100000,
      workMonthThisYear: 1300,
      workMonthLastYear: 100000,
    })
    const showData = reactive({
      name: '',
      name1: '',
      bizNumber: '',
      presidentName: '',
      adding: 'ADDING',
      leavedAt: '',
      residentId: '',
      joinedAt: '',
      acquisitionMonthPayment: false,
      healthInsuranceAcquisitionCode2: 1,
    })
    const formStateToCompare = ref({ ...formState });

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
      }
    }, { deep: true });


    // -----------------FNC COMMON--------------------------

    const resetEmployeeWage = () => {
      showData.name1 = '';
      showData.joinedAt = '';
      showData.residentId = '';
      showData.leavedAt = '';
    }
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
          showData.leavedAt = data.leavedAt || '';
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
            showData.leavedAt = data.leavedAt || '';
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

    watch(() => [formState.employeeId, formState.employeeType], ([newVal, newVal2]: any) => {
      if (newVal) {
        if (newVal2 == 10) {
          getEmployeeWageParam.employeeId = newVal;
          getEmployeeWageTrigger.value = true;
          // return;
        }
        if (newVal2 == 20) {
          getEmployeeWageDailyParam.employeeId = newVal;
          getEmployeeWageDailyTrigger.value = true;
          // return;
        }
      }
    }, { deep: true })

    //---------------------------------DISABLED FIELD--------------------------------

    const isDisabled1 = computed(() => !formState.employeementInsuranceReport && !formState.industrialAccidentInsuranceReport)
    const isDisabled2 = computed(() => {
      // if(formState.healthInsuranceAcquisitionCode2 == 23 || )
      let check = [23, 26, 32].some((item: any) => showData.healthInsuranceAcquisitionCode2 == item);
      formState.employeementInsuranceJobChangeReport = check;
      formStateToCompare.value.employeementInsuranceJobChangeReport = check;
      return check;
    })

    //-----------------------------------FORM ACTION--------------------------------

    const messageCreate = messages.getCommonMessage('101').message;
    const {
      mutate: createCompanyEmployeeLossMutate,
      onDone: createCompanyEmployeeLossDone,
      onError: createCompanyEmployeeLossError }
      = useMutation(mutations.createMajorInsuranceCompanyEmployeeLoss);
    createCompanyEmployeeLossDone((res: any) => {
      notification('success', messageCreate);
      emit('onCreateModal', true);
    })
    createCompanyEmployeeLossError((res: any) => {
      notification('error', res.message);
    })
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        makeDataClean(formState, ['presidentResidentNumber']);
        createCompanyEmployeeLossMutate({ companyId: companyId, imputedYear: globalYear.value, input: formState });
      }
    }
    function onOptionRendered(e: any) {
      e.element.dxTooltip({
        target: `.${e.component._$element.attr('class')}`,
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        contentTemplate: function () {
          return e.component.option('valueExpr') === 'value' ? e.text : e.component.option('displayExpr');
        },
      })
    };

    // ---------------------------------ON CANCEL MODAL--------------------------------

    const onCanCelModal = () => {
      if (JSON.stringify(formStateToCompare.value) == JSON.stringify(formState)) {
        emit('closeModal');
      } else {
        comfirmClosePopup(() => emit('closeModal'))
      }
    }
    return {
      globalYear, employeeWages,
      employeeFashionArr, productionStatusesCheckbox, nationaPersionSelectbox, healthInsuranceSelectbox, includeDependentsSelectbox,
      formState, onSubmit,showData,formStateToCompare,
      isDisabled1, isDisabled2, onOptionRendered,
      onCanCelModal,
      getEmployeeWageLoading, getEmployeeWageDailyLoading,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
</style>
