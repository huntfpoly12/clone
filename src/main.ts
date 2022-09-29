import { createApp, provide, h } from "vue";
import App from "./App.vue";  
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import 'devextreme/dist/css/dx.light.css';
import router from "./router/index";
import store from './store/index'
import filters from "./helpers/filters";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { client } from "./ApolloClient.d";
declare module 'vue' {
    interface ComponentCustomProperties {
      $filters: any
    }
  }
const app = createApp({
  setup () {
    provide(DefaultApolloClient, client)
  },
  render: () => h(App),
});
app.config.globalProperties.$filters = filters;

app.use(router);
app.use(store);
app.use(Antd).mount("#app"); 