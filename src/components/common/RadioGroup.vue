<template>
    <DxRadioGroup :items="arrayValue" :value="data" :layout="layoutCustom" @valueChanged="changeValueRadioGroup"
        :value-expr="valueExpr" display-expr="text" :disabled="disabled" />
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, watch, ref } from "vue";
import DxRadioGroup from 'devextreme-vue/radio-group';

export default defineComponent({
    props: {
        arrayValue: {
            type: Array,
            required: true
        },
        valueRadioCheck: {
            type: [Number , Object , String, Boolean]
        },
        layoutCustom: {
            type: String
        },
        disabled: Boolean,
        valueExpr: {
            type: String,
            default: 'id'
        }
    },
    components: {
        DxRadioGroup
    },

    setup(props, { emit }) {
        const app: any = getCurrentInstance()
        const styleCheckBox = app.appContext.config.globalProperties.$config_styles
        const data = ref(props.valueRadioCheck);
        const changeValueRadioGroup = (e: any) => {
            emit("update:valueRadioCheck", e.value);
        }

        watch(
            () => props.valueRadioCheck,
            (value) => {
                data.value = value

            }
        );
        return {
            changeValueRadioGroup,
            styleCheckBox,
            data,
        }
    },
});
</script>

<style lang="scss" scoped>
::v-deep .dx-radiobutton-icon-checked .dx-radiobutton-icon-dot {
    background: v-bind("styleCheckBox.ColorCheckBox");
    margin-top: -13px;
    margin-left: 3px;
}

::v-deep .dx-radiobutton-icon::before {
    border: 1px solid v-bind("styleCheckBox.ColorCheckBox");
    width: 14px;
    height: 14px;
}

::v-deep .dx-radio-value-container {
    padding-right: 0px
}

::v-deep .dx-radiobutton {
    line-height: 18px;
}
</style>