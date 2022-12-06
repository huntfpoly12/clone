<template>
    <div id="edit-popup-130">
        <a-modal :visible="modalStatus" :title="title" centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" width="700px" :mask-closable="false" footer="">
            <standard-form formName="edit-cm-310">
                <a-spin tip="Loading..." :spinning="loading">
                    <h2 style="font-weight: 600; color: gray" class="title_modal">
                        급여상세항목
                    </h2>
                    <a-row :gutter="24">
                        <a-col :span="14">
                            <a-form-item label="코드" :label-col="labelCol">
                                <number-box :width="150" placeholder="Number box" :min="0" :max="30" :disabled="true"
                                    v-model:valueInput="formState.itemCode" :spinButtons="true">
                                </number-box>
                            </a-form-item>
                        </a-col>
                        <a-col :span="4"></a-col>
                        <a-col :span="6">
                            <switch-basic style="width: 80px;" v-model:valueSwitch="formState.use" :textCheck="'이용중'"
                                :textUnCheck="'이용중지'" />
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="14">
                            <a-form-item label="항목명" :label-col="labelCol" class="red">
                                <default-text-box style="width: 150px; margin-right: 10px"
                                :requied="true"
                                    v-model:valueInput="formState.name">
                                </default-text-box>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <a-form-item label="과세구분/유형" :label-col="labelCol">
                                <div style="width: 320px;">
                                    <TaxPay placeholder="선택" v-model:selectedValue="formState.taxPayCode"
                                        :disabled="true"></TaxPay>
                                </div>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <a-form-item label="산출방법" :label-col="labelCol">
                                <default-text-box style="width: 320px"
                                placeholder="예) 통상시급 x 연장근로시간 x 1.5"
                                    v-model:valueInput="formState.formula">
                                </default-text-box>
                            </a-form-item>
                            <div style="margin: 0px 0px 20px 150px">
                                <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                                <span style="margin-left: 5px">
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
                        :type="'default'" :mode="'contained'" @onClick="onSubmit" />
                </div>
            </standard-form>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { companyId } from "@/helpers/commonFunction";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { ref, defineComponent, reactive, watch } from "vue";
import notification from "@/utils/notification";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { initialState } from "../utils/data"
dayjs.extend(weekday);
dayjs.extend(localeData);
import queries from "@/graphql/queries/CM/CM130/index";
import mutations from "@/graphql/mutations/CM/CM130/index";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import TaxPay from "@/components/TaxPay.vue";

export default defineComponent({
    props: ["modalStatus", "data", "msg", "title", "idRowEdit"],

    components: {
        TaxPay,
    },
    setup(props, { emit }) {
        let trigger = ref<boolean>(false);
        const dataQuery = ref();
        watch(
            () => props.modalStatus,
            (newValue) => {
                trigger.value = true;
                if (newValue) {
                    dataQuery.value = { companyId: companyId, imputedYear: parseInt(dayjs().format('YYYY')), itemCode: props.idRowEdit };
                    refetchConfigPayItem();
                } else {
                    Object.assign(formState, initialState);
                    trigger.value = false;
                }
            }
        );
        const formState = reactive({ ...initialState });

        let objDataDefault = ref({ ...initialState });
        // get detail withholding config pay item
        const { result: resultConfigPayItem, loading, refetch: refetchConfigPayItem } = useQuery(
            queries.getWithholdingConfigPayItem,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );

        watch(resultConfigPayItem, (value) => {
            if (value) {
                formState.itemCode = value.getWithholdingConfigPayItem.itemCode;
                formState.taxPayCode = value.getWithholdingConfigPayItem.taxfreePayItemCode != null ? ['비과세', value.getWithholdingConfigPayItem.taxfreePayItemCode] : ['과세', value.getWithholdingConfigPayItem.taxPayItemCode];
                formState.name = value.getWithholdingConfigPayItem.name;
                formState.use = value.getWithholdingConfigPayItem.use;
                formState.formula = value.getWithholdingConfigPayItem.formula;
                objDataDefault.value = { ...formState };
            }
        });

        // update detail withholding config pay item
        const { mutate: actionUpdateWithholdingConfigPayItem, onDone: onDoneUpdated, onError: errorPayItem } = useMutation(
            mutations.updateWithholdingConfigPayItem
        );

        errorPayItem((error) => {
            notification('error', error.message)
        })
        onDoneUpdated(() => {
            notification('success', `업데이트 성공되었습니다!`)
            refetchConfigPayItem();
            emit("closePopup", false);
        });

        const onSubmit = () => {
            let variables = {
                companyId: companyId,
                imputedYear: parseInt(dayjs().format('YYYY')),
                itemCode: formState.itemCode,
                input: {
                    name: formState.name,
                    use: formState.use,
                    formula: formState.formula
                }
            };
            actionUpdateWithholdingConfigPayItem(variables)
        };
        const setModalVisible = () => {
            if (JSON.stringify(objDataDefault.value) === JSON.stringify(formState) == true)
                emit("closePopup", false)
            else
                comfirmClosePopup(() => emit('closePopup', false))
        }
        return {
            labelCol: { style: { width: "150px" } },
            formState,
            loading,
            onSubmit,
            setModalVisible,
            // value: ref<string[]>(["과세", "G03"]),
        };
    },
    methods: {

    },
});
</script>
<style lang="scss" scoped src="../style/style.scss">

</style>
