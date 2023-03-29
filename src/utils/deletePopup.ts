
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { Message } from "../configs/enum";

export default ({callback, message = Message.getCommonMessage('401').message }: {callback: Function, message?: string}) => {
    let status = false
    Modal.confirm({
        title: message,
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
            callback();
        },
        onCancel() { status = false },
        cancelText: "아니요",
        okText: "네. 삭제합니다",
        style: `.ant-modal-confirm-body svg {
            font-size: 50px;
          }`

    });

    return status;
}
