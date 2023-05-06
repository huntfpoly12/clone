<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" footer=""
        :width="562">
        <standard-form action="" name="add-ac570">
            <div class="custom-modal mt-20">
                <div class="custom-center">
                    <a-form-item label="전용일자" class="red">
                        <date-time-box width="230px" dateFormat="YYYY-MM-DD" :required="true" />
                    </a-form-item>
                    <a-form-item label="원천계정과목" class="red">
                        <account-code-select width="230px" :required="true" />
                    </a-form-item>
                    <a-form-item label="전용계정과목" class="red">
                        <account-code-select width="230px" :required="true" />
                    </a-form-item>
                    <a-form-item label="전용액" class="red">
                        <number-box-money width="230px" :required="true" placeholder="음수가능"/>
                    </a-form-item>
                    <div class="text-align-center mt-20"><span>과목전용조서를 등록하시겠습니까?</span></div>
                </div>
            </div>
            <div class="text-align-center mt-20">
                <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible()" />
                <button-basic class="button-form-modal" :text="'네. 등록합니다'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="onSubmit" />
            </div>
        </standard-form>
    </a-modal>
    <detail-popup :modalStatus="modalStatusDetail" @closePopup="modalStatusDetail = false"/>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import { Message } from "@/configs/enum";
import mutations from "@/graphql/mutations/AC/AC5/AC570";
import DetailPopup from './DetailPopup.vue';
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
        DetailPopup
    },
    setup(props, { emit }) {
        const modalStatusDetail = ref<boolean>(false)

        // mutation createBudgetSubjectTransition
        const {
            mutate: createBudgetSubjectTransition, onDone: doneCreateBudgetSubjectTransition, onError: errorCreateBudgetSubjectTransition,
        } = useMutation(mutations.createBudgetSubjectTransition);
        // createBudgetSubjectTransition
        doneCreateBudgetSubjectTransition((e) => {
            notification('success', Message.getMessage('COMMON', '101').message)
        })
        errorCreateBudgetSubjectTransition(e => {
            notification('error', e.message)
        })

        const setModalVisible = () => {
            emit("closePopup", false)
        };

        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                
            }
            modalStatusDetail.value = true;
        };

        watch(() => props.modalStatus, (value) => {

        })

        return {
            setModalVisible,
            onSubmit,
            labelCol: { style: { width: "150px" } },
            modalStatusDetail,
        }
    },
})
</script>

<style lang="scss">
.custom-modal {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
}

.custom-modal .ant-form-item-label>label {
    width: 130px;
    padding-left: 10px;
}
.text-align-center {
    text-align: center;
}

.button-form-modal {
    margin: 0px 5px;
}
</style>
