export default {
  namespaced: true,
  state: {
    siderKey: {}
  }, mutations: {
    setsiderkey(state, key) {
      state.siderkey = key;
    }
  }
}