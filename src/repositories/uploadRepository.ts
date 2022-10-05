import Client from '../axiosClient.d';
const resource = '/upload';
export default {
    public(payload: string) {
        return Client.post(`${resource}/public`, payload);
    },
    seal() {
        return Client.post(`${resource}/seal`);
    },
};