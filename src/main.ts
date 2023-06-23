import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import i18n from "./plugins/i18n";
import vuetify from "./plugins/vuetify";
import { localSettingPlugin } from "./plugins/localSetting";
import filters from "@/modules/filters";
import { registerLayouts } from "./layouts/register";

Vue.config.productionTip = false;

import "@/assets/scss/index.scss";

registerLayouts();

Vue.filter("price", filters.price);
Vue.use(localSettingPlugin);

const vm = new Vue({
  pinia,
  router,
  i18n,
  vuetify,
  render: (h) => h(App),
});

vm.$mount("#app");
