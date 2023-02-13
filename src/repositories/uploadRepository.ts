import Client from '../axiosClient.d';
const resource = '/upload';
export default {
  public(payload: string) {
    console.log(payload,'payload')
        return Client.post(`${resource}/public`, payload);
    },
    seal() {
        return Client.post(`${resource}/seal`);
    },
};
