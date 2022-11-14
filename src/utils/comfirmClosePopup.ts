
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { Message } from "../configs/enum";

export default (callback: Function) => {
    let status = false
    const message = Message.getCommonMessage('301').message;
    Modal.confirm({
        title: message,
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
            callback();
        },
        onCancel() { status = false },
        cancelText: "Tắt",
        okText: "ok",
        style: `.ant-modal-confirm-body svg {
            font-size: 50px;
          }`

    });

    return status;
}