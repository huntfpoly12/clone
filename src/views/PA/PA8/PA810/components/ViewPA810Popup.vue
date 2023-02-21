<template>
  <a-modal class="form-modal" width="50%" v-model:visible="visible" title="취득신고등록" centered
           @cancel="$emit('closeModal')" :footer="null">
    <standard-form>
      <div class="form">
        <a-row>
          <a-col span="12">
            <a-form-item label="직원유행">
              <a-radio-group v-model:value="employeeWageTypeValue" :disabled="true">
                <a-radio :value="EmployeeWageType.WAGE" v-model="selectedRadioValue">
                  사원
                </a-radio>
                <a-radio :value="EmployeeWageType.WAGEDaily" v-model="selectedRadioValue">
                  일용직사원
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="업체명" label-align="right">
              <employ-select :arrayValue="employeeWages"  width="300px"
                             v-model:valueEmploy="employeeWageSelected" :disabled="true"/>
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
                :required="true"
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
              <id-number-text-box v-model:valueInput="employeeWage.residentId"
                                  width="150px" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="주민등록증" label-align="right">
              <date-time-box width="150px" v-model:valueDate="employeeWage.joinedAt" />
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
                  <a-form-item label="국적코드 11" label-align="right">
                    <country-code-select-box style="width: 200px" v-model:valueCountry="employeeWage.nationalityNumber"
                                             :hiddenOptionKR="true" :disabled="true" />
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item label="체류자격" label-align="right">
                    <country-code-select-box style="width: 200px" v-model:valueCountry="employeeWage.stayQualification"
                                             :hiddenOptionKR="true" :disabled="true"/>
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
                  <checkbox-basic label="국민연금" v-model:valueCheckbox="formData.nationalPensionReport" :disabled="true" />
                </span>
                <span class="check-box-tab1">
                  <checkbox-basic label="건강보험" v-model:valueCheckbox="formData.healthInsuranceReport" :disabled="true" />
                </span>
                <span class="check-box-tab1 mb-4 ml-15">
                  <checkbox-basic label="고용보험"
                                  v-model:valueCheckbox="formData.employeementInsuranceReport" :disabled="true" />
                </span>
                <span class="check-box-tab1 mb-4 ml-15">
                  <checkbox-basic label="산재보험"
                                  v-model:valueCheckbox="formData.industrialAccidentInsuranceReport" :disabled="true" />
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
                        :disabled="true"
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
                        :disabled="true"
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
                      :disabled="true"
                    />
                  </a-form-item>
                </a-col>
                <a-col span="6">
                  <a-form-item label="" label-align="right">
                    <span class="check-box-tab1 mb-4 ml-15">
                      <checkbox-basic
                        label="보험증발송여부 "
                        v-model:valueCheckbox="formData.contractWorker"
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
                        :disabled="true"
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
                      :disabled="true"
                    />
                  </a-form-item>
                </a-col>
                <a-col span="4">
                  <a-form-item label="" label-align="right">
                    <span class="check-box-tab1 mb-4 ml-15">
                      <checkbox-basic
                        label="계약직여부"
                        v-model:valueCheckbox="formData.contractWorker"
                        :disabled="true"
                      />
                    </span>
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="" label-align="right"
                               :style="true">
                    <a-form-item label="계약종료일" label-align="right">
                      <date-time-box
                        width="145px"
                        default="2022-12-12"
                        dateFormat="YYYY-MM-DD"
                        v-model="formData.contractExpiredDate"
                        :disabled="true"
                      />
                    </a-form-item>
                    <!--                      <label class="lable-item">계약종료일:</label>-->
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row gutter="7">
                <a-col span="8">
                  <a-form-item label="" label-align="right">
                    <checkbox-basic
                      label="일자리안정자금지원신청 신청"
                      v-model:valueCheckbox="formData.jobSecurityFundSupportApplication"
                      :disabled="true"
                    />
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="주소정근로시간"
                               :style="true"
                               label-align="right">
                    <span class="check-box-tab1 mb-4">
                    <number-box
                      :required="true"
                      :spinButtons="true"
                      v-model:valueInput="formData.weeklyWorkingHours"
                      width="150px"
                      :disabled="true"
                    />
                    </span>
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="보험료부과구분부호 및 사유" label-align="right"
                               :style="true">
                    <span class="check-box-tab1 mb-4">
                      <a-space direction="vertical" :size="4">
                        <number-box
                          :required="true"
                          :spinButtons="true"
                          v-model:valueInput="formData.insuranceReductionCode"
                          width="150px"
                          :disabled="true"
                        />
                        <number-box
                          :required="true"
                          :spinButtons="true"
                          v-model:valueInput="formData.insuranceReductionReasonCode"
                          :disabled="true"
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
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import CheckboxBasic from "@/components/common/CheckboxBasic.vue";
import DateTimeBox from "@/components/common/DateTimeBox.vue";
import EmploySelect from "@/components/common/EmploySelect.vue";
import NumberBox from "@/components/common/NumberBox.vue";
import StandardForm from "@/components/common/StandardForm.vue";
import queries from '@/graphql/queries/PA/PA8/PA810/index';
import { companyId } from '@/helpers/commonFunction';
import { DeleteOutlined, HistoryOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { useQuery } from '@vue/apollo-composable';
import dayjs from 'dayjs';
import DxButton from 'devextreme-vue/button';
import { DxColumn, DxDataGrid, DxScrolling } from 'devextreme-vue/data-grid';
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
import TableEmployeeWage from "./TableEmployeeWage.vue";
import getCompany from "@/graphql/queries/common/getCompany";
import { Company } from "@/types/types";

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
  props: {
    data: {
      type: Object,
      required: true
    }
  },
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
    TableEmployeeWage
},
  setup({ data }, { emit }) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const {per_page, move_column, colomn_resize} = store.state.settings;
    const visible = ref(true);
    const {employeeType: employeeWageTypeValue, employeeId: employeeWageSelected} = toRefs(data);
    const employeeWages = ref();
    const employeeWage = ref({
      name: "",
      residentId: "",
      joinedAt: "",
      totalPay: "",
      president: "",
      nationalityNumber: "",
      nationalityCode: "",
      stayQualification: "",
    });
    const formData = reactive({
      name: data.name ?? null, // 2 - 6
      nationalPensionReport: data.nationalPensionReport ?? null, // 13
      healthInsuranceReport: data.healthInsuranceReport ?? null, // 14
      employeementInsuranceReport: data.employeementInsuranceReport ?? null, // 15
      industrialAccidentInsuranceReport: data.industrialAccidentInsuranceReport ?? null, // 16
      nationalPensionAcquisitionCode: data.nationalPensionAcquisitionCode ?? null, // 17
      acquisitionMonthPayment: data.acquisitionMonthPayment ?? null, // 18
      healthInsuranceAcquisitionCode: data.healthInsuranceAcquisitionCode ?? null, // 19
      includeDependents: data.includeDependents ?? null,
      jobTypeCode: data.jobTypeCode ?? null, // 22
      contractWorker: data.contractWorker ?? null, // 23
      contractExpiredDate: data.contractExpiredDate ?? null, // 24
      jobSecurityFundSupportApplication: data.jobSecurityFundSupportApplication ?? null, // 25
      weeklyWorkingHours: data.weeklyWorkingHours ?? null, // 26
      insuranceReductionCode: data.insuranceReductionCode ?? null, // 27
      insuranceReductionReasonCode: data.insuranceReductionReasonCode ?? null, // 28
    });

    const state = reactive({
      selectedRadioValue: EmployeeWageType.WAGE,
      query: getQuery(data.employeeType)
    });

    // get Company
    const infoCompany = reactive({
      name: '',
      adding: '', 
      presidentName: '',
      bizNumber: ''
    })
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

    // get and refetch data when employeeWageTypeValue change
    const variables = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    })
    const query = ref(state.query)
    const {result} = useQuery(query, variables, () => ({
      fetchPolicy: 'no-cache',
    }));
    watch(result, (value) => {
      if (value) {
        if (data.employeeType === EmployeeWageType.WAGE) {
          employeeWages.value = value.getEmployeeWages;
          employeeWage.value = employeeWages.value.find((item: any) => item.employeeId === data.employeeId);
        } else {
          employeeWages.value = value.getEmployeeWageDailies;
          employeeWage.value = employeeWages.value.find((item: any) => item.employeeId === data.employeeId);
        }
      }
    }, {deep: true});
    /// Submit form
    const formatDate = (date: any) => {
      return dayjs(date).format('YYYY/MM/DD')
    }
    return {
      globalYear,
      per_page,
      move_column,
      colomn_resize,
      visible,
      formData,
      styleDisable: {opacity: .4},
      employeeWages,
      employeeWageSelected,
      employeeWageTypeValue,
      EmployeeWageType,
      formatDate,
      ...toRefs(state),
      employeeWage,
      infoCompany
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
</style>
