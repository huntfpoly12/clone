<template>
    <div id="add-popup-130">
        <a-modal :visible="modalStatus" :title="title" centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" :mask-closable="false" width="650px" footer="">
            <standard-form formName="add-cm-310">
                <a-spin tip="Loading..." :spinning="loading">
                    <h2 style="font-weight: 600; color: gray" class="title_modal">
                        급여항목추가
                    </h2>
                    <a-row>
                        <a-col :span="14">
                            <a-form-item label="항목명" :label-col="labelCol" class="red">
                                <default-text-box style="width: 150px; margin-right: 10px" :required="true"
                                    v-model:valueInput="formState.name">
                                </default-text-box>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <a-form-item label="과세구분/유형" :label-col="labelCol" class="red">
                                <TaxPay style="width: 320px" placeholder="선택"
                                    v-model:selectedValue="formState.taxPayCode" :required="true"></TaxPay>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <a-form-item label="산출방법" :label-col="labelCol">
                                <default-text-box style="width: 320px" placeholder="예) 통상시급 x 연장근로시간 x 1.5"
                                    v-model:valueInput="formState.formula">
                                </default-text-box>
                            </a-form-item>
                            <div style="margin: 0px 0px 20px 150px">
                                <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                                <span class="style-note">
                                    급여명세서 계산방법에 표시됩니다.
                                </span>
                            </div>
                        </a-col>

                    </a-row>
                </a-spin>
                <div class="text-align-center mt-20">
                    <button-basic class="button-form-modal" :text="'그냥 나가기'" :type="'default'" :mode="'outlined'"
                        @onClick="setModalVisible()" />
                    <button-basic class="button-form-modal" :loading="loading" :text="'저장하고 나가기'" :width="140"
                        :type="'default'" :mode="'contained'" @onClick="onSubmit($event)" />
                </div>
            </standard-form>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, watch } from "vue";
import { companyId } from "@/helpers/commonFunction";
import TaxPay from "@/components/TaxPay.vue";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/CM/CM130/index";
import notification from "@/utils/notification";
import { initialState } from "../utils/data";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import dayjs, { Dayjs } from "dayjs";

export default defineComponent({
    props: ["modalStatus", "data", "msg", "title", "itemCodeMax"],

    components: {
        TaxPay,
    },

    setup(props, { emit }) {

        const formState = reactive({ ...initialState });

        let objDataDefault = ref({ ...initialState });

        watch(() => props.modalStatus, (value) => {
            Object.assign(formState, initialState);
        })
        // Create With holding Config Pay Item
        const {
            mutate: creactConfigPayItem,
            loading: loading,
            onDone: onDoneAdd,
            onError: errorPayItem,
            error,
        } = useMutation(mutations.createWithholdingConfigPayItem);

        errorPayItem((error) => {
            notification('error', error.message)
        });
        onDoneAdd((res) => {
            notification('success', `원천항목 새로 추가되었습니다!`)
            emit('closePopup', false)
        });

        const onSubmit = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                let variables = {
                    companyId: companyId,
                    imputedYear: parseInt(dayjs().format("YYYY")),
                    input: {
                        itemCode: props.itemCodeMax+1,
                        name: formState.name,
                        use: formState.use,
                        sort: 0,
                        formula: formState.formula,
                        tax: formState.taxPayCode[0] === "비과세" ? false : true,
                        taxfreePayItemCode:
                            formState.taxPayCode[0] === "비과세" ? formState.taxPayCode[1] : null,
                        taxPayItemCode:
                            formState.taxPayCode[0] === "과세" ? formState.taxPayCode[1] : null,
                    },
                };

                creactConfigPayItem(variables);
            }
        };
        const setModalVisible = () => {
            if (JSON.stringify(objDataDefault.value) === JSON.stringify(formState) == true)
                emit("closePopup", false)
            else
                comfirmClosePopup(() => emit('closePopup', false))
        };
        return {
            formState,
            labelCol: { style: { width: "150px" } },
            onSubmit,
            loading,
            setModalVisible,
        };
    },
});
</script>
<style lang="scss" scoped src="../style/style.scss">
::v-deep ul.ant-cascader-menu {
    height: auto;
    max-height: 180px;
}
</style>
