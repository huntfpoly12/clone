<template>
    <a-row class="detail">
        <a-col class="detail1">
            <div class="text-align-center button-arrow" :class="store.state.common.ac120.statusShowFull ? 'rotate' : ''">
                <img @click="toggleTransition" src="@/assets/images/iconArrowUp.png" alt="">
            </div>
            <div class="column">
                {{ store.state.common.ac120.formData }}
                <!-- {{  store.state.common.ac120.arrResolutionType }} -->
                <a-spin :spinning="false">
                    <StandardForm formName="ac-120-form" ref="refFormAC120" :key='store.state.common.ac120.keyRefreshForm'>
                        <a-row class="text-align-center">
                            <a-col :span="8"></a-col>
                            <a-col :span="8">
                                <div style="display: flex; justify-content: center;">
                                    <h2>결의서</h2>
                                    <DxButton :focusStateEnabled="false" text="O"
                                        :style="{ backgroundColor: '#337614', color: 'white' }"
                                        :height="$config_styles.HeightInput" />
                                    <DxButton :focusStateEnabled="false" text="X"
                                        :style="{ backgroundColor: '#BB3835', color: 'white' }"
                                        :height="$config_styles.HeightInput" />
                                    <!-- <button-basic style="margin: 0 10px;" text="" type="success" :mode="'contained'" />
                                    <button-basic text="X" type="danger" :mode="'contained'" /> -->
                                </div>
                            </a-col>
                            <a-col :span="8">
                                <div style="display: flex; justify-content: flex-end;">
                                    <a-form-item label="결의번호">
                                        <button-basic text="수기" type="danger" :mode="'contained'" />
                                    </a-form-item>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row class="mt-20">
                            <a-col :span="7" class="col-1">
                                <a-form-item label="결의구분">
                                    <default-text-box
                                        v-model:valueInput="store.state.common.ac120.formData.resolutionClassification"
                                        width="70px" placeholder="지출" disabled="true" />
                                </a-form-item>
                                <div class="input_info">
                                    <a-form-item label="결의서 종류">
                                        <default-text-box
                                            v-model:valueInput="store.state.common.ac120.formData.resolutionType"
                                            width="70px" placeholder="여입" disabled="true" />
                                    </a-form-item>
                                    <button-basic @onClick="actionPopupCopyData" style="margin: -5px 0px 0px 5px"
                                        mode="contained" type="default" :text="textButton + '로 변경'" />
                                </div>
                            </a-col>
                            <a-col :span="6" class="col-2">
                                <a-form-item label="결의일자" class="red">
                                    <date-time-box v-if="store.state.common.ac120.statusFormAdd"
                                        v-model:valueDate="store.state.common.ac120.transactionDetailDate" width="150px"
                                        :required="true" disabled="true" />
                                    <date-time-box v-else
                                        v-model:valueDate="store.state.common.ac120.formData.resolutionDate" width="150px"
                                        :required="true" disabled="true" />
                                </a-form-item>

                                <a-form-item label="통장" class="red">
                                    <div class="input_info">
                                        <default-text-box
                                            v-model:valueInput="store.state.common.ac120.formData.bankbookNickname"
                                            width="70px" style="margin-right: 10px;" :required="true" disabled="true" />
                                        <default-text-box
                                            v-model:valueInput="store.state.common.ac120.formData.bankbookNumber"
                                            width="70px" :required="true" disabled="true" />
                                    </div>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" class="col-3">
                                <a-form-item label="금액" class="red">
                                    <number-box v-model:valueInput="store.state.common.ac120.formData.amount" width="150px"
                                        :required="true" :spinButtons="false" disabled="true" />
                                </a-form-item>

                                <a-form-item label="적요" class="red">
                                    <default-text-box v-model:valueInput="store.state.common.ac120.formData.summary"
                                        width="150px" :required="true" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="5" class="col-4">
                                <!-- {{  store.state.common.ac120.formData.accountCode + 1 }} -->
                                <a-form-item label="계정과목" class="red">
                                    <account-code-select v-model:valueInput="store.state.common.ac120.formData.accountCode"
                                        width="190px" :required="true" />
                                </a-form-item>
                                <a-form-item label="자금원천" class="red">
                                    <FundingSourceSelect
                                        v-model:valueInput="store.state.common.ac120.formData.fundingSource" width="190px"
                                        :required="true" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <div class="hidden-show"
                            :style="[store.state.common.ac120.statusShowFull ? { height: heightForm, overflow: 'unset' } : {}]">
                            <a-row>
                                <a-col :span="7" class="col-1">
                                    <a-form-item label="원인행위일자" class="red">
                                        <date-time-box v-model:valueDate="store.state.common.ac120.formData.causeActionDate"
                                            width="150px" :required="true" />
                                    </a-form-item>
                                    <a-form-item label="결재일자">
                                        <date-time-box v-model:valueDate="store.state.common.ac120.formData.paymentDate"
                                            width="150px" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" class="col-2">
                                    <a-form-item label="발의일자">
                                        <date-time-box v-model:valueDate="store.state.common.ac120.formData.proposedDate"
                                            width="150px" />
                                    </a-form-item>
                                    <a-form-item label="출납일자">
                                        <date-time-box v-model:valueDate="store.state.common.ac120.formData.accountingDate"
                                            width="150px" />
                                    </a-form-item>
                                    <a-form-item label="등기일자">
                                        <date-time-box
                                            v-model:valueDate="store.state.common.ac120.formData.registrationDate"
                                            width="150px" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" class="col-3">
                                    <div class="input_info">
                                        <a-form-item label="거래처">
                                            <customer-select v-model:valueInput="store.state.common.ac120.formData.clientId"
                                                width="150px" disabled="true" />
                                        </a-form-item>
                                        <a-tooltip placement="top" color="black" class="fz-10 ml-10 mb-5">
                                            <template #title>기본값은 [회계설정 > 회계기타] 메뉴에서 입력된 결의서 ${수입원/지출원}을
                                                참조합니다.</template>
                                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                                class="mr-5">
                                        </a-tooltip>
                                    </div>
                                    <a-form-item label="수입원/지출원">
                                        <default-text-box v-model:valueInput="store.state.common.ac120.formData.source"
                                            width="150px" />
                                    </a-form-item>
                                    <div class="input_info">
                                        <a-form-item label="작성자">
                                            <default-text-box v-model:valueInput="store.state.common.ac120.formData.writer"
                                                width="150px" />
                                        </a-form-item>
                                        <a-tooltip placement="top" color="black" class="fz-10 ml-10 mb-5">
                                            <template #title>기본값은 [회계설정 > 회계기타] 메뉴에서 입력된 결의서 작성자를 참조합니다.</template>
                                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                                class="mr-5">
                                        </a-tooltip>
                                    </div>
                                </a-col>
                                <a-col :span="5" class="col-4">
                                    <a-form-item label="상대계정">
                                        <account-code-select
                                            v-model:valueInput="store.state.common.ac120.formData.relationCode"
                                            width="190px" />
                                    </a-form-item>
                                    <a-form-item label="메모">
                                        <!-- <default-text-box v-model:valueInput="store.state.common.ac120.formData.memo"
                                            width="150px" height="60px" /> -->
                                            <text-area-box width="190px" v-model:valueInput="store.state.common.ac120.formData.memo"
                                            :height="60" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="24">
                                    <div class="top-content">
                                        <a-typography-title :level="5" style="margin-bottom: 0;">품의서
                                            <span class="fz-10 ml-10" style="color: gray; font-weight: 300; width: 40%;">
                                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                                    class="mr-5">
                                                지출결의서 기재 사항
                                            </span>
                                        </a-typography-title>
                                    </div>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="12">
                                    <a-form-item class="red" label="품의종류">
                                        <radio-group
                                            v-model:valueRadioCheck="store.state.common.ac120.formData.letterOfApprovalType"
                                            :arrayValue="arrayRadioCheck" :layoutCustom="'horizontal'" :required="true" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="물품내역수">
                                        <default-text-box :disabled="true"
                                            v-model:valueInput="store.state.common.ac120.formData.goodsCount"
                                            width="150px" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="24">
                                    <a-form-item label="품의 원인 및 용도">
                                        <text-area-box v-model:valueInput="store.state.common.ac120.formData.causeUsage"
                                            :height="50" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <div class="text-align-center mt-20">
                                <DxButton :disabled="store.state.common.ac120.statusFormAdd" @click="onCancelDeleteRow"
                                    class="ml-4 custom-button-checkbox custom-button" type="default"
                                    :height="$config_styles.HeightInput">
                                    <div class="d-flex-center">
                                        <checkbox-basic :valueCheckbox="true" disabled="true" />
                                        <span class="pl-5">전표취소</span>
                                    </div>
                                </DxButton>
                                <button-basic @onClick="onSubmit" style="margin: 0px 5px" mode="contained" type="default"
                                    text="저장" />
                            </div>
                        </div>
                    </StandardForm>
                </a-spin>
            </div>
        </a-col>
        <a-col class="detail2">
            <div class="upload">
                <!-- <UploadPreviewImage v-model:list-image-file="fileList" width="387"
                    :heightHidden="store.state.common.ac120.statusShowFull ? '' : '130px'" /> -->
                <UploadPreviewImage v-model:list-image-file="fileList" />
            </div>
        </a-col>
    </a-row>
    <PopupCopyData :modalStatus="statusPopupCopyData" @closePopup="statusPopupCopyData = false"
        @submit="statusPopupCopyData = false" />
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, computed, onMounted, watch } from "vue";
import { initialStateFormData } from "../utils/index"
import PopupCopyData from "./PopupCopyData.vue"
import DxButton from "devextreme-vue/button"
import { useQuery, useMutation } from '@vue/apollo-composable';
import mutations from "@/graphql/mutations/AC/AC1/AC120";
import dayjs from "dayjs";
import notification from '@/utils/notification';
import { Message } from "@/configs/enum"
import { companyId } from "@/helpers/commonFunction"
import filters from "@/helpers/filters";
import UploadPreviewImage from './UploadPreviewImage.vue'
export default defineComponent({
    components: {
        PopupCopyData,
        DxButton,
        UploadPreviewImage,
    },
    setup() {
        const heightForm: any = ref('352px')
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear)
        const globalFacilityBizId = computed(() => store.state.settings.globalFacilityBizId)
        store.state.common.ac120.formData = reactive({ ...initialStateFormData })
        const refFormAC120 = ref()
        let statusPopupCopyData = ref<boolean>(false);
        let fileList = ref<any[]>([])
        const textButton = ref<string>('')
        // const keyRefreshForm = ref<number>(0)
        const arrayRadioCheck = computed(() => store.state.common.ac120.arrLetterOfApprovalType)

        // =================== GRAPHQL ===================
        // mutation createAccountingDocument
        const {
            mutate: mutateCreateAccountingDocument, onDone: doneCreateAccountingDocument, onError: errorCreateAccountingDocument,
        } = useMutation(mutations.createAccountingDocument);

        // mutation updateAccountingDocument
        const {
            mutate: mutateUpdateAccountingDocument, onDone: doneUpdateAccountingDocument, onError: errorUpdateAccountingDocument,
        } = useMutation(mutations.updateAccountingDocument);

        // mutation unregisterAccountingDocument    ----- handwriting = true
        const {
            mutate: mutateUnregisterAccountingDocument, onDone: doneUnregisterAccountingDocument, onError: errorUnregisterAccountingDocument,
        } = useMutation(mutations.unregisterAccountingDocument);

        // mutation initializeTransactionDetails    ----- handwriting = false
        const {
            mutate: mutateInitializeTransactionDetails, onDone: doneInitializeTransactionDetails, onError: errorInitializeTransactionDetails,
        } = useMutation(mutations.initializeTransactionDetails);

        // ============== ON DONE MUTATION GRAPHQL ===============
        // createAccountingDocument
        doneCreateAccountingDocument((e) => {
            notification('success', Message.getMessage('COMMON', '106').message)
            // store.state.common.ac120.onDoneAdd++
            store.state.common.ac120.resetDataTable++
            store.state.common.ac120.resetDataAccountingProcesses++
        })
        errorCreateAccountingDocument(e => {
            notification('error', e.message)
        })

        // updateAccountingDocument
        doneUpdateAccountingDocument((e) => {
            notification('success', Message.getMessage('COMMON', '106').message)
            // store.state.common.ac120.onDoneAdd++
            store.state.common.ac120.resetDataTable++
            store.state.common.ac120.resetDataAccountingProcesses++
        })
        errorUpdateAccountingDocument(e => {
            notification('error', e.message)
        })

        // unregisterAccountingDocument
        doneUnregisterAccountingDocument((e) => {
            notification('success', Message.getMessage('COMMON', '302').message)
            store.state.common.ac120.resetDataTable++
            store.state.common.ac120.resetDataAccountingProcesses++
        })
        errorUnregisterAccountingDocument(e => {
            notification('error', e.message)
        })

        // initializeTransactionDetails
        doneInitializeTransactionDetails((e) => {
            notification('success', Message.getMessage('COMMON', '302').message)
            store.state.common.ac120.resetDataTable++
            store.state.common.ac120.resetDataAccountingProcesses++
        })
        errorInitializeTransactionDetails(e => {
            notification('error', e.message)
        })

        // ================== WATCH ================
        watch(() => store.state.common.ac120.formData.resolutionType, (newValue, oldValue) => {
            switch (newValue) {
                case 11:
                    store.state.common.ac120.formData.resolutionClassification = 1
                    textButton.value = store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 22)?.text
                    break;
                case 22:
                    store.state.common.ac120.formData.resolutionClassification = 2
                    textButton.value = store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 11)?.text
                    break;
                case 21:
                    store.state.common.ac120.formData.resolutionClassification = 2
                    textButton.value = store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 12)?.text
                    break;
                case 12:
                    store.state.common.ac120.formData.resolutionClassification = 1
                    textButton.value = store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 21)?.text
                    break;
                default:
                // code block
            }
        })

        watch(() => store.state.common.ac120.onAddRow, (newValue, oldValue) => {
            // keyRefreshForm.value++
        })

        // ================ FUNCTION ============================================
        const toggleTransition = () => {
            store.state.common.ac120.statusShowFull = !store.state.common.ac120.statusShowFull
        }

        const actionPopupCopyData = () => {
            if (store.state.common.ac120.formData.resolutionType == 11) {
                statusPopupCopyData.value = true
            }
        }
        const onSubmit = () => {
            const res = refFormAC120.value?.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                if (store.state.common.ac120.statusFormAdd) {
                    let dataSubmit = {
                        companyId: companyId,
                        fiscalYear: globalYear.value,
                        facilityBusinessId: globalFacilityBizId.value,
                        transactionDetailDate: store.state.common.ac120.transactionDetailDate,
                        input: { ...store.state.common.ac120.formData }
                    }
                    delete dataSubmit.input.resolutionClassification
                    delete dataSubmit.input.resolutionDate
                    delete (dataSubmit.input.accountingDocumentId)
                    mutateCreateAccountingDocument(dataSubmit)
                } else {
                    let dataSubmit = {
                        companyId: companyId,
                        fiscalYear: globalYear.value,
                        facilityBusinessId: globalFacilityBizId.value,
                        transactionDetailDate: store.state.common.ac120.formData.transactionDetailDate,
                        accountingDocumentId: store.state.common.ac120.formData.accountingDocumentId,
                        input: { ...store.state.common.ac120.formData }
                    }
                    delete dataSubmit.input.resolutionClassification
                    delete dataSubmit.input.resolutionDate
                    delete dataSubmit.input.bankbook
                    delete dataSubmit.input.bankbookId
                    delete dataSubmit.input.accountingDocumentId
                    delete dataSubmit.input.transactionDetailDate
                    delete dataSubmit.input.documentOrderByDate
                    delete dataSubmit.input.income
                    delete dataSubmit.input.spending
                    delete dataSubmit.input.clientId
                    delete dataSubmit.input.goodsCount
                    delete dataSubmit.input.proofCount
                    delete dataSubmit.input.handwriting
                    delete dataSubmit.input.resolutionNormalStatus
                    delete dataSubmit.input.resolutionNumber
                    delete dataSubmit.input.summaryOfBankbookDetail
                    delete dataSubmit.input.bankbookDetailId
                    const cleanData = JSON.parse(
                        JSON.stringify(dataSubmit, (name, val) => {
                            if (
                                name === "__typename"
                            ) {
                                delete val[name];
                            } else {
                                return val;
                            }
                        })
                    );
                    mutateUpdateAccountingDocument(cleanData)
                }
            }
        }
        const onCancelDeleteRow = () => {
            if (store.state.common.ac120.formData.handwriting === true) {
                mutateUnregisterAccountingDocument({
                    companyId: companyId,
                    fiscalYear: globalYear.value,
                    facilityBusinessId: globalFacilityBizId.value,
                    transactionDetailDate: store.state.common.ac120.formData.transactionDetailDate,
                    accountingDocumentId: store.state.common.ac120.formData.accountingDocumentId
                })
            } else if (store.state.common.ac120.formData.handwriting === false) {
                mutateInitializeTransactionDetails({
                    companyId: companyId,
                    fiscalYear: globalYear.value,
                    facilityBusinessId: globalFacilityBizId.value,
                    bankbookDetailDate: store.state.common.ac120.formData.transactionDetailDate,
                    bankbookDetailId: store.state.common.ac120.formData.bankbookDetailId
                })
            }
        }




        return {
            store,
            toggleTransition,
            actionPopupCopyData,
            statusPopupCopyData,
            arrayRadioCheck,
            onSubmit,
            fileList,
            refFormAC120,
            // refCssForm,
            heightForm,
            textButton,
            // keyRefreshForm,
            onCancelDeleteRow,
        }
    }
})
</script>

<style lang="scss" scoped src="../style/style.scss"></style>