<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="562">
        <standard-form action="" name="email-single-630">
            <img src="@/assets/images/emailGroup.png" alt="" style="width: 40px;">
            <div class="custom-modal-send-email">
                <div>
                    <span>개별 메일이 발송되며, 개별 메일이 등록되지 않은 경우에 한해서 </span>
                    <div style="display: flex;align-items: center;">
                        <mail-text-box width="250px" :required="true" v-model:valueInput="emailAddress"></mail-text-box>
                        <span>로 메일을 발송하시겠습니까?</span>
                    </div>
                </div>
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
import { defineComponent, watch, ref, computed } from 'vue'
import notification from "@/utils/notification";
import { useStore } from 'vuex'
import { userId } from "@/helpers/commonFunction";
import { companyId } from '@/helpers/commonFunction';
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA1/PA110/index"
import queriesGetUser from "@/graphql/queries/BF/BF2/BF210/index";
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
        const store = useStore()
        const globalYear = computed(() => store.state.settings.globalYear)
        let emailAddress = ref('');

        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const {
            onResult: onResultUserInf
        } = useQuery(queriesGetUser.getUser, { id: userId }, () => ({
            fetchPolicy: "no-cache",
        }));
        onResultUserInf(e => {
            emailAddress.value = e.data.getUser.email
        })

        const {
            mutate: sendEmail,
            onDone: onDoneAdd,
            onError: errorSendEmail,
            error,
        } = useMutation(mutations.sendIncomeWageSalaryStatementReportEmail);

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