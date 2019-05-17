import Vue from "vue";
import Router from "vue-router";

import auth from "./services/authService";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: () => import(/* webpackChunkName: "404" */ "./views/404.vue")
    },
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/map",
      name: "map",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "map" */ "./views/Map.vue"),
      children: [
        {
          path: "main",
          name: "main",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "main" */ "./components/VueLayersMap.vue"
            )
        },
        {
          path: "results",
          name: "results",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "results" */ "./components/MapToolsModuleInfoTable.vue"
            )
        }
      ]
    },
    {
      path: "/callback",
      name: "callback",
      component: () =>
        import(/* webpackChunkName: "callback" */ "./components/Callback.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () =>
        import(/* webpackChunkName: "profile" */ "./components/Profile.vue"),
      beforeEnter: (to, from, next) => {
        console.log(to.path);
        if (
          to.path === "/" ||
          to.path === "/callback" ||
          auth.isAuthenticated()
        ) {
          return next();
        }
        // Specify the current path as the customState parameter, meaning it
        // will be returned to the application after auth
        auth.login({ target: to.path });
      }
    }
  ]
});
