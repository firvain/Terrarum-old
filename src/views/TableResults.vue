<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-feature-search-outline"
              :label="$t('map.tools.info.table.search') | capitalize"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="backToMap"
              >Back</v-btn
            >
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
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
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
      if (this.selectedFeature.length > 0) {
        for (const item of Object.keys(this.selectedFeature[0])) {
          header.push({
            text: item,
            align: "left",
            sortable: true,
            value: item
          });
        }
      }
      return header;
    }
  },
  methods: {
    ...mapActions("map", ["UPDATE_SELECTED_FEATURE"]),
    backToMap() {
      this.$router.push("map");
    }
  },
  watch: {},
  mounted() {}
};
</script>
