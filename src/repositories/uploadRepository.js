import Client from '../axiosClient';
const resource = '/upload';
export default {
    public(payload) {
        return Client.post(`${resource}/public`, payload);
    },
    seal() {
        return Client.post(`${resource}/seal`);
    },
};