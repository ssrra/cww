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
        <!-- <img src="../../assets/image/zhiwu.png" alt=""> -->
        <div id="map" class="container"></div>
      </div>
      <div class="distribution">
        <!-- 年报图表 -->
        <div style="margin-top: 10px; margin-left: 10px">
          <el-radio-group v-model="radio" size="small">
            <router-link to="/dataAnalyse/wildlife-day"><el-radio-button label="日报"></el-radio-button></router-link>
            <router-link to="/dataAnalyse/wildlife-month"><el-radio-button label="月报"></el-radio-button></router-link>
            <el-radio-button label="年报"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="data">
          <div id="mainyear"></div>
          <p>分析：根据图表分析，豹猫在每月出现的频率较平稳，在六到八月份最多，喜温，且在春夏季繁殖。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      radio: '年报'
    };
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    // 年报图表
    drawChartYear(){
        let myChart = this.$echarts.init(document.getElementById("mainyear"));
        let option = {
            grid: {
                left: '7%',
                right: '10%',
                top: '20%',
                bottom:'10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [250, 265, 220, 259, 295, 365, 196,256, 276, 210, 200, 300],
                type: 'line',
                smooth: true,
                lineStyle: {
                  color: 'orange',
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
                      offset: 0, color: 'orange' // 0% 处的颜色
                  }, {
                      offset: 1, color: 'white' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
              }
                }
            }]
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
      this.drawChartYear();
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
.data{
  width: 100%;
  height: 35%;
}
.data p{
  padding: 0 40px 0 40px;
}
#mainyear{
  width: 100%;
  height: 100%;
}
.container{
  border: 2px solid gray;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>