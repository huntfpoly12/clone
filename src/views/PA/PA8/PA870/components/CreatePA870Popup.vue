<template>
  <a-modal class="form-modal" width="60%" :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }" :visible="true"
    title="사업장가입신규신청" centered @cancel="closePopup" :footer="null" :mask-closable="false">
    <a-spin :spinning="myCompanyLoading" size="large">
      <standard-form ref="formRef">
        <a-row :gutter="[0, 0]" class="item-group mb-10">
          <box-title title="4대보험 적용 및 성립신고">
            <a-row>
              <a-col span="6">
                <checkbox-basic label="국민연금" v-model:valueCheckbox="formState.nationalPensionReport" />
              </a-col>
              <a-col span="6">
                <checkbox-basic label="건강보험" v-model:valueCheckbox="formState.healthInsuranceReport" />
              </a-col>
              <a-col span="6">
                <checkbox-basic label="고용보험" v-model:value-checkbox="formState.employeementInsuranceReport" />
              </a-col>
              <a-col span="6">
                <checkbox-basic label="산재보험" v-model:value-checkbox="formState.industrialAccidentInsuranceReport" />
              </a-col>
            </a-row>
          </box-title>
          <box-title title="고용, 산재보험 가입신청">
            <a-row>
              <a-col span="6">
                <checkbox-basic v-model:value-checkbox="formState.employeementInsuranceValidReport" label="고용보험가입" />
              </a-col>
              <a-col span="6">
                <checkbox-basic v-model:value-checkbox="formState.industrialAccidentInsuranceValidReport"
                  label="산재보험가입" />
              </a-col>
              <a-col span="12">
                <a-space :size="4">
                  <info-tool-tip>
                    해당사항이 있는 경우만 신청해 주세요.
                  </info-tool-tip>
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
                <DxField label="상호">
                  <default-text-box v-model:valueInput='formState.companyName' placeholder="성명" :disabled="true" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="사업장관리번호">
                  <text-number-box v-model:valueInput='formState.adding' placeholder="성명" :disabled="true" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="사업장형태">
                  <radio-group :arrayValue="companyTypeArr" v-model:valueRadioCheck="formState.companyType"
                    layoutCustom="horizontal" class="mt-1" :disabled="true"></radio-group>
                </DxField>
              </a-col>
            </a-row>
            <DxField label="주소">
              <default-text-box :disabled="true" v-model:valueInput='formState.companyAddress' placeholder="성명" />
            </DxField>
            <a-row>
              <a-col span="8">
                <DxField label="사업자등록번호">
                  <biz-number-text-box :disabled="true" v-model:valueInput='formState.companyBizNuber'
                    mess="이항목은 필수 입력사항입니다!" nameInput="companyBizNumber" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="법인등록번호">
                  <text-number-box :disabled="true" v-model:valueInput='formState.companyCorpRegNuber' placeholder="성명" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label=" 전화번호(유선)">
                  <tel-text-box v-model:vale-input="formState.companyTel" placeholder="성명" />
                </DxField>
              </a-col>
            </a-row>

            <a-row>
              <a-col span="8">
                <DxField label=" 휴대전화번호">
                  <tel-text-box :disabled="true" v-model:valueInput='formState.companyMobile' placeholder="성명" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="우편번호">
                  <text-number-box :disabled="true" v-model:valueInput='formState.companyPostNumber' placeholder="성명" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="FAX번호">
                  <text-number-box :disabled="true" v-model:valueInput='formState.companyFax' placeholder="성명" />
                </DxField>
              </a-col>
            </a-row>

            <a-row>
              <a-col span="8">
                <DxField label="업태">
                  <default-text-box v-model:valueInput='formState.companyUptae' placeholder="성명" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="종목">
                  <default-text-box v-model:valueInput='formState.companyjongmok' placeholder="성명" />
                </DxField>
              </a-col>
            </a-row>

            <a-row>
              <a-col span="8">
                <DxField label="환급계좌은행">
                  <default-text-box v-model:valueInput='formState.companyRefundBankName' placeholder="성명" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="환급계좌번호">
                  <default-text-box v-model:valueInput='formState.companyRefundAccountNumber' placeholder="성명" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="예금주명">
                  <default-text-box v-model:valueInput='formState.companyRefundAccountOwner' placeholder="성명" />
                </DxField>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="대표자">
            <a-row>
              <a-col span="8">
                <DxField label="성명">
                  <default-text-box v-model:valueInput='formState.presidentName' placeholder="성명" :disabled="true" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="주민등록번호" required>
                  <id-number-text-box v-model:valueInput="formState.presidentResidentNumber" placeholder="성명" required />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="전화번호">
                  <tel-text-box v-model:valueInput="formState.presidentTel" placeholder="성명" :disabled="true" />
                </DxField>
              </a-col>
            </a-row>

            <a-row>
              <a-col span="24">
                <DxField label="주소">
                  <default-text-box v-model:valueInput='formState.presidentAddress' placeholder="성명" :disabled="true" />
                </DxField>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="보험료자동이체신청">
            <a-row>
              <a-col span="12">
                <DxField label="은행명">
                  <default-text-box v-model:valueInput='formState.directDebitBankName' placeholder="성명" />
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="계좌번호" class="field-custom">
                  <text-number-box v-model:valueInput='formState.directDebitAccountNumber' placeholder="성명" />
                </DxField>
              </a-col>
            </a-row>
            <a-row>
              <a-col span="12">
                <DxField label="예금주명">
                  <default-text-box v-model:valueInput='formState.directDebitAccountOwner' placeholder="성명" />
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="예금주주민등록번호" class="field-custom">
                  <id-number-text-box v-model="formState.directDebitAccountOwnerResidentNumber" placeholder="성명" />
                </DxField>
              </a-col>
            </a-row>
            <a-row>
              <a-col span="12">
                <DxField label="합산자동이체적용여부">
                  <radio-group :arrayValue="combinedDirectDebitStatusArr"
                    v-model:valueRadioCheck="formState.combinedDirectDebitStatus" layoutCustom="horizontal"
                    class="mt-1"></radio-group>
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="이체 희망일">
                  <radio-group :arrayValue="directDebitDateTypeArr"
                    v-model:valueRadioCheck="formState.directDebitDateType" layoutCustom="horizontal"
                    class="mt-1"></radio-group>
                </DxField>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="전자고지신청">
            <a-row class="px-10 my-3">
              <a-col span="4">
                <checkbox-basic label="국민연금" v-model:valueCheckbox="formState.electronicNotificationEmail" />
              </a-col>
              <a-col span="4">
                <checkbox-basic label="건강보험" v-model:valueCheckbox="formState.electronicNotificationMobile" />
              </a-col>
              <a-col span="4">
                <checkbox-basic label="고용보험" v-model:value-checkbox="formState.electronicNotificationEdoc" />
              </a-col>
              <a-col span="4">
                <checkbox-basic label="산재보험" v-model:value-checkbox="formState.electronicNotificationWeb" />
              </a-col>
              <a-col span="8">
                <info-tool-tip>
                  신청하는 경우 아래 항목을 반드시 입력해 주세요.
                </info-tool-tip>
              </a-col>
            </a-row>

            <a-row>
              <DxField label="수신처 (전자우편주소, 휴대전화번호 또는 아이디)" class="field-custom-auto">
                <default-text-box v-model:valueInput='formState.electronicReceive' placeholder="성명" style="flex: 1" />
              </DxField>
            </a-row>

            <a-row>
              <a-col span="12">
                <DxField label="수신자명">
                  <default-text-box v-model:valueInput='formState.electronicReceiverName' placeholder="성명"
                    style="flex: 1" />
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="수신자주민등록번호" class="field-custom">
                  <id-number-text-box v-model:valueInput="formState.electronicReceiverResidentNumber" placeholder="성명"
                    style="flex: 1" />
                </DxField>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="국민연금/건강보험">
            <a-row>
              <a-col span="12">
                <DxField label="건설현장사업장해당여부" class="field-custom-auto">
                  <radio-group :arrayValue="constructionSiteWorkplaceArr"
                    v-model:valueRadioCheck="formState.constructionSiteWorkplace" layoutCustom="horizontal"
                    class="mt-1"></radio-group>
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="건설현장사업기간" class="field-custom">
                  <default-text-box v-model:valueInput='formState.constructionSiteBusinessPeriod' placeholder="성명" />
                </DxField>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="연금(고용)보험료지원신청">
            <div class="d-flex-center justify-content-around">
              <checkbox-basic label="국민연금" v-model:valueCheckbox="formState.nationalPensionSupport" />
              <checkbox-basic label="고용보험" v-model:valueCheckbox="formState.employeementInsuranceSupport" />
            </div>
          </box-title>

          <box-title title="국민연금">
            <a-row>
              <a-col span="8">
                <DxField label="근로자수" :required="formState.nationalPensionReport">
                  <number-box v-model:valueInput='formState.nationalPensionEmployeeCount' placeholder="성명"
                    :required="formState.nationalPensionReport" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="가입대상자수" :required="formState.nationalPensionReport">
                  <number-box v-model:valueInput='formState.nationalPensionEmployeeTargetNumber' placeholder="성명"
                    :required="formState.nationalPensionReport" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="적용연월일" :required="formState.nationalPensionReport">
                  <date-time-box :clearable="false" placeholder="성명" :required="formState.nationalPensionApplyDate" />
                </DxField>
              </a-col>
            </a-row>
            <a-row>
              <a-col span="12">
                <DxField label="분리적용사업장여부" :required="formState.nationalPensionReport" class="field-custom-auto">
                  <div class="d-flex gap-20">
                    <radio-group :arrayValue="nationalPensionSeparatelySiteStatusArr"
                      v-model:valueRadioCheck="formState.nationalPensionSeparatelySiteStatus" layoutCustom="horizontal"
                      class="mt-1" required></radio-group>
                  </div>
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="본점사업장관리번호" class="field-custom-auto">
                  <text-number-box v-model:valueInput='formState.nationalPensionSeparatelySiteManageNumber'
                    placeholder="성명" />
                </DxField>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="건강보험">
            <a-row>
              <a-col span="8">
                <DxField label="적용대상자수" :required="formState.healthInsuranceReport" class="field-custom-auto">
                  <number-box v-model:valueInput='formState.healthInsuranceEmployeeTargetNumber' placeholder="성명"
                    :required="formState.healthInsuranceReport" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="적용연월일" :required="formState.healthInsuranceReport" class="field-custom-auto">
                  <date-time-box :clearable="false" v-model:valueDate="formState.healthInsuranceApplyDate" placeholder="성명"
                    :required="formState.healthInsuranceReport" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="본점사업장관리번호" :required="formState.healthInsuranceReport" class="field-custom-auto">
                  <text-number-box v-model:valueInput='formState.healthInsuranceHeadOfficeManageNumber'
                    placeholder="성명" />
                </DxField>
              </a-col>
            </a-row>

            <a-row>
              <a-col span="12">
                <DxField label="사업장특성부호" class="field-custom-auto">
                  <default-text-box v-model:valueInput='formState.healthInsuranceSpecificCode' placeholder="" />
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="회계종목" class="field-custom-auto">
                  <div class="d-flex-center justify-content-around">
                    <a-space :size="8">
                      <span>1</span>
                      <default-text-box v-model:valueInput='formState.adding' placeholder="" width="80px" />
                    </a-space>
                    <a-space :size="8">
                      <span>2</span>
                      <default-text-box v-model:valueInput='formState.adding' placeholder="" width="80px" />
                    </a-space>
                    <a-space :size="8">
                      <span>3</span>
                      <default-text-box v-model:valueInput='formState.adding' placeholder="" width="80px" />
                    </a-space>
                  </div>
                </DxField>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="고용보험">
            <a-row>
              <a-col span="8">
                <DxField label="상시근로자수" :required="formState.employeementInsuranceReport">
                  <number-box v-model:valueInput='formState.employeementInsuranceFulltimeWorkerCount' placeholder=""
                    :required="formState.employeementInsuranceReport" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="피보험자수" :required="formState.employeementInsuranceReport">
                  <number-box v-model:valueInput='formState.employeementInsuranceEmployeeTargetNumber' placeholder=""
                    :required="formState.employeementInsuranceReport" />
                </DxField>
              </a-col>
              <a-col span="8">
                <DxField label="성립일" :required="formState.employeementInsuranceReport">
                  <date-time-box :clearable="false" placeholder="" :required="formState.employeementInsuranceApplyDate" />
                </DxField>
              </a-col>
            </a-row>
            <DxField label="주된사업장"></DxField>
            <a-row>
              <a-col span="12">
                <DxField label="명칭">
                  <default-text-box v-model:valueInput='formState.employeementInsuranceMainWorkplaceName'
                    placeholder="" />
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="사업자등록번호" class="field-custom">
                  <biz-number-text-box v-model:valueInput="formState.employeementInsuranceMainWorkplaceBizNumber"
                    placeholder="" />
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="우선지원대상기업">
                  <radio-group :arrayValue="nationalPensionSeparatelySiteStatusArr"
                    v-model:valueRadioCheck="formState.employeementInsuranceMainWorkplacePrioritySupport"
                    layoutCustom="horizontal" class="mt-1"></radio-group>
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="주된사업장관리번호" class="field-custom">
                  <text-number-box v-model:valueInput='formState.employeementInsuranceMainWorkplaceManageNumber'
                    placeholder="" />
                </DxField>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="산재보험">
            <a-row>
              <a-col span="12">
                <DxField label="상시근로자수" :required="formState.industrialAccidentInsuranceReport">
                  <number-box v-model:valueInput='formState.industrialAccidentInsuranceFulltimeWokerCount'
                    placeholder="" :required="formState.industrialAccidentInsuranceReport" />
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="성립일" :required="formState.industrialAccidentInsuranceReport">
                  <date-time-box :clearable="false" v-model:valueDate="formState.industrialAccidentInsuranceApplyDate" placeholder=""
                    :required="formState.industrialAccidentInsuranceReport" />
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="사업의형태" :required="formState.industrialAccidentInsuranceReport">
                  <radio-group :arrayValue="industrialAccidentInsuranceBusinessTypeArr"
                    v-model:valueRadioCheck="formState.industrialAccidentInsuranceBusinessType" layoutCustom="horizontal"
                    class="mt-1"></radio-group>
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="신고일현재 산재발생여부" :required="formState.industrialAccidentInsuranceReport"
                  class="field-custom-auto">
                  <radio-group :arrayValue="industrialAccidentInsuranceOccurrenceArr"
                    v-model:valueRadioCheck="formState.industrialAccidentInsuranceOccurrence" layoutCustom="horizontal"
                    class="mt-1"></radio-group>
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="주된사업장여부">
                  <radio-group :arrayValue="nationalPensionSeparatelySiteStatusArr"
                    v-model:valueRadioCheck="formState.industrialAccidentInsuranceMainWorkplace" layoutCustom="horizontal"
                    class="mt-1"></radio-group>
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label="주된사업장관리번호" class="field-custom">
                  <text-number-box v-model:valueInput='formState.industrialAccidentInsuranceMainWorkplaceBizNumber'
                    placeholder="" />
                </DxField>
              </a-col>
              <a-col span="12">
                <DxField label=" 원사업주 사업장관리번호" class="field-custom-auto">
                  <text-number-box v-model:valueInput='formState.industrialAccidentMainWorkplaceManageNumber'
                    placeholder="" />
                </DxField>
              </a-col>
            </a-row>
          </box-title>
        </a-row>

        <div class="d-flex justify-center mt-20">
          <button-basic :width="150" id="btn-save" @onClick="onSubmit($event)" style="margin: auto" mode="contained"
            type="default" text="4대보험 요청 등록" />
        </div>
      </standard-form>
    </a-spin>

  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA8/PA870/index";
import mutations from "@/graphql/mutations/PA/PA8/PA870/index";
import { companyId, makeDataClean } from "@/helpers/commonFunction";
import { useStore } from "vuex";
import INITIAL_FORM, {
  companyTypeArr, combinedDirectDebitStatusArr, directDebitDateTypeArr, constructionSiteWorkplaceArr, nationalPensionSeparatelySiteStatusArr,
  industrialAccidentInsuranceBusinessTypeArr, industrialAccidentInsuranceOccurrenceArr,
} from "../utils";
import { useCompanyInfo } from "@/helpers/useCompanyInfo";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import notification from '@/utils/notification';
import { getCurrentInstance } from 'vue';
import InfoToolTip from "@/components/common/InfoToolTip.vue";

export default defineComponent({
  components: {InfoToolTip},
  props: {
    isOpenModalCreate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const { infoCompany } = useCompanyInfo(companyId)
    const globalYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));
    const employeeWages = ref();
    const employeeWageSelected = ref();
    const formRef = ref();
    const formState = ref({ ...INITIAL_FORM.INITIAL_FORM_PA870 });
    const formStateToCompare = ref<any>({ ...INITIAL_FORM.INITIAL_FORM_PA870 });

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
        formState.value.companyName = data.name;
        formState.value.companyType = data.bizType;
        formState.value.companyAddress = data.address;
        formState.value.companyBizNuber = data.bizNumber;
        formState.value.companyCorpRegNuber = data.residentId;
        formState.value.companyTel = data.phone;
        formState.value.companyMobile = data.presidentMobilePhone;
        formState.value.companyPostNumber = data.extendInfo?.detail?.zipcode;
        formState.value.companyFax = data.fax;
        formState.value.presidentName = data.presidentName;
        formState.value.presidentResidentNumber = data.bizType === 2 ? data.residentId : '';
        formState.value.presidentTel = data.presidentMobilePhone;
        formState.value.presidentAddress = data.address;
        formStateToCompare.value = { ...formState.value };
      }
    });

    //-----------------------------API CREATE && FORM ACTION--------------------------------

    const messageCreate = messages.getCommonMessage('101').message;
    const { mutate: createCompanyJoinMutate, onDone: createCompanyJoinDone, onError: createCompanyJoinError } = useMutation(mutations.createMajorInsuranceCompanyJoin);
    createCompanyJoinDone((res: any) => {
      notification('success', messageCreate);
      emit('closeModal', true);
    })
    createCompanyJoinError((res: any) => {
      notification('error', res.message);
    })
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        let {adding,...sendData} = formState.value;
        makeDataClean(sendData, ['presidentResidentNumber']);
        createCompanyJoinMutate({ companyId: companyId, imputedYear: globalYear.value, input: sendData });
      }
    }

    const closePopup = () => {
      if (JSON.stringify(formStateToCompare.value) == JSON.stringify(formState.value)) {
        emit('closeModal')
      } else {
        comfirmClosePopup(() => {
          emit('closeModal')
        })
      }
    }
    return {
      employeeWages,
      formState,
      onSubmit,
      employeeWageSelected,
      infoCompany,
      closePopup,
      formRef,
      companyTypeArr, combinedDirectDebitStatusArr, directDebitDateTypeArr, constructionSiteWorkplaceArr, nationalPensionSeparatelySiteStatusArr,
      industrialAccidentInsuranceBusinessTypeArr, industrialAccidentInsuranceOccurrenceArr,
      myCompanyLoading
    }
  },
})
</script>

<style scoped>
.gap-20 {
  gap: 20px;
}
</style>
