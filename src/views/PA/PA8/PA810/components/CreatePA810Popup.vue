<template>
  <a-modal class="form-modal" width="60%" :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }"
    :visible="isOpenModalCreate" title="취득신고 신규 등록" centered @cancel="closePopup" :footer="null" :mask-closable="false">
    <standard-form ref="formRef">
      <div class="form">
        <a-row >
          <a-col span="12">
            <a-form-item label="직원유행">
              <a-radio-group v-model:value="employeeWageType" class="d-flex items-center">
                <a-radio :value="EmployeeWageType.WAGE" @change="handleRadioChange"
                  v-model="stateSelectQuery.selectedRadioValue">
                  사원
                </a-radio>
                <a-radio :value="EmployeeWageType.WAGEDaily" @change="handleRadioChange"
                  v-model="stateSelectQuery.selectedRadioValue">
                  일용직사원
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="직원선택">
              <employ-select :arrayValue="employeeWages" :required="true" v-model:valueEmploy="employeeWageSelected"
                width="250px" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="[0, 10]" class="item-group">
          <a-col :span="col.item">
            <a-form-item label="업체명">
              <default-text-box v-model:valueInput="infoCompany.name" :disabled="true" placeholder="한글,영문(대문자) 입력 가능" width="250px"/>
            </a-form-item>
          </a-col>
          <a-col :span="col.space" />
          <a-col :span="col.item">
            <a-form-item label="대표자명">
              <default-text-box v-model:valueInput="infoCompany.presidentName" :disabled="true"
                placeholder="한글,영문(대문자) 입력 가능" width="250px"/>
            </a-form-item>
          </a-col>

          <a-col :span="col.item">
            <a-form-item label="사업자등록번호">
              <biz-number-text-box v-model:valueInput="infoCompany.bizNumber" :disabled="true"
                messRequired="이항목은 필수 입력사항입니다!" nameInput="companyBizNumber" width="250px"/>
            </a-form-item>
          </a-col>
          <a-col :span="col.space" />
          <a-col :span="col.item">
            <a-form-item label="사업장관리번호">
              <ManageIdTextBox :value="manageId" :disabled="true" placeholder="" width="250px"/>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- 6 -->
        <a-row :gutter="[0, 10]" class="item-group">
          <div class="grid grid-cols-2"></div>
          <a-col :span="col.item">
            <a-form-item label="성명">
              <default-text-box v-model:valueInput="employeeWage.name" :disabled="true" placeholder="한글,영문(대문자) 입력 가능" width="250px"/>
            </a-form-item>
          </a-col>
          <a-col :span="col.space" />
          <a-col :span="col.item">
            <a-form-item label="주민등록번호">
              <id-number-text-box :disabled="true" v-model:valueInput="employeeWage.residentId" width="250px"/>
            </a-form-item>
          </a-col>

          <a-col :span="col.item">
            <a-form-item label="자격취득일(입사일)" showTitle>
              <default-text-box :value-input="employeeWage.joinedAt ? filters.formatDate(employeeWage.joinedAt) : ``"
                :disabled="true" width="250px"/>
            </a-form-item>
          </a-col>
          <a-col :span="col.space" />
          <a-col :span="col.item">
            <a-form-item label="월급여">
              <text-number-box :value="filters.formatCurrency(employeeWage.totalPay || employeeWage.monthlyWage)"
                :disabled="true" placeholder="한글,영문(대문자) 입력 가능" width="250px"/>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="대표자여부">
              <switch-basic v-model:valueSwitch="employeeWage.president" textCheck="O" textUnCheck="X" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">외국인</span>
              <a-row :gutter="[7, 20]">
                <a-col :span="12">
                  <a-form-item label="국적코드">
                    <div class="d-flex items-center gap-4">
                      <text-number-box v-model:valueInput="formData.nationalityNumber" placeholder=""
                        :required="employeeWage.foreigner" :disabled="!employeeWage.foreigner" width="250px"/>
                      <SearchCodeButton :src="URL_CONST.URL_NATIONALITY_NUMBER" text-tooltip="" />
                    </div>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="체류자격">
                    <div class="d-flex items-center gap-4">
                      <default-text-box v-model:valueInput="formData.stayQualification" :required="employeeWage.foreigner"
                        placeholder="" :disabled="!employeeWage.foreigner" width="250px"/>
                      <SearchCodeButton :src="URL_CONST.URL_STAY_QUALIFICATION_CODE" text-tooltip="" />
                    </div>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="[0, 10]" class="item-group">
          <a-col span="24">
            <a-form-item label="4대보험 선택" label-align="right">
              <a-space align="center" :size="8">
                <span class="check-box-tab1">
                  <checkbox-basic label="국민연금" v-model:valueCheckbox="formData.nationalPensionReport"></checkbox-basic>
                </span>
                <span class="check-box-tab1">
                  <checkbox-basic label="건강보험" v-model:valueCheckbox="formData.healthInsuranceReport"></checkbox-basic>
                </span>
                <span class="check-box-tab1 mb-4 ml-15">
                  <checkbox-basic label="고용보험"
                    v-model:valueCheckbox="formData.employeementInsuranceReport"></checkbox-basic>
                </span>
                <span class="check-box-tab1 mb-4 ml-15">
                  <checkbox-basic label="산재보험" v-model:valueCheckbox="formData.industrialAccidentInsuranceReport
                    "></checkbox-basic>
                </span>
              </a-space>
            </a-form-item>
          </a-col>
          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">국민연금</span>
              <a-row gutter="7">
                <a-col :span="12">
                  <a-form-item label="취득부호">
                    <div class="d-flex items-center">
                      <text-number-box
                          v-model:valueInput="formData.nationalPensionAcquisitionCode" :required="true" placeholder=""
                          :disabled="isChooseNationalPensionReport" width="250px"/>
                      <SearchCodeButton :src="URL_CONST.URL_NATIONAL_PERSON_ACQUISITION_CODE" />
                    </div>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <div class="h-full d-flex justify-content-start items-center">
                    <checkbox-basic label="취득월 납부 희망여부" v-model:valueCheckbox="formData.acquisitionMonthPayment"
                      :disabled="isChooseNationalPensionReport" />
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col>

          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">건강보험</span>
              <a-row gutter="7">
                <a-col :span="12">
                  <a-form-item label="취득부호">
                    <div class="d-flex items-center">
                      <text-number-box :required="true" placeholder="00" v-model:valueInput="formData.healthInsuranceAcquisitionCode" :disabled="isChooseHealthInsuranceReport" width="250px" />
                      <SearchCodeButton :src="URL_CONST.URL_HEALTH_INSURANCE_ACQUISITION_CODE_CODE" />
                    </div>
                  </a-form-item>
                </a-col>
                <a-col span="6">
                  <div class="h-full d-flex items-center">
                    <checkbox-basic label="보험증발송여부 " value="false" :disabled="true" />
                  </div>
                </a-col>
                <a-col span="6">
                  <div class="h-full d-flex items-center">
                    <checkbox-basic label="피부양자신청" v-model:valueCheckbox="formData.includeDependents"
                      :disabled="isChooseHealthInsuranceReport" />
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col>

          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">고용산재</span>
              <a-row gutter="7">
                <a-col span="12">
                  <a-form-item label="직종부호">
                    <div class="flex justify-content-start">
                      <text-number-box placeholder="232" v-model:valueInput="formData.jobTypeCode"
                        :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance "
                        width="250px"
                        />
                      <SearchCodeButton :src="URL_CONST.URL_JOB_TYPE_CODE_CODE" text-tooltip="직종코드 조회" />
                    </div>
                  </a-form-item>
                </a-col>
                <a-col span="6">
                  <div class="h-full flex items-center justify-content-start">
                    <checkbox-basic label="계약직여부" v-model:valueCheckbox="formData.contractWorker" :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance " />
                  </div>
                </a-col>
                <a-col span="6">
                  <a-form-item label="계약종료일" class="small">
                    <date-time-box
                      default="2022-12-12" dateFormat="YYYY-MM-DD"
                      v-model:value-date="formData.contractExpiredDate"
                      :disabled="!formData.contractWorker || !isChooseEmployeementInsuranceAndIndustrialAccidentInsurance"
                      width="150px"
                    />
                  </a-form-item>
                  <!--                      <label class="lable-item">계약종료일:</label>-->
                </a-col>
              </a-row>
              <a-row gutter="7">
                <a-col span="6">
                  <a-form-item label="" label-align="right" style="padding-left: 10px">
                    <checkbox-basic label="일자리안정자금지원 신청"
                      v-model:valueCheckbox="formData.jobSecurityFundSupportApplication" :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance
                        " />
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="주소정근로시간">
                    <number-box :required="true" :spinButtons="true" v-model:valueInput="formData.weeklyWorkingHours"
                      :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance" />
                  </a-form-item>
                </a-col>
                <a-col span="8" class="relative">
                  <a-form-item label="보험료부과구분부호 및 사유" >
                    <div class="w-full d-flex flex-col gap-1 align-items-end">
                      <text-number-box :spinButtons="true" v-model:valueInput="formData.insuranceReductionCode"
                        :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance" placeholder="부호"
                        width="100px" />
                      <text-number-box :spinButtons="true" v-model:valueInput="formData.insuranceReductionReasonCode"
                        :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance" placeholder="사유코드"
                        width="100px" />
                    </div>
                    <div class="absolute" style="bottom: 0; right: 0; transform: translateX(100%)">
                      <SearchCodeButton :src="URL_CONST.URL_INSURANCE_REDUCTION_REASON_CODE" :widthModal="780" />
                    </div>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="fileuploader-container mt-20">
        <span>등본 등 증빙파일</span>
        <UploadFile @response-fileId="getFileId" :isFileList="isFileList" />
      </div>
      <div class="mt-20 table-container">
        <div class="d-flex-center">
          <div class="header">피부양자</div>
          <table>
            <thead>
              <tr>
                <th rowspan="2" style="min-width: 100px">성명</th>
                <th rowspan="2" style="min-width: 110px">주민등록증</th>
                <th colspan="2">장애인, 극가유공자 부호</th>
                <th colspan="3">외국인</th>
                <th colspan="2">관계</th>
              </tr>
              <tr>
                <th colspan="1" class="bg-gray" style="width: 100px">
                  <div class=" flex">
                    <span>종별부호</span>
                    <SearchCodeButton :src="URL_CONST.URL_DISABLED_CODE_DEPENDENT" />
                  </div>
                </th>
                <th colspan="1" class="bg-gray" style="min-width: 140px">등록일</th>
                <th colspan="1" class="bg-gray" style="min-width: 75px">
                  <div class="bg-gray flex">
                    <span>국적</span>
                    <SearchCodeButton :src="URL_CONST.URL_NATIONALITY_NUMBER_DEPENDENT" text-tooltip="" />
                  </div>
                </th>
                <th colspan="1" class="bg-gray" style="min-width: 100px">
                  <div class="bg-gray flex">
                    <span>체류자격</span>
                    <SearchCodeButton :src="URL_CONST.URL_STAY_QUALIFICATION_CODE_DEPENDENT" text-tooltip="" />
                  </div>
                </th>
                <th colspan="1" class="bg-gray" style="min-width: 235px">체류기간</th>
                <th colspan="1" class="bg-gray" style="min-width: 70px">관계 코드</th>
                <th colspan="1" class="bg-gray" style="min-width: 100px">내용</th>
              </tr>
            </thead>
            <tbody>
              <!-- use v-loop employeeWage dependents-->
              <template v-if="employeeWage?.dependents?.length > 0">
                <template v-for="(dependent, index) in employeeWage.dependents" :key="index">
                  <tr>

                    <!-- Add more dependent properties as needed -->

                    <td>{{ dependent.name }}</td>
                    <td>
                      {{ convertResidentId(dependent.residentId) }}
                    </td>
                    <td>
                      <a-tooltip placement="top" :title="dependent.disabledCode">
                        <!-- tool tip -->
                        <text-number-box width="100%" v-model:valueInput="dependent.disabledCode" placeholder="" />
                      </a-tooltip>
                    </td>
                    <td>
                      <date-time-box width="100%" dateFormat="YYYY-MM-DD" v-model="dependent.disabledRegisteredDate" />
                    </td>
                    <td>
                      <text-number-box width="100%" v-model:valueInput="dependent.nationalityNumber" placeholder="" />
                    </td>
                    <td>
                      <default-text-box width="100%" v-model:valueInput="dependent.stayQualification" textUppercase placeholder="" />
                    </td>

                    <td>
                      <range-date-time-box width="100%" v-model:valueDate="dependent.contractExpiredDate" :maxRange="365"
                        :teleport="true" />
                    </td>
                    <td>
                      <template v-if="dependent.relation >= 0">
                        <div class="px-2">{{ getCodeOrLabel(dependent.relation).number }}</div>
                      </template>
                    </td>
                    <td style="white-space: break-spaces;">
                      <template v-if="dependent.relation >= 0">
                        {{ getCodeOrLabel(dependent.relation).label }}
                      </template>
                    </td>
                  </tr>

                </template>
              </template>
              <template v-else>
                <tr class="">
                  <td colspan="9" style="height: 50px;color: #999; font-size: 17px;">내역이 없습니다</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="d-flex justify-center mt-20">
        <button-basic :width="90" id="btn-save" @onClick="onSubmit($event)" style="margin: auto" mode="contained"
          type="default" text="저장" />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts" setup>
import mutations from "@/graphql/mutations/PA/PA8/PA810/index";
import queries from "@/graphql/queries/PA/PA8/PA810/index";
import { companyId, convertResidentId } from "@/helpers/commonFunction";
import filters from "@/helpers/filters";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import notification from "@/utils/notification";
import {
  DeleteOutlined,
  HistoryOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { DependantsRelation, enum2Entries } from "@bankda/jangbuda-common";
import { useMutation, useQuery } from "@vue/apollo-composable";
import dayjs from "dayjs";
import DxButton from "devextreme-vue/button";
import { DxColumn, DxScrolling } from "devextreme-vue/data-grid";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import { cloneDeep, isEqual } from "lodash";
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch
} from "vue";
import { useStore } from "vuex";
import URL_CONST from "./../const";
import INITIAL_DATA from "./../utils";
import SearchCodeButton from "./SearchCodeButton.vue";
import { useCompanyInfo } from "@/utils/useCompanyInfo";

let dpRelation = enum2Entries(DependantsRelation);
const getCodeOrLabel = (id: number) => {
  return {
    number: id.toString(),
    label: dpRelation[id][0].split(".")[1],
  };
};

enum EmployeeWageType {
  WAGE = 10,
  WAGEDaily = 20,
}

const getQuery = (type: EmployeeWageType) => {
  switch (type) {
    case EmployeeWageType.WAGE:
      return queries.getEmployeeWages;
    case EmployeeWageType.WAGEDaily:
      return queries.getEmployeeWageDailies;
  }
};

const props = defineProps({
  isOpenModalCreate: {
    type: Boolean,
    default: false,
  },
  manageId: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['onCloseModalCreate', 'closeModal', 'handleCreate'])
const store = useStore();
const globalYear = computed(() => parseInt(sessionStorage.getItem("paYear") ?? '0'));
const { per_page, move_column, colomn_resize } = store.state.settings;
const employeeWageType = ref<EmployeeWageType>(EmployeeWageType.WAGE);
const employeeWage: any = ref(cloneDeep(INITIAL_DATA.initialEmployeeWage));
const employeeWages = ref();
const employeeWageSelected = ref();
const formRef = ref();
const isFileList = ref(false);
const formData = ref({ ...INITIAL_DATA.InitialFormCreate });

const stateSelectQuery = reactive({
  selectedRadioValue: EmployeeWageType.WAGE,
  query: queries.getEmployeeWages,
});

const isChooseNationalPensionReport = computed(
  () => !formData.value.nationalPensionReport
);
const isChooseHealthInsuranceReport = computed(
  () => !formData.value.healthInsuranceReport
);
const isChooseEmployeementInsuranceAndIndustrialAccidentInsurance =
  computed(
    () =>
      formData.value.employeementInsuranceReport ||
      formData.value.industrialAccidentInsuranceReport
  );
const isFormChange = computed(() => {
  return !isEqual(cloneDeep(INITIAL_DATA.InitialFormCreate), cloneDeep(formData.value))
    || Boolean(employeeWageSelected.value)
    || employeeWageType.value !== EmployeeWageType.WAGE;
});
const handleRadioChange = (event: Event) => {
  stateSelectQuery.selectedRadioValue = +(event.target as HTMLInputElement).value;
  query.value = getQuery(+(event.target as HTMLInputElement).value);
  employeeWageSelected.value = null;
  employeeWage.value = { ...INITIAL_DATA.initialEmployeeWage };
};
// Get DataSource getMajorInsuranceCompanyEmployeeAcquisitions
const dataSource = ref([]);

const { infoCompany } = useCompanyInfo(companyId)
// get and refetch data when employeeWageType change
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
      if (stateSelectQuery.selectedRadioValue === EmployeeWageType.WAGE) {
        employeeWages.value = value.getEmployeeWages;
      } else {
        employeeWages.value = value.getEmployeeWageDailies;
      }
    }
  },
  { deep: true }
);
//  get Employee Wage
watch(
  employeeWageSelected,
  (value) => {
    if (value) {
      let emp = employeeWages.value.find((item: any) => item.employeeId === value)
      if (emp && emp?.dependents) {
        emp = {
          ...emp,
          dependents: emp.dependents
            .map((i: any) => ({ ...i, contractExpiredDate: [filters.formatDateToInterger(dayjs()), filters.formatDateToInterger(dayjs())], disabledRegisteredDate: null }))
            .sort((a: any, b: any) => a.relation - b.relation)
        }
      }
      if (stateSelectQuery.selectedRadioValue === EmployeeWageType.WAGEDaily) {
        emp = {...emp, president: false}
      }
      employeeWage.value = cloneDeep(emp);
    }
  },
  { deep: true }
);
const resetForm = () => {
  formData.value = cloneDeep(INITIAL_DATA.InitialFormCreate)
  employeeWage.value = cloneDeep(INITIAL_DATA.initialEmployeeWage)
  employeeWageSelected.value = null;
  employeeWageType.value = EmployeeWageType.WAGE;
  stateSelectQuery.selectedRadioValue = EmployeeWageType.WAGE;

};
watch(() => props.isOpenModalCreate, (newVal) => {
  if (newVal) {
    stateSelectQuery.selectedRadioValue = EmployeeWageType.WAGE;
    isFileList.value = true;
  } else {
    isFileList.value = false;
    resetForm();
  }
}, { deep: true });
// Mutation
const {
  mutate,
  onDone: onDoneCreateMajor,
  loading: loadingCreateMajor,
  onError: errorCreateMajor,
} = useMutation(
  mutations.createMajorInsuranceCompanyEmployeeAcquisition,
  () => ({
    fetchPolicy: "no-cache",
  })
);
onDoneCreateMajor(() => {
  notification("success", "저장되었습니다.");
  resetForm();
  emit("handleCreate");
});
errorCreateMajor((error) => {
  console.log("error", error);
  notification("error", error.message);
});
/// Submit form
const onSubmit = async (e: any) => {
  const res = e.validationGroup.validate();
  // !res.isValid
  if (!res.isValid) {
    res.brokenRules[0].validator.focus();
  } else {
    const {
      adding,
      joinedAt,
      name,
      president,
      presidentName,
      residentId,
      totalPay,
      bizNumber,
      ...newFormData
    } = formData.value;
    const newDataFix: any = newFormData
    // if data.nationalityNumber is null => delete data.nationalityNumber
    if (!newDataFix?.nationalityNumber) {
      delete newDataFix?.nationalityNumber
    }
    if (!newDataFix?.stayQualification) delete newDataFix?.stayQualification
    const dependents = employeeWage.value?.dependents
      ? employeeWage.value.dependents.map((item: any) => {
        const result: any = {
          name: item.name,
          residentId: item.residentId,
          relationCode: getCodeOrLabel(item.relation).number,
        }
        if (item?.nationalityNumber) result.nationalityNumber = item.nationalityNumber
        if (item?.stayQualification) result.stayQualification = item.stayQualification
        if (item?.disabledCode) result.disabledCode = item.disabledCode
        if (item?.contractExpiredDate) {
          result.stayPeriodFrom = item.contractExpiredDate[0]
          result.stayPeriodTo = item.contractExpiredDate[1]
        }
        if (item.disabledRegisteredDate) result.disabledRegisteredDate = filters.formatDateToInterger(item.disabledRegisteredDate)
        return result

      })
      : [];
    const input = {
      ...newDataFix,
      employeeId: Number(employeeWageSelected.value),
      employeeType: stateSelectQuery.selectedRadioValue,
      dependents,
    };
    if (dependents.length === 0) delete input.dependents
    input.insuranceReductionCode &&= Number(
      formData.value.insuranceReductionCode
    );
    input.insuranceReductionReasonCode &&= Number(
      formData.value.insuranceReductionReasonCode
    );
    if (!input.contractWorker) delete input.contractExpiredDate
    input.contractExpiredDate &&= newFormData.contractExpiredDate;
    mutate({
      ...variables,
      input: input,
    });
  }
};
const closePopup = () => {
  if (isFormChange.value) {
    comfirmClosePopup(() => {
      emit('closeModal')
    })
  } else {
    emit('closeModal')
  }
}
const getFileId = (fileId: { id: Number }) => {
  formData.value.dependentsEvidenceFileStorageId = fileId.id;
};
const col = {
  item: 9,
  space: 3,
}

</script>
<style lang="scss" scoped>
@import './../styles/index.scss';

:deep(.label-custom) {
  .dx-field-label {
    width: 250px !important;
  }

  .dx-field-value {
    width: calc(100% - 150px) !important;
  }
}

.table-container {

  .d-flex-center {
    //min-width: fit-content;
    width: 100%;
    min-width: 1000px;
    background-color: #5b80b9;

    .header {
      min-width: 70px;
      text-align: center;
    }

    table {
      width: calc(100% - 70px);
      border-collapse: collapse;
      border-bottom: none;
      border-left: none;
      border-right: none;
      border-top: none;
      table-layout: auto;

      th,
      tr,
      td {
        text-align: center !important;
      }

      th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        color: white;
      }

      td,
      th {
        border: 0.5px solid #ddd;
        height: 100%;
        white-space: normal;
      }

      tbody {
        background-color: rgb(233, 236, 243);

      }
    }
  }
}

.bg-gray {
  background-color: rgb(233, 236, 243);
  color: rgba(61, 59, 59, 0.85) !important;
}

.bg-blue {
  background-color: #5b80b9;
}

.fileuploader-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #939393;
  border-radius: 10px;

}
</style>
