<template>
    <DxButton :text="text" :type="type" @click="onClick($event)" :styling-mode="mode"
        :style="{ color: color, backgroundColor: backGround, border: border }" />
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
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
        mode: {
            type: String,
            required: true
        },

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
        }

        return {
            backGround,
            border,
            color,
            onClick
        }
    },
});
</script>
