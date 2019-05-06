<template>
  <v-container fluid pa-0 ma-0 fill-height>
    <v-layout row wrap align-center justify-center fill-height>
      <v-flex xs12 pl-2>
        <p class="ma-0 d-inline white--text">
          {{ $t("map.tools.name") | uppercase }}
        </p>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon color="accent" @click="toolAction('draw')" v-on="on">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("map.tools.draw.tooltip") | uppercase }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon color="accent" @click="toolAction('measure')" v-on="on">
              <v-icon>mdi-tape-measure</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("map.tools.measure.tooltip") | uppercase }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon color="accent" @click="toolAction('info')" v-on="on">
              <v-icon>mdi-information-variant</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("map.tools.info.tooltip") | uppercase }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon color="accent" @click="toolAction('print')" v-on="on"
              ><v-icon>mdi-printer</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("map.tools.print.tooltip") | uppercase }}</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "MapToolsActions",
  data() {
    return {};
  },
  methods: {
    ...mapActions("app", ["UPDATE_APP_STATUS"]),

    toolAction(value) {
      this.UPDATE_APP_STATUS(value);
    }
  }
};
</script>
