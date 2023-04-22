<template>
	<div class="
	            h-screen
	            w-full
	            flex flex-nowrap
	            justify-center
	            items-center
	            overflow-hidden
	            overscroll-none
	          ">
		<div class="flex flex-row w-full max-w-[46rem] text-gray-700" v-if="error.statusCode">
			<div class="w-1/2 p-5">
				<img :src="require(`~/assets/svg/${error.statusCode}.svg`)" alt="" />
			</div>
			<div class="w-1/2 flex flex-col justify-center">
				<h2 v-if="error.statusCode === 404" class="text-3xl">
					Eita, essa tela não existe!
				</h2>
				<h2 v-else class="text-3xl">
					{{ error.message.title || error.statusCode }}
				</h2>
				<p class="text-sm" v-if="error.statusCode === 404">
					Desculpe mas não encontramos nada para o endereço informado.
				</p>
				<p class="text-sm mb-5" v-else v-html="error.message.detail || error.message"></p>
				<el-button type="primary" class="w-1/3" @click="rollBack">Go to home!</el-button>
			</div>
		</div>
	</div>
</template>
  
<script>
export default {
	props: ['error'],
	layout: 'layoutErrors',

	methods: {
		rollBack() {
			this.$router.push('/')
		},
	},
}
</script>