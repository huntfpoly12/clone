import { message } from "ant-design-vue";

export default (typeMessage: string, text: string) => {

    switch (typeMessage) {
        case 'success':
            message.success({
                content: () => text,
                class: 'ant-message',
                style: {
                    marginTop: '20vh',
                },
            }, 4);
            break;
        case 'error':
            message.error({
                content: () => text,
                class: 'message-class',
                style: {
                    marginTop: '20vh',
                    color: 'red',
                    borderColor: 'red'
                },
            }, 4);
            break;
        case 'warning':
            message.warning({
                content: () => text,
                class: 'message-class',
                style: {
                    marginTop: '20vh',
                },
            }, 4);
            break;

        default:
            message.success({
                content: () => text,
                class: 'message-class',
                style: {
                    marginTop: '20vh',
                },
            }, 4);
            break;
    }

}