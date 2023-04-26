<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="644">
        <div class="mt-20 text-align-center">
            <span>선택된 전표외 동일 통장내역의 전표가 있다면, 함께 전표취소됩니다.</span>
            <standard-form action="" class="mt-20">
                <a-row justify="center">
                    <a-col :span="10">
                        <div class="input_info">
                            <a-form-item label="동일 통장내역의 전표">
                                <number-box :width="60" :valueInput="sumHandwritingFalse" disabled="true"/>
                            </a-form-item>
                            <span class="pl-5 mb-5">건</span>
                        </div>
                        <div class="input_info">
                            <a-form-item label="수기입력 전표">
                                <number-box :width="60" :valueInput="sumHandwritingTrue" disabled="true"/>
                            </a-form-item>
                            <span class="pl-5 mb-5">건</span>
                        </div>
                        <div class="input_info">
                            <a-form-item label="전체 전표취소 건수">
                                <number-box :width="60" :valueInput="sumHandwritingTrueFalse" disabled="true"/>
                            </a-form-item>
                            <span class="pl-5 mb-5">건</span>
                        </div>
                    </a-col>
                </a-row>
                <div class="mt-10"><span>상기의 전표들을 취소하시겠습니까?</span></div>
                <div class="mt-20">
                    <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                        @onClick="cancel" />
                    <button-basic class="button-form-modal" :text="'네. 취소합니다'" :type="'default'"
                        :mode="'contained'" @onClick="submit" />
                </div>
            </standard-form>
        </div>
    </a-modal>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { companyId } from "@/helpers/commonFunction"
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { useMutation } from '@vue/apollo-composable';
import mutations from "@/graphql/mutations/AC/AC1/AC120";
import notification from '@/utils/notification';
import { Message } from "@/configs/enum"
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        dataRows: {
            type: Array,
            default: [],
        }
    },
    components: {
    },

    setup(props, { emit }) {
        const store = useStore();
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
        const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));

        const sumHandwritingTrue = ref(0)
        const sumHandwritingFalse = ref(0)
        const sumHandwritingTrueFalse = ref(0)
        
        // =================== GRAPHQL ===================
        // mutation unregisterAccountingDocument    ----- handwriting = true
        const {
            mutate: mutateUnregisterAccountingDocument, onDone: doneUnregisterAccountingDocument, onError: errorUnregisterAccountingDocument,
        } = useMutation(mutations.unregisterAccountingDocument);

        // mutation initializeTransactionDetails    ----- handwriting = false
        const {
            mutate: mutateInitializeTransactionDetails, onDone: doneInitializeTransactionDetails, onError: errorInitializeTransactionDetails,
        } = useMutation(mutations.initializeTransactionDetails);

        // ============== ON DONE MUTATION GRAPHQL ===============
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


        watch(() => props.modalStatus, async (newValue, old) => {
            if (newValue) {
                sumHandwritingTrue.value = 0
                sumHandwritingFalse.value = 0
                props.dataRows.map((row: any) => {
                    if (row.handwriting === true) {
                        sumHandwritingTrue.value++ 
                    } else if (row.handwriting === false) {
                        sumHandwritingFalse.value++ 
                    }
                })
                sumHandwritingTrueFalse.value = sumHandwritingTrue.value + sumHandwritingFalse.value
            }
        })

        // ================ FUNCTION ============================================
        const cancel = () => {
            emit("closePopup", false)
        };
        const submit = () => {
            props.dataRows.map((row: any) => {
                if (row.handwriting === true) {
                    mutateUnregisterAccountingDocument({
                        companyId: companyId,
                        fiscalYear: acYear.value,
                        facilityBusinessId: globalFacilityBizId.value,
                        transactionDetailDate: row.transactionDetailDate,
                        accountingDocumentId: row.accountingDocumentId
                    })
                } else if (row.handwriting === false) {
                    mutateInitializeTransactionDetails({
                        companyId: companyId,
                        fiscalYear: acYear.value,
                        facilityBusinessId: globalFacilityBizId.value,
                        bankbookDetailDate: row.transactionDetailDate,
                        bankbookDetailId: row.bankbookDetailId
                    })
                }
            })
        }
        return {
            sumHandwritingTrueFalse, sumHandwritingTrue, sumHandwritingFalse,
            submit,
            cancel
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

.input_info {
    display: flex;
    align-items: center;
}

// :deep .col-1 .ant-form-item-label {
//     >label {
//         width: 150px;
//     }
// }
:deep .ant-form-item-label {
    >label {
        width: 150px;
    }
}
</style>
