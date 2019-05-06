<template>
  <component :is="component"></component>
  <!-- <v-spacer></v-spacer> -->
</template>
<script>
import { mapGetters } from "vuex";
// import { mapActions } from "vuex";
export default {
  name: "MapToolsModules",
  data() {
    return {
      component: null
    };
  },
  computed: {
    ...mapGetters("app", ["appStatus"])
  },

  watch: {},
  mounted() {
    if (this.appStatus === "display") return;
    const filename =
      this.appStatus.charAt(0).toUpperCase() + this.appStatus.slice(1);
    this.component = () => import("@/components/MapToolsModule" + filename);
  }
};
</script>
