<template>
  <div class="fire">
      <div class="nav">
      <h1>防火预警-预警抓图</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div id="map" class="fireMap-container"></div>
      <div  v-if="imgOrNot" class="img-box">
        <div class="which-camera">
          <h3>防火点1</h3>
        </div>
        <div class="svg-box">
          <svg @click="closeImg()" class="icon" style="width: 2em; height: 2em;vertical-align: middle;fill: #ccc;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1875"><path d="M512 23.272727c269.917091 0 488.727273 218.810182 488.727273 488.727273a486.632727 486.632727 0 0 1-84.945455 275.409455 46.545455 46.545455 0 0 1-76.846545-52.526546A393.541818 393.541818 0 0 0 907.636364 512c0-218.507636-177.128727-395.636364-395.636364-395.636364S116.363636 293.492364 116.363636 512s177.128727 395.636364 395.636364 395.636364a395.170909 395.170909 0 0 0 125.44-20.293819 46.545455 46.545455 0 0 1 29.486545 88.296728A488.261818 488.261818 0 0 1 512 1000.727273C242.082909 1000.727273 23.272727 781.917091 23.272727 512S242.082909 23.272727 512 23.272727z m-115.2 307.712L512 446.138182l115.2-115.2a46.545455 46.545455 0 1 1 65.815273 65.861818L577.861818 512l115.2 115.2a46.545455 46.545455 0 1 1-65.861818 65.815273L512 577.861818l-115.2 115.2a46.545455 46.545455 0 1 1-65.815273-65.861818L446.138182 512l-115.2-115.2a46.545455 46.545455 0 1 1 65.861818-65.815273z" p-id="1876"></path></svg>
        </div>
        <div class="img-container">
          <img src="../../assets/image/预警抓图1.png" alt="">
        </div>
      </div>
      <div v-else class="zero-img-box">
        <h3>暂无火情预警抓图！</h3>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      imgOrNot:true
    }
  },
  components:{
    
  },
  methods:{
    closeImg(){
      this.imgOrNot=false;
    },
    goback(){
      this.$router.push('/home')
    },
    paintMap(){
      //33.982080,108.227707
      var map = new ztmapgl.Map('map', {
        center:     [108.227707,33.982080],
        zoom:  8,
        baseLayer : new ztmapgl.TileLayer('base',{
          urlTemplate: 'http://mt{s}.google.cn/vt/lyrs=s@113&gl=cn&src=app&x={x}&y={y}&z={z}&s=Galil',
          subdomains: ['0','1','2','3']          
        })
      });

      var center = map.getCenter();

      var layer = new ztmapgl.VectorLayer('vector').addTo(map);

      var marker1 = new ztmapgl.Marker(
        center.sub(0.19, 1),
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
        center.sub(2.5, 0.5),
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
        center.sub(-0.3, -1.5),
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
        center.add(3, 0),
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
    this.paintMap();
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
    position: relative;
  }
  .nav{
    width: 100%;
    height: 3rem;
    background-color: white;
  }
  .fire h1{
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
.fireMap-container{
  width: 100%;
  height: 100%;
}
.img-box{
  width: 50%;
  height: 60%;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.img-box .svg-box{
  height: 8%;
  float: right;
}
.img-box .which-camera{
  height: 8%;
  float: left;
  margin-left: 2rem;
  display: flex;
  align-items: center;
  color: #fff;
}
.img-box .img-container{
  width: 100%;
  height: 92%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-box .img-container img{
  width: 90%;
  /* margin-top: 10%; */
}
.zero-img-box{
  width:15%;
  height: 10%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
}
.zero-img-box h3{
  color: #fff;
}
</style>