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
            <el-table-column prop="name" label="Name"> </el-table-column>
            <el-table-column prop="describe" label="Description"> </el-table-column>
            <el-table-column prop="link" label="Link"> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- Form -->
    <el-dialog width="40%" height="40%" ref="loja" title="New Store" :visible.sync="dialogo"
      :close-on-click-modal="false">
      <el-form ref="loja" :model="loja" :rules="rules" label-position="top">
        <div class="flex flex-wrap flex-col">
          <el-form-item label="Name" prop="name">
            <el-input v-model="loja.name"></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="describe">
            <el-input v-model="loja.describe"></el-input>
          </el-form-item>
          <el-form-item label="Link" prop="link">
            <el-input v-model="loja.link"></el-input>
          </el-form-item>
          <el-form-item prop="image">
            <ImageLoad :validate-on-rule-change="true" class="w-48" v-model="loja.image" :if-capture="true"
              :image="loja.image" />
          </el-form-item>
        </div>
        <div class="flex justify-end">
          <el-button type="danger" size="small" @click="dialogo = false">
            Cancelar
          </el-button>
          <el-button type="success" @click="submitLoja()" size="small ">
            Salvar
          </el-button>
        </div>
      </el-form>

    </el-dialog>
  </div>
</template>
  
<script>
import ImageLoad from '../components/image.vue'

function limpaLoja() {
  return {
    name: '',
    describe: '',
    link: '',
    image: null
  }
}

export default {
  components: { ImageLoad },
  data() {
    return {
      hover: false,
      dialogo: false,
      methods: "POST",
      link: "getallstore",
      data: [],
      showDrawer: false,
      loading: false,
      tableData: [],
      drawer: false,
      urlFiltro: null,
      loja: limpaLoja(),
      rules: {
        name: [
          {
            required: true,
            message: 'Input the store´s name.',
            trigger: 'blur',
          },
        ],
        describe: [
          {
            required: true,
            message: 'Input the store´s description.',
            trigger: 'blur',
          },
        ],
        link: [
          {
            required: true,
            message: 'Input the store´s address link.',
            trigger: 'blur',
          },
        ],
        image: [
          {
            required: true,
            message: 'Select the store´s image.',
            trigger: 'blur',
          },
        ]
      }
    }
  },
  mounted() {
    this.allData();
  },
  methods: {
    async allData() {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const { data, status } = await this.$axios.get('/getallstore', {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token
          },
        });
        return { data, status };
      } catch (error) {
        throw error;
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
    async submitLoja() {
      this.$refs["loja"].validate(async (valid) => {
        if (valid) {
          this.methods === 'POST'
            ? this.link = '/registerstore'
            : this.link = '/updatestore'

          const token = JSON.parse(localStorage.getItem('token'));
          const formData = new FormData();
          formData.append("file", this.loja.image);

          console.log(this.link);
          const { data, status } = await this.$axios({
            method: this.methods,
            url: this.link,
            body: this.loja,
            formData: formData,
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
        } else {
          this.$message({
            message: "Algo deu problema.",
            type: "danger",
          });
        }
      }
      )
    },
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