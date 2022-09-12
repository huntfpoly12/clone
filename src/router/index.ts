import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import LoginLayout from '../layouts/LoginLayout.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import RquestContract from "../views/RequestContract.vue"
const routes = [
  { path: "/", component: DefaultLayout, 
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
        component: () => import('../views/BF/BF3/BF310/index.vue')
      },
      {
        path: "bf-320",
        component: () => import('../views/BF/BF3/BF320/index.vue')
      },
      {
        path: "bf-330",
        component: () => import('../views/BF/BF3/BF330/index.vue')
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