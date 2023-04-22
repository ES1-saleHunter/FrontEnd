<template>
  <div
    class="transition-all duration-500 float-right h-16"
    style="width: 96%"
    v-if="collapsed == true"
  >
    <NavBarCompose />
  </div>
  <div
    class="transition-all duration-300 float-right h-16"
    style="width: 90%"
    v-else
  >
    <NavBarCompose />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import NavBarCompose from "./navbarcompose.vue";

export default {
  components: { NavBarCompose },
  computed: {
    ...mapState({
      collapsed: (state) => state.isCollapsed,
    }),
  },
};
</script>

<style>
</style>
