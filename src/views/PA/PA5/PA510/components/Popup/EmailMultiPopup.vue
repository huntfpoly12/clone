<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="562">
        <standard-form action="" name="email-single-630">
            <div class="custom-modal-send-email">
                <img src="@/assets/images/emailGroup.png" alt="" style="width: 50px;">
                <div>
                    <span>개별 메일이 발송되며, 개별 메일이 등록되지 않은 경우에 한해서 </span>
                    <div style="display: flex;align-items: center;">
                        <mail-text-box width="250px" :required="true" v-model:valueInput="emailAddress"></mail-text-box>
                        <span>로 메일을 발송하시겠습니까?</span>
                    </div>
                </div>
            </div>
            <div class="text-align-center mt-50">
                <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible()" />
                <button-basic class="button-form-modal" :text="'네. 발송합니다'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="onSubmit" />
            </div>
        </standard-form>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue'
import notification from "@/utils/notification";
import { useStore } from 'vuex'
import { companyId } from '@/helpers/commonFunction';
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA5/PA510/index"
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: {}
        },
        emailAddress: String,
    },
    components: {
    },
    setup(props, { emit }) {
        const store = useStore()
        const globalYear = computed(() => store.state.settings.globalYear)
        let emailAddress: any = ref('');
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        watch(() => props.modalStatus, (val) => {
            if (val) {
                emailAddress.value = props.emailAddress
            }
        });

        const {
            mutate: sendEmail,
            onDone: onDoneAdd,
            onError: errorSendEmail
        } = useMutation(mutations.sendIncomeWageDailySalaryStatementReportEmail);
        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                let variables: any = []
                props.data.map((value: any) => {
                    variables.push({
                        senderName: sessionStorage.getItem("username"),
                        receiverName: value.employee.name,
                        receiverAddress: emailAddress.value,
                        incomeId: value.incomeId
                    })
                })
                sendEmail({
                    companyId: companyId,
                    imputedYear: globalYear.value,
                    incomeInputs: variables,
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