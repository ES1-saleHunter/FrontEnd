<template>

  <div>
    <div v-if="games== null">
      <error :error={statusCode:404} />
    </div>
    <div v-else>
    <sideBar />
    <navbar />
      <div class="w-full flex flex-col justify-center items-center mt-8">
        <div class="flex w-8/12 h-2/6 min-h-max max-h-full mb-0">
          <img style="height: 80%;" class="m-3" :src="games.Image">
          <div class=" ">
            <h1 class="font font-bold uppercase">{{ games.name }}</h1>
            <p class="fontp font-bold text-lg   ">{{ games.describe }}</p>
            <div class="flex justify-start mt-3">
              <el-button  icon="el-icon-s-order" @click="favoritegame(games.name)">Whitlist it</el-button>
              <el-button  v-if="this.like == false" icon="el-icon-star-off" @click="likegame(games.id)">{{games.likes}} like it</el-button>
              <el-button  v-else icon="el-icon-star-on" @click="deslikegame(games.id)">{{games.likes}} dislike it</el-button>

            </div>
          </div>
        </div>
        <div class="flex w-8/12 h-2/6 min-h-max max-h-full">
              <el-table cell-mouse-enter="false" show-header="false" strip="true" style="width: 100%" :data="stores" v-loading="loading">
                  <el-table-column  min-width="15" max-width="15" :v-bind="Image" prop="Image" >
                      <template slot-scope="scope">
                            <el-image :src="scope.row.Image">
                            </el-image>
                      </template >
                  </el-table-column> 
                             
              <el-table-column  prop="name" > 
                <template slot-scope="scope">
                  
                  <a :href=scope.row.gamestore.link target="_blank" class="uppercase justify-start  font-bold text-xl">
                      {{ scope.row.name }}          
                  </a>
                </template >
              </el-table-column>
              <el-table-column  prop="comando"  :v-bind="name"> 
              <template  slot-scope="scope">
                  <pricedesc :price=scope.row></pricedesc>
              </template>
            </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
  </div>
</template>
  
<script>
import sideBar from '~/layouts/components/sidebar/sidebar.vue';
import navbar from '~/layouts/components/navbar/navbarcompose.vue';
import error from "~/layouts/error.vue";
import pricedesc from '~/layouts/components/preco/pricedesc.vue'
const erro = { statusCode: "404", message: { title: "errr" } } 
function limpaGame() {
  return {
    name: '',
    describe: '',
    link: '',
    image: null
  }
}

function gameinstore() {
  return {
    store: '',
    game: '',
    link: '',
    originalprice: 0,
    discountprice: 0,
    discountpercentage: 0
  }
}

export default {

  components: { sideBar, navbar, error, pricedesc},

  data() {
    return {
      Image: null,
      like: false,
      hover: false,
      dialogo: false,
      dialogostore: false,
      gameinstorename: "",
      methods: "POST",
      link: "getallgame",
      games: null,
      stores: null,
      showDrawer: false,
      loading: false,
      drawer: false,
      urlFiltro: null,
      file: null,
      urlBack: process.env.API_BASE_URL,
      urlFile: process.env.API_FILES,
      game: limpaGame(),
      gamainstore: gameinstore(),
      iconButtons: [
        { icon: "fa-smile" },
        { icon: "fa-sad-tear" }
      ]
    }
  },
  mounted() {
    this.allData();
    this.getgamelike();
  },
  methods: {
    async allData() {
      
      this.getgame();
      this.getgameStores();
    },
    async getgame() {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const { data, status } = await this.$axios({
          method: "POST",
          url: "/getgamestore",
          data: {
            name: this.$route.params.name
          },
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        })
        if (status === 200) {
          this.games = data.game
          this.stores = data.game.stores
          console.log(this.games)
          this.getgamelike(this.games.id)

        }
        else
          this.games = null

      } catch (error) {
        throw error;
      }
    
    },
    async getgamelike(idgame) {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const { data, status } = await this.$axios({
          method: "GET",
          url: "getusergameslike",
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        })
        if (status === 200) {
          console.log("AAAAAAAAAAAAAAAAAAAAAA")
          
          if(data.user.games.findIndex(x => x.id === idgame) < 0){
            this.like = false;
          }else{
            this.like = true;
          }
  
        }
        else
          this.games = null

        
      } catch (error) {
        throw error;
      }
    
    },
    statusDrawer(value) {
      this.showDrawer = value;
    },
    onChangeFileUpload(event) {
      this.file = event.target.files[0];
    },
    async favoritegame(game) {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const { data, status } = await this.$axios({
          method: "POST",
          url: "relationgametouser",
          data: {game:game},
          headers: {
          Authorization: `Bearer ${token}`,
           token: token
         },
         })
        if (status === 200) {
          this.$message({
              message: "Jogo adicionado aos favoritos com sucesso",
              type: "success",
          });

        }
        else{
          this.$message({
            message: "ocorreu um erro, tente novamente",
            type: "warning",
          });
        }
        } catch (error) {
        throw error;
      }
    
  },
  async likegame(game) {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const { data, status } = await this.$axios({
          method: "POST",
          url: "relationgametouserlike",
          data: {idgame:game},
          headers: {
          Authorization: `Bearer ${token}`,
           token: token
         },
         })
        if (status === 200) {
          this.$message({
              message: "like adicionado com sucesso",
              type: "success",
          });
          this.like = true;
          this.allData()

        }
        else{
          this.$message({
            message: "ocorreu um erro, tente novamente",
            type: "warning",
          });
        }
        } catch (error) {
        throw error;
      }
    
  },
  async deslikegame(game) {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const { data, status } = await this.$axios({
          method: "POST",
          url: "removerelationgametouserlike",
          data: {idgame:game},
          headers: {
          Authorization: `Bearer ${token}`,
           token: token
         },
         })
        if (status === 200) {
          this.$message({
              message: "like removido com sucesso",
              type: "success",
          });
          this.like = false;
          this.allData()
        }
        else{
          this.$message({
            message: "ocorreu um erro, tente novamente",
            type: "warning",
          });
        }
        } catch (error) {
        throw error;
      }
    
  }
},
  
};
</script>
  
<style>
.font {
  font-weight: 500;
  font-size: 32px;
  font-weight: bold;
  color: rgb(11, 11, 11);
}

.fontp {
  font-weight: 500;
  font-size: 13px;
  color: rgb(29, 29, 29);
}




input,
select {
  padding: 5px 10px;
  border-radius: 5px;
  width: 300px;
}



.new-btn:hover {
  background-color: transparent;
  color: #222;
}

.fundo {
  background-color: #222;
}

.imageComp{
  padding: 0.5%;
  background-color: #222;
}
.el-table .bg  {
    background: #222;
  }
.el-table .cell-mouse-enter {
  background: #222;
  }

</style>
