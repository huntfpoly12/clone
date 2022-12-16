<template>
    <DxTagBox :data-source="subReqStatus" display-expr="label" value-expr="value" style="min-width: 150px;width: auto;"
        @value-changed="updateValue" :value="value" :read-only="readOnly" :height="$config_styles.HeightInput"
        :placeholder="placeholder" />
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxSelectBox from "devextreme-vue/select-box";
import {
    SubscriptionRequestStatus,
    enum2Entries,
} from "@bankda/jangbuda-common";
import DxTagBox from 'devextreme-vue/tag-box';
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
            default: 0,
        },
        placeholder: String,
        readOnly: Boolean,
    },
    components: {
        DxSelectBox,
        DxValidator,
        DxRequiredRule,
        DxTagBox
    },
    setup(props, { emit }) {
        var subReqStatus: any = computed(() => {
            let slGrade: any = enum2Entries(SubscriptionRequestStatus).map(
                (value) => ({
                    value: value[1],
                    label: value[0],
                })
            );
            // slGrade.unshift({ value: null, label: "전체" });
            return slGrade;
        });
        const app: any = getCurrentInstance();
        const messages = app.appContext.config.globalProperties.$messages;
        const messageRequired = ref(messages.getCommonMessage("102").message);
        if (props.messRequired != "") {
            messageRequired.value = props.messRequired;
        }
        const value = ref(props.valueInput);

        const updateValue = (value: any) => {
            emit("update:valueInput", value.value);
        };
        watch(
            () => props.valueInput,
            (newValue) => {
                value.value = newValue;
            }
        );
        return {
            updateValue,
            subReqStatus,
            value,
            messageRequired,
        };
    },
});
</script>
<style scoped>
::v-deep .dx-tag-content {
    padding: 1px 25px 4px 6px;
}
</style>
