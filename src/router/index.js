import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
const routes = [
  { path: "/", component: Home, meta: {
    needAuth: true,
    title: 'Home'
  } },
  { path: "/login", component: Login, meta: {
    title: 'Login'
  } },
 
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