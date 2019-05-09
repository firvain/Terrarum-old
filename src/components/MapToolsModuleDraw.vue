<template>
  <v-container fluid pa-1 ma-0 fill-height>
    <v-layout align-center justify-center row wrap fill-height>
      <v-flex shrink>
        <v-radio-group
          ref="drawTypeRadioPicker"
          row
          v-model="radioGroup"
          hide-details
          :label="$t('map.tools.selectFeature') | uppercase"
          dark
        >
          <v-radio
            v-for="item in radioGroupItems"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          ></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs6 md3 class="text-xs-center ">
        <v-btn small color="accent" @click="exportJson()"
          >Export Geojson
          <v-icon right small>mdi-database-export</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs6 md2 class="text-xs-center ">
        <v-btn small color="error" @click="toolActionCancel()"
          >{{ $t("map.tools.cancel") }}
          <v-icon right small>mdi-cancel</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "MapToolsDraw",
  data() {
    return {
      radioGroupItems: [
        {
          id: 1,
          label: "Point",
          value: "Point"
        },
        {
          id: 2,
          label: "LineString",
          value: "LineString"
        },
        {
          id: 3,
          label: "Polygon",
          value: "Polygon"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("app", ["appStatus"]),
    ...mapGetters("map", ["drawType"]),
    radioGroup: {
      get: function() {
        if (this.drawType) {
          return this.drawType;
        }
        this.UPDATE_DRAW_TYPE("Point");
        return "Point";
      },
      set: function(newValue) {
        this.UPDATE_DRAW_TYPE(newValue);
      }
    }
  },
  methods: {
    ...mapActions("app", ["UPDATE_APP_STATUS", "UPDATE_EXPORT_JSON"]),
    ...mapActions("map", ["UPDATE_DRAW_TYPE"]),
    toolActionCancel() {
      this.UPDATE_APP_STATUS("display");
      this.UPDATE_DRAW_TYPE(undefined);
    },
    exportJson() {
      this.UPDATE_EXPORT_JSON(true);
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.v-input--selection-controls {
  padding: 0;
  margin: 0;
}
</style>
