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
import mutations from "@/graphql/mutations/BF/BF6/BF650/index";
import notification from "@/utils/notification";
export default defineComponent({
    props: {
        modalStatus: Boolean,
        data: Object
    },
    setup(props, { emit }) {
        let mailAction = ref()
        let dataCallApi = ref()
        const {
            mutate: sendRequestFile,
            onDone: onDone,
            onError: onError,
        } = useMutation(mutations.requestCreationIncomeWageDailyPaymentStatementElectronicFilingFile);
        onDone(() => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
            emit("refresh", true)
        })
        onError(e => {
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
                    sendRequestFile(dataCallApi.value)
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

