<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
        <standard-form action="" name="print-payroll-register-510">
            <div class="custom-modal-print-payroll-register">
                    <img src="@/assets/images/print.svg" alt="" style="width: 30px;">
                    <span>급여대장을 출력하시겠습니까? </span>
                    <DxSelectBox :data-source="dataSelect" :style="{ width: '100px', display: 'inline-block' }"
                        v-model:value="valueSelect" value-expr="id" display-expr="name" :required="true">
                    </DxSelectBox>
            </div>
            <div class="text-align-center mt-30">
                <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible" />
                <button-basic class="button-form-modal" :text="'네. 출력합니다'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="onSubmit" />
            </div>
        </standard-form>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import DxSelectBox from "devextreme-vue/select-box";
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import query from "@/graphql/queries/PA/PA5/PA510/index";
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
        DxSelectBox,
    },
    setup(props, { emit }) {

        const setModalVisible = () => {
            emit("closePopup", false)
        };

        const dataSelect = ref([
            { id: 1, name: '전체'},
            { id: 2, name: '부서별'},
            { id: 3, name: '직위별'},
        ])
         const valueSelect = ref('')

        // const {
        //     mutate: sendEmail,
        //     onDone: onDoneAdd,
        //     onError: errorSendEmail,
        //     error,
        // } = useMutation(query.getIncomeWageDailyPayrollRegisterViewUrl);
        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                // props.data.employeeInputs.map((value: any) => {
                    
                // })
                // let variables = props.data
                // sendEmail(variables);
            }
        };
        // onDoneAdd(() => {
        //     notification('success', `업데이트 완료!`)
        //     emit("closePopup", false)
        // })
        // errorSendEmail((e: any) => {
        //     notification('error', e.message)
        // })

        return {
            setModalVisible,
            onSubmit,
            dataSelect,
            valueSelect,
        }
    },
})
</script>

<style lang="scss">
.custom-modal-print-payroll-register {
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
        padding: 0px 5px;
    }
}

.mt-30 {
    margin-top: 30px;
}

.text-align-center {
    text-align: center;
}

.button-form-modal {
    margin: 0px 5px;
}
</style>