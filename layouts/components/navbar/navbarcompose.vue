<template>
<nav class="bg-gray-800 w-full z-20 top-0 left-0 border-b border-gray-200">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="" class="flex items-center">
      <img src="~/assets/public/logo.png" id="logo" class="h-14 mr-3" alt="Logo">
      <span class=" text-white self-center text-2xl font-semibold whitespace-nowrap">SaleHunter</span>
  </a>
  <div class="flex md:order-2">
      <p class="text-white mt-2 font-medium rounded-lg">{{ user.name }}</p>
      <Avatar class="ml-4" />
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 p-0 mt-4 font-medium rounded-lg bg-gray-800 md:flex-row md:space-x-8 md:mt-0 md:border-0">
      <li>
        <nuxt-link class="text-white"  to="/jogos/compara">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link class="text-white"  to="/usuarios/favoritos">Favorites</nuxt-link>
      </li>
      <li>
        <nuxt-link class="text-white" v-if="user.isadm === true" to="/jogos">Games</nuxt-link>
     </li>
     <li>
        <nuxt-link class="text-white" v-if="user.isadm === true" to="/lojas">Stores</nuxt-link>
     </li>
     <li>
        <nuxt-link class="text-white" v-if="user.isadm === true" to="/usuarios/lista">Users</nuxt-link>
     </li>
    </ul>
  </div>
  </div>
</nav>


</template>

<script>
import Avatar from "./avatar.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: { Avatar },
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
  },
 
  methods: {
    ...mapMutations(["toggleCollapse"]),
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
