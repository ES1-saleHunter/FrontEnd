<template>
  <div class="w-full flex justify-center">
    <!-- Table -->
    <div class="w-3/4">
      <!-- HEADER -->
      <div class="">
        <div class="flex justify-between items-center py-4">
          <h1 class="font"><b>Stores</b></h1>
          <el-row :gutter="1">
            <div class="display-flex justify-end">
              <el-button icon="el-icon-plus" class="button-style" @click="novaLoja()">New Store</el-button>
            </div>
          </el-row>
        </div>
        <!-- TABLE -->
        <div class="flex">
          <el-table empty-text="No Stores Indexed" :data="tableData" v-loading="loading" size="small" style="width: 80%">
            <el-table-column prop="Image" label="Image"></el-table-column>
            <!-- <template slot-scope="scope">
              <img :src="scope.row.Image" width="100" height="100">
            </template> -->
            <el-table-column prop="name" label="Name"> </el-table-column>
            <el-table-column prop="describe" label="Description"> </el-table-column>
            <el-table-column prop="link" label="Link"> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- Form -->
    <el-dialog width="600px" height="50%" ref="loja" title="New Store" :visible.sync="dialogo"
      :close-on-click-modal="false">
    </el-dialog>
  </div>
</template>
  
<script>
export default {
  components: {},
  data() {
    return {
      dialogo: false,
      methods: "post",
      link: "getallstore",
      data: [],
      showDrawer: false,
      loading: false,
      tableData: [],
      drawer: false,
      urlFiltro: null,
    };
  },
  mounted() {
    this.allData();
  },
  methods: {
    async allData() {
      this.loading = true;
      const { data, status } = await this.$axios
        .get(
          `/getallstore`
        )
        .catch((error) => {
          return {
            data: [],
            status: error.response.status,
          };
        });
      this.loading = false;
      if (status === 200) {
        //   this.tableData = data.data;
      }
    },
    novaLoja() {
      this.dialogo = true;
    },
    statusDrawer(value) {
      this.showDrawer = value;
    },
    statusDialogoDepartamento(value) {
      this.dialogo = value;
    },
    async submitLoja(dados) {
      const { data, status } = await this.$axios({
        method: this.methods,
        url: this.link,
        data: dados,
      }).catch((error) => {
        return {
          data: [],
          status: error.response.status,
        };
      });
      if (status === 200) {
        this.dialogo = false;
        this.$message({
          message: "Dados salvos.",
          type: "success",
        });
        location.reload();
      } else {
        this.$message({
          message: "Algo deu problema.",
          type: "danger",
        });
      }
    },
  },
};
</script>
  
<style>
.button-style {
  border-color: #ec8b0d;
  background-color: #ec8b0d;
  color: #ffffff;
}

.font {
  font-weight: 500;
  font-size: 32px;
}
</style>