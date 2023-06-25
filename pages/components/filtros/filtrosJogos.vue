<template>
  <div>
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
</template>

<script>
export default {
  data() {
    return {
      valor: null,
      filtro: null,
      options: [{ value: "name", label: "Name" }],
    };
  },
  methods: {
    aplicaFiltro() {
      console.log("valor", this.valor);
    },
  },
};
</script>
