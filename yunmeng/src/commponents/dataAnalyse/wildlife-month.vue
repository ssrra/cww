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
        <!-- 月报 -->
        <div style="margin-top: 10px; margin-left: 10px">
          <el-radio-group v-model="radio" size="small">
            <router-link to="/dataAnalyse/wildlife-day"><el-radio-button label="日报"></el-radio-button></router-link>
            <el-radio-button label="月报"></el-radio-button>
            <router-link to="/dataAnalyse/wildlife-year"><el-radio-button label="年报"></el-radio-button></router-link>
          </el-radio-group>
        </div>
        <div class="top">
          <div id="maintop"></div>
        </div>
        <div class="bottom">
          <div id="mainbottom"></div>
          <p>分析：在六月份整月中，豹猫出现次数频繁，总体呈上升趋势，多活动于针阔混交林带;</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      radio: '月报'
    };
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    // 月报图表
    drawChartTop(){
        let myChart = this.$echarts.init(document.getElementById("maintop"));
        let option = {
          title: {
                text: '月度报表',
                padding: [20,0,0,20],
                textStyle:{
                            fontSize: 16,
                            color: 'black',
                            fontWeight: 'normal'
                        },
            },
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
                lineStyle: {
                  color: 'orange',
                  width: 3
                }               
            }]
        };
        myChart.setOption(option);
    },
    // 月出现分布
    drawChartBottom(){
        let myChart = this.$echarts.init(document.getElementById("mainbottom"));
        let option = {
            title: {
                text: '月出现分布',
                padding: [20,0,0,20],
                textStyle:{
                            fontSize: 16,
                            color: 'black',
                            fontWeight: 'normal'
                        },
            },
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: [30, 110],
                    center: ['50%', '55%'],
                    roseType: 'area',
                    data: [
                        {value: 10, name: '针阔混交'},
                        {value: 5, name: '流石滩'},
                        {value: 15, name: '针叶林'},
                        {value: 25, name: '草坡'}
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
    ,
    setMap() {
        var map = new ztmapgl.Map('map', {
        center:     [113.72825,31.023123],
        zoom:  13,
        baseLayer : new ztmapgl.TileLayer('base',{
          urlTemplate: 'http://mt{s}.google.cn/vt/lyrs=s@113&gl=cn&src=app&x={x}&y={y}&z={z}&s=Galil',
          subdomains: ['0','1','2','3']          
        })
      });

      var center = map.getCenter();

      var layer = new ztmapgl.VectorLayer('vector').addTo(map);

      var marker1 = new ztmapgl.Marker(
        center.sub(0.02, 0.02),
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
        center.sub(0.03, -0.03),
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
        center.sub(-0.04, 0.04),
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
        center.add(0.04, 0.03),
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
    this.drawChartTop();
    this.drawChartBottom();
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

.top{
  width: 100%;
  height: 35%;
  /* background-color: skyblue; */
}
#maintop{
  width: 100%;
  height: 100%;
}
.bottom{
  width: 100%;
  height: 55%;
  /* background-color: gray; */
}
#mainbottom{
  width: 100%;
  height: 70%;
}
.bottom p{
  padding: 0 40px 0 40px;
}
.container{
  border: 2px solid gray;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>