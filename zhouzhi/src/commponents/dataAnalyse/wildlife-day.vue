<template>
  <div class="wildlife">
       <div class="nav">
      <h1>数据综合分析-野生动物</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div class="map">
        <div id="map" class="container"></div>
        <!-- <img src="../../assets/image/zhiwu.png" alt=""> -->
      </div>
      <div class="distribution">
        <!-- 日报 -->
        <div style="margin-top: 10px; margin-left: 10px">
          <el-radio-group v-model="radio" size="small">
            <el-radio-button label="日报"></el-radio-button>
            <router-link to="/dataAnalyse/wildlife-month"><el-radio-button label="月报"></el-radio-button></router-link>
            <router-link to="/dataAnalyse/wildlife-year"><el-radio-button label="年报"></el-radio-button></router-link>
          </el-radio-group>
        </div>

         <!-- 种类选择器 -->
          <el-select class="select" v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        <!-- 今日数量 -->
        <div class="data">
          <div id="maindata"></div>
          <p>分析：今日豹猫出现次数为42次，由地图可知多出现在石窑洞护林点</p>
        </div>
        <!-- 出现时间 -->
        <div class="time">
          <div id="maintime"></div>
        </div>
        <!-- 坡度统计 -->
        <div class="slope">
          <div id="mainslope"></div>
          <p>分析：根据图表分析，豹猫多出现在石窑洞护林点15-30°之间，栖息于山地林区、郊野灌丛和林缘村寨附近，属于夜行动物，晨昏活动较多，属于易危动物</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      radio: '日报',
      options: [{
          value: '选项1',
          label: '豹猫'
        }, {
          value: '选项2',
          label: '老虎'
        }, {
          value: '选项3',
          label: '狮子'
        }, {
          value: '选项4',
          label: '松鼠'
        }, {
          value: '选项5',
          label: '熊猫'
        }],
        value: '豹猫',
    };
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    // 今日数量
    drawChartData(){
        let myChart = this.$echarts.init(document.getElementById("maindata"));
        let option = {
            title: {
                text: '今日数量',
                padding: [20,0,0,20],
                textStyle:{
                            fontSize: 16,
                            color: 'black',
                            fontWeight: 'normal'
                        },
            },
            color: ['#3398DB'],
            grid: {
                left: '10%',
                right: '10%',
                top: '20%',
                bottom:'10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '15%',
                    data: [0, 52, 0]
                }
            ]
          };
        myChart.setOption(option);
    },
    // 出现时间
    drawChartTime(){
        let myChart = this.$echarts.init(document.getElementById("maintime"));
        let option = {
           title: {
                text: '出现时间',
                padding: [20,0,0,20],
                textStyle:{
                              fontSize: 16,
                              color: 'black',
                              fontWeight: 'normal'
                          },
            },
            grid: {
                left: '10%',
                right: '10%',
                top: '20%',
                bottom:'10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17', '18', '19', '20', '21', '22', '23','24','25','26','27','28','29','30']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 50, 901, 50, 65, 1330, 89,820, 50, 901, 50, 65, 1330, 89,820, 50, 901, 50, 65, 1330, 89,820, 50, 901, 50, 65, 1330, 89,589,56],
                type: 'line',
                lineStyle: {
                  color: '#1E90FF',
                  width: 3
                },
                areaStyle: {
                  color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                      offset: 0, color: '#1E90FF' // 0% 处的颜色
                  }, {
                      offset: 1, color: 'white' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
              }
                }
            }]
        };
        myChart.setOption(option);
    },
    // 坡度统计
    drawChartSlope(){
        let myChart = this.$echarts.init(document.getElementById("mainslope"));
        let option = {
            title: {
                text: '坡度统计',
                padding: [0,0,0,20],
                textStyle:{
                              fontSize: 16,
                              color: 'black',
                              fontWeight: 'normal'
                          },
            },
            grid: {
                left: '10%',
                right: '10%',
                top: '10%',
                bottom:'8%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['0-30°', '15-30°', '30-45°', '45-60°']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    barWidth: '20%',
                    data: [0, 42, 0, 0]
                }
            ]
        };
        myChart.setOption(option);
    }
,
    setMap(){
      var map = new ztmapgl.Map('map', {
        center:     [108.095835,33.877581],
        zoom:  10,
        baseLayer : new ztmapgl.TileLayer('base',{
          urlTemplate: 'http://mt{s}.google.cn/vt/lyrs=s@113&gl=cn&src=app&x={x}&y={y}&z={z}&s=Galil',
          subdomains: ['0','1','2','3']          
        })
      });

      var center = map.getCenter();

      var layer = new ztmapgl.VectorLayer('vector').addTo(map);

      var marker1 = new ztmapgl.Marker(
        center.sub(0.39, 0.1),
        {
          'symbol' : {
            'markerFile'   : 'img/base/marker.png',
            'markerWidth'  : 28,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1
          }
        }
      ).addTo(layer);

      var marker2 = new ztmapgl.Marker(
        center.sub(0.1, 0.26),
        {
          'symbol' : {
            'markerFile'   : 'img/base/marker.png',
            'markerWidth'  : 28,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1
          }
        }
      ).addTo(layer);

      var marker3 = new ztmapgl.Marker(
        center.sub(0.2, 0.15),
        {
          'symbol' : {
            'markerFile'   : 'img/base/marker.png',
            'markerWidth'  : 28,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1
          }
        }
      ).addTo(layer);

      var marker4 = new ztmapgl.Marker(
        center,
        {
          'symbol' : {
            'markerFile'   : 'img/base/marker.png',
            'markerWidth'  : 28,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1
          }
        }
      ).addTo(layer);

      var marker5 = new ztmapgl.Marker(
        center.sub(0.5, 0.15),
        {
          'symbol' : {
            'markerFile'   : 'img/base/marker.png',
            'markerWidth'  : 28,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1
          }
        }
      ).addTo(layer);
      
    }
  },
  mounted(){
    this.drawChartData();
    this.drawChartTime();
    this.drawChartSlope();
    this.setMap();
  }
}
</script>

<style scoped>
  .box{
    width: 98%;
    height: 53.5rem;
    background-color:#eeeeee;
    margin: 0 auto;
    margin-top: 1rem;
    /* position: fixed; */
  }
  .nav{
    width: 100%;
    height: 3rem;
    background-color: white;
  }
  .wildlife h1{
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


.map{
  width: 70%;
  height: 100%;
  float: left;
}
.map img{
  width: 100%;
  height: 100%;
}

.distribution{
  width: 29%;
  height: 100%;
  float: right;
  background-color: white;
}
/* 今日数量 */
.data{
  width: 100%;
  height: 32.5%;
}
.data p{
  padding: 0 40px 0 40px;
}
#maindata{
  width: 100%;
  height: 80%;
}
/* 出现时间 */
.time{
  width: 100%;
  height: 28%;
}
#maintime{
  width: 100%;
  height: 100%;
}
/* 坡度统计 */
.slope{
  width: 100%;
  height: 34.5%;
}
.slope p{
  padding: 0 40px 0 40px;
}
#mainslope{
  width: 100%;
  height: 70%;
}
.select{
  width: 25%;
  float: right;
  margin-top: -30px;
  margin-right: 40px;
}
.container{
  border: 2px solid gray;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>