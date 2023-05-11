<template>
    <DxSelectBox :noDataText="Message.getMessage('COMMON', '901').message" :width="width" :data-source="fundingSource"
        placeholder="선택" :show-clear-button="clearButton" v-model:value="value" :read-only="readOnly" display-expr="label"
        value-expr="value" :disabled="disabled" @value-changed="updateValue(value)" :height="$config_styles.HeightInput"
        :name="nameInput">
        <DxValidator :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
        </DxValidator>
    </DxSelectBox>
</template>
<script lang="ts">
import { ref, watch, getCurrentInstance, computed } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { FundingSource, enum2Entries } from "@bankda/jangbuda-common";
import { Message } from "@/configs/enum"
export default {
    props: {
        required: {
            type: Boolean,
            default: false,
        },
        messRequired: {
            type: String,
            default: "",
        },
        width: String,
        clearButton: Boolean,
        disabled: Boolean,
        valueInput: {
            type: [Number, String],
            default: "",
        },
        readOnly: Boolean,
        nameInput: {
            type: String,
            default: '',
        },
    },
    components: {
        DxSelectBox,
        DxValidator,
        DxRequiredRule,
    },
    setup(props: any, { emit }: any) {
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const messageRequired = ref(messages.getCommonMessage('102').message);
        if (props.messRequired != "") {
            messageRequired.value = props.messRequired;
        }
        const value = ref(props.valueInput);
        const fundingSource: any = computed(() => {
            let bsDeduction: any = enum2Entries(FundingSource).map((value) => ({
                value: value[1],
                label: value[0],
            }));
            return bsDeduction;
        });
        const updateValue = (value: any) => {
            emit("update:valueInput", parseInt(value));
        };

        watch(
            () => props.valueInput,
            (newValue) => {
                value.value = newValue;
            }
        );
        return {
            messageRequired,
            fundingSource,
            updateValue,
            value,
            Message
        };
    },
};
</script>
  
<style lang="scss"></style>