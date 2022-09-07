import { createApp } from "vue";
import App from "./App.vue"; 
// import Vuex from 'vuex'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import 'devextreme/dist/css/dx.light.css';
import router from "./router/index";
import store from './store/index'
const app = createApp(App);
app.use(router);
app.use(store)
app.use(Antd).mount("#app");
// app.use(Vuex)