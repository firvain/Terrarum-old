<template>
  <v-container fluid pl-1 pr-1 pt-1 pb-0 ma-0>
    <v-layout align-center justify-start row wrap fill-height>
      <v-flex xs12 class="grey darken-3" v-show="this.$route.name != 'results'">
        <v-container pa-0 ma-0>
          <v-layout align-center justify-start row wrap>
            <div v-bind:style="toolStyle">
              <v-fade-transition>
                <MapTools></MapTools>
              </v-fade-transition>
            </div>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12>
        <router-view></router-view>
        <!-- <VueLayersMap
          :mapStyle="mapStyle"
          :mapProps="this.mapProps"
        ></VueLayersMap> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

const MapTools = () => import("@/components/MapTools");

export default {
  name: "Map",
  components: {
    MapTools
  },
  data() {
    return {};
  },
  computed: {
    toolStyle() {
      if (this.$vuetify.breakpoint.mdAndUp) return { height: "48px" };
      return { height: "96px" };
    }
  },
  methods: {
    ...mapActions("app", ["UPDATE_APP_STATUS"])
  },
  beforeRouteLeave(to, from, next) {
    this.UPDATE_APP_STATUS("display");
    next();
  }
};
</script>
<style>
.ovf {
  overflow-y: hidden;
}
.ol-overviewmap {
  bottom: auto;
  left: auto;
  right: 0.5em;
  top: 0.5em;
}
</style>
