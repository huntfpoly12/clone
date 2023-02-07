<template>
    <DxSelectBox :search-enabled="true" :width="width" :data-source="arrSelect" :show-clear-button="clearButton"
        v-model:value="value" :read-only="readOnly" :display-expr="displayeExpr" :value-expr="valueExpr" :disabled="disabled"
        @value-changed="updateValue(value)" :height="$config_styles.HeightInput" :name="nameInput" placeholder="선택">
        <DxValidator :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
        </DxValidator>
    </DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxSelectBox from "devextreme-vue/select-box";
export default defineComponent({
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
            type: Number,
            default: "",
        },
        readOnly: Boolean,
        arrSelect: Array,
        nameInput: {
            type: String,
            default: '',
        },
        displayeExpr: {
            type: String,
            default: 'label',
        },
        valueExpr: {
            type: String,
            default: 'value',
        },
    },
    components: {
        DxSelectBox,
        DxValidator,
        DxRequiredRule,
    },
    setup(props, { emit }) {
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const messageRequired = ref(messages.getCommonMessage('102').message);
        if (props.messRequired != "") {
            messageRequired.value = props.messRequired;
        }
        const value = ref(props.valueInput);

        watch(
            () => props.valueInput,
            (newValue) => {
                value.value = newValue;
            }
        );
        const updateValue = (value: any) => {
            emit("update:valueInput", value);
        };
        return {
            value,
            updateValue,
            messageRequired
        };
    },
});
</script>
