<template>
  <a-modal class="form-modal" width="60%" :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }"
    :visible="isOpenModalCreate" title="취득신고 신규 등록" centered @cancel="$emit('closeModal')" :footer="null">
    <a-spin :spinning="false">
      <!-- {{ formState }} formState <br /> -->
      <standard-form ref="formPa820Ref">
        <div class="form-container">
          <div class="form-first pl-15">
            <a-row>
              <a-col :span="10">
                <a-form-item label="내/외국인" label-align="right">
                  <radio-group :arrayValue="employeeFashionArr" v-model:valueRadioCheck="formState.employeeType"
                    layoutCustom="horizontal" class="mt-1"></radio-group>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="사원" class="label-required">
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
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.name" :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="대표자명" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.presidentName"
                    :required="true" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="mt-10">
              <a-col :span="10">
                <a-form-item label="사업자등록번호" label-align="right" class="red">
                  <biz-number-text-box v-model:valueInput="formState.bizNumber" width="200px" :disabled="true"
                    messRequired="이항목은 필수 입력사항입니다!" nameInput="companyBizNumber" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="사업장관리번호" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.adding"
                    :required="true" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div class="form-group">
            <a-row>
              <a-col :span="10">
                <a-form-item label="성명" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.name" :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="주민등록번호" label-align="right" class="red">
                  <id-number-text-box :disabled="true" width="200px" v-model:valueInput="formState.residentId" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="mt-10">
              <a-col :span="10">
                <a-form-item label="취득일(입사일)" label-align="right" class="red">
                  <default-text-box :disabled="true" width="200px" v-model:valueInput="formState.totalPay"
                    :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="상실년월일(퇴사일)" label-align="right" class="red">
                  <month-picker-box-custom text="지" v-model:valueDate="formState.joinedAt"
                    bgColor="white"></month-picker-box-custom>
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
                    <select-box-common :arrSelect="nationaPersionSelectbox" :required="true"
                      v-model:valueInput="formState.nationalPensionAcquisitionCode"
                      :disabled="!formState.nationalPensionReport" />
                  </div>
                  <span class="ml-50">
                    <checkbox-basic size="14" label="산재보험" v-model:valueCheckbox="formState.acquisitionMonthPayment"
                      :disabled="!formState.acquisitionMonthPayment" />
                  </span>
                  <span class="ml-10 notice">
                    <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 최초 저장된 이후 수정 불가.
                  </span>
                </div>
              </a-form-item>
            </a-row>
            <a-row class="mt-10">
              <a-form-item label="건강보험" label-align="left" class="mb-0">
                <div class="input-text">
                  <div class="select-group">
                    <span>상실부호</span>
                    <select-box-common :arrSelect="healthInsuranceSelectbox" :required="true"
                      v-model:valueInput="formState.healthInsuranceAcquisitionCode"
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
                    <select-box-common :arrSelect="includeDependentsSelectbox" :required="true"
                      v-model:valueInput="formState.healthInsuranceAcquisitionCode2"
                      :disabled="!formState.healthInsuranceReport" />
                  </div>
                  <span class="ml-50">
                    <checkbox-basic size="14" label="이직확인서 발급희망" v-model:valueCheckbox="formState.includeDependents"
                      :disabled="!formState.healthInsuranceReport || !isDisabled2" />
                  </span>
                </div>
              </a-form-item>
            </a-row>
            <a-row class="mt-10">
              <div class="input-text jobtype-margin">
                <div class="text-detail">상실사유 (10자이내 간략히)</div>
                <text-number-box :disabled="isDisabled1" width="200px" v-model:valueInput="formState.jobTypeCode" />
              </div>
            </a-row>
          </div>
          <div class="form-group">
            <a-row>
              <a-col :span="10">
                <a-form-item label="당해년도 보수총액" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="isDisabled1" v-model:valueInput="formState.jobTypeCode"
                    :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="당해년도 산정월수" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="isDisabled1" v-model:valueInput="formState.jobTypeCode"
                    :required="true" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="10">
                <a-form-item label="전년도 보수총액" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="isDisabled1" v-model:valueInput="formState.jobTypeCode"
                    :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="전년도 산정월수" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.contractWorker"
                    :required="true" />
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
import mutations from "@/graphql/mutations/PA/PA8/PA810/index";
import queries from "@/graphql/queries/PA/PA8/PA810/index";
import getCompany from "@/graphql/queries/common/getCompany";
import { companyId } from "@/helpers/commonFunction";
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
import { DxColumn, DxDataGrid, DxScrolling } from "devextreme-vue/data-grid";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useStore } from "vuex";
import notification from "@/utils/notification";
import filters from "@/helpers/filters";
import { clone, cloneDeep } from "lodash";
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxButton,
    DxScrolling,
    HistoryOutlined,
    DeleteOutlined,
    SearchOutlined,
    DxFileUploader,
  },
  props: {
    isOpenModalCreate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const formState = reactive({
      employeeType: 0,
      employeeId: 1,
      name: 'ss',
      bizNumber: 'ss',
      presidentName: 'ss',
      adding: 'ADDING',
      totalPay: 'ss',
      residentId: '',
      joinedAt: dayjs().format('YYYY-MM'),
      nationalPensionReport: false,
      healthInsuranceReport: true,
      employeementInsuranceReport: true,
      industrialAccidentInsuranceReport: true,
      nationalPensionAcquisitionCode: 1,
      acquisitionMonthPayment: false,
      healthInsuranceAcquisitionCode: 1,
      healthInsuranceAcquisitionCode2: 1,
      includeDependents: true,
      acquisitionMonthPayment2: false,
      jobTypeCode: 1,
      contractWorker: 'contractWorker',
    })

    // ----------------get and refetch data when employeeWageType change---------

    const employeeWages = ref([]);
    const variables = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const query = ref(queries.getEmployeeWages);
    const { result: dataEmployeeWages, refetch: refetchDataEmployeeWages } =
      useQuery(query, variables, () => ({
        fetchPolicy: "no-cache",
      }));
    watch(
      dataEmployeeWages,
      (value) => {
        if (value) {
          // if (stateSelectQuery.selectedRadioValue === EmployeeWageType.WAGE) {
          employeeWages.value = value.getEmployeeWages;
          // } else {
          //   employeeWages.value = value.getEmployeeWageDailies;
          // }
        }
      },
      { deep: true }
    );

    //---------------------------------DISABLED FIELD--------------------------------

    const isDisabled1 = computed(() => !formState.employeementInsuranceReport && !formState.industrialAccidentInsuranceReport)
    const isDisabled2 = computed(() => {
      // if(formState.healthInsuranceAcquisitionCode2 == 23 || )
      let check = [23, 26, 32].some((item: any) => formState.healthInsuranceAcquisitionCode2 == item);
      formState.includeDependents = check;
      return check;
    })

    //-----------------------------------FORM ACTION--------------------------------

    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        store.state.common.isNewRowPA120 = true;
        store.commit('common/actionFormErrorPA120');
      } else { }
    }
    return {
      globalYear, employeeWages,
      employeeFashionArr, productionStatusesCheckbox, nationaPersionSelectbox, healthInsuranceSelectbox, includeDependentsSelectbox,
      formState, onSubmit,
      isDisabled1, isDisabled2,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
</style>
