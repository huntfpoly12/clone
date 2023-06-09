<template>
    <DxTextBox :ref="numberTextBox" :width="width" value-change-event="input" :show-clear-button="clearButton"
        :placeholder="placeholder" v-model:value="value" :mode="mode" :disabled="disabled" :readOnly="readOnly"
        :on-input="onInputValue" :height="$config_styles.HeightInput" :name="nameInput" :maxLength="maxLength"
        :rtlEnabled="rtlEnabled" @focusIn="onFocusIn">
        <DxButton :activeStateEnabled="false" :focusStateEnabled="false" :hoverStateEnabled="false" :options="passwordButton" name="password" location="after" :key="mode"/>
        <DxValidator :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
            <DxCustomRule :validation-callback="ruleCustom" :message="messageRuleCustom" />
        </DxValidator>
    </DxTextBox>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule, DxCustomRule } from "devextreme-vue/validator";
import { DxTextBox, DxButton } from "devextreme-vue/text-box";
import { Message } from "@/configs/enum";
import { EyeOutlined } from '@ant-design/icons-vue';
import eye from './eye.svg'
import eyeInvisible from './eyeInvisible.svg'
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
        width: {
            type: String,
            default: "100%",
        },
        clearButton: Boolean,
        disabled: Boolean,
        valueInput: {
            type: [Number, String]
        },
        placeholder: String,
        readOnly: Boolean,
        nameInput: {
            type: String,
            default: '',
        },
        maxLength: {
            type: Number,
            default: null,
        },
        ruleCustom: {
            type: Function,
            default: () => true,
        },
        messageRuleCustom: {
            type: String,
            default: Message.getCommonMessage('105').message,
        },
        rtlEnabled: {
            type: Boolean,
            default: false,
        },
        select: {
            type: Boolean,
            default: true,
        }
    },
    components: {
        DxTextBox,
        DxValidator,
        DxRequiredRule,
        DxCustomRule,
        DxButton,
        EyeOutlined
    },
    setup(props, { emit }) {
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const messageRequired = ref(messages.getCommonMessage('102').message);
        if (props.messRequired != "") {
            messageRequired.value = props.messRequired;
        }
        const mode = ref('password')
        const passwordButton = ref({
            icon: eyeInvisible,
            type: 'outlined',
            onClick: () => {
                mode.value = mode.value === 'text' ? 'password' : 'text';
                
            },
        })
        watch(() => mode.value, (value) => {
            value === 'text' ? passwordButton.value.icon = eye : passwordButton.value.icon = eyeInvisible
        })
        const numberTextBox = ref();
        const rules = ref({ X: /[0-9]/ });
        const value = ref(props.valueInput);
        const onInputValue = (e: any) => {
            var inputElement = e.event.target;
            inputElement.value = inputElement.value.replaceAll(/\D/g, '');
            emit("update:valueInput", inputElement.value);
        };

        watch(
            () => props.valueInput,
            (newValue) => {
                value.value = newValue?.toString();
            }
        );
        const onFocusIn = (e: any) => {
            if (props.select && !props.readOnly && e.event.target.nodeName === 'INPUT') {
                e.event.target.select()
            }
            emit("focusInput", e);
        }
        return {
            onInputValue,
            numberTextBox,
            messageRequired,
            value,
            rules,
            mode,
            onFocusIn,
            passwordButton
        };
    },
});
</script>
<style scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
::v-deep input[type=number] {
    -moz-appearance: textfield;
}

/* .dx-button {
    border: 0 !important;
} */
:deep .dx-button-mode-contained {
    border: 0 !important;
}
</style>
  