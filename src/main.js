import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'
// 安装toast插件
Vue.use(toast)
    // 图片懒加载
Vue.use(VueLazyLoad)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() //事件总线赋值给$bus
    /* eslint-disable no-new */
new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
    })
    // require('./assets/css/base.css')