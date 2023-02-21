<template>
  <a-modal class="form-modal" width="50%" v-model:visible="visible" title="취득신고등록" centered
           @cancel="$emit('closeModal')" :footer="null">
    <standard-form>
      <div class="form">
        <a-row>
          <a-col span="12">
            <a-form-item label="직원유행">
              <a-radio-group v-model:value="employeeWageType">
                <a-radio :value="EmployeeWageType.WAGE" @change="handleRadioChange" v-model="selectedRadioValue">
                  사원
                </a-radio>
                <a-radio :value="EmployeeWageType.WAGEDaily" @change="handleRadioChange" v-model="selectedRadioValue">
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
              <default-text-box width="200px" v-model:valueInput="name" :disabled="true"
                                placeholder="한글,영문(대문자) 입력 가능"/>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="대표자명" label-align="right">
              <default-text-box width="200px" v-model:valueInput="presidentName" :disabled="true"
                                placeholder="한글,영문(대문자) 입력 가능"/>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="사업자등록번호" class="clr" label-align="left">
              <!-- :disabled="!canChangeableBizNumber" -->
              <biz-number-text-box
                v-model:valueInput="bizNumber"
                width="220"
                :disabled="true"
                messRequired="이항목은 필수 입력사항입니다!"
                nameInput="companyBizNumber"
              />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="사업장관리번호" label-align="right">
            <default-text-box width="200px" v-model:valueInput="adding" :disabled="true"
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
                    <country-code-select-box style="width: 200px" v-model:valueCountry="employeeWage.nationalityCode"
                                             :hiddenOptionKR="true" :disabled="true"/>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item label="체류자격" label-align="right">
                    <!-- <country-code-select-box style="width: 200px" v-model:valueCountry="employeeWage.stayQualification"
                                             :hiddenOptionKR="true" :disabled="true"/> -->
                    <stay-qualification-select-box v-model:valueStayQualifiction="employeeWage.stayQualification" />
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
                        placeholder="1 - 18"
                        :disabled="isChooseNationalPensionReport"
                      />
                      <search-outlined :style="{fontSize: '20px'}"/>
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
                    <text-number-box
                      width="200px"
                      :required="true"
                      placeholder="00"
                      v-model:valueInput="formData.healthInsuranceAcquisitionCode"
                      :disabled="isChooseHealthInsuranceReport"
                    />
                  </a-form-item>
                </a-col>
                <a-col span="6">
                  <a-form-item label="" label-align="right">
                    <span class="check-box-tab1 mb-4 ml-15">
                      <checkbox-basic
                        label="보험증발송여부 "
                        v-model:valueCheckbox="formData.contractWorker"
                        :disabled="!formData.healthInsuranceReport"
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
                <a-col span="12">
                  <a-form-item label="직종부호" label-align="right">
                    <text-number-box
                      width="200px"
                      placeholder="232"
                      v-model:valueCheckbox="formData.jobTypeCode"
                      :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance"
                    />
                  </a-form-item>
                </a-col>
                <a-col span="4">
                  <a-form-item label="" label-align="right">
                    <span class="check-box-tab1 mb-4 ml-15">
                      <checkbox-basic
                        label="계약직여부"
                        v-model:valueCheckbox="formData.contractWorker"
                        :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance"
                      />
                    </span>
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="" label-align="right"
                               :style="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance && styleDisable">
                    <a-form-item label="계약종료일" label-align="right">
                      <date-time-box
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
                        />
                        <number-box
                          :required="true"
                          :spinButtons="true"
                          v-model:valueInput="formData.insuranceReductionReasonCode"
                          :disabled="!isChooseEmployeementInsuranceAndIndustrialAccidentInsurance"
                          width="150px"
                        />
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
        <a-form-item :label="'등본 등 증빙파일'" style="position: relative;">
          <div>
              <div class="d-flex">
                  <input class="custom-file-input" type="file" />
              </div>
          </div>
          
          <img src="@/assets/images/iconUpload.png" alt="" class="iconUpload">
      </a-form-item>
      </div>
      <div class="mt-20">
        <TableEmployeeWage :data="employeeWage"/>
      </div>
      <div class="d-flex justify-center mt-20">
        <button-basic :width="90" id="btn-save" @onClick="onSubmit($event)" style="margin: auto" mode="contained"
        type="default" text="저장"/>
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import {ref, defineComponent, watch, computed, reactive, toRefs} from 'vue';
import {useStore} from 'vuex';
import queries from '@/graphql/queries/PA/PA8/PA810/index';
import mutations from '@/graphql/mutations/PA/PA8/PA810/index';
import {useMutation, useQuery } from '@vue/apollo-composable';
import {companyId, openTab} from '@/helpers/commonFunction';
import {DeleteOutlined, HistoryOutlined, SearchOutlined} from '@ant-design/icons-vue';
import {DxDataGrid, DxColumn, DxScrolling, DxMasterDetail} from 'devextreme-vue/data-grid';
import {DxFileUploader} from 'devextreme-vue/file-uploader';
import DxButton from 'devextreme-vue/button';
import notification from '@/utils/notification';
import DateTimeBox from "@/components/common/DateTimeBox.vue";
import CheckboxBasic from "@/components/common/CheckboxBasic.vue";
import getEmployeeWages from "@/graphql/queries/PA/PA8/PA810/getEmployeeWages";
import StandardForm from "@/components/common/StandardForm.vue";
import dayjs from 'dayjs';
import NumberBox from "@/components/common/NumberBox.vue";
import EmploySelect from "@/components/common/EmploySelect.vue";
import imgUpload from "@/components/UploadImage.vue";
import getCompany from "@/graphql/queries/common/getCompany";
import {Company} from "@/types/types";
import TableEmployeeWage from './TableEmployeeWage.vue';

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
export const EMPLOYEE_WAGE = {
      name: '',
      residentId: '',
      joinedAt: '',
      totalPay: '',
      president: '',
      nationalityNumber: '',
      nationalityCode: '',
      stayQualification: '',
    } 
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
    imgUpload,
    TableEmployeeWage
},
  setup(_, { emit}) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const {per_page, move_column, colomn_resize} = store.state.settings;
    const visible = ref(true);
    const employeeWageType = ref<EmployeeWageType>(EmployeeWageType.WAGE);
    const employeeWage = ref(EMPLOYEE_WAGE);
    const employeeWages = ref();
    const employeeWageSelected = ref();
    const formData = reactive({
      name: '', // 2 - 6
      bizNumber: '', // 3 so dang ky cong ty (api not register)
      presidentName: '', // 4
      adding: '', // 5 api not register
      joinedAt: '', // 7 api not register
      residentId: '', // 8
      totalPay: '', // 9
      president: false, // 10 no
      nationalityNumber: 11, // 11 field required number, but component return string value
      stayQualification: 12, // 12 field required number, but component return string value
      nationalPensionReport: true, // 13
      healthInsuranceReport: true, // 14
      employeementInsuranceReport: true, // 15
      industrialAccidentInsuranceReport: true, // 16
      nationalPensionAcquisitionCode: 12, // 17
      acquisitionMonthPayment: true, // 18
      healthInsuranceAcquisitionCode: 1234, // 19
      includeDependents: true,
      jobTypeCode: 232, // 22
      contractWorker: true, // 23
      contractExpiredDate: '', // 24
      jobSecurityFundSupportApplication: true, // 25
      weeklyWorkingHours: 40, // 26
      insuranceReductionCode: 27, // 27
      insuranceReductionReasonCode: 28, // 28
      dependentsEvidenceFileStorageId: '', // 1
    });
    const infoCompany = reactive({
      name: '',
      adding: '', 
      presidentName: '',
      bizNumber: ''
    })
    const state = reactive({
      selectedRadioValue: EmployeeWageType.WAGE,
      query: queries.getEmployeeWages,
    });

    const isChooseNationalPensionReport = computed(() => !formData.nationalPensionReport) 
    const isChooseHealthInsuranceReport = computed(() => !formData.healthInsuranceReport) 
    const isChooseEmployeementInsuranceAndIndustrialAccidentInsurance = computed(() => (formData.employeementInsuranceReport || formData.industrialAccidentInsuranceReport)) 

    const handleRadioChange = (event: Event) => {
      state.selectedRadioValue = +(event.target as HTMLInputElement).value;
      employeeWageSelected.value = null;
      employeeWage.value = EMPLOYEE_WAGE;
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
    const { result: dataEmployeeWages } = useQuery(query, variables, () => ({
      fetchPolicy: 'no-cache',
    }));
    watch(dataEmployeeWages, (value) => {
      if (value) {
        if (state.selectedRadioValue === EmployeeWageType.WAGE) {
          employeeWages.value = value.getEmployeeWages;
        } else {
          employeeWages.value = value.getEmployeeWageDailies;
        }
      }
    }, {deep: true});
    watch(() => state.selectedRadioValue, (newValue) => {
      query.value = getQuery(newValue)
    });
  
    //  get Employee Wage
    watch(employeeWageSelected, (value) => {
      if (value) {
        employeeWage.value = employeeWages.value.find((item: any) => item.employeeId === value);
      }
    });

    // Mutation
    const { mutate } = useMutation(mutations.createMajorInsuranceCompanyEmployeeAcquisition, () => ({
      fetchPolicy: 'no-cache',
    }));

    // handle registration CardFile Storage upload
    const getregCardFile = (img: any) => {
      formData.dependentsEvidenceFileStorageId = img.id;
      // formData.value.registrationCard = img;
    };

    /// Submit form
    const onSubmit = (e: any) => {
      const res = e.validationGroup.validate()
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        const { adding, joinedAt, name, president, presidentName, residentId, totalPay, bizNumber, dependentsEvidenceFileStorageId,   ...newFormData} = formData;

        const input = {
          ...newFormData,
          employeeId: Number(employeeWageSelected.value),
          employeeType: state.selectedRadioValue,
          contractExpiredDate: 12321312, //  Int cannot represent non 32-bit signed integer value: 1676971860000"
          nationalPensionAcquisitionCode:1231,
          // nationalityNumber: employeeWage.value.nationalityCode,
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
      ...toRefs(state),
      handleRadioChange,
      getregCardFile,
      ...toRefs(infoCompany),
      employeeWage,
      isChooseNationalPensionReport,
      isChooseHealthInsuranceReport,
      isChooseEmployeementInsuranceAndIndustrialAccidentInsurance
    };
  }
});
</script>
<style lang="scss" scoped>
@import '../styles/index.scss';
.fileuploader-container {
  padding: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
}

.fileName {
  display: flex;
  align-items: center;
  padding-top: 4px;
}

.container_upload {
  width: 100%;
}

.ant-form input[type="file"] {
  display: block;
  width: 200px;
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: " 파일선택...";
  display: inline-block;
  width: 200px;
  text-align: left;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  line-height: 1.5715;
  padding: 5px 10px;
  padding-left: 40px;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}

.iconUpload {
  width: 20px; 
  height: 20px; 
  position: absolute;  
  top: 50%; 
  left: 10px;
  transform: translate(0, -50%);
}
.ant-form-item {
  margin-bottom: 0;
}

</style>
