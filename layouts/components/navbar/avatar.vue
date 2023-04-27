<template>
  <div class="font-murecho">
    <el-dropdown trigger="click" class="h-full" @command="handleCommand">
      <div class="flex h-full items-center">
        <el-avatar class="cursor-pointer" :src="circleUrl"></el-avatar>
      </div>

      <el-dropdown-menu slot="dropdown" class="w-48 justify-items-end">
        <!-- <el-dropdown-item command="showEdit"> -->
        <button class="centered-button" @click="redirect()">
          Edit Profile
        </button>
        <!-- </el-dropdown-item> -->
        <el-dropdown-item divided command="logout">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog width="40%" height="40%" ref="profile" title="Edit Profile" :visible.sync="dialogo"
      :close-on-click-modal="false">
      <el-form ref="loja" :model="perfil" label-position="top">
        <div class="flex flex-wrap flex-col">
          <el-form-item label="Name" prop="name">
            <el-input v-model="perfil.name"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input disabled v-model="perfil.email"></el-input>
          </el-form-item>
        </div>
        <div class="flex justify-end">
          <el-button type="danger" size="small" @click="dialogo = false">
            Cancel
          </el-button>
          <el-button type="success" @click="submitLoja()" size="small ">
            Save
          </el-button>
        </div>
      </el-form>

    </el-dialog>
  </div>
</template>
<script>

function limpaPerfil() {
  return {
    name: '',
    email: '',
    isadm: 0,
    state: 1
  }
}

export default {

  data() {
    return {
      perfil: limpaPerfil(),
      dialogo: false,
      circleUrl: "https://w7.pngwing.com/pngs/659/667/png-transparent-computer-icons-user-profile-blog-others-miscellaneous-rectangle-logo.png",
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "showEdit":
          alert("edit");
          break;
        case "logout":
          alert("logout");
          break;
      }
    },
    async redirect() {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const { data, status } = await this.$axios.get('/getuser', {
          body: {
            Authorization: `Bearer ${token}`,
            token: token
          },
          headers: {
            Authorization: `Bearer ${token}`,
            token: token
          },
        });
        if (status === 200) {
          this.perfil = data

        } else
          this.perfil = []

      } catch (error) {
        throw error;
      }
      this.dialogo = true
    },
  },
};
</script>

<style>
.centered-button {
  background-color: #ffffff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>