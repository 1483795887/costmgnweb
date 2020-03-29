import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'

import createVuexAlong from 'vuex-along'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account
  },
  plugins: [createVuexAlong({
    name: "hello-vuex-along",
    session: {
      list: ["account"]
    }
  })]
})