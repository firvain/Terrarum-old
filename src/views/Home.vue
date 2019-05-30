<template>
  <v-container fluid>
    <v-layout align-start justify-center row wrap fill-height>
      <v-flex xs12 text-xs-center>
        <span class="display-2 font-weight-black d-inline-block">Welcome</span>

        <span class="display-2 font-weight-regular d-inline-block"> to</span>

        <span class="display-2 font-weight-black primary--text d-inline-block"
          >Terrarum
        </span>
      </v-flex>

      <v-flex xs12>
        <v-container grid-list-lg fill-height>
          <v-layout align-center justify-center row wrap>
            <v-flex xs2 text-xs-center>
              <v-img
                :src="require('@/assets/map.png')"
                alt="map"
                height="200"
                contain
              ></v-img>
            </v-flex>
            <v-flex xs2 text-xs-left>
              <span class="headline mb-0 primary--text">Visualize</span>
            </v-flex>
            <v-flex xs2 text-xs-center>
              <v-img
                :src="require('@/assets/map.png')"
                alt="map"
                height="200"
                contain
              ></v-img>
            </v-flex>
            <v-flex xs2 text-xs-left>
              <span class="headline mb-0 primary--text">Visualize</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "home",
  date() {
    return {};
  },
  computed: {
    ...mapGetters("app", ["sidebar"])
  },
  methods: {
    ...mapActions("app", ["UPDATE_SIDEBAR"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.sidebar) vm.UPDATE_SIDEBAR(false);
    });
  }
};
</script>
<style scoped>
.home {
  overflow-y: auto;
  max-height: 50vh;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.home::-webkit-scrollbar {
  display: none;
}
</style>
