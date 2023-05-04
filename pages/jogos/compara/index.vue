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
        console.log('data', data);
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
          console.log(this.stores);
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
  