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
      <v-flex xs12 md1 class="text-xs-center text-md-left">
        <v-btn small color="error" @click="toolActionCancel()"
          >{{ $t("map.tools.cancel") }}
          <v-icon right small>mdi-cancel</v-icon>
        </v-btn>
      </v-flex>
      <v-spacer></v-spacer>
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
    ...mapActions("app", ["UPDATE_APP_STATUS"]),
    ...mapActions("map", ["UPDATE_DRAW_TYPE"]),
    toolActionCancel() {
      this.UPDATE_APP_STATUS("display");
      this.UPDATE_DRAW_TYPE(undefined);
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
