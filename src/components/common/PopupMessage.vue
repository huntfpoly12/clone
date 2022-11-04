<template>
    <a-modal v-if="confirmStatus" v-model:visible="visibleConfirm" :mask-closable="false" class="confirm-md"
        :width="521">
        <a-row>
            <a-col :span="4">
                <warning-outlined :style="{ fontSize: '70px', color: '#faad14', paddingTop: '20px' }" />
            </a-col>
            <a-col :span="20">
                <h3><b>해지 확인</b></h3>
                <p>해지하실 경우 본 영업자에 속한 사업자들은 본사로 귀속됩니다.</p>
                <p>해지처리를 확정하시려면 “확인”을 입력하신 후 완료 버튼을</p>
                <p>누르세요</p>
            </a-col>
            <div style="text-align: center; width: 100%; margin-left: 100px">
                <a-input placeholder="확인" style="width: 200px" />
                <a-button type="primary" style="margin-left: 100px">완료</a-button>
            </div>
        </a-row>
        <template #footer> </template>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref, createVNode } from 'vue'
import { Modal } from 'ant-design-vue';
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
        okText: {
            type: String,
            default: "이해했다"
        },
        confirmStatus: {
            type: Boolean,
            default: false,
        },
    },

    setup(props, { emit }) {
        const visibleConfirm = ref<boolean>(false);
        const hideModal = () => {
            emit("closePopup", '')
        }
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
                }

            }
        );

        return {
            visible,
            hideModal,
            visibleConfirm
        }
    },

})
</script>