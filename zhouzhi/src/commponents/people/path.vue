<template>
  <div class="intrude">
      <div class="nav">
      <h1>巡护监测-路线配置</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div id="map" class="container"></div>
      <div class="list">

        <div class="list-nav">
          <h3>巡护路线(0条)</h3>
        </div>
        <div class="list-nav2">
          <h5>已有路线列表</h5>
          <span>（APP可同步）</span>
        </div>

        <div class="list-content">
          <el-table
            :data="tableData2"
            height="600"
            border
            style="width: 100%">
            <el-table-column
              prop="find"
              label="发现"
              width="110">
            </el-table-column>
            <el-table-column
              prop="time"
              label="采集时间"
              width="155">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="位置"
              width="75">
              <i class="el-icon-map-location"></i>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="75">
                <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">
                  <i class="el-icon-edit-outline"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
        return{
          isGreen1:true,
          isGreen2:false,
          options: [{
              value: '选项1',
              label: '保护站一'
            }, {
              value: '选项2',
              label: '保护站二'
            }, {
              value: '选项3',
              label: '保护站三'
            }, {
              value: '选项4',
              label: '保护站四'
            }, {
              value: '选项5',
              label: '保护站五'
            }],
            value: '',
            showGroup: false,
            longitude: 36.26153,
            latitude: 106.39212,
            // tableData2: [{
            //   find: '怪柳',
            //   time: '2020-10-09 14:03'
            // }, {
            //   find: '狗娃花',
            //   time: '2020-10-09 13:23'
            // }, {
            //   find: '冷蒿',
            //   time: '2020-10-09 12:50'
            // }, {
            //   find: '菊花',
            //   time: '2020-10-09 12:23'
            // }, {
            //   find: '铁线莲',
            //   time: '2020-10-09 11:31'
            // }, {
            //   find: '小红菊',
            //   time: '2020-10-09 11:20'
            // }, {
            //   find: '阿尔泰狗娃花',
            //   time: '2020-10-09 12:23'
            // }, {
            //   find: '牛儿苗',
            //   time: '2020-10-09 11:31'
            // }, {
            //   find: '铁线莲',
            //   time: '2020-10-09 11:20'
            // }]
        }
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    setMap(){
      var map = new ztmapgl.Map('map', {
        center:     [108.227707,33.982080],
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav{
    width: 100%;
    height: 3rem;
    background-color: white;
  }
  .intrude h1{
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
.container{
  border: 2px solid gray;
  width: 97%;
  height: 94%;
  border-radius: 5px;
}
.list{
    width: 26rem;
    height: 48rem;
    border-radius: 8px;
    position: absolute;
    top: 2.7rem;
    right: 2.7rem;
    background-color: #fff;
    -webkit-box-shadow: 0 3px 24px 0 rgba(0,0,0,.12);
    box-shadow: 0 3px 24px 0 rgba(0,0,0,.12);
    z-index: 99;
}
.list-nav{
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
}
.list-nav h3{
  margin-left: 6%;
}
.list-nav2{
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  background-color: #F5F5F5;
}
.list-nav2 h5{
  margin-left: 6%;
}
.list-content{
  width: 100%;
  height: 80%;
}
.buttonOne{
  width: 24%;
  height: 50%;
  background-color: 		#F5F5F5;
  border: 1px solid 	#D3D3D3;
  color: black;
  border-radius: 20px;
  cursor: pointer;
  float: left;
  margin: 10px 0 0 10px;
  outline:none;
}
.buttonOne2{
  width: 24%;
  height: 50%;
  background-color: 		#3CB371;
  border: 1px solid 	#D3D3D3;
  color: black;
  border-radius: 20px;
  cursor: pointer;
  float: left;
  margin: 10px 0 0 10px;
  color: white;
}
.buttonTwo{
  width: 24%;
  height: 50%;
  background-color: 		#F5F5F5;
  border: 1px solid 	#D3D3D3;
  color: black;
  border-radius: 20px;
  cursor: pointer;
  float: left;
  margin: 10px 0 0 10px;
  outline:none;

}
.buttonTwo2{
  width: 24%;
  height: 50%;
  background-color: 		#3CB371;
  border: 1px solid 	#D3D3D3;
  color: black;
  border-radius: 20px;
  cursor: pointer;
  float: left;
  margin: 10px 0 0 10px;
  color: white;

}
.choose{
  width: 40%;
  float: left;
  margin: 10px 0 0 10px;
}
.page{
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
}
.el-pagination {
    white-space: nowrap;
    color: #303133;
    font-weight: 700;
}
.el-icon-edit-outline{
  font-size: 20px;
}
.el-icon-map-location{
  font-size: 20px;
}

</style>