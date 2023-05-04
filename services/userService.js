export default (context) => {
  return {
    fetchUser: async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      const { data, status } = await context.$axios
      .get(`/getuser`)
      .catch((error) => {
        context.$notifyResponse.error(
          'Erro ao buscar usuário!',
          'Não foi possível buscar o usuário logado!'
      		)
      	})
      return status === 200 ? data : null
    },
  }
}