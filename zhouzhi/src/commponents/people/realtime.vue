<template>
  <div class="twice">
      <div class="nav">
      <h1>定点识别-实时识别</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="bigboix">
    <!-- 地图 -->
    <div id="map" class="container"></div>
    <div id="box" v-show="isShow">
      <div class="solid"> <span>校准结果</span> 
        <div class="smallboxesc"><img id="esc" src="../../../public/img/base/esc.png" alt=""></div>
      </div>
      <div class="left">
        <div class="img">
          <iframe src="http://120.253.72.183:10800/play.html?channel=20&iframe=yes&aspect=460x310'" width="100%" height="100%" allowfullscreen allow="autoplay" scrolling="no"></iframe>
        </div>
      </div> 
      <div class="right">
        <div class="righttop">
          <h3>云台控制端</h3>
          <div class="box2">
            <div class="btn_box2">
                <el-button class="butto" round icon="el-icon-plus" ></el-button>
                <el-button class="butto" round icon="el-icon-minus" ></el-button>
            </div>
            <div class="btn_box">
                  <el-button class="butt" round icon="el-icon-top-left"     @click="directionControl(4)"></el-button>
                  <el-button class="butt" round icon="el-icon-top"          @click="directionControl(0)"></el-button>
                  <el-button class="butt" round icon="el-icon-top-right"    @click="directionControl(6)"></el-button>
                  <el-button class="butt" round icon="el-icon-back"         @click="directionControl(2)"></el-button>
                  <el-button class="butt" round icon="el-icon-refresh" ></el-button>
                  <el-button class="butt" round icon="el-icon-right"        @click="directionControl(3)"></el-button>
                  <el-button class="butt" round icon="el-icon-bottom-left"  @click="directionControl(5)"></el-button>
                  <el-button class="butt" round icon="el-icon-bottom"       @click="directionControl(1)"></el-button>
                  <el-button class="butt" round icon="el-icon-bottom-right" @click="directionControl(7)"></el-button>
              </div>
          </div>
        </div>
        <div class="rightbottom">
          <h3>物种统计</h3>
          <div class="kind">
            <ul class="animal">
              <li>种类</li>
              <li v-for="(item,index) in kind" :key="index">{{ item.name }}</li>
            </ul>
            <ul class="num">
              <li>数量</li>
              <li v-for="(item,index) in kind" :key="index">{{ item.num }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isShow: false,
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        value1: '',
        kind:[
          {'name':'苍鹭' , 'num':'25' },
          {'name':'赤麻鸭' , 'num':'25' },
          {'name':'绿头鸭' , 'num':'25' },
          {'name':'苍鹭' , 'num':'25' },
          {'name':'棕头鸥' , 'num':'25' }
        ]
    }
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    setMap() {
      var map = new ztmapgl.Map('map', {
        center:     [108.110555555556,33.8375],
        zoom:  13,
        baseLayer : new ztmapgl.TileLayer('base',{
          urlTemplate: 'http://mt{s}.google.cn/vt/lyrs=s@113&gl=cn&src=app&x={x}&y={y}&z={z}&s=Galil',
          subdomains: ['0','1','2','3']          
        })
      });

      var center = map.getCenter();
      var layer = new ztmapgl.VectorLayer('vector').addTo(map);
      var Box = document.getElementById("box");
      var esc = document.getElementById("esc");
      
      var marker1 = new ztmapgl.Marker(
        [108.099166666667,33.8780555555556],
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
            'markerFile'   : 'img/base/camera2.png',
            'markerWidth'  : 40,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : -10,
            'markerOpacity': 1,
            'textFaceName' : 'sans-serif',
            'textName' : "0001",
            'textFill' : 'white',
            'textHorizontalAlignment' : 'center',
            'textSize' : 15
          }
        }
      ).on('click', param=>{
              this.isShow=!this.isShow
            }).addTo(layer);;

      var marker2 = new ztmapgl.Marker(
        [108.105833333333,33.8447222222222],
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
            'markerFile'   : 'img/base/camera2.png',
            'markerWidth'  : 40,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : -10,
            'markerOpacity': 1,
            'textFaceName' : 'sans-serif',
            'textName' : "0002",
            'textFill' : 'white',
            'textHorizontalAlignment' : 'center',
            'textSize' : 15
          }
        }
      ).on('click', param=>{
              this.isShow=!this.isShow
            }).addTo(layer);

      var marker3 = new ztmapgl.Marker(
        [108.1225,33.8019444444444],
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
            'markerFile'   : 'img/base/camera2.png',
            'markerWidth'  : 40,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : -10,
            'markerOpacity': 1,
            'textFaceName' : 'sans-serif',
            'textName' : "0003",
            'textFill' : 'white',
            'textHorizontalAlignment' : 'center',
            'textSize' : 15
          }
        }
      ).on('click', param=>{
              this.isShow=!this.isShow
            }).addTo(layer);

      var marker4 = new ztmapgl.Marker(
        [108.110555555556,33.8275],
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
            'markerFile'   : 'img/base/camera2.png',
            'markerWidth'  : 40,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : -10,
            'markerOpacity': 1,
            'textFaceName' : 'sans-serif',
            'textName' : "0004",
            'textFill' : 'white',
            'textHorizontalAlignment' : 'center',
            'textSize' : 15
          }
        }
      ).on('click', param=>{
              this.isShow=!this.isShow
            }).addTo(layer);

      var marker5 = new ztmapgl.Marker(
        [108.1175,33.8105555555556],
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
            'markerFile'   : 'img/base/camera2.png',
            'markerWidth'  : 40,
            'markerHeight' : 40,
            'markerDx'     : 0,
            'markerDy'     : -10,
            'markerOpacity': 1,
            'textFaceName' : 'sans-serif',
            'textName' : "0005",
            'textFill' : 'white',
            'textHorizontalAlignment' : 'center',
            'textSize' : 15
          }
        }
      ).on('click', param=>{
              this.isShow=!this.isShow
            }).addTo(layer);
      // 点击关闭
      esc.addEventListener('click', ()=>{
          Box.style.display = "none";
      })
    }
  },
  mounted(){
    this.setMap();
  }
}
</script>

<style scoped>
  #box{
    width: 70%;
    height: 43rem;
    background-color:white;
    position: absolute;
    border-radius: 10px;
    top: 15%;
    left: 20%;
  }
  .bigboix{
    width: 100%;
    height: 55.5rem ;
    background-color: gray;
    /* position: fixed; */
  }
  .nav{
    width: 100%;
    height: 3rem;
    background-color: white;
  }
  .twice h1{
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
  .solid{
   width: 98%;
   border-bottom: 2px solid white; 
   position: relative;
   top: 42px;
   left: 17px;
  }
  .solid span{
    display: block;
    font-size: 18px;
    margin-left: 10px;
    padding-bottom: 5px;
    color: white;
  }
    /* left */
  .left{
    width: 65%;
    height: 80%;
    float: left;
    margin: 3.5% auto;
  }
  .img{
    width: 94.8%;
    height: 100%;
    background: url(../../assets/image/result.png) no-repeat;
    background-size: 100% 100%;
    /* border: 5px solid black; */
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* right */
  .right{
    width: 34%;
    height: 80%;
    float: left;
    margin: 3.5% auto;
    background-color: white;
  }
  .righttop{
    width: 100%;
    height: 60%;
  }
  .box2{
    width: 60%;
    height: 60%;
    margin: 50px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    border-radius: 20px;
  }
  .btn_box{
    width: 54%;
    height: 75%;
    margin-right: 15px;
    /* border: 1px solid gray; */
  }
  .btn_box2{
    width: 20%;
    margin-right: 10px;
  }
  .el-button+.el-button {
      margin: 9px 0 0 0;
  }
.el-button.is-round {
    border-radius: 20px;
    padding: 10px 10px;
}
  .rightbottom{
    width: 100%;
    height: 37%;
  }
  .right h3{
    font-weight: normal;
    margin: 10px 0 0 10px;
  }
  /* 物种统计 */
  .kind{
    max-width: 550px;
    width: 100%;
    height: 70%;
    margin: 50px auto;
    border: 1px solid gray;
  }
  .animal{
    width: 100%;
    height: 50%;
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 1px solid gray;
  }
  .num{
    width: 100%;
    height: 50%;
    display: flex;
    flex-wrap: nowrap;
  }
  .kind li{
    width: 20%;
    height: 100%;
    border-right: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .kind li:first-child{
    width: 140px;
    font-weight: 800;
  }
  .kind li:last-child{
    border: none;
  }
  .butt{
    width: 30%;
  }
  .butto{
    width: 100%;
  }

  .container{
    width: 100%;
    height: 100%;
  }

#esc{
  width: 60px;
  height: 60px;
  position: absolute;
  top: -27px;
  right: 2px;
  border-radius: 10px;
  cursor: pointer;
}
#esc:hover{
  width: 65px;
  height: 65px;
}
</style>