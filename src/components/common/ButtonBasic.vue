<template>
    <DxButton :focusStateEnabled="false" :disabled="disabled" :text="text" :type="type" @click="onClick($event)" :styling-mode="mode"
        :style="{ color: color, backgroundColor: backGround, border: border }" :height="$config_styles.HeightInput" :visible="visible" >
        <slot></slot>
        </DxButton>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance, computed, watch } from "vue";
import DxButton from 'devextreme-vue/button';

export default defineComponent({
    props: {
        text: {
            type: String,
        },
        type: {
            type: String,
            required: true

        },
        disabled: {
            type: Boolean,
            required: false
        },
        mode: {
            type: String,
            required: true
        },
        textColor: {
            type: String,
            default: 'white'
        },
        bgColor: {
            type: String,
            default: '#337ab7'
        },
        visible: {
            type: Boolean,
            default: true
        }
    },
    components: {
        DxButton
    },

    setup(props, { emit }) {
        const app: any = getCurrentInstance()
        const styleButton = app.appContext.config.globalProperties.$config_styles
        const onClick = (e: any) => {
            emit('onClick', e)
        }

        const color = ref()
        const backGround = ref()
        const border = ref()

        watch(() => props.type, (newValue) => {
            if (props.type == 'success' && props.mode == 'contained') {
                color.value = styleButton.ColorButtonSuccess
                backGround.value = styleButton.BackgroundButtonSuccess
            } else if (props.type == 'success' && props.mode == 'outlined') {
                color.value = styleButton.BackgroundButtonSuccess
                border.value = styleButton.BorderButtonSuccess
            } else if (props.type == 'success' && props.mode == 'text') {
                color.value = styleButton.BackgroundButtonSuccess
            } else if (props.type == 'default' && props.mode == 'contained') {
                color.value = styleButton.ColorButtonDefault
                backGround.value = styleButton.BackgroundButtonDefault
            } else if (props.type == 'default' && props.mode == 'outlined') {
                color.value = styleButton.BackgroundButtonDefault
                border.value = styleButton.BorderButtonDefault
            } else if (props.type == 'default' && props.mode == 'text') {
                color.value = styleButton.BackgroundButtonDefault
            } else if (props.type == 'danger' && props.mode == 'contained') {
                color.value = styleButton.ColorButtonDanger
                backGround.value = styleButton.BackgroundButtonDanger
            } else if (props.type == 'danger' && props.mode == 'outlined') {
                color.value = styleButton.BackgroundButtonDanger
                border.value = styleButton.BorderButtonDanger
            } else if (props.type == 'danger' && props.mode == 'text') {
                color.value = styleButton.BackgroundButtonDanger
            } else if (props.type == 'normal' && props.mode == 'contained') {
                color.value = styleButton.ColorButtonNormal
                backGround.value = styleButton.BackgroundButtonNormal
            } else if (props.type == 'normal' && props.mode == 'outlined') {
                color.value = styleButton.BackgroundButtonNormal
                border.value = styleButton.BorderButtonNormal
            } else if (props.type == 'normal' && props.mode == 'text') {
                color.value = styleButton.BackgroundButtonNormal
            } else if (props.type == 'calculate' && props.mode == 'contained') {
                color.value = styleButton.ColorButtonCalculate
                backGround.value = styleButton.BackgroundButtonCalculate
            } else if (props.type == 'calculate' && props.mode == 'outlined') {
                color.value = styleButton.BackgroundButtonCalculate
                border.value = styleButton.BorderButtonCalculate
            } else if (props.type == 'calculate' && props.mode == 'text') {
                color.value = styleButton.BackgroundButtonCalculate
            }
        });

        return {
            backGround,
            border,
            color,
            onClick
        }
    },
});
</script>
