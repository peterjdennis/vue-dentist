import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state = {

    currentUser: null,
    currentchannel: null

}

const mutations = {

  SET_USER(state, user){
    state.currentUser = user
  }

}

const actions = {
    setUser({commit}, user){
     commit("SET_USER", user)
    }
}

const getters = {
    currentUser: state => state.currentUser

}

export default new Vuex.Store({
    state, mutations, actions, getters

})
