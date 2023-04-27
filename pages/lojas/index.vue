<template>
    <div>
        <sideBar />
        <navbar/>
        <div class="w-full flex justify-center">
            <div class="w-3/4">
                <div>
                    <div class="flex justify-between items-center py-4">
                        <h1 class="font"><b>Stores</b></h1>
                        <el-row :gutter="1">
                            <div class="display-flex justify-end">
                                <el-button icon="el-icon-plus" class="new-btn" @click="novaLoja()">New Store</el-button>
                            </div>
                        </el-row>
                    </div>
                    <!-- TABLE -->
                    <div class="flex">
                        <el-table empty-text="No Stores Indexed" :data="stores" v-loading="loading" size="small" style="width: 80%">
                            <el-table-column min-width="15" max-width="15" :v-bind="Image" prop="Image" label="Image">
                                <template slot-scope="scope">
                                <img :src="scope.row.Image" />
                            </template >
              </el-table-column> <el-table-column prop="name" label="Name"> </el-table-column>
              <el-table-column prop="describe" label="Description"> </el-table-column>
              <el-table-column prop="link" label="Link"> </el-table-column>
              <el-table-column prop="name" label="Name" :v-bind="name"> 
              <template slot-scope="scope">
                <el-button icon="el-icon-delete" @click="DeleteStore(scope.row.name)">
                </el-button>
              </template>
            </el-table-column>
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
            <el-form-item label="Image">
              <input type="file" v-on:change="onChangeFileUpload" />
            </el-form-item>
          </div>
          <div class="flex justify-end">
            <el-button type="danger" size="small" @click="dialogo = false">
              Cancel
            </el-button>
            <el-button type="success" @click="submitLoja()" size="small ">
              Save
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

function limpaLoja() {
    return {
        name: '',
        describe: '',
        link: '',
        image: null
    }
}

export default {
    components: { sideBar, navbar },
    data() {
        return {
            Image: null,
            hover: false,
            dialogo: false,
            methods: "POST",
            link: "getallstore",
            stores: [],
            showDrawer: false,
            loading: false,
            drawer: false,
            urlFiltro: null,
            file: null,
            urlBack: process.env.API_BASE_URL,
            urlFile: process.env.API_FILES,
            loja: limpaLoja(),
            rules: {
                name: [{
                    required: true,
                    message: 'Input the store´s name.',
                    trigger: 'blur',
                }, ],
                describe: [{
                    required: true,
                    message: 'Input the store´s description.',
                    trigger: 'blur',
                }, ],
                link: [{
                    required: true,
                    message: 'Input the store´s address link.',
                    trigger: 'blur',
                }, ],
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
                if (status === 200) {
                    this.stores = data.store
                    let datastores = [];
                    let temp = "";
                    data.store.forEach(element => {
                        temp = this.urlBack + this.urlFile + element.Image.replace('src', '');
                        datastores[element.id - 1] = element
                        datastores[element.id - 1].Image = temp
                    });
                    this.stores = datastores;
                } else
                    this.stores = []

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
        onChangeFileUpload(event) {
            this.file = event.target.files[0];
        },
        async submitLoja() {
            this.$refs["loja"].validate(async (valid) => {
                if (this.file != null) {
                    if (valid) {
                        this.methods === 'POST' ?
                            this.link = '/registerstore' :
                            this.link = '/updatestore'

                        const token = JSON.parse(localStorage.getItem('token'));

                        let formData = new FormData();
                        formData.append('image', this.file);
                        formData.append('name', this.loja.name)
                        formData.append('describe', this.loja.describe)
                        formData.append('link', this.loja.link)

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
                                message: "Loja cadastrada com sucesso",
                                type: "success",
                            });
                            this.dialogo = false
                            this.file = null
                            this.store = limpaLoja()
                            location.reload()
                        } else {
                            this.$message({
                                message: "Erro ao cadastrar loja",
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
        async DeleteStore(store){
        
        try {
          const token = JSON.parse(localStorage.getItem('token'));
          const storename ={
            name: store
          }
          const { data, status } = await this.$axios({
              method: "DELETE",
              url: "/deletestore",
              data: storename,
              headers: {
                Authorization: `Bearer ${token}`,
                token: token,
              },
            })
          if (status === 200){
            this.$message({
              message: "Loja Deletada com Sucesso",
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