<template>
  <a-modal
    class="form-modal"
    width="60%"
    :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }"
    :visible="isOpenModalCreate"
    title="사업장가입신규신청"
    centered
    @cancel="closePopup"
    :footer="null"
    :mask-closable="false"
  >
    <standard-form ref="formRef">
      <a-row :gutter="[0, 0]" class="item-group mb-10">
        <box-title title="4대보험 적용 및 성립신고">
          <a-row>
            <a-col span="6">
              <checkbox-basic
                label="국민연금"
                v-model:valueCheckbox="formData.nationalPension"
              />
            </a-col>
            <a-col span="6">
              <checkbox-basic
                label="건강보험"
                v-model:valueCheckbox="formData.employmentInsurance"
              />
            </a-col>
            <a-col span="6">
              <checkbox-basic
                label="고용보험성립"
                v-model:value-checkbox="formData.employeeInsuranceEligibility"
              />
            </a-col>
            <a-col span="6">
              <checkbox-basic
                label="산재보험성립"
                v-model:value-checkbox="formData.workerEligibility"
              />
            </a-col>
          </a-row>
        </box-title>
        <box-title title="고용, 산재보험 가입신청">
          <a-row>
            <a-col span="6">
              <checkbox-basic
                label="고용보험가입"
              />
            </a-col>
            <a-col span="6">
              <checkbox-basic
                label="산재보험가입"
              />
            </a-col>
            <a-col span="12">
              <a-space :size="4">
                <img src="@/assets/images/iconInfo.png" style="width: 14px" />
                <span class="ml-5">해당사항이 있는 경우만 신청해 주세요.</span>
              </a-space>
            </a-col>
          </a-row>
        </box-title>
      </a-row>
      <a-row :gutter="[0, 0]" class="item-group mb-10">
        <div class="mb-10">가입신고 기재항목</div>
        <box-title title="사업장">
          <a-row>
            <a-col span="8">
              <DxField label="상호" required>
                <default-text-box
                  placeholder="성명"
                  required
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="사업장관리번호" required>
                <text-number-box
                  placeholder="성명"
                  required
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="사업장형태" required>
                <a-radio-group
                  class="d-flex items-center"
                  :value="1"
                  required
                >
                  <a-radio :value="1">법인</a-radio>
                  <a-radio :value="2">개인</a-radio>
                </a-radio-group>
              </DxField>
            </a-col>
          </a-row>
          <DxField  label="주소" required>
            <default-text-box placeholder="성명" required />
          </DxField> 
          <a-row>
            <a-col span="8">
              <DxField label="사업자등록번호" required>
                <biz-number-text-box
                  messRequired="이항목은 필수 입력사항입니다!"
                  nameInput="companyBizNumber"
                  required
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="법인등록번호" required>
                <text-number-box
                  placeholder="성명"
                  required
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label=" 전화번호(유선)" required>
                <tel-text-box
                  placeholder="성명"
                  required
                />
              </DxField>
            </a-col>
          </a-row>

          <a-row>
            <a-col span="8">
              <DxField label=" 휴대전화번호">
                <tel-text-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="우편번호">
                <text-number-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="FAX번호">
                <text-number-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
          </a-row>

          <a-row>
            <a-col span="8">
              <DxField label="업태">
                <default-text-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="종목">
                <default-text-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
          </a-row>

          <a-row>
            <a-col span="8">
              <DxField label="환급계좌은행">
                <default-text-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="환급계좌번호">
                <default-text-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="예금주명">
                <default-text-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
          </a-row>
        </box-title>

        <box-title title="대표자">
          <a-row>
            <a-col span="8">
              <DxField label="성명" required>
                <default-text-box
                  placeholder="성명"
                  required
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="주민등록번호" required>
                <id-number-text-box
                  placeholder="성명"
                  required
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="전화번호">
                <tel-text-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="24">
              <DxField label="주소" required>
                <default-text-box
                  placeholder="성명"
                  required
                />
              </DxField>
            </a-col>
          </a-row>
        </box-title>

        <box-title title="보험료자동이체신청">
          <a-row>
            <a-col span="12">
              <DxField label="은행명">
                <default-text-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="계좌번호" class="field-custom">
                <text-number-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="예금주명">
                <default-text-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="예금주주민등록번호" class="field-custom">
                <id-number-text-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="합산자동이체적용여부">
                <a-radio-group
                  class="d-flex items-center"
                >
                  <a-radio :value="1">적용</a-radio>
                  <a-radio :value="2">미적용</a-radio>
                </a-radio-group>
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="이체 희망일">
                <a-radio-group
                  class="d-flex items-center"
                >
                  <a-radio :value="1">납기일</a-radio>
                  <a-radio :value="2">납기전월말일</a-radio>
                </a-radio-group>
              </DxField>
            </a-col>
          </a-row>
        </box-title>

        <box-title title="전자고지신청">
          <a-row>
            <div class="d-flex-center">
              <DxField label="고지방법">
                <a-radio-group
                  class="d-flex items-center"
                >
                  <a-radio :value="1">전자우편</a-radio>
                  <a-radio :value="2">휴대전화</a-radio>
                  <a-radio :value="3">전자문서교환시스템</a-radio>
                  <a-radio :value="4">홈페이지</a-radio>
                </a-radio-group>
              </DxField>
              <a-space :size="4" style="flex: 0 0 auto">
                <img src="@/assets/images/iconInfo.png" style="width: 14px" />
                <span class="ml-5" >신청하는 경우 아래 항목을 반드시 입력해 주세요.</span>
              </a-space>
            </div>
          </a-row>
          <a-row>
            <DxField label="수신처 (전자우편주소, 휴대전화번호 또는 아이디)" class="field-custom-auto">
              <default-text-box
                placeholder="성명"
                style="flex: 1"
              />
            </DxField>
          </a-row>

          <a-row>
            <a-col span="12">
              <DxField label="수신자명" >
                <default-text-box
                  placeholder="성명"
                  style="flex: 1"
                />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="수신자주민등록번호" class="field-custom">
                <id-number-text-box
                  placeholder="성명"
                  style="flex: 1"
                />
              </DxField>
            </a-col>
          </a-row>
        </box-title>

        <box-title title="국민연금/건강보험">
          <a-row>
            <a-col span="12">
              <DxField label="건설현장사업장해당여부" class="field-custom-auto">
                <a-radio-group
                  class="d-flex items-center"
                >
                  <a-radio :value="1">해당</a-radio>
                  <a-radio :value="2">미해당</a-radio>
                </a-radio-group>
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="건설현장사업기간" class="field-custom">
                <default-text-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
          </a-row>
        </box-title>

        <box-title title="연금(고용)보험료지원신청">
          <div class="d-flex-center justify-content-around">
            <checkbox-basic
              label="국민연금"

            />
            <checkbox-basic
              label="고용보험"

            />
          </div>
        </box-title>

        <box-title title="국민연금">
          <a-row>
            <a-col span="8">
              <DxField label="근로자수" :required="formData.nationalPension">
                <text-number-box
                  placeholder="성명"
                  :required="formData.nationalPension"
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="가입대상자수" :required="formData.nationalPension">
                <text-number-box
                  placeholder="성명"
                  :required="formData.nationalPension"
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="적용연월일" :required="formData.nationalPension">
                <date-time-box
                  placeholder="성명"
                  :required="formData.nationalPension"
                />
              </DxField>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="12">
              <DxField label="분리적용사업장여부" :required="formData.nationalPension" class="field-custom-auto">
                <div class="d-flex gap-20">
                  <a-radio-group
                    :required="formData.nationalPension"
                  >
                    <a-radio :value="1">해당</a-radio>
                    <a-radio :value="2">미해당</a-radio>
                  </a-radio-group>
                </div>
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="본점사업장관리번호" class="field-custom-auto">
                <text-number-box
                  placeholder="성명"
                />
              </DxField>
            </a-col>
          </a-row>
        </box-title>
        <box-title title="건강보험">
          <a-row>
            <a-col span="8">
              <DxField label="적용대상자수" :required="formData.employmentInsurance" class="field-custom-auto">
                <text-number-box
                  placeholder="성명"
                  :required="formData.employmentInsurance"
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="적용연월일" :required="formData.employmentInsurance" class="field-custom-auto">
                <date-time-box
                  placeholder="성명"
                  :required="formData.employmentInsurance"
                />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="본점사업장관리번호" :required="formData.employmentInsurance" class="field-custom-auto">
                <text-number-box
                  placeholder="성명"

                />
              </DxField>
            </a-col>
          </a-row>

          <a-row>
            <a-col span="12">
              <DxField label="사업장특성부호" class="field-custom-auto">
                <default-text-box
                  placeholder=""
                />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="회계종목"  class="field-custom-auto">
                <div class="d-flex-center justify-content-around">
                  <a-space :size="8">
                    <span>1</span>
                    <default-text-box
                      placeholder=""
                      width="80px"
                    />
                  </a-space>
                  <a-space :size="8">
                    <span>2</span>
                    <default-text-box
                      placeholder=""
                      width="80px"
                    />
                  </a-space>
                  <a-space :size="8">
                    <span>3</span>
                    <default-text-box
                      placeholder=""
                      width="80px"
                    />
                  </a-space>
                </div>
              </DxField>
            </a-col>
          </a-row>
        </box-title>

        <box-title title="고용보험">
          <a-row>
            <a-col span="8">
              <DxField label="상시근로자수" :required="formData.employeeInsuranceEligibility">
                <text-number-box placeholder="" :required="formData.employeeInsuranceEligibility" />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="피보험자수" :required="formData.employeeInsuranceEligibility">
                <text-number-box placeholder="" :required="formData.employeeInsuranceEligibility" />
              </DxField>
            </a-col>
            <a-col span="8">
              <DxField label="성립일" :required="formData.employeeInsuranceEligibility">
                <date-time-box placeholder="" :required="formData.employeeInsuranceEligibility" />
              </DxField>
            </a-col>
          </a-row>
          <DxField label="주된사업장" ></DxField>
          <a-row>
            <a-col span="12">
              <DxField label="명칭">
                <default-text-box placeholder="" />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="사업자등록번호" class="field-custom">
                <biz-number-text-box placeholder="" />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="우선지원대상기업">
                <a-radio-group
                  :value="1"
                >
                  <a-radio :value="1">해당</a-radio>
                  <a-radio :value="2">미해당</a-radio>
                </a-radio-group>
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="주된사업장관리번호" class="field-custom">
                <text-number-box placeholder="" />
              </DxField>
            </a-col>
          </a-row>
        </box-title>
        <box-title title="산재보험">
          <a-row>
            <a-col span="12">
              <DxField label="상시근로자수" :required="formData.workerEligibility">
                <default-text-box
                  placeholder=""
                  :required="formData.workerEligibility"
                />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="성립일" :required="formData.workerEligibility">
                <date-time-box
                  placeholder=""
                  :required="formData.workerEligibility"
                />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="사업의형태" :required="formData.workerEligibility">
                <a-radio-group
                  :value="1"
                  :required="formData.workerEligibility"
                >
                  <a-radio :value="1">계속</a-radio>
                  <a-radio :value="2">기간이정해진사업</a-radio>
                </a-radio-group>
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="신고일현재 산재발생여부" :required="formData.workerEligibility" class="field-custom-auto">
                <a-radio-group
                  :value="2"
                  :required="formData.workerEligibility"
                >
                  <a-radio :value="1">있음</a-radio>
                  <a-radio :value="2">없음</a-radio>
                </a-radio-group>
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="주된사업장여부">
                <a-radio-group
                  :value="1"
                >
                  <a-radio :value="1">해당</a-radio>
                  <a-radio :value="2">미해당</a-radio>
                </a-radio-group>
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label="주된사업장관리번호" class="field-custom">
                <text-number-box placeholder="" />
              </DxField>
            </a-col>
            <a-col span="12">
              <DxField label=" 원사업주 사업장관리번호" class="field-custom-auto">
                <text-number-box placeholder="" />
              </DxField>
            </a-col>
          </a-row>
        </box-title>
      </a-row>

      <div class="d-flex justify-center mt-20">
        <button-basic
          :width="150"
          id="btn-save"
          @onClick="onSubmit($event)"
          style="margin: auto"
          mode="contained"
          type="default"
          text="4대보험 요청 등록"
        />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, watch} from 'vue'
import {useQuery} from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA8/PA810/index";
import {companyId} from "@/helpers/commonFunction";
import {useStore} from "vuex";
import INITIAL_FORM from "../utils";
import {useCompanyInfo} from "@/helpers/useCompanyInfo";
import {cloneDeep, isEqual} from "lodash";
import comfirmClosePopup from "@/utils/comfirmClosePopup";

export default defineComponent({
  components: {},
  props: {
    isOpenModalCreate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const store = useStore();
    const { infoCompany } = useCompanyInfo(companyId)
    const globalYear = computed(() => store.getters['settings/currentYear']);
    const employeeWages = ref();
    const employeeWageSelected = ref();
    const formRef = ref();
    const formData = ref({...INITIAL_FORM.INITIAL_FORM_PA870})
    const variables = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const {result: dataEmployeeWages, onResult: onResultEmployeeWages, refetch: refetchDataEmployeeWages} = useQuery(queries.getEmployeeWages, variables, () => ({
      fetchPolicy: "no-cache",
    }));
    onResultEmployeeWages((res) => {
      const data = res.data.getEmployeeWages;
      if (data?.length) {
        employeeWages.value = data;
      }
    })
    const isFormChange = computed(() => {
      return !isEqual(cloneDeep(INITIAL_FORM.INITIAL_FORM_PA870), cloneDeep(formData.value))
        || Boolean(employeeWageSelected.value)
    });
    const resetForm = () => {
      formData.value = cloneDeep(INITIAL_FORM.INITIAL_FORM_PA870)
      employeeWageSelected.value = null
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
    // watch listen props.isOpenModalCreate
    watch(() => props.isOpenModalCreate, (val) => {
      if (!val) {
        resetForm();
      }
    })
    const onSubmit = async (e: any) => {
      const res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      }
    }
    return {
      employeeWages,
      formData,
      onSubmit,
      employeeWageSelected,
      infoCompany,
      closePopup,
      formRef
    }
  },
})
</script>

<style scoped>
.gap-20 {
  gap: 20px;
}
</style>
