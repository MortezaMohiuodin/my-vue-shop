import Vue from "vue";
import AppLayout from "./AppLayout.vue";
import AuthLayout from "./AuthLayout.vue";
import DefaultLayout from "./DefaultLayout.vue";

export const registerLayouts = () => {
  Vue.component("AppLayout", AppLayout);
  Vue.component("AuthLayout", AuthLayout);
  Vue.component("DefaultLayout", DefaultLayout);
};
