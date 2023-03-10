<template>
    <DxNumberBox @valueChanged="updateValue" :width="width" value-change-event="input"
        :show-clear-button="clearButton" v-model:value="value" :disabled="disabled" :placeholder="placeholder"
        :show-spin-buttons="spinButtons" @input="onChange" :rtlEnabled="rtlEnabled" :min="min"
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
      const maxNum = ref(props.max??0);
      const updateValue = (e: any) => {
          if (maxNum.value && e.value >= maxNum.value) {
              e.component.option('value', maxNum.value);
              emit("update:valueInput", maxNum.value);
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
            emit("changeInput",e);
        }

        return {
            updateValue,
            value,
            messageRequired,
            onChange,
        };
    },
});
</script>
<style lang="scss" scoped>
:deep.dx-numberbox .dx-texteditor-input{  
  text-align: right;  
}  
</style>
