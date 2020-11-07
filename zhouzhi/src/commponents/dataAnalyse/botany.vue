<template>
  <div class="wildlife">
       <div class="nav">
      <h1>数据综合分析-植物分析</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div class="map">
        <!-- <img src="../../assets/image/zhiwu.png" alt=""> -->
        <div id="map" class="container"></div>
      </div>
      <div class="distribution">

        <!-- 综合植物季节性分布 -->
        <div class="time">
          <h3>综合植物季节性分布</h3>
          <!-- 种类选择器 -->
          <el-select class="select" v-model="value" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="numbox">
            <h4>荀子</h4>
            <p>现有<span>256株</span></p>
          </div>
          <div class="choose">
            <el-radio v-model="radio" label="1">数量变化</el-radio>
            <el-radio v-model="radio" label="2">高度变化</el-radio>
          </div>
          <div id="maintime"></div>
        </div>

        <!-- 分布情况 -->
        <div class="slope">
          <div id="mainslope"></div>
        </div>

        <!-- 海拔分布 -->
        <div class="data">
          <div id="maindata"></div>
          <p>分析:荀子多分布在等等地，生长期在12-2月，生长在灌丛常阔混交林带及流石滩，对生长土壤要求不严，耐寒，分布在海拔1500-2500之间。</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
     options: [{
          value: '选项1',
          label: '菊花'
        }, {
          value: '选项2',
          label: '玫瑰'
        }, {
          value: '选项3',
          label: '丁香花'
        }],
        value: '荀子',
        radio: '1'
    };
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    // 综合性植物季节性分布
    drawChartTime(){
        let myChart = this.$echarts.init(document.getElementById("maintime"));
        let option = {
            grid: {
                left: '10%',
                right: '10%',
                top: '20%',
                bottom:'0%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [65, 70, 59, 55, 59, 65, 64, 59, 65, 70, 64, 55],
                type: 'line',
                smooth: true,
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
    // 分布情况
    drawChartSlope(){
        let myChart = this.$echarts.init(document.getElementById("mainslope"));
        let option = {
            title: {
                text: '分布情况',
                padding: [20,0,0,20],
                textStyle:{
                            fontSize: 16,
                            color: 'black',
                            fontWeight: 'normal'
                        },
            },
            // tooltip: {
            //     trigger: 'item',
            //     formatter: '{a} <br/>{b} : {c} ({d}%)',
            //     show: true,
            //     transitionDuration:0
            // },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['45%', '65%'],
                    center: ['50%', '55%'],
                    avoidLabelOverlap: false,
                    data: [
                        {value: 335, name: '灌丛'},
                        {value: 310, name: '流石滩'},
                        {value: 234, name: '常阔混交'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    },
    // 海拔分布
    drawChartData(){
        let myChart = this.$echarts.init(document.getElementById("maindata"));
        let option = {
           title: {
                text: '海拔分布',
                padding: [5,0,0,20],
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
                top: '30%',
                bottom:'0%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['1500-2000', '2000-2500', '2500-3000'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                  name:'日照报表',
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '15%',
                    data: [1, 5, 0]
                }
            ]
          };
        myChart.setOption(option);
    },
    
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

/* 综合性植物季节性分布 */
.time{
  width: 100%;
  height: 34.5%;
}
.time h3{
  width: 50%;
  float: left;
  font-size: 16px;
  font-weight: normal;
  padding: 20px 0px 0px 20px;
}
.select{
  width: 20%;
  height: 30px;
  float: right;
  margin-right: 10%;
  margin-top: 2.5%;
}
.select ::placeholder{
  /* color: blue; */
}
.numbox{
  width: 100%;
  height: 12%;
  float: left;
  margin: 15px 0 0 0;
  /* background-color: gray; */
}
.numbox h4{
  width: 30%;
  margin-top: 7px;
  margin-left: 110px;
  float: left;
  font-weight: normal;
}
.numbox p{
  width: 30%;
  float: right;
  margin-top: 7px;
  margin-right: 50px;
}
.choose{
  width: 80%;
  height: 8%;
  float: left;
  margin: 0 0 0 50px;
  /* background-color: gray; */
}
#maintime{
  width: 100%;
  height: 100%;
  padding-top: 22%;
}

/* 分布情况 */
.slope{
  width: 100%;
  height: 28%;
}
#mainslope{
  width: 100%;
  height: 100%;
}

/* 综合性植物季节性分布 */
.data{
  width: 100%;
  height: 32.5%;
}
.data p{
  padding: 10px 40px 0 40px;
}
#maindata{
  width: 100%;
  height: 80%;
}
.container{
  border: 2px solid gray;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>