<template>
  <a-modal class="form-modal" width="75%" v-model:visible="visible" title="취득신고등록" centered
           @cancel="$emit('closeModal')" :footer="null">
    <standard-form>
      <div class="form">
        <a-row>
          <a-col span="12">
            <a-form-item label="직원유행">
              <a-radio-group v-model:value="employeeWageType">
                <a-radio :value="EmployeeWageType.WAGE" @change="handleRadioChange" v-model="stateSelectQuery.selectedRadioValue">
                  사원
                </a-radio>
                <a-radio :value="EmployeeWageType.WAGEDaily" @change="handleRadioChange" v-model="stateSelectQuery.selectedRadioValue">
                  일용직사원
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="업체명" label-align="right">
              <employ-select :arrayValue="employeeWages" :required="true" width="300px" v-model:valueEmploy="employeeWageSelected"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="[0, 10]" class="item-group">
          <a-col span="12">
            <a-form-item label="업체명" label-align="right">
              <default-text-box width="200px" v-model:valueInput="infoCompany.name" :disabled="true"
                                placeholder="한글,영문(대문자) 입력 가능"/>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="대표자명" label-align="right">
              <default-text-box width="200px" v-model:valueInput="infoCompany.presidentName" :disabled="true"
                                placeholder="한글,영문(대문자) 입력 가능"/>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="사업자등록번호" class="clr" label-align="left">
              <!-- :disabled="!canChangeableBizNumber" -->
              <biz-number-text-box
                v-model:valueInput="infoCompany.bizNumber"
                width="220"
                :disabled="true"
                messRequired="이항목은 필수 입력사항입니다!"
                nameInput="companyBizNumber"
              />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="사업장관리번호" label-align="right">
            <default-text-box width="200px" v-model:valueInput="infoCompany.adding" :disabled="true"
              placeholder="한글,영문(대문자) 입력 가능"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="[0, 10]" class="item-group">
          <a-col span="12">
            <a-form-item label="성명" label-align="right">
              <default-text-box width="200px" v-model:valueInput="employeeWage.name" :disabled="true"
                                placeholder="한글,영문(대문자) 입력 가능"/>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="주민등록증" label-align="right">
              <id-number-text-box :disabled="true" v-model:valueInput="employeeWage.residentId"
                                  width="150px"/>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="주민등록증" label-align="right">
              <default-text-box width="150px" v-model:valueInput="employeeWage.joinedAt"  :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="월급여" label-align="right">
              <default-text-box width="200px" v-model:valueInput="employeeWage.totalPay" :disabled="true"
                                placeholder="한글,영문(대문자) 입력 가능"/>
            </a-form-item>
          </a-col>
          <a-col span="24">
            <a-form-item label="대표자여부" label-align="right">
              <switch-basic v-model:valueSwitch="employeeWage.president" textCheck="O" textUnCheck="X"
                            style="width: 80px" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">외국인</span>
              <a-row gutter="7">
                <a-col span="12">
                  <a-form-item label="국적코드" label-align="right">
                    <a-space align="center" :size="4">
                      <text-number-box
                        width="200px"
                        v-model:valueInput="formData.nationalityNumber"
                        placeholder=""
                        :disabled="isChooseNationalPensionReport"
                      />
                      <SearchCodeButton :src="URL_CONST.URL_NATIONALITY_NUMBER" />
                    </a-space>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item label="체류자격" label-align="right">
                    <a-space align="center" :size="4">
                      <default-text-box
                        width="200px"
                        v-model:valueInput="formData.stayQualification"
                        :required="true"
                        placeholder=""
                        :disabled="isChooseNationalPensionReport"
                      />
                      <SearchCodeButton :src="URL_CONST.URL_STAY_QUALIFICATION_CODE" />
                    </a-space>
                  </a-form-item>
                  
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="[0, 10]" class="item-group">
          <a-col span="24">
            <a-form-item label="대보험 공제 여부" label-align="right">
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
                  <checkbox-basic label="산재보험"
                                  v-model:valueCheckbox="formData.industrialAccidentInsuranceReport"></checkbox-basic>
                </span>
              </a-space>
            </a-form-item>
          </a-col>
          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">국민연금</span>
              <a-row gutter="7">
                <a-col span="12">
                  <a-form-item label="취득부호" label-align="right">
                    <a-space align="center" :size="4">
                      <text-number-box
                        width="200px"
                        v-model:valueInput="formData.nationalPensionAcquisitionCode"
                        :required="true"
                        placeholder=""
                        :disabled="isChooseNationalPensionReport"
                      />
                      <SearchCodeButton :src="URL_CONST.URL_NATIONAL_PERSON_ACQUISITION_CODE" />
                    </a-space>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item label="" label-align="right">
                    <span class="check-box-tab1 mb-4 ml-15">
                      <checkbox-basic
                        label="취득월 납부 희망여부"
                        v-model:valueCheckbox="formData.acquisitionMonthPayment"
                        :disabled="isChooseNationalPensionReport"
                      />
                    </span>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-col>

          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">건강보험</span>
              <a-row gutter="7">
                <a-col span="12">
                  <a-form-item label="취득부호" label-align="right">
                    <a-space align="center" :size="4">
                      <text-number-box
                        width="200px"
                        :required="true"
                        placeholder="00"
                        v-model:valueInput="formData.healthInsuranceAcquisitionCode"
                        :disabled="isChooseHealthInsuranceReport"
                      />
                      <SearchCodeButton :src="URL_CONST.URL_HEALTH_INSURANCE_ACQUISITION_CODE_CODE" />
                    </a-space>
                  </a-form-item>
                </a-col>
                <a-col span="6">
                  <a-form-item label="" label-align="right">
                    <span class="check-box-tab1 mb-4 ml-15">
                      <checkbox-basic
                        label="보험증발송여부 "
                        value="false"
                        :disabled="true"
                      />
                    </span>
                  </a-form-item>
                </a-col>
                <a-col span="6">
                  <a-form-item label="" label-align="right">
                    <span class="check-box-tab1 mb-4 ml-15">
                      <checkbox-basic
                        label="피부양자신청"
                        v-model:valueCheckbox="formData.includeDependents"
                      />
                    </span>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-col>

          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">고용산재</span>
              <a-row gutter="7">
                <a-col span="10">
                  <a-form-item label="직종부호" label-align="right">
                    <a-space align="center" :size="4">
                      <text-number-box
                      width="200px"
                      placeholder="232"
                      v-model:valueInput="formData.jobTypeCode"
                      :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance"
                    />
                      <SearchCodeButton :src="URL_CONST.URL_JOB_TYPE_CODE_CODE" />
                    </a-space>
                  </a-form-item>
                </a-col>
                <a-col span="6">
                  <a-form-item label="" label-align="right">
                    <span class="check-box-tab1 mb-4 ml-15">
                      <checkbox-basic
                        label="계약직여부"
                        v-model:valueInput="formData.contractWorker"
                        :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance"
                      />
                    </span>
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="" label-align="right"
                               :style="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance && styleDisable">
                    <a-form-item label="계약종료일" label-align="right" >
                      <date-time-box
                        class="ml-10"
                        width="145px"
                        default="2022-12-12"
                        dateFormat="YYYY-MM-DD"
                        v-model="formData.contractExpiredDate"
                        :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance"
                      />
                    </a-form-item>
                    <!--                      <label class="lable-item">계약종료일:</label>-->
                  </a-form-item>
                </a-col>
                  <a-col span="8">
                    <a-form-item label="" label-align="right" style="padding-left: 10px">
                      <checkbox-basic
                        label="일자리안정자금지원신청 신청"
                        v-model:valueCheckbox="formData.jobSecurityFundSupportApplication"
                        :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col span="8">
                    <a-form-item label="주소정근로시간"
                                 :style="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance && styleDisable"
                                 label-align="right">
                    <span class="check-box-tab1 mb-4">
                    <number-box
                      :required="true"
                      :spinButtons="true"
                      v-model:valueInput="formData.weeklyWorkingHours"
                      width="150px"
                      :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance"
                    />
                    </span>
                    </a-form-item>
                  </a-col>
                  <a-col span="8">
                    <a-form-item label="보험료부과구분부호 및 사유" label-align="right"
                                 :style="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance && styleDisable">
                    <span class="check-box-tab1 mb-4">
                      <a-space direction="vertical" :size="4">
                        <number-box
                          :required="true"
                          :spinButtons="true"
                          v-model:valueInput="formData.insuranceReductionCode"
                          width="150px"
                          :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance"
                          placeholder="부호"
                        />
                        <a-space align="center" :size="4">
                          <number-box
                            :required="true"
                            :spinButtons="true"
                            v-model:valueInput="formData.insuranceReductionReasonCode"
                            :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance"
                            width="150px"
                            placeholder="사유코드"
                          />
                          <SearchCodeButton :src="URL_CONST.URL_INSURANCE_REDUCTION_REASON_CODE" :widthModal="750" />
                        </a-space>
                       
                      </a-space>
                    </span>
                    </a-form-item>
                  </a-col>
              </a-row>


            </div>
          </a-col>
        </a-row>
      </div>
      <div class="fileuploader-container mt-20">
        <UploadFile @response-fileId="getFileId" />
      </div>
      <div class="mt-20 table-container">
        <div class="grid grid-cols-12 items-center">
          <div class="col-span-1 header flex">피부양자</div>
          <div class="col-span-11">
            <div class="grid grid-cols-11 items-center">
              <div class="row-span-2 header flex">성명</div>
              <div class="row-span-2 col-span-2 header flex">주민등록증</div>
              <div class="col-span-2 header flex">장애인, 극가유공자 부호</div>
              <div class="col-span-4 header flex">외국인</div>
              <div class="col-span-2 header flex">관계</div>
              <div class="bg-gray flex">
                <span>종별부호</span>
                <SearchCodeButton :src="URL_CONST.URL_DISABLED_CODE_DEPENDENT" />
              </div>
              <div class="bg-gray flex">등록일</div>
              <div class="bg-gray flex">
                <span>등록국적일</span>
                <SearchCodeButton :src="URL_CONST.URL_NATIONALITY_NUMBER_DEPENDENT" />
              </div>
              <div class="bg-gray flex">
                <span>체류자격</span>
                <SearchCodeButton :src="URL_CONST.URL_STAY_QUALIFICATION_CODE_DEPENDENT" />
              </div>
              <div class="col-span-2 bg-gray flex">체류기간</div>
              <div class="bg-gray flex">관계 코드</div>
              <div class="bg-gray flex">내용</div>
              <!-- use v-loop employeeWage dependents-->
              <template  v-for="(dependent, index) in employeeWage.dependents" :key="index">
                <!-- Add more dependent properties as needed -->
                
                <div class="bg-gray flex">{{ employeeWage.name }}</div>
                <div class="bg-gray flex col-span-2">{{ employeeWage.residentId }}</div>
                <div class="bg-gray flex ">
                  <a-tooltip placement="top" :title="dependent.disabledCode">
                    <!-- tool tip -->
                  <text-number-box
                    width="100%"
                    v-model:valueInput="dependent.disabledCode"
                    placeholder=""
                  />
                  </a-tooltip>
                </div>
                <div class="bg-gray flex">
                  <date-time-box
                      width="100%"
                      dateFormat="YYYY-MM-DD"
                      v-model="dependent.disabledRegisteredDate"
                    />
                </div>
                <div class="bg-gray flex">
                  <text-number-box
                    width="100%"
                    v-model:valueInput="dependent.nationalityNumber"
                    placeholder=""
                  />
                </div>
                <div class="bg-gray flex col-span-.5">
                  <text-number-box
                    width="100%"
                    v-model:valueInput="dependent.stayQualification"
                    placeholder=""
                  />
                </div>
                <div class="bg-gray flex col-span-2">
                  <range-date-time-box 
                    width="100%" 
                    v-model:valueDate="dependent.contractExpiredDate" 
                    :maxRange="365"
                   />
                </div>
                <div class="bg-gray flex">
                  <template v-if="dependent.relation >= 0">
                    {{getCodeOrLabel(dependent.relation).number }}
                  </template>
                </div>
                <div class="bg-gray flex">
                  <template v-if="dependent.relation >= 0">
                    {{getCodeOrLabel(dependent.relation).label }}
                  </template>
                </div>
            </template>

            </div>
            
          </div>
        </div>
      </div>
      <div class="d-flex justify-center mt-20">
        <button-basic :width="90" id="btn-save" @onClick="onSubmit($event)" style="margin: auto" mode="contained"
        type="default" text="저장"/>
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import UploadFile from "@/components/UploadFile.vue";
import CheckboxBasic from "@/components/common/CheckboxBasic.vue";
import DateTimeBox from "@/components/common/DateTimeBox.vue";
import EmploySelect from "@/components/common/EmploySelect.vue";
import NumberBox from "@/components/common/NumberBox.vue";
import StandardForm from "@/components/common/StandardForm.vue";
import mutations from '@/graphql/mutations/PA/PA8/PA810/index';
import queries from '@/graphql/queries/PA/PA8/PA810/index';
import getCompany from "@/graphql/queries/common/getCompany";
import { companyId } from '@/helpers/commonFunction';
import { Company } from "@/types/types";
import { DeleteOutlined, HistoryOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { DependantsRelation, enum2Entries } from '@bankda/jangbuda-common';
import { useMutation, useQuery } from '@vue/apollo-composable';
import dayjs from 'dayjs';
import DxButton from 'devextreme-vue/button';
import { DxColumn, DxDataGrid, DxScrolling } from 'devextreme-vue/data-grid';
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
import URL_CONST from './../const';
import SearchCodeButton from './SearchCodeButton.vue';
import TableEmployeeWage from './TableEmployeeWage.vue';
import notification from "@/utils/notification";
import INITIAL_DATA from './../utils'
import filters from "@/helpers/filters";
let dpRelation =  enum2Entries(DependantsRelation)
const getCodeOrLabel = (id: number) => {
  return {
    number: id.toString(),
    label: dpRelation[id][0].split('.')[1]
  }
};
enum EmployeeWageType {
  WAGE = 10,
  WAGEDaily = 20
}
const getQuery = (type: EmployeeWageType) => {
  switch (type) {
    case EmployeeWageType.WAGE:
      return queries.getEmployeeWages;
    case EmployeeWageType.WAGEDaily:
      return queries.getEmployeeWageDailies;
  }
};
export default defineComponent({
  components: {
    EmploySelect,
    NumberBox,
    StandardForm,
    CheckboxBasic,
    DateTimeBox,
    DxDataGrid,
    DxColumn,
    DxButton,
    DxScrolling,
    HistoryOutlined,
    DeleteOutlined,
    SearchOutlined,
    DxFileUploader,
    UploadFile,
    TableEmployeeWage,
    SearchCodeButton
},
  setup(_, { emit}) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const {per_page, move_column, colomn_resize} = store.state.settings;
    const visible = ref(true);
    const employeeWageType = ref<EmployeeWageType>(EmployeeWageType.WAGE);
    const employeeWage = ref(INITIAL_DATA.initialEmployeeWage);
    const employeeWages = ref();
    const employeeWageSelected = ref();
    const formData = reactive(INITIAL_DATA.InitialFormCreate);
    const infoCompany = reactive({
      name: '',
      adding: '', 
      presidentName: '',
      bizNumber: ''
    })
    const stateSelectQuery = reactive({
      selectedRadioValue: EmployeeWageType.WAGE,
      query: queries.getEmployeeWages,
    });

    const isChooseNationalPensionReport = computed(() => !formData.nationalPensionReport) 
    const isChooseHealthInsuranceReport = computed(() => !formData.healthInsuranceReport) 
    const isChooseEmployeementInsuranceAndIndustrialAccidentInsurance = computed(() => (formData.employeementInsuranceReport || formData.industrialAccidentInsuranceReport)) 

    const handleRadioChange = (event: Event) => {
      stateSelectQuery.selectedRadioValue = +(event.target as HTMLInputElement).value;
      employeeWageSelected.value = null;
      employeeWage.value = INITIAL_DATA.initialEmployeeWage;
    };
    // Get DataSource getMajorInsuranceCompanyEmployeeAcquisitions
    const dataSource = ref([]);

    // get Company
    const { result: dataCompany, loading, refetch } = useQuery<{getCompany: Company}>(getCompany, {id: companyId},
      () => ({
        // enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    watch(dataCompany, (value) => {
      if (value) {
        infoCompany.name = value.getCompany.name
        infoCompany.bizNumber = value.getCompany.bizNumber
        infoCompany.presidentName = value.getCompany.presidentName
        infoCompany.adding = value.getCompany.address
      }
    })

    // get and refetch data when employeeWageType change
    const variables = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    })
    const query = ref(queries.getEmployeeWages)
    const { result: dataEmployeeWages, refetch: refetchDataEmployeeWages  } = useQuery(query, variables, () => ({
      fetchPolicy: 'no-cache',
    }));
    watch(dataEmployeeWages, (value) => {
      if (value) {
        if (stateSelectQuery.selectedRadioValue === EmployeeWageType.WAGE) {
          employeeWages.value = value.getEmployeeWages;
        } else {
          employeeWages.value = value.getEmployeeWageDailies;
        }
      }
    }, {deep: true});
    watch(() => stateSelectQuery.selectedRadioValue, (newValue) => {
      query.value = getQuery(newValue)
    });
  
    //  get Employee Wage
    watch(employeeWageSelected, (value) => {
      if (value) {
        employeeWage.value = employeeWages.value.find((item: any) => item.employeeId === value);
      }
    }, {deep: true});

    // Mutation
    const { mutate, onDone: onDoneCreateMajor, loading: loadingCreateMajor, onError: errorCreateMajor } = useMutation(mutations.createMajorInsuranceCompanyEmployeeAcquisition, () => ({
      fetchPolicy: 'no-cache',
    }));

    /// Submit form
    const onSubmit = (e: any) => {
      const res = e.validationGroup.validate()
      // !res.isValid
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        const { adding, joinedAt, name, president, presidentName, residentId, totalPay, bizNumber,   ...newFormData} = formData;
        const dependents = employeeWage.value.dependents.map((item: any) => {
          return {
            name: employeeWage.value.name,
            residentId: employeeWage.value.residentId,
            relationCode: getCodeOrLabel(item.relation).number,
            nationalityNumber: item.nationalityNumber,
            stayQualification: item.stayQualification,
            stayPeriodFrom: item?.contractExpiredDate ? item.contractExpiredDate[0] : filters.formatDateToInterger(new Date().getTime()),
            stayPeriodTo: item?.contractExpiredDate ? item.contractExpiredDate[1] : filters.formatDateToInterger(new Date().setDate(new Date().getDate() + 7)),
            disabledRegisteredDate: filters.formatDateToInterger(item.disabledRegisteredDate) || 0
          }
        })
        const input = {
          ...newFormData,
          employeeId: Number(employeeWageSelected.value),
          employeeType: stateSelectQuery.selectedRadioValue,
          dependents,
        }
        mutate({
          ...variables,
          input: input
        }).then((res) => {
          notification('success', '저장되었습니다.');
          emit('handleCreate')
        }).catch((err) => {
          console.log('err', err)
          notification('error',  err.message);
        })
      }

    };
    const getFileId = (fileId: {id: Number}) => {
      formData.dependentsEvidenceFileStorageId = fileId.id;
    }
    const formatDate = (date: any) => {
      return dayjs(date).format('YYYY/MM/DD')
    }
    return {
      globalYear,
      per_page,
      move_column,
      colomn_resize,
      dataSource,
      visible,
      onSubmit,
      formData,
      styleDisable: {opacity: .4},
      employeeWages,
      employeeWageSelected,
      employeeWageType,
      EmployeeWageType,
      formatDate,
      stateSelectQuery,
      handleRadioChange,
      infoCompany,
      employeeWage,
      isChooseNationalPensionReport,
      isChooseHealthInsuranceReport,
      isChooseEmployeementInsuranceAndIndustrialAccidentInsurance,
      URL_CONST,
      getFileId,
      dpRelation,
      getCodeOrLabel,
    };
  }
});
</script>
<style lang="scss" scoped>
@import '../styles/index.scss';
.table-container {
  .grid {
  }
}
</style>
