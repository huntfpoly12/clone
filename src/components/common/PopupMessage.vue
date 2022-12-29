<template>
    <a-modal v-model:visible="visibleConfirm" :mask-closable="false" class="confirm-md" footer="" :width="521"
        @cancel="cancelModal">
        <a-row>
            <a-col :span="4">
                <warning-outlined :style="{ fontSize: '70px', color: '#faad14', paddingTop: '20px' }" />
            </a-col>
            <a-col :span="20" class="centent-wrap">
                <h3><b>{{ title }}</b></h3>
                <p> {{ content }}</p>
            </a-col>
            <div style="text-align: center; width: 100%;">
                <a-input placeholder="확인" style="width: 200px" v-model:value="inputAccep" />
                <a-button type="primary" style="margin-left: 10px" @click="handleOk">{{ okText }}</a-button>
            </div>
        </a-row>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { Modal } from 'ant-design-vue';
import { WarningOutlined } from "@ant-design/icons-vue";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        typeModal: {
            type: String
        },
        title: {
            type: String
        },
        content: {
            type: String
        },
        keyAccept: {
            type: String
        },
        okText: {
            type: String,
            default: "이해했다"
        },
        cancelText: {
            type: String,
            default: "이해했다"
        }
    },
    components: {
        WarningOutlined
    },
    setup(props, { emit }) {
        const inputAccep = ref()
        const visibleConfirm = ref<boolean>(false);
        let visible = ref(false);
        watch(
            () => props.modalStatus,
            (newValue, old) => {
                if (newValue == true) {
                    if (props.typeModal == "error")
                        Modal.error({
                            title: props.title,
                            content: props.content,
                            okText: props.okText,
                            onOk() {
                                emit("closePopup", false)
                            },

                        });
                    else if (props.typeModal == "warning")
                        Modal.warning({
                            title: props.title,
                            content: props.content,
                            okText: props.okText,
                            onOk() {
                                emit("closePopup", false)
                            },

                        });
                    else if (props.typeModal == "success")
                        Modal.success({
                            title: props.title,
                            content: props.content,
                            okText: props.okText,
                            onOk() {
                                emit("closePopup", false)
                            },

                        });
                    else if (props.typeModal == "info")
                        Modal.info({
                            title: props.title,
                            content: props.content,
                            okText: props.okText,
                            onOk() {
                                emit("closePopup", false)
                            },
                        });
                    else if (props.typeModal == "confirm")
                        Modal.confirm({
                            title: props.title,
                            content: props.content,
                            okText: props.okText,
                            cancelText: props.cancelText,
                            onOk() { 
                                emit("closePopup", false)
                                emit("checkConfirm", true)
                            },
                            onCancel() { 
                                emit("closePopup", false)
                                emit("checkConfirm", false)
                            }, 
                        });
                    else if (props.typeModal == "acceptInput") {
                        visibleConfirm.value = true
                    }
                }
            }
        );

        const handleOk = () => {
            if (props.keyAccept == inputAccep.value)
                emit("checkConfirm", true)
            else
                emit("checkConfirm", false)
            emit("closePopup", false)
            visibleConfirm.value = false
        }

        const cancelModal = () => {
            emit("closePopup", false)
        }

        return {
            handleOk,
            visible,
            visibleConfirm,
            inputAccep,
            cancelModal
        }
    },
})
</script>

<style lang="scss">
.ant-modal-confirm-body svg {
    font-size: 50px;
}
.centent-wrap{
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>