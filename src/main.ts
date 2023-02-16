import { createApp, provide, h ,defineAsyncComponent } from "vue";
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import 'devextreme/dist/css/dx.light.css';
import "./assets/styles/style.scss"
import router from "./router/index";
import store from './store/index'
import filters from "./helpers/filters";
import { styles } from "./configs/styles/index";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { client } from "./ApolloClient.d";
import { Message } from "./configs/enum";
import clickOutside from '@/directives/click-outside';

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

const requireBaseComponent = import.meta.glob('./components/common/*.vue')

Object.entries(requireBaseComponent).forEach((fileComponent) => {
  let nameFile = fileComponent[0]?.split('/')?.pop()?.replace(/\.\w+$/, '');
  let componentImport : any = fileComponent[1];
  const componentName = upperFirst(camelCase(nameFile));
  // Register component globally
  app.component(componentName,defineAsyncComponent(componentImport))
})

const requireComponent = import.meta.glob('./components/*.vue')

Object.entries(requireComponent).forEach((fileComponent) => {
  let nameFile = fileComponent[0]?.split('/')?.pop()?.replace(/\.\w+$/, '');
  let componentImport : any = fileComponent[1];
  const componentName = upperFirst(camelCase(nameFile));
  // Register component globally
  app.component(componentName,defineAsyncComponent(componentImport))
})

app.directive('click-outside', clickOutside);
app.config.globalProperties.$messages = Message;
app.config.globalProperties.$filters = filters;
app.config.globalProperties.$config_styles = styles;

app.config.performance = true;

app.use(router);
app.use(store);
app.use(Antd).mount("#app"); 