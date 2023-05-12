<template>
    <div class="column">
        <div class="detail" :class="store.state.common.ac120.statusShowFull ? 'showFull' : ''">
            <div class="detail-header">
                <a-row class="text-align-center">
                    <a-col :span="8" @click="openShowFull">
                        <span style="float: left;">
                            <fullscreen-exit-outlined :style="{ fontSize: '20px' }"
                                v-if="store.state.common.ac120.statusShowFull" />
                            <fullscreen-outlined :style="{ fontSize: '20px' }" v-else />
                        </span>
                    </a-col>
                    <a-col :span="8">
                        <div style="display: flex; justify-content: center; margin-left: 35px;">
                            <span style="font-weight: bold; font-size: 18px; margin-right: 5px;">결의서</span>
                            <a-tooltip v-if="store.state.common.ac120.formData.resolutionNormalStatus == true"
                                placement="top" color="black" title="정상 여부">
                                <DxButton :focusStateEnabled="false" text="O"
                                    :style="{ backgroundColor: '#337614', color: 'white' }"
                                    :height="$config_styles.HeightInput" />
                            </a-tooltip>
                            <DxButton v-else :focusStateEnabled="false" text="X"
                                :style="{ backgroundColor: '#BB3835', color: 'white' }"
                                :height="$config_styles.HeightInput" />
                        </div>
                    </a-col>
                    <a-col :span="8">
                        <div style="display: flex; justify-content: flex-end;">
                            <a-form-item label="결의번호">
                                {{ store.state.common.ac120.formData.resolutionNumber ?
                                    store.state.common.ac120.formData.resolutionNumber : '_____' }}
                                <DxButton v-if="store.state.common.ac120.formData.handwriting == true"
                                    :focusStateEnabled="false" text="수기"
                                    :style="{ backgroundColor: '#BB3835', color: 'white' }"
                                    :height="$config_styles.HeightInput" />
                            </a-form-item>
                        </div>
                    </a-col>
                </a-row>
            </div>
            <a-row class="detail-body">
                <a-col class="detail1">
                    <StandardForm formName="ac-120-form" ref="refFormAC120" :key='store.state.common.ac120.keyRefreshForm'>
                        <div class="ac120">
                            <a-row class="mt-20">
                                <a-col :span="7" class="col-1">
                                    <a-form-item label="결의구분">
                                        <default-text-box
                                            :valueInput="store.state.common.ac120.arrResolutionClassification.find((item: any) => store.state.common.ac120.formData.resolutionClassification == item.id)?.text"
                                            width="100px" placeholder="지출" disabled="true" />
                                    </a-form-item>
                                    <div class="input_info">
                                        <a-form-item label="결의서 종류">
                                            <default-text-box
                                                :valueInput="store.state.common.ac120.arrResolutionType.find((item: any) => store.state.common.ac120.formData.resolutionType == item.id)?.text"
                                                width="100px" placeholder="여입" disabled="true" />
                                        </a-form-item>
                                        <button-basic @onClick="actionOpenModalCopy" style="margin: -5px 0px 0px 5px"
                                            mode="contained" type="default" :text="textButton + '으로 변경'" />
                                    </div>
                                </a-col>
                                <a-col :span="6" class="col-2">
                                    <a-form-item label="결의일자" class="red">
                                        <date-time-box :teleport="true" v-model:valueDate="store.state.common.ac120.transactionDetailDate"
                                            width="150px" :required="true" disabled="true" />
                                    </a-form-item>

                                    <a-form-item label="통장" class="red">
                                        <default-text-box v-model:valueInput="bankbookNickname" width="150px"
                                            style="margin-right: 10px;" :required="true" disabled="true" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" class="col-3">
                                    <a-form-item label="금액" class="red">
                                        <number-box-money v-model:valueInput="store.state.common.ac120.formData.amount"
                                            width="150px" :required="true" :spinButtons="false" disabled="true" />
                                    </a-form-item>
                                    <a-form-item label="적요" class="red">
                                        <default-text-box v-model:valueInput="store.state.common.ac120.formData.summary"
                                            width="150px" :required="true" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="5" class="col-4">
                                    <a-form-item label="계정과목" class="red">
                                        <account-code-select :key="resetSelectAccount" :classification="classification"
                                            v-model:valueInput="store.state.common.ac120.formData.accountCode" width="190px"
                                            :required="true" />
                                    </a-form-item>
                                    <a-form-item label="자금원천" class="red">
                                        <FundingSourceSelect
                                            v-model:valueInput="store.state.common.ac120.formData.fundingSource"
                                            width="190px" :required="true" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="7" class="col-1">
                                    <a-form-item label="원인행위일자" class="red" :class="colorDate">
                                        <date-time-box :teleport="true"  v-model:valueDate="store.state.common.ac120.formData.causeActionDate"
                                            width="150px" :required="true" ref="requiredCauseActionDate" />
                                    </a-form-item>
                                    <a-form-item label="결재일자">
                                        <date-time-box :teleport="true" v-model:valueDate="store.state.common.ac120.formData.paymentDate"
                                            width="150px" />
                                    </a-form-item>
                                    <a-form-item label="발의일자">
                                        <date-time-box :teleport="true" v-model:valueDate="store.state.common.ac120.formData.proposedDate"
                                            width="150px" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" class="col-2">
                                    <a-form-item :label="null" style="margin-left: 75px;">
                                        <default-text-box v-model:valueInput="bankbookNumber" width="150px" :required="true"
                                            disabled="true" />
                                    </a-form-item>

                                    <a-form-item label="출납일자" class="abc">
                                        <date-time-box :teleport="true" v-model:valueDate="store.state.common.ac120.formData.accountingDate"
                                            width="150px" />
                                    </a-form-item>
                                    <a-form-item label="등기일자">
                                        <date-time-box :teleport="true"
                                            v-model:valueDate="store.state.common.ac120.formData.registrationDate"
                                            width="150px" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6" class="col-3">
                                    <a-form-item label="거래처">
                                        <customer-select v-model:valueInput="store.state.common.ac120.formData.clientId"
                                            width="150px" />
                                    </a-form-item>
                                    <div class="input_info">
                                        <a-form-item :label="textLabelInputSource">
                                            <default-text-box v-model:valueInput="store.state.common.ac120.formData.source"
                                                width="150px" />
                                        </a-form-item>
                                        <a-tooltip placement="top" color="black" class="fz-10 ml-10 mb-5">
                                            <template #title>기본값은 [회계설정 > 회계기타] 메뉴에서 입력된 결의서 {{ textLabelInputSource
                                            }}
                                                을
                                                참조합니다.</template>
                                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                                class="mr-5">
                                        </a-tooltip>
                                    </div>
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
                                        <text-area-box width="190px"
                                            v-model:valueInput="store.state.common.ac120.formData.memo" :height="60" />
                                    </a-form-item>
                                </a-col>

                            </a-row>
                            <div v-if="!(store.state.common.ac120.formData.resolutionClassification == 1)">
                                <a-row>
                                    <a-col :span="24">
                                        <div class="top-content">
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
                                        <a-form-item class="red" label="품의종류"
                                            v-if="store.state.common.ac120.formData.letterOfApprovalType">
                                            <radio-group
                                                v-model:valueRadioCheck="store.state.common.ac120.formData.letterOfApprovalType"
                                                :arrayValue="arrayRadioCheck" :layoutCustom="'horizontal'"
                                                :required="true" />
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
                            </div>
                        </div>
                    </StandardForm>
                    <div class="text-align-center mt-20">
                        <DxButton @click="onCancelDeleteRow" class="ml-4 custom-button-checkbox custom-button"
                            type="default" :height="$config_styles.HeightInput">
                            <div class="d-flex-center">
                                <checkbox-basic :valueCheckbox="true" disabled="true" />
                                <span class="pl-5">전표취소</span>
                            </div>
                        </DxButton>
                        <button-basic @onClick="onSubmit" style="margin: 0px 5px" mode="contained" type="default"
                            text="저장" />
                    </div>
                </a-col>
                <a-col class="upload detail2">
                    <UploadPreviewImage v-model:list-image-file="fileList" />
                </a-col>
            </a-row>
        </div>
    </div>
    <PopupCopyData :modalStatus="statusPopupCopyData" @closePopup="statusPopupCopyData = false"
        @submit="statusPopupCopyData = false" />
    <ModalDelete :modalStatus="statusModalDelete" @closePopup="statusModalDelete = false"
        :dataRows='[store.state.common.ac120.formData]' />
    <PopupMessage :modalStatus="isModalChange" @closePopup="isModalChange = false" :typeModal="'confirm'" :title="''"
        :content="Message.getMessage('AC120', '001').message" :okText="Message.getMessage('AC120', '001').yes"
        :cancelText="Message.getMessage('AC120', '001').no" @checkConfirm="handleConfirmChange" />
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
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';
import ModalDelete from "./ModalDelete.vue"
import queries from "@/graphql/queries/AC/AC1/AC120";
import notification from '@/utils/notification';
import { Message } from "@/configs/enum"
import { companyId } from "@/helpers/commonFunction"
import filters from "@/helpers/filters";
import UploadPreviewImage from './UploadPreviewImage.vue'
import { async } from 'rxjs';
export default defineComponent({
    components: {
        PopupCopyData,
        DxButton,
        UploadPreviewImage, ModalDelete,
        FullscreenOutlined, FullscreenExitOutlined
    },
    setup(props, { emit }) {
        const store = useStore();
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
        const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));
        store.state.common.ac120.formData = reactive({ ...initialStateFormData })
        const refFormAC120 = ref()
        let statusPopupCopyData = ref<boolean>(false);
        let fileList = ref<any[]>([])
        const textButton = ref<string>(store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 22)?.text)
        const textLabelInputSource = ref<string>('수입원')
        const requiredCauseActionDate = ref()
        const arrayRadioCheck = computed(() => store.state.common.ac120.arrLetterOfApprovalType)
        let colorDate = ref()
        let statusModalDelete = ref(false);
        let bankbookNickname = ref<string>('')
        let bankbookNumber = ref<string>('')
        const resetSelectAccount = ref<number>(0)
        const classification = ref<any>([4])
        const isModalChange = ref<boolean>(false)
        // =================== GRAPHQL ===================
        // mutation updateAccountingDocument
        const {
            mutate: mutateUpdateAccountingDocument, onDone: doneUpdateAccountingDocument, onError: errorUpdateAccountingDocument,
        } = useMutation(mutations.updateAccountingDocument);

        const { result: resultCompany } = useQuery(queries.getMyCompany, { companyId: companyId }, () => ({ fetchPolicy: "no-cache" }));

        // ============== ON DONE MUTATION GRAPHQL ===============
        // updateAccountingDocument
        doneUpdateAccountingDocument((e) => {
            store.state.common.ac120.statusKeppRow = true
            notification('success', Message.getMessage('COMMON', '106').message)
            // store.state.common.ac120.onDoneAdd++
            store.state.common.ac120.resetDataTable++
            store.state.common.ac120.resetDataAccountingProcesses++
        })
        errorUpdateAccountingDocument(e => {
            notification('error', e.message)
        })

        // ================== WATCH ================
        watch(resultCompany, (value) => {
            if (value.getMyCompany) {
                initialStateFormData.source = value.getMyCompany.presidentName
            }
        });

        watch(() => [store.state.common.ac120.formData.resolutionType, store.state.common.ac120.arrResolutionType], (newValue, oldValue) => {
            switch (store.state.common.ac120.formData.resolutionType) {
                case 11:
                    classification.value = [4]
                    store.state.common.ac120.formData.resolutionClassification = 1
                    textLabelInputSource.value = '수입원'
                    textButton.value = store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 22)?.text
                    break;
                case 22:
                    classification.value = [5]
                    store.state.common.ac120.formData.resolutionClassification = 2
                    textLabelInputSource.value = '지출원'
                    textButton.value = store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 11)?.text
                    break;
                case 21:
                    classification.value = [5]
                    store.state.common.ac120.formData.resolutionClassification = 2
                    textLabelInputSource.value = '지출원'
                    textButton.value = store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 12)?.text
                    break;
                case 12:
                    classification.value = [4]
                    store.state.common.ac120.formData.resolutionClassification = 1
                    textLabelInputSource.value = '수입원'
                    textButton.value = store.state.common.ac120.arrResolutionType.find((element: any) => element.id == 21)?.text
                    break;
                default:
                // code block
            }
            resetSelectAccount.value++
        })

        watch(() => store.state.common.ac120.formData.causeActionDate, (newValue, oldValue) => {
            // if (store.state.common.ac120.statusFormAdd) {
            colorDate.value = newValue == store.state.common.ac120.transactionDetailDate ? 'greenColor' : 'redColor'
            // } else {
            //     colorDate.value = newValue == store.state.common.ac120.formData.transactionDetailDate ? 'greenColor' : 'redColor'
            // }
        })

        watch(() => [store.state.common.ac120.formData.bankbookId, store.state.common.ac120.arrayBankbooks], (newValue, oldValue) => {
            let data = store.state.common.ac120.arrayBankbooks?.find((item: any) => item.value == store.state.common.ac120.formData.bankbookId)
            bankbookNickname.value = data?.bankbookNickname
            bankbookNumber.value = data?.bankbookNumber
        }, { deep: true })

        // ================ FUNCTION ============================================
        const toggleTransition = () => {
            store.state.common.ac120.statusShowFull = !store.state.common.ac120.statusShowFull
        }
        const actionOpenModalCopy = () => {
            if (store.state.common.ac120.formData.resolutionType == 11) {
                statusPopupCopyData.value = true
            } else {
                isModalChange.value = true
            }
        }

        const onSubmit = () => {
            if (!store.state.common.ac120.formData.causeActionDate) {
                requiredCauseActionDate.value.validate(true)
            }
            const res = refFormAC120.value?.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
                if (!store.state.common.ac120.formData.causeActionDate) {
                    requiredCauseActionDate.value.validate(true)
                }
            } else {
                if (!store.state.common.ac120.formData.causeActionDate) {
                    requiredCauseActionDate.value.validate(true)
                    return;
                }
                if (store.state.common.ac120.formData.resolutionClassification == 1) {
                    store.state.common.ac120.formData.letterOfApprovalType = null;
                    store.state.common.ac120.formData.causeUsage = null;
                    // store.state.common.ac120.formData.goodsCount = null;
                }
                let dataSubmit = {
                    companyId: companyId,
                    fiscalYear: acYear.value,
                    facilityBusinessId: globalFacilityBizId.value,
                    transactionDetailDate: store.state.common.ac120.transactionDetailDate,
                    accountingDocumentId: store.state.common.ac120.formData.accountingDocumentId,
                    input: { ...store.state.common.ac120.formData }
                }
                // if (dataSubmit.input.resolutionType == 11 || dataSubmit.input.resolutionType == 21) {
                //     dataSubmit.input.amount = Math.abs(dataSubmit.input.amount)
                // } else if (dataSubmit.input.resolutionType == 12 || dataSubmit.input.resolutionType == 22) {
                //     dataSubmit.input.amount = -dataSubmit.input.amount
                // }
                delete dataSubmit.input.resolutionClassification
                // delete dataSubmit.input.resolutionDate
                delete dataSubmit.input.bankbook
                delete dataSubmit.input.bankbookId
                delete dataSubmit.input.accountingDocumentId
                delete dataSubmit.input.transactionDetailDate
                delete dataSubmit.input.documentOrderByDate
                // delete dataSubmit.input.income
                // delete dataSubmit.input.spending
                delete dataSubmit.input.clientId
                delete dataSubmit.input.goodsCount
                delete dataSubmit.input.proofCount
                delete dataSubmit.input.handwriting
                delete dataSubmit.input.resolutionNormalStatus
                delete dataSubmit.input.resolutionNumber
                delete dataSubmit.input.summaryOfBankbookDetail
                delete dataSubmit.input.bankbookDetailId
                delete dataSubmit.input.balance
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
                // }
            }
        }
        const onCancelDeleteRow = () => {
            // if (store.state.common.ac120.statusFormAdd) { // xóa row chưa lưu
            //     store.state.common.ac120.onDeleteRowAdd++
            // } else { // delete data
            statusModalDelete.value = true
            // }

        }
        const handleConfirmChange = (status: boolean) => {
            if (status) {
                switch (store.state.common.ac120.formData.resolutionType) {
                    case 11:
                        store.state.common.ac120.formData.resolutionType = 22
                        break;
                    case 22:
                        store.state.common.ac120.formData.resolutionType = 11
                        break;
                    case 21:
                        store.state.common.ac120.formData.resolutionType = 12
                        break;
                    case 12:
                        store.state.common.ac120.formData.resolutionType = 21
                        break;
                    default:
                    // code block
                }
                store.state.common.ac120.formData.amount = -store.state.common.ac120.formData.amount
                emit('changeAmountDataGrid', true)
            }
        }
        const openShowFull = () => {
            store.state.common.ac120.statusShowFull = !store.state.common.ac120.statusShowFull;
        }

        return {
            store,
            toggleTransition,
            statusPopupCopyData,
            arrayRadioCheck,
            onSubmit,
            fileList,
            refFormAC120,
            actionOpenModalCopy,
            textButton,
            textLabelInputSource,
            requiredCauseActionDate,
            onCancelDeleteRow,
            colorDate,
            bankbookNickname, bankbookNumber,
            statusModalDelete,
            openShowFull,
            resetSelectAccount,
            classification,
            Message, isModalChange, handleConfirmChange,
        }
    }
})
</script>

<style lang="scss" scoped src="../style/style.scss"></style>
