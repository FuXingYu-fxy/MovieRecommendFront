import { createStore, Store,  } from "vuex";
import type { InjectionKey} from "vue";
import type RootStateTypes from "./interface";

// store 自动导入

const modules = import.meta.globEager("./modules/*.ts");
const storeModules = Object.keys(modules).reduce((myModules, path) => {
  // 只支持 /foo/bar/baz/user.ts 这种路径格式
  myModules[path.replace(/(.+\/)(.+).ts/ig, "$2")] = modules[path].default;
  return myModules;
}, {} as any)

const store = createStore<RootStateTypes>({
  state: {
    collapsed: true,
    requestUpdated: false,
  },
  mutations: {
    TOGGLE_COLLAPSED(state, collapsed: boolean) {
      state.collapsed = collapsed
    },
    TOGGLE_REQUEST_UPDATED(state, requestUpdated: boolean) {
      state.requestUpdated = requestUpdated
    }
  },
  getters: {
    collapsed: (state) => state.collapsed,
    requestUpdated: (state) => state.requestUpdated,
  },
  modules: storeModules
});

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store');
export default store;
