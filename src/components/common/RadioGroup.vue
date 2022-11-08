<template>
    <div>
        <DxRadioGroup :items="arrayValue" :value="valueChecked" @valueChanged="changeValueRadioGroup"
            :layout="layoutCustom" />
    </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";
import DxRadioGroup from 'devextreme-vue/radio-group';

export default defineComponent({
    props: {
        arrayValue: {
            type: Array,
            required: true
        },
        valueRadioCheck: {
            type: String || Number
        },
        layoutCustom: {
            type: String
        }
    },
    components: {
        DxRadioGroup
    },

    setup(props, { emit }) {
        const app: any = getCurrentInstance()
        const styleCheckBox = app.appContext.config.globalProperties.$config_styles
        const valueChecked = ref()

        props.arrayValue.map((e: any, index: any) => {
            if (props.valueRadioCheck == e.id) {
                valueChecked.value = props.arrayValue[index]
            }
        })

        const changeValueRadioGroup = (e: any) => {
            emit("update:valueRadioCheck", e.value.id);
        }
        return {
            changeValueRadioGroup,
            styleCheckBox,
            valueChecked
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
