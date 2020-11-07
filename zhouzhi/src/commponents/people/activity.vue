<template>
  <div class="realtime-red">
     <div class="nav">
      <h1>红外相机-活动情况</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员7</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>

    <div class="box">
      <div class="left">
        <!-- 地图 -->
        <div id="map" class="container"></div>
        <div id="alert">
            <el-button class="button2" type="primary" round>主要趋势</el-button>
            <div id="main"></div>
            <div class="smallboxesc"><img id="esc" src="../../../public/img/base/esc.png" alt=""></div>
        </div>
      </div>

      <div class="right">
        <div class="top">
          <h3>物种选择</h3>
          <!-- 时间选择器1 -->
          <div class="block">
            <el-date-picker
              @change="getAnimalNumber()"
              class="timechoose"
              v-model="value"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </div>
        </div>
        <!-- 动物种类选择 -->
        <div class="bottom">
          <el-radio-group v-model="radio" @change="getAnimalNumber()">
            <el-radio :label="index" v-for="(item,index) in animal" :key="index">{{item.beastChina}}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>

  </div>
</template>
 
<script>
import {getAnimal,getAnimalsNum,getAnimalsNumDay} from '../../api/axiosApi.js'

export default {
  data(){
    return{
      animalKind: '',// 动物种类
      animal:[],// 所有动物种类
      radio: 14, // 动物种类index
      value: ['2019-01-01 00:00:00','2020-11-05 00:00:00'],// 开始时间与结束之间

      cameraId: [],       // 摄像头编号
      cameraName: [],     // 摄像头名称
      animalNumber: [],   // 动物数量
      latitude: [],       // 纬度
      longitude: [],      // 经度
      map: null,
      eachHour: [],            // 日期
      numberSpeciesActive: []  // 数量
    }
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },

    getAnimalNumber(){
      // 查询所有动物种类
      getAnimal().then(res=>{
        // console.log(res.data)
        this.animal = res.data;
        this.animalKind = res.data[this.radio].beastChina;
        // console.log(this.animalKind,this.radio)
        // 查询动物分布情况
        this.startDate = this.value[0];
        this.endDate = this.value[1];
        let data = {animalType:this.animalKind,startDate:this.startDate,endDate:this.endDate};
        getAnimalsNum(data).then(res=>{
          console.log(res.data)
          if(res.data.length == 0) {
            this.$alert(`暂无${this.animalKind}数据`, '提示', {confirmButtonText: '确定'});
            return;
          }
          this.cameraId = [];
          this.cameraName = [];
          this.animalNumber = [];
          this.latitude = [];
          this.longitude = [];
          for(let i = 0; i<res.data.length; i++){
            this.cameraId.push(res.data[i].cameraId)        //摄像头编号
            this.cameraName.push(res.data[i].cameraName)    //摄像头名称
            this.animalNumber.push(res.data[i].animalNumber)//动物数量
            this.latitude.push(res.data[i].latitude)        //纬度
            this.longitude.push(res.data[i].longitude)      //经度
          }
          
          // 地图点位
          if(this.map != null) this.map.remove();
          this.map = new ztmapgl.Map('map', {
            center:     [this.longitude[1],this.latitude[1]],
            zoom:  14,
            baseLayer : new ztmapgl.TileLayer('base',{
              urlTemplate: 'http://mt{s}.google.cn/vt/lyrs=s@113&gl=cn&src=app&x={x}&y={y}&z={z}&s=Galil',
              subdomains: ['0','1','2','3']          
            })
          });

          var center = this.map.getCenter();
          var smallBox = document.getElementById("alert");
          var esc = document.getElementById("esc");
          var layer = new ztmapgl.VectorLayer('vector').addTo(this.map);

          for(let i = 0; i<res.data.length; i++){
            this.cameraId.push(res.data[i].cameraId)        //摄像头编号
            this.cameraName.push(res.data[i].cameraName)    //摄像头名称
            this.animalNumber.push(res.data[i].animalNumber)//动物数量
            this.latitude.push(res.data[i].latitude)        //纬度
            this.longitude.push(res.data[i].longitude)      //经度
            
            new ztmapgl.Marker([this.longitude[i],this.latitude[i]],
              {
              visible : true,
              editable : true,
              cursor : 'pointer',
              shadowBlur : 0,
              shadowColor : 'black',
              draggable : false,
              dragShadow : false, // display a shadow during dragging
              drawOnAxis : null,  // force dragging stick on a axis, can be: x, y
              symbol : {
                'markerFile'   : 'img/base/camera.png',
                'markerWidth'  : 40,
                'markerHeight' : 40,
                'markerDx'     : 0,
                'markerDy'     : -18,
                'markerOpacity': 1,
                'textFaceName' : 'sans-serif',
                'textName' : this.cameraName[i] + '\n' + "数量:" + this.animalNumber[i],
                'textFill' : 'white',
                'textHorizontalAlignment' : 'center',
                'textSize' : 15,
              }
            }
            ).on('click', (param)=>{
              // console.log(param)
              smallBox.style.display = "block";
              smallBox.style.left = (param.domEvent.pageX + 8) + 'px';
              smallBox.style.top = (param.domEvent.pageY + 15) + 'px';
              // 查询当天物种活动情况
              // console.log(this.startDate1,this.endDate1)
              let data = {animalType:this.animalKind,cameraId:this.cameraId[i],startDate:this.startDate,endDate:this.endDate};
              getAnimalsNumDay(data).then(res=>{
                // console.log(res.data)
                this.eachHour = [];
                this.numberSpeciesActive = [];
                for(let i = 0; i<res.data.length; i++){
                  this.eachHour.push(res.data[i].eachHour)                       // 日期
                  this.numberSpeciesActive.push(res.data[i].numberSpeciesActive) // 数量
                }
                this.drawChart();
              })
            }).addTo(layer);
          }
        
          // 点击关闭
          esc.addEventListener('click', function(){
              smallBox.style.display = "none";
          })

        }).catch(err => {

	      })
      })
    },

    // 动物活动情况折线图
    drawChart(){
        let myChart = this.$echarts.init(document.getElementById("main"));
        let option = {
           title: {
            text: '时段拍摄统计',
            padding: [10,0,50,30],
            textStyle:{
                fontSize: 15,
                color: 'black',
                fontWeight: 500
            },
          },
          grid: {
              left: '5%',
              right: '8%',
              top: '15%',
              bottom:'28%',
              containLabel: true
          },
          xAxis: {
              type: 'category',
              name: '日期',
              data: this.eachHour
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: this.numberSpeciesActive,
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
        window.onresize = function () {
          myChart.resize();
        }
    }

},
  mounted(){
    this.getAnimalNumber();
  }
}
</script>

<style scoped>
  .box{
    width: 98%;
    height: 53.5rem;
    background-color:white;
    margin: 0 auto;
    margin-top: 1rem;
    /* position: fixed; */
  }
  .nav{
    width: 100%;
    height: 3rem;
    background-color: white;
  }
  .realtime-red h1{
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


    /* left */
  .left{
    width: 80%;
    height: 100%;
    float: left;
  }
  #container{
    border: 2px solid gray;
    width: 97%;
    height: 94%;
    margin: 2.1% auto;
    border-radius: 5px;
  }

  /* 物种选择 */
  .right{
    width: 20%;
    height: 100%;
    float: right;
    padding: 1.4% 0;
  }
  .top{
    width: 98%;
    height: 7.5%;
    background-color: #eeeeee;
  }
  .top h3{
    width: 35%;
    float: left;
    padding: 16px 0 0 10px;
    font-weight: normal;
  }
  .timechoose{
    width:65%;
    margin-top: 10px;
    float: right;
  }

  /* .timechoose2{
    width:35%;
    margin-top: 10px;
    float: right;
  } */

  .bottom{
    width: 98%;
    height: 91.5%;
    background-color: #eeeeee;
  }
  .el-radio-group{
    margin-left: 9%;
    margin-top: 5%;
  }
  .is-checked[data-v-13c638e2] {
    width:18%;
    padding: 20px 20px;
}
  .el-radio{
    width: 18%;
    padding: 20px 20px;
  }
  .is-checked{
    width: 26%;
    padding: 20px 20px;
  }
  .container{
    border: 2px solid gray;
    width: 97%;
    height: 94%;
    margin: 2.1% auto;
    border-radius: 5px;
  }

  #alert{
    width:30%;
    height: 30%;
    background-color: white;
    border-radius: 10px;
    display: none;
    position: absolute;
  }
  .button2{
    width: 20%;
    height: 15%;
    margin: 15px 0 0 20px;
  }
  .block3{
    width: 50%;
    float: right;
    margin: 10px 35px 0 0;
  }
  .timechoose2{
    width: 100%;
  }
  #main{
    width: 100%;
    height: 100%;
  }

#esc{
  width: 5%;
  height: 10%;
  position: absolute;
  top: 2px;
  right: 2px;
  border-radius: 10px;
  cursor: pointer;
}
#esc:hover{
  width: 5.5%;
  height: 11%;
}
</style>