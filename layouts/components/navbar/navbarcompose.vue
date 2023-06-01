<template>
  <div>
    <div class="mr-5 flex flex-nowrap align-middle justify-end">
      <nuxt-link class="my-auto mr-4"  to="/usuarios/favoritos">Favoritos</nuxt-link>
      <p class="my-auto mr-4">User</p>
      <Avatar class="p-3" />
    </div>
  
  </div>
</template>

<script>
import Avatar from "./avatar.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: { Avatar },
  computed: {
    ...mapState({
      collapsed: (state) => state.isCollapsed,
    }),
  },
  methods: {
    ...mapMutations(["toggleCollapse"]),
  },
};
</script>
