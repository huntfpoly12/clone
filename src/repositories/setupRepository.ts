import Client from '../axiosClient.d';
const resource = '/setup';
export default {
    init() {
        return Client.post(`${resource}/init`);
    },
    upload() {
        return Client.post(`${resource}/upload`);
    },
};