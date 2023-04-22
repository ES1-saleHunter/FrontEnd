<template>
  <div class="font-murecho">
    <el-dropdown trigger="click" class="h-full" @command="handleCommand">
      <div class="flex h-full items-center">
        <el-avatar class="cursor-pointer" :src="circleUrl"></el-avatar>
      </div>

      <el-dropdown-menu slot="dropdown" class="w-48 justify-items-end">
        <el-dropdown-item command="showEdit">Editar perfil</el-dropdown-item>
        <el-dropdown-item divided command="logout">Sair</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "showEdit":
          alert("edit");
          break;
        case "logout":
          alert("logout");
          break;
      }
    },
  },
};
</script>
