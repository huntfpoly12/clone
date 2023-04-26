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
                            <number-box-money :width="200" :required="true" :min="0"
                                v-model:valueInput="formDataAdd.amount" placeholder="금액" />
                        </a-form-item>
                        <a-form-item class="red" label="적요">
                            <default-text-box :width="200" :required="true"
                                v-model:valueInput="formDataAdd.summary" placeholder="적요" />
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
                            <date-time-box-custom width="150px" :required="true" :startDate="startDate" :finishDate="finishDate"
                                v-model:valueDate="store.state.common.ac120.transactionDetailDate" />
                        </a-form-item>
                        <a-form-item class="red" label="결의서 종류">
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
import { useQuery } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
import { useStore } from 'vuex';
import dayjs from "dayjs";
import filters from "@/helpers/filters";
import { initialStateFormAdd } from '../utils/index'
// import comfirmClosePopup from '@/utils/comfirmClosePopup';
import { ResolutionType, LetterOfApprovalType, ResolutionClassification, FundingSource ,enum2Entries } from "@bankda/jangbuda-common";
import DateTimeBoxCustom from '@/components/common/DateTimeBoxCustom.vue';
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        DateTimeBoxCustom
    },

    setup(props, { emit }) {
        const store = useStore();
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
        const countKey = ref<number>(0)

        const refFormAddAC120 = ref()
        // const dataBankBook = ref(null)
        // const statusRemoveRow = ref<boolean>(true)
        const dataQueryGetBankBooks = ref({
            companyId: companyId,
            fiscalYear: acYear.value,
        })
        let formDataAdd = ref({...initialStateFormAdd});
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
                formDataAdd.value = {...initialStateFormAdd}
                store.state.common.ac120.transactionDetailDate = filters.formatDateToInterger(dayjs(`${acYear.value}-${store.state.common.ac120.monthSelected}`).startOf('month').toDate())
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
            const res = refFormAddAC120.value?.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                // statusRemoveRow.value = false;
                emit('submit', formDataAdd.value)
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
            if (value == 21 || value == 22) {
                statusShowLetterOfApprovalType.value = true
                store.state.common.ac120.formData.letterOfApprovalType = 1
            } else {
                statusShowLetterOfApprovalType.value = false
                store.state.common.ac120.formData.letterOfApprovalType = null
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
