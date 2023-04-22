export const state = () => ({
  isCollapsed: true,
})

export const mutations = {
  toggleCollapse(state) {
    state.isCollapsed = !state.isCollapsed
  },
}
