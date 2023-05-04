<template >
    <div>
        <message :msg="msg" v-show="msg"/>
        <div>
            <form id="cadastro-form" @submit="cadastro">
                <div class="input-container">
                    <label for="name">name:</label>
                    <input type="name" id="name" name="name" v-model="name" placeholder="insert your name">
                </div>
                <div class="input-container">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" v-model="email" placeholder="insert your email">
                </div>
                <div class="input-container">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" v-model="password" placeholder="insert your password">
                </div>
                <div class="input-container">
                    <label for="passwordconfirmation">password confirmation:</label>
                    <input type="password" id="password" name="passwordconfirmation" v-model="passwordconfirmation" placeholder="password confirmation">
                </div>
                <div class="bnt">
                    
                    <router-link class="submit-btn" id="bnt1" to="/usuarios/login">sing in</router-link>
                   
                    <input type="submit" class="submit-btn" id="bnt" value="sing up">
                </div>
            
            </form>
        </div>
    </div>
</template>
<script>



export default {
    
    name: "formcadastro",
    data(){
        return {
            name: "",
            email: "",
            password: "",
            passwordconfirmation: "",
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
        async cadastro(e) {
            e.preventDefault();
            if(this.passwordconfirmation != this.password){
                this.$message({
                        message: "senhas não coincidem",
                        type: "warning"
                    });
                return 1;
            }
            const data = {
                name: this.name,
                email: this.email,
                password: this.password,
            }
            if(this.password == "" || this.email == "" || this.name == "" ){
                this.$message({
                        message: "dados não informados",
                        type: "warning"
                    });
            }
            else{

                const user  = JSON.stringify(data)
                const req = await fetch(`${this.urlback}/register`, {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: user
                });
                const res = await req.json()
                this.name = "";
                this.email = "";
                this.password = "";
                this.passwordconfirmation = ""

                console.log(res);
                if(res.mensagem == undefined){
                    this.$message({
                        message: "Algo deu problema.",
                        type: "danger"
                    });
                }else if (res.mensagem == "usuario criado com sucesso"){
                   console.log("usuario criado com sucesso");
                   
                   this.$message({
                        message: "Cadastro concluido com sucesso",
                        type: "success"
                    });
                   this.$router.push('/usuarios/login');  
                }
            }
        }
        }, 
        mounted() {
        this.logado();
        this.name = "";
        this.email = "";
        this.password = "";
        this.passwordconfirmation = ""
    }
}
</script>
<style scoped>
  #cadastro-form {
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
    width: 300px;
  }
  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }
  #opcionais-title {
    width: 100%;
  }

    #bnt {
        padding: 10px 30px 10px 30px;
        border-radius: 20px;
        font-size: 16px;
        margin: 0 30px 10px 30px;
        width: auto;
    }
    #bnt1 {
        padding: 11px 30px 12px 30px;
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