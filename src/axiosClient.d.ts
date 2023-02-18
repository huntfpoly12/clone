
import axios from "axios";
const baseURL = 'https://dev-jangbuda-api.bankda.com/api/';

const token = sessionStorage.getItem("token");
export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": token ? `Bearer ${token}` : null
  }
});
