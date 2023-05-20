import Client from "../axiosClient.d";
const resource = "/upload";
export default {
  public(payload: any) {
    console.log(payload.getAll("file"), "payload");
    return Client.post(`${resource}/public`, payload);
  },
  seal() {
    return Client.post(`${resource}/seal`);
  },
  majorInsurance(payload: any) {
    return Client.post(`${resource}/major-insurance`, payload);
  },
  accountingProof(payload: any, config?: any) {
    return Client.post(`${resource}/accounting-proof `, payload, config);
  },
};
