<template> 
  <div>
    <DxCheckBox class="mr-5" v-model:value="valueCheck" :disabled="disabled" icon-size="16" :text="label" />
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, watch, ref } from "vue";
import DxCheckBox from 'devextreme-vue/check-box';
export default defineComponent({
    props: {
        valueCheckbox: {
            default: false,
            type: Boolean,
        },
        disabled: {
            default: false,
            type: Boolean,
        },
        size: {
            type: String,
            default: '12'
        },
        label: String
    },
    components: {
        DxCheckBox
    },
    setup(props, { emit }) {
        const app: any = getCurrentInstance()
        const styleCheckBox = app.appContext.config.globalProperties.$config_styles
        const valueCheck = ref(props.valueCheckbox)
        watch(
            () => valueCheck.value,
            (newValue) => {
                emit("update:valueCheckbox", newValue);
                emit("change", newValue);
            }
        );
        watch(
            () => props.valueCheckbox,
            (newValue) => {
                valueCheck.value = newValue
            }
        );
        return {
            valueCheck,
            styleCheckBox
        }
    },
});
</script>
<style lang="scss" scoped>
::v-deep .dx-checkbox-icon {
    color: v-bind("styleCheckBox.ColorCheckBox");
    border-color: v-bind("styleCheckBox.ColorCheckBox") !important;
}
</style>
