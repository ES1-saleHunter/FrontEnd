<template >
    <div>
        <message :msg="msg" v-show="msg"/>
        <div>
            <form id="login-form" @submit="login">
                <div class="input-container">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" v-model="email" placeholder="insert your email">
                </div>
                <div class="input-container">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" v-model="password" placeholder="insert your password">
                </div>
               
                <div class="input-container" id="submit">
                    <input type="submit" class="submit-btn" value="sing in">
                </div>
            </form>
        </div>
    </div>
</template>
<script>



export default {
    
    name: "formlogin",
    data(){
        return {
            email: null,
            password: null,
            msg: null,
            urlback: "http://localhost:3333" 
        }
    },
    methods: {
        async logado(){ 
            const token = JSON.parse( localStorage.getItem('token') );
            if(!token) return 1;
            const obj = {
                token: token
            }
            
            const req = await fetch("http://localhost:3333/verificationonline", {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify(obj)
                });
            const res = await req.json()
            console.log(obj)
            console.log(res)
            if(res.mensagem == "logado") this.$router.push('/home')
            console.log(res)
                
        },
        async login(e) {
            e.preventDefault();
            
            const data = {
                email: this.email,
                password: this.password,
            }
            if(this.password == "" || this.email == "" ){
                alert("dado informado");
            }
            else{

                const user  = JSON.stringify(data)
                console.log(data);
                const req = await fetch(`${this.urlback}/login`, {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: user
                });
                const res = await req.json()
                console.log(res);
                this.email = "";
                this.password = "";
                if(res.mensagem == 'ERRO - Falha login'){
                    alert("Falha login");
                }else{
                    localStorage.setItem('token', JSON.stringify(res.token));
                    this.$router.push('/home')
                }
            }
        }
        }, 
        mounted() {
        this.logado();
        this.email = "";
        this.password = "";
    }
}
</script>
<style scoped>
  #login-form {
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
    border-left: 4px solid #0384fc;
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

 
  .submit-btn {
    background-color: #5AA6DF;
    color:#FFF;
    font-weight: bold;
    border: 2px solid #5AA6DF;
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