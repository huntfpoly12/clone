<template>
    <a-modal v-if="groupSendMail == false" :visible="modalStatus" @cancel="setModalVisible" width="562px" footer=""
        :mask-closable="false">
        <standard-form>
            <div class="custom-modal-send-email">
                <img src="@/assets/images/email.svg" alt="" style="width: 40px;">
                <mail-text-box :required="true" v-model:valueInput="email" width="250px" />
                <span>로 메일을 발송하시겠습니까?</span>
            </div>
            <a-row style="margin-top: 50px;">
                <a-col :span="16" :offset="8">
                    <button-basic text="아니요" type="default" mode="outlined" @onClick="setModalVisible()" :width="100"
                        style="margin-right: 10px;" />
                    <button-basic text="네. 발송합니다" :type="'default'" mode="'contained'" @onClick="sendEmail($event)"
                        :width="150" />
                </a-col>
            </a-row>
        </standard-form>
    </a-modal>
    <a-modal v-else :visible="modalStatus" @cancel="setModalVisible" width="562px" footer="" :mask-closable="false">
        <standard-form>
            <img src="@/assets/images/email.svg" alt="" style="width: 40px;">
            <div class="custom-modal-send-email">
                <div>
                    <span>개별 메일이 발송되며, 개별 메일이 등록되지 않은 경우에 한해서 </span>
                    <div style="display: flex;align-items: center;">
                        <mail-text-box :required="true" v-model:valueInput="email" width="250px" />
                        <span>로 메일을 발송하시겠습니까?</span>
                    </div>
                </div>
            </div>
            <a-row style="margin-top: 50px;">
                <a-col :span="16" :offset="8">
                    <button-basic text="아니요" type="default" mode="outlined" @onClick="setModalVisible()" :width="100"
                        style="margin-right: 10px;" />
                    <button-basic text="네. 발송합니다" :type="'default'" mode="'contained'" @onClick="sendEmail($event)"
                        :width="150" />
                </a-col>
            </a-row>
        </standard-form>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA5/PA530/index"; 
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean
        },
        dataPopup: {
            type: Object
        },
        imputedYear: {
            type: Number
        },
        paymentYearMonths: {
            type: Array
        },
        type: {
            type: Boolean
        },
        receiptDate: {
            type: Number
        },
        companyId: {
            type: String
        },
        groupSendMail: {
            type: Boolean,
            default: false
        },
        emailUserLogin: {
            type: String,
        }
    },
    setup(props, { emit }) {
        const modalStatus = ref()
        const email = ref()
        const setModalVisible = () => {
            modalStatus.value = false
            emit('closePopup', false)
        }
        watch(() => props.dataPopup, (val) => {
            modalStatus.value = props.modalStatus
            if (props.groupSendMail == false)
                email.value = val?.receiverAddress
            else
                email.value = props.emailUserLogin
        });
        const {
            mutate,
            onError,
            onDone,
        } = useMutation(mutations.sendEmail);
        onError(e => {
            notification('error', e.message)
            setModalVisible();
        })
        onDone(e => {
            notification('success', `업데이트 완료!`)
            setModalVisible();
        })
        const sendEmail = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                let employeeInputsCall: any = []
                if (props.groupSendMail == false) {
                    employeeInputsCall = [{
                        ...props.dataPopup,
                        receiverAddress: email.value
                    }]
                } else {
                    employeeInputsCall = props.dataPopup
                    employeeInputsCall.map((val: any) => {
                        if (val.receiverAddress == null)
                            val.receiverAddress = email.value
                    })
                }
                console.log(props.receiptDate);
                let dataSendEmail = {
                    companyId: props.companyId,
                    input: {
                        imputedYear: props.imputedYear,
                        paymentYearMonths: props.paymentYearMonths,
                        type: props.type == true ? 1 : 2,
                        receiptDate: props.receiptDate
                    },
                    employeeInputs: employeeInputsCall
                }
                mutate(dataSendEmail)
            }
        }
        return {
            modalStatus,
            email,
            sendEmail,
            setModalVisible
        }
    }
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
        margin-right: 5px;
    }
    span {
        padding-left: 5px;
    }
}
</style>