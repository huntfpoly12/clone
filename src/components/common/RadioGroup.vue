<template>
    <div> 
        <DxRadioGroup :items="arrayValue" :value="valueRadioCheck" @valueChanged="changeValueRadioGroup"
            :layout="layoutCustom" />
    </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import DxRadioGroup from 'devextreme-vue/radio-group';

export default defineComponent({
    props: {
        arrayValue: {
            type: Array,
            required: true
        },
        valueRadioCheck: {
            type: Object
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

        const changeValueRadioGroup = (e: any) => {
                emit("update:valueRadioCheck", e.value);
        
        }
        return {
            changeValueRadioGroup,
            styleCheckBox
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
</style>
