<template>
  <div class="cadastro-container">
    <el-alert title="error alert" type="error" center show-icon />
      <div class="cadastro">
          <h1>Create Account</h1>
        
        <formCadastro />
      </div>
  </div>
</template>
<script>
import formCadastro from "../../layouts/components/cadastro/formCadastro.vue";
export default {
  name: "cadastro",

  components: { formCadastro},


}
</script>

<style>

  #texte {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
    
  }
  #logo {
    margin-top: -15px;
    transform: rotate(5deg);
    margin-left: 30px;
    max-width:145px;
    max-height:95px;
   
  }
  .el-alert {
    height: 50px;
    width: 200px;
    margin: 20px 0 0;
    display: none;
  }
.el-alert:first-child {
  margin: 0;
}

    h1 {
      text-align: center;
      font-size: 42px;
      margin-bottom: 10px;
      color: #222;
     
    }
    .cadastro-container {
        width: 100vw;
        height: 100vh;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center
    }
    .cadastro {
        width: 400px;
        height: auto;
        background: #D9D9D9;
        
        border-radius: 20px;      
    }
  
    .cadastro h1 {
      font-size: 3em;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 300;
      text-align: center;
      color: #C94F32;
    }
 

   
 
</style>
