<template>
  <div class="">
    <sideBar />
    <navbar />


    <div class="w-full flex justify-center">
      <!-- Table -->
      <div class="w-3/5">
        <!-- HEADER -->
        <div style="width: auto; height: auto;" class="my-8 shadow-2xl	">
          <el-carousel trigger="click" height="13em" >
            <el-carousel-item v-for="item in games2">
              <div class="flex flex-row justify-center	content-center items-center self-center pt-1 " >
                  <el-image :src="item[0].Image" style="width: 50%">
                    <div slot="placeholder" class="image-slot">
                      Loading<span class="dot">...</span>
                    </div>
                  </el-image>
             
                  <el-image :src="item[1].Image" style="width: 50%">
                    <div slot="placeholder" class="image-slot">
                      Loading<span class="dot">...</span>
                    </div>
                  </el-image>
              
              </div>
            </el-carousel-item>
          </el-carousel>

        </div>
            <!-- Filtros -->


        <div class="shadow-2xl" >
          <div class="flex align-center justify-center pt-6">
        <!-- <Filters @aplicaFiltro="aplicaFiltro(value)" /> -->
        <el-row :gutter="8">
          <el-col :span="10">
            <el-select
              v-model="filtro"
              prop="filtro"
              placeholder="Select the filter"
            >
              <el-option value="name" label="Name"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="10">
            <el-input v-model="valor" prop="valor"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button icon="el-icon-search" @click="aplicaFiltro()"
              >Search</el-button
            >
          </el-col>
        </el-row>
      </div>
          <div class="flex justify-between items-center py-4 pl-3 ">
            <h1 class="font"><b>Compare Prices</b></h1>
            <el-row :gutter="1"> </el-row>
          </div>
          <!-- TABLE -->

          <div class="flex ">
             <el-table empty-text="No Stores or Games"  :data="gameswithstore" v-loading="loading" size="small" style="width: 80%">
           
              <el-table-column min-width="50" max-width="50" :v-bind="Image" prop="Image">
                <template slot-scope="scope">
                  <img :src="scope.row.Image" />
                </template>
              </el-table-column>

          
                <el-table-column prop="name" >
                  <template slot-scope="scope" >
                  <a :href="linkgame + scope.row.name"  class="uppercase justify-start font-bold text-xl"> {{ scope.row.name }} </a>
                </template>
                </el-table-column>
                <el-table-column  prop="name" > 
                  <template slot-scope="scope" > 
                    <div class="flex flex-col">
                      <pricedesc :price=scope.row.stores[0]></pricedesc>
                    </div>
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

import sideBar from '~/layouts/components/sidebar/sidebar.vue';
import navbar from '~/layouts/components/navbar/navbarcompose.vue'
import pricedesc from '~/layouts/components/preco/pricedesc.vue'
import Filters from "../../components/filtros/filtrosJogos.vue";

export default {
  components: { sideBar, navbar, pricedesc, Filters},
  data() {
    return {
      valor: null,
      filtro: null,
      options: [{ value: "name", label: "Name" }],
      games: [],
      games2:[],
      linkgame: "/jogos/",
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

  async mounted() {
    await this.allData();
    this.gamescarousel()
  },
  methods: {
    async gamescarousel(){
      let games = []
      let indexaux = 0;
      for (let index = 25; index < 34; index++) {
        indexaux = indexaux + 1;
        games.push(this.games[index])
        if(indexaux == 3){
          this.games2.push(games)
          games = []
          indexaux = 0
        }
           
      }
    },
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

          this.games.forEach(async (game)=>{
            let teste = await this.getStores(game.name)
            console.log(teste)
          })
        }
        else
          this.games = []
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
          this.gameswithstore.push(data.game)
        }
        else
          console.log(data)
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
    async aplicaFiltro() {
      const token = JSON.parse(localStorage.getItem("token"));
      const filtro = this.filtro;
      const valor = this.valor;
      console.log("filtergame?" + `${filtro}` + "=" + `${valor}`);
      try {
        const { data, status } = await this.$axios({
          method: "GET",
          url: "filtergame?" + `${filtro}` + "=" + `${valor}`,
          data: { name: name },
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });
        if (status === 200) {
          this.gameswithstore = data.games;
        }
      } catch (error) {
        throw error;
      }
    },
  },
};
</script>

<style scoped>
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
