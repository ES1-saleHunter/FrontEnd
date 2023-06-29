<template>
  <div>
    <sideBar />
    <navbar />
    <div class="w-full flex justify-center">
      <div class="w-3/5 shadow-2xl mt-3">
        <div>
          <div class="flex justify-between items-center pt-4">
            <h1 class="font pl-5"><b>Stores</b></h1>
            <div class="flex">
              <el-row :gutter="1">
                <div class="display-flex justify-end mx-2">
                  <el-button icon="el-icon-refresh" @click="updatestores()"
                    >Update Stores</el-button
                  >
                </div>
              </el-row>
              <el-row :gutter="1">
                <div class="display-flex justify-end mx-2">
                  <el-button icon="el-icon-plus" @click="novaLoja()"
                    >New Store</el-button
                  >
                </div>
              </el-row>
            </div>
          </div>
          <!-- TABLE -->
          <div class="flex">
            <el-table
              empty-text="No Stores Indexed"
              :data="stores"
              v-loading="loading"
            >
              <el-table-column
                min-width="15"
                max-width="15"
                :v-bind="Image"
                prop="Image"
              >
                <template slot-scope="scope">
                  <el-image :src="scope.row.Image"> </el-image>
                </template>
              </el-table-column>

              <el-table-column prop="name">
                <template slot-scope="scope">
                  <h1 class="uppercase justify-start font-bold text-xl">
                    {{ scope.row.name }}
                  </h1>
                </template>
              </el-table-column>
              <el-table-column prop="comando" :v-bind="name">
                <template slot-scope="scope">
                  <div class="flex justify-end">
                    <el-button
                      icon="el-icon-plus"
                      @click="UpdateGames(scope.row.name)"
                      >Update</el-button
                    >
                    <el-button icon="el-icon-edit" @click="EditStore(scope.row)"
                      >Edit</el-button
                    >
                    <el-button
                      icon="el-icon-delete"
                      @click="DeleteStore(scope.row.name)"
                      >Delete</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- Form -->
      <el-dialog
        width="40%"
        height="40%"
        ref="loja"
        title="New Store"
        :visible.sync="dialogo"
        :close-on-click-modal="false"
      >
        <el-form ref="loja" :model="loja" :rules="rules" label-position="top">
          <div class="flex flex-wrap flex-col">
            <el-form-item label="Name" prop="name">
              <el-input v-model="loja.name"></el-input>
            </el-form-item>
            <el-form-item label="Description" prop="describe">
              <el-input v-model="loja.describe"></el-input>
            </el-form-item>
            <el-form-item label="Link" prop="link">
              <el-input v-model="loja.link"></el-input>
            </el-form-item>
            <!-- img 
                <el-form-item label="Image">
                    <input type="file" v-on:change="onChangeFileUpload" />
                </el-form-item>
            -->
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
  </div>
</template>

<script>
import sideBar from "~/layouts/components/sidebar/sidebar.vue";
import navbar from "~/layouts/components/navbar/navbarcompose.vue";

function limpaLoja() {
  return {
    name: "",
    describe: "",
    link: "",
    image: null,
  };
}

export default {
  components: { sideBar, navbar },
  data() {
    return {
      Image: null,
      hover: false,
      dialogo: false,
      methods: "POST",
      link: "getallstore",
      stores: [],
      showDrawer: false,
      loading: false,
      drawer: false,
      urlFiltro: null,
      file: null,
      urlBack: process.env.API_BASE_URL,
      urlFile: process.env.API_FILES,
      loja: limpaLoja(),
      rules: {
        name: [
          {
            required: true,
            message: "Input the store´s name.",
            trigger: "blur",
          },
        ],
        describe: [
          {
            required: true,
            message: "Input the store´s description.",
            trigger: "blur",
          },
        ],
        link: [
          {
            required: true,
            message: "Input the store´s address link.",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.allData();
  },
  methods: {
    async allData() {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const { data, status } = await this.$axios.get("/getallstore", {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });
        if (status === 200) {
          this.stores = data.store;
          console.log(this.stores);
        } else this.stores = [];
      } catch (error) {
        throw error;
      }
    },
    async updatestores() {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const { data, status } = await this.$axios({
          method: "PUT",
          url: "/updategamebanks",
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
            message: "Lojas atualizadas com sucesso",
            type: "success",
          });
        } else {
          this.$message({
            message: "Erro ao atualizar as lojas",
            type: "warning",
          });
        }
      } catch (error) {
        throw error;
      }
    },
    novaLoja() {
      this.dialogo = true;
    },
    EditStore(row) {
      this.loja = row;
      this.dialogo = true;
      this.methods = "PUT";
    },
    statusDrawer(value) {
      this.showDrawer = value;
    },
    onChangeFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submitLoja() {
      this.$refs["loja"].validate(async (valid) => {
        if (valid) {
          this.methods === "POST"
            ? (this.link = "/registerstore")
            : (this.link = "/updatestore");
          if(this.methods === 'PUT') this.loja.newname = this.loja.name
          const token = JSON.parse(localStorage.getItem("token"));

          this.loja.image = "";
          const { data, status } = await this.$axios({
            method: this.methods,
            url: this.link,
            data: this.loja,
            headers: {
              Authorization: `Bearer ${token}`,
              token: token,
            },
          });
          if (status === 200) {
            this.$message({
              message: "Loja cadastrada com sucesso",
              type: "success",
            });
            this.dialogo = false;
            this.file = null;
            this.store = limpaLoja();
            this.allData();
            location.reload();
          } else {
            this.$message({
              message: "Erro ao cadastrar loja",
              type: "warning",
            });
          }
        } else {
          this.$message({
            message: "Algo deu problema.",
            type: "danger",
          });
        }
      });
    },
    async DeleteStore(store) {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const storename = {
          name: store,
        };
        const { data, status } = await this.$axios({
          method: "DELETE",
          url: "/deletestore",
          data: storename,
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });
        if (status === 200) {
          this.$message({
            message: "Loja Deletada com Sucesso",
            type: "success",
          });
          this.allData();
        } else
          this.$message({
            message: "Algo deu problema.",
            type: "danger",
          });

        console.log(data);
      } catch (error) {
        throw error;
      }
    },
    async UpdateGames(store) {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const storename = {
          store: store,
        };
        const { data, status } = await this.$axios({
          method: "PUT",
          url: "/updategamebank",
          data: storename,
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });
        if (status === 200) {
          this.$message({
            message: "Jogos atualizados com sucesso",
            type: "success",
          });
          this.allData();
        } else
          this.$message({
            message: "Algo deu problema.",
            type: "danger",
          });
      } catch (error) {
        throw error;
      }
    },
  },
};
</script>

<style>
.font {
  font-weight: 500;
  font-size: 32px;
}

input,
select {
  padding: 5px 10px;
  border-radius: 5px;
  width: 300px;
}

.new-btn {
  background-color: #c94f32;
  color: #fff;
  font-weight: bold;
  border: 2px solid #c94f32;
  padding: 10px;
  border-radius: 20px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.new-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
