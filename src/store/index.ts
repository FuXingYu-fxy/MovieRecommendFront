import Vuex from "vuex"
const store = new Vuex.Store({
  state: {
    originalPath: "",
    row: {},
  },
  mutations: {
    UPDATE_ORIGINAL_PATH(state, {path}) {
      state.originalPath = path;
    },
    UPDATE_ROW(state, {row}) {
      state.row = row;
    }
  },
})

export default store;