<template>
    <div id="edit-popup-130">
        <a-modal :visible="modalStatus" :title="title" centered okText="저장하고 나가기" cancelText="그냥 나가기"
            @cancel="setModalVisible()" :mask-closable="false" width="650px" footer="">
            <a-spin tip="Loading..." :spinning="loading">
                <a-form :model="formState" :label-col="labelCol">
                    <h2 style="font-weight: 600; color: gray" class="title_modal">
                        급여상세항목
                    </h2>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="코드">
                                <number-box :width="150" placeholder="Number box" :min="0" :max="30"
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
                                <div style="width: 320px">
                                    <TaxPay placeholder="선택" v-model:selectedValue="formState.taxPayCode"></TaxPay>
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
import { ref, defineComponent, reactive, watch } from "vue";
import { companyId } from "../../../../../helpers/commonFunction";
import TaxPay from "../../../../../components/TaxPay.vue";
import { useMutation } from "@vue/apollo-composable";
import mutations from "../../../../../graphql/mutations/CM/CM130/index";
import { DxSelectBox } from "devextreme-vue/select-box";
import notification from "../../../../../utils/notification";
import { DxNumberBox } from "devextreme-vue/number-box";
import { initialState } from "../data";
import comfirmClosePopup from "../../../../../utils/comfirmClosePopup";
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
import dayjs, { Dayjs } from "dayjs";

export default defineComponent({
    props: ["modalStatus", "data", "msg", "title"],

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
        TaxPay,
    },

    setup(props, { emit }) {
        
        const formState = reactive({ ...initialState });

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

        const onSubmit = () => {
            let variables = {
                companyId: companyId,
                imputedYear: parseInt(dayjs().format("YYYY")),
                input: {
                    itemCode: formState.itemCode,
                    name: formState.name,
                    use: formState.use,
                    sort: formState.formula,
                    tax: true,
                    taxfreePayItemCode:
                        formState.taxPayCode[0] === "비과세" ? formState.taxPayCode[1] : null,
                    taxPayItemCode:
                        formState.taxPayCode[0] === "과세" ? formState.taxPayCode[1] : null,
                },
            };
            console.log(variables.input);
            
            creactConfigPayItem(variables);
        };
        const setModalVisible = () => {
            comfirmClosePopup(() => emit('closePopup', false))
        };
        return {
            formState,
            labelCol: { style: { width: "150px" } },
            error,
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
