<template >
    <div>
        <message :msg="msg" v-show="msg"/>
        <div>
            <form id="redefinirsenha-form" @submit="redefinirsenha">
             
                <div class="input-container">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" v-model="email" placeholder="insert your email">
                </div>
                <div class="input-container">
                    <label for="password">New Password:</label>
                    <input type="password" id="password" name="password" v-model="password" placeholder="insert your new password">
                </div>
                <div class="input-container">
                    <label for="passwordconfirmation">Confirmation Password:</label>
                    <input type="password" id="password" name="passwordconfirmation" v-model="passwordconfirmation" placeholder="insert your new password">
                </div>

                <div class="input-container">
                    <label for="token">Token:</label>
                    <input type="text"  maxlength="500" id="token" name="token" v-model="token" placeholder="insert your token">
                </div>
               
                <div class="bnt">
                    <input type="submit" class="submit-btn" id="bnt" value="Redefine password">
                </div>
            
            </form>
        </div>
    </div>
</template>
<script>



export default {
    
    name: "formredefinirsenha",
    data(){
        return {
            email: "",
            password: "",
            passwordconfirmation: "",
            token: "",
            urlback: process.env.API_BASE_URL,
        
        }
    },
    methods: {
        async logado(){ 
            const token = JSON.parse( localStorage.getItem('token') );
            if(!token){
                return 1;
            } 
            const obj = {
                token: token
            }
            const req = await fetch(`${this.urlback}/verificationonline`, {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify(obj)
                });
            const res = await req.json()
            if(res.status == "false"){
                localStorage. removeItem("token");
            } 
                
            if(res.mensagem == "logado") this.$router.push('/jogos/compara')
                
        },
        async redefinirsenha(e) {
            e.preventDefault();
            if(this.passwordconfirmation != this.password){
                this.$message({
                        message: "senhas não coincidem",
                        type: "warning"
                     });
                return 1;
            }
            const data = {
                email: this.email,
                password: this.password,
                token: this.token
            }
            if(this.email == "" || this.token == "" || this.password == ""){
                this.$message({
                        message: "dados não informados",
                        type: "warning"
                 });
            }
            else{
                const user  = JSON.stringify(data)
                const req = await fetch(`${this.urlback}/resetpassword`, {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: user
                });
                const res = await req.json()
                this.email = "";
                this.password = "",
                this.passwordconfirmation = "",
                this.token = "",
                console.log(data);
                console.log(res);
                if(res.mensagem == "Senha alterada com sucesso"){
                    this.$message({
                        message: "Senha Alterada com Sucesso!!!",
                        type: "success"
                 });
                    this.$router.push('/usuarios/login');  
                }else{
                    this.$message({
                        message: "Token Invalido",
                        type: "warning"
                 });
                }
            }
        }
        }, 
        mounted() {
        this.logado();
        this.email = "";
  
    }
}
</script>
<style scoped>
  #redefinirsenha-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;;
    padding: 5px 10px;
    border-left: 4px solid #C94F32;
  }
  input, select {
    padding: 5px 10px;
    border-radius: 5px;
    width: 350px;
  }


    #bnt {
        padding: 10px 80px 10px 80px;
        border-radius: 20px;
        font-size: 16px;
        margin: 0 30px 10px 30px;
        width: auto;
    }


  .submit-btn {
    background-color: #C94F32;
    color:#FFF;
    font-weight: bold;
    border: 2px solid #C94F32;
    padding: 10px;
    border-radius: 20px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }
  .submit-btn:hover {
    background-color: transparent;
    color: #222;
  }
</style>