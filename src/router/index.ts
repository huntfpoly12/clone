import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import LoginLayout from "../layouts/LoginLayout.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import RquestContract from "../views/requestContract/index.vue";
import ResetPassword from "../views/ResetPassword.vue";
import ChangePassword from "../views/ChangePassword.vue";
import NotFound from "../views/NotFound.vue";
const routes = [
  {
    path: "/",
    component: DefaultLayout,
    meta: {
      needAuth: true,
      title: "Home",
    },
  },
  {
    path: "/login",
    component: LoginLayout,
    children: [
      {
        path: "",
        component: Login,
      },
    ],
  },

  {
    path: "/user",
    component: LoginLayout,
    children: [
      {
        path: "recovery/:key",
        component: ResetPassword,
      },
    ],
  },
  {
    path: "/change-password",
    component: LoginLayout,
    children: [
      {
        path: "",
        component: ChangePassword,
      },
    ],
  },
  {
    path: "/request-contract",
    component: LoginLayout,
    meta: {
      title: "Request Contract",
    },
    children: [
      {
        path: "",
        component: RquestContract,
      },
    ],
  },
  {
    path: "/dashboard",
    component: DefaultLayout,
    meta: {
      needAuth: true,
    },
    children: [
      {
        path: "bf-310",
        component: () => import("../views/BF/BF3/BF310/index.vue"),
      },
      {
        path: "bf-320",
        component: () => import("../views/BF/BF3/BF320/index.vue"),
      },
      {
        path: "bf-330",
        component: () => import("../views/BF/BF3/BF330/index.vue"),
      },
      {
        path: "bf-340",
        component: () => import("../views/BF/BF3/BF340/index.vue"),
      },
      {
        path: "bf-210",
        component: () => import("../views/BF/BF2/BF210/index.vue"),
      },
      {
        path: "bf-220",
        component: () => import("../views/BF/BF2/BF220/index.vue"),
      },
      {
        path: "bf-220",
        component: () => import("../views/BF/BF2/BF220/index.vue"),
      },
      {
        path: "bf-610",
        component: () => import("../views/BF/BF6/BF610/index.vue"),
      },
      {
        path: "bf-620",
        component: () => import("../views/BF/BF6/BF620/index.vue"),
      },
      {
        path: "bf-640",
        component: () => import("../views/BF/BF6/BF640/index.vue"),
      },
      {
        path: "bf-650",
        component: () => import("../views/BF/BF6/BF650/index.vue"),
      },
      {
        path: "bf-630",
        component: () => import("../views/BF/BF6/BF630/index.vue"),
      },
      {
        path: "cm-110",
        component: () => import("../views/CM/CM1/CM110/index.vue"),
      },
      {
        path: "cm-121",
        component: () => import("../views/CM/CM1/CM121/index.vue"),
      },
      {
        path: "cm-130",
        component: () => import("../views/CM/CM1/CM130/index.vue"),
      },
      {
        path: "pa-110",
        component: () => import("../views/PA/PA1/PA110/index.vue"),
      },
      {
        path: "pa-120",
        component: () => import("../views/PA/PA1/PA120/index.vue"),
      },
      {
        path: "pa-210",
        component: () => import("../views/PA/PA2/PA210/index.vue"),
      },
      {
        path: "pa-220",
        component: () => import("../views/PA/PA2/PA220/index.vue"),
      },
      {
        path: "pa-230",
        component: () => import("../views/PA/PA2/PA230/index.vue"),
      },
      {
        path: "pa-410",
        component: () => import("../views/PA/PA4/PA410/index.vue"),
      },
      {
        path: "pa-420",
        component: () => import("../views/PA/PA4/PA420/index.vue"),
      },
      {
        path: "pa-430",
        component: () => import("../views/PA/PA4/PA430/index.vue"),
      },
      {
        path: "pa-610",
        component: () => import("../views/PA/PA6/PA610/index.vue"),
      },
      {
        path: "pa-620",
        component: () => import("../views/PA/PA6/PA620/index.vue"),
      },
      {
        path: "pa-630",
        component: () => import("../views/PA/PA6/PA630/index.vue"),
      },
      {
        path: "pa-510",
        component: () => import("../views/PA/PA5/PA510/index.vue"),
      },
      {
        path: "pa-520",
        component: () => import("../views/PA/PA5/PA520/index.vue"),
      },
      {
        path: "pa-530",
        component: () => import("../views/PA/PA5/PA530/index.vue"),
      },
      {
        path: "pa-710",
        component: () => import("../views/PA/PA7/PA710/index.vue"),
      },
      {
        path: "pa-730",
        component: () => import("../views/PA/PA7/PA730/index.vue"),
      },
      {
        path: "pa-720",
        component: () => import('../views/PA/PA7/PA720/index.vue'),
      },
      {
        path: "pa-810",
        component: () => import('../views/PA/PA8/PA810/index.vue'),
      },
      {
        path: "ac-110",
        component: () => import('../views/AC/AC1/AC110/index.vue'),
      },
      {
        path: "ac-610",
        component: () => import('../views/AC/AC6/AC610/index.vue'),
      },
      {
        path: "ac-620",
        component: () => import("../views/AC/AC6/AC620/index.vue"),
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.needAuth) {
    if (sessionStorage.getItem("token")) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
