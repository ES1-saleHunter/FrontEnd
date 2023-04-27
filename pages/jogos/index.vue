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
            <h1 class="font"><b>Games</b></h1>
            <el-row :gutter="1">
              <div class="display-flex justify-end">
                <el-button icon="el-icon-plus" class="new-btn" @click="novagame()">New Game</el-button>
              </div>
            </el-row>
          </div>
          <!-- TABLE -->
          <div class="flex">
            <el-table empty-text="No games Indexed" :data="games" v-loading="loading" size="small" style="width: 80%">
              <el-table-column min-width="15" max-width="15" :v-bind="Image" prop="Image">
                <template slot-scope="scope">
                  <img :src="scope.row.Image" />
                </template>
              </el-table-column>
              <el-table-column prop="name" label="Name"> </el-table-column>
              <el-table-column prop="describe" label="Description"> </el-table-column>
              <el-table-column label="Link" prop="link">
                <template slot-scope="scope">
                  <a :href="getLink(scope.row)">{{ scope.row.link }}</a>
                </template>
              </el-table-column>

              <!-- <el-table-column prop="link" label="Link"> </el-table-column> -->

              <el-table-column prop="comands" label="" :v-bind="name">
                <template slot-scope="scope">
                  <el-button class="new-btn" icon="el-icon-plus" @click="addinstore(scope.row.name)">add in store</el-button>
                  <el-button class="new-btn" icon="el-icon-delete" @click="DeleteGame(scope.row.name)">
                  </el-button>
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
            <input type="file" v-on:change="onChangeFileUpload" />
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
            <el-form-item label="Price" prop="price">
              <el-input-number v-model="gamainstore.price" :precision="2" :step="0.1" :max="1000"></el-input-number>
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
    price: 0,
  }
}

export default {

  components: { sideBar, navbar },

  data() {
    return {
      Image: null,
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
          let datagame = [];
          let temp = "";
          data.game.forEach(element => {
            temp = this.urlBack + this.urlFile + element.Image.replace('src', '');
            datagame[element.id - 1] = element
            datagame[element.id - 1].Image = temp
          });

          this.games = datagame;
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
            price: this.gamainstore.price.toString()
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
        if (this.file != null) {
          if (valid) {
            this.methods === 'POST' ?
              this.link = '/registergame' :
              this.link = '/updategame'

            const token = JSON.parse(localStorage.getItem('token'));


            let formData = new FormData();
            formData.append('image', this.file);
            formData.append('name', this.game.name)
            formData.append('describe', this.game.describe)
            formData.append('link', this.game.link)

            const { data, status } = await this.$axios({
              method: this.methods,
              url: this.link,
              data: formData,
              headers: {
                Authorization: `Bearer ${token}`,
                token: token,
                "Content-Type": "multipart/form-data"
              },
            }).catch((error) => {
              return {
                data: [],
                status: error.response.status,
              };
            });
            if (status === 200) {
              this.$message({
                message: "Jogo cadastrado com sucesso",
                type: "success",
              });
              this.dialogo = false;
              const fileInput = document.querySelector("#file")
              fileInput.value = ""
              this.file = null
              this.game = limpaGame()
              this.allData();
              location.reload();
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



            let formData = new FormData();
            formData.append('image', this.file);
            formData.append('name', this.game.name)
            formData.append('describe', this.game.describe)
            formData.append('link', this.game.link)

            const { data, status } = await this.$axios({
              method: this.methods,
              url: this.link,
              data: formData,
              headers: {
                Authorization: `Bearer ${token}`,
                token: token,
                "Content-Type": "multipart/form-data"
              },
            }).catch((error) => {
              return {
                data: [],
                status: error.response.status,
              };
            });
            if (status === 200) {
              const fileInput = document.querySelector("#file")
              fileInput.value = ""
              this.file = null
              this.game = limpaGame()
              this.allData();
              
              this.$message({
                message: "Jogo cadastrado com sucesso",
                type: "success",
              });
              this.dialogo = false;
              location.reload();
              
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

        } else {
          this.$message({
            message: "Selecione uma imagem.",
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
