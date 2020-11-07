<template>
  <div class="fire">
      <div class="nav">
      <h1>防火预警-地理位置</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div id="map" class="fireMap-container"></div>
    </div>
  </div>
</template>

<script>

export default {
  components:{
    
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    paintMap(){
      //108.156793,33.978569
      var map = new ztmapgl.Map('map', {
        center: [108.156793,33.978569],
        zoom: 14,
        minZoom:1,
        maxZoom:19,
        spatialReference:{
          projection : 'baidu'
        },
        baseLayer: new ztmapgl.TileLayer('base', {
          'urlTemplate' : 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1',
          'subdomains'  : [0,1,2,3,4,5,6,7,8,9],
          'attribution' :  '&copy; <a target="_blank" href="http://map.baidu.com">Baidu</a>'
        })
      });

      var center = map.getCenter();

      var layer = new ztmapgl.VectorLayer('vector').addTo(map);

      var marker1 = new ztmapgl.Marker(
        [108.149331,33.965219],
        {
          'symbol' : {
            'markerFile'   : 'img/base/manage-station.png',
            'markerWidth'  : 30,
            'markerHeight' : 44,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1
          }
        }
      ).addTo(layer);

      var marker2 = new ztmapgl.Marker(
        [108.141961,34.004326],
        {
          'symbol' : {
            'markerFile'   : 'img/base/fire-icon.png',
            'markerWidth'  : 42,
            'markerHeight' : 42,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1
          }
        }
      ).addTo(layer);

      var marker3 = new ztmapgl.Marker(
        [108.166695,34.00109],
        {
          'symbol' : {
            'markerFile'   : 'img/base/fire-icon.png',
            'markerWidth'  : 42,
            'markerHeight' : 42,
            'markerDx'     : 0,
            'markerDy'     : 0,
            'markerOpacity': 1
          }
        }
      ).addTo(layer);


      var line1 = new ztmapgl.LineString([
        [108.149331,33.965219],
        [108.141961,34.004326]
      ], {
        arrowStyle : null, // arrow-style : now we only have classic
        arrowPlacement : 'vertex-last', // arrow's placement: vertex-first, vertex-last, vertex-firstlast, point
        visible : true,
        editable : true,
        cursor : null,
        shadowBlur : 0,
        shadowColor : 'black',
        draggable : false,
        dragShadow : false, // display a shadow during dragging
        drawOnAxis : null,  // force dragging stick on a axis, can be: x, y
        symbol: {
          'lineColor' : '#1bbc9b',
          'lineWidth' : 3
        }
      });

      new ztmapgl.VectorLayer('vector1', line1).addTo(map);

      var line2 = new ztmapgl.LineString([
        [108.149331,33.965219],
        [108.166695,34.00109]
      ], {
        arrowStyle : null, // arrow-style : now we only have classic
        arrowPlacement : 'vertex-last', // arrow's placement: vertex-first, vertex-last, vertex-firstlast, point
        visible : true,
        editable : true,
        cursor : null,
        shadowBlur : 0,
        shadowColor : 'black',
        draggable : false,
        dragShadow : false, // display a shadow during dragging
        drawOnAxis : null,  // force dragging stick on a axis, can be: x, y
        symbol: {
          'lineColor' : '#1bbc9b',
          'lineWidth' : 3
        }
      });

      new ztmapgl.VectorLayer('vector2', line2).addTo(map);


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
    /* position: fixed; */
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
</style>