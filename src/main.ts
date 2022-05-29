import { createApp } from 'vue'
import App from './App.vue'
import store, {key} from "@/store" // BUG store 必须在 router 之前导入
import router from "@/router"
import "./permission"
console.log("导入结束");

createApp(App).use(router).use(store, key).mount('#app')
