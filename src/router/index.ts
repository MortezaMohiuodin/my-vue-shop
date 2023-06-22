import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import pinia from "../store";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import StoreView from "@/views/StoreView.vue";
import useAuthStore from "@/store/useAuthStore";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/store",
    name: "store",
    component: StoreView,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
});
function isAuthenticated(to: any, from: any, next: any) {
  const { isLogin } = useAuthStore(pinia);
  if (to.name !== "login" && !isLogin()) next({ name: "login" });
  else next();
}
export default router;
