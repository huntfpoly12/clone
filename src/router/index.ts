import {createRouter, createWebHistory, RouteLocationNormalized} from "vue-router";
import Login from "../views/Login.vue";
import LoginLayout from "../layouts/LoginLayout.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import RquestContract from "../views/requestContract/index.vue";
import ResetPassword from "../views/ResetPassword.vue";
import NotFound from "../views/NotFound.vue";
import {
  AdminScreenRole,
  WorkScreenRole,
  getJwtObject, JwtObject,
} from "@bankda/jangbuda-common";
import isEmpty from "lodash/isEmpty";
import useCheckPermission from "@/helpers/useCheckPermission";
import { userType } from "@/helpers/commonFunction";
const ALL_ROLE = [
  ...AdminScreenRole.all().map((i) => i.enumKey),
  ...WorkScreenRole.all().map((i) => i.enumKey),
];

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    meta: {
      needAuth: true,
      title: "Home",
    },
    children: [
      {
        path: "/bf-310",
        component: () => import("../views/BF/BF3/BF310/index.vue"),
        meta: {
          roles: [AdminScreenRole.CONTRACT_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-320",
        component: () => import("../views/BF/BF3/BF320/index.vue"),
        meta: {
          roles: [AdminScreenRole.COMPANY_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-330",
        component: () => import("../views/BF/BF3/BF330/index.vue"),
        meta: {
          roles: [AdminScreenRole.SERVICE_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-340",
        component: () => import("../views/BF/BF3/BF340/index.vue"),
        meta: {
          roles: [AdminScreenRole.SALES_REPRESENTATIVE_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-210",
        component: () => import("../views/BF/BF2/BF210/index.vue"),
        meta: {
          roles: [AdminScreenRole.USER_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-220",
        component: () => import("../views/BF/BF2/BF220/index.vue"),
        meta: {
          roles: [AdminScreenRole.ROLE_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-251",
        component: () => import("../views/BF/BF2/BF251/index.vue"),
        meta: {
          roles: [AdminScreenRole.CMS_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-252",
        component: () => import("../views/BF/BF2/BF252/index.vue"),
        meta: {
          roles: [AdminScreenRole.BILLING_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-253",
        component: () => import("../views/BF/BF2/BF253/index.vue"),
        meta: {
          roles: [AdminScreenRole.DEPOSIT_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-254",
        component: () => import("../views/BF/BF2/BF254/index.vue"),
        meta: {
          roles: AdminScreenRole.all().map((i) => i.enumKey),
        },
      },
      {
        path: "/bf-255",
        component: () => import("../views/BF/BF2/BF255/index.vue"),
        meta: {
          roles: [AdminScreenRole.REFUNDS_NORMAL_MANAGE.enumKey, AdminScreenRole.REFUNDS_SPECIAL_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-510",
        component: () => import("../views/BF/BF5/BF510/index.vue"),
        meta: {
          roles: [AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-530",
        component: () => import("../views/BF/BF5/BF530/index.vue"),
        meta: {
          roles: [AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-610",
        component: () => import("../views/BF/BF6/BF610/index.vue"),
        meta: {
          roles: [AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-620",
        component: () => import("../views/BF/BF6/BF620/index.vue"),
        meta: {
          roles: [AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-640",
        component: () => import("../views/BF/BF6/BF640/index.vue"),
        meta: {
          roles: [AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-650",
        component: () => import("../views/BF/BF6/BF650/index.vue"),
        meta: {
          roles: [AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE.enumKey],
        },
      },
      {
        path: "/bf-630",
        component: () => import("../views/BF/BF6/BF630/index.vue"),
        meta: {
          roles: [AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE.enumKey],
        },
      },
      {
        path: "/cm-110",
        component: () => import("../views/CM/CM1/CM110/index.vue"),
        meta: {
          roles: [WorkScreenRole.BASIC_SETTINGS.enumKey],
        },
      },
      {
        path: "/cm-121",
        component: () => import("../views/CM/CM1/CM121/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_SETTINGS.enumKey],
        },
      },
      {
        path: "/cm-130",
        component: () => import("../views/CM/CM1/CM130/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_SETTINGS.enumKey],
        },
      },
      {
        path: "/pa-110",
        component: () => import("../views/PA/PA1/PA110/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-120",
        component: () => import("../views/PA/PA1/PA120/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-210",
        component: () => import("../views/PA/PA2/PA210/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-220",
        component: () => import("../views/PA/PA2/PA220/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-230",
        component: () => import("../views/PA/PA2/PA230/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-410",
        component: () => import("../views/PA/PA4/PA410/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-420",
        component: () => import("../views/PA/PA4/PA420/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-430",
        component: () => import("../views/PA/PA4/PA430/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-610",
        component: () => import("../views/PA/PA6/PA610/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-620",
        component: () => import("../views/PA/PA6/PA620/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-630",
        component: () => import("../views/PA/PA6/PA630/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-510",
        component: () => import("../views/PA/PA5/PA510/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-520",
        component: () => import("../views/PA/PA5/PA520/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-530",
        component: () => import("../views/PA/PA5/PA530/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-710",
        component: () => import("../views/PA/PA7/PA710/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-730",
        component: () => import("../views/PA/PA7/PA730/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-720",
        component: () => import("../views/PA/PA7/PA720/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-810",
        component: () => import("../views/PA/PA8/PA810/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-820",
        component: () => import("../views/PA/PA8/PA820/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-830",
        component: () => import("../views/PA/PA8/PA830/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-840",
        component: () => import("../views/PA/PA8/PA840/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-860",
        component: () => import("../views/PA/PA8/PA860/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-880",
        component: () => import("../views/PA/PA8/PA880/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/pa-870",
        component: () => import("../views/PA/PA8/PA870/index.vue"),
        meta: {
          roles: [WorkScreenRole.WITHHOLDING_WORK.enumKey],
        },
      },
      {
        path: "/ac-110",
        component: () => import("../views/AC/AC1/AC110/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-120",
        component: () => import("../views/AC/AC1/AC120/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-130",
        component: () => import("../views/AC/AC1/AC130/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-210",
        component: () => import("../views/AC/AC2/AC210/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-510",
        component: () => import("../views/AC/AC5/AC510/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-530",
        component: () => import("../views/AC/AC5/AC530/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-520",
        component: () => import("../views/AC/AC5/AC520/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-540",
        component: () => import("../views/AC/AC5/AC540/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-550",
        component: () => import("../views/AC/AC5/AC550/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-560",
        component: () => import("../views/AC/AC5/AC560/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-570",
        component: () => import("../views/AC/AC5/AC570/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-580",
        component: () => import("../views/AC/AC5/AC580/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-590",
        component: () => import("../views/AC/AC5/AC590/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-610",
        component: () => import("../views/AC/AC6/AC610/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-620",
        component: () => import("../views/AC/AC6/AC620/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/ac-630",
        component: () => import("../views/AC/AC6/AC630/index.vue"),
        meta: {
          roles: [WorkScreenRole.ACCOUNTING_WORK.enumKey],
        },
      },
      {
        path: "/communication-board",
        component: () =>  import("../views/CommunicationBoard/index.vue"),
        meta: {
          roles: ALL_ROLE,
        },
      },
      {
        path: "/announcement",
        component: () => import("../views/Announcement/User/index.vue"),
        meta: {
          roles: ALL_ROLE,
        },
      },
      {
        path: "/announcement-manager",
        component: () => import("../views/Announcement/Manager/index.vue"),
        meta: {
          roles: ALL_ROLE,
        },
      },
    ],
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
      roles: ALL_ROLE,
    },
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
function hasQueryParams(route: RouteLocationNormalized) {
  return !!Object.keys(route.query).length
}
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.needAuth;
  const roles = isEmpty(to.meta.roles) ? null : (to.meta.roles as string[]);
  if (hasQueryParams(to) && to.query.token && to.query.refreshToken) {
    const {
      token,
      refreshToken,
      globalFacilityBizId,
      path,
      typeLogin,
      year,
      month,
      companyName,
      facilityBusinessName,
      companyId
    } = to.query // get query params
    const objectJwt = getJwtObject(token as string) // decode token
    if (objectJwt) {
      sessionStorage.setItem('token', token as string)
      sessionStorage.setItem('loginExpr', objectJwt.expiredTime.toString())
      sessionStorage.setItem('refreshToken', refreshToken as string)
      sessionStorage.setItem('tabsCached', path as string)
      sessionStorage.setItem('typeLogin', typeLogin as string)
      if(globalFacilityBizId) {
        sessionStorage.setItem('acYear', year as string)
        sessionStorage.setItem('paYear', year as string)
        sessionStorage.setItem('month', month as string)
        sessionStorage.setItem('companyName', decodeURIComponent(companyName as string))
        sessionStorage.setItem('companyId', companyId as string)
        sessionStorage.setItem('name', decodeURIComponent(facilityBusinessName as string))
        sessionStorage.setItem('globalFacilityBizId', globalFacilityBizId as string)
      }
    }
    next(); // remove query params
  }
  else {
    const token = sessionStorage.getItem("token");
    const {read} = useCheckPermission(roles, token);
    // check if token isExpired
    if (token && getJwtObject(token).isExpired()) {
      console.log('%c expired router', 'color: red;',);
    }
    if ((to.fullPath == "/login" || to.fullPath == "/") && token) {
      next("/dashboard");
    } else if (requiresAuth && !token) {
      next("/login");
    } else if (requiresAuth && token && !read) {
      next("not-found");
    } else {
      next();
    }
  }
});
export default router;
