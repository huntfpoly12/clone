
import axios from "axios";
import BASE_URL from '../constants/index'

const token = sessionStorage.getItem("token");
export default axios.create({
  BASE_URL,
  headers: {
    "Authorization": token ? `Bearer ${token}` : null
  }
});