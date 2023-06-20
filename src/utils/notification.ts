import { message } from "ant-design-vue";

export default (typeMessage: string, text = '') => {

    switch (typeMessage) {
        case 'success':
            message.success({
                content: () => text,
                class: 'ant-message',
                style: {
                    marginTop: '20vh',
                },
                duration: 1,
            }, 2);
            break;
        case 'error':
            message.error({
                content: () => text,
                class: 'ant-message',
                style: {
                    marginTop: '20vh',
                    color: 'red',
                    borderColor: 'red'
                },
                duration: 1,
              }, 2);
            break;
        case 'warning':
            message.warning({
                content: () => text,
                class: 'ant-message',
                style: {
                    marginTop: '20vh',
                },
                duration: 1,
              }, 2);
            break;
        case 'destroy':
              message.destroy()
              break;
        default:
            message.success({
                content: () => text,
                class: 'ant-message',
                style: {
                    marginTop: '20vh',
                },
                duration: 1,
              }, 2);
            break;
    }

}
