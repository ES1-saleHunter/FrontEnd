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
            <el-row :gutter="1">
            </el-row>
          </div>
          <!-- TABLE -->
          <div class="flex">
            <!-- <el-table empty-text="No Stores or Games" :data="games" v-loading="loading" size="small" style="width: 80%">
                <el-table-column min-width="15" max-width="15" :v-bind="Image" prop="Image">
                  <template slot-scope="scope">
                    <img :src="scope.row.Image" />
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="Name"> </el-table-column>
                <el-table-column prop="describe" label="Description"> </el-table-column>
                <el-table-column prop="link" label="Link"> </el-table-column>
                <el-table-column prop="comands" label="" :v-bind="name">
                  <template slot-scope="scope">
                    <el-button class="new-btn" icon="el-icon-plus" @click="addinstore(scope.row.name)">add in store</el-button>
                    <el-button class="new-btn" icon="el-icon-delete" @click="DeleteGame(scope.row.name)">
                    </el-button>
                  </template>
                </el-table-column>
              </el-table> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import sideBar from '~/layouts/components/sidebar/sidebar.vue';
import navbar from '~/layouts/components/navbar/navbarcompose.vue'

export default {
  components: { sideBar, navbar },
  data() {
    return {
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
  