<template>
  <div class="fire">
      <div class="nav">
      <h1>防火预警-实时画面</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div id="map" class="fireMap-container"></div>
      <div class="events" id="show-or-not">
        <div class="svg-box">
          <svg @click="closeImg" class="icon" style="width: 2em; height: 2em;vertical-align: middle;fill: #ccc;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1875"><path d="M512 23.272727c269.917091 0 488.727273 218.810182 488.727273 488.727273a486.632727 486.632727 0 0 1-84.945455 275.409455 46.545455 46.545455 0 0 1-76.846545-52.526546A393.541818 393.541818 0 0 0 907.636364 512c0-218.507636-177.128727-395.636364-395.636364-395.636364S116.363636 293.492364 116.363636 512s177.128727 395.636364 395.636364 395.636364a395.170909 395.170909 0 0 0 125.44-20.293819 46.545455 46.545455 0 0 1 29.486545 88.296728A488.261818 488.261818 0 0 1 512 1000.727273C242.082909 1000.727273 23.272727 781.917091 23.272727 512S242.082909 23.272727 512 23.272727z m-115.2 307.712L512 446.138182l115.2-115.2a46.545455 46.545455 0 1 1 65.815273 65.861818L577.861818 512l115.2 115.2a46.545455 46.545455 0 1 1-65.861818 65.815273L512 577.861818l-115.2 115.2a46.545455 46.545455 0 1 1-65.815273-65.861818L446.138182 512l-115.2-115.2a46.545455 46.545455 0 1 1 65.861818-65.815273z" p-id="1876"></path></svg>
        </div>
        <div id="events"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      
    }
  },
  components:{
    
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    closeImg(){
      document.getElementById('events').innerHTML= '<div></div>'
      document.getElementById("show-or-not").style.display="none";
    },
    paintMap(){
      var map = new ztmapgl.Map('map', {
        center:     [108.227707,33.982080],
        zoom:  11,
        baseLayer : new ztmapgl.TileLayer('base',{
          urlTemplate: 'http://mt{s}.google.cn/vt/lyrs=s@113&gl=cn&src=app&x={x}&y={y}&z={z}&s=Galil',
          subdomains: ['0','1','2','3']          
        })
      });

      var center = map.getCenter();

      var layer = new ztmapgl.VectorLayer('vector').addTo(map);

      var marker1 = new ztmapgl.Marker(
        [108.27707,33.852080],
        {
          'symbol' : {
            'markerFile'   : 'img/base/camera-fire.png',
            'markerWidth'  : 50,
            'markerHeight' : 50,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1
          }
        }
      ).addTo(layer);
      addListen1();
      function addListen1() {
        //mousemove and touchmove is annoying, so not listening to it.
        marker1.on('mousedown mouseup click dblclick contextmenu touchstart touchend', onEvent1);
      }
      function removeListen1() {
        //mousemove and touchmove is annoying, so not listening to it.
        marker1.off('mousedown mouseup click dblclick contextmenu touchstart touchend', onEvent1);
      }
      var events = [];
      function onEvent1(param) {
        events.push(param);
        var content = '<h3 style="margin-bottom:5px">防火点3</h3><iframe src="http://120.253.72.183:10800/play.html?channel=23&iframe=yes&aspect=640x360" width="640" height="360" allowfullscreen allow="autoplay" scrolling="no"></iframe>';
        console.log(document.getElementById("show-or-not"));
        document.getElementById("show-or-not").style.display="block";
        document.getElementById('events').innerHTML = '<div>' + content + '</div>';
        //return false to stop event propagation
        return false;
      }


      var marker2 = new ztmapgl.Marker(
        [108.177707,33.802080],
        {
          'symbol' : {
            'markerFile'   : 'img/base/camera-fire.png',
            'markerWidth'  : 50,
            'markerHeight' : 50,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1
          }
        }
      ).addTo(layer);
      addListen2();
      function addListen2() {
        //mousemove and touchmove is annoying, so not listening to it.
        marker2.on('mousedown mouseup click dblclick contextmenu touchstart touchend', onEvent2);
      }
      function removeListen2() {
        //mousemove and touchmove is annoying, so not listening to it.
        marker2.off('mousedown mouseup click dblclick contextmenu touchstart touchend', onEvent2);
      }
      var events = [];
      function onEvent2(param) {
        events.push(param);
        var content = '<h3 style="margin-bottom:5px">防火点2</h3><iframe src="http://120.253.72.183:10800/play.html?channel=23&iframe=yes&aspect=640x360" width="640" height="360" allowfullscreen allow="autoplay" scrolling="no"></iframe>';
        console.log(document.getElementById("show-or-not"));
        document.getElementById("show-or-not").style.display="block";
        document.getElementById('events').innerHTML = '<div>' + content + '</div>';
        //return false to stop event propagation
        return false;
      }


      var marker4 = new ztmapgl.Marker(
        [108.227707,33.982080],
        {
          'symbol' : {
            'markerFile'   : 'img/base/camera-fire.png',
            'markerWidth'  : 50,
            'markerHeight' : 50,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1
          }
        }
      ).addTo(layer);
      addListen();
      function addListen() {
        //mousemove and touchmove is annoying, so not listening to it.
        marker4.on('mousedown mouseup click dblclick contextmenu touchstart touchend', onEvent);
      }
      function removeListen() {
        //mousemove and touchmove is annoying, so not listening to it.
        marker4.off('mousedown mouseup click dblclick contextmenu touchstart touchend', onEvent);
      }
      var events = [];
      function onEvent(param) {
        events.push(param);
        var content = '<h3 style="margin-bottom:5px">防火点1</h3><iframe src="http://120.253.72.183:10800/play.html?channel=24&iframe=yes&aspect=640x360" width="640" height="360" allowfullscreen allow="autoplay" scrolling="no"></iframe>';
        console.log(document.getElementById("show-or-not"));
        document.getElementById("show-or-not").style.display="block";
        document.getElementById('events').innerHTML = '<div>' + content + '</div>';
        //return false to stop event propagation
        return false;
      }


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
.events{
  position: absolute;
  background-color:rgba(13, 13, 13, 0.5);
  /* padding:10px 10px 10px 10px;font:13px bold sans-serif; */
  color:#fff;
  left:0px;
  top:0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  width:700px;
  height:450px;
  overflow:hidden;
  display: none;
}
#events{
  overflow:hidden;
  width:700px;
  height:420px;
  display:flex;
  justify-content: center;
  align-items: center;
}
.events .svg-box{
  width: 700px;
  height: 30px;
  position: relative;
}
.events .svg-box svg{
  position: absolute;
  right: 0;
  top: 0;
}
</style>