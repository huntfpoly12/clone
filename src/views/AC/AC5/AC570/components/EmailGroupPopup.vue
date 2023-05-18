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
import mutations from "@/graphql/mutations/AC/AC5/AC570/index"
import { Message } from "@/configs/enum";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        selectedRowKeys: {
            type: Object,
            default: {}
        }
    },
    components: {
    },
    setup(props, { emit }) {
        const store = useStore()
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
        const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));
        // const token = computed(() => sessionStorage.getItem('token'));
        // store.dispatch('auth/getUserInfor', token.value);
        const userInfor = computed(() => store.state.auth.userInfor);
        let emailAddress = ref('');
        watch(() => props.modalStatus, (val) => {
            if (val) {
                emailAddress.value = userInfor.value?.email
            }
        });
        const setModalVisible = () => {
            emit("closePopup", false)
        };

        // mutation sendBudgetSubjectTransitionReportEmail
        const {
            mutate: sendBudgetSubjectTransitionReportEmail, onDone: doneSendBudgetSubjectTransitionReportEmail, onError: errorSendBudgetSubjectTransitionReportEmail,
        } = useMutation(mutations.sendBudgetSubjectTransitionReportEmail);

        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                sendBudgetSubjectTransitionReportEmail({
                    companyId: companyId,
                    fiscalYear: acYear.value,
                    facilityBusinessId: globalFacilityBizId.value,
                    transitionIds: props.selectedRowKeys,
                    emailInput: {
                        senderName: sessionStorage.getItem("username"),
                        receiverName: userInfor.value?.name,
                        receiverAddress: emailAddress.value,
                    }
                })
            }
        };

        // sendBudgetSubjectTransitionReportEmail
        doneSendBudgetSubjectTransitionReportEmail((e) => {
            emit("closePopup", false)
            notification('success', Message.getMessage('COMMON', '801').message)
        })
        errorSendBudgetSubjectTransitionReportEmail(e => {
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