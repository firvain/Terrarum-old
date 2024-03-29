import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vuelayers";
import "./plugins/vuex-i18n";
import "./plugins/vue2-filters";
import AuthPlugin from "./plugins/auth";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Install the authentication plugin
Vue.use(AuthPlugin);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
