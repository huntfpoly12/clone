
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { Message } from "../configs/enum";

export default (callback: Function, options?: {okText?:string, cancelText?:string} ) => {
    let status = false
    const message = Message.getCommonMessage('301').message;
    Modal.confirm({
        content: message,
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
            callback();
        },
        onCancel() { status = false },
        cancelText: options?.cancelText || '네' ,
        okText: options?.okText || '취소' ,
        wrapClassName: 'confirmPopup',
    });

    return status;
}