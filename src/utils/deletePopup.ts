
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { createVNode, RendererElement, RendererNode, VNode } from 'vue';
import { Message } from "../configs/enum";
import { h } from 'vue';
import Icon_Del from '@/assets/images/icon_delete.png';
interface DeletePopup {
  message?: VNode<RendererNode, RendererElement, { [key: string]: any; }> | string,
  okText?: string,
  cancelText?: string,
  callback: Function,
  width?: number,
  wrapClassName?: string
}
export default ({ callback, width = 400, wrapClassName = '', message = Message.getCommonMessage('401').message, okText = '네. 삭제합니다', cancelText = "아니요" }: DeletePopup) => {
  let status = false
  Modal.confirm({
    title: message,
    icon: h('span', { class: 'anticon' }, [
      h('img', {
        src: Icon_Del,
        alt: '',
        width: 40,
        height: 40,
      })
    ]),
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
