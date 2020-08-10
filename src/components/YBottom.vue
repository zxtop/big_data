<template>
    
    <div class="aleftboxtbott" :style="bg">
        <h2 class="title">各院统计数量</h2>
        <div class="lefttoday_tit height ht"><p class="fl">状态：已更新</p><p class="fr">{{`时间：`+timeData}}</p></div>
        <div id="aleftboxtbott" class="aleftboxtbott_cont" ref="aleftboxtbott_cont"></div>
    </div>
    
</template>

<script>
import echarts from 'echarts';
import {get_patient_num,get_patient_num_by_hospital} from '@/api/Data';
Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export default {
    data () {
        return {
            bg:{
                backgroundImage: "url(" + require("../../static/images/aleftboxtbott.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize:"100% 100%"
            },
            timeData:new Date().Format("yyyy-MM-dd hh:mm"),
            echartsOption:{
                color: ['#7ecef4'],
                backgroundColor: 'rgba(1,202,217,.2)',
                tooltip: {
                    trigger: 'item'
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    },
                    splitLine:false,

                },
                series: [{
                    data: [],
                    type: 'bar'
                }]
            }
        }
    },
    mounted () {
        this.initChart();
    },
    methods: {
        initChart(){
            let dom = this.$refs.aleftboxtbott_cont;
            let myChart = this.$echarts.init(dom);
            get_patient_num_by_hospital().then((res)=>{
                for(var i in res.data.data){
                  this.echartsOption.series[0].data.push(res.data.data[i])
                  this.echartsOption.xAxis.data.push(i)
                }
            }).then(()=>{
                myChart.setOption(this.echartsOption,true)
            });
          
        }
    }
}
</script>