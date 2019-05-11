/**
 * @intro: 主程序入口.
 */

// 导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import 'src/assets/scss/main.scss'
// 导入Vue框架
import Vue from 'vue'
// 导入element组件
import ElementUI from './element-ui'
// 导入组件
import components from './components'
// 导入路由
import router from './router'
// 导入状态管理器
import store from 'src/store'
// 导入请求框架
// import api from './api'
// 导入自定义插件
import plugin from './plugin'
// 导入主视图文件
import App from './App'

import axios from 'axios'
import { Button, Select } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 注册
Vue.use(ElementUI)
Vue.use(components)
Vue.use(plugin)
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);

// 发布后是否显示提示
Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.API = '/manager'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('mainbody')
