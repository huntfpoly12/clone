import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import LoginLayout from '../layouts/LoginLayout.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import RquestContract from "../views/requestContract/index.vue"
import ResetPassword from "../views/ResetPassword.vue"
import ChangePassword from "../views/ChangePassword.vue"
import NotFound from "../views/NotFound.vue"
const routes = [
  {
    path: "/", component: DefaultLayout,
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

  {
    path: "/user",
    component: LoginLayout,
    children: [
      {
        path: "recovery/:key",
        component: ResetPassword
      }
    ]
  },
  {
    path: "/change-password",
    component: LoginLayout,
    children: [
      {
        path: "",
        component: ChangePassword
      }
    ]
  },
  {
    path: "/request-contract",
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
      },
      {
        path: "bf-340",
        component: () => import('../views/BF/BF3/BF340/index.vue')
      },
      {
        path: "bf-210",
        component: () => import('../views/BF/BF2/BF210/index.vue')
      },
      {
        path: "bf-220",
        component: () => import('../views/BF/BF2/BF220/index.vue')
      },
      {
        path: "cm-110",
        component: () => import('../views/CM/CM1/CM110/index.vue')
      },
      {
        path: "cm-130",
        component: () => import('../views/CM/CM1/CM130/index.vue')
      },
      {
        path: "pa-610",
        component: () => import('../views/PA/PA6/PA610/index.vue')
      },
      {
        path: "pa-710",
        component: () => import('../views/PA/PA7/PA710/index.vue')
      },
      
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.needAuth) {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next("/login")
    }
  } else {
    next()
  }

})

export default router;