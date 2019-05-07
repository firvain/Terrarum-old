<template>
  <v-container fluid pa-0 ma-0 fill-height>
    <v-layout align-center justify-center row wrap fill-height>
      <v-flex xs6 md4>
        <v-select
          v-model="selectedLayer"
          :items="items"
          :label="$t('map.tools.info.select.label') | uppercase"
          solo
          dense
          dark
          flat
          hide-details
          return-object
          @change="UPDATE_ACTIVE_LAYER"
        ></v-select>
      </v-flex>
      <v-flex xs6 md4>
        <v-switch
          v-model="switch1"
          hide-details
          dark
          :label="$t('map.tools.info.multi') | uppercase"
          class="ma-0 pa-0"
        ></v-switch>
      </v-flex>
      <v-flex xs12 md2 class="text-xs-center">
        <v-btn small color="error" @click="toolActionCancel()"
          >{{ $t("map.tools.cancel") }}
          <v-icon right small>mdi-cancel</v-icon>
        </v-btn>
      </v-flex>
      <v-spacer></v-spacer>
      <!-- <v-flex v-if="this.selectedFeature.length !== 0" xs12 pa-4
        ><MapToolsInfoToolTable></MapToolsInfoToolTable>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>
<script>
import Vue2Filters from "vue2-filters";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
// import MapToolsInfoToolTable from "@/components/MapToolsInfoToolTable";
export default {
  name: "MapToolsModulesInfo",
  mixins: [Vue2Filters.mixin],
  data() {
    return {
      selectedLayer: {}
    };
  },
  components: {
    // MapToolsInfoToolTable
  },
  computed: {
    ...mapGetters("app", ["appStatus", "multiInfo"]),
    ...mapGetters("map", ["layers", "multiInfo", "selectedFeature"]),
    items() {
      let target = [];
      Object.keys(this.layers).map(k => {
        // const original = this.layers[k];
        if (!this.layers[k]["visible"]) return;
        const value = k;
        const text = this.layers[k]["title"];
        const item = { value, text };
        target.push(item);
      });
      return target;
    },
    switch1: {
      get() {
        return this.multiInfo;
      },
      set(v) {
        this.UPDATE_MULTI_INFO(v);
      }
    }
  },
  methods: {
    ...mapActions("app", [
      "UPDATE_APP_STATUS",
      "UPDATE_MULTI_INFO",
      "UPDATE_ACTIVE_LAYER"
    ]),
    ...mapActions("map", ["UPDATE_MULTI_INFO", "UPDATE_ACTIVE_LAYER"]),
    toolActionCancel() {
      this.UPDATE_APP_STATUS("display");
    }
  },
  mounted() {}
};
</script>
