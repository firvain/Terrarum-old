<template>
  <v-layout v-if="this.$route.name === 'main'" pa-3 row wrap>
    <v-flex>
      <v-card class="mx-auto" max-width="500">
        <v-sheet class="pa-3 secondary">
          <v-text-field
            v-model="search"
            :label="$t('map.treeview.search')"
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
          <v-checkbox
            v-model="caseSensitive"
            dark
            hide-details
            :label="$t('map.treeview.sensitive')"
          ></v-checkbox>
        </v-sheet>
        <v-card-text>
          <v-treeview
            :active.sync="active"
            :items="mapLayers"
            item-text="title"
            :search="search"
            :filter="filter"
            :open.sync="open"
            activatable
            active-class="accent lighten-4 accent--text"
            selected-color="accent"
            open-on-click
            :open-all="true"
          >
            <template v-slot:prepend="{ item, active }">
              <v-icon
                v-if="!item.children"
                :color="active ? 'accent' : ''"
                v-text="
                  `mdi-${
                    item.visible === true ? 'eye-outline' : 'eye-off-outline'
                  }`
                "
                @click="changeVisibility(item)"
              ></v-icon
            ></template>
            <template v-slot:append="{ item }">
              <v-icon
                v-if="hasWmsLegend(item)"
                color="accent"
                v-text="'mdi-map-legend'"
                @click.stop="loadLegend(item)"
              ></v-icon>
            </template>
          </v-treeview>
        </v-card-text>
      </v-card>
      <!-- {{ this.selected }} -->
    </v-flex>
    <v-flex>
      <MapLegend
        :legendBaseUrl="legendBaseUrl"
        :legendLayer="legendLayer"
        :showLegend="showLegend"
        @legendClose="showLegend = !showLegend"
      ></MapLegend>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import MapLegend from "@/components/MapLegend.vue";
export default {
  components: {
    MapLegend
  },
  data: () => ({
    open: [],
    search: null,
    caseSensitive: false,
    showLegend: false,
    legendBaseUrl: "",
    legendLayer: "",
    legendFormat: ""
  }),
  computed: {
    ...mapGetters("map", ["layers", "baseLayers", "activeTreeItem"]),
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    },
    active: {
      get: function() {
        return this.activeTreeItem;
      },
      set: function(v) {
        this.UPDATE_ACTIVE_TREE_ITEM(v);
      }
    },
    mapLayers() {
      let treeLayers = [
        {
          id: 1,
          title: this.$t("map.layers.base"),
          children: Object.keys(this.baseLayers).map(k => {
            let original = this.baseLayers[k];
            let id = k;
            let target = { id, ...original };
            return target;
          })
        },
        {
          id: 2,
          title: this.$t("map.layers.vector"),
          children: Object.keys(this.layers).map(k => {
            let original = this.layers[k];
            let id = k;
            let target = { id, ...original };
            return target;
          })
        }
      ];
      return treeLayers;
    }
  },
  methods: {
    ...mapActions("map", ["UPDATE_ACTIVE_TREE_ITEM", "UPDATE_VISIBILITY"]),
    ...mapActions("app", ["UPDATE_LOADING"]),
    changeVisibility({ id, visible }) {
      if (this.baseLayers[id] != null) {
        this.UPDATE_VISIBILITY({ id, value: !visible });
      }
      if (this.layers[id] != null) {
        this.UPDATE_VISIBILITY({ id, value: !visible });
      }
      if (!visible) this.UPDATE_LOADING(true);
    },
    hasWmsLegend(item) {
      if (
        item.visible &&
        item.hasOwnProperty("source") &&
        item.source.hasOwnProperty("cmp") &&
        item.source.cmp.includes("wms")
      )
        return true;
      return false;
    },
    loadLegend(item) {
      this.legendBaseUrl = item.source.url;
      this.legendLayer = item.source.layers;
      this.showLegend = true;
    }
  },
  mounted() {},
  watch: {}
};
</script>
<style>
/* fix for overflowing text in v-treeview */
.v-treeview-node__content,
.v-treeview-node__label {
  flex-shrink: 1 !important;
}
.v-treeview-node__root {
  height: auto !important;
}
</style>
