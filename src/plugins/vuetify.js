import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  theme: {
    primary: "#3F51B5",
    secondary: "#757575",
    accent: "#607D8B",
    error: "#f44336",
    warning: "#673ab7",
    info: "#3f51b5",
    success: "#4caf50"
  },
  iconfont: "mdi"
});
