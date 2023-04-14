<template>
    <a-modal :mask-closable="false" :visible="statusPupopInfo" title="" centered @cancel="setModalVisible()"
        width="1200px" footer="">
        <pre>{{ contentText }}</pre>
    </a-modal>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { regesterInput1, regesterInput2, regesterInput3, regesterInput4 } from '@/views/requestContract/utils/index'
export default defineComponent({
    props: {
        statusPupopInfo: {
            default: false,
            type: Boolean,
        },
        keyText: {
            type: Number,
            required: true
        },
    },
    setup(props, { emit }) {
        const contentText = ref<string>()
        watch(() => props.statusPupopInfo, (newValue) => {
            if (newValue && props.keyText) {
                switch (props.keyText) {
                    case 1:
                        contentText.value = regesterInput1
                        break;
                    case 2:
                        contentText.value = regesterInput2
                        break;
                    case 3:
                        contentText.value = regesterInput3
                        break;
                    case 4:
                        contentText.value = regesterInput4
                        break;
                }
            }
        });
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        return {
            setModalVisible, contentText,
            regesterInput1, regesterInput2, regesterInput3, regesterInput4
        }
    }
})
</script>

<style scoped>
pre {
    width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-height: 600px;
}
</style>