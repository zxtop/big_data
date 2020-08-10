<template>
    <div class="container-left-top" :style="ltBg">
        <h2 class="title">今日医院各类型数据统计</h2>
        <div class="title-area">
            <span>地区：金乡</span>
            <b>{{timeData}}</b>
        </div>

        <div class="lefttoday_number">
            <div class="widget-inline-box text-center fl">
                <p>异常统计</p>
                <h3 class="ceeb1fd" style="color:#eeb1fd;font-size:22px;font-weight:100;line-height:40px">{{allData.abnormalNum}}</h3>
                <h4 class="text-muted pt6">环比<img :src="img_up" height="16">2%</h4>
                <!-- <h4 class="text-muted pt6"><span style="width:10px;height:10px;display:inline-block;border-radius:5px;background:red"></span></h4> -->
            </div>


            <div class="widget-inline-box text-center fl">
                <p>病床统计</p>
                <h3 class="c24c9ff" style="color:#24c9ff;font-size:22px;font-weight:100;line-height:40px">{{allData.bedNum}}</h3>
                <h4 class="text-muted pt6">环比<img :src="img_down" height="16">3%</h4>
            </div>


            <div class="widget-inline-box text-center fl">
                <p>医院统计</p>
                <h3 class="cffff00" style="color:#ffff00;font-size:22px;font-weight:100;line-height:40px">{{allData.hospitalNum}}</h3>
                <h4 class="text-muted pt6">环比<img :src="img_down" height="16">3%</h4>
            </div>

            <div class="widget-inline-box text-center fl">
                <p>病人统计</p>
                <h3 class="c11e2dd" style="color:#11e2dd;font-size:22px;font-weight:100;line-height:40px">{{allData.patientNum}}</h3>
                <h4 class="text-muted pt6">环比<img :src="img_down" height="16">3%</h4>
            </div>

        </div>
    </div>
</template>

<script>
import {get_patient_num,get_patient_num_by_hospital,get_all_num} from '@/api/Data';
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
            ltBg:{
                backgroundImage: "url(" + require("../../static/images/leftb1.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize:"100% 100%"
            },
            // img_down:"../../static/images/icondown.png",
            // img_up:"../../static/images/iconup.png",
            img_down:require("../../static/images/icondown.png"),
            img_up:require("../../static/images/iconup.png"),
            allData:{
                abnormalNum:null,
                bedNum:null,
                hospitalNum:null,
                patientNum:null
            },
            timeData:new Date().Format("yyyy-MM-dd hh:mm")
        }
    },
    mounted () {
        this.initData();
    },
    methods: {
        initData(){
            get_all_num().then((res)=>{
                // console.log("dddddd",res)
                this.allData.abnormalNum = res.data.abnormalNum.abnormalNum;
                this.allData.bedNum = res.data.bedNum.bedNum;
                this.allData.hospitalNum = res.data.hospitalNum.hospitalNum;
                this.allData.patientNum = res.data.patientNum.patientNum;
            })
        }
    }
}
</script>