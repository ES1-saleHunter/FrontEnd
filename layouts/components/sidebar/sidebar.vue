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
      <img src="~/assets/public/logo.png" id="logo">
      <nuxt-link v-if="user.isadm === true" to="/jogos">
        <el-tooltip class="item" content="Jogos" effect="light" placement="left-start">
          <el-menu-item index="jogos">
            <div class="inline-block align-middle">
              <i-game align-middle theme="outline" size="20" fill="#ffffff" :strokeWidth="2" />
            </div>
          </el-menu-item> </el-tooltip></nuxt-link>

      <nuxt-link v-if="user.isadm === true" to="/lojas">
        <el-tooltip class="item" content="Lojas" effect="light" placement="left-start">
          <el-menu-item index="lojas">
            <div class="inline-block align-middle">
              <i-shop theme="outline" size="20" fill="#ffffff" :strokeWidth="2" />
            </div>
          </el-menu-item> </el-tooltip></nuxt-link>

      <nuxt-link to="/jogos/compara">
        <el-tooltip class="item" content="Comparar preços" effect="light" placement="left-start">
          <el-menu-item index="compara">
            <div class="inline-block align-middle">
              <i-arithmetic-one theme="outline" size="20" fill="#ffffff" :strokeWidth="2" />
            </div>
          </el-menu-item> </el-tooltip></nuxt-link>
    </el-menu>
  </div>

  <!------------------------------------------------------------->

  <!-- <div
    class="bg-white transition-all duration-300 h-screen border-r"
    v-else
    style="width: 10%"
  >
    <div class="">
      <nuxt-link to="/">
        <div class="cursor-pointer h-16">
          <img
            src="../sidebar/icons/icon.png"
            class="p-4 h-auto my-auto"
            alt="Logo"
          />
        </div>
      </nuxt-link>
    </div>
    <hr />
    <div class="transition-all ">
      <el-menu>
        <div class="">
          <nuxt-link to="../produtos">
            <el-menu-item index="1" class="flex flex-row items-center justify-items-start">
              <i-box theme="outline" :strokeWidth="2" size="20" alt="" />
              <span slot="title" class="text-sm 2xl:text-base pl-2">  Produtos</span>
            </el-menu-item></nuxt-link
          >
        </div>
        <div class="">
          <nuxt-link to="../clientes">
            <el-menu-item index="2" class="flex flex-row items-center justify-items-start">
              <i-user theme="outline" :strokeWidth="2" size="20" alt="" />
              <span slot="title" class="text-sm 2xl:text-base pl-2">Clientes</span>
            </el-menu-item>
          </nuxt-link>
        </div>

        <div class="">
          <nuxt-link to="../vendas">
            <el-menu-item index="3" class="flex flex-row items-center justify-items-start">
              <i-shopping-bag
                theme="outline"
                size="20"
                :strokeWidth="2"
                alt=""
              />
              <span slot="title" class="text-sm 2xl:text-base pl-2">Vendas</span>
            </el-menu-item></nuxt-link
          >
        </div>
        <div><nuxt-link to="../servicos/servicos">
          <el-menu-item index=""
            class="
              py-5
              cursor-pointer
              hover:bg-gray-100
              flex flex-nowrap
            "
          >
            <img src="../sidebar/icons/check-one.svg" size="20" class="h-5" alt="" />
            <p class="">Serviç2s</p>
          </el-menu-item>
        </nuxt-link></div> -->
  <!-- </el-menu>
    </div>
  </div> -->
</template>

<style>
.el-menu {
  border: none;
}
</style>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    this.findUser()
  },
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
    async findUser() {
      const token = JSON.parse(localStorage.getItem('token'));
      const { data, status } = await this.$axios({
        method: 'POST',
        url: '/getuser',
        data: {
          token: token
        },
        headers: {
          Authorization: `Bearer ${token}`,
          token: token,
        },
      })
      if (status === 200) this.user = data.user
      console.log('user', this.user);
    },
  },
};
</script>
