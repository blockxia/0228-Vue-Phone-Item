// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import Split from './components/Split/Split.vue'


import  './mock/mockServer'
import './filter'
import loading from './common/imgs/loading.gif'


Vue.use(VueLazyload,{
  loading   // 内部会注册一个全部指令: lazy
})

Vue.component(Button.name,Button)
Vue.component('Split',Split)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
/*  components: { App },
  template: '<App/>',*/
  render:h=>h(App),
  router,
  store,

})
