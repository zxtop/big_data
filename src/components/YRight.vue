<template>
  <div class="yright" :style="bg">
    <h2 class="title2">月份异常情况</h2>
    <div class="yright_cont" ref="yright_cont" ></div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {
      bg: {
        backgroundImage:
          "url(" + require("../../static/images/arightboxbott.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      }
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let dom = this.$refs.yright_cont;
      let myChart = this.$echarts.init(dom);
      myChart.setOption({
        backgroundColor: "rgba(1,202,217,.2)",
        grid: {
          left: 60,
          right: 60,
          top: 50,
          bottom: 40
        },

        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ["line", "bar"] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        legend: {
          top: 10,
          textStyle: {
            fontSize: 10,
            color: "rgba(255,255,255,.7)"
          },
          data: ["2017年", "2018年", "同比增速"]
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.2)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)"
              }
            },
            axisLabel: {
              color: "rgba(255,255,255,.7)"
            },

            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            max: 250,
            interval: 50,
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.3)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.01)"
              }
            },

            axisLabel: {
              formatter: "{value} ml"
            }
          },
          {
            type: "value",
            name: "",
            max: 25,
            interval: 5,
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.3)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)"
              }
            },
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          {
            name: "2017年",
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#b266ff" },
                  { offset: 1, color: "#121b87" }
                ])
              }
            },
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "2018年",
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00f0ff" },
                  { offset: 1, color: "#032a72" }
                ])
              }
            },
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "同比增速",
            type: "line",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#fffb34" },
                  { offset: 1, color: "#fffb34" }
                ])
              }
            },
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      });
    }
  }
};
</script>