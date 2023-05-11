<template>
  <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="1600">
    <div class="mt-20" :key="countKey">
      <standard-form formName="ac-120-form-add" ref="refFormAddAC120" class="text-align-center mt-20">
        <h2>전표 건별 등록</h2>
        <!-- <a-row class="row-1">
            <a-col :span="14" class="col-2">


                <a-form-item v-if="statusShowLetterOfApprovalType" class="red" label="품의종류">
                    <radio-group :arrayValue="store.state.common.ac120.arrLetterOfApprovalType"
                        :layoutCustom="'horizontal'" :required="true"
                        v-model:valueRadioCheck="formDataAdd.letterOfApprovalType" />
                </a-form-item>
            </a-col>
        </a-row> -->

        <a-row class="mt-20">
          <a-col :span="7" class="col-1">
            <a-form-item class="red" label="결의일자">
              <!-- <date-time-box width="150px" :required="true"
                  v-model:valueDate="formDataAdd.resolutionDate" /> -->
              <date-time-box-custom @handleClosed="handleClosed" width="190px" :required="true" :startDate="startDate"
                                    ref="requiredTransactionDetailDate" :finishDate="finishDate"
                                    v-model:valueDate="formDataAdd.transactionDetailDate" />
            </a-form-item>


            <a-form-item class="red" label="결의서 종류">
              <radio-group :arrayValue="store.state.common.ac120.arrResolutionType"
                           :layoutCustom="'horizontal'" :required="true"
                           v-model:valueRadioCheck="formDataAdd.resolutionType"
                           @update:valueRadioCheck="changeRadioResolutionType" />
            </a-form-item>

            <!-- <div class="input_info">
                <a-form-item label="결의서 종류">
                    <default-text-box
                        :valueInput="store.state.common.ac120.arrResolutionType.find((item: any) => formDataAdd.resolutionType == item.id)?.text"
                        width="100px" placeholder="여입" disabled="true" />
                </a-form-item>
            </div> -->
          </a-col>
          <a-col :span="6" class="col-2">
            <a-form-item class="red" label="통장">
              <select-box-common placeholder="선택" :arrSelect="store.state.common.ac120.arrayBankbooks"
                                 v-model:valueInput="formDataAdd.bankbookId" :required="true" :width="150" />
            </a-form-item>
            <a-form-item class="red" label="금액">
              <number-box-money :width="150" :required="true" :min="0" v-model:valueInput="formDataAdd.amount"
                                placeholder="금액" />
            </a-form-item>


            <!-- <a-form-item label="결의일자" class="red">
                <date-time-box :teleport="true"
                    v-model:valueDate="store.state.common.ac120.transactionDetailDate" width="150px"
                    :required="true" disabled="true" />
            </a-form-item> -->

            <!-- <a-form-item label="통장" class="red">
                <default-text-box v-model:valueInput="bankbookNickname" width="150px"
                    style="margin-right: 10px;" :required="true" disabled="true" />
            </a-form-item> -->
          </a-col>
          <a-col :span="6" class="col-3">
            <a-form-item class="red" label="적요">
              <default-text-box :width="150" :required="true" v-model:valueInput="formDataAdd.summary"
                                placeholder="적요" />
            </a-form-item>
            <a-form-item class="red" label="자금원천">
              <FundingSourceSelect placeholder="선택" :width="150" :required="true"
                                   v-model:valueInput="formDataAdd.fundingSource" />
            </a-form-item>
            <!-- <a-form-item label="금액" class="red">
                <number-box-money v-model:valueInput="formDataAdd.amount" width="150px"
                    :required="true" :spinButtons="false" disabled="true" />
            </a-form-item> -->

            <!-- <a-form-item label="적요" class="red">
                <default-text-box v-model:valueInput="formDataAdd.summary" width="150px"
                    :required="true" />
            </a-form-item> -->
          </a-col>
          <a-col :span="5" class="col-4">
            <!-- <a-form-item label="계정과목" class="red">
                <account-code-select :key="resetSelectAccount" :classification="classification"
                    v-model:valueInput="formDataAdd.accountCode" width="190px"
                    :required="true" />
            </a-form-item> -->
            <!-- <a-form-item label="자금원천" class="red">
                <FundingSourceSelect v-model:valueInput="formDataAdd.fundingSource"
                    width="190px" :required="true" />
            </a-form-item> -->
            <a-form-item label="결의구분">
              <default-text-box
                :valueInput="store.state.common.ac120.arrResolutionClassification.find((item: any) => formDataAdd.resolutionClassification == item.id)?.text"
                width="150px" placeholder="지출" disabled="true" />
            </a-form-item>
            <a-form-item label="계정과목" class="red">
              <account-code-select :key="resetSelectAccount" :classification="classification"
                                   v-model:valueInput="formDataAdd.accountCode" width="190px" :required="true" />
            </a-form-item>
          </a-col>
          <a-col :span="7" class="col-1">
            <a-form-item label="원인행위일자" class="red" :class="colorDate">
              <date-time-box :teleport="true" v-model:valueDate="formDataAdd.causeActionDate" width="150px"
                             :required="true" ref="requiredCauseActionDate" />
            </a-form-item>

            <a-form-item label="결재일자">
              <date-time-box :teleport="true" v-model:valueDate="formDataAdd.paymentDate" width="150px" />
            </a-form-item>
            <a-form-item label="발의일자">
              <date-time-box :teleport="true" v-model:valueDate="formDataAdd.proposedDate" width="150px" />
            </a-form-item>
          </a-col>
          <a-col :span="6" class="col-2">
            <!-- <a-form-item :label="null" style="margin-left: 75px;">
                <default-text-box v-model:valueInput="bankbookNumber" width="150px" :required="true"
                    disabled="true" />
            </a-form-item> -->

            <a-form-item label="출납일자" class="abc">
              <date-time-box :teleport="true" v-model:valueDate="formDataAdd.accountingDate" width="150px" />
            </a-form-item>
            <a-form-item label="등기일자">
              <date-time-box :teleport="true" v-model:valueDate="formDataAdd.registrationDate"
                             width="150px" />
            </a-form-item>
          </a-col>
          <a-col :span="6" class="col-3">
            <a-form-item label="거래처">
              <customer-select :disabled="formDataAdd.resolutionClassification == 1" v-model:valueInput="formDataAdd.clientId" width="150px" />
            </a-form-item>
            <div class="input_info">
              <a-form-item :label="textLabelInputSource">
                <default-text-box v-model:valueInput="formDataAdd.source" width="150px" />
              </a-form-item>
              <a-tooltip placement="top" color="black" class="fz-10 ml-10 mb-5">
                <template #title>기본값은 [회계설정 > 회계기타] 메뉴에서 입력된 결의서 {{ textLabelInputSource
                  }}
                  을
                  참조합니다.</template>
                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
              </a-tooltip>
            </div>
            <div class="input_info">
              <a-form-item label="작성자">
                <default-text-box v-model:valueInput="formDataAdd.writer" width="150px" />
              </a-form-item>
              <a-tooltip placement="top" color="black" class="fz-10 ml-10 mb-5">
                <template #title>기본값은 [회계설정 > 회계기타] 메뉴에서 입력된 결의서 작성자를 참조합니다.</template>
                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
              </a-tooltip>
            </div>
          </a-col>
          <a-col :span="5" class="col-4">
            <a-form-item label="상대계정">
              <account-code-select v-model:valueInput="formDataAdd.relationCode" width="190px" />
            </a-form-item>
            <a-form-item label="메모">
              <!-- <default-text-box v-model:valueInput="formDataAdd.memo"
                              width="150px" height="60px" /> -->
              <text-area-box width="190px" v-model:valueInput="formDataAdd.memo" :height="60" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <div> -->
        <a-row>
          <a-col :span="24">
            <div class="top-content mb-10 mt-10">
              <a-typography-title :level="5" style="margin-bottom: 0;">품의서
                <a-tooltip color="black" placement="top">
                  <template #title>지출결의서 기재 사항</template>
                  <img src="@/assets/images/iconInfo.png" class="img-info" />
                </a-tooltip>
              </a-typography-title>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item class="red" label="품의종류">
              <radio-group :disabled="formDataAdd.resolutionClassification == 1"
                           v-model:valueRadioCheck="formDataAdd.letterOfApprovalType"
                           :arrayValue="store.state.common.ac120.arrLetterOfApprovalType" :layoutCustom="'horizontal'" :required="true" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="물품내역수">
              <default-text-box :disabled="true"
                                v-model:valueInput="formDataAdd.goodsCount" width="150px" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item label="품의 원인 및 용도">
              <text-area-box :disabled="formDataAdd.resolutionClassification == 1" v-model:valueInput="formDataAdd.causeUsage"
                             :height="50" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- </div> -->
        <div class="mt-10"><span>전표를 등록하시겠습니까?</span></div>
        <div class="mt-20">
          <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                        @onClick="cancel" />
          <button-basic class="button-form-modal" :text="'네. 등록합니다'" :type="'default'" :mode="'contained'"
                        @onClick="submit" />
        </div>
      </standard-form>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import queries from "@/graphql/queries/CM/CM120";
import { useQuery, useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/AC/AC1/AC120";
import { companyId } from "@/helpers/commonFunction";
import { useStore } from 'vuex';
import dayjs from "dayjs";
import notification from '@/utils/notification';
import { Message } from "@/configs/enum"
import filters from "@/helpers/filters";
import { initialStateFormData } from '../utils/index'
// import comfirmClosePopup from '@/utils/comfirmClosePopup';
import { ResolutionType, LetterOfApprovalType, ResolutionClassification, FundingSource, enum2Entries } from "@bankda/jangbuda-common";
import DateTimeBoxCustom from '@/components/common/DateTimeBoxCustom.vue';
export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
      default: false,
    },
    theOrder: {
      type: Number,
      default: 0,
    },
  },
  components: {
    DateTimeBoxCustom
  },

  setup(props, { emit }) {
    const store = useStore();
    const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
    const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));
    const countKey = ref<number>(0)
    const resetSelectAccount = ref<number>(0)
    const classification = ref<any>([4])
    const refFormAddAC120 = ref()
    const requiredTransactionDetailDate = ref()
    const requiredCauseActionDate = ref()
    let bankbookNickname = ref<string>('')
    let bankbookNumber = ref<string>('')
    const textLabelInputSource = ref<string>('수입원')
    let colorDate = ref()
    const dataQueryGetBankBooks = ref({
      companyId: companyId,
      fiscalYear: acYear.value,
    })
    let formDataAdd: any = ref({ ...initialStateFormData });
    const statusShowLetterOfApprovalType = ref(false)
    const triggerBankbooks = ref<boolean>(true);

    const startDate = ref(dayjs(`${acYear.value}-${store.state.common.ac120.monthSelected}`).startOf('month').toDate());
    const finishDate = ref(dayjs(`${acYear.value}-${store.state.common.ac120.monthSelected}`).endOf('month').toDate());

    // =================== GRAPHQL ===================
    // query getBankbooks
    const { result: resBankbooks } = useQuery(queries.getBankbooks, dataQueryGetBankBooks.value, () => ({
      enabled: triggerBankbooks.value,
      fetchPolicy: "no-cache",
    }))
    // mutation createAccountingDocument
    const {
      mutate: mutateCreateAccountingDocument, onDone: doneCreateAccountingDocument, onError: errorCreateAccountingDocument,
    } = useMutation(mutations.createAccountingDocument);

    doneCreateAccountingDocument((e: any) => {
      emit("closePopup", false)
      store.state.common.ac120.statusKeppRow = true
      store.state.common.ac120.focusedRowKey = e.data?.createAccountingDocument?.accountingDocumentId
      notification('success', Message.getMessage('COMMON', '101').message)
      // store.state.common.ac120.onDoneAdd++
      store.state.common.ac120.resetDataTable++
      store.state.common.ac120.resetDataAccountingProcesses++
    })
    errorCreateAccountingDocument(e => {
      notification('error', e.message)
    })

    // ================== WATCH ================
    // 1. getBankbooks
    watch(resBankbooks, (value) => {
      triggerBankbooks.value = false
      // arraySelectBox.value = []
      if (value.getBankbooks) {
        store.state.common.ac120.arrayBankbooks = value.getBankbooks.map((value: any) => {
          return {
            'label': value.bankbookNickname,
            'value': value.bankbookId,
            'bankbookNumber': value.bankbookNumber,
            'bankbookNickname': value.bankbookNickname
          }
        })
      }
    })

    watch(() => props.modalStatus, (newValue, old) => {
      if (newValue) {
        statusShowLetterOfApprovalType.value = false;
        formDataAdd.value = { ...initialStateFormData }
        formDataAdd.value.transactionDetailDate = filters.formatDateToInterger(dayjs(`${acYear.value}-${store.state.common.ac120.monthSelected}`).startOf('month').toDate())
        countKey.value++
      }
    })

    watch(() => store.state.common.ac120.monthSelected, (newValue, old) => {
      startDate.value = dayjs(`${acYear.value}-${store.state.common.ac120.monthSelected}`).startOf('month').toDate();
      finishDate.value = dayjs(`${acYear.value}-${store.state.common.ac120.monthSelected}`).endOf('month').toDate();
    })

    // watch(() => [formDataAdd.bankbookId, store.state.common.ac120.arrayBankbooks], (newValue, oldValue) => {
    //     let data = store.state.common.ac120.arrayBankbooks?.find((item: any) => item.value == formDataAdd.bankbookId)
    //     bankbookNickname.value = data?.bankbookNickname
    //     bankbookNumber.value = data?.bankbookNumber
    // }, { deep: true })
    watch(() => formDataAdd.value.causeActionDate, (newValue, oldValue) => {
      colorDate.value = newValue == formDataAdd.value.transactionDetailDate ? 'greenColor' : 'redColor'
    })

    // watch(() => formDataAdd.value.transactionDetailDate, (newValue, oldValue) => {

    //     }


    // })

    // ================ FUNCTION ============================================

    const handleClosed = () => {
      formDataAdd.value.causeActionDate = formDataAdd.value.transactionDetailDate
      formDataAdd.value.paymentDate = formDataAdd.value.transactionDetailDate
      formDataAdd.value.accountingDate = formDataAdd.value.transactionDetailDate
      formDataAdd.value.proposedDate = formDataAdd.value.transactionDetailDate
      formDataAdd.value.registrationDate = formDataAdd.value.transactionDetailDate
    }
    const submit = () => {

      const res = refFormAddAC120.value?.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        if (!formDataAdd.value.transactionDetailDate) {
          requiredTransactionDetailDate.value.validate(true)
        }
        if (!formDataAdd.value.causeActionDate) {
          requiredCauseActionDate.value.validate(true)
        }
      } else {
        if (!formDataAdd.value.transactionDetailDate) {
          requiredTransactionDetailDate.value.validate(true)
          return
        }
        if (!formDataAdd.value.causeActionDate) {
          requiredCauseActionDate.value.validate(true)
          return
        }
        if (formDataAdd.value.resolutionClassification == 1) {
          formDataAdd.value.letterOfApprovalType = null;
          formDataAdd.value.causeUsage = null;
        }
        let dataSubmit = {
          companyId: companyId,
          fiscalYear: acYear.value,
          facilityBusinessId: globalFacilityBizId.value,
          transactionDetailDate: formDataAdd.value.transactionDetailDate,
          input: {
            ...formDataAdd.value,
            'causeActionDate': formDataAdd.value.transactionDetailDate,
            'paymentDate': formDataAdd.value.transactionDetailDate,
            'accountingDate': formDataAdd.value.transactionDetailDate,
            'proposedDate': formDataAdd.value.transactionDetailDate,
            'registrationDate': formDataAdd.value.transactionDetailDate,
            'theOrder': props.theOrder + 1,
          }
        }
        if (dataSubmit.input.resolutionType == 11 || dataSubmit.input.resolutionType == 21) {
          dataSubmit.input.amount = Math.abs(dataSubmit.input.amount)
        } else if (dataSubmit.input.resolutionType == 12 || dataSubmit.input.resolutionType == 22) {
          dataSubmit.input.amount = - dataSubmit.input.amount
        }
        delete dataSubmit.input.resolutionClassification
        // delete dataSubmit.input.resolutionDate
        delete dataSubmit.input.bankbook
        // delete (dataSubmit.input.accountingDocumentId)
        delete (dataSubmit.input.transactionDetailDate)
        mutateCreateAccountingDocument(dataSubmit)
      }
    }
    const cancel = () => {
      emit("closePopup", false)
    };

    const changeRadioResolutionType = (value: Number) => {
      resetSelectAccount.value++
      if (value == 21 || value == 22) {
        formDataAdd.value.resolutionClassification = 2
        classification.value = [5]
        statusShowLetterOfApprovalType.value = true
        formDataAdd.value.letterOfApprovalType = 1
      } else {
        formDataAdd.value.resolutionClassification = 1
        classification.value = [4]
        statusShowLetterOfApprovalType.value = false
        formDataAdd.value.letterOfApprovalType = null
        formDataAdd.value.causeUsage = null
      }

    }

    store.state.common.ac120.arrResolutionType = computed(() => {
      let item: any = enum2Entries(ResolutionType).map((value) => ({
        id: value[1],
        text: value[0],
      }));
      return item;
    });
    store.state.common.ac120.arrLetterOfApprovalType = computed(() => {
      let item: any = enum2Entries(LetterOfApprovalType).map((value) => ({
        id: value[1],
        text: value[0],
      }));
      return item;
    });
    store.state.common.ac120.arrResolutionClassification = computed(() => {
      let item: any = enum2Entries(ResolutionClassification).map((value) => ({
        id: value[1],
        text: value[0],
      }));
      return item;
    });
    store.state.common.ac120.arrFundingSource = computed(() => {
      let item: any = enum2Entries(FundingSource).map((value) => ({
        id: value[1],
        text: value[0],
      }));
      return item;
    });
    return {
      refFormAddAC120,
      statusShowLetterOfApprovalType,
      submit,
      cancel,
      changeRadioResolutionType,
      countKey,
      store,
      startDate, finishDate, formDataAdd,
      classification,
      resetSelectAccount,
      requiredTransactionDetailDate, requiredCauseActionDate,
      bankbookNickname, bankbookNumber,
      colorDate, textLabelInputSource,
      handleClosed,

    }
  },
})
</script>

<style lang="scss" scoped>
.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}

.mt-10 {
  margin-top: 10px;
}

.mt-20 {
  margin-top: 20px;
}

.input_number {
  display: flex;
  align-items: center;
}

:deep .redColor input.dp__input {
  color: #ff3030;
}

:deep .greenColor input.dp__input {
  color: #48b148;
}
.input_info {
  display: flex;
  align-items: center;
}
:deep .col-1 .ant-form-item-label {
  >label {
    width: 100px;
  }
}
:deep .col-2,
:deep .col-3,
:deep .col-4 {
  .ant-form-item-label {
    >label {
      width: 75px;
    }
  }
}
</style>
