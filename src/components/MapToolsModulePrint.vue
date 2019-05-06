<template>
  <v-container fluid pa-0 ma-0 fill-height>
    <v-layout align-center justify-start row wrap fill-height>
      <v-flex xs6 md2>
        <v-select
          v-model="selectDim"
          :items="dims"
          label="Dimentions"
          solo
          dense
          dark
          flat
          hide-details
          return-object
        ></v-select>
      </v-flex>

      <v-flex xs6 md2>
        <v-select
          v-model="selectResolution"
          :items="resolutions"
          label="Resolutions"
          solo
          dense
          dark
          flat
          hide-details
          return-object
        ></v-select>
      </v-flex>
      <v-flex xs12 md3>
        <v-layout row align-center justify-center>
          <v-flex xs6 class="text-xs-center">
            <v-btn small color="success" @click="exportButton">
              Print
            </v-btn>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <v-btn small color="error" @click="toolActionCancel()"
              >{{ $t("map.tools.cancel") }}
              <v-icon right small>mdi-cancel</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import jsPDF from "jspdf";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "MapToolsPrint",
  data() {
    return {
      selectDim: { text: "a4", value: [420, 297] },
      dims: [
        { text: "A1", value: [1189, 841] },
        { text: "A2", value: [841, 594] },
        { text: "A3", value: [594, 420] },
        { text: "A4", value: [420, 297] },
        { text: "A5", value: [210, 148] }
      ],
      resolutions: [
        { text: "72 dpi (fast)", value: "72" },
        { text: "150 dpi", value: "150" },
        { text: "300 dpi (slow)", value: "300" }
      ],
      selectResolution: { text: "150 dpi", value: "150" }
    };
  },
  computed: {
    ...mapGetters("app", ["appStatus", "print"])
  },
  methods: {
    ...mapActions("app", [
      "UPDATE_APP_STATUS",
      "UPDATE_PRINT",
      "UPDATE_LOADING"
    ]),
    exportButton() {
      this.UPDATE_LOADING(true);
      const width = Math.round(
        (this.selectDim.value[0] * this.selectResolution.value) / 25.4
      );
      const height = Math.round(
        (this.selectDim.value[1] * this.selectResolution.value) / 25.4
      );
      const dim0 = this.selectDim.value[0];
      const dim1 = this.selectDim.value[1];
      const format = this.selectDim.text;

      this.UPDATE_PRINT({
        value: true,
        height,
        width,
        dim0,
        dim1,
        format
      });
    },
    toolActionCancel() {
      this.UPDATE_APP_STATUS("display");
    }
  }
};
</script>
<style scoped>
.v-text-field--box .v-input__slot,
.v-text-field--outline .v-input__slot {
  min-height: inherit !important;
  display: flex !important;
  align-items: center !important;
}
</style>
