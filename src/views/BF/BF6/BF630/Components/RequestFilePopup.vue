<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="644">
        <standard-form action="" name="request-file-630">
            <div>
              <div class="eamil-input">
                <span>선택된 내역들의 전자신고파일 제작요청하고, 결과를</span>
                <mail-text-box width="250px" :required="true" v-model:valueInput="dataRequestFile.emailInput.receiverAddress" placeholder="abc@example.com"></mail-text-box>
              </div>
              <div>
                <span>로 메일을 발송하시겠습니까?</span>
              </div>
                    
            </div>
            <div class="text-align-center mt-10">
                <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible()" />
                <button-basic class="button-form-modal" :text="'네. 발송합니다'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="onSubmit" />
            </div>
        </standard-form>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/BF/BF6/BF630/index"
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: {}
        }
    },
    components: {
    },
    setup(props, { emit }) {
        let emailAddress = ref(props.data.emailInput.receiverAddress);
        const dataRequestFile = ref(props.data)
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const {
            mutate: sendRequestFile,
            onDone,
            onError,
            error,
        } = useMutation(mutations.requestCreationIncomeWagePaymentStatementElectronicFilingFile);
        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
              sendRequestFile(dataRequestFile.value);
            }
        };
        onDone(() => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
        })
        onError((e: any) => {
            notification('error', e.message)
        })

        return {
            setModalVisible,
            onSubmit,
            emailAddress,
            dataRequestFile
        }
    },
})
</script>

<style lang="scss" scoped>
.eamil-input {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    span {
        padding-right: 10px;
    }
}
.mt-50 {
    margin-top: 50px;
}

.text-align-center {
    text-align: center;
}

.button-form-modal {
    margin: 0px 5px;
}
</style>
