import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import RquestContract from "../views/RequestContract.vue"
const routes = [
  { path: "/", component: Home, meta: {
    needAuth: true,
    title: 'Home'
    } 
  },
  { path: "/login", component: Login, 
    meta: {
      title: 'Login'
    } 
  },
  { path: "/request-contract", component: RquestContract, 
    meta: {
      title: 'Request Contract'
    } 
  },
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