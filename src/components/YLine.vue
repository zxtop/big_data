<template>
    <div class="yline">
        <!-- <h2 class="title">实时统计折线图</h2> -->
        <div class="yline-cont" ref="ylinecont" :style="bg"></div>
    </div>
</template>

<script>
import {get_patient_num,get_patient_num_by_hospital} from '@/api/Data';
export default {
    data () {
        return {
            bg:{
                backgroundImage: "url(" + require("../../static/images/ylin_bg.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize:"100% 100%"
            },
            echarsOption:{
                title: {
                    text: '各医院全年住院统计',
                    textStyle:{
                        color:"#07b6c7"
                    },
                    left:'10%',
                    top:'7%'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    top:'7%',
                    textStyle:{
                        color:'#07b6c7'
                    },
                    data:[]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [],
                    nameTextStyle:{
                        color:'#fff'
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine:false,
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    }
                },
                series:[]
            }
        }
    },
    mounted () {
        this.initChart();
    },
    methods: {
        initChart(){
            // console.log(this.echarsOption,'sssss')
            let dom = this.$refs.ylinecont;
            let myChart = this.$echarts.init(dom);

            get_patient_num().then((res)=>{
                res.data.legend_data.map((item,index)=>{
                    this.echarsOption.legend.data.push(item.hospitalName)
                });
                this.echarsOption.xAxis.data = res.data.xAxis_data;
                for (var i in res.data.series){
                    for(var j in res.data.series[i]){
                        let obj = {
                            name:'',
                            data:[],
                            type: 'line',
                            itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        width:4  
                                    }  
                                }  
                            }
                        };
                        obj.name = j;
                        let arr = [];
                        for(var z in res.data.series[i][j]){
                            arr.push(res.data.series[i][j][z]);
                        }
                        obj.data = arr.reverse();
                        this.echarsOption.series.push(obj); 
                    }
                }
                // console.log('aaaa',res)
            }).then(()=>{
                // console.log('dddd')
                myChart.setOption(this.echarsOption,true)

            });
        }
    }
}
</script>