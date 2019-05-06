<template>
  <component :is="component"></component>
</template>
<script>
import { mapGetters } from "vuex";
// import { mapActions } from "vuex";
// import MapToolsInfoToolTable from "@/components/MapToolsInfoToolTable.vue";

export default {
  name: "MapTools",
  data() {
    return {
      component: null
    };
  },
  computed: {
    ...mapGetters("app", ["appStatus"])
  },
  methods: {},
  watch: {
    appStatus(newValue) {
      if (newValue === "display") {
        this.component = () => import("@/components/MapToolsActions");
      } else {
        this.component = () => import("@/components/MapToolsModules");
      }
    }
  },
  mounted() {
    this.component = () => import("@/components/MapToolsActions");
  }
};
</script>
