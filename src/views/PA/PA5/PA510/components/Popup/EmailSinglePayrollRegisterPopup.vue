<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="562">
        <standard-form action="" name="email-single-630">
            <div class="custom-modal-send-email">
                <img src="@/assets/images/email.svg" alt="" />
                <span>급여대장을 출력하시겠습니까? </span>
                <DxSelectBox :data-source="dataSelect" :style="{ width: '100px', display: 'inline-block' }"
                    v-model:value="valueSelect" value-expr="value" display-expr="name" :required="true">
                </DxSelectBox>
            </div>
            <div class="custom-modal-send-email">개별 메일이 발송되며, 개별 메일이 등록되지 않은 경우에 한해서</div>
            <div class="custom-modal-send-email" style="margin-top: 0;">
                <mail-text-box width="250px" :required="true" v-model:valueInput="emailAddress"
                    placeholder="abc@example.com" />
                <span>로 메일을 발송하시겠습니까?</span>
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
import { useStore } from 'vuex'
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA//PA5/PA510/index"
import { companyId } from '@/helpers/commonFunction';
import DxSelectBox from "devextreme-vue/select-box";
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
        DxSelectBox,
    },
    setup(props, { emit }) {
        const store = useStore()
        const processKey = computed(() => store.state.common.processKeyPA510)
        let emailAddress: any = ref('');
        const dataSelect = ref([
            { name: '사번순', value: '사번' },
            { name: '부서순', value: '부서' },
            { name: '직위순', value: '직위' },
        ])
        const valueSelect = ref('사번')
        watch(() => props.modalStatus, (val) => {
            if (val) {
                emailAddress.value = props.emailAddress
            }
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
                        imputedYear: processKey.value.imputedYear,
                        imputedMonth: processKey.value.imputedMonth,
                        paymentYear: processKey.value.paymentYear,
                        paymentMonth: processKey.value.paymentMonth,
                        sortType: valueSelect.value
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
            dataSelect,
            valueSelect,
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
        padding: 0 5px;
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