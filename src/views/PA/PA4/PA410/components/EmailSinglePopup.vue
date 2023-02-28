<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="562">
        <standard-form action="" name="email-single-430">
          
            <div class="custom-modal-send-email">
              <img src="@/assets/images/email.svg" alt="" /><span>로 메일을 발송하시겠습니까?</span>
              <div class="mail-input">
                <mail-text-box width="250px" :required="true" v-model:valueInput="emailAddress"></mail-text-box>
                <span>로 메일을 발송하시겠습니까?</span>
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
import { defineComponent, watch, ref, reactive } from 'vue'
import { useStore } from 'vuex';
import { companyId } from "@/helpers/commonFunction"
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA4/PA410/index"
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
        const store = useStore();
        const userInfor = reactive(store.state.auth.userInfor)
        const empployeeDetail = reactive(
            store.state.common.arrayEmployeePA410.filter(function(item : any) { 
                return item.employeeId ==  store.state.common.employeeIdPA410; 
            })
        )
        let emailAddress = ref(empployeeDetail[0].email);
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const {
            mutate: sendEmail,
            onDone: onDoneAdd,
            onError: errorSendEmail,
            error,
        } = useMutation(mutations.sendCalculateIncomeRetirementEmail);

        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                let variables = {
                    companyId: companyId,
                    input: props.data,
                    emailInput: {
                        senderName: userInfor.username,
                        receiverName: empployeeDetail[0].name,
                        receiverAddress: empployeeDetail[0].email
                    }
                }
                // variables.employeeInputs.receiverAddress = emailAddress.value
                sendEmail(variables);
            }
        };
        onDoneAdd(() => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
        })
        errorSendEmail((e: any) => {
            notification('error', e.message)
        })
        watch(() => props.modalStatus, (value) => {

        })

        return {
            setModalVisible,
            onSubmit,
            emailAddress,
            empployeeDetail,
            userInfor
        }
    },
})
</script>

<style lang="scss">
.custom-modal-send-email {
    align-items: center;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
    .mail-input{
      display: flex;
      margin-left: 50px;
    }
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
