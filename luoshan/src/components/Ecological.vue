<template>
  <div class="ecological">
    <!-- 此div用于占位 -->
    <div class="sitting-box"></div>
	<!-- 点位概括 -->
      <div class="position-count">
        <p>监测点位总数：9个</p>
        <div>
          <div>
            <img src="img/camera.png">
          </div>
          <span>3个</span>
        </div>
        <div>
          <div>
            <img src="img/probe.png">
          </div>
          <span>6个</span>
        </div>
      </div>
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
    <div class="realtime-map">
      <div id="map-container"></div>
    </div>
    <!-- 实时数据 -->
    <div class="realtime-data  animated bounceInRight">
      <div class="realtime-data-title">
        <h3>{{typeName}}</h3>
      </div>
      <div class="realtime-data-box" v-if="!fuyangOrNot">
        <!-- 每一项生态因子 -->
        <div class="realtime-data-item" v-for="(item,index) in ecoDataList" :key="index" >
          <div class="realtime-data-now">
            <p>{{item.name}}</p>
            <span :class="item.color">{{item.value}} {{item.unit}}</span>
          </div>
          <div class="realtime-data-ave">
            <p>日平均</p>
            <span class="border-green">{{item.aveValue.toFixed(2)}} {{item.unit}}</span>
          </div>
        </div>
				
      </div>
			<!-- <div v-else class="realtime-data-box fuyang-style">
				<div class="fuyang-box">
					<img src="img/fuyang.png">
					<div class="fuyang-text">
						<p>负氧离子</p>
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
// import {getEcologicalData,getEcoChart,getOverStanderdChart} from '@/api/axiosApi.js'
import {getEcologicalData,getEcoChart,getOverStanderdChart} from '../api/huzhuApi.js'
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
				mapTimer:null,//地图点位切换定时器
				typeName:'',
				fuyangOrNot:false
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
									text: '水质当日趋势图',
									// text: sensorName + '当日趋势图',
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
		//根据点位更新数据
	changEcoData(id){
			this.fuyangOrNot=false;
			// if(id=="C0001"){
			// 	this.typeName="水文";
			// }else if(id=="C0002"){
			// 	this.typeName="水质";
			// }else if(id=="C0003"){
			// 	this.typeName="空气质量";
			// }else if(id=="C0004"){
			// 	this.typeName="气象";
			// }else if(id=="C0005"){
			// 	this.typeName="土壤";
			// }
			if(id=="C0001"){
				this.typeName="土壤1";
			}else if(id=="C0002"){
				this.typeName="土壤2";
			}else if(id=="C0003"){
				this.typeName="土壤3";
			}else if(id=="C0004"){
				this.typeName="气象";
			}else if(id=="C0005"){
				this.typeName="土壤4";
			}
			let data={id:id};
			let arr=[];
			getEcologicalData(data).then(res=>{
				console.log(res.data);
				if(res.data==[]){
					$(".ecological .realtime-data-box").html("<p>该点位无数据</p>")
				}
				for(let i=0;i<res.data.length;i++){
					if(res.data[i].sensor_desc=="负氧离子"){
						continue;
					}else{
						arr[i]={};
						arr[i].name=res.data[i].sensor_desc;
						arr[i].value=res.data[i].value;
						arr[i].aveValue=res.data[i].daily_avg;
						arr[i].unit=res.data[i].unit;
						if(res.data[i].value<res.data[i].lower_limit){
							arr[i].color='border-yellow';
						}else if(res.data[i].value>res.data[i].upper_limit){
							arr[i].color='border-red';
						}else{
							arr[i].color='border-green';
						}
					}
					
				}
				this.ecoDataList=arr;
			});
		},
    paintMap() {
      //console.log('paint map')
			//定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
			var map = new qq.maps.Map(document.getElementById("map-container"), {
				center: new qq.maps.LatLng(37.289873,106.280288),      // 地图的中心地理坐标。
				zoom: 13,	                                            // 地图的中心地理坐标。
				mapTypeId: qq.maps.MapTypeId.SATELLITE,
				draggable: true,               //设置是否可以拖拽
				scrollwheel: true,             //设置是否可以滚动
				disableDoubleClickZoom: true,   //设置是否可以双击放大
				disableDefaultUI: true    //禁止所有控件
			});
    	/* 第一个点    土壤 */
			//
			this.changEcoData("C0005");
			
			var marker = new qq.maps.Marker({
				position: new qq.maps.LatLng(37.301782,106.279266), 
				map: map,
				animation: qq.maps.MarkerAnimation.BOUNCE
			});
    	var anchor = new qq.maps.Point(0, 39),
      size = new qq.maps.Size(42, 68),
      origin = new qq.maps.Point(0, 0),
      markerIcon1 = new qq.maps.MarkerImage(
        "https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
        size,
        origin,
        anchor
			);
			
	  	/* 第二个点    大气 */
	    var marker = new qq.maps.Marker({
	    	position: new qq.maps.LatLng(37.277786,106.281506),
	      map: map,
	    });
	    var anchor = new qq.maps.Point(0, 39),
			size = new qq.maps.Size(42, 68),
			origin = new qq.maps.Point(0, 0),
			markerIcon2 = new qq.maps.MarkerImage(
				"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
				size,
				origin,
				anchor
			);

		  /* 第三个点    气象 */
			var marker = new qq.maps.Marker({
				position: new qq.maps.LatLng(37.304046,106.307879),
				map: map,
			});
			var anchor = new qq.maps.Point(0, 39),
			size = new qq.maps.Size(42, 68),
			origin = new qq.maps.Point(0, 0),
			markerIcon3 = new qq.maps.MarkerImage(
				"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
				size,
				origin,
				anchor
			);

			/* 第四个点    水文 */
			var marker = new qq.maps.Marker({
				position: new qq.maps.LatLng(37.296204,106.231461),
				map: map,
			});
			var anchor = new qq.maps.Point(0, 39),
			size = new qq.maps.Size(42, 68),
			origin = new qq.maps.Point(0, 0),
			markerIcon4 = new qq.maps.MarkerImage(
				"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
				size,
				origin,
				anchor
			);

			/* 第五个点    水质*/
			var marker = new qq.maps.Marker({
				position: new qq.maps.LatLng(37.277786,106.281506),
				map: map,
			});
			var anchor = new qq.maps.Point(0, 39),
			size = new qq.maps.Size(42, 68),
			origin = new qq.maps.Point(0, 0),
			markerIcon5 = new qq.maps.MarkerImage(
				"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
				size,
				origin,
				anchor
			);
			

			/* 第六个点    负氧离子*//////36.946187,101.900426
			// var marker = new qq.maps.Marker({
			// 	position: new qq.maps.LatLng(36.946187,101.900426),
			// 	map: map,
			// });
			// var anchor = new qq.maps.Point(0, 39),
			// size = new qq.maps.Size(42, 68),
			// origin = new qq.maps.Point(0, 0),
			// markerIcon6 = new qq.maps.MarkerImage(
			// 	"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
			// 	size,
			// 	origin,
			// 	anchor
			// );
			marker.setIcon(markerIcon1,markerIcon2,markerIcon3,markerIcon4,markerIcon5);


///////////////////////////////////////////////////////////////////////////////////////////////////
    
    	var indem = 2;
    	this.mapTimer = setInterval(()=>{
  			var map = new qq.maps.Map(document.getElementById("map-container"), {
					center: new qq.maps.LatLng(37.289873,106.280288),      // 地图的中心地理坐标。
					zoom: 13,	                                            // 地图的中心地理坐标。
					mapTypeId: qq.maps.MapTypeId.SATELLITE,
					draggable: true,               //设置是否可以拖拽
					scrollwheel: true,             //设置是否可以滚动
					disableDoubleClickZoom: true,   //设置是否可以双击放大
					disableDefaultUI: true    //禁止所有控件
				});
  	  	if(indem==1){
					//土壤
					this.changEcoData("C0005");
					// this.ecoDataList=[
					// 	{name:'土壤PH',value:'7',unit:'',color:'border-green',aveValue:'6.5'},
					// 	{name:'土壤电导率',value:'20',unit:'',color:'border-yellow',aveValue:'30'},
					// 	{name:'土壤温度',value:'2',unit:'℃',color:'border-green',aveValue:'12'},
					// 	{name:'土壤湿度',value:'33%',unit:'',color:'border-green',aveValue:'45%'},
					// ];
  		  	/* 第一个点 */
  		    var marker = new qq.maps.Marker({
  		      position: new qq.maps.LatLng(37.301782,106.279266),
  		      map: map,
  		      animation: qq.maps.MarkerAnimation.BOUNCE
  		    });
  		    var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon1 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
  		  	/* 第二个点 */
  		    var marker = new qq.maps.Marker({
  		      position: new qq.maps.LatLng(37.277786,106.281506),
  		      map: map,
  		    });
  		    var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon2 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
  		  	/* 第三个点 */
  		    var marker = new qq.maps.Marker({
  		      position: new qq.maps.LatLng(37.304046,106.307879),
  		      map: map,
  		    });
  		    var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon3 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
  		  	/* 第四个点 */
  		    var marker = new qq.maps.Marker({
  		      position: new qq.maps.LatLng(37.296204,106.231461),
  		      map: map,
  		    });
  		    var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon4 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
  		  	/* 第五个点 */
  		    var marker = new qq.maps.Marker({
  		      position: new qq.maps.LatLng(37.277786,106.281506),
  		      map: map,
  		    });
  		    var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon5 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
  	      /* 第六个点    负氧离子*//////36.946187,101.900426
					// var marker = new qq.maps.Marker({
					// 	position: new qq.maps.LatLng(36.946187,101.900426),
					// 	map: map,
					// });
					// var anchor = new qq.maps.Point(0, 39),
					// size = new qq.maps.Size(42, 68),
					// origin = new qq.maps.Point(0, 0),
					// markerIcon6 = new qq.maps.MarkerImage(
					// 	"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
					// 	size,
					// 	origin,
					// 	anchor
					// );
					marker.setIcon(markerIcon1,markerIcon2,markerIcon3,markerIcon4,markerIcon5);
  		  	indem++;
				}else if(indem==2){
					//气象
					this.changEcoData("C0004");
					// this.ecoDataList=[
					// 	{name:'土壤PH',value:'7',unit:'',color:'border-green',aveValue:'6.5'},
					// 	{name:'土壤电导率',value:'20',unit:'',color:'border-yellow',aveValue:'30'},
					// 	{name:'土壤温度',value:'2',unit:'℃',color:'border-green',aveValue:'12'},
					// 	{name:'土壤湿度',value:'33%',unit:'',color:'border-green',aveValue:'45%'},
					// ]
					/* 第一个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.301782,106.279266),
						map: map,
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon1 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
  		  	/* 第二个点 */
  		    var marker = new qq.maps.Marker({
  		      position: new qq.maps.LatLng(37.277786,106.281506),
  		      map: map,
  		    	animation: qq.maps.MarkerAnimation.BOUNCE
  		    });
  		    var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon2 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
  		  	/* 第三个点 */
  		    var marker = new qq.maps.Marker({
  		      position: new qq.maps.LatLng(37.304046,106.307879),
  		      map: map,
  		    });
  		    var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon3 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
  		  	/* 第四个点 */
  		    var marker = new qq.maps.Marker({
  		      position: new qq.maps.LatLng(37.296204,106.231461),
  		      map: map,
  		    });
  		    var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon4 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
  		  	/* 第五个点 */
  		    var marker = new qq.maps.Marker({
  		      position: new qq.maps.LatLng(37.277786,106.281506),
  		      map: map,
  		    });
  		    var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon5 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
  	      /* 第六个点    负氧离子*//////36.946187,101.900426
			// var marker = new qq.maps.Marker({
			// 	position: new qq.maps.LatLng(36.946187,101.900426),
			// 	map: map,
			// });
			// var anchor = new qq.maps.Point(0, 39),
			// size = new qq.maps.Size(42, 68),
			// origin = new qq.maps.Point(0, 0),
			// markerIcon6 = new qq.maps.MarkerImage(
			// 	"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
			// 	size,
			// 	origin,
			// 	anchor
			// );
			marker.setIcon(markerIcon1,markerIcon2,markerIcon3,markerIcon4,markerIcon5);
  		  	indem++;
  	  	}else if(indem==3){
					//大气
					this.changEcoData("C0003");
					/* 第一个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.301782,106.279266),
						map: map,
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon1 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第二个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.277786,106.281506),
						map: map,
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon2 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第三个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.304046,106.307879),
						map: map,
					animation: qq.maps.MarkerAnimation.BOUNCE
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon3 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第四个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.296204,106.231461),
						map: map,
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon4 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第五个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.277786,106.281506),
						map: map,
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon5 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第六个点    负氧离子*//////36.946187,101.900426
			// var marker = new qq.maps.Marker({
			// 	position: new qq.maps.LatLng(36.946187,101.900426),
			// 	map: map,
			// });
			// var anchor = new qq.maps.Point(0, 39),
			// size = new qq.maps.Size(42, 68),
			// origin = new qq.maps.Point(0, 0),
			// markerIcon6 = new qq.maps.MarkerImage(
			// 	"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
			// 	size,
			// 	origin,
			// 	anchor
			// );
			marker.setIcon(markerIcon1,markerIcon2,markerIcon3,markerIcon4,markerIcon5);
					$("#map-container").html("");
					indem++;
  	  	}else if(indem==4){
    			//水质
					this.changEcoData("C0002");
					// this.ecoDataList=[
					// 	{name:'PM2.5',value:'125',unit:'',color:'border-red',aveValue:'5'},
					// 	{name:'PM10',value:'5',unit:'',color:'border-green',aveValue:'5'},
					// 	{name:'CO2',value:'50',unit:'m/s',color:'border-red',aveValue:'5'},
					// ];
					/* 第一个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.301782,106.279266),
						map: map,
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon1 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
  		  	/* 第二个点 */
  		    var marker = new qq.maps.Marker({
  		      position: new qq.maps.LatLng(37.277786,106.281506),
  		      map: map,
  		    });
  		    var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon2 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
    		  /* 第三个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.304046,106.307879),
						map: map,
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon3 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
    		  /* 第四个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.296204,106.231461),
						map: map,
							animation: qq.maps.MarkerAnimation.BOUNCE
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon4 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第五个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.277786,106.281506),
						map: map,
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon5 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第六个点    负氧离子*//////36.946187,101.900426
			// var marker = new qq.maps.Marker({
			// 	position: new qq.maps.LatLng(36.946187,101.900426),
			// 	map: map,
			// });
			// var anchor = new qq.maps.Point(0, 39),
			// size = new qq.maps.Size(42, 68),
			// origin = new qq.maps.Point(0, 0),
			// markerIcon6 = new qq.maps.MarkerImage(
			// 	"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
			// 	size,
			// 	origin,
			// 	anchor
			// );
			marker.setIcon(markerIcon1,markerIcon2,markerIcon3,markerIcon4,markerIcon5);
					$("#map-container").html("");
					indem++;
    	  }else  if(indem==5){
					//马场中继土壤
					this.changEcoData("C0001");
					// this.ecoDataList=[
					// 	{name:'土壤PH',value:'7',unit:'',color:'border-green',aveValue:'6.5'},
        	// 	{name:'土壤电导率',value:'20',unit:'',color:'border-yellow',aveValue:'30'},
        	// 	{name:'土壤温度',value:'2',unit:'℃',color:'border-green',aveValue:'12'},
        	// 	{name:'土壤湿度',value:'33%',unit:'',color:'border-green',aveValue:'45%'},
					// ];
      		/* 第一个点 */
    	    var marker = new qq.maps.Marker({
    	      position: new qq.maps.LatLng(37.301782,106.279266),
    	      map: map,
    	    });
    	    var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon1 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
    		  /* 第二个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.277786,106.281506),
						map: map,
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon2 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第三个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.304046,106.307879),
						map: map,
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon3 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第四个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.296204,106.231461),
						map: map,
							
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon4 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第五个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.277786,106.281506),
						map: map,
					animation: qq.maps.MarkerAnimation.BOUNCE
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon5 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第六个点    负氧离子*//////36.946187,101.900426
			// var marker = new qq.maps.Marker({
			// 	position: new qq.maps.LatLng(36.946187,101.900426),
			// 	map: map,
			// });
			// var anchor = new qq.maps.Point(0, 39),
			// size = new qq.maps.Size(42, 68),
			// origin = new qq.maps.Point(0, 0),
			// markerIcon6 = new qq.maps.MarkerImage(
			// 	"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
			// 	size,
			// 	origin,
			// 	anchor
			// );
			marker.setIcon(markerIcon1,markerIcon2,markerIcon3,markerIcon4,markerIcon5);
					$("#map-container").html("");
					indem++;
				}else{
					//负氧离子


					//this.changEcoData("C0003");
					
					// this.typeName="负氧离子";
					// this.fuyangOrNot=true;
					// let data={id:"C0003"};
					// let arr=[];
					// getEcologicalData(data).then(res=>{
					// 	console.log(res.data);
					// 	if(res.data==[]){
					// 		$(".ecological .realtime-data-box").html("<p>该点位无数据</p>")
					// 	}
					// 	for(let i=0;i<res.data.length;i++){
					// 		if(res.data[i].sensor_desc=="负氧离子"){
					// 			arr[0]={};
					// 			arr[0].name=res.data[i].sensor_desc;
					// 			arr[0].value=res.data[i].value;
					// 			arr[0].aveValue=res.data[i].daily_avg;
					// 			arr[0].unit=res.data[i].unit;
					// 		}
					// 	}
					// 	console.log(arr);
					// 	this.ecoDataList=arr;
					// });



      		/* 第一个点 */
    	    var marker = new qq.maps.Marker({
    	      position: new qq.maps.LatLng(37.301782,106.279266),
    	      map: map,
    	    });
    	    var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon1 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
    		  /* 第二个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.277786,106.281506),
						map: map,
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon2 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第三个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.304046,106.307879),
						map: map,
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon3 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第四个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.296204,106.231461),
						map: map,
							
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon4 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第五个点 */
					var marker = new qq.maps.Marker({
						position: new qq.maps.LatLng(37.277786,106.281506),
						map: map,
					
					});
					var anchor = new qq.maps.Point(0, 39),
					size = new qq.maps.Size(42, 68),
					origin = new qq.maps.Point(0, 0),
					markerIcon5 = new qq.maps.MarkerImage(
						"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
						size,
						origin,
						anchor
					);
					/* 第六个点    负氧离子*//////36.946187,101.900426
			// var marker = new qq.maps.Marker({
			// 	position: new qq.maps.LatLng(36.946187,101.900426),
			// 	map: map,
			// 	animation: qq.maps.MarkerAnimation.BOUNCE
			// });
			// var anchor = new qq.maps.Point(0, 39),
			// size = new qq.maps.Size(42, 68),
			// origin = new qq.maps.Point(0, 0),
			// markerIcon6 = new qq.maps.MarkerImage(
			// 	"https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
			// 	size,
			// 	origin,
			// 	anchor
			// );
			marker.setIcon(markerIcon1,markerIcon2,markerIcon3,markerIcon4,markerIcon5);
					$("#map-container").html("");
					indem=1;
    	  }
				



    	},5000);
  	}
  },
  mounted(){
    this.paintOxygenIonCharts();
    this.paintWarningCharts();
    this.paintMap();
	},
	beforeDestroy(){
		clearInterval(this.mapTimer);
		this.mapTimer=null;
	}
}
</script>
<style>
.ecological{
  flex-wrap:wrap;
  color: white;
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
  height:100%;
  
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
