<template>
    <DxNumberBox @valueChanged="updateValue(value)" :width="width" value-change-event="input"
        :show-clear-button="clearButton" v-model:value="value" :disabled="disabled" :placeholder="placeholder"
        :show-spin-buttons="spinButtons" @input="updateValue(value)" :rtlEnabled="rtlEnabled" :max="max" :min="min"
        :mode="mode" :style="{ height: $config_styles.HeightInput }" :format="'#,###'" :name="nameInput" :readOnly="readOnly">
        <DxValidator v-if="required" :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
        </DxValidator>
    </DxNumberBox>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import DxNumberBox from "devextreme-vue/number-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
export default defineComponent({
    props: {
        width: String,
        clearButton: Boolean,
        spinButtons: {
            type: Boolean,
            default: false
        },
        disabled: Boolean,
        required: {
            type: Boolean,
            default: false,
        },
        messRequired: {
            type: String,
            default: "",
        },
        valueInput: {
            type: [String, Number],
            default: 0,
        },
        min: Number,
        max: Number,
        readOnly: Boolean,
        rtlEnabled: {
            type: Boolean,
            default: false,
        },
        placeholder: String,
        mode: {
            type: String,
            default: "number",
        },
        nameInput: {
            type: String,
            default: '',
        },
    },
    components: {
        DxNumberBox,
        DxValidator,
        DxRequiredRule,
    },
    setup(props, { emit }) {
        const app: any = getCurrentInstance()
        const messages = app.appContext.config.globalProperties.$messages;
        const messageRequired = ref(messages.getCommonMessage('102').message);
        if (props.messRequired != "") {
            messageRequired.value = props.messRequired;
        }
        const value = ref(props.valueInput);
        const updateValue = (value: any) => {
            emit("update:valueInput", value);
        };

        watch(
            () => props.valueInput,
            (newValue) => {
                value.value = newValue;
            }
        );

        return {
            updateValue,
            value,
            messageRequired
        };
    },
});
</script>
