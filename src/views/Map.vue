<template>
  <OpenLMAP></OpenLMAP>
</template>
<script>
import { mapActions } from "vuex";

import OpenLMAP from "@/components/OpenLMAP.vue";

export default {
  name: "Map",
  components: {
    OpenLMAP
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("app", ["UPDATE_LOADING", "UPDATE_APP_STATUS"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.UPDATE_LOADING(true);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.UPDATE_APP_STATUS("display");
    next();
  }
};
</script>
