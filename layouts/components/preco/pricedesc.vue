<template>

  <div v-if="price.gamestore.discountpercentage > 0" class="flex justify-center" >
    <div class="backColor flex rounded-lg w-1/5 h-11  mx-3">
            <h1 class="textColor	  min-w-full	min-h-full mt-2 uppercase justify-center font-bold text-xl text-center">
              -{{ price.gamestore.discountpercentage}}%
            </h1>
        </div>
        <div class="flex flex-col rounded-lg">
            <div>
                <p class=" text-gray-900 text-opacity-30 min-h-full  uppercase  font-bold text-sm line-through">
                  R${{price.gamestore.originalprice}}
                </p>
              </div>
              <div>
                <p class="textColor	 min-h-full  uppercase  font-bold text-base ">
                  R${{price.gamestore.discountprice}}
                </p>
              </div>
            </div>
            
  </div>
  <div v-else class="flex justify-center" >
        <div class="flex rounded-lg">
              <div>
                <p class=" min-h-full  uppercase font-bold text-base">
                  R${{price.gamestore.originalprice}}
                </p>
              </div>
            </div>
            
  </div>
 
</template>
  
  <script>
  import { mapState, mapMutations } from "vuex";
  

  export default {
    props: ['price'],
    computed: {
      ...mapState({
        collapsed: (state) => state.isCollapsed,
      }),
    },
  };
  </script>
  
  <style>

  .backColor {
    background-color: #4C6B22;
  }
  .textColor {
    color: #B4DB19;
  }
  </style>
  