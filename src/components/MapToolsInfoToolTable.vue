<template>
  <v-card>
    <v-card-title>
      {{ $t("map.tools.result") | uppercase }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        :label="$t('map.tools.info.table.search') | capitalize"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="this.selectedFeature"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="row">
        <td v-for="(i, key) in row.item" :key="key">
          {{ i }}
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "MapToolsInfoToolTable",
  data() {
    return {
      search: ""
    };
  },
  computed: {
    ...mapGetters("map", ["selectedFeature"]),
    headers() {
      let header = [];
      for (const item of Object.keys(this.selectedFeature[0])) {
        header.push({ text: item, align: "left", sortable: true, value: item });
      }
      return header;
    }
  },
  methods: {
    pickRandomProperty(obj) {
      let result;
      let count = 0;
      for (var prop in obj) if (Math.random() < 1 / ++count) result = prop;
      return result;
    }
  },
  watch: {},
  mounted() {}
};
</script>
