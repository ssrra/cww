<template>
  <div class="ecological">
    <!-- 此div用于占位 -->
    <div class="sitting-box"></div>
    <!-- 切换实时数据和总结分析 -->
    <div class="realtime-or-ana">
      <div class="input-div">
        <div class="input" @click="openValue">
          <input v-model="value" type="text" placeholder="实时数据" readonly>
          <img src="img/people/arrow.png" alt="">
        </div>
        <div class="eco-list" v-show="show">
          <ul>
            <li v-for="(item,index) in tableData" :key="index"  @click="getvalue(index,item)">
							<router-link :to="item.path" >{{ item.name }}</router-link>
						</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 地图 -->
    <div class="realtime-map" >
      <div id="map-container"></div>
    </div>
    <!-- 实时数据 -->
    <div class="realtime-data  animated bounceInRight">
      <div class="realtime-data-title">
        <h3>{{ arrofnow[getididid - 1] }}</h3>
      </div>
      <div class="realtime-data-box">
        <!-- 每一项生态因子 -->
        <div class="realtime-data-item" v-for="(item,index) in NowDataInfo" :key="index" >
          <div class="realtime-data-now">
            <p>{{ item.sensor_desc }}</p>
            <span :class="item.color">{{item.value}} {{item.unit}}</span>
          </div>
          <div class="realtime-data-ave">
            <p>日平均</p>
            <span class="border-green">{{item.daily_avg.toFixed(2)}} {{item.unit}}</span>
          </div>
        </div>
				
      </div>
			<!-- <div v-else class="realtime-data-box fuyang-style">
				<div class="fuyang-box">
					<img src="img/fuyang.png">
					<div class="fuyang-text">
						<p>水质</p>
						<p>{{ecoDataList[0].value+ecoDataList[0].unit}}</p>
					</div>
				</div>
				<div class="fuyang-box">
					<img src="img/fuyang.png">
					<div class="fuyang-text">
						<p>日平均值</p>
						<p>{{ecoDataList[0].aveValue.toFixed(2)+ecoDataList[0].unit}}</p>
					</div>
				</div>
			</div> -->
    </div>
    <!-- 超标和负氧离子图表 -->
    <div class="realtime-charts animated bounceInRight">
      <div class="over-standerd">
        <div class="realtime-data-title">
          <h3>生态因子种类当日超标分布</h3>
        </div>
        <div id="overStanderdChart"></div>
      </div>
      <div class="oxygen-ion-chart">
        <!-- <div class="realtime-data-title">
          <h3>负氧离子</h3>
        </div> -->
        <div id="oxygenIonChart"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {getEcologicalData,getEcoChart,getOverStanderdChart} from '@/api/axiosApi.js'
export default {
  data(){
    return{
      ecoDataList:[
				// {name:'土壤PH',value:'7',unit:'',color:'border-green',aveValue:'6.5'},
        // {name:'土壤电导率',value:'20',unit:'',color:'border-yellow',aveValue:'30'},
      ],
      tableData:[
          {
            'name':"实时数据",'path':"ecological"
          },
          {
            'name':"总结分析",'path':"ecoAnalyze"
          }
        ],
        show:false,
			value:'',
			// mapTimer:null,//地图点位切换定时器
			// typeName:'',
			// fuyangOrNot:false,
			// 定时器
      intervalInfo: null,
      // id
      getididid: 1,
      // 时间
      currentTime: null,
      // 定义实时数据
      NowDataInfo: [],
      arrofnow: ['气象', '水质1', '水质2', '水质3', '水质4'],
      dataa: [[32.169295,110.158734], [32.156594,110.119329], [32.109523,110.123734], [32.200047,110.108133], [ 32.161827,110.172251]]
    }
  },
  methods:{
    openValue(){
			this.show=!this.show;
	},
	getvalue(index,item){
		this.value=item.name;
		this.show=false;
	},
	//时间戳
	timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var h = date.getHours() + ':';
      var m = date.getMinutes();
//      var s = date.getSeconds();
      return h + m;
    }, 
		//负氧离子等生态因子Echart 
    paintOxygenIonCharts(){
			getEcoChart().then(res=>{
				//console.log(res);
				let xTime = [];
				let yValue = [];
				let sensorName;
				if(res.data.length != 0){
        	sensorName = res.data[0].sensor_name;
            for (var i = 0; i < res.data.length; i++) {
              var time = this.timestampToTime(res.data[i].hhmm / 1000);
              xTime.push(time);
              yValue.push(res.data[i].value);
							//qushi(sensorName,xTime,yValue);
							//console.log("绘制中")
							var myChart = echarts.init(document.getElementById('oxygenIonChart'));
							var option = {
								title: {
									text: sensorName + '当日趋势图',
									x: 18,
									textStyle: {
										fontSize: 20,
										color: "#fff",
										fontWeight: 600
									}
								},
								xAxis: {
										type: 'category',
										boundaryGap: false,
										data:xTime,
										//  ['09:12', '10:56', '11:30', '13:06', '12:33', '15:24', '16:50'],
										axisLine: {  //这是x轴文字颜色
												lineStyle: {
														color: "#fff",
												}
										}
								},
								yAxis: {
										type: 'value',
										axisLine: {  //这是y轴文字颜色
												lineStyle: {
														color: "#fff",
												}
										}
								},
								series: [{
										data: yValue,
										// [820, 932, 901, 934, 1290, 1330, 1320],
										type: 'line',
										areaStyle: {}
								}]
							}
							myChart.setOption(option);
            }
            //console.log(sensorName)
        }else{
        	$("#oxygenIonChart").html("<h3>生态因子趋势图</h3><p>当日无数据！</p>");
        }
			})
      
		},
		//超标种类分布图
    paintWarningCharts(){
			getOverStanderdChart().then(res=>{
				//console.log(res.data);
				let sensor_type = [];
				let alert_count = [];
				let YData = [];
				if(res.data.length != 0){
					for (var i = 0; i < res.data.length; i++) {
						let type = res.data[i].sensor_type;
						let count = res.data[i].alert_count;
						sensor_type.push(type);
						alert_count.push(count);
						YData.push({ value: res.data[i].alert_count, name: res.data[i].sensor_type })
					}
						//chaobiao(sensor_type,YData);
					var myChart = echarts.init(document.getElementById('overStanderdChart'));	
					var option = {
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b}: {c} ({d}%)"
						},
						legend: {
							orient: 'vertical',
							x: 'left',
							data:sensor_type,
							// ['气象','土壤','环境'],
							textStyle: {
								color: "#fff"
							},  
						},
						series: [
							{
								name:'访问来源',
								type:'pie',
								radius: ['50%', '70%'],
								avoidLabelOverlap: false,
								label: {
									normal: {
											show: false,
											position: 'center'
									},
									emphasis: {
											show: true,
											textStyle: {
													fontSize: '30',
													fontWeight: 'bold'
											}
									}
								},
								labelLine: {
									normal: {
										show: false
									}
								},
								data:YData.sort(function (a, b) { return a.value - b.value; })
								// [
								// 	{value:335, name:'气象'},
								// 	{value:310, name:'土壤'},
								// 	{value:234, name:'环境'},
									
								// ]
							}
						]
					}
					myChart.setOption(option);
      }else{
      	$("#overStanderdChart").html("<h2 style='margin-top: 3rem;text-align:center'>当日无超标数据！</br></h2><p style='text-align: center;margin-top: 25%;margin-left: -100px;'></p>");
      }
			});
     
      
		},

   //地图初始化函数，本例取名为init，开发者可根据实际情况定义
    initMap() {
      var Marker = qq.maps.Marker //地图类型
      var LatLng = qq.maps.LatLng //经纬度
      var Point = qq.maps.Point // 地图标点
      var Size = qq.maps.Size //地图尺寸
      var MVCArray = qq.maps.MVCArray
      var MarkerDecoration = qq.maps.MarkerDecoration
      var markers = new MVCArray()

      var map = new qq.maps.Map(document.getElementById('map-container'), {
        disableDefaultUI: true, //禁止所有控件
        // mapTypeId 改变地图样式
        mapTypeId: qq.maps.MapTypeId.SATELLITE,
        // 地图的中心地理坐标。
        center: new qq.maps.LatLng(32.159523,110.123734),
        zoom: 12
      })
      //  for循环
      for (var i = 0; i < this.dataa.length; i++) {
        // 经纬度
        var latLng = new LatLng(this.dataa[i][0], this.dataa[i][1])
        var decoration = new MarkerDecoration(i, new Point(0, -5))
        // 添加标注
        var marker = new Marker({
          position: latLng,
          map: map
        })
        markers.push(marker)
      }
      console.log(markers.elems[1])
      markers.elems[this.getididid - 1].animation = 1
    },

    // 获取动态数据
    async getNowDataInfo() {
      console.log(this.getididid)
      if (this.getididid >= 6) {
        this.getididid = 1
      }
      var data = await this.$axios.post(`http://61.184.86.245:8081/Data/realTimeData?id=C000${this.getididid}`)
      this.NowDataInfo = data.data
    }
  },
  created() {
    this.getNowDataInfo()
    this.currentTime = new Date()
    this.intervalInfo = setInterval(() => {
      this.getididid++
      this.getNowDataInfo()
      this.initMap()
    }, 5000)
    this.writeCurrentDate()
  },
  mounted() {
		this.paintOxygenIonCharts();
    this.paintWarningCharts();
    this.initMap()
  },
  beforeDestroy() {
    clearInterval(this.intervalInfo)
  }
}
</script>

<style>
.ecological{
  flex-wrap:wrap;
}
.realtime-map{
  width:52%;
  height:54%;
  padding:2rem;
}
.realtime-data{
  width:30%;
  height:54%;
}
.realtime-data span{
  color: white;
}
.realtime-charts{
  width:100%;
  height:50%;
  padding:2rem 1rem 0px;
}
/*气象与土壤*/
.realtime-data-box{
  width:100%;
  height:90%;
  display:flex;
  flex-wrap: wrap;
  /* margin-top:1rem; */
}
.realtime-data-item{
  width:50%;
  height:20%;
  display:flex;
  justify-content: space-around;
}
.realtime-data-item>div{
	width:50%;
  height:100%;
}
.border-yellow{
  border-bottom: 2px solid yellow;
  padding-bottom:8px;
}
.border-green{
  border-bottom: 2px solid transparent;
  padding-bottom:8px;
}
.border-red{
  border-bottom: 2px solid red;
  padding-bottom: 8px;
}
/*图标样式*/
.realtime-charts{
  display:flex;
}
.over-standerd,.oxygen-ion-chart{
  width:50%;
  height:100%;
}
#overStanderdChart{
  width:100%;
  height:90%;
  margin-top:1rem;
}
#oxygenIonChart{
  width:100%;
  height:100%;
  /* margin-top:1rem; */
}
#map-container{
  width:100%;
  height:110%;
  
}

.ecological .input-div{
  position: absolute;
  top:-50px;
	right:0px;
	z-index:10;
}
.ecological ul li{
    list-style: none;
  }
.ecological  .input{
    width: 150px;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    border: 1px solid #cccccc;
    position: relative;
  }
.ecological  .input input{
    border: none;
    outline: none;
    width: 90%;
    height:100%;
    background:transparent;
    font-weight:400;
    font-size:1.15rem;
  }
.ecological  .input input::placeholder{
    color:#fff;
    font-weight:400;
    font-size:1.15rem;
  }
.ecological  .input img{
    position: absolute;
    right: 34px;
    top: 26%;
    width:10%;
  }
.ecological  .eco-list{
    width: 150px;
    border: 1px solid #cccccc;
    overflow: hidden;
  }
.ecological  .eco-list ul li{
    width: 100%;
    height: 50px;
    cursor: pointer;
    line-height: 50px;
    padding-left: 10px;
    background:rgba(0, 0, 0, 0.9);
    font-size:1.15rem;
  }
.ecological  .eco-list ul li a{
    color:#fff;
    display: block;
    width:100%;
    height:100%;
	}
.ecological	.eco-list ul li a:hover{
		background-color: #ccc;
		color:#000;
	}
.ecological  .eco-list ul li:hover{
    background-color: #ccc;
  }
	.realtime-data-title{
		height: 10%;
	}
	.fuyang-style{
		justify-content: center;
		align-items: center;
	}	
	.fuyang-box{
		position: relative;
		width: 34%;
    height: 40%;
		margin-right: 2rem;
	}
	.fuyang-text{
		position: absolute;
		width: 100%;
    height: 100%;
		top: 0px;
		left: -20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
