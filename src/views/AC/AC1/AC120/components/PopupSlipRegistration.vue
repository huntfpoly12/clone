<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="800">
        <div class="mt-20" :key="countKey">
            <standard-form formName="ac-120-form-add" ref="refFormAddAC120" class="text-align-center mt-20">
                <a-row class="row-1">
                    <a-col :span="10" class="col-1">
                        <a-form-item class="red" label="통장">
                            <select-box-common placeholder="선택" :arrSelect="arraySelectBox"
                                v-model:valueInput="store.state.common.ac120.formData.bankbookId" :required="true" :width="200" />
                        </a-form-item>
                        <a-form-item class="red" label="금액">
                            <number-box :width="200" :required="true" v-model:valueInput="store.state.common.ac120.formData.amount"
                                placeholder="금액" />
                        </a-form-item>
                        <a-form-item class="red" label="적요">
                            <default-text-box :width="200" :required="true" v-model:valueInput="store.state.common.ac120.formData.summary"
                                placeholder="적요" />
                        </a-form-item>
                        <a-form-item class="red" label="자금원천">
                            <FundingSourceSelect placeholder="선택" :width="200" :required="true"
                                v-model:valueInput="store.state.common.ac120.formData.fundingSource" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="14" class="col-2">
                        <a-form-item class="red" label="결의일자">
                            <!-- <date-time-box width="150px" :required="true"
                                v-model:valueDate="store.state.common.ac120.formData.resolutionDate" /> -->
                            <date-time-box width="150px" :required="true"
                                v-model:valueDate="store.state.common.ac120.transactionDetailDate" />
                        </a-form-item>
                        <a-form-item class="red" label="결의서 종류">
                            <radio-group :arrayValue="store.state.common.ac120.arrResolutionType" :layoutCustom="'horizontal'" :required="true"
                                v-model:valueRadioCheck="store.state.common.ac120.formData.resolutionType" />
                        </a-form-item>
                        <a-form-item class="red" label="품의종류">
                            <radio-group :arrayValue="store.state.common.ac120.arrLetterOfApprovalType" :layoutCustom="'horizontal'" :required="true"
                                v-model:valueRadioCheck="store.state.common.ac120.formData.letterOfApprovalType" />
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
// import { initialStateFormAdd } from '../utils/index'
import { ResolutionType, LetterOfApprovalType, enum2Entries  } from "@bankda/jangbuda-common";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {
    },

    setup(props, { emit }) {
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear)
        const countKey = ref<number>(0)
        
        const refFormAddAC120 = ref()
        
        const dataQueryGetBankBooks = ref({
            companyId: companyId,
            fiscalYear: globalYear.value,
        })

        const arraySelectBox = ref([]);
        const triggerBankbooks = ref<boolean>(true);

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
            arraySelectBox.value = []
            if (value.getBankbooks) {
                arraySelectBox.value = value.getBankbooks.map((value: any) => {
                    return {
                        'label': value.bankbookNickname,
                        'value': value.bankbookId
                    }
                })
            }
        })

        watch(() => props.modalStatus, (newValue, old) => {
            if (newValue) {
                store.state.common.ac120.transactionDetailDate = filters.formatDateToInterger(dayjs().set('year', globalYear.value).set('month', store.state.common.ac120.monthSelected - 1).set('date', 1).toDate())
                countKey.value++
            }
        })

        // ================ FUNCTION ============================================
        const submit = () => {
            const res = refFormAddAC120.value?.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                emit('submit', true)
            }
        }
        const cancel = () => {
            emit("closePopup", false)
            if (!store.state.common.ac120.statusFormAdd) {
                console.log(111);
                
                store.state.common.ac120.onDeleteRowAdd
            }
            
        };

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
        return {
            refFormAddAC120,
            // initialStateFormAdd,
            submit,
            cancel,
            arraySelectBox,
            // arrLetterOfApprovalType,
            countKey,
            store,
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
