<template>
  <div class="PictureHome">
    <div id="ortho-box">
      <!-- 标题 -->
      <div class="main-title"  @click="thisArea($event)">
        <h1>陕西南泥湾国家湿地公园监测系统</h1>
        <svg @click="showExit" class="icon" style="width: 3em; height: 3em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1821"><path d="M608.188 557.902 434.715 557.902c-161.213 0-292.327 131.238-292.327 292.602l0 17.361c0 84.354 129.017 84.354 292.327 84.354l173.474 0c156.884 0 292.356 0 292.356-84.354l0-17.361C900.545 689.171 769.397 557.902 608.188 557.902L608.188 557.902zM512.785 535.569c127.658 0 231.524-104.015 231.524-231.894 0-127.873-103.866-231.895-231.524-231.895-127.654 0-231.53 104.044-231.53 231.9C281.255 431.526 385.131 535.569 512.785 535.569L512.785 535.569zM512.785 535.569" p-id="1822"></path></svg>
        <div class="user-options" v-show="displayExit">
          <h2><router-link to="/manage">管理中心</router-link></h2>
          <h2><router-link to="/">退出登录</router-link></h2>
        </div>
      </div>
      <!-- 天气 -->
      <div class="weather">
        <div class="same-day">
          <div class="same-day-top">
            <div class="weather-title">
              <h2>Weather</h2>
            </div>
            <div class="date">
              <img src="img/date.png" alt="">
              <p class="date-format">{{currentTime}}</p>
            </div>
          </div>
          <div class="same-day-middle">
            <div class="real-time-temperature"></div>
            <div class="region">
              <img class="region-icon" src="img/coordinate.png" alt="">
              <p class="region-name">南泥湾</p>
            </div>
          </div>
          <div class="same-day-bottom">
            <div class="weather-low"></div>
            <div class="weather-high"></div>
            <div class="weather-type"></div>
          </div>
        </div>
        <div class="forecast">
          <table>
            <tr class="table-forecast-date"></tr>
            <tr class="table-forecast-icon"></tr>
            <tr class="table-forecast-type"></tr>
          </table>
        </div>
      </div>
      <figure>
          <img src="img/pictureHome/mapPicture1.png" />
          
           <!-- 鸟类监测1 top=0.2581-->
          <section class="ortho-point" point-left="0.3575" point-top="0.0781" degree="30" radius="160" @click="openInfo(0)">
              <img class="right-top-high" src="img/pictureHome/right-top-high.png" />
              <img class="type-icon-high" src="img/pictureHome/position.png" />
              <div class="text-box-right">
                <img src="img/pictureHome/box-right-long.png">
                <p style="letter-spacing:0px">鸟类监测1</p>
              </div>
          </section>
          <div class="punctuation-content all-manage-station" v-show="positionContent[0].state" @mousedown="moveBox">
            <img src="img/pictureHome/position.png" alt="" class="punctuation">
            <img src="img/pictureHome/close.png" alt="" class="close"  @click="closeInfo(0)">
            <div class="punctuation-inner">
              <iframe src="http://120.253.72.183:10800/play.html?channel=24&iframe=yes&aspect=460x310'" width="100%" height="100%" allowfullscreen allow="autoplay" scrolling="no"></iframe>
              <!-- <iframe :src="'http://'+easyNVRip+'/play.html?channel=1&iframe=yes&aspect=460x310'" width="100%" height="100%" allowfullscreen allow="autoplay" scrolling="no"></iframe> -->
              <!-- <video src="img/bird.mp4" style="width:460px;height:310px" muted autoplay="autoplay" controls loop></video> -->
            </div>
          </div>
          
          <!-- 鸟类监测2 0.39416-->
          <section class="ortho-point" point-left="0.60395" point-top="0.24416" degree="45" radius="110" @click="openInfo(1)">
              <img class="right-top-line" src="img/pictureHome/right-top.png" />
              <img class="type-icon" src="img/pictureHome/position.png" />
              <div class="text-box-right1">
                <img src="img/pictureHome/box-right-short.png">
                <p>鸟类监测2</p>
              </div>
          </section>
          <div class="punctuation-content position-datai" v-show="positionContent[1].state" @mousedown="moveBox">
            <img src="img/pictureHome/position.png" alt="" class="punctuation">
            <img src="img/pictureHome/close.png" alt="" class="close" @click="closeInfo(1)">
            <div class="punctuation-inner">
              <iframe src="http://120.253.72.183:10800/play.html?channel=20&iframe=yes&aspect=460x310'" width="100%" height="100%" allowfullscreen allow="autoplay" scrolling="no"></iframe>
              <!-- <iframe :src="'http://'+easyNVRip+'/play.html?channel=2&iframe=yes&aspect=460x310'" width="100%" height="100%" allowfullscreen allow="autoplay" scrolling="no"></iframe> -->
              <!-- <video src="img/bird.mp4" style="width:460px;height:310px" muted autoplay="autoplay" controls loop></video> -->
            </div>
          </div>

          <!-- 鸟类监测3 0.3741-->
          <section class="ortho-point" point-left="0.35375" point-top="0.2241" degree="260" radius="288"  @click="openInfo(2)">
              <img class="left-toDown-line" src="img/pictureHome/right-top-high.png" />
              <img class="type-icon-leftDown" src="img/pictureHome/position.png" />
              <div class="text-box-left1">
                <img src="img/pictureHome/box-left-short.png">
                <p>鸟类监测3</p>
              </div>
          </section>
          <div class="punctuation-content position-wanzhang2" v-show="positionContent[2].state"  @mousedown="moveBox">
            <img src="img/pictureHome/position.png" alt="" class="punctuation">
            <img src="img/pictureHome/close.png" alt="" class="close" @click="closeInfo(2)">
            <div class="punctuation-inner">
              <iframe src="http://120.253.72.183:10800/play.html?channel=23&iframe=yes&aspect=460x310'" width="100%" height="100%" allowfullscreen allow="autoplay" scrolling="no"></iframe>
              <!-- <iframe :src="'http://'+easyNVRip+'/play.html?channel=3&iframe=yes&aspect=460x310'" width="100%" height="100%" allowfullscreen allow="autoplay" scrolling="no"></iframe> -->
              <!-- <video src="img/bird.mp4" style="width:460px;height:310px" muted autoplay="autoplay" controls loop></video> -->
            </div>
          </div>

          <!-- 鸟类监测4 0.3741-->
          <section class="ortho-point" point-left="0.35375" point-top="0.2241" degree="260" radius="288"  @click="openInfo(3)">
              <img class="left-toDown1-line" src="img/pictureHome/right-top-high.png" />
              <img class="type-icon1-leftDown" src="img/pictureHome/position.png" />
              <div class="text-box-left">
                <img src="img/pictureHome/box-left-short.png">
                <p>鸟类监测4</p>
              </div>
          </section>
          <div class="punctuation-content position-wanzhang" v-show="positionContent[3].state"  @mousedown="moveBox">
            <img src="img/pictureHome/position.png" alt="" class="punctuation">
            <img src="img/pictureHome/close.png" alt="" class="close" @click="closeInfo(3)">
            <div class="punctuation-inner">
              <iframe src="http://120.253.72.183:10800/play.html?channel=24&iframe=yes&aspect=460x310'" width="100%" height="100%" allowfullscreen allow="autoplay" scrolling="no"></iframe>
              <!-- <iframe :src="'http://'+easyNVRip+'/play.html?channel=3&iframe=yes&aspect=460x310'" width="100%" height="100%" allowfullscreen allow="autoplay" scrolling="no"></iframe> -->
              <!-- <video src="img/bird.mp4" style="width:460px;height:310px" muted autoplay="autoplay" controls loop></video> -->
            </div>
          </div>

          <!-- 水文水质 -->
          <!-- <section class="ortho-point" point-left="0.4825" point-top="0.40004" degree="275" radius="284" @click="openInfo(3)">
              <img class="left-line" src="img/pictureHome/line.png" />
              <img class="type-icon-leftLine" src="img/pictureHome/animal.png" />
              <div class="text-box-right">
                <img src="img/pictureHome/box-left.png">
                <p style="letter-spacing:0px">水文监测</p>
              </div>
          </section>
          <div class="punctuation-content animal-caichuangou" v-show="positionContent[3].state" @mousedown="moveBox">
            <img src="img/pictureHome/position.png" alt="" class="punctuation">
            <img src="img/pictureHome/close.png" alt="" class="close"  @click="closeInfo(3)">
            <div class="punctuation-inner">
              <p>水文监测</p>
              <span v-for="(item,index) in shuiwen" :key="index">{{item.name}}：{{item.value}}{{item.unit}}</span>
            </div>
          </div>
          <section class="ortho-point" point-left="0.4825" point-top="0.40004" degree="65" radius="64" @click="openInfo(4)">
              <img class="right-line" src="img/pictureHome/line.png" />
              <img class="type-icon-rightLine" src="img/pictureHome/grass.png" />
              <div class="text-box-right">
                <img src="img/pictureHome/box-right-long.png">
                <p style="letter-spacing:0px">水质监测</p>
              </div>
          </section>
          <div class="punctuation-content grass-caichuangou" v-show="positionContent[4].state" @mousedown="moveBox">
            <img src="img/pictureHome/position.png" alt="" class="punctuation">
            <img src="img/pictureHome/close.png" alt="" class="close"  @click="closeInfo(4)">
            <div class="punctuation-inner">
              <p>水质监测</p>
              <span v-for="(item,index) in shuizhi" :key="index">{{item.name}}：{{item.value}}{{item.unit}}</span>
            </div>
          </div>

           负氧离子监测
          <section class="ortho-point" point-left="0.81323" point-top="0.85745" degree="285" radius="300"  @click="openInfo(5)">
              <img class="left-toTop-line" src="img/pictureHome/rightToTop.png" />
              <img class="type-icon-left" src="img/pictureHome/all.png" />
              <div class="text-box-left">
                <img src="img/pictureHome/box-left-short.png">
                <p style="letter-spacing:0px">负氧离子监测</p>
              </div>
          </section>
          <div class="punctuation-content all-taoziwan" v-show="positionContent[5].state" @mousedown="moveBox">
            <img src="img/pictureHome/position.png" alt="" class="punctuation">
            <img src="img/pictureHome/close.png" alt="" class="close"  @click="closeInfo(5)">
            <div class="punctuation-inner">
              <p>负氧离子监测</p>
              <span v-for="(item,index) in fuyang" :key="index">{{item.name}}：{{item.value}}{{item.unit}}</span>
            </div>
          </div>
          
         
          大气+气象+土壤
          <section class="ortho-point" point-left="0.3575" point-top="0.0988" degree="254" radius="229" @click="openInfo(6)">
              <img class="vertical-leftDown" src="img/pictureHome/40.png" />
              <img class="type-icon-vertical-leftDown" src="img/pictureHome/soil.png" />
              <div class="text-box-right">
                <img src="img/pictureHome/box-left.png">
                <p style="letter-spacing:0px">土壤监测</p>
              </div>
          </section>
          <div class="punctuation-content soil-machang-manage" v-show="positionContent[6].state" @mousedown="moveBox">
            <img src="img/pictureHome/position.png" alt="" class="punctuation">
            <img src="img/pictureHome/close.png" alt="" class="close"  @click="closeInfo(6)">
            <div class="punctuation-inner">
              <p>土壤监测</p>
              <span v-for="(item,index) in turang" :key="index">{{item.name}}：{{item.value}}{{item.unit}}</span>
            </div>
          </div>
          <section class="ortho-point" point-left="0.3575" point-top="0.0988" degree="243" radius="246" @click="openInfo(7)">
              <img class="vertical-leftDown-90" src="img/pictureHome/90.png" />
              <img class="type-icon-vertical-leftDown-90" src="img/pictureHome/weather.png" />
              <div class="text-box-right">
                <img src="img/pictureHome/box-left.png">
                <p style="letter-spacing:0px">气象监测</p>
              </div>
          </section>
          <div class="punctuation-content weather-machang-manage" v-show="positionContent[7].state" @mousedown="moveBox">
            <img src="img/pictureHome/position.png" alt="" class="punctuation">
            <img src="img/pictureHome/close.png" alt="" class="close"  @click="closeInfo(7)">
            <div class="punctuation-inner">
              <p>气象监测</p>
              <span v-for="(item,index) in qixiang" :key="index">{{item.name}}：{{item.value}}{{item.unit}}</span>
            </div>
          </div>
          <section class="ortho-point" point-left="0.3575" point-top="0.0988" degree="233" radius="275" @click="openInfo(8)">
              <img class="vertical-leftDown-140" src="img/pictureHome/140.png" />
              <img class="type-icon-vertical-leftDown-140" src="img/pictureHome/atmos.png" />
              <div class="text-box-right">
                <img src="img/pictureHome/box-left.png">
                <p style="letter-spacing:0px">大气监测</p>
              </div>
          </section>
          <div class="punctuation-content atmos-machang-manage" v-show="positionContent[8].state" @mousedown="moveBox">
            <img src="img/pictureHome/position.png" alt="" class="punctuation">
            <img src="img/pictureHome/close.png" alt="" class="close"  @click="closeInfo(8)">
            <div class="punctuation-inner">
              <p>大气监测</p>
              <span v-for="(item,index) in daqi" :key="index">{{item.name}}：{{item.value}}{{item.unit}}</span>
            </div>
          </div> -->


      </figure>
    </div>
  </div>
</template>
<script>
import {getEcologicalData} from '@/api/axiosApi.js'
export default {
  data(){
    return{
      displayExit:false,
      currentTime:'',
      positionContent:[
        {state:false},//鸟类1监测0
        {state:false},//鸟类2监测1
        {state:false},//鸟类3监测2
        {state:false},//水文3
        {state:false},//水质4
        {state:false},//负氧离子5
        {state:false},//土壤6
        {state:false},//气象7
        {state:false},//大气8
      ],//控制点位对应的内容框显示
      daqi:[],
      qixiang:[],
      turang:[],
      shuiwen:[],
      shuizhi:[],
      fuyang:[],
      easyNVRip:'192.168.20.222:10800'
    }
  },
  methods:{
    getEcoData(id){
      let data={id:id};
			let arr=[];
			getEcologicalData(data).then(res=>{
				console.log(res.data);
				// if(res.data==[]){
				// 	$(".ecological .realtime-data-box").html("<p>该点位无数据</p>")
				// }
				for(let i=0;i<res.data.length;i++){
					arr[i]={};
					arr[i].name=res.data[i].sensor_desc;
					arr[i].value=res.data[i].value;
					arr[i].aveValue=res.data[i].daily_avg;
					arr[i].unit=res.data[i].unit;
					
        }
        // console.log(arr);
        if(id=="C0001"){
          this.shuiwen=arr;
        }else if(id=="C0002"){
          this.shuizhi=arr;
        }else if(id=="C0003"){
          ////////将负氧离子筛选出来
          let fuyangBox=[];
          for(let i=0;i<arr.length;i++){
            if(arr[i].name=="负氧离子"){
              fuyangBox.push(arr[i])
            }
          };
          console.log(fuyangBox);
          this.fuyang=fuyangBox;
          ///////////////////////////////
          for(let i=0;i<arr.length;i++){
            if(arr[i].name=="负氧离子"){
              arr.splice(i,1);
            }
          }
          this.daqi=arr;
        }else if(id=="C0004"){
          this.qixiang=arr;
        }else{
          this.turang=arr;
        }
				
			});
    },
    showExit(){
      this.displayExit=!this.displayExit;
    },
    //设置弹窗时。点击任何区域均可关闭
    allArea() {
      this.$set(this, 'displayExit', false)
      //全局区域内点击时isdisplay均为true
    },
    thisArea(event) {
      event.stopPropagation() //此区域不受上面方法的影响
    },
    //获取当前时间
    writeCurrentDate() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth();//得到月份
      var date = now.getDate();//得到日期
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      var time = "";
      time = year + "年" + month + "月" + date + "日" ;
      this.currentTime=time;
    },
    getWeather(){
      /* 获取天气 */
      $.get("http://wthrcdn.etouch.cn/weather_mini?city=延安", function (data) {
        var info = data.data;
        var today = info.forecast[0];
        var timeTemperature = Math.round((parseInt(today.low.slice(3,-1)) + parseInt(today.high.slice(3,-1)))/2);
        $(".real-time-temperature").html(timeTemperature + "℃")
        $(".weather-low").html(today.low);
        $(".weather-high").html(today.high);
        $(".weather-type").html(today.type);
        var forecast = info.forecast;
        for (var i = 0; i < forecast.length; i++) {
          $(".table-forecast-date").append("<td>" + forecast[i].date + "</td>");
          $(".table-forecast-icon").append("<td>" + forecast[i].type + "</td>");
          $(".table-forecast-type").append("<td>" + forecast[i].type + "</td>");
        }
        $(".table-forecast-icon").find("td").each(function () {
          if($(this).html() == "晴") {
            $(this).html('<img src="img/sunny-day.png" alt="">');
          }else if($(this).html() == "多云") {
            $(this).html('<img src="img/partly-cloudy.png" alt="">');
          }else if($(this).html() == "阴") {
            $(this).html('<img src="img/cloudy-day.png" alt="">');
          }else if($(this).html() == "小雨") {
            $(this).html('<img src="img/light-rain.png" alt="">');
          }else if($(this).html() == "中雨") {
            $(this).html('<img src="img/rain.png" alt="">');
          }else if($(this).html() == "大雨") {
            $(this).html('<img src="img/heavy-rain.png" alt="">');
          }else if($(this).html() == "暴雨") {
            $(this).html('<img src="img/rainstorm.png" alt="">');
          }else if($(this).html() == "阵雨") {
            $(this).html('<img src="img/shower.png" alt="">');
          }else if($(this).html() == "雷阵雨") {
            $(this).html('<img src="img/thunder-shower.png" alt="">');
          }else if($(this).html() == "小雪") {
            $(this).html('<img src="img/light-snow.png" alt="">');
          }else if($(this).html() == "中雪") {
            $(this).html('<img src="img/medium-snow.png" alt="">');
          }else if($(this).html() == "大雪") {
            $(this).html('<img src="img/heavy-snow.png" alt="">');
          }else if($(this).html() == "雨夹雪") {
            $(this).html('<img src="img/sleet.png" alt="">');
          }
        });
      }, "json");
    },
    openInfo(id){
      //alert('11111111');
      this.positionContent[id].state=true;
    },
    closeInfo(id){
      this.positionContent[id].state=false;
    },
    moveBox(e){
      e.preventDefault();
      let odiv = e.target;    //获取目标元素
       
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e)=>{    //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        
        let left = e.clientX - disX;  
        let top = e.clientY - disY;
          
        //移动当前元素
        odiv.style.left = left + 'px';
        odiv.style.top = top + 'px';
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      
    }
  },
  created(){
    this.writeCurrentDate();
    this.getEcoData("C0001");
    this.getEcoData("C0002");
    this.getEcoData("C0003");
    this.getEcoData("C0004");
    this.getEcoData("C0005");
  },
  mounted(){
    this.getWeather();
    $(() => {
        //alert($(window).height());
        if($(window).height()==1080){
          $.ortho({'boxWidth': 1920, 'boxHeight': 1080, 'maxEdge': 5000, 'imgWidth': 1920, 'imgHeight': 2994});
        }else{
          $.ortho({'boxWidth': 1920, 'boxHeight': 969, 'maxEdge': 5000, 'imgWidth': 1920, 'imgHeight': 2994});
        }
        
        
    });
  }
}
</script>
<style>
.PictureHome{
  width: 100%;
  height: 100%;
  position: fixed;
}
.main-title{
  position: absolute;
  width:100%;
  height:10%;
  background:rgba(34,61,90,0.6);
  z-index: 1;
}
.main-title h1{
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#fff;
  letter-spacing: 3px;
  font-size:2.5rem;
  font-weight:400;
}
.main-title svg{
  position:absolute;
  top:0px;
  bottom:0;
  margin:auto;
  right:0px;
  cursor: pointer;
}

.main-title .user-options{
  position:absolute;
  bottom:-100px;
  right:0px;
  background:rgba(34,61,90,0.6);
  width:10%;
  height:100px;
}
.main-title .user-options h2{
  height:50%;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.main-title .user-options h2:hover{
  background:rgba(34,61,90,0.7);
}
.main-title .user-options h2:hover a{
  color:#fff;
}
.main-title .user-options h2 a{
  color:#ccc;
}

/* 天气预报样式 */
.same-day-top,
.same-day-middle,
.same-day-bottom {
  display: flex;
  justify-content: space-between;
}
.weather {
  position:absolute;
  width: 25%;
  color: #fff;
  top: 10%;
  left: 3%;
  z-index:1;
}
.weather h2 {
  font-size: 34px;
}
.same-day-top {
  margin-bottom: 8px;
}
.same-day-top .date {
  text-align: right;
}
.same-day-top .date p {
  margin-top: 20px;
}
.real-time-temperature {
  font-size: 80px;
  color: #08fcf8;
}
.region {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.region-icon {
  width: 15px;
  margin: 10px auto;
}
.same-day-bottom {
  margin: 26px 0px 16px;
}
.forecast table{
	width:100%;
}
.forecast table td {
  padding-right: 10px;
  padding-top: 14px;
  text-align: center;
}
.forecast table td img {
	width: 50px;
}
.table-forecast-date,
.table-forecast-type {
  color: #08fcf8;
}


/* 点位 */
#ortho-box {
    overflow: hidden;
    background-color: black; 
}

#ortho-box>figure {
    /*width: 100%;
    height: 100%;*/
    position: relative;
}

#ortho-box>figure>img {
    width: 100%;
    height: 70%;
}

#ortho-box .ortho-point {
    position: absolute;
}

#ortho-box .ortho-point p {
    cursor: pointer;
}

#ortho-box .ortho-point .text-box-right{
  position:relative;
  top: 93px;
  left: 26px;
}
#ortho-box .ortho-point .text-box-right1{
  position:relative;
  top: -524px;
  left: -8px;
}
#ortho-box .ortho-point .text-box-left{
  position:relative;
  top: 1067px;
  left: 213px;
}
#ortho-box .ortho-point .text-box-left1{
  position:relative;
  top: 49px;
  left: 694px;
}

#ortho-box .ortho-point .text-box-right p{
  position: absolute;
  top:0px;
  left:0px;
  font-size:20px;
  font-weight: 700;
  color:#1a4d20;
  letter-spacing: 2px;
  width:100%;
  text-align: center;
  line-height: 45px;
}
#ortho-box .ortho-point .text-box-right1 p{
  position: absolute;
  top:0px;
  left:0px;
  font-size:20px;
  font-weight: 700;
  color:#1a4d20;
  letter-spacing: 2px;
  width:100%;
  text-align: center;
  line-height: 45px;
}
#ortho-box .ortho-point .text-box-left p{
  position: absolute;
  top:0px;
  left:0px;
  font-size:20px;
  font-weight: 700;
  color:#1a4d20;
  letter-spacing: 2px;
  width:100%;
  text-align: center;
  line-height: 45px;
}
#ortho-box .ortho-point .text-box-left1 p{
  position: absolute;
  top:0px;
  left:0px;
  font-size:20px;
  font-weight: 700;
  color:#1a4d20;
  letter-spacing: 2px;
  width:100%;
  text-align: center;
  line-height: 45px;
}


#ortho-box .ortho-point>img:nth-of-type(1) {
    position: absolute;
}

#ortho-box .ortho-point>img:nth-of-type(2) {
    width: 50px;
    height: 50px;
    position: absolute;
}

#ortho-box .ortho-point .right-top-line{
    left: -58px;
    top: -573px;
}
#ortho-box .ortho-point .type-icon{
  left: -108px;top: -595px;
}

/*管理站瞭望塔*/
#ortho-box .ortho-point .right-top-high{
  left:256px;top:20px; 
}
#ortho-box .ortho-point .type-icon-high{
  left:320px;top:-8px;
}

#ortho-box .ortho-point .left-toTop-line{
  left:197px;top:28px;transform:rotateY(180deg);
}
#ortho-box .ortho-point .type-icon-left{
  left:262px;top:50px; 
}

#ortho-box .ortho-point .left-toDown-line{
    left: 625px;
    top: 75px;
}
#ortho-box .ortho-point .left-toDown1-line{
    left: 160px;
    top: 1090px;
}
#ortho-box .ortho-point .type-icon-leftDown{
    left: 601px;
    top: 175px; 
}
#ortho-box .ortho-point .type-icon1-leftDown{
    left: 137px;
    top: 1189px;
}

/*蔡川沟野生动物*/
#ortho-box .ortho-point .left-line{
  left:221px;top:20px; 
}
#ortho-box .ortho-point .type-icon-leftLine{
  left:259px;top:-4px;
}
/*蔡川沟植物样方*/
#ortho-box .ortho-point .right-line{
  left:-39px;top:20px; 
}
#ortho-box .ortho-point .type-icon-rightLine{
  left:-87px;top:-4px;
}
/*蔡川沟虫情*/
#ortho-box .ortho-point .left-high{
  left:220px;top:-161px; 
}
#ortho-box .ortho-point .type-icon-leftHigh{
  left:254px;top:-187px;
}
/*蔡川沟土壤*/
#ortho-box .ortho-point .right-high{
  left:-40px;top:-161px; 
}
#ortho-box .ortho-point .type-icon-rightHigh{
  left:-82px;top:-187px;
}
/*马场中继植物样方*/
#ortho-box .ortho-point .vertical-line{
  left:0px;top:-40px; 
}
#ortho-box .ortho-point .type-icon-vertical{
  left:-25px;top:-87px;
}
/*马场中继虫情*/
#ortho-box .ortho-point .vertical-line-90{
  left:0px;top:-90px; 
}
#ortho-box .ortho-point .type-icon-vertical-90{
  left:-25px;top:-137px;
}
/*马场中继土壤*/
#ortho-box .ortho-point .vertical-line-140{
  left:0px;top:-140px; 
}
#ortho-box .ortho-point .type-icon-vertical-140{
  left:-25px;top:-187px;
}
/*马场管理站野生动物*/
#ortho-box .ortho-point .vertical-leftTop{
  left:220px;top:43px; 
}
#ortho-box .ortho-point .type-icon-vertical-leftTop{
  left:195px;top:80px;
}
/*马场管理站植物样方*/
#ortho-box .ortho-point .vertical-leftTop-90{
  left:220px;top:43px; 
}
#ortho-box .ortho-point .type-icon-vertical-leftTop-90{
  left:195px;top:130px;
}
/*马场管理站虫情*/
#ortho-box .ortho-point .vertical-leftTop-90{
  left:220px;top:43px; 
}
#ortho-box .ortho-point .type-icon-vertical-leftTop-140{
  left:195px;top:180px;
}
/*马场管理站土壤*/
#ortho-box .ortho-point .vertical-leftDown{
  left:220px;top:-39px; 
}
#ortho-box .ortho-point .type-icon-vertical-leftDown{
  left:195px;top:-88px;
}
/*马场管理站气象*/
#ortho-box .ortho-point .vertical-leftDown-90{
  left:220px;top:-89px; 
}
#ortho-box .ortho-point .type-icon-vertical-leftDown-90{
  left:195px;top:-138px;
}
/*马场管理站大气*/
#ortho-box .ortho-point .vertical-leftDown-140{
  left:220px;top:-139px; 
}
#ortho-box .ortho-point .type-icon-vertical-leftDown-140{
  left:195px;top:-188px;
}


.punctuation-content {
  position:absolute;
  width: 500px;
  height: 350px;
  background: url("../../public/img/punctuation-cont-box.png") no-repeat;
  background-size: 100% 100%;
  padding: 20px;
  box-sizing: border-box;
  /* display: none; */
  z-index: 1;
  cursor: move;
  /* top:0px; */
}
.punctuation-content > img {
  position: absolute;
  top: -20px;
}
.position-datai {
  left: 63%;
  top: 5.5%;
}
.position-wanzhang {
  left: 42%;
  top: 55%;
}
.position-wanzhang2 {
  left: 67%;
  top: 23%;
}
.position-heiwatai {
  left: 1%;
  top: 50%;
}
.position-xiaochacun {
  left: 73%;
  top: 35%;
}
.position-tangjiaping {
  left: 73%;
  top: 28%;
}
.position-xintang {
  left: 73%;
  top: 3%;
}
.position-guanting {
  left: 73%;
  top: 79%;
}
.all-guanting {
  left: 73%;
  top: 57%;
}
.all-manage-station {
  left: 34%;
  top: 7.5%;
}
.all-taoziwan {
  left: 40%;
  top: 80%;
}
.animal-xintanggou{
  left:73%;
  top:10%;
}
.animal-caichuangou{
  left:20%;
  top:42%;
}
.grass-caichuangou{
  left:52%;
  top:42%;
}
.worm-caichuangou{
  left:27%;
  top:57%;
}
.soil-caichuangou{
  left:52%;
  top:57%;
}
.grass-machang{
  left:52%;
  top:6%;
}
.worm-machang{
  left:52%;
  top:20%;
}
.soil-machang{
  left:52%;
  top:35%;
}
.animal-machang-manage{
  left:18%;
  top:35%;
}
.grass-machang-manage{
  left:18%;
  top:22%;
}
.worm-machang-manage{
  left:18%;
  top:6%;
}
.soil-machang-manage{
  left:0%;
  top:11%;
}
.weather-machang-manage{
  left:40%;
  top:11%;
}
.atmos-machang-manage{
  left:0%;
  top:23%;
}
img.punctuation {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
.close {
  width: 43px;
  height: 43px;
  right: 10px;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0px 0px 13px #fff;
}
.punctuation-inner {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  box-sizing: border-box;
  overflow: hidden;
  background: url(../../public/img/box-bg.png) no-repeat;
  background-size: 100% 100%;
}
.punctuation-inner p{
  text-align: center;
  font-size:1.5rem;
  color:#000;
  padding:10px 0px;
}
.punctuation-inner span{
  color:#000;
  display: inline-block;
  width:50%;
  line-height: 40px;
  padding-left:20px;
}
</style>
