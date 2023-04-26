<template>
  <div class="
        fixed
        bg-white
        transition-all
        duration-500
        h-screen
        divide-y divide-gray-200 divide-solid
        border-r
      " v-if="collapsed == true" style="width: 5%">
    <el-menu class="h-screen" :collapse="!collapsed" background-color="#C94F32" text-color="#ffffff"
      active-text-color="#34512a" @select="menuSelect">
      <!-- menu -->
      <img  src="~/assets/public/logo.png" id="logo" >
      <nuxt-link to="/jogos">
        <el-tooltip class="item" content="Jogos" effect="light" placement="left-start">
          <el-menu-item index="jogos">
            <div class="inline-block align-middle">
              <i-game align-middle theme="outline" size="20" fill="#ffffff" :strokeWidth="2" />
            </div>
          </el-menu-item> </el-tooltip></nuxt-link>

      <nuxt-link to="/lojas">
        <el-tooltip class="item" content="Lojas" effect="light" placement="left-start">
          <el-menu-item index="lojas">
            <div class="inline-block align-middle">
              <i-shop theme="outline" size="20" fill="#ffffff" :strokeWidth="2" />
            </div>
          </el-menu-item> </el-tooltip></nuxt-link>

    </el-menu>
  </div>
</template>

<style>
.el-menu {
  border: none;
}
</style>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      collapsed: (state) => state.isCollapsed,
    }),
    ...mapMutations(["toggleCollapse"]),
  },
  methods: {
    menuSelect(index) {
      this.$router.push(`/${index}`)
    },
  },
};
</script>
