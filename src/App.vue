<template>
  <v-app>
    <AppLoading></AppLoading>
    <v-navigation-drawer v-model="drawer" app :width="400" stateless clipped>
      <LayersTree></LayersTree>
      <!-- <featureInfo v-if="appStatus === 'info'"></featureInfo> -->
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app clipped-left>
      <v-toolbar-side-icon @click.stop="handleDrawer"></v-toolbar-side-icon>
      <img src="@/assets/logo.png" width="60" height="60" alt="" />
      <v-toolbar-title class="hidden-sm-and-down">Terrarum</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon to="/" v-on="on"><v-icon>mdi-home</v-icon></v-btn>
          </template>
          <span>{{ $t("toolbar.home") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon to="/map/main" v-on="on"
              ><v-icon>mdi-map</v-icon></v-btn
            >
          </template>
          <span>{{ $t("toolbar.map") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon to="/about" v-on="on"
              ><v-icon>mdi-information</v-icon></v-btn
            >
          </template>
          <span>{{ $t("toolbar.about") }}</span>
        </v-tooltip>

        <v-btn v-if="!isAuthenticated" flat @click.prevent="login">LOGIN</v-btn>
        <v-btn v-if="isAuthenticated" flat @click.prevent="logout"
          >LOGOUT</v-btn
        >
        <v-btn v-if="isAuthenticated" flat to="/profile">Profile</v-btn>
      </v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" v-on="on" depressed="">
            {{ currentLang }}
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="country('en')">
            <v-list-tile-avatar>
              <country-flag country="gb" size="small"></country-flag>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>English</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="country('gr')">
            <v-list-tile-avatar>
              <country-flag country="gr" size="small"></country-flag>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Ελληνικά</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="country('mk')">
            <v-list-tile-avatar>
              <country-flag country="mk" size="small"></country-flag>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title @click="country('mk')"
                >македонски јазик</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="primary" app fixed height="60">
      <v-container pa-0>
        <v-layout row wrap align-center justify-center fill-height>
          <v-flex xs6 md3 lg2>
            <v-img
              class="white"
              contain
              max-height="40"
              :src="require('@/assets/placeholder.com-logo3.png')"
              alt="Interreg Greece - FYROM"
            ></v-img>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex shrink class="text-xs-center">
            <span class="white--text">&copy; Terra Cognita 2019</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import CountryFlag from "vue-country-flag";
const LayersTree = () => import("@/components/LayersTree.vue");
import AppLoading from "@/components/AppLoading.vue";
// import featureInfo from "@/components/featureInfo.vue";

export default {
  name: "App",
  components: {
    AppLoading,
    LayersTree,
    CountryFlag
  },
  data() {
    return {
      drawer: false,
      isAuthenticated: false
    };
  },
  computed: {
    ...mapGetters("app", ["appStatus", "sidebar"]),

    currentLang() {
      return this.$i18n.locale();
    }
  },
  methods: {
    ...mapActions("app", ["UPDATE_SIDEBAR"]),
    handleDrawer() {
      if (this.drawer) {
        this.UPDATE_SIDEBAR(false);
      } else {
        this.UPDATE_SIDEBAR(true);
      }
    },
    country(v) {
      this.$i18n.set(v);
    },
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    },
    async created() {
      try {
        await this.$auth.renewTokens();
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    sidebar(newValue, oldValue) {
      if (newValue != oldValue) this.drawer = newValue;
    }
  }
};
</script>
<style>
html {
  overflow-y: hidden;
}
</style>
