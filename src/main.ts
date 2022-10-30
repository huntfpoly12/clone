import { createApp, provide, h } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import 'devextreme/dist/css/dx.light.css';
import router from "./router/index";
import store from './store/index'
import filters from "./helpers/filters";
import { styles } from "./configs/index";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { client } from "./ApolloClient.d";

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: any,
    $config_styles: any
  }
}
const app = createApp({
  setup() {
    provide(DefaultApolloClient, client)
  },
  render: () => h(App),
});
app.config.globalProperties.$filters = filters;
app.config.globalProperties.$config_styles = styles;
app.config.performance = true;

app.use(router);
app.use(store);
app.use(Antd).mount("#app"); 