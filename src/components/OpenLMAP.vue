<template>
  <v-container fluid pl-1 pr-1 pt-1 pb-0 ma-0 class="ovf">
    <v-layout align-center justify-start row wrap fill-height>
      <v-flex xs12 class="grey darken-3">
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
        <VueLayersMap
          :mapStyle="mapStyle"
          :mapProps="this.mapProps"
        ></VueLayersMap>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
const MapTools = () => import("@/components/MapTools");
const VueLayersMap = () => import("@/components/VueLayersMap");

export default {
  name: "OpenLMAP",
  components: {
    MapTools,
    VueLayersMap
  },
  data() {
    return {
      mapProps: {
        center: [21.78896, 40.30069],
        zoom: 10,
        rotation: 0
      }
    };
  },
  computed: {
    toolStyle() {
      console.log(this.$vuetify.breakpoint);
      if (this.$vuetify.breakpoint.mdAndUp) return { height: "48px" };
      return { height: "96px" };
    },
    mapStyle() {
      const footerClientHeight = document.getElementsByTagName("footer")[0]
        .clientHeight;
      const toolBarClientHeight = document.getElementsByTagName("nav")[0]
        .clientHeight;
      // .clientHeight;
      let h;
      if (this.$vuetify.breakpoint.mdAndUp) {
        h =
          this.$vuetify.breakpoint.height -
          footerClientHeight -
          toolBarClientHeight -
          56;
      } else {
        h =
          this.$vuetify.breakpoint.height -
          footerClientHeight -
          toolBarClientHeight -
          104;
      }
      return {
        height: h.toString() + "px",
        width: "100%"
      };
    }
  },
  methods: {},
  watch: {}
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
