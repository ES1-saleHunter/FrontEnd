<template>
  <div>
    <sideBar />
    <navbar />
    <div class="w-full flex justify-center ">
      <!-- Table -->
      <div class="w-3/5 shadow-2xl mt-3">
        <!-- HEADER -->
        <div class="">
          <div class="flex justify-between items-center py-4">
            <h1 class="font pl-5 "><b>{{username}}'s favorite games</b></h1>
            
          </div>
               <!-- TABLE -->
               <div class="flex">
             <el-table empty-text="No Stores or Games"  :data="gameswithstore"   v-loading="loading" style="width: 80%">
                 <el-table-column min-width="40" max-width="40" :v-bind="Image" prop="Image">
                  <template slot-scope="scope">
                    <img :src="scope.row.Image" />
                  </template>
                </el-table-column>
                
                <el-table-column prop="name" >
                  <template slot-scope="scope" > 
                  <a :href="linkgame + scope.row.name" class="uppercase text-start font-bold text-base	"> {{ scope.row.name }} </a>
                 </template>
                </el-table-column>
                <el-table-column  prop="name" > 
                  <template slot-scope="scope" > 
                    <div class="flex flex-col">
                      <pricedesc :price=scope.row.stores[0]></pricedesc>
                    </div>
                  </template>
                 
                </el-table-column>
                <el-table-column :min-width="30" prop="comands" label="" :v-bind="name">
                  <template slot-scope="scope">
                    <el-button type="text" class="flex justify-start mx-10" style="color: darkgray;" @click="removegame(scope.row.name)">(Remove)
                      </el-button>
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

export default {
  components: { sideBar, navbar, pricedesc },
  data() {
    return {
      games: [],
      username: null,
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
            message: 'Input the game´s name.',
            trigger: 'blur',
          },
        ],
        describe: [
          {
            required: true,
            message: 'Input the game´s description.',
            trigger: 'blur',
          },
        ],
        image: [
          {
            required: true,
            message: 'Select the game´s image.',
            trigger: 'blur',
          },
        ]
      },
      iconButtons: [
        { icon: "fa-smile" },
        { icon: "fa-sad-tear" }
      ]
    }
  },
  mounted() {
    this.allData()
  },
  methods: {
    async allData() {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const { data, status } = await this.$axios.get('/getusergames', {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token
          },
        });
        if (status === 200) {
          this.games = data.games;
          console.log(data)
          
          this.games.forEach(async (game)=>{
            await this.getStores(game.name)
          })
       
          this.username = data.user.name;
        }
        else
          this.games = []
      } catch (error) {
        throw error;
      }
    },
    async getStores(name) {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const { data, status } = await this.$axios({
          method: "POST",
          url: "getgamestore",
          data: {name:name},
          headers: {
          Authorization: `Bearer ${token}`,
           token: token
         },
         })
        if (status === 200) {
        
          this.gameswithstore.push(data.game)
        }
        else
          console.log(data)
      } catch (error) {
        throw error;
      }
    },
    async removegame(game) {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const { data, status } = await this.$axios({
          method: "POST",
          url: "removerelationgametouser",
          data: {game:game},
          headers: {
          Authorization: `Bearer ${token}`,
           token: token
         },
         })
        if (status === 200) {
          
          this.$message({
              message: "Jogo removido com sucesso",
              type: "success",
          });
          this.allData(),
          location.reload()
        }
        else{
          this.$message({
            message: "ocorreu um erro, tente novamente",
            type: "warning",
          });
        }
        } catch (error) {
        throw error;
      }}
  }
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
  background-color: #C94F32;
  color: #FFF;
  font-weight: bold;
  border: 2px solid #C94F32;
  padding: 10px;
  border-radius: 20px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: .5s;
}

.new-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
