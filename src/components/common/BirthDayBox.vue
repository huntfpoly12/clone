<template>
    <DxTextBox :width="width" value-change-event="input" :show-clear-button="clearButton" v-model:value="value"
        :disabled="disabled" :readOnly="readOnly" @input="updateValue(value)" :mask="mask" @focusIn="onFocusIn"
        :mask-invalid-message="maskMess" :height="$config_styles.HeightInput" :name="nameInput">
        <DxValidator :name="nameInput">
            <DxRequiredRule v-if="required" :message="messageRequired" />
            <DxCustomRule  :message="maskMess" :validation-callback="validateDate" />
        </DxValidator>
    </DxTextBox>

</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import dayjs from 'dayjs';
import {
    DxValidator,
    DxRequiredRule,
    DxPatternRule,
    DxCustomRule
} from "devextreme-vue/validator";
import DxTextBox from "devextreme-vue/text-box";
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
        },
        readOnly: Boolean,
        nameInput: {
            type: String,
            default: '',
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
        DxPatternRule,
        DxCustomRule
    },
    setup(props, { emit }) {
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const mask = ref("0000-00-00");
        const dateInput = ref("");
        const maskMess = ref(messages.getCommonMessage("105").message);
        const messageRequired = ref(messages.getCommonMessage("102").message);
        if (props.messRequired != "") {
            messageRequired.value = props.messRequired;
        }
        const value = ref(props.valueInput?.toString().replaceAll("-", ""));
        const updateValue = (value: any) => {
            emit("update:valueInput", parseInt(value));
        };

        watch(
            () => props.valueInput,
            (newValue) => {
                value.value = newValue?.toString().replaceAll("-", "");
            }
        );

        const validateDate = (e: any) => {
            let date = e.value;
            let dtFormat = date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
            return dayjs(dtFormat, 'YYYY-MM-DD', true).isValid();
        }

        const onFocusIn = (e: any) => {
            if(props.select && !props.readOnly){
                e.event.target.select()
            }
        }
        return {
            updateValue,
            value,
            mask,
            maskMess,
            messageRequired,
            dateInput,
            validateDate,
            onFocusIn
        };
    },
});
</script>
