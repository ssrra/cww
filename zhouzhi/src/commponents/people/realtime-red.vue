<template>
  <div class="realtime-red">
     <div class="nav">
      <h1>红外相机-实时数据</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>

    <div class="box">
      <div class="left">
        <!-- 地图 -->
        <div id="map" class="container"></div>
        <div class="smallbox" v-show="showGroup"></div>
      </div> 

      <div class="right">
        <!-- 实时监测 -->
        <div class="top">
          <h3>实时监测</h3>
            <div class="list1">
              <el-table
                :data="tableData1"
                height="241"
                border
                style="width: 100%">
                <el-table-column
                  prop="camera"
                  label="监测点位"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="视频"
                  width="240">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="时间"
                  width="230">
                </el-table-column>
              </el-table>
            </div>
        </div>
        <!-- 当前布设相机 -->
        <div class="bottom">
          <h3>当前布设相机</h3>
          <div class="list2">
            <el-table
              :data="tableData2"
              height="391"
              border
              style="width: 100%">
              <el-table-column
                prop="name"
                label="名称"
                width="130">
              </el-table-column>
              <el-table-column
                prop="id"
                label="监测时间"
                width="190">
              </el-table-column>
              <el-table-column
                prop="num"
                label="今日数量"
                width="110">
              </el-table-column>
               <el-table-column
                  fixed="right"
                  label="操作"
                  width="150">
                   <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, tableData)"
                      type="text"
                      size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
            </el-table>
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
            showGroup: false,
            longitude: 36.26153,
            latitude: 106.39212,
            tableData1: [{
              camera: '001',
              name: '001-2020-09-25.mp4',
              date: '2020-09-25'
            }, {
              camera: '002',
              name: '001-2020-09-25.mp4',
              date: '2020-09-25'
            }, {
              camera: '003',
              name: '001-2020-09-25.mp4',
              date: '2020-09-25'
            }, {
              camera: '004',
              name: '001-2020-09-25.mp4',
              date: '2020-09-25'
            }],
            tableData2: [{
              name: '松鼠',
              id: '001-2020-09-25.mp4',
              num: '3'
            }, {
              name: '松鼠',
              id: '001-2020-09-25.mp4',
              num: '3'
            }, {
              name: '松鼠',
              id: '001-2020-09-25.mp4',
              num: '3'
            }, {
              name: '松鼠',
              id: '001-2020-09-25.mp4',
              num: '3'
            }, {
              name: '松鼠',
              id: '001-2020-09-25.mp4',
              num: '3'
            }, {
              name: '松鼠',
              id: '001-2020-09-25.mp4',
              num: '3'
            }]
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
            'markerFile'   : 'img/base/camera.png',
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
            'markerFile'   : 'img/base/camera.png',
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
            'markerFile'   : 'img/base/camera.png',
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
            'markerFile'   : 'img/base/camera.png',
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
            'markerFile'   : 'img/base/camera.png',
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
    width: 65%;
    height: 100%;
    float: left;
  }
  .container{
    border: 2px solid gray;
    width: 97%;
    height: 94%;
    margin: 2.1% auto;
    border-radius: 5px;
  }

  /* right */
  .right{
    width: 35%;
    height: 100%;
    float: left;
    padding: 1.4% 0;
  }
  /* 实时监测 */
  .top{
    width: 100%;
    height: 40%;
  }
  .top h3{
    width: 100%;
    padding: 10px 0 0 10px;
  }
  /* 当前布设相机 */
  .bottom{
    width: 100%;
    height: 60%;
  }
  .bottom h3{
    width: 100%;
    padding: 10px 0 0 10px;
  }

/* 实时监测 */
.list1{
  width: 100%;
  height: 80%;
  margin-top: 20px;
}

/* 当前布设相机 */
.list2{
  width: 100%;
  height: 93%;
  margin-top: 20px;
}




.smallbox{
  width: 150px;
  height: 250px;
  background-color: gray;
  border-radius: 5px;
}
</style>