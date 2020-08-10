<template>

  <div id="app" :style="bg">
    <h2 style="text-align:center;color:#07b6c7;padding-top:30px;">医疗大数据</h2>
    <!-- <div class="header">
      <router-link to="/list" class="header-title">电商网站示例</router-link>
      <div class="header-menu">
        <router-link to="/cart" class="header-menu-cart">
          购物车
          <span v-if="cartList.length">{{cartList.length}}</span>
        </router-link>
      </div>
    </div> -->
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      bg:{
        backgroundImage: "url(" + require("../static/images/bg.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize:"100% 100%"
      }  
    }
  },
  computed: {
    cartList(){
      return this.$store.state.cartList;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  height: 100%;
  /* overflow: hidden; */
  /* min-height: 1080px; */

  background: #09384d;
  /* background-image: url("assets/images/bg.jpg") no-repeat; */
}
html,body{
  margin: 0;
  padding: 0;
  height: 100%;
  color: #657180;
  font-size: 16px;
}
*{margin: 0;padding: 0;}
a{text-decoration: none;}
body{background: #f8f8f9;}
.header{height: 48px;line-height: 48px;background: rgba(0,0,0,.8);color: #fff;}
.header-menu{float: right;margin-right: 32px;}
.header-menu-cart{color: #fff;}
.header-menu-cart span{
  display: inline-block;
  width: 16px;height: 16px;
  line-height: 16px;text-align: center;
  border-radius: 50%;
  background: #ff5500;color: #fff;font-size: 12px;
}
</style>
