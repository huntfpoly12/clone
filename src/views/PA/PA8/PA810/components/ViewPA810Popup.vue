<template>
  <a-modal
    class="form-modal"
    width="60%"
    :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }"
    :visible="isViewDetail"
    title="상세 전환 보고서"
    centered
    @cancel="closePopup"
    :footer="null"
    v-if="isViewDetail"
  >
    <standard-form style="pointer-events: none">
      <div class="form">
        <a-row>
          <a-col span="12">
            <DxField label="직원유행">
              <a-radio-group
                v-model:value="employeeWageType"
                class="d-flex items-center"
              >
                <a-radio
                  :value="EmployeeWageType.WAGE"
                >
                  사원
                </a-radio>
                <a-radio
                  :value="EmployeeWageType.WAGEDaily"
                >
                  일용직사원
                </a-radio>
              </a-radio-group>
            </DxField>
          </a-col>
          <a-col :span="col.item">
            <DxField label="직원선택">
              <employ-select
                :arrayValue="employeeWages"
                v-model:valueEmploy="employeeWageSelected"
                width=""
              />
            </DxField>
          </a-col>
        </a-row>
        <a-row :gutter="[0, 10]" class="item-group">
          <a-col :span="col.item">
            <DxField label="업체명">
              <default-text-box
                v-model:valueInput="infoCompany.name"
                :disabled="true"
                placeholder="한글,영문(대문자) 입력 가능"
              />
            </DxField>
          </a-col>
          <a-col :span="col.space"/>
          <a-col :span="col.item">
            <DxField label="대표자명">
              <default-text-box
                v-model:valueInput="infoCompany.presidentName"
                :disabled="true"
                placeholder="한글,영문(대문자) 입력 가능"
              />
            </DxField>
          </a-col>

          <a-col :span="col.item">
            <DxField label="사업자등록번호">
              <biz-number-text-box
                v-model:valueInput="infoCompany.bizNumber"
                :disabled="true"
                messRequired="이항목은 필수 입력사항입니다!"
                nameInput="companyBizNumber"
              />
            </DxField>
          </a-col>
          <a-col :span="col.space"/>
          <a-col :span="col.item">
            <DxField label="사업장관리번호">
              <default-text-box
                v-model:valueInput="infoCompany.adding"
                :disabled="true"
                placeholder="한글,영문(대문자) 입력 가능"
              />
            </DxField>
          </a-col>
        </a-row>
        <!-- 6 -->
        <a-row :gutter="[0, 10]" class="item-group">
          <div class="grid grid-cols-2"></div>
          <a-col :span="col.item">
            <DxField label="성명">
              <default-text-box
                v-model:valueInput="employeeWage.name"
                :disabled="true"
                placeholder="한글,영문(대문자) 입력 가능"
              />
            </DxField>
          </a-col>
          <a-col :span="col.space"/>
          <a-col :span="col.item">
            <DxField label="주민등록번호">
              <id-number-text-box
                :disabled="true"
                v-model:valueInput="employeeWage.residentId"
              />
            </DxField>
          </a-col>

          <a-col :span="col.item">
            <DxField label="자격취득일(입사일)" showTitle>
              <default-text-box
                :value-input="employeeWage.joinedAt ? filters.formatDate(employeeWage.joinedAt) : ``"
                :disabled="true"
              />
            </DxField>
          </a-col>
          <a-col :span="col.space"/>
          <a-col :span="col.item">
            <DxField label="월급여">
              <text-number-box
                :value="filters.formatCurrency(employeeWage.totalPay)"
                :disabled="true"
                placeholder="한글,영문(대문자) 입력 가능"
              />
            </DxField>
          </a-col>
          <a-col span="12">
            <DxField label="대표자여부">
              <switch-basic
                v-model:valueSwitch="employeeWage.president"
                textCheck="O"
                textUnCheck="X"
                :disabled="true"
              />
            </DxField>
          </a-col>
          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">외국인</span>
              <a-row :gutter="[7, 20]">
                <wa-col :span="col.item">
                  <DxField label="국적코드">
                    <div class="d-flex items-center gap-4">
                      <text-number-box
                        v-model:valueInput="dataDetail.nationalityNumber"
                        placeholder=""
                        :disabled="!employeeWage.foreigner"
                      />
                      <SearchCodeButton
                        :src="URL_CONST.URL_NATIONALITY_NUMBER"
                        text-tooltip=""
                      />
                    </div>
                  </DxField>
                </wa-col>
                <a-col :span="col.space"/>
                <a-col :span="col.item">
                  <DxField label="체류자격">
                    <div class="d-flex items-center gap-4">
                      <default-text-box
                        v-model:valueInput="dataDetail.stayQualification"
                        placeholder=""
                        :disabled="!employeeWage.foreigner"
                      />
                      <SearchCodeButton
                        :src="URL_CONST.URL_STAY_QUALIFICATION_CODE"
                        text-tooltip=""
                      />
                    </div>
                  </DxField>
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
                  <checkbox-basic
                    label="국민연금"
                    v-model:valueCheckbox="dataDetail.nationalPensionReport"
                  ></checkbox-basic>
                </span>
                <span class="check-box-tab1">
                  <checkbox-basic
                    label="건강보험"
                    v-model:valueCheckbox="dataDetail.healthInsuranceReport"
                  ></checkbox-basic>
                </span>
                <span class="check-box-tab1 mb-4 ml-15">
                  <checkbox-basic
                    label="고용보험"
                    v-model:valueCheckbox="dataDetail.employeementInsuranceReport"
                  ></checkbox-basic>
                </span>
                <span class="check-box-tab1 mb-4 ml-15">
                  <checkbox-basic
                    label="산재보험"
                    v-model:valueCheckbox="
                      dataDetail.industrialAccidentInsuranceReport
                    "
                  ></checkbox-basic>
                </span>
              </a-space>
            </a-form-item>
          </a-col>
          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">국민연금</span>
              <a-row gutter="7">
                <a-col :span="col.item">
                  <DxField label="취득부호">
                    <div class="flex items-center">
                      <text-number-box
                        v-model:valueInput="
                          dataDetail.nationalPensionAcquisitionCode
                        "

                        placeholder=""
                        :disabled="isChooseNationalPensionReport"
                      />
                      <SearchCodeButton
                        :src="URL_CONST.URL_NATIONAL_PERSON_ACQUISITION_CODE"
                      />
                    </div>
                  </DxField>
                </a-col>
                <a-col :span="col.space"/>
                <a-col :span="col.item">
                  <div class="h-full d-flex justify-content-start items-center">
                    <checkbox-basic
                      label="취득월 납부 희망여부"
                      v-model:valueCheckbox="dataDetail.acquisitionMonthPayment"
                      :disabled="isChooseNationalPensionReport"
                    />
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col>

          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">건강보험</span>
              <a-row gutter="7">
                <a-col :span="col.item">
                  <DxField label="취득부호">
                    <div class="d-flex items-center">
                      <text-number-box

                        placeholder="00"
                        v-model:valueInput="
                          dataDetail.healthInsuranceAcquisitionCode
                        "
                        :disabled="isChooseHealthInsuranceReport"
                      />
                      <SearchCodeButton
                        :src="
                          URL_CONST.URL_HEALTH_INSURANCE_ACQUISITION_CODE_CODE
                        "
                      />
                    </div>
                  </DxField>
                </a-col>
                <a-col :span="col.space"/>

                <a-col span="6">
                  <div class="h-full d-flex items-center">
                    <checkbox-basic
                      label="보험증발송여부 "
                      value="false"
                      :disabled="true"
                    />
                  </div>
                </a-col>
                <a-col span="6">
                  <div class="h-full d-flex items-center">
                    <checkbox-basic
                      label="피부양자신청"
                      v-model:valueCheckbox="dataDetail.includeDependents"
                      :disabled="isChooseHealthInsuranceReport"
                    />
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col>

          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">고용산재</span>
              <a-row gutter="7">
                <a-col span="7">
                  <DxField label="직종부호">
                    <div class="flex items-start">
                      <text-number-box
                        placeholder="232"
                        v-model:valueInput="dataDetail.jobTypeCode"
                        :disabled="
                          !isChooseEmployeementInsuranceAndIndustrialAccidentInsurance
                        "
                      />
                      <SearchCodeButton
                        :src="URL_CONST.URL_JOB_TYPE_CODE_CODE"
                        text-tooltip="직종코드 조회"
                      />
                    </div>
                  </DxField>
                </a-col>
                <a-col span="7">
                  <div
                    class="h-full flex items-center justify-content-start px-10"
                  >
                    <checkbox-basic
                      label="계약직여부"
                      v-model:valueCheckbox="dataDetail.contractWorker"
                      :disabled="
                        !isChooseEmployeementInsuranceAndIndustrialAccidentInsurance
                      "
                    />
                  </div>
                </a-col>
                <a-col span="7">
                  <DxField label="계약종료일">
                    <div class="h-full flex items-center">
                      <date-time-box
                        default="2022-12-12"
                        dateFormat="YYYY-MM-DD"
                        v-model="dataDetail.contractExpiredDate"
                        :disabled="
                          !dataDetail.contractWorker ||
                          !isChooseEmployeementInsuranceAndIndustrialAccidentInsurance
                        "
                      />
                    </div>
                  </DxField>
                  <!--                      <label class="lable-item">계약종료일:</label>-->
                </a-col>
                <a-col span="7">
                  <a-form-item
                    label=""
                    label-align="right"
                    style="padding-left: 10px"
                  >
                    <checkbox-basic
                      label="일자리안정자금지원 신청                        "
                      v-model:valueCheckbox="
                        dataDetail.jobSecurityFundSupportApplication
                      "
                      :disabled="
                        !isChooseEmployeementInsuranceAndIndustrialAccidentInsurance
                      "
                    />
                  </a-form-item>
                </a-col>
                <a-col span="7">
                  <DxField label="주소정근로시간">
                    <div class="flex justify-content-start">
                      <number-box

                        :spinButtons="true"
                        v-model:valueInput="dataDetail.weeklyWorkingHours"
                        :disabled="
                          !isChooseEmployeementInsuranceAndIndustrialAccidentInsurance
                        "
                      />
                    </div>
                  </DxField>
                </a-col>
                <a-col span="8" class="relative">
                  <DxField
                    label="보험료부과구분부호 및 사유"
                    :style="'align-items: start'"
                    class="label-custom"
                  >
                    <div class="w-full flex flex-col gap-1">
                      <text-number-box
                        :spinButtons="true"
                        v-model:valueInput="dataDetail.insuranceReductionCode"
                        :disabled="
                          !isChooseEmployeementInsuranceAndIndustrialAccidentInsurance
                        "
                        placeholder="부호"
                        width="100%"
                      />
                      <text-number-box
                        :spinButtons="true"
                        v-model:valueInput="
                          dataDetail.insuranceReductionReasonCode
                        "
                        :disabled="
                          !isChooseEmployeementInsuranceAndIndustrialAccidentInsurance
                        "
                        placeholder="사유코드"
                        width="100%"
                      />
                    </div>
                    <div
                      class="absolute"
                      style="bottom: 0; right: 0; transform: translateX(80%)"
                    >
                      <SearchCodeButton
                        :src="URL_CONST.URL_INSURANCE_REDUCTION_REASON_CODE"
                        :widthModal="780"
                      />
                    </div>
                  </DxField>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="fileuploader-container mt-20">
        <span>등본 등 증빙파일</span>
        <UploadFile @response-fileId="getFileId" :isFileList="isFileList"/>
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
                  <SearchCodeButton
                    :src="URL_CONST.URL_DISABLED_CODE_DEPENDENT"
                  />
                </div>
              </th>
              <th colspan="1" class="bg-gray" style="min-width: 140px">등록일</th>
              <th colspan="1" class="bg-gray" style="min-width: 75px">
                <div class="bg-gray flex">
                  <span>국적</span>
                  <SearchCodeButton
                    :src="URL_CONST.URL_NATIONALITY_NUMBER_DEPENDENT"
                    text-tooltip=""
                  />
                </div>
              </th>
              <th colspan="1" class="bg-gray" style="min-width: 100px">
                <div class="bg-gray flex">
                  <span>체류자격</span>
                  <SearchCodeButton
                    :src="URL_CONST.URL_STAY_QUALIFICATION_CODE_DEPENDENT"
                    text-tooltip=""
                  />
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
              <template
                v-for="(dependent, index) in employeeWage.dependents"
                :key="index"
              >
                <tr>

                  <!-- Add more dependent properties as needed -->

                  <td>{{ dependent.name }}</td>
                  <td>
                    {{ convertResidentId(dependent.residentId) }}
                  </td>
                  <td>
                    <a-tooltip placement="top" :title="dependent.disabledCode">
                      <!-- tool tip -->
                      <text-number-box
                        width="100%"
                        v-model:valueInput="dependent.disabledCode"
                        placeholder=""
                      />
                    </a-tooltip>
                  </td>
                  <td>
                    <date-time-box
                      width="100%"
                      dateFormat="YYYY-MM-DD"
                      v-model="dependent.disabledRegisteredDate"
                    />
                  </td>
                  <td>
                    <text-number-box
                      width="100%"
                      v-model:valueInput="dependent.nationalityNumber"
                      placeholder=""
                    />
                  </td>
                  <td>
                    <text-number-box
                      width="100%"
                      v-model:valueInput="dependent.stayQualification"
                      placeholder=""
                    />
                  </td>
                  <td>
                    <range-date-time-box
                      width="100%"
                      v-model:valueDate="dependent.contractExpiredDate"
                      :maxRange="365"
                      :teleport="true"
                    />
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
                <td colspan="9" style="height: 50px;color: #999; font-size: 17px;">No data</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts" setup>
import queries from "@/graphql/queries/PA/PA8/PA810/index";
import {companyId, convertResidentId} from "@/helpers/commonFunction";
import filters from "@/helpers/filters";
import {DependantsRelation, enum2Entries} from "@bankda/jangbuda-common";
import {useQuery} from "@vue/apollo-composable";
import dayjs from "dayjs";
import {cloneDeep} from "lodash";
import {computed, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import URL_CONST from "./../const";
import INITIAL_DATA from "./../utils";
import SearchCodeButton from "./SearchCodeButton.vue";

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
const props = withDefaults(defineProps<{
  isViewDetail: boolean,
  infoDetail: { workId: number, employeeType: EmployeeWageType, employeeId: number }
}>(), {
  isViewDetail: false,
})
const col = {
  item: 9,
  space: 3,
}
const emit = defineEmits(['closeModal'])
const store = useStore();
const globalYear = computed(() => store.state.settings.globalYear);
const {per_page, move_column, colomn_resize} = store.state.settings;
const employeeWageType = ref<EmployeeWageType>(props.infoDetail.employeeType);
const employeeWage = ref(INITIAL_DATA.initialEmployeeWage);
const employeeWages = ref();
const employeeWageSelected = ref();
const formRef = ref();
const isFileList = ref(false);
const dataDetail = ref({...INITIAL_DATA.InitialFormCreate});
const infoCompany = reactive({
  name: "",
  adding: "",
  presidentName: "",
  bizNumber: "",
});
const stateSelectQuery = reactive({
  selectedRadioValue: props.infoDetail.employeeType,
  query: queries.getEmployeeWages,
});

const isChooseNationalPensionReport = computed(
  () => !dataDetail.value.nationalPensionReport
);
const isChooseHealthInsuranceReport = computed(
  () => !dataDetail.value.healthInsuranceReport
);
const isChooseEmployeementInsuranceAndIndustrialAccidentInsurance =
  computed(
    () =>
      dataDetail.value.employeementInsuranceReport ||
      dataDetail.value.industrialAccidentInsuranceReport
  );

// get Detail
const {
  onResult, loading
} = useQuery(queries.getMajorInsuranceCompanyEmployeeAcquisition, {
  companyId: companyId,
  imputedYear: globalYear.value,
  workId: props.infoDetail.workId
}, () => ({
  fetchPolicy: 'no-cache',
}));
onResult(({data}) => {
  dataDetail.value = data.getMajorInsuranceCompanyEmployeeAcquisition;
})
// Get DataSource getMajorInsuranceCompanyEmployeeAcquisitions
const dataSource = ref([]);
const {result: dataCompany} = useQuery(queries.getMyCompany, {companyId: companyId}, () => ({fetchPolicy: "no-cache"}));

watch(dataCompany, (value) => {
  if (value) {
    infoCompany.name = value.getMyCompany.name;
    infoCompany.bizNumber = value.getMyCompany.bizNumber;
    infoCompany.presidentName = value.getMyCompany.presidentName;
    infoCompany.adding = value.getMyCompany.address;
  }
});
// get and refetch data when employeeWageType change
const variables = reactive({
  companyId: companyId,
  imputedYear: globalYear.value,
});
const query = getQuery(props.infoDetail.employeeType);
const {result: dataEmployeeWages, onResult: onResultEmployee, refetch: refetchDataEmployeeWages} =
  useQuery(query, variables, () => ({
    fetchPolicy: "no-cache",
  }));
onResultEmployee(({data}) => {
  if (data) {
    let emp;
    if (stateSelectQuery.selectedRadioValue === EmployeeWageType.WAGE) {
      employeeWages.value = data.getEmployeeWages;
      emp = data.getEmployeeWages.find((item: any) => item.employeeId === props.infoDetail.employeeId)
    } else {
      employeeWages.value = data.getEmployeeWageDailies;
      emp = data.getEmployeeWageDailies.find((item: any) => item.employeeId === props.infoDetail.employeeId)
    }
    employeeWageSelected.value = emp?.employeeId;
  }
})
//  get Employee Wage
watch(
  employeeWageSelected,
  (value) => {
    if (value) {
      const emp = employeeWages.value.find((item: any) => item.employeeId === value)
      if (emp && emp?.dependents) emp.dependents.sort((a: any, b: any) => a.relation - b.relation);

      employeeWage.value = cloneDeep(emp);
    }
  },
  {deep: true}
);

watch(() => props.isViewDetail, (newVal) => {
  isFileList.value = newVal;
}, {deep: true});
const closePopup = () => {
  emit('closeModal')
}
const getFileId = (fileId: { id: Number }) => {
  dataDetail.value.dependentsEvidenceFileStorageId = fileId.id;
};
const formatDate = (date: any) => {
  return dayjs(date).format("YYYY/MM/DD");
};
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

      th, tr, td {
        text-align: center !important;
      }

      th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        color: white;
      }

      td, th {
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
