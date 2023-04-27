
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { Message } from "../configs/enum";

interface DeletePopup {
  message?: string,
  okText?: string,
  cancelText?: string,
  callback: Function
}
export default ({ callback, message = Message.getCommonMessage('401').message, okText = '네. 삭제합니다', cancelText = "아니요" }: DeletePopup) => {
  let status = false
  Modal.confirm({
    title: message,
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      callback();
    },
    onCancel() { status = false },
    cancelText,
    okText,
    style: `.ant-modal-confirm-body svg {
            font-size: 50px;
          }`

  });

  return status;
}
