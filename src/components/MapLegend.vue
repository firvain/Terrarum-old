<template>
  <v-dialog v-model="showLegend" max-width="600px">
    <v-card color="accent" class="mx-auto">
      <v-card-title primary-title>
        <h3 class="headline mb-0 white--text">Legend</h3>
        <v-spacer></v-spacer>
        <h4 class="subtitle white--text">{{ legendLayer }}</h4>
      </v-card-title>
      <img
        :src="imagesrc"
        :alt="legendLayer"
        @load="loaded"
        @error="imgError"
      /><img />
      <v-card-actions>
        <!-- <v-spacer></v-spacer> -->
        <v-btn small color="red" @click.stop="close">
          close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- <v-flex xs6 v-if="!loading"><div class="title">Legend</div> </v-flex
      ><v-flex xs6>
        <v-btn flat small="" icon color="red" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 v-if="!loading">
        <div class="subtitle">{{ legendLayer }}</div>
      </v-flex>
      <v-flex xs12>
        <p v-if="loading" class="body-1">{{ status }}</p>
        <v-img
          :src="imagesrc"
          :alt="legendLayer"
          contain
          @load="loaded"
          @error="imgError"
        >
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
      </v-flex> -->
</template>

<script>
// import { mapGetters} from 'vuex';
export default {
  name: "MapLegend",
  data() {
    return {
      loading: true,
      status: "Loading..."
    };
  },
  props: {
    legendBaseUrl: {
      type: String,
      required: true
    },
    format: {
      type: String,
      default: "&format=image/png"
    },
    legendLayer: {
      type: String,
      required: true
    },
    showLegend: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    imagesrc() {
      return (
        this.legendBaseUrl +
        "SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&" +
        "&layer=" +
        this.legendLayer +
        this.format
      );
    }
  },
  methods: {
    loaded() {
      this.loading = false;
    },
    close() {
      this.$emit("legendClose");
    },
    imgError() {
      this.status = "The image could not be loaded.";
    }
  }
};
</script>
<style scoped></style>
