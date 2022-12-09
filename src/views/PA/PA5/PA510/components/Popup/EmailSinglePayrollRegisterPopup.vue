<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="562">
        <standard-form action="" name="email-single-630">
            <div class="custom-modal-send-email">
                    <img src="@/assets/images/email.svg" alt="" />
                    <mail-text-box width="250px" :required="true" v-model:valueInput="emailAddress"></mail-text-box>
                    <span>로 메일을 발송하시겠습니까?</span>
            </div>
            <div class="text-align-center mt-50">
                <button-basic class="button-form-modal" :text="'그냥 나가기'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible()" />
                <button-basic class="button-form-modal" :text="'저장하고 나가기'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="onSubmit" />
            </div>
        </standard-form>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA//PA5/PA510/index"
import { companyId } from '@/helpers/commonFunction';
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
        let emailAddress = ref('');
        watch(() => props.data, (val) => {
            emailAddress.value = val?.employee.email
        });
        
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const {
            mutate: sendEmail,
            onDone: onDoneAdd,
            onError: errorSendEmail,
            error,
        } = useMutation(mutations.sendIncomeWageDailyPayrollRegisterReportEmail);
        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                sendEmail({
                    companyId: companyId,
                    input: {
                        imputedYear: 2022,
                        imputedMonth: 12,
                        paymentYear: 2022,
                        paymentMonth: 12,
                        sortType: "부서별"
                    },
                    emailInput: {
                        senderName: sessionStorage.getItem("username"),
                        receiverName: props.data.employee.name,
                        receiverAddress: emailAddress.value,
                    }
                });
            }
        };
        onDoneAdd(() => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
        })
        errorSendEmail((e: any) => {
            notification('error', e.message)
        })

        return {
            setModalVisible,
            onSubmit,
            emailAddress,
        }
    },
})
</script>

<style lang="scss" scoped>
.custom-modal-send-email {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    margin-top: 20px;

    img {
        width: 40px;
        margin-right: 5px;
    }

    span {
        padding-left: 5px;
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