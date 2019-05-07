<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <v-container
              ><v-layout align-start justify-start row fill-height wrap
                ><v-flex xs12 md6>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-feature-search-outline"
                    :label="$t('map.tools.info.table.search') | capitalize"
                    single-line
                    hide-details
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6 text-xs-center text-md-right>
                  <v-btn color="accent" to="main" exact>Back</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
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
    ...mapGetters("app", ["sidebar"]),
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
    ...mapActions("app", ["UPDATE_SIDEBAR"])
  },
  watch: {},
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.sidebar) vm.UPDATE_SIDEBAR(false);
    });
  }
};
</script>
