<template>
  <v-container fluid pa-0 ma-0 fill-height>
    <v-layout row wrap align-center justify-center fill-height>
      <v-flex xs12 pl-2>
        <p class="ma-0 d-inline white--text">
          {{ $t("map.tools.name") | uppercase }}
        </p>

        <v-btn icon color="accent" @click="toolAction('draw')"
          ><v-icon>mdi-square-edit-outline</v-icon></v-btn
        >
        <v-btn icon color="accent" @click="toolAction('measure')"
          ><v-icon>mdi-tape-measure</v-icon></v-btn
        >
        <v-btn icon color="accent" @click="toolAction('info')"
          ><v-icon>mdi-information-variant</v-icon></v-btn
        >
        <v-btn icon color="accent" @click="toolAction('print')"
          ><v-icon>mdi-printer</v-icon></v-btn
        >
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
