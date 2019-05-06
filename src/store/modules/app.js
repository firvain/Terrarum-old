const state = {
  sidebar: false,
  appStatus: "display",
  print: {
    value: false,
    width: undefined,
    height: undefined,
    dim0: undefined,
    dim1: undefined,
    format: undefined
  },
  loading: false
};
const getters = {
  appStatus: state => state.appStatus,
  sidebar: state => state.sidebar,
  print: state => state.print,
  loading: state => state.loading
};
const mutations = {
  SET_APP_STATUS(state, payload) {
    state.appStatus = payload;
  },
  SET_SIDEBAR(state, payload) {
    state.sidebar = payload;
  },
  SET_PRINT(state, payload) {
    state.print = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  }
};
const actions = {
  UPDATE_APP_STATUS({ commit }, payload) {
    commit("SET_APP_STATUS", payload);
  },
  UPDATE_SIDEBAR({ commit }, payload) {
    commit("SET_SIDEBAR", payload);
  },
  UPDATE_PRINT({ commit }, payload) {
    commit("SET_PRINT", payload);
  },
  UPDATE_LOADING({ commit }, payload) {
    commit("SET_LOADING", payload);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
