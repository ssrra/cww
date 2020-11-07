<template>
  <div class="screening">
      <div class="nav">
        <h1>红外相机-筛查展示</h1>
        <i class="el-icon-s-unfold" @click="goback()"></i>
        <a>|</a>
        <span>管理员</span>
        <div class="circle"><i class="el-icon-s-custom" ></i></div>
      </div>
      <div class="box">
      <div class="videobox">
      <h4>筛查结果</h4>
      <div class="videoboxs">
        <div class="nav2">

          <!-- 监测点位 -->
          <el-select class="kind" filterable  v-model="value" >
            <el-option
              v-for="item in options"
              :key="item.cameraId"
              :label="item.cameraName"
              :value="item.cameraId">
            </el-option>
          </el-select>

          <!-- 种类选择器 -->
          <el-select class="kind1" filterable  v-model="value1" >
            <el-option
              v-for="item in options1"
              :key="item.beastChina"
              :value="item.beastChina">
            </el-option>
          </el-select>

          <!-- 时间选择器 -->
          <div class="block">
            <el-date-picker
              class="timechoose"
              v-model="value2"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              >
            </el-date-picker>
          </div>

          <el-row>
            <el-button type="success" @click="getAnimalsVideoScreening()">确定</el-button>
          </el-row>

        </div>
        <div class="content">
          <div class="list">
              <li class="list_image" v-for="(item,index) in animalImagePath" :key="index">
                <img class="image" :src="url + item" alt="">
                <div class="kindnum">
                  <span>{{animalKind}}</span>
                  <span>{{animalNum}}</span>
                </div>
              </li>
          </div>   
          <div class="list2">
            <div class="xiazai" v-for="(item,index) in animalVideoPath" :key="index">
                <a :href="url + item" download><img class="vedio" src="../../../public/img/base/xiazai1.png" alt=""></a>
            </div>    
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="currentPage" 
            :total="totalCount"
            :page-size='pageSize'>
          </el-pagination>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import {getCamera,getAnimal,getAnimalsVideo} from '../../api/axiosApi.js'

export default {
  data(){
    return {
      options: [],
      options1: [],
      value: 1, // 请求时的摄像头参数
      value1: '猴子',// 请求时的动物种类
      value2: ['2019-01-01 00:00:00','2020-11-04 00:00:00'],// 请求时的时间参数
      startDate: '', //开始时间
      endDate: '',   // 结束时间
      animalImagePath: [],// 动物识别视频---图片
      animalVideoPath: [],// 动物识别视频
      animalKind: [],     // 动物种类
      animalNum: [],      // 动物数量
      // url:'http://192.168.20.222/',
      url:'http://192.168.20.103/filter_aft/', //测试地址
      // url:'http://192.168.1.130/filter_aft/', //测试地址
      pageSize: 8, // 每页的数据
      currentPage: 1,
      totalCount: this.totalCount
    }
  },

  watch: {
    value: function (currentPage) {
      this.currentPage = 1;
    },
    value1: function (currentPage) {
      this.currentPage = 1;
    },
    value2: function (currentPage) {
      this.currentPage = 1;
    }
  },

  methods:{
    goback(){
      this.$router.push('/home')
    },

    handleCurrentChange(val) {
        // 改变默认的页数
        this.currentPage=val
        this.getAnimalsVideoScreening(val,1)
    },

    // 动物视频筛查展示
    getAnimalsVideoScreening(){
      // 获取监测点位
      getCamera().then(res=>{
        this.options = res.data;
        // console.log(this.options)
      })
      // 获取动物种类
      getAnimal().then(res=>{
        this.options1 = res.data;
        // console.log(this.options1)
      })
      // 获取动物视频
      this.startDate = this.value2[0];
      this.endDate = this.value2[1];
      let data={cameraId:this.value,animalType:this.value1,startDate:this.startDate,endDate:this.endDate,currPage:this.currentPage,pageSize:this.pageSize};
      console.log(data)
      getAnimalsVideo(data).then(res=>{
        console.log(res.data)
        this.totalCount = res.data.totalCount;

        this.animalImagePath = [];
        this.animalVideoPath = [];
        for(let i=0;i<res.data.list.length;i++){
          // 动物视频图片
          this.animalImagePath.push(res.data.list[i].imgPath);
          // 动物视频
          this.animalVideoPath.push(res.data.list[i].animalPath);
          // 动物种类
          this.animalKind = res.data.list[i].animalType;
          // 动物数量
          this.animalNum = res.data.list[i].animalCounts;
          // console.log(this.animalKind,this.animalNum)
          // console.log(this.animalImagePath)
          // console.log(this.animalVideoPath)
        }
      })
    }
  },
  created(){
    this.getAnimalsVideoScreening();
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
  .screening h1{
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

  .videobox{
    height: 53.5rem;
  }
  .videobox h4{
    padding-top: 2.45%;
    margin-left: 1.55%;
    font-size: 18px;
    font-weight: normal;
  }
  .videoboxs{
    width: 97%;
    height: 43.75rem;
    background: rgba(128, 128, 128, 0.1);
    margin: 25px auto;
  }
  .nav2{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
  }
  .el-pagination {
    text-align: center;
    margin-top: -600px;
  }
.datachoose{
  width: 70%;
  margin-left: 15%;
}
.kind{
  width: 8%;
  margin-left: 4%;
}
.kind1{
  width: 8%;
  margin-left: 1%;
}
.timechoose{
  width: 85%;
  margin-left: 4%;
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
  #reportCaremaNum{
    width: 100px;
    height: 25px;
    margin-left: 30px;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 5px;
    background-color: transparent;
  }
  .day-input{
    width: 130px;
    height: 25px;
    margin-left: 60px;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 5px;
    background-color: transparent;
  }
  .el-button--success {
    margin-left: -50%;
  }
  .content{
    height: 620px;
  }
  .list{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .list2{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    bottom:620px;
  }
  .list .list_image{
    width: 20%;
    height: 200px;
    margin-left: 4%;
  }
  .list .image{
    width: 100%;
    height: 200px;
    border-radius: 8px;
    border: 2px solid white;
  }
  .xiazai{
    width: 20%;
    height: 200px;
    margin-left: 4%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .vedio{
    width: 40px;
    height: 40px;
    cursor: pointer;

  }
  .vedio:hover{
    width: 45px;
    height: 45px;
    cursor: pointer;
  } 
  .page{
    width:100%;
    height:10%;
    margin-top: -603px;
  }
  .kindnum{
    width: 98.6%;
    height: 15%;
    padding: 0 1.5rem;
    background-color: black;
    position: relative;
    top: -35px;
    left: 2.2px;
    opacity: 0.5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
  }
  .kindnum span{
    color: white;
  }
</style>