import Vue from 'vue';
Vue.component('vTable',{
    data () {
        return {
            currentColumns:[],
            currentData:[]
        }
    },
    props: {
        columns:{
            type:Array,
            default:function(){
                return [];
            }
        },
        data:{
            type:Array,
            default:function(){
                return [];
            }
        }
    },
    render: function (h, context) {
        var _this = this;
        var ths = [];
        this.currentColumns.forEach((col,index)=>{
            if(col.sortable){
                ths.push(h('th',[
                    h('span',col.title),
                    h('a',{
                        class:{
                            on:col._sortType === 'asc'
                        },
                        on:{
                            click:function(){
                                _this.handleSortByAsc(index)
                            }
                        }
                    },'上升'),
                    h('a',{
                        class:{
                            on:col._sortType === 'desc'
                        },
                        on:{
                            click:function(){
                                _this.handleSortByDesc(index)
                            }
                        }
                    },'下降')
                ]))
            }else{
                ths.push(h('th',col.title))
            }
        });


        var trs = [];
        this.currentData.forEach((row)=>{
            var tds = [];
            _this.currentColumns.forEach((cell)=>{
                tds.push(h('td',row[cell.key]))
            })
            trs.push(h('tr',tds))
        });
        return h('table',[
            h('thead',[
                h('tr',ths)
            ]),
            h('tbody',trs)
        ])

    },
    methods: {
        makeColumns(){
            this.currentColumns = this.columns.map((col,index)=>{
                col._sortType = 'normal';
                col._index = index;
                return col;
            })
        },
        makeData(){
            this.currentData = this.data.map((row,index)=>{
                row._index = index;
                return row;
            });
        },
        handleSortByAsc(index){
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function(col){
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'asc';
            this.currentData.sort(function(a,b){
                return a[key]>b[key]?1:-1;
            })
        },
        handleSortByDesc(index){
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function(col){
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'desc';
            this.currentData.sort(function(a,b){
                return a[key]>b[key]?1:-1;
            });
        }
    },
    mounted () {
        this.makeColumns();
        this.makeData();
        console.log(this.currentColumns,'dddd')
    },
    watch: {
        data:function(){
            this.makeData();
            var sortedColumn = this.currentColumns.filter(function(col){
                return col._sortType!=='normal';
            });
            if(sortedColumn.length>0){
                if(sortedColumn[0]._sortType === 'asc'){
                    this.handleSortByAsc(sortedColumn[0]._index);
                }else{
                    this.handleSortByDesc(sortedColumn[0]._index);
                }
            }
        }
    }
})