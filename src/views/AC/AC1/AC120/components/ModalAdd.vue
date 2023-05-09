<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="800">
        <div class="mt-20" :key="countKey">
            <standard-form formName="ac-120-form-add" ref="refFormAddAC120" class="text-align-center mt-20">
                <a-row class="row-1">
                    <a-col :span="10" class="col-1">
                        <a-form-item class="red" label="통장">
                            <select-box-common placeholder="선택" :arrSelect="store.state.common.ac120.arrayBankbooks"
                                v-model:valueInput="formDataAdd.bankbookId" :required="true" :width="200" />
                        </a-form-item>
                        <a-form-item class="red" label="금액">
                            <number-box-money :width="200" :required="true" :min="0" v-model:valueInput="formDataAdd.amount"
                                placeholder="금액" />
                        </a-form-item>
                        <a-form-item class="red" label="적요">
                            <default-text-box :width="200" :required="true" v-model:valueInput="formDataAdd.summary"
                                placeholder="적요" />
                        </a-form-item>
                        <a-form-item class="red" label="자금원천">
                            <FundingSourceSelect placeholder="선택" :width="200" :required="true"
                                v-model:valueInput="formDataAdd.fundingSource" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="14" class="col-2">
                        <a-form-item class="red" label="결의일자">
                            <!-- <date-time-box width="150px" :required="true"
                                v-model:valueDate="formDataAdd.resolutionDate" /> -->
                            <date-time-box-custom width="150px" :required="true" :startDate="startDate"
                                ref="requiredTransactionDetailDate" :finishDate="finishDate"
                                v-model:valueDate="formDataAdd.transactionDetailDate" />
                        </a-form-item>
                        <a-form-item label="계정과목" class="red">
                            <account-code-select :key="resetSelectAccount" :classification="classification"
                                v-model:valueInput="formDataAdd.accountCode" width="190px" :required="true" />
                        </a-form-item>
                        <a-form-item class="red" label="결의서 종류">
                            {{ formDataAdd.resolutionType }}
                            <radio-group :arrayValue="store.state.common.ac120.arrResolutionType"
                                :layoutCustom="'horizontal'" :required="true"
                                v-model:valueRadioCheck="formDataAdd.resolutionType"
                                @update:valueRadioCheck="changeRadioResolutionType" />
                        </a-form-item>
                        <a-form-item v-if="statusShowLetterOfApprovalType" class="red" label="품의종류">
                            <radio-group :arrayValue="store.state.common.ac120.arrLetterOfApprovalType"
                                :layoutCustom="'horizontal'" :required="true"
                                v-model:valueRadioCheck="formDataAdd.letterOfApprovalType" />
                        </a-form-item>
                    </a-col>
                </a-row>
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
import { initialStateFormAdd } from '../utils/index'
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
        // const dataBankBook = ref(null)
        // const statusRemoveRow = ref<boolean>(true)
        const dataQueryGetBankBooks = ref({
            companyId: companyId,
            fiscalYear: acYear.value,
        })
        let formDataAdd: any = ref({ ...initialStateFormAdd });
        const statusShowLetterOfApprovalType = ref(false)
        // const arraySelectBox = ref([]);
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
                formDataAdd.value = { ...initialStateFormAdd }
                formDataAdd.value.transactionDetailDate = filters.formatDateToInterger(dayjs(`${acYear.value}-${store.state.common.ac120.monthSelected}`).startOf('month').toDate())
                // store.state.common.ac120.transactionDetailDate = filters.formatDateToInterger(dayjs(`${acYear.value}-${store.state.common.ac120.monthSelected}`).startOf('month').toDate())
                // dataStateFormAdd = {
                //     bankbookId: store.state.common.ac120.formData.bankbookId,
                //     // resolutionDate: store.state.common.ac120.formData.resolutionDate,
                //     resolutionType: store.state.common.ac120.formData.resolutionType,
                //     amount: store.state.common.ac120.formData.amount,
                //     summary: store.state.common.ac120.formData.summary,
                //     fundingSource: store.state.common.ac120.formData.fundingSource,
                //     letterOfApprovalType: store.state.common.ac120.formData.letterOfApprovalType,
                // };
                countKey.value++
            }
        })

        watch(() => store.state.common.ac120.monthSelected, (newValue, old) => {
            startDate.value = dayjs(`${acYear.value}-${store.state.common.ac120.monthSelected}`).startOf('month').toDate();
            finishDate.value = dayjs(`${acYear.value}-${store.state.common.ac120.monthSelected}`).endOf('month').toDate();
        })

        // watch(() => dataBankBook.value, (newValue: any, old) => {
        //     store.state.common.ac120.formData.bankbookId = newValue?.bankbookId
        //     // store.state.common.ac120.formData.bankbook.bankbookNickname = newValue?.bankbookNickname
        //     // store.state.common.ac120.formData.bankbook.bankbookNumber = newValue?.bankbookNumber
        // }, { deep: true })

        // ================ FUNCTION ============================================
        const submit = () => {
            if (!formDataAdd.value.transactionDetailDate) {
                requiredTransactionDetailDate.value.validate(true)
            }
            const res = refFormAddAC120.value?.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
                if (!formDataAdd.value.transactionDetailDate) {
                    requiredTransactionDetailDate.value.validate(true)
                }
            } else {
                if (!formDataAdd.value.transactionDetailDate) {
                    requiredTransactionDetailDate.value.validate(true)
                    return
                }
                // statusRemoveRow.value = false;
                // store.state.common.ac120.transactionDetailDate = formDataAdd.value.transactionDetailDate
                // let dataAdd = {
                //     ...formDataAdd.value,
                //     'causeActionDate': formDataAdd.value.transactionDetailDate,
                //     'paymentDate': formDataAdd.value.transactionDetailDate,
                //     'accountingDate': formDataAdd.value.transactionDetailDate,
                //     'proposedDate': formDataAdd.value.transactionDetailDate,
                //     'registrationDate': formDataAdd.value.transactionDetailDate,
                // }
                // // delete dataAdd.transactionDetailDate
                // emit('submit', dataAdd)
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
                // delete dataSubmit.input.resolutionClassification
                // delete dataSubmit.input.resolutionDate
                // delete dataSubmit.input.bankbook
                // delete (dataSubmit.input.accountingDocumentId)
                delete (dataSubmit.input.transactionDetailDate)
                mutateCreateAccountingDocument(dataSubmit)
            }
        }
        const cancel = () => {
            emit("closePopup", false)
            // if (JSON.stringify(initialStateFormAdd) === JSON.stringify(dataStateFormAdd) == true) {
            //     emit("closePopup", false)
            //     if (statusRemoveRow.value) {
            //         store.state.common.ac120.onDeleteRowAdd++
            //     }
            // } else {
            //     comfirmClosePopup(() => {
            //         emit("closePopup", false)
            //         if (statusRemoveRow.value) {
            //             store.state.common.ac120.onDeleteRowAdd++
            //         }
            //     })
            // }

        };
        const changeRadioResolutionType = (value: Number) => {
            // if (value == 11 || value == 21) {
            //     store.state.common.ac120.formData.amount = Math.abs(store.state.common.ac120.formData.amount)
            // } else if (value == 12 || value == 22) {
            //     store.state.common.ac120.formData.amount = -store.state.common.ac120.formData.amount
            // }
            resetSelectAccount.value++
            if (value == 21 || value == 22) {
                classification.value = [5]
                statusShowLetterOfApprovalType.value = true
                formDataAdd.value.letterOfApprovalType = 1
            } else {
                classification.value = [4]
                statusShowLetterOfApprovalType.value = false
                formDataAdd.value.letterOfApprovalType = null
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
            requiredTransactionDetailDate,
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

:deep .col-1 .ant-form-item-label {
    >label {
        width: 80px;
    }
}

:deep .col-2 .ant-form-item-label {
    >label {
        width: 85px;
    }
}
</style>
