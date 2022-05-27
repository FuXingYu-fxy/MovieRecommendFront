import { createApp } from 'vue'
import App from './App.vue'
import store, {key} from "@/store/index" // 子路由 里导入了 store, 所以 store 必须要在之前导入
import router from "@/router/index"
import "./permission"
createApp(App).use(router).use(store, key).mount('#app')
