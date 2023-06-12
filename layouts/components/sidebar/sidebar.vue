<template>

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
