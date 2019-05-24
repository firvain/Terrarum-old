<template>
  <v-container fluid fill-height>
    <v-layout align-start justify-start row wrap>
      <v-flex xs6 md6>
        <span class="display-1 font-weight-black d-inline-block">Welcome</span>
        <span class="display-2 font-weight-regular d-inline-block"> to</span>
        <span class="display-3 font-weight-black primary--text d-inline-block"
          >Terrarum</span
        >
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-lg>
          <v-layout align-center justify-center row wrap class="home">
            <v-flex xs6>
              <v-card flat>
                <v-img
                  :src="require('@/assets/map.png')"
                  alt="map"
                  height="400"
                  contain
                ></v-img>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Visualise your data</h3>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs6>
              <v-card flat>
                <v-img
                  contain
                  :src="require('@/assets/map.png')"
                  alt="map"
                  height="400"
                ></v-img>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Visualise your data</h3>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs6>
              <v-card flat>
                <v-img
                  contain
                  :src="require('@/assets/map.png')"
                  alt="map"
                  height="400"
                ></v-img>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Visualise your data</h3>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs6>
              <v-card flat>
                <v-img
                  contain
                  :src="require('@/assets/map.png')"
                  alt="map"
                  height="400"
                ></v-img>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Visualise your data</h3>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex xs6>
              <v-card flat>
                <v-img
                  contain
                  :src="require('@/assets/map.png')"
                  alt="map"
                  aspect-ratio="1"
                ></v-img>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Visualise your data</h3>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex xs6>
              <v-card flat>
                <v-img
                  contain
                  :src="require('@/assets/map.png')"
                  alt="map"
                  height="400"
                ></v-img>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Visualise your data</h3>
                  </div>
                </v-card-title>
              </v-card>
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
