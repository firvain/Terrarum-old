<template>
  <v-container fuild fill-height>
    <v-layout align-center justify-center column fill-height>
      <v-flex xs3>
        <span class="display-3 font-weight-black ">Welcome</span>
      </v-flex>
      <v-flex xs3 pa-0>
        <span class="display-2 font-weight-regular">to</span>
      </v-flex>
      <v-flex xs3 pa-0>
        <span class="display-3 font-weight-black primary--text">
          Terrarum
        </span>
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
