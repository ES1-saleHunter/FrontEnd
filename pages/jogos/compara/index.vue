<template>
  <div>
    <sideBar />
    <navbar />
    <div class="w-full flex justify-center">
      <!-- Table -->
      <div class="w-3/4">
        <!-- HEADER -->
        <div class="">
          <div class="flex justify-between items-center py-4">
            <h1 class="font"><b>Compare Prices</b></h1>
            <el-row :gutter="1"> </el-row>
          </div>
          <!-- TABLE -->
          <div class="flex">
            <el-table
              empty-text="No Stores or Games"
              :data="gameswithstore"
              v-loading="loading"
              size="small"
              style="width: 80%"
            >
              <el-table-column
                :min-width="12"
                prop="comands"
                label=""
                :v-bind="name"
              >
                <template slot-scope="scope">
                  <el-button
                    class="new-btn"
                    icon="el-icon-star-on"
                    @click="favoritegame(scope.row.name)"
                  >
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                max-width="40"
                :v-bind="Image"
                prop="Image"
              >
                <template slot-scope="scope">
                  <img :src="scope.row.Image" />
                </template>
              </el-table-column>

              <el-table-column prop="name" label="Game"></el-table-column>
              <el-table-column prop="name" label="Stores">
                <template slot-scope="scope">
                  <template v-for="item in scope.row.stores">
                    <el-link :href="`${item.gamestore.link}`"
                      > | {{item.name}}</el-link
                    >
                    - R${{ item.gamestore.discountprice }}</template
                  >
                </template>
              </el-table-column>
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
  components: { sideBar, navbar },
  data() {
    return {
      games: [],
      gameswithstore: [],
      showDrawer: false,
      loading: false,
      drawer: false,
      urlFiltro: null,
      file: null,
      urlBack: process.env.API_BASE_URL,
      urlFile: process.env.API_FILES,
      rules: {
        name: [
          {
            required: true,
            message: "Input the game´s name.",
            trigger: "blur",
          },
        ],
        describe: [
          {
            required: true,
            message: "Input the game´s description.",
            trigger: "blur",
          },
        ],
        link: [
          {
            required: true,
            message: "Input the game´s address link.",
            trigger: "blur",
          },
        ],
        image: [
          {
            required: true,
            message: "Select the game´s image.",
            trigger: "blur",
          },
        ],
      },
      iconButtons: [{ icon: "fa-smile" }, { icon: "fa-sad-tear" }],
    };
  },
  mounted() {
    this.allData();
  },
  methods: {
    async allData() {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const { data, status } = await this.$axios.get("/getallgame", {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });
        if (status === 200) {
          this.games = data.game;
          this.games.forEach(async (game) => {
            await this.getStores(game.name);
          });
        } else this.games = [];
      } catch (error) {
        throw error;
      }
    },
    async getStores(name) {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const { data, status } = await this.$axios({
          method: "POST",
          url: "getgamestore",
          data: { name: name },
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });
        if (status === 200) {
          console.log(data.game);
          this.gameswithstore.push(data.game);
        } else console.log(data);
      } catch (error) {
        throw error;
      }
    },
    async favoritegame(game) {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const { data, status } = await this.$axios({
          method: "POST",
          url: "relationgametouser",
          data: { game: game },
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });
        if (status === 200) {
          this.$message({
            message: "Jogo adicionado aos favoritos com sucesso",
            type: "success",
          });
        } else {
          this.$message({
            message: "ocorreu um erro, tente novamente",
            type: "warning",
          });
        }
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
  margin-right: -300px;
  cursor: pointer;
  transition: 0.5s;
}

.new-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
