<template>
  <div class="w-full flex justify-center">
    <!-- Table -->
    <div class="w-3/4">
      <!-- HEADER -->
      <div class="">
        <div class="flex justify-between items-center py-4">
          <h1 class="font"><b>games</b></h1>
          <el-row :gutter="1">
            <div class="display-flex justify-end">
              <el-button icon="el-icon-plus" class="button-style" @click="novagame()">New game</el-button>
            </div>
          </el-row>
        </div>
        <!-- TABLE -->
        <div class="flex">
          <el-table empty-text="No games Indexed" :data="games" v-loading="loading" size="small" style="width: 80%">
            <el-table-column min-width="15" max-width="15" :v-bind="Image" prop="Image" label="Image" >
              <template slot-scope="scope">
                <img :src="scope.row.Image"/>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="Name"> </el-table-column>
            <el-table-column prop="describe" label="Description"> </el-table-column>
            <el-table-column prop="link" label="Link"> </el-table-column>
            <el-table-column prop="name" label="Name" :v-bind="name"> 
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="DeleteGame(scope.row.name)">
                  Apagar
                </el-button>
              </template>
            </el-table-column>
            </el-table>
        </div>
      </div>
    </div>
    <!-- Form -->
    <el-dialog width="40%" height="40%" ref="game" title="New game" :visible.sync="dialogo"
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
          <input type="file" id="file" v-on:change="onChangeFileUpload" />
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
  </div>
</template>
  
<script>
import { Fire } from '@icon-park/vue/es/map';
import ImageLoad from '../components/image.vue'

function limpaGame() {
  return {
    name: '',
    describe: '',
    link: '',
    image: null
  }
}

export default {
  data() {
    return {
      hover: false,
      dialogo: false,
      methods: "POST",
      link: "getallgame",
      games: [],
      showDrawer: false,
      loading: false,
      drawer: false,
      urlFiltro: null,
      file: null,
      urlBack: process.env.API_BASE_URL,
      urlFile: process.env.API_FILES,
      game: limpaGame(),
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
        {icon: "fa-smile"},
        {icon: "fa-sad-tear"}
      ]
    }
  },
  mounted() {
    this.allData();
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
        if (status === 200){
          let datagame = [];
          let temp ="";
          data.game.forEach(element => {
            temp = this.urlBack + this.urlFile + element.Image.replace('src', '');
            datagame[element.id - 1]= element
            datagame[element.id - 1].Image = temp
          });
          console.log(datagame);
          this.games = datagame;
       
        }
        else
          this.games = []

        } catch (error) {
        throw error;
      }
    },
    novagame() {
      this.dialogo = true;
    },
    statusDrawer(value) {
      this.showDrawer = value;
    },
    statusDialogoDepartamento(value) {
      this.dialogo = value;
    },
    onChangeFileUpload(event) {
      console.log('event', event.target.files[0]);
      this.file = event.target.files[0];
    },

    async submitGame() {
      this.$refs["game"].validate(async (valid) => {
        if (valid) {
          this.methods === 'POST'
            ? this.link = '/registergame'
            : this.link = '/updategame'

          const token = JSON.parse(localStorage.getItem('token'));

          let formData = new FormData();
          formData.append('image', this.file);
          formData.append('name', this.game.name)
          formData.append('describe', this.game.describe)
          formData.append('link', this.game.link)
          console.log('form', formData);
          
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
          console.log('data', data);
          this.$message({
            message: "Jogo cadastrado com sucesso",
            type: "success",
          });
          this.dialogo = false;
          const fileInput = document.querySelector("#file")
          fileInput.value = ""
          this.allData();
        } else {
          this.$message({
            message: "Algo deu problema.",
            type: "danger",
          });
        }
      }
      )
    },
    async DeleteGame(game){
        

      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const gamename ={
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
        if (status === 200){
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
.button-style {
  border-color: #ec8b0d;
  background-color: #ec8b0d;
  color: #ffffff;
}

.font {
  font-weight: 500;
  font-size: 32px;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

input,
select {
  padding: 5px 10px;
  border-radius: 5px;
  width: 300px;
}

#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#opcionais-title {
  width: 100%;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
</style>