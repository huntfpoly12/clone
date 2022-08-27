import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import LoginLayout from '../layouts/LoginLayout.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import RquestContract from "../views/RequestContract.vue"
import BF310 from "../views/BF/BF3/BF310.vue"
const routes = [
  { path: "/", component: LoginLayout, 
    meta: {
    needAuth: true,
    title: 'Home'
    } 
  },
  {
    path: "/login",
    component: LoginLayout,
    children: [
      {
        path: "",
        component: Login
      }
    ]
  },
  { path: "/request-contract", 
  component: LoginLayout, 
    meta: {
      title: 'Request Contract'
    },
    children: [
      {
        path: "",
        component: RquestContract
      },
    ]
  },
  {
    path: "/dashboard",
    component: DefaultLayout,
    meta: {
      needAuth: true
    },
    children: [
      {
        path: "bf-310",
        component: BF310
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if(to.meta.needAuth) {
    if(localStorage.getItem('token')) {
      next()
    } else {
      next("/login")
    }
  } else {
    next()
  }
 
})

export default router;