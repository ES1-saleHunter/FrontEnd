<template>
  <div
    class="h-screen m-auto float-right transition-all duration-500 pt-10 bg-gray-50"
    style="width: 96%"
  >
  </div>
</template>

<script>

export default {
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
                
            if(res.mensagem == "logado") this.$router.push('/home')
        },
        async verificar(){
           if(this.logado()){
              this.$router.push('/usuarios/login')  
           };
        }
        }, 
        mounted() {
        this.verificar();
    }
};
</script>


<style>
* {
  font-family: Arial, Helvetica, sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>