<template>
  <a-modal class="form-modal" width="60%" :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }" :visible="true"
    title="사업장탈퇴신규신청" centered @cancel="onCanCelModal" :footer="null">
    <a-spin :spinning="myCompanyLoading">
      <standard-form>
        <div class="form-container">
          <div class="item-wrap">
            <span class="item-wrap-title">4대보험 탈퇴신고</span>
            <a-row>
              <div class="check-box-group">
                <checkbox-basic size="14" label="국민연금" class="mr-10 mx-10"
                  v-model:valueCheckbox="formState.nationalPensionReport" />
                <checkbox-basic size="14" label="건강보험" class="mr-10"
                  v-model:valueCheckbox="formState.healthInsuranceReport" />
                <checkbox-basic size="14" label="고용보험" v-model:valueCheckbox="formState.employeementInsuranceReport" />
                <checkbox-basic size="14" label="산재보험"
                  v-model:valueCheckbox="formState.industrialAccidentInsuranceReport" />
              </div>

            </a-row>
          </div>

          <div>가입신고 기재항목</div>

          <div class="item-wrap">
            <span class="item-wrap-title">사업장</span>
            <a-row>
              <a-col :span="8">
                <a-form-item label="명칭" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.companyName" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="사업자등록번호" label-align="right" class="red">
                  <biz-number-text-box width="200px" :disabled="true" v-model:valueInput="formState.companyBizNuber" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="전화번호" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.companyTel" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="mt-10">
              <a-col :span="24">
                <a-form-item label="소재지" label-align="right" class="red">
                  <default-text-box width="550px" :disabled="true" v-model:valueInput="formState.companyAddress"
                    :required="true" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="mt-10">
              <a-col :span="8">
                <a-form-item label="우편번호" label-align="right">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.companyPostNumber"
                    />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="법인등록번호" label-align="right">
                  <id-number-text-box width="200px" :disabled="true" v-model:valueInput="formState.companyCorpRegNuber"
                    />
                </a-form-item>
              </a-col>
            </a-row>
          </div>

          <div class="item-wrap">
            <span class="item-wrap-title">대표자</span>
            <a-row>
              <a-col :span="8">
                <a-form-item label="성명" label-align="right" class="red">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.presidentName"
                    :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="주민등록번호" label-align="right" class="red">
                  <id-number-text-box width="200px" :disabled="myCompanyResult?.getMyCompany?.bizType == 2"
                    v-model:valueInput="formState.presidentResidentNumber" :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="전화번호" label-align="right">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.presidentTel" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="mt-10">
              <a-col :span="16" class="pr-10">
                <a-form-item label="주소" label-align="right" class="red">
                  <default-text-box :disabled="true" v-model:valueInput="formState.presidentAddress" :required="true" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="우편번호" label-align="right">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.companyPostNumber" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>

          <div class="item-wrap">
            <span class="item-wrap-title">신고사유</span>
            <a-row>
              <a-col :span="16">
                <a-form-item label="공통사항" label-align="right" class="red">
                  <radio-group :arrayValue="employeeFashionArr" v-model:valueRadioCheck="formState.reportReason"
                    layoutCustom="horizontal" class="mt-1" :required="true"></radio-group>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="연금건강" label-align="right">
                  <checkbox-basic size="14" label="휴업" class="mr-10" v-model:valueCheckbox="formState.isShutdown" />
                  <checkbox-basic size="14" label="근로자없음" class="mr-10" v-model:valueCheckbox="formState.isNoWorker" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="mt-10">
              <a-col :span="16">
                <a-form-item label="고용산재" label-align="right">
                  <checkbox-basic size="14" label="근로자없이 1년경과 여부" v-model:valueCheckbox="formState.is1YearWithoutWorker"
                    class="mx-0" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="사유발생일" label-align="right" class="red">
                  <date-time-box text="지" v-model:valueDate="formState.issueDate" bgColor="white" :clearable="false" width="200px" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="mt-10">
              <a-col :span="16" class="pr-10">
                <a-form-item label="탈퇴후 우편물 수령지" label-align="right">
                  <default-text-box v-model:valueInput="formState.afterReportPostAddress" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="우편번호" label-align="right">
                  <default-text-box :lengthFixed="5" :maxCharacter="5" :lengthFixMsg="lenFixedMsg"  width="200px" v-model:valueInput="formState.afterReportPostNumber" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>

          <div class="item-wrap">
            <span class="item-wrap-title">국민연금</span>
            <a-row>
              <a-col :span="8">
                <a-form-item label="휴업기간" label-align="right">
                  <default-text-box width="200px" v-model:valueInput="formState.nationalPensionClosingPeriod" />
                </a-form-item>
              </a-col>
            </a-row>
            <div class="mt-10">통폐합 시 흡수하는 사업장:</div>
            <a-row class="mt-10 ml-40" :justify="'space-between'">
              <a-col span="15" >
                <a-form-item label="명칭" label-align="right">
                  <default-text-box width="200px" v-model:valueInput="formState.nationalPensionIntegrasionCompanyName" />
                </a-form-item>
              </a-col>
              <a-col span="9"  class="">
                <a-form-item label="사업장관리번호" label-align="right">
                  <ManageIdTextBox width="200px" v-model:valueInput="formState.manageId"/>
                </a-form-item>
              </a-col>
              <a-col  span="23" class="mt-15">
                <a-form-item label="소재지" label-align="right" class="pr-10">
                  <default-text-box v-model:valueInput="formState.nationalPensionIntegrasionCompanyAddress" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>

          <div class="item-wrap">
            <span class="item-wrap-title">건강보험</span>
            <a-row>
              <a-col :span="8">
                <a-form-item label="근로자수" label-align="right" :class="{ red: formState.healthInsuranceReport }">
                  <number-box width="200px" v-model:valueInput="formState.healthInsuranceEmployeeNumber"
                    :required="formState.healthInsuranceReport"/>
                </a-form-item>
              </a-col>
            </a-row>
          </div>

          <div class="item-wrap">
            <span class="item-wrap-title">고용산재</span>
            <a-row>
              <a-col :span="6">
                <a-form-item label="고용보험" label-align="right">
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item label="근로자수" label-align="right" :class="{ red: formState.employeementInsuranceReport }">
                  <number-box width="200px" v-model:valueInput="formState.employeementInsuranceEmployeeNumber"
                    :required="formState.employeementInsuranceReport" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="소멸일" label-align="right" :class="{ red: formState.employeementInsuranceReport }">
                  <date-time-box width="200px" text="지" v-model:valueDate="formState.employeementInsuranceCloseDate"
                    bgColor="white" :clearable="false" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="6">
                <a-form-item label="산재보험" label-align="right">
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item label="근로자수" label-align="right"
                  :class="{ red: formState.industrialAccidentInsuranceReport }">
                  <number-box width="200px" v-model:valueInput="formState.industrialAccidentInsuranceEmployeeNumber"
                    :required="formState.industrialAccidentInsuranceReport" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="소멸일" label-align="right"
                  :class="{ red: formState.industrialAccidentInsuranceReport }">
                  <date-time-box width="200px" text="지" v-model:valueDate="formState.industrialAccidentInsuranceCloseDate"
                    bgColor="white" :clearable="false" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="6">
                <a-form-item label="보험료정산반환 계좌" label-align="right">
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item label="은행명" label-align="right">
                  <default-text-box width="200px" v-model:valueInput="formState.companyRefundBankName" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="계좌번호" label-align="right">
                  <default-text-box width="202px" v-model:valueInput="formState.companyRefundAccountNumber" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>

          <a-row class="mt-15">
            <a-col :span="8" :offset="8" style="text-align: center;">
              <button-basic text="4대보험 요청 등록" type="default" mode="contained" :width="140" id="btn-save"
                @onClick="onSubmit($event)" />
            </a-col>
          </a-row>
        </div>
      </standard-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import mutations from "@/graphql/mutations/PA/PA8/PA880/index";
import queries from "@/graphql/queries/PA/PA8/PA880/index";
import { companyId, makeDataClean } from "@/helpers/commonFunction";
import {
  DeleteOutlined,
  HistoryOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import {
  employeeFashionArr, nationaPersionSelectbox, healthInsuranceSelectbox, employeeFashionArr2,
  includeDependentsSelectbox,
} from "../utils/index";
import { useMutation, useQuery } from "@vue/apollo-composable";
import dayjs from "dayjs";
import DxButton from "devextreme-vue/button";
import { DxColumn, DxDataGrid, DxScrolling } from "devextreme-vue/data-grid";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  ref,
  watch,
} from "vue";
import notification from "@/utils/notification";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
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
  // props: {
  //   workId: {
  //     type: Number,
  //     default: NaN,
  //   }
  // },
  setup(props, { emit }) {
    const globalYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const lenFixedMsg = messages.getCommonMessage('105').message;
    const formState = reactive({
      companyName: '',
      companyBizNuber: '',
      companyTel: '',
      companyAddress: '',
      companyPostNumber: '',
      companyCorpRegNuber: '',
      presidentResidentNumber: '',
      presidentTel: '',
      presidentAddress: '',
      reportReason: 1,
      isShutdown: true,
      isNoWorker: true,
      is1YearWithoutWorker: true,
      issueDate: +dayjs().format('YYYYMMDD'),
      afterReportPostAddress: '',
      afterReportPostNumber: '',
      nationalPensionClosingPeriod: '',
      nationalPensionIntegrasionCompanyName: '',
      nationalPensionIntegrasionCompanyAddress: '',
      healthInsuranceEmployeeNumber: '',
      employeementInsuranceEmployeeNumber: '',
      employeementInsuranceCloseDate: +dayjs().format('YYYYMMDD'),
      industrialAccidentInsuranceEmployeeNumber: '',
      industrialAccidentInsuranceCloseDate: +dayjs().format('YYYYMMDD'),
      companyRefundBankName: '',
      companyRefundAccountNumber: '',
      presidentName: '',
      nationalPensionReport: true,
      healthInsuranceReport: true,
      employeementInsuranceReport: true,
      industrialAccidentInsuranceReport: true,
      reportDate: +dayjs().format('YYYYMMDD'),
      manageId:'',
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
        formState.companyName = data.name;
        formState.companyBizNuber = data.bizNumber;
        formState.companyTel = data.phone;
        formState.companyAddress = data.address;
        formState.companyPostNumber = data.extendInfo?.detail?.zipcode;
        formState.companyCorpRegNuber = data.residentId;
        formState.presidentName = data.presidentName;
        formState.presidentResidentNumber = data.bizType === 2 ? data.residentId : '';
        formState.presidentTel = data.presidentMobilePhone;
        formState.presidentAddress = data.address;
        formStateToCompare.value = { ...formState };
      }
    });

    //-------------------------- get getMajorInsuranceConsignStatus-----------------------

    const {
      result: majorStatusResult,
    } = useQuery(
      queries.getMajorInsuranceConsignStatus,
      myCompanyParam,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    watch(majorStatusResult, (value) => {
      if (value) {
        let data = value.getMajorInsuranceConsignStatus;
        formState.manageId = data.manageId;
        formStateToCompare.value = { ...formState };
      }
    });

    //------------------------------CHECK VALIDATE-----------------------------

    watch(() => formState.employeementInsuranceReport, (newVal) => {
      if (newVal) {
        formState.employeementInsuranceCloseDate = +dayjs().format('YYYYMMDD');
      } else {
        formState.employeementInsuranceCloseDate = NaN;
      }
    }, { immediate: true })
    watch(() => formState.industrialAccidentInsuranceReport, (newVal) => {
      if (newVal) {
        formState.industrialAccidentInsuranceCloseDate = +dayjs().format('YYYYMMDD');
      } else {
        formState.industrialAccidentInsuranceCloseDate = NaN;
      }
    }, { immediate: true })
    
    //-----------------------------API CREATE && FORM ACTION--------------------------------

    const messageCreate = messages.getCommonMessage('101').message;
    const { mutate: createCompanyOutMutate, onDone: createCompanyOutDone, onError: createCompanyOutError } = useMutation(mutations.createMajorInsuranceCompanyOut);
    createCompanyOutDone((res: any) => {
      notification('success', messageCreate);
      emit('onCreateModal', true);
    })
    createCompanyOutError((res: any) => {
      notification('error', res.message);
    })
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        let {manageId,...formatData} = formState
        makeDataClean(formatData, ['presidentResidentNumber']);
        createCompanyOutMutate({ companyId: companyId, imputedYear: globalYear.value, input: formatData });
      }
    }

    // ---------------------------------ON CANCEL MODAL--------------------------------

    const onCanCelModal = () => {
      if (JSON.stringify(formStateToCompare.value) == JSON.stringify(formState)) {
        emit('onCreateModal', false);
      } else {
        comfirmClosePopup(() => emit('onCreateModal', false))
      }
    }
    return {
      globalYear,
      employeeFashionArr, employeeFashionArr2, nationaPersionSelectbox, healthInsuranceSelectbox, includeDependentsSelectbox,
      formState, onSubmit,
      // isDisabled1, isDisabled2,
      onCanCelModal, myCompanyLoading, myCompanyResult,
      lenFixedMsg,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
</style>
