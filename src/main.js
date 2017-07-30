// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
import vueWaves from './directive/waves';// 水波纹指令
import * as filters from './filters'; // 全局vue filter
import Multiselect from 'vue-multiselect';// 使用的一个多选框组件，element-ui的select不能满足所有需求
import '@/assets/iconfont/iconfont'
import IconSvg from '@/components/Icon-svg/index.vue'
import { getToken } from '@/utils/authStorage'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component('icon-svg', IconSvg)
Vue.use(vueWaves);

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

const whiteList = ['/login','/authredirect'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    }
    else {
      if (store.getters.auths.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const auths = res.data.auths;
          store.dispatch('GenerateRoutes', { auths }).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({ ...to });
          })
        })
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
