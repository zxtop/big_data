<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <div class="main" v-clickoutside="handleClose">
      <button @click="show=!show">点击显示下拉菜单</button>
      <div class="dropdown" v-show="show">
        <p>下拉框的内容，点击外面区域可以关闭</p>
      </div>
    </div>

    <div>
      <p>时间转换指令</p>
      <div v-time="timeNow"></div>
      <div v-time="timeBefore"></div>
    </div>
    
    <div>
      <p>可排序表格组件</p>
      <v-table :data="data" :columns="columns"></v-table>
      <button @click="handleAddData">添加数据</button>
    </div>

    <div>
      随机增加
      <Counter :number="number"></Counter>
    </div>


  </div>
</template>

<script>
// import VTable from './VTable';
import Counter from './Counter.vue'
import './table.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome',
      show:false,
      timeNow:(new Date()).getTime(),
      timeBefore:1488930695721,

      columns:[
        {
          title:'姓名',
          key:'name'
        },
        {
          title:'年龄',
          key:'age',
          sortable:true
        },
        {
          title:'出生日期',
          key:'birthday',
          sortable:true
        },
        {
          title:'地址',
          key:'address'
        }
      ],
      data:[
        {
          name:'王小明',
          age:18,
          birthday:'1999-10-24',
          address:'北京市朝阳区西二旗'
        },
        {
          name:'王小明2',
          age:18,
          birthday:'1999-10-24',
          address:'北京市朝阳区西二旗'
        },
        {
          name:'王小明3',
          age:18,
          birthday:'1999-10-24',
          address:'北京市朝阳区西二旗'
        },
        {
          name:'王小明4',
          age:18,
          birthday:'1999-10-24',
          address:'北京市朝阳区西二旗'
        }
      ],
      number:0
    }
  },
  methods: {
    handleClose(){
      this.show = false;
    },
    handleAddData(){
      this.data.push({
        name:'张幸',
        age:28,
        birthday:'2020-10-24',
        address:'锦绣家园1号'
      })
    },
    handleAddRandom(num){
      this.number+=num;
    }
  },
  components: {
    // VTable
    Counter
  },
  created () {
    this.$bus.on('add',this.handleAddRandom)
  },
  beforeDestroy () {
    this.$bus.off('add',this.handleAddRandom)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.main{width: 125px;}
button{
  display: block;
  width: 100;
  color: #fff;
  border: 0;
  font-size: 12px;
  border-radius: 4px;
  text-align: center;
  padding: 6px;
  outline: none;
  position: relative;
}
button:active{top: 1px;left: 1px;}
.dropdown{
  width: 100%;
  height: 150px;
  margin: 5px 0;
  font-size: 12px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);

}
.dropdown p{
  display: inline-block;
  padding: 6px;
}

table{
        width: 100%;
        margin-bottom: 24px;
        border-collapse: collapse;
        border-spacing: 0;
        empty-cells: show;
        border:1px solid #e9e9e9;
    }
    table th{
        background: #f7f7f7;
        color:#5c6b77;
        font-weight: 600;
        white-space: nowrap;
    }
    table td,table th{
        padding: 8px 16px;
        border: 1px solid #e9e9e9;
        text-align: left;
    }
    table th a{
        display: inline-block;
        margin: 0 4px;
        cursor: pointer;
    }
    table th a.on{
        color: #3399ff;
    }
    table th a:hover{
        color: #3399ff;
    }
</style>
