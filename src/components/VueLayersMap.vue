<template>
  <vl-map
    id="mymap"
    ref="map"
    :load-tiles-while-animating="false"
    :load-tiles-while-interacting="false"
    data-projection="EPSG:4326"
    :style="mapStyle"
    @mounted="onMapMounted"
    @rendercomplete="mapRenderComplete"
  >
    <vl-view
      :zoom.sync="zoom"
      :center.sync="center"
      :rotation.sync="rotation"
    ></vl-view>

    <!-- Base layers from Vuex-->
    <vl-layer-tile
      v-for="(layer, key) in baseLayers"
      :key="key"
      :id="key"
      :visible="layer.visible"
      :preload="layer.preload"
    >
      <component
        :is="'vl-source-' + layer.name"
        v-bind="layer"
        @tileloadstart.stop="postC"
        @tileloaderror="tileLoadingError"
      ></component>
      <!-- <component
        :is="layer.source.cmp"
        v-bind="layer.source"
        v-if="layer.title === 'ktimanet'"
      ></component> -->
    </vl-layer-tile>
    <!--// Base layers from Vuex-->
    <!-- other layers from Vuex -->
    <component
      v-for="(layer, key) in layers"
      :is="layer.cmp"
      :visible="layer.visible"
      :key="key"
      :id="key"
      v-bind="layer"
    >
      <!-- add vl-source-* -->
      <component
        :is="layer.source.cmp"
        v-bind="layer.source"
        @error="handleError"
        @imageloadstart="postC"
      >
      </component>
      <!--// vl-source-* -->

      <!-- add style components if provided -->
      <!-- create vl-style-box or vl-style-func -->
      <div v-if="layer.style">
        <component
          v-for="(style, i) in layer.style"
          :key="i"
          :is="style.cmp"
          v-bind="style"
        >
          <!-- create inner style components: vl-style-circle, vl-style-icon, vl-style-fill, vl-style-stroke & etc -->
          <div v-if="style.styles">
            <component
              v-for="(st, cmp) in style.styles"
              :key="cmp"
              :is="cmp"
              v-bind="st"
            >
              <!-- vl-style-fill, vl-style-stroke if provided -->
              <vl-style-fill v-if="st.fill" v-bind="st.fill"></vl-style-fill>
              <vl-style-stroke
                v-if="st.stroke"
                v-bind="st.stroke"
              ></vl-style-stroke>
            </component>
          </div>
        </component>
      </div>
      <!--// style -->
    </component>
    <!--// other layers from Vuex-->

    <!-- Drawing Layers -->
    <component
      v-for="(layer, key) in utilityLayers"
      :is="layer.cmp"
      :visible="
        layer.visible && (appStatus === 'draw' || appStatus === 'measure')
      "
      :key="key"
      :id="layer.id"
      v-bind="layer"
    >
      <component
        :is="layer.source.cmp"
        v-bind="layer.source"
        :ident="layer.id"
        :features.sync="drawnFeatures"
      >
      </component>
      <div v-if="layer.style">
        <component
          v-for="(style, i) in layer.style"
          :key="i"
          :is="style.cmp"
          v-bind="style"
        >
          <!-- create inner style components: vl-style-circle, vl-style-icon, vl-style-fill, vl-style-stroke & etc -->
          <div v-if="layer.style">
            <component
              v-for="(st, cmp) in style.styles"
              :key="cmp"
              :is="cmp"
              v-bind="st"
            >
              <!-- vl-style-fill, vl-style-stroke if provided -->
              <vl-style-fill v-if="st.fill" v-bind="st.fill"></vl-style-fill>
              <vl-style-stroke
                v-if="st.stroke"
                v-bind="st.stroke"
              ></vl-style-stroke>
            </component>
          </div>
        </component>
      </div>
    </component>
    <!--// Drawing Layers -->
    <!-- Interactions -->
    <vl-interaction-draw
      v-if="(appStatus === 'draw' || appStatus === 'measure') && drawType"
      source="draw-target"
      :type="drawType"
      :stopClick="true"
      @drawstart="measureDrawStart"
      @drawend="measureDrawEnd"
    ></vl-interaction-draw>

    <vl-interaction-select
      :features.sync="selectedFeatures"
      v-if="appStatus === 'info'"
      :multi="this.multiInfo"
      :filter="filterF"
    >
      <!-- select styles -->
      <vl-style-box>
        <vl-style-stroke color="#423e9e" :width="7"></vl-style-stroke>
        <vl-style-fill :color="[254, 178, 76, 0.7]"></vl-style-fill>
        <vl-style-circle :radius="5">
          <vl-style-stroke color="#423e9e" :width="7"></vl-style-stroke>
          <vl-style-fill :color="[254, 178, 76, 0.7]"></vl-style-fill>
        </vl-style-circle>
      </vl-style-box>
      <vl-style-box :z-index="1">
        <vl-style-stroke color="#d43f45" :width="2"></vl-style-stroke>
        <vl-style-circle :radius="5">
          <vl-style-stroke color="#d43f45" :width="2"></vl-style-stroke>
        </vl-style-circle>
      </vl-style-box>
      <!--// select styles -->
    </vl-interaction-select>
    <!--// Interactions-->
  </vl-map>
</template>
<script>
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

import ScaleLine from "ol/control/ScaleLine";
import FullScreen from "ol/control/FullScreen";
import OverviewMap from "ol/control/OverviewMap";
import ZoomSlider from "ol/control/ZoomSlider";
import { getArea, getLength } from "ol/sphere.js";
import { Polygon } from "ol/geom.js";
import { Promise } from "q";

export default {
  name: "VueLayersMap",
  data() {
    return {
      center: [21.78896, 40.30069],
      zoom: 10,
      rotation: 0,
      selectedFeatures: [],
      drawnFeatures: [],
      controls: {
        dragPan: false,
        mouseWheelZoom: false
      }
    };
  },
  computed: {
    ...mapGetters("map", [
      "drawType",
      "baseLayers",
      "layers",
      "utilityLayers",
      "activeTreeItem",
      "multiInfo",
      "activeLayer"
    ]),
    ...mapGetters("app", ["appStatus", "sidebar", "print", "exportJson"]),
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
  methods: {
    ...mapActions("map", [
      "UPDATE_SELECTED_FEATURE",
      "UPDATE_MEASURE_OUTPUT",
      "UPDATE_VISIBILITY",
      "UPDATE_LAYER_LOADED"
    ]),
    ...mapActions("app", [
      "UPDATE_PRINT",
      "UPDATE_LOADING",
      "UPDATE_SIDEBAR",
      "UPDATE_EXPORT_JSON"
    ]),
    onMapMounted() {
      // now ol.Map instance is ready and we can work with it directly
      this.$refs.map.$map.getControls().extend([
        new ScaleLine(),
        new FullScreen(),
        new OverviewMap({
          collapsed: true,
          collapsible: true
        }),
        new ZoomSlider()
      ]);
      // this.$refs.map.$map.removeInteraction("DragPan");
      // const interactions = this.$refs.map.$map.getInteractions().clear();
      // interactions.forEach(interaction => console.log(interaction));
    },
    mapRenderComplete(e) {
      this.UPDATE_LOADING(false);
    },
    postC(e) {
      this.UPDATE_LOADING(true);
    },
    async tileLoadingError(e) {
      console.log(e.target);
    },

    layerloaded() {},
    formatLength(line) {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + " " + "km";
      } else {
        output = Math.round(length * 100) / 100 + " " + "m";
      }
      return output;
    },
    formatArea(polygon) {
      const area = getArea(polygon);
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + " " + "km2";
      } else {
        output = Math.round(area * 100) / 100 + " " + "m2";
      }
      return output;
    },

    measureDrawStart() {
      if (this.appStatus === "draw") return;
      this.$refs.draw.getSource().clear();
    },
    measureDrawEnd(evt) {
      if (this.appStatus === "draw") return;
      console.log(evt);
      let geom = evt.feature.getGeometry();
      if (geom instanceof Polygon) {
        this.UPDATE_MEASURE_OUTPUT(this.formatArea(geom));
      } else {
        this.UPDATE_MEASURE_OUTPUT(this.formatLength(geom));
      }
    },
    filterF(feature, layer) {
      if (layer.get("id") == this.activeLayer) return true;
      return false;
    },
    async handleError({ msg, id }) {
      this.$emit("error", msg);
      this.UPDATE_VISIBILITY({ id, value: false });
      this.UPDATE_LOADING(false);
    }
  },
  watch: {
    mapStyle(newValue, oldValue) {
      if (newValue.height != oldValue.height) {
        this.$nextTick().then(() => {
          this.$refs.map.refresh();
        });
      }
    },
    selectedFeatures(newValue) {
      let selection = [];
      if (newValue.length > 0) {
        for (let item of newValue) {
          const { properties } = item;
          if (
            Object.entries(properties).length !== 0 &&
            properties.constructor === Object
          ) {
            selection.push(properties);
          }
        }
        this.UPDATE_SELECTED_FEATURE(selection);
        this.$router.push({ name: "results" });
      }
      this.UPDATE_SELECTED_FEATURE(selection);
    },

    appStatus(newValue) {
      if (newValue === "display") {
        this.drawnFeatures = [];
        this.selectedFeatures = [];
        this.UPDATE_SELECTED_FEATURE([]);
      }
    },
    print(newValue) {
      if (!newValue.value) return;
      const map = this.$refs.map.$map;
      const size = map.getSize();
      const extent = map.getView().calculateExtent(size);
      map.once("rendercomplete", event => {
        const canvas = event.context.canvas;
        const data = canvas.toDataURL("image/jpeg");
        const pdf = new jsPDF("landscape", undefined, newValue.format);
        pdf.addImage(data, "JPEG", 0, 0, newValue.dim0, newValue.dim1);
        pdf.save("map.pdf", { returnPromise: true }).then(() => {
          this.UPDATE_PRINT({
            value: false,
            width: undefined,
            height: undefined,
            dim0: undefined,
            dim1: undefined,
            format: undefined
          });
          this.UPDATE_LOADING(false);
        });
        // Reset original map size
        map.setSize(size);
        map.getView().fit(extent, { size: size });
      });

      // Set print size
      const printSize = [newValue.width, newValue.height];
      map.setSize(printSize);
      map.getView().fit(extent, { size: printSize });
    },
    async exportJson(newValue) {
      if (newValue) {
        const myPromise = new Promise((resolve, reject) => {
          const vectorSource = this.$refs.draw.$layer.getSource();
          var writer = vectorSource.getFormat();
          const features = vectorSource.getFeatures();
          const geojsonStr = writer.writeFeatures(features);
          if (Array.isArray(features) && features.length !== 0) {
            const data = new Blob([geojsonStr], { type: "text/plain" });
            saveAs(data, "geojson_" + Date.now().toString() + ".json");
            resolve();
          }
          reject("Draw Some Features First...");
        });
        try {
          await myPromise;
        } catch (error) {
          this.$emit("error", error);
        } finally {
          this.UPDATE_EXPORT_JSON(false);
        }
      }
      // this.UPDATE_EXPORT_JSON(false);
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (!vm.sidebar && vm.$vuetify.breakpoint.mdAndUp)
  //       vm.UPDATE_SIDEBAR(true);
  //     // vm.UPDATE_LOADING(true);
  //   });
  // },
  mounted() {
    this.UPDATE_LOADING(true);
    if (!this.sidebar && this.$vuetify.breakpoint.mdAndUp)
      this.UPDATE_SIDEBAR(true);
  }
};
</script>

<style scoped>
.ol-overviewmap {
  bottom: auto;
  left: auto;
  right: 0.5em;
  top: 0.5em;
}
</style>
