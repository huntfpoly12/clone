<template>
    <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="" okText="네. 발송합니다" cancelText="아니요"
        width="650px" @cancel="setModalVisible">
        <standard-form>
            <div class="mt-25">
                <div class="d-flex-center">
                    <span class="mr-10">
                        선택된 내역들의 전자신고파일 제작요청하고, 결과를
                    </span>
                    <mail-text-box width="250" v-model:valueInput="mailAction" required="true" />
                </div>
                <span>
                    로 메일을 발송하시겠습니까?
                </span>
            </div>
            <div class="d-flex-center mt-10" style="justify-content: center;">
                <button-basic :text="'아니요'" :type="'default'" :mode="'outlined'" @onClick="setModalVisible()" />
                <button-basic class=" ml-5" :text="'네. 발송합니다'" :width="140" :type="'default'" :mode="'contained'"
                    @onClick="onSubmit" />
            </div>
        </standard-form>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import { useMutation } from "@vue/apollo-composable"
import mutations from "@/graphql/mutations/BF/BF6/BF640/index";
import notification from "@/utils/notification";
export default defineComponent({
    props: {
        modalStatus: Boolean,
        data: Object,
        step: Number
    },
    setup(props, { emit }) {
        let mailAction = ref()
        let dataCallApi = ref()
        // query send request file tab 1
        const {
            mutate: sendRequestFileTab1,
            onDone: onDoneTab1,
            onError: onErrorTab1,
        } = useMutation(mutations.requestCreationIncomeWageSimplifiedPaymentStatementElectronicFilingFile);
        onDoneTab1(() => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
        })
        onErrorTab1(e => {
            notification('error', e.message)
        })
        // query send request file tab 2
        const {
            mutate: sendRequestFileTab2,
            onDone: onDoneTab2,
            onError: onErrorTab2,
        } = useMutation(mutations.requestCreationIncomeBusinessSimplifiedPaymentStatementElectronicFilingFile);
        onDoneTab2(() => {
            notification('success', `업데이트 완료!`)
            emit("sendActionSaveDone", false) 
        })
        onErrorTab2(e => {
            notification('error', e.message)
        })
        watch(() => props.modalStatus, (newVal) => {
            if (newVal == true)
                mailAction.value = props.data?.emailInput.receiverAddress
        })
        const setModalVisible = () => {
            emit("closePopup", true)
        }
        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                dataCallApi.value = {
                    ...props.data,
                }
                dataCallApi.value.emailInput.receiverAddress = mailAction.value
                if (dataCallApi) {
                    if (props.step == 1)
                        sendRequestFileTab1(dataCallApi.value)
                    else if (props.step == 2)
                        sendRequestFileTab2(dataCallApi.value)
                }
            }
        }
        return {
            mailAction,
            onSubmit, setModalVisible
        }
    }
})
</script>   