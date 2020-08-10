import Vue from 'vue';
import Vuex from 'vuex';
import product_data from '../product.js';
import api from './../src/util/http.js'
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        //商品列表数据
        productList:[],
        //购物车数据
        cartList:[]
    },
    mutations: {
        //添加商品列表
        setProductList(state,data){
            state.productList = data;
        }
    },
    actions: {
        //请求商品列表
        getProductList(context){
            setTimeout(()=>{
                // context.commit('setProductList',product_data)
                api.mockdata('/data/index')
                .then(res=>{
                    console.log(res)
                    context.commit('setProductList',res.data)
                })
            },500)
        }
    }
})
export default store