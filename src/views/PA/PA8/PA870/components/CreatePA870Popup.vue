<template>
  <a-modal class="form-modal" width="1200px" :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }" :visible="true"
           title="사업장가입신규신청" centered @cancel="closePopup" :footer="null" :mask-closable="false">
    <a-spin :spinning="myCompanyLoading" size="large">
      <standard-form ref="formRef">
        <a-row :gutter="gutter" class="item-group mb-10">
          <box-title title="4대보험 적용 및 성립신고">
            <a-row :gutter="gutter" class="px-10">
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
          <box-title title="고용, 산재보험 가입신청" tooltip="해당사항이 있는 경우만 신청해 주세요.">
            <a-row :gutter="gutter" class="px-10">
              <a-col span="6">
                <checkbox-basic v-model:value-checkbox="formState.employeementInsuranceValidReport" label="고용보험가입" />
              </a-col>
              <a-col span="6">
                <div class="d-flex">
                  <checkbox-basic v-model:value-checkbox="formState.industrialAccidentInsuranceValidReport"
                                  label="산재보험가입" />
                </div>
              </a-col>
            </a-row>
          </box-title>
        </a-row>

        <a-row :gutter="gutter" class="item-group mb-10">
          <div class="mb-10">가입신고 기재항목</div>
          <box-title title="사업장">
            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="명칭" class="red">
                  <default-text-box v-model:valueInput='formState.companyName' placeholder="" />
                </a-form-item>
              </a-col>
              <!-- <a-col span="8">
                <a-form-item label="사업장관리번호">
                  <text-number-box v-model:valueInput='formState.adding' placeholder="" />
                </a-form-item>
              </a-col> -->
              <a-col span="8">
                <a-form-item label="사업장형태" class="red">
                  <radio-group :arrayValue="companyTypeArr" v-model:valueRadioCheck="formState.companyType"
                               layoutCustom="horizontal" class="mt-1" required></radio-group>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="소재지" class="red">
              <default-text-box v-model:valueInput='formState.companyAddress' placeholder="" required />
            </a-form-item>
            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="사업자등록번호" class="red">
                  <biz-number-text-box v-model:valueInput='formState.companyBizNuber'
                                       mess="이항목은 필수 입력사항입니다!" nameInput="companyBizNumber" required/>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="법인등록번호" class="red">
                  <id-number-text-box required v-model:valueInput='formState.companyCorpRegNuber' placeholder="" :isResidentId="false"/>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label=" 전화번호(유선)" class="red">
                  <tel-text-box v-model:valueInput="formState.companyTel" placeholder="" required/>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label=" 휴대전화번호">
                  <tel-text-box v-model:valueInput='formState.companyMobile' placeholder="" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="우편번호">
                  <text-number-box v-model:valueInput='formState.companyPostNumber' placeholder="" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="FAX번호">
                  <text-number-box v-model:valueInput='formState.companyFax' placeholder="" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="업태">
                  <default-text-box v-model:valueInput='formState.companyUptae' placeholder="" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="종목">
                  <default-text-box v-model:valueInput='formState.companyjongmok' placeholder="" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="환급계좌은행">
                  <default-text-box v-model:valueInput='formState.companyRefundBankName' placeholder="" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="환급계좌번호">
                  <number-box v-model:valueInput='formState.companyRefundAccountNumber' placeholder="" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="예금주명">
                  <default-text-box v-model:valueInput='formState.companyRefundAccountOwner' placeholder="" />
                </a-form-item>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="대표자">
            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="성명" class="red">
                  <default-text-box v-model:valueInput='formState.presidentName' placeholder="" required/>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="주민등록번호" class="red">
                  <id-number-text-box v-model:valueInput="formState.presidentResidentNumber" placeholder="" required />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="전화번호">
                  <tel-text-box v-model:valueInput="formState.presidentTel" placeholder="" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-col span="24">
                <a-form-item label="주소" class="red">
                  <default-text-box v-model:valueInput='formState.presidentAddress' placeholder="" required/>
                </a-form-item>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="보험료자동이체신청">
            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="은행명" >
                  <default-text-box v-model:valueInput='formState.directDebitBankName' placeholder="" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="계좌번호" class="field-custom">
                  <text-number-box v-model:valueInput='formState.directDebitAccountNumber' placeholder="" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="예금주주민등록번호" class="field-custom">
                  <id-number-text-box v-model="formState.directDebitAccountOwnerResidentNumber" placeholder="" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="예금주명" >
                  <default-text-box v-model:valueInput='formState.directDebitAccountOwner' placeholder="" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="합산자동이체적용여부" class="field-custom">
                  <radio-group :arrayValue="combinedDirectDebitStatusArr"
                               v-model:valueRadioCheck="formState.combinedDirectDebitStatus" layoutCustom="horizontal"
                               class="mt-1"></radio-group>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="이체 희망일" class="field-custom">
                  <radio-group :arrayValue="directDebitDateTypeArr"
                               v-model:valueRadioCheck="formState.directDebitDateType" layoutCustom="horizontal"
                               class="mt-1"></radio-group>
                </a-form-item>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="전자고지신청">
            <a-row :gutter="gutter" class="px-10 my-3">
              <a-col span="24" style="display: flex; align-items: center; padding: 3px 0">
                <span class="mr-30">고지방법:</span>
                <div class="mr-30">
                  <checkbox-basic label="전자우편" v-model:valueCheckbox="formState.electronicNotificationEmail" />
                </div>
                <div class="mr-30">
                  <checkbox-basic label="휴대전화" v-model:valueCheckbox="formState.electronicNotificationMobile" />
                </div>
                <div class="mr-30">
                  <checkbox-basic label="전자문서교환시스템" v-model:value-checkbox="formState.electronicNotificationEdoc" />
                </div>
                <div>
                  <checkbox-basic label="홈페이지" v-model:value-checkbox="formState.electronicNotificationWeb" />
                </div>
                <info-tool-tip>
                  신청하는 경우 아래 항목을 반드시 입력해 주세요.
                </info-tool-tip>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-form-item label="수신처 (전자우편주소, 휴대전화번호 또는 아이디)" class="field-custom-auto">
                <default-text-box v-model:valueInput='formState.electronicReceive' placeholder="" style="flex: 1" />
              </a-form-item>
            </a-row>

            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="수신자명" >
                  <default-text-box v-model:valueInput='formState.electronicReceiverName' placeholder=""
                                    style="flex: 1" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="수신자주민등록번호" class="field-custom">
                  <id-number-text-box v-model:valueInput="formState.electronicReceiverResidentNumber" placeholder=""
                                      style="flex: 1" />
                </a-form-item>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="국민연금/건강보험">
            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="건설현장사업장해당여부" class="field-custom-auto">
                  <radio-group :arrayValue="constructionSiteWorkplaceArr"
                               v-model:valueRadioCheck="formState.constructionSiteWorkplace" layoutCustom="horizontal"
                               class="mt-1"></radio-group>
                </a-form-item>
              </a-col>
              <a-col span="10">
                <a-form-item label="건설현장사업기간" class="field-custom">
<!--                  <default-text-box v-model:valueInput='formState.constructionSiteBusinessPeriod' placeholder="" />-->
                  <range-date-time-box
                    v-model:valueDate="formState.constructionSiteBusinessPeriod"
                    :multi-calendars="true"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="연금(고용)보험료지원신청">
            <p class="px-10">[국민연금법] 제100조의3 또는 [국민보험 및 산업재해보상보험의 보험료징수 등에 관한 법률] 제21조에 따라
                아래와 같이연금(고용)보험료 지원을 신청합니다.(근로자수가 10명 미만인 사업장만 해당합니다.) </p>
            <div class="d-flex-center justify-content-around" style="width: 200px; margin-left: 110px">
                <checkbox-basic label="국민연금" v-model:valueCheckbox="formState.nationalPensionSupport" />
                <checkbox-basic label="고용보험" v-model:valueCheckbox="formState.employeementInsuranceSupport" />
            </div>
          </box-title>

          <box-title title="국민연금">
            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="근로자수" :class="formState.nationalPensionReport ? 'red': ''" class="field-custom">
                  <number-box v-model:valueInput='formState.nationalPensionEmployeeCount' :min="0"
                              :class="formState.nationalPensionReport ? 'red': ''" :disabled="!formState.nationalPensionReport" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="가입대상자수" :class="formState.nationalPensionReport ? 'red': ''" class="field-custom">
                  <number-box v-model:valueInput='formState.nationalPensionEmployeeTargetNumber' :min="0"
                              :class="formState.nationalPensionReport ? 'red': ''" :disabled="!formState.nationalPensionReport" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="적용연월일" :class="formState.nationalPensionReport ? 'red': ''" >
                  <date-time-box :clearable="false" placeholder="" :required="formState.nationalPensionApplyDate" :disabled="!formState.nationalPensionReport" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="분리적용사업장여부" :class="formState.nationalPensionReport ? 'red': ''" class="field-custom-auto">
                  <div class="d-flex gap-20">
                    <radio-group :arrayValue="nationalPensionSeparatelySiteStatusArr"
                                 v-model:valueRadioCheck="formState.nationalPensionSeparatelySiteStatus" layoutCustom="horizontal"
                                 class="mt-1" required
                                 :disabled="!formState.nationalPensionReport"
                    />
                  </div>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="본점사업장관리번호" class="field-custom">
                  <text-number-box v-model:valueInput='formState.nationalPensionSeparatelySiteManageNumber'
                                   placeholder="" :disabled="!formState.nationalPensionReport" />
                </a-form-item>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="건강보험">
            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="적용대상자수" :class="formState.healthInsuranceReport ? 'red' : ''">
                  <number-box v-model:valueInput='formState.healthInsuranceEmployeeTargetNumber' :min="0" :class="formState.healthInsuranceReport ? 'red' : ''" :disabled="!formState.healthInsuranceReport" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="적용연월일" :class="formState.healthInsuranceReport ? 'red' : ''" class="field-custom">
                  <date-time-box :clearable="false" v-model:valueDate="formState.healthInsuranceApplyDate"
                                 placeholder="" :class="formState.healthInsuranceReport ? 'red' : ''" :disabled="!formState.healthInsuranceReport" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="본점사업장관리번호" class="field-custom-auto">
                  <text-number-box v-model:valueInput='formState.healthInsuranceHeadOfficeManageNumber'
                                   :min="0" :disabled="!formState.healthInsuranceReport" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="사업장특성부호">
                  <default-text-box v-model:valueInput='formState.healthInsuranceSpecificCode' :disabled="!formState.healthInsuranceReport" />
                </a-form-item>
              </a-col>
              <a-col span="16">
                <a-form-item label="회계종목(공무원 및 교직원기관만 작성)" class="field-custom-auto">
                  <div class="d-flex-center justify-content-around">
                    <a-space :size="8">
                      <span>1</span>
                      <default-text-box v-model:valueInput='formState.adding' :disabled="!formState.healthInsuranceReport" width="80px" />
                    </a-space>
                    <a-space :size="8">
                      <span>2</span>
                      <default-text-box v-model:valueInput='formState.adding' :disabled="!formState.healthInsuranceReport" width="80px" />
                    </a-space>
                    <a-space :size="8">
                      <span>3</span>
                      <default-text-box v-model:valueInput='formState.adding' :disabled="!formState.healthInsuranceReport" width="80px" />
                    </a-space>
                  </div>
                </a-form-item>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="고용보험">
            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="상시근로자수" :class="formState.employeementInsuranceReport ? 'red' : ''">
                  <number-box v-model:valueInput='formState.employeementInsuranceFulltimeWorkerCount' :min="0"
                              :class="formState.employeementInsuranceReport ? 'red' : ''" :disabled="!formState.employeementInsuranceReport" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="피보험자수" :class="formState.employeementInsuranceReport ? 'red' : ''" class="field-custom">
                  <number-box v-model:valueInput='formState.employeementInsuranceEmployeeTargetNumber' :min="0"
                              :class="formState.employeementInsuranceReport ? 'red' : ''" :disabled="!formState.employeementInsuranceReport"/>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="성립일" :class="formState.employeementInsuranceReport ? 'red' : ''">
                  <date-time-box :clearable="false" placeholder="" :required="formState.employeementInsuranceApplyDate"
                                 :disabled="!formState.employeementInsuranceReport"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="주된사업장" />
            <a-row :gutter="gutter">
              <a-col span="8" class="">
                <a-form-item label="명칭" class="" styleLabel="padding-left: 15px">
                  <default-text-box v-model:valueInput='formState.employeementInsuranceMainWorkplaceName'
                                    :disabled="!formState.employeementInsuranceReport" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="사업자등록번호" class="field-custom">
                  <biz-number-text-box v-model:valueInput="formState.employeementInsuranceMainWorkplaceBizNumber"
                                       :disabled="!formState.employeementInsuranceReport" />
                </a-form-item>
              </a-col>
              <a-col span="8" />
              <a-col span="8">
                <a-form-item label="우선지원대상기업" class="field-custom" styleLabel="padding-left: 15px">
                  <radio-group :arrayValue="nationalPensionSeparatelySiteStatusArr"
                               v-model:valueRadioCheck="formState.employeementInsuranceMainWorkplacePrioritySupport"
                               layoutCustom="horizontal" class="mt-1"
                               :disabled="!formState.employeementInsuranceReport"
                  />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="주된사업장관리번호" class="field-custom">
                  <text-number-box v-model:valueInput='formState.employeementInsuranceMainWorkplaceManageNumber'
                                   :disabled="!formState.employeementInsuranceReport" />
                </a-form-item>
              </a-col>
            </a-row>
          </box-title>

          <box-title title="산재보험">
            <a-row :gutter="gutter">
              <a-col span="8">
                <a-form-item label="상시근로자수" :class="formState.industrialAccidentInsuranceReport ? 'red' : ''">
                  <number-box v-model:valueInput='formState.industrialAccidentInsuranceFulltimeWokerCount' :min="0"
                              :class="formState.industrialAccidentInsuranceReport ? 'red' : ''" :disabled="!formState.industrialAccidentInsuranceReport"/>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="성립일" class="field-custom" :class="formState.industrialAccidentInsuranceReport ? 'red' : ''">
                  <date-time-box :clearable="false" v-model:valueDate="formState.industrialAccidentInsuranceApplyDate"
                                 placeholder="" :class="formState.industrialAccidentInsuranceReport ? 'red' : ''"
                                 :disabled="!formState.industrialAccidentInsuranceReport"
                    />
                </a-form-item>
              </a-col>
              <a-col span="6">
                <a-form-item label="사업종류코드" >
                  <default-text-box v-model:valueInput='formState.industrialAccidentInsuranceBusinessTypeCode'
                                    placeholder=""
                                    :disabled="!formState.industrialAccidentInsuranceReport"
                  />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="사업의형태"  :class="formState.industrialAccidentInsuranceReport ? 'red' : ''">
                  <radio-group :arrayValue="industrialAccidentInsuranceBusinessTypeArr"
                               v-model:valueRadioCheck="formState.industrialAccidentInsuranceBusinessType" layoutCustom="horizontal"
                               class="mt-1"
                               :disabled="!formState.industrialAccidentInsuranceReport"
                  />
                </a-form-item>
              </a-col>
              <a-col span="10">
                <a-form-item label="신고일현재 산재발생여부" :class="formState.industrialAccidentInsuranceReport ? 'red' : ''"
                         class="field-custom">
                  <radio-group :arrayValue="industrialAccidentInsuranceOccurrenceArr"
                               v-model:valueRadioCheck="formState.industrialAccidentInsuranceOccurrence" layoutCustom="horizontal"
                               class="mt-1"
                               :disabled="!formState.industrialAccidentInsuranceReport"
                  />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="주된사업장여부" >
                  <radio-group :arrayValue="nationalPensionSeparatelySiteStatusArr"
                               v-model:valueRadioCheck="formState.industrialAccidentInsuranceMainWorkplace" layoutCustom="horizontal"
                               class="mt-1"
                               :disabled="!formState.industrialAccidentInsuranceReport"
                  />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item label="주된사업장관리번호" class="field-custom">
                  <text-number-box v-model:valueInput='formState.industrialAccidentInsuranceMainWorkplaceBizNumber'
                                   :disabled="!formState.industrialAccidentInsuranceReport" />
                </a-form-item>
              </a-col>
              <a-col span="16">
                <a-form-item label="원사업주 사업장관리번호 또는 사업개시번호 (사내하도급 수급사업주인 경우만 적습니다)" class="">
                  <div class="d-flex justify-content-end">
                    <text-number-box v-model:valueInput='formState.industrialAccidentMainWorkplaceManageNumber'
                                   :disabled="!formState.industrialAccidentInsuranceReport" width="180px" />
                  </div>
                </a-form-item>
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
import { useCompanyInfo } from "@/utils/useCompanyInfo";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import notification from '@/utils/notification';
import { getCurrentInstance } from 'vue';
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import NumberBox from "@/components/common/NumberBox.vue";
import IdNumberTextBox from "@/components/common/IdNumberTextBox.vue";

export default defineComponent({
  components: {IdNumberTextBox, NumberBox},
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
        formState.value.companyFax = data.extendInfo?.detail?.fax;
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
      formState.value = cloneDeep(INITIAL_FORM.INITIAL_FORM_PA870)
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
        let { adding,constructionSiteBusinessPeriod, ...sendData } = formState.value;
        const convertConstructionSiteBusinessPeriod = `${constructionSiteBusinessPeriod[0]}-${constructionSiteBusinessPeriod[1]}`
        makeDataClean(sendData, ['presidentResidentNumber']);
        createCompanyJoinMutate({ companyId: companyId, imputedYear: globalYear.value, input: {...sendData, constructionSiteBusinessPeriod: convertConstructionSiteBusinessPeriod} });
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
      myCompanyLoading,
      gutter: [16, 0]
    }
  },
})
</script>

<style lang="scss" scoped>
.gap-20 {
  gap: 20px;
}
.mr-30 {
  margin-right: 30px;
}
:deep .popper {
  width: 245px;
}
.label-custom {
  :deep(.ant-form-item-label ) {
    label {
      min-width: 150px;
    }
  }
}
:deep(.ant-form-item-label ) {
  label {
    min-width: 110px;
  }
}
</style>
