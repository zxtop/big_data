<template>
  <div class="y_top">
    <div class="arightboxtop" :style="bg">
      <h2 class="tith2">实时入院出院监控</h2>

      <div class="lefttoday_tit" style="border-bottom: 1px solid #03808c;">
        <p class="fl">状态：已调节</p>
        <p class="fr">{{`时间：`+timeData}}</p>
      </div>

      <div class="left2_table">

        <ul v-if="patientData.length>0">
          <li class="bg" v-for="item in patientData" :key="item.id">
            <div :class="[item.outTime?'out_holtel':'in_holtel']">{{item.outTime?'已出院':'已入院'}}</div>
            <p>
              <span>医院：</span>
              {{item.hospitalName}}
            </p>
            <p>
              <b>姓名：</b>
              <span>{{item.patientName}}</span>
              <br />
              <b>身份证：</b>
              <span>{{item.patientCardId}}</span>
              <br />
              <b>病床号：</b>
              <span>{{item.bedName}}</span>
              <br />
              <b>{{item.outTime?'出院时间：':'入院时间：'}}</b>
              <span>{{item.outTime?formatTime(item.outTime):formatTime(item.inTime)}}</span>
            </p>
          </li>
        </ul>

        <div v-else class="none_people">
          <p style="text-align:center;padding-top:40px;line-height:20px;color:#ccc">
            暂无实时入住和出院信息!
            <br />尝试操作入住病人或出院病人操作
          </p>

          <li class="bg">
            <div class="in_holtel">已入院</div>
            <p>
              <span>医院：</span>胡集医院
            </p>
            <p>
              <b>姓名：</b>
              <span>林某某</span>
              <br />
              <b>身份证：</b>
              <span>370827199202063266</span>
              <br />
              <b>病床号：</b>
              <span>1B054病床</span>
              <br />
              <b>入院时间：</b>
              <span>2020-08-04 10:08:58</span>
            </p>
          </li>
          
          <li class="bg">
            <div class="out_holtel">已出院</div>
            <p>
              <span>医院：</span>胡集医院
            </p>
            <p>
              <b>姓名：</b>
              <span>许某某</span>
              <br />
              <b>身份证：</b>
              <span>370827199202063266</span>
              <br />
              <b>病床号：</b>
              <span>1B054病床</span>
              <br />
              <b>入院时间：</b>
              <span>2020-08-04 10:08:58</span>
            </p>
          </li>

        </div>

      </div>
      
    </div>
  </div>
</template>
<script>
Date.prototype.Format = function (fmt) {
  // author: meizz
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
export default {
  data() {
    return {
      bg: {
        backgroundImage:
          "url(" + require("../../static/images/arightboxtop.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      msg: null,
      value: true,
      subData: ["/zhyb/patient/in", "/zhyb/patient/out"],
      patientData: [],
      timeData: new Date().Format("yyyy-MM-dd hh:mm"),
    };
  },
  mounted() {
    let _that = this;
    let mqtt = require("mqtt");
    let client = {};
    //开启mqtt链接
    client = mqtt.connect("ws://iot.renbojiaoyu.com/mqtt", {
      port: 30109,
      clientId: "test",
      username: "RenboIot",
      password: "123456",
      clean: false,
    });
    console.log(client, "======================");
    //订阅后端给你发的字段 在on里面接收

    client.on("connect", function () {
      for (var i = 0; i < _that.subData.length; i++) {
        console.log("订阅第" + i + "个主题");
        console.log(_that.subData[i]);
        client.subscribe(_that.subData[i], function (err) {
          if (!err) {
            console.log(err, "订阅成功");
          } else {
            console.log(err, "订阅错误");
          }
        });
      }
    });

    //接收消息
    client.on("message", (topic, message) => {
      if (topic === "/zhyb/patient/in") {
        let obj = JSON.parse(message.toString());
        // console.log(obj,"in接受消息。。。",obj.inTime);
        this.patientData.push(obj);
      }

      if (topic === "/zhyb/patient/out") {
        // console.log(message.toString(),"outtttt")
        let obj = JSON.parse(message.toString());
        // console.log(obj,"out接受消息。。。");
        this.patientData.push(obj);
      }
      if (this.patientData.length > 0) {
        this.patientData.reverse();
        this.patientData.map((item, index) => {
          item.id = index;
        });
      }
    });

    //连接断开
    // client.end()
  },
  methods: {
    formatTime(num) {
      var date = new Date(num);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
      // console.log(Y+M+D+h+m+s);
    },
  },
};
</script>