<template>
  <div>
    <sideBar />
    <navbar />
    <div class="w-full flex justify-center ">
      <!-- Table -->

      <div class="w-3/5 shadow-2xl mt-3">
        <!-- HEADER -->
        <div class="">
          <div class="flex justify-between items-center pt-4 " >
            <h1 class="font pl-5"><b>Games</b></h1>
            <el-row :gutter="1">
              <div class="display-flex justify-end">
                <el-button icon="el-icon-plus" @click="novagame()">New Game</el-button>
              </div>
            </el-row>
          </div>
          <!-- TABLE -->
          <div class="flex">
            <el-table empty-text="No games Indexed"  :data="games" v-loading="loading" >
              
              <el-table-column min-width="50" max-width="50" :v-bind="Image" prop="Image">
                <template slot-scope="scope">
                  <img :src="scope.row.Image" />
                </template>
              </el-table-column>
              <el-table-column   >
                <template slot-scope="scope" >
                  <a :href="linkgame + scope.row.name" class="uppercase justify-start font-bold text-xl"> {{ scope.row.name }} </a>
                  <p class="text-base/6 mb-4"> {{ scope.row.describe }} </p>
                  <div class="flex justify-end">
                    <el-button  icon="el-icon-plus" @click="addinstore(scope.row.name)">add in store</el-button>

                    <el-button  icon="el-icon-edit" @click="EditGame(scope.row)">Edit</el-button>
                    <el-button  icon="el-icon-delete" @click="DeleteGame(scope.row.name)">Delete</el-button>
                  </div>
                </template>

              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- Form -->
      <el-dialog width="40%" height="40%" ref="game" title="New Game" :visible.sync="dialogo"

      :close-on-click-modal="false">

        <el-form ref="game" :model="game" :rules="rules" label-position="top">
          <div class="flex flex-wrap flex-col">
            <el-form-item label="Name" prop="name">
              <el-input v-model="game.name"></el-input>
            </el-form-item>
            <el-form-item label="Description" prop="describe">
              <el-input v-model="game.describe"></el-input>
            </el-form-item>
            <el-form-item label="Link" prop="link">
              <el-input v-model="game.link"></el-input>
            </el-form-item>
            <!-- Form
            <input type="file" v-on:change="onChangeFileUpload" />
            -->
          </div>
          <div class="flex justify-end">
            <el-button type="danger" size="small" @click="dialogo = false">
              Cancelar
            </el-button>
            <el-button type="success" @click="submitGame()" size="small ">
              Salvar
            </el-button>
          </div>
        </el-form>

      </el-dialog>


      <!-- Form relationships -->
      <el-dialog width="40%" height="40%" ref="gamainstore" title="add in stores" :visible.sync="dialogostore"
        :close-on-click-modal="false">
        <el-form ref="gamainstore" :model="gamainstore" label-position="top">
          <div class="flex flex-wrap flex-col">
            <el-form-item label="Store" prop="store">
              <el-select v-model="gamainstore.store" placeholder="Select">
                <el-option v-for="item in stores" :key="item.name" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="originalprice" prop="price">
              <el-input-number v-model="gamainstore.originalprice" :precision="2" :step="0.1" :max="1000"></el-input-number>
            </el-form-item>
            <el-form-item label="discountprice" prop="price">
              <el-input-number v-model="gamainstore.discountprice" :precision="2" :step="0.1" :max="1000"></el-input-number>
            </el-form-item>
            <el-form-item label="discountpercentage" prop="price">
              <el-input-number v-model="gamainstore.discountpercentage" :precision="2" :step="0.1" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="Link" prop="link">
              <el-input v-model="gamainstore.link"></el-input>
            </el-form-item>
          </div>
          <div class="flex justify-end">
            <el-button type="danger" size="small" @click="dialogostore = false">
              Cancelar
            </el-button>
            <el-button type="success" @click="submitships()" size="small ">
              Salvar
            </el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
  
<script>
import sideBar from '~/layouts/components/sidebar/sidebar.vue';
import navbar from '~/layouts/components/navbar/navbarcompose.vue'


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

  components: { sideBar, navbar },

  data() {
    return {
      Image: null,
      linkgame: "/jogos/",
      hover: false,
      dialogo: false,
      dialogostore: false,
      gameinstorename: "",
      methods: "POST",
      link: "getallgame",
      games: [],
      stores: [],
      showDrawer: false,
      loading: false,
      drawer: false,
      urlFiltro: null,
      file: null,
      urlBack: process.env.API_BASE_URL,
      urlFile: process.env.API_FILES,
      game: limpaGame(),
      gamainstore: gameinstore(),
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
        link: [
          {
            required: true,
            message: 'Input the game´s address link.',
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
    this.allData();
    this.getStores();
  },
  methods: {
    async allData() {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const { data, status } = await this.$axios.get('/getallgame', {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token
          },
        });
        if (status === 200) {
          this.games = data.game;

        }
        else
          this.games = []

      } catch (error) {
        throw error;
      }
    },
    async getStores() {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const { data, status } = await this.$axios.get('getallstore', {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token
          },
        });
        if (status === 200) {
          this.stores = data.store;
        }
        else
          this.stores = []
      } catch (error) {
        throw error;
      }
    },
    getLink(row) {
      return row.link;
    },
    novagame() {
      this.dialogo = true;
    },
    addinstore(game) {
      this.gameinstorename = game;
      this.dialogostore = true;
    },
    statusDrawer(value) {
      this.showDrawer = value;
    },
    onChangeFileUpload(event) {
      this.file = event.target.files[0];
    },
    EditGame(row) {
      this.methods = 'PUT'
      this.dialogo = true;
      this.game = row;
      this.game.likes = 0
    },

    async submitships() {
      try {
        const token = JSON.parse(localStorage.getItem('token'));

        this.gamainstore.game = this.gameinstorename;

        const { data, status } = await this.$axios({
          method: "POST",
          url: "/relationgametostores",
          data: {
            store: this.gamainstore.store,
            game: this.gamainstore.game,
            link: this.gamainstore.link,
            originalprice: this.gamainstore.originalprice.toString(),
            discountprice: this.gamainstore.discountprice.toString(),
            discountpercentage: this.gamainstore.discountpercentage.toString()
          },
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
        this.$message({
          message: `${this.gamainstore.game} adicionado na loja ${this.gamainstore.store} com sucesso`,
          type: "success",
        });
        this.dialogostore = false;

      } catch
      {
        this.$message({
          message: "Algo deu problema.",
          type: "danger",
        });
      }
    },

    async submitGame() {
      this.$refs["game"].validate(async (valid) => {
          if (valid) {
            this.methods === 'POST' ?
              this.link = '/registergame' :
              this.link = '/updategame'

            if (this.methods === 'PUT') this.game.newname = this.game.name
            const token = JSON.parse(localStorage.getItem('token'));
            this.game.image = "";
            const { data, status } = await this.$axios({
              method: this.methods,
              url: this.link,
              data: this.game,
              headers: {
                Authorization: `Bearer ${token}`,
                token: token
              },
            }).catch((error) => {
              return {
                data: [],
                status: error.response.status,
              }
            });
            if (status === 200) {
              this.methods === 'POST'
              ?
              this.$message({
                message: "Jogo cadastrado com sucesso",
                type: "success",
              })
              
              : this.$message({
                message: "Jogo atualizado com sucesso",
                type: "success",
              });
 
            
              this.dialogo = false
              this.file = null
              this.game = limpaLoja()
              location.reload()
              
            } else {
              this.$message({
                message: "Erro ao cadastrar Jogo",
                type: "warning",
              });
            }
          } else {
            this.$message({
              message: "Algo deu problema.",
              type: "danger",
            });
          }


      })
    },
    async DeleteGame(game) {


      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const gamename = {
          name: game
        }
        const { data, status } = await this.$axios({
          method: "DELETE",
          url: "/deletegame",
          data: gamename,
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        })
        if (status === 200) {
          this.$message({
            message: "Jogo Deletado com Sucesso",
            type: "success",
          });
          this.allData();
        }
        else
          this.$message({
            message: "Algo deu problema.",
            type: "danger",
          });


        console.log(data);

      } catch (error) {
        throw error;
      }
    }
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



.new-btn:hover {
  background-color: transparent;
  color: #222;
}


  .el-table .success-row {
    background: #4e8232;
  }

</style>
