<template>
    <div id="edit-popup-130">
        <a-modal :visible="modalStatus" :title="title" centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" width="700px" :mask-closable="false" footer="">
            <a-spin tip="Loading..." :spinning="loading">
                <a-form :model="formState" :label-col="labelCol">
                    <h2 style="font-weight: 600; color: gray" class="title_modal">
                        급여상세항목
                    </h2>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="코드">
                                <number-box :width="150" placeholder="Number box" :min="0" :max="30" :disabled="true"
                                    v-model:valueInput="formState.itemCode" :spinButtons="true">
                                </number-box>
                            </a-form-item>
                        </a-col>
                        <a-col :span="3"></a-col>
                        <a-col :span="9">
                            <switch-basic style="width: 80px;" v-model:valueSwitch="formState.use" :textCheck="'이용중'"
                                :textUnCheck="'이용중지'" />
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="12">
                            <a-form-item label="항목명">
                                <default-text-box style="width: 150px; margin-right: 10px"
                                    v-model:valueInput="formState.name">
                                </default-text-box>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <a-form-item label="과세구분/유형 ">
                                <div style="width: 320px;">
                                    <TaxPay placeholder="선택" v-model:selectedValue="formState.taxPayCode" :disabled="true"></TaxPay>
                                </div>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-spin>
            <div class="text-align-center mt-20">
                <button-basic class="button-form-modal" :text="'그냥 나가기'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible()" />
                <button-basic class="button-form-modal" :loading="loading" :text="'저장하고 나가기'" :width="140"
                    :type="'default'" :mode="'contained'" @onClick="onSubmit" />
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { DxNumberBox } from "devextreme-vue/number-box";
import { companyId } from "../../../../../helpers/commonFunction";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { ref, defineComponent, reactive, watch } from "vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import notification from "../../../../../utils/notification";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);
import queries from "../../../../../graphql/queries/CM/CM130/index";
import mutations from "../../../../../graphql/mutations/CM/CM130/index";
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
} from "devextreme-vue/data-grid";
import {
    SearchOutlined,
    WarningOutlined,
    MailOutlined,
    MenuOutlined,
} from "@ant-design/icons-vue";
import TaxPay from "../../../../../components/TaxPay.vue";

export default defineComponent({
    props: ["modalStatus", "data", "msg", "title", "idRowEdit"],

    components: {
        MenuOutlined,
        SearchOutlined,
        WarningOutlined,
        MailOutlined,
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection,
        DxExport,
        DxSearchPanel,
        DxSelectBox,
        DxNumberBox,
        TaxPay
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

        const initialState = {
            itemCode: 0,
            taxPayCode: Array(),
            name: '',
            use: false,
            formula: ''
        };
        const formState = reactive({ ...initialState });

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
            setModalVisible();
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
            emit("closePopup", false);
        }
        return {
            labelCol: { style: { width: "150px" } },
            formState,
            loading,
            onSubmit,
            setModalVisible,
            value: ref<string[]>(["과세", "G03"]),
        };
    },
    methods: {

    },
});
</script>
<style lang="scss" scoped src="../style/style.scss">
</style>
