<template>
  <v-container fluid pa-1 ma-0>
    <v-layout align-center justify-center row wrap fill-height>
      <v-flex shrink>
        <v-radio-group
          ref="measureTypeRadioPicker"
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

          <!-- <template v-slot:append v-if="output"
            ><code class="result text-no-wrap black--text"
              >{{ $t("map.tools.result") | uppercase }} : {{ output }}</code
            >
          </template> -->
        </v-radio-group>
      </v-flex>
      <v-flex shrink class="text-xs-center text-md-left">
        <v-chip label color="pink" text-color="white" v-model="result">
          <v-icon left>mdi-label</v-icon>{{ this.measureOutput }}
        </v-chip>
      </v-flex>
      <v-flex xs12 md2 class="text-xs-center text-md-left">
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
  name: "MapToolsMeasure",
  data() {
    return {
      radioGroupItems: [
        {
          id: 1,
          label: "LineString",
          value: "LineString"
        },
        {
          id: 2,
          label: "Polygon",
          value: "Polygon"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("app", ["appStatus"]),
    ...mapGetters("map", ["drawType", "measureOutput"]),
    radioGroup: {
      get: function() {
        if (this.drawType) {
          return this.drawType;
        }
        this.UPDATE_DRAW_TYPE("LineString");
        return "LineString";
      },
      set: function(newValue) {
        this.UPDATE_DRAW_TYPE(newValue);
      }
    },
    result() {
      if (this.measureOutput) return true;
      return false;
    }
  },
  methods: {
    ...mapActions("app", ["UPDATE_APP_STATUS"]),
    ...mapActions("map", ["UPDATE_DRAW_TYPE", "UPDATE_MEASURE_OUTPUT"]),
    toolAction(value) {
      this.UPDATE_APP_STATUS(value);
    },
    toolActionCancel() {
      this.UPDATE_APP_STATUS("display");
      this.UPDATE_DRAW_TYPE(undefined);
      this.UPDATE_MEASURE_OUTPUT("");
    }
  }
};
</script>
<style lang="scss" scoped>
.v-input--selection-controls {
  padding: 0;
  margin: 0;
}
</style>
