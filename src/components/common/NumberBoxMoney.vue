
<template>
    <DxNumberBox v-bind="$props" @valueChanged="updateValue" :width="width" value-change-event="input" @focusIn="onFocusIn"
        :show-clear-button="clearButton" v-model:value="value" :disabled="disabled" :placeholder="placeholder"
        :show-spin-buttons="spinButtons" @input="onChange" @keyDown="onChange"
        :mode="mode" :style="{ height: $config_styles.HeightInput, textAlign: rtlEnabled ? 'right' : 'left', }"
         :format="format" :name="nameInput" :readOnly="readOnly" @focusOut="handleFocusOut">
        <DxValidator :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
            <DxCustomRule :validation-callback="ruleCustom" :message="messageRuleCustom" />
        </DxValidator>
    </DxNumberBox>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import DxNumberBox from "devextreme-vue/number-box";
import { DxValidator, DxRequiredRule, DxCustomRule } from "devextreme-vue/validator";
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
        format: {
            type: String,
            default: "#,###",
        },
        valueInput: {
            type: Object as () => string | number | null,
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
        ruleCustom: {
            type: Function,
            default: () => true,
        },
        messageRuleCustom: {
            type: String,
            default: "",
        },
        textColor: {
            type: String,
            default: "#000000",
        }
    },
    components: {
        DxCustomRule,
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
      const maxNum = ref(props.max??2147483647);
      const minNum = ref(props.min);
      const updateValue = (e: any) => {
          if (maxNum.value && e.value >= maxNum.value) {
              e.component.option('value', maxNum.value);
              emit("update:valueInput", maxNum.value);
              return;
          }
          if (typeof minNum.value == "number" && e.value <= minNum.value && e.value != null) {
              e.component.option('value', minNum.value);
              emit("update:valueInput", minNum.value);
              return;
          }
          emit("update:valueInput", e.value);
        };

        watch(
            () => props.valueInput,
            (newValue) => {
                value.value = newValue;
            }
        );
        const onChange = (e: any) => {
            emit("changeInput", e);
        }
        const onFocusIn = (e: any) => {
          emit("focusInput",e);
          const input = e.event.target;
          input.select();
        }
        const handleFocusOut = (e: any) => {
          emit("onFocusOut", e);
        }
        return {
            updateValue,
            value,
            messageRequired,
            onChange,
            onFocusIn,
            handleFocusOut
        };
    },
});
</script>
<style lang="scss" scoped>
:deep.dx-numberbox .dx-texteditor-input {
    text-align: right;
    color: v-bind(textColor);
}
</style>
