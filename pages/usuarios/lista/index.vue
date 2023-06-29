<template>
  <div>
    <sideBar />
    <navbar />
    <div class="flex align-center justify-center mt-5">
      <el-row :gutter="8">
        <el-col :span="10">
          <el-select
            v-model="filtro"
            prop="filtro"
            placeholder="Select the filter"
          >
            <el-option value="name" label="Name"> </el-option>
            <el-option value="state" label="Status"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <el-select v-if="filtro === 'state'" v-model="valor" prop="valor" placeholder="Select the value">
            <el-option value="1" label="Active"> </el-option>
            <el-option value="0" label="Inactive"> </el-option>
          </el-select>  
          <el-input v-else v-model="valor" prop="valor"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-search" @click="aplicaFiltro()"
            >Search</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="w-full flex justify-center">
      <div class="w-3/5 shadow-2xl mt-3">
        <div>
          <div class="flex justify-between items-center pt-4 mb-5">
            <h1 class="font pl-5"><b>Users</b></h1>
          </div>
          <!-- TABLE -->
          <div class="flex">
            <el-table
              empty-text="No Users Indexed"
              :data="users"
              v-loading="loading"
            >
              <el-table-column label="Name" prop="name"> </el-table-column>
              <el-table-column label="Email" prop="email"> </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from "~/layouts/components/sidebar/sidebar.vue";
import navbar from "~/layouts/components/navbar/navbarcompose.vue";

export default {
  components: {
    sideBar,
    navbar,
  },
  data() {
    return {
      users: [],
      loading: false,
      valor: "",
      filtro: "",
    };
  },
  mounted() {
    this.allData();
  },
  methods: {
    async allData() {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const { data, status } = await this.$axios.get("/getallusers", {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });
        if (status === 200) {
          this.users = data.users;
        }
      } catch (error) {
        throw error;
      }
    },
    async aplicaFiltro() {
      const token = JSON.parse(localStorage.getItem("token"));
      const filtro = this.filtro;
      const valor = this.valor;
      try {
        const { data, status } = await this.$axios({
          method: "GET",
          url: "filteruser?" + `${filtro}` + "=" + `${valor}`,
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });
        if (status === 200) {
          this.users = data.users;
        }
      } catch (error) {
        throw error;
      }
    },
  },
};
</script>
