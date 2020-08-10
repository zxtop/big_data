import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/map',
      // name: 'HelloWorld',
      // component: HelloWorld
      meta:{
        title:'商品列表'
      },
      component:(resolve)=>require(['../components/map.vue'],resolve)
    },
    {
      path:'*',
      redirect:'/map'
    }
  ]
})
