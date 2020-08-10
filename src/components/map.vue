<template>
    <div class="container">
        <div class="yl-map">
            <h4 style="color:#fff;text-align:center;position:absolute;width:100%;left:0px;top:18px;z-index:9999;color:#07b6c7">实时监控统计</h4>
            <div id="myChart" ref="myEchart" :style="bg">
            </div>
        </div>
        <!-- 左上边 -->
        <y-box></y-box>

        <!-- 左下 -->
        <y-panle></y-panle>

        <!-- 左底 -->
        <y-bottom></y-bottom>

        <!-- 底部 -->
        <y-line></y-line>

        <!-- 右上 -->
        <y-top></y-top>

        <!-- 右下 -->
        <y-right></y-right>

    </div>
</template>

<script>
    import YBox from "@/components/YBox"
    import YPanle from "@/components/YPanle"
    import YBottom from "@/components/YBottom"
    import YLine from "@/components/YLine"

    import YTop from "@/components/YTop"
    import YRight from "@/components/YRight"
    export default{
        data () {
            return {
                bg:{
                    backgroundImage: "url(" + require("../../static/images/amiddboxttop.png") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize:"100% 100%"
                },
                ltBg:{
                    backgroundImage: "url(" + require("../../static/images/leftb1.png") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize:"100% 100%"
                },
                option:[
                    { name: '卜集镇', data:[{name:'医院数量',value:10},{name:'病床监控',value:200}]},
                    { name: '高河街道', data:[{name:'医院数量',value:11},{name:'病床监控',value:100}]},
                    { name: '胡集镇', data:[{name:'医院数量',value:12},{name:'病床监控',value:150}]},
                    { name: '化雨镇', data:[{name:'医院数量',value:13},{name:'病床监控',value:50}]},
                    { name: '鸡黍镇', data:[{name:'医院数量',value:14},{name:'病床监控',value:300}]},
                    { name: '金乡街道', data:[{name:'医院数量',value:15},{name:'病床监控',value:400}]},
                    { name: '马庙镇', data:[{name:'医院数量',value:16},{name:'病床监控',value:500}]},
                    { name: '司马镇', data:[{name:'医院数量',value:17},{name:'病床监控',value:600}]},
                    { name: '王丕镇', data:[{name:'医院数量',value:18},{name:'病床监控',value:400}]},
                    { name: '肖云镇', data:[{name:'医院数量',value:19},{name:'病床监控',value:700}]},
                    { name: '兴隆镇', data:[{name:'医院数量',value:20},{name:'病床监控',value:800}]},
                    { name: '羊山镇', data:[{name:'医院数量',value:21},{name:'病床监控',value:1000}]},
                    { name: '鱼山镇', data:[{name:'医院数量',value:22},{name:'病床监控',value:400}]}
                ]
            }
        },
        components:{YBox,YPanle,YBottom,YLine,YTop,YRight},
        mounted () {
            this.initChart();
        },
        methods: {
            initChart(){
                let _that = this;
                let dom = this.$refs.myEchart;
                let myChart = this.$echarts.init(dom);
                function randomData () {
                    return Math.round(Math.random() * 500);
                }
                //绘制图表
                myChart.setOption({
                    // backgroundColor: "#2c343c",
                    tooltip: {
                        trigger: 'item',
                        // formatter: '{a} <br/>{b} : {c} ({d}%)'
                        formatter:function(params){
                            // console.log(params,'ddddd');
                            var temname = params.name;
                            var res = params.name+'<br>';
                            var option = _that.option;
                            for(var i = 0;i<option.length;i++){
                                if(temname == option[i].name){
                                    // console.log(option[i])
                                    for(var j = 0;j<option[i].data.length;j++){
                                        res+=option[i].data[j].name+':'+option[i].data[j].value+'<br>'
                                        // console.log(res)
                                    }
                                }
                            }
                            return res;
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['']
                    },
                    selectedMode: 'single',
                    visualMap: {
                        min: 0,
                        max: 45000,
                        left: '10%',
                        bottom: '5%',
                        text: ['高', '低'], // 文本，默认为数值文本
                        calculable: true,
                        inRange:{
                        color: ['yellow','lightskyblue', 'orangered']
                        },
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    series:[
                        {
                            name:'',
                            type:'map',
                            mapType: 'jining',
                            
                            // center:[115.97, 29.71],
                            // layoutCenter: ['80%', '100%'],
                            itemStyle: {
                                normal: {
                                    borderColor: 'rgba(0, 0, 0, 0.2)'
                                },
                                emphasis: {
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    shadowBlur: 20,
                                    borderWidth: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            // showLegendSymbol: true,
                            label: {
                                normal: {
                                    show: true
                                },
                                // emphasis: {
                                //     // textStyle: {
                                //     //     color: '#fff'
                                //     // }
                                // }
                            },
                            data:[
                                { name: '卜集镇', value:18163,},
                                { name: '高河街道', value:22036 },
                                { name: '胡集镇', value: 12000 },
                                { name: '化雨镇', value: 28405},
                                { name: '鸡黍镇', value: 15212},
                                { name: '金乡街道',value: 26681},
                                { name: '马庙镇', value:11161 },
                                { name: '司马镇', value: 20687},
                                { name: '王丕镇', value: 31456},
                                { name: '肖云镇', value: 23053 },
                                { name: '兴隆镇', value: 15429},
                                { name: '羊山镇', value: 24879 },
                                { name: '鱼山镇', value: 21458 }
                            ]
                        }
                    ]

                })

            }
        }
    }
</script>
