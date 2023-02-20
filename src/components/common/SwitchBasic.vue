<template>
    <a-switch v-model:checked="dataDef" :checked-children="textCheck" :un-checked-children="textUnCheck"
        :style="{ width: width }" @change="onChange" :disabled="disabled"/>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch } from "vue";

export default defineComponent({
    props: {
        valueSwitch: {
            type: Boolean,
            default: true
        },
        textCheck: {
            type: String
        },
        textUnCheck: {
            type: String
        },
        width: String,
        disabled: {
          type: Boolean,
          default: false
        }
    },

    setup(props, { emit }) {
        const app: any = getCurrentInstance()
        const styleCheckBox = app.appContext.config.globalProperties.$config_styles
        const dataDef = ref(props.valueSwitch)
        watch(
            () => props.valueSwitch,
            (newValue) => {
                dataDef.value = newValue
            }
        );
        watch(
            () => dataDef.value,
            (newValue) => {
                emit("update:valueSwitch", newValue);
            }
        );
        const onChange = (e: any) => {
            emit('onChange', e);
        }
        return {
            dataDef,
            styleCheckBox,
            onChange
        }
    },
});
</script>

<style lang="scss" scoped>
::v-deep .ant-switch-checked {
    background: v-bind("styleCheckBox.ColorCheckBox");
}
</style>
