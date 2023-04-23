<template>
  <div class="login-container">
    <el-alert title="error alert" type="error" center show-icon />
      <div class="login">
        <div id="texte" >
          <h1>Login</h1>
          <img  src="../../assets/public/logo.png" :alt="alt" id="logo" >
        </div>
        <formLogin />
      </div>
      <div class="login2">
        <div id="options">
          <a href="register" target="_blank" rel="noopener noreferrer">Don't have an account?</a>
          <a href="recuperarsenha" target="_blank" rel="noopener noreferrer">forgot password?</a>
        </div>
      </div>
  </div>
</template>
<script>
import formLogin from "../../layouts/components/login/formLogin.vue";
export default {
  name: "login",
  data(){
    return {
      logo_src:"../../assets/public/logo.png",
    }
  },
  components: { formLogin},


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
    .login-container {
        width: 100vw;
        height: 100vh;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center
    }
    .login {
        width: 400px;
        height: 380px;
        background: #D9D9D9;
        
        border-radius: 20px 20px 0px 0px;      
    }
  
    .login h1 {
      font-size: 3em;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 300;
      text-align: center;
      color: #C94F32;
    }
    .login2 {
        width: 400px;
        height: auto;
        background: #ECECEC;
        border-radius:0px 0px 20px 20px;      
    }

    #options {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      font-size: 18px;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 10px;
    }

    #options a:hover {
      background-color: transparent;
      color: #222;
    }
 
</style>
