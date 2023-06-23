import Vue from "vue";
import VueRouter, { RouteConfig, NavigationGuardNext, Route } from "vue-router";

import pinia from "../store";
import useAuthStore from "@/store/useAuthStore";
import useShopStore from "@/store/useShopStore";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: dynamicImport("HomeView"),
    beforeEnter: homeRouteGuard,
    meta: {
      layout: "Default",
      authRequired: true,
    },
  },
  {
    path: "/store",
    name: "store",
    component: dynamicImport("StoreView"),
    meta: {
      layout: "Default",
      authRequired: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: dynamicImport("LoginView"),
    meta: {
      layout: "Auth",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  if (to?.meta?.authRequired) {
    const { getUser } = useAuthStore(pinia);
    const user = getUser();
    !user && to.name !== "login" ? next({ name: "login" }) : next();
  } else {
    next();
  }
});

function homeRouteGuard(to: Route, from: Route, next: NavigationGuardNext) {
  const { shop } = useShopStore();
  shop.id ? next() : next("/store");
}

function dynamicImport(componentName: string) {
  return () => import(`../views/${componentName}.vue`);
}
export default router;
