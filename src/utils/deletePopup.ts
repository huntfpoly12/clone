
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { createVNode, RendererElement, RendererNode, VNode } from 'vue';
import { Message } from "../configs/enum";

interface DeletePopup {
  message?: VNode<RendererNode, RendererElement, { [key: string]: any; }> | string,
  okText?: string,
  cancelText?: string,
  callback: Function,
  width?: number,
  icon?: any,
  wrapClassName?: string
}
export default ({ callback, width = 400, wrapClassName = '', icon = ExclamationCircleOutlined, message = Message.getCommonMessage('401').message, okText = '네. 삭제합니다', cancelText = "아니요" }: DeletePopup) => {
  let status = false
  Modal.confirm({
    title: message,
    icon: () => createVNode(icon),
    onOk() {
      callback();
    },
    onCancel() { status = false },
    cancelText,
    okText,
    width,
    wrapClassName: wrapClassName,
  });

  return status;
}
