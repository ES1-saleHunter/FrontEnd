<template>
  <div>
    <div class="mr-5 flex flex-nowrap align-middle justify-end">
      <p class="my-auto mr-4">Usuário</p>
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
