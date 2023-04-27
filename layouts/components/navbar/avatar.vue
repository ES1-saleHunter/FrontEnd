<template>
  <div class="font-murecho">
    <el-dropdown trigger="click" class="h-full" @command="handleCommand">
      <div class="flex h-full items-center">
        <el-avatar class="cursor-pointer" :src="circleUrl"></el-avatar>
      </div>

      <el-dropdown-menu slot="dropdown" class="w-48 justify-items-end">
        <el-dropdown-item command="openDialog">Edit Profile</el-dropdown-item>
        <el-dropdown-item divided command="logout">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog width="40%" height="40%" ref="profile" title="Edit Profile" :visible.sync="dialogo"
      :close-on-click-modal="false">
      <el-form ref="profile" :model="perfil" :rules="rules" label-position="top">
        <div class="flex flex-wrap flex-col">
          <el-form-item label="Name" prop="name">
            <el-input v-model="perfil.name"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input disabled v-model="perfil.email"></el-input>
          </el-form-item>
        </div>

        <div class="flex justify-center">
          <el-button type="warning" size="small" @click="removeUser()">
            Remover conta
          </el-button>
          <el-button type="danger" size="small" @click="dialogo = false">
            Cancel
          </el-button>
          <el-button type="success" @click="updateUser()" size="small ">
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
      rules: {
        name: [
          {
            required: true,
            message: 'Input your name.',
            trigger: 'blur',
          },
        ],
      }
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "openDialog":
          // this.dialogo = true;
          this.findUser()
          break;
        case "logout":
          // alert("logout");
          this.logout()
          break;
      }
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
      if (status === 200) {
        this.perfil = data.user
        this.dialogo = true
      }
    },
    async updateUser() {
      // updateuser
      const token = JSON.parse(localStorage.getItem('token'));
      const dados = {
        token: token,
        name: this.perfil.name
      }
      this.$refs["profile"].validate(async (valid) => {
        const { data, status } = await this.$axios({
          method: 'PUT',
          url: '/updateuser',
          data: dados,
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        }).catch((error) => {
          return {
            data: [],
            status: error.response.status,
          };
        });
        if (status === 200) {
          this.$message({
            message: "Pefil atualizado com sucesso!",
            type: "success",
          });
          this.dialogo = false;

        } else {
          this.$message({
            message: "Erro ao atualizar cadastro",
            type: "warning",
          });
        }
      });
    },
    async removeUser() {
      this.$confirm("Essa ação excluirá sua conta, deseja continuar?", "Cuidado!", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
        type: "warning",
      })
        .then(() => {
          const token = JSON.parse(localStorage.getItem('token'));
          const dados = {
            token: token,
            name: this.perfil.name
          }

          const { data, status } = this.$axios({
            method: 'DELETE',
            url: '/deleteuser',
            data: dados,
            headers: {
              Authorization: `Bearer ${token}`,
              token: token
            },
          }).catch((error) => {
            return {
              data: [],
              status: error.response.status,
            };
          });
          this.logout()
        })
        .catch(() => { });
    },
    async remove() {

    },
    async logout() {
      localStorage.removeItem('token');
      this.$router.push('/usuarios/login')
    }
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