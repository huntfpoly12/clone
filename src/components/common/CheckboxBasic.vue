<template>
  <DxCheckBox :class="classCheckBox" v-model:value="valueCheck" :disabled="disabled" icon-size="16" :text="label" />
  <slot></slot>
</template>
<script lang="ts">
import {defineComponent, getCurrentInstance, watch, ref, computed} from "vue";
import DxCheckBox from 'devextreme-vue/check-box';
export default defineComponent({
    props: {
        valueCheckbox: {
            default: false,
            type: [Boolean, String, Number]
        },
        disabled: {
            default: false,
            type: Boolean,
        },
        size: {
            type: String,
            default: '12'
        },
        label: String,
        class: {
            type: String,
            default: ''
        }
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
        const classCheckBox = computed(() => {
            return props.class + ' mr-5'
        })
        return {
            valueCheck,
            styleCheckBox,
            classCheckBox
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
