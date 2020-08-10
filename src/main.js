// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueBus from '@/bus/vue-bus'
import store from '../store'
import './directive/time'

import echarts from 'echarts';
import jining from '@/assets/json/jinxiang.json';

import "./assets/css/index.css";
require('./util/mock');

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
echarts.registerMap('jining',jining);
Vue.use(VueBus);



//自定义指令、
Vue.directive('clickoutside',{

  bind:function(el,binding,vnode){
    function documentHandler(e){
        if(el.contains(e.target)){
            return false
        }
        if(binding.expression){
            binding.value(e)
        }
    }
    el.__vueClickOutside__=documentHandler;
    document.addEventListener('click',documentHandler);
  },

  unbind:function(el,binding){
      document.removeEventListener('click',el.__vueClickOutside__);
      delete el.__vueClickOutside__;
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
