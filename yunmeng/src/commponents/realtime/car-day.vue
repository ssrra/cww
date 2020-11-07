<template>
  <div class="people">
      <div class="nav">
      <h1>道路卡口-车流统计</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div class="left">
        <div class="img" >
          <!-- 卡口选择框 -->
          <div class="choose-position">
            <div class="divInput">
              <div class="input" @click="openValue">
                <input v-model="value" type="text" :placeholder="tableData[0].name" readonly>
                <img src="../../assets/icon/arrow.png" alt="">
              </div>
              <div class="option-list" v-show="show">
                <ul>
                  <li @click="getvalue(index,item)" v-for="(item,index) in tableData" :key="item.index">{{ item.name }}</li>
                </ul>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="car-video-box  animated fadeIn">
            <img :src="imgPath" alt="">
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 实时数据 -->
        <div class="realtime">
          <h3>实时数据</h3>
          <ul class="listone">
            <li><h4>进入</h4></li>
            <li><h4>离开</h4></li>
            <li><img src="../../assets/image/in.png" alt=""></li>
            <li><img src="../../assets/image/out.png" alt=""></li>
            <li><h5>进入总数：{{this.leaveList[0]+this.leaveList[1]+this.leaveList[2]+this.leaveList[3]}}（辆）</h5></li>
            <li><h5>离开总数：{{this.enterList[0]+this.enterList[1]+this.enterList[2]+this.enterList[3]}}（辆）</h5></li>
          </ul>
          <ul class="listtwo">
            <li>{{this.leaveList[0]}}</li>
            <li>{{this.leaveList[1]}}</li>
            <li>{{this.leaveList[2]}}</li>
            <li>{{this.leaveList[3]}}</li>
          </ul>
          <ul class="listthree">
            <li>{{this.enterList[0]}}</li>
            <li>{{this.enterList[1]}}</li>
            <li>{{this.enterList[2]}}</li>
            <li>{{this.enterList[3]}}</li>
          </ul>
        </div>
        <!-- 车流数据统计 -->
        <div class="peopledata">
          <h3>车流数据统计</h3>
          <div class="block">
            <el-date-picker
             @change="getCarDay()"
              class="choosedate"
              v-model="date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
          <div class="peopledata-box">
            <!-- 车流数据统计图 -->
            <div id="main1"></div>
            <div id="main2"></div>
            <div id="main3"></div>
            <div id="main4"></div>
          </div>
          <div class="tooplist">
            <div class="tooplist1"></div>
            <div class="tooplist2"></div>
          </div>
          <div class="span1">
            <span>进入</span>
            <span>离开</span>
          </div>
        </div>
        <!-- 月/年季车流数量统计 -->
        <div class="peopledataecharts">
          <h3>月/年度车流数量统计</h3>
          <!-- 月度 -->
          <el-radio-group  class="choose" v-model="radio" size="small">
            <el-radio-button label="月度"></el-radio-button>
            <router-link to="/realtime/car-year"><el-radio-button label="年度"></el-radio-button></router-link>
          </el-radio-group>
          <div id="main"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCarDataYear,getCarDataMonth,getCarDataDay,getCarDataDayIn,getCarDataDayOut} from '../../api/axiosApi.js'
export default {
  data(){
    return{
      radio: '月度',
      camera: '1',         // 监测点位
      year: '2019',            // 年份
      month: '09',           // 月份
      date: '2019-09-21',            // 当前日期

      InQuantityDay: '',   // 每天进入车辆总数
      OutQuantityDay: '',  // 每天离开车辆总数
      Id: '',              // 当天id

      carIn: '',           // 当天进入轿车类型
      truckIn: '',         // 当天进入卡车类型
      busIn: '',           // 当天进入大巴类型
      motorbikeIn: '',     // 当天进入摩托车类型

      carOut: '',          // 当天离开轿车类型
      truckOut: '',        // 当天离开卡车类型
      busOut: '',          // 当天离开大巴类型
      motorbikeOut: '',    // 当天离开摩托车类型

      carInNum: '',        // 当天轿车进入数量
      truckInNum: '',      // 当天卡车进入数量
      busInNum: '',        // 当天大巴进入数量
      motorbikeInNum: '',  // 当天摩托车进入数量

      carOutNum: '',       // 当天轿车离开数量
      truckOutNum: '',     // 当天卡车离开数量
      busOutNum: '',       // 当天大巴离开数量
      motorbikeOutNum: '',  // 当天摩托离开入数量

      tableData:[
        {'name':'卡口1'},
        {'name':'卡口2'},
      ],                    //卡口数量名称
      show:false,           //控制input框选项的显示
      pNum:0,
      value:'',
      wsList:[null,null],   //websocket
      socketList:[{ws:'ws://192.168.20.104:8124'},{ws:'ws://192.168.20.104:8124'}],
      imgPath:'',
      leaveList:[0,0,0,0],  //进入车辆实时列表
      enterList:[0,0,0,0],  //离开车辆实时列表
    }
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },

    //获得当前时间所属年月
    getMonthNow(){
      let obj=new Date();
      let month=obj.getMonth();
      if(month+1<=9){
        month='0'+(month+1);
      }else{
        month=month+1
      }
      let day=obj.getDate();
      if(day<10){
        day='0'+day;
      }
      let date=obj.getFullYear()+'-'+month+'-'+day;
      let monthNow=month;
      let year=obj.getFullYear();
      // this.date=date;

    },

    //
    openValue(){
      this.show=!this.show;
    },
    getvalue(index,item){
      this.value=item.name;
      this.show=false;
      this.pNum=index;
      //console.log(this.pNum);
      for(let i=0;i<this.wsList.length;i++){
        if(this.wsList[i]!=null){
          this.wsList[i].close();
        }
      }
      if(this.pNum>=6){
        this.pNum=5;
        this.setWebSocket();
      }else{
        this.setWebSocket();
      }
      
    },
    setWebSocket(){
      let cNum=this.pNum;
      this.wsList[cNum] = new WebSocket(this.socketList[cNum]['ws'])
      this.wsList[cNum].onopen = () => {
        // Web Socket 已连接上，使用 send() 方法发送数据
        for(let i=0;i<this.wsList.length;i++){
          if(i==cNum){
            continue;
          }else{
            if(this.wsList[i]!=null){
              this.wsList[i].close();
            }
          }
        }
        // console.log('客户端WebSocket已启动');
        this.wsList[cNum].send("JS has connected!");
      };
      this.wsList[cNum].onmessage = e => {
          // console.log(JSON.parse(e.data));
          let data=JSON.parse(e.data);
          this.imgPath='data:image/jpeg;base64,'+data.image;
          for(let i=0;i<data.in.length-1;i++){

            this.enterList[0]=data.in[0];
            this.enterList[1]=data.in[1];
            this.enterList[2]=data.in[2];
            this.enterList[3]=data.in[3];

            this.leaveList[0]=data.out[0];
            this.leaveList[1]=data.out[1];
            this.leaveList[2]=data.out[2];
            this.leaveList[3]=data.out[3];
      
          }
         
      };
      this.wsList[cNum].onerror = function(error) {
          console.log('error :' + error.name + error.number);
      };
    
    },

    // 当日车流量总数
    getCarDay(){
      let data={date:this.date};
      // console.log(this.date)
      getCarDataDay(data).then(res=>{
          // console.log(res.data)
          for(let i=0; i<res.data.length; i++){
            this.InQuantityDay = res.data[i].trafficInQuantity;
            this.OutQuantityDay = res.data[i].trafficOutQuantity;
            this.Id = res.data[i].trafficId;
          }
          // 当日进入的车的种类以及数量
          let data={trafficId:this.Id};
          getCarDataDayIn(data).then(res=>{
              // console.log(res.data)
              // 车辆种类
              this.carIn = res.data[0].carType;                // 轿车
              this.truckIn = res.data[1].carType;              // 卡车
              this.busIn = res.data[2].carType;                // 大巴
              this.motorbikeIn = res.data[3].carType;          // 摩托车
              // 车辆进入数量
              this.carInNum = res.data[0].carQuantity;         // 轿车
              this.truckInNum = res.data[1].carQuantity;       // 卡车
              this.busInNum = res.data[2].carQuantity;         // 大巴
              this.motorbikeInNum = res.data[3].carQuantity;   // 摩托车
              this.drawChartDayOne();
              this.drawChartDayTwo();
              this.drawChartDayThree();
              this.drawChartDayFour();
          }),
          // 当日离开的车的种类以及数量
          getCarDataDayOut(data).then(res=>{
              // console.log(res.data)
              // 车辆种类
              this.carOut = res.data[0].carType;                // 轿车
              this.truckOut = res.data[1].carType;              // 卡车
              this.busOut = res.data[2].carType;                // 大巴
              this.motorbikeOut = res.data[3].carType;          // 摩托车
              // 车辆离开数量
              this.carOutNum = res.data[0].carQuantity;         // 轿车
              this.truckOutNum = res.data[1].carQuantity;       // 卡车
              this.busOutNum = res.data[2].carQuantity;         // 大巴
              this.motorbikeOutNum = res.data[3].carQuantity;   // 摩托车
              this.drawChartDayOne();
              this.drawChartDayTwo();
              this.drawChartDayThree();
              this.drawChartDayFour();
          })
      })
    },

    // 车流数据统计图--轿车
    drawChartDayOne(){
        let myChart = this.$echarts.init(document.getElementById("main1"));
        let option = {
            title: {
                text: '轿车',
                padding: [150,0,0,60],
                textStyle:{
                            fontSize: 15,
                            color: 'black'
                        },
              },
            series: [
                {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: this.carInNum, name: this.carInNum,itemStyle:{
                          color:'#31c7f1'
                        }},
                        {value: this.carOutNum, name: this.carOutNum,itemStyle:{
                          color:'#fb8b7f'
                        }},
                    ]
                }
            ]
        };
        myChart.setOption(option);
    },

    // 车流数据统计图--卡车
    drawChartDayTwo(){
        let myChart = this.$echarts.init(document.getElementById("main2"));
        let option = {
            title: {
                text: '卡车',
                padding: [150,0,0,60],
                textStyle:{
                            fontSize: 15,
                            color: 'black'
                        },
              },
            series: [
                {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: this.truckInNum, name: this.truckInNum,itemStyle:{
                          color:'#31c7f1'
                        }},
                        {value: this.truckOutNum, name: this.truckOutNum,itemStyle:{
                          color:'#fb8b7f'
                        }},
                    ]
                }
            ]
        };
        myChart.setOption(option);
    },

    // 车流数据统计图--大巴
    drawChartDayThree(){
        let myChart = this.$echarts.init(document.getElementById("main3"));
        let option = {
            title: {
                text: '大巴',
                padding: [150,0,0,60],
                textStyle:{
                            fontSize: 15,
                            color: 'black'
                        },
              },
            series: [
                {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                      {
                        value: this.busInNum, 
                        name: this.busInNum,
                        itemStyle:{
                          color:'#31c7f1'
                        }
                      },
                      {
                        value: this.busOutNum,
                        name: this.busOutNum,
                        itemStyle:{
                          color:'#fb8b7f'
                        }
                      }
                    ]
                }
            ]
        };
        myChart.setOption(option);
    },

    // 车流数据统计图--摩托车
    drawChartDayFour(){
        let myChart = this.$echarts.init(document.getElementById("main4"));
        let option = {
            title: {
                text: '摩托车',
                padding: [150,0,0,60],
                textStyle:{
                            fontSize: 15,
                            color: 'black'
                        },
              },
            series: [
                {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                      {
                        value: this.motorbikeInNum, 
                        name: this.motorbikeInNum,
                        itemStyle:{
                          color:'#31c7f1'
                        }
                      },
                      {
                        value: this.motorbikeOutNum, 
                        name: this.motorbikeOutNum,
                        itemStyle:{
                          color:'#fb8b7f'
                        }
                      },
                    ]
                }
            ]
        };
        myChart.setOption(option);
    },

    // 月度车流数据统计图
    drawChartMonth(){
      let data={traffic_number:this.camera, traffic_year:this.year, traffic_month:this.month};
      console.log(this.month)
      getCarDataMonth(data).then(res=>{
        // console.log(res.data)
        this.InQuantity = []; // 每月进入车辆总数
        this.Time = [];       // 日期
        this.Quantity = [];   // 每月离开车辆总数
        for(let i=0; i<res.data.length; i++){
          this.InQuantity.push(res.data[i].trafficInQuantity);
          this.Time.push(i+1);
          this.Quantity.push(res.data[i].trafficOutQuantity);
        }
        let myChart = this.$echarts.init(document.getElementById("main"));
        let option = {
          legend:{
              data:['进入','离开'],
              right:'10%',
              top:'5%'
            },
            xAxis: {
                name:"日期",
                type: 'category',
                data: this.Time
            },
            yAxis: {
                name:"车辆总数",
                type: 'value'
            },
            series: [
              {
                name: '进入',
                data: this.InQuantity,
                type: 'line',
                lineStyle: {
                  color: 'orange',
                  width: 1
                },
                areaStyle: {
                  color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                        offset: 0, color: 'orange' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'white' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              },
              {
                name: '离开',
                data: this.Quantity,
                type: 'line',
                lineStyle: {
                  color: 'green',
                  width: 1
                },
                areaStyle: {
                  color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                        offset: 0, color: 'green' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'white' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              }]
        };
        myChart.setOption(option);
        })
    }
  },
  mounted() {
    this.getMonthNow();
    this.getCarDay();         // 当日车流量总数
    this.drawChartMonth();    // 月度车流数据统计图
    this.getvalue(0,this.tableData[0]);
  },
  beforeDestroy(){
    for(let i=0;i<this.wsList.length;i++){
      if(this.wsList[i]!=null){
        this.wsList[i].close();
      }
    }
  },
}
</script>

<style scoped>
  .box{
    width: 98%;
    height: 53.5rem;
    /* background-color:white; */
    margin: 0 auto;
    margin-top: 1rem;
    /* position: fixed; */
  }
  .nav{
    width: 100%;
    height: 3rem;
    background-color: white;
  }
  .people h1{
    width: 50%;
    float: left;
    font-size: 1.14rem;
    line-height: 3rem;
    margin-left: 1.2rem;
  }
  .el-icon-s-unfold{
    float: right;
    margin-right: 15px;
    font-size: 3rem;
    cursor: pointer;
    color: gray;
  }
  .el-icon-s-unfold:hover{
    color: black;
  }

  /* left */
  .left{
    width: 65%;
    height: 100%;
    float: left;
  }
  .img{
    width: 97%;
    height: 94%;
    /* background: url(../../assets/image/people.jpg) no-repeat; */
    background-size: 100% 100%;
    margin: 2.1% auto;
    /* border: 2px solid gray; */
    border-radius: 5px;
  }
  .el-icon-bell{
    margin-right: 20px;
    font-size: 30px;
    color: orange;

  }
  .el-icon-s-custom{
  float: right;
  font-size: 2rem;
  cursor: pointer;
  color: white;
  margin-right: 3px;
  margin-top: 1px;
}
.nav span{
  float: right;
  line-height: 3rem;
  cursor: pointer;
  margin-right: 20px;
}
.nav a{
  float: right;
  line-height: 3rem;
  margin-right: 20px;
}
.circle{
  float: right;
  width: 40px;
  height: 40px;
  border: 1px solid #4682B4;
  border-radius: 100px;
  margin-top: 4px;
  background-color: #4682B4;
  margin-right: 10px;
}

  /* right */
  .right{
    width: 35%;
    height: 100%;
    float: left;
  }

  /* 实时数据 */
  .realtime{
    width: 100%;
    height: 30%;
    margin-top: 25px;
  }
  .listone{
    width: 100%;
    height: 85%;
  }
  .listone li{
    width: 37%;
    float: left;
    text-align: center;
  }  
  .listone li:nth-child(3){
    margin-top: 10px;
  }
  .listone li:nth-child(4){
    margin-top: 10px;
  }
  .listone li:nth-child(5){
    width: 27%;
    text-align: left;
    margin-top: 10px;
  }
  .listone li:nth-child(6){
    width: 27%;
    text-align: left;
    margin-top: 10px;
  }
  .listtwo{
    width: 8%;
    height: 17%;
    position: absolute;
    top: 15%;
    right: 16%;
  }
  .listtwo li{
    height: 28%;
  }
  .listthree{
    width: 8%;
    height: 17%;
    position: absolute;
    top: 15%;
    right: 4.5%;
  }
  .listthree li{
    height: 28%;
  }


  /* 车流数量统计 */
  .peopledata{
    width: 100%;
    height: 30%;
  }
  .peopledata h3{
    width: 50%;
    float: left;
  }
  .choosedate{
    width: 23%;
    float: right;
    margin-right: 8%;
    margin-top: -3%;
  }
  .peopledata-box{
    width: 100%;
    height: 80%;
    padding-top: 6%;
  }
  #main1{
    width: 25%;
    height: 100%;
    float: left;
  }
  #main2{
    width: 25%;
    height: 100%;
    float: left;
  }
  #main3{
    width: 25%;
    height: 100%;
    float: left;
  }
  #main4{
    width: 25%;
    height: 100%;
    float: left;
  }
  .tooplist{
    width: 21%;
    height: 20px;
    margin-left: 3.5%;
  }
  .tooplist1{
    width: 40%;
    height: 100%;
    background-color: #31c7f1;
    border-radius: 5px;
    float: left;
  }
  .tooplist2{
    width: 40%;
    height: 100%;
    background-color: #fb8b7f;
    border-radius: 5px;
    float: left;
    margin-left: 7%;
  }
  .span1{
    width: 21%;
    height: 20px;
    font-size: 5%;
    font-weight: 600;
    margin-left: 3.5%;
  }
  .span1 span:nth-child(1){
    margin-left: 11%;
  }
  .span1 span:nth-child(2){
    margin-left: 25%;
  }




  /* 车流数量统计表 */
  .peopledataecharts{
    width: 100%;
    height: 34%;
  }
  .peopledataecharts h3{
    width: 50%;
    float: left;
  }
  .choose{
    float: right;
    margin-right: 10%;
  }
  #main{
    width: 100%;
    height: 100%;
    padding-top: 5%;
  }

/*下拉选样式*/
  .choose-position select,.choose-position option{
    background:transparent;
  }
  .choose-position{
    width:100%;
    height:2rem;
  }
  .divInput{
    position: absolute;
    z-index:10;
    border: 2px solid #888;
    
    
  }
  .input{
    width: 120px;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    margin-bottom: 1rem;
    position: relative;
  }
  .input input{
    border: none;
    outline: none;
    width: 90%;
    height:100%;
    font-size:1.25rem;
    background:transparent;
  }
  .input input::placeholder{
    color:#000;
  }
  .input img{
    position: absolute;
    right: 34px;
    top: 11%;
    width:10%;
  }
  .option-list{
    width: 130px;
    border: 1px solid #cccccc;
    overflow: hidden;
    
  }
  .option-list ul li{
    width: 100%;
    height: 30px;
    cursor: pointer;
    line-height: 30px;
    padding-left: 10px;
    background:rgba(0, 0, 0, 0.5);
  }
  .option-list ul li:hover{
    background-color: #cccccc;
  }

  .car-video-box{
    width:100%;
    height:90%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:1;
  }
  .car-video-box iframe{
    height:90%;
    /* border:5px solid #000; */
  }
  .car-video-box img{
    width:90%;
    
  }
</style>






