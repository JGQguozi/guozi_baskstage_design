import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';

import TDesign from 'tdesign-vue-next';

// 引入样式px转换
import 'lib-flexible' // 移动端适配 

createApp(App).use(store).use(router).use(TDesign).mount('#app')
