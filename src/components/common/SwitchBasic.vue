<template>
    <a-switch v-model:checked="dataDef" :checked-children="textCheck" :un-checked-children="textUnCheck" />
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch } from "vue";

export default defineComponent({
    props: {
        valueSwitch: {
            type: Boolean,
        },
        textCheck: {
            type: String
        },
        textUnCheck: {
            type: String
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

        return {
            dataDef,
            styleCheckBox
        }
    },
});
</script>

<style lang="scss" scoped>
::v-deep .ant-switch-checked {
    background: v-bind("styleCheckBox.ColorCheckBox");
}
</style>
