<template>
  <div class="history-red">
     <div class="nav">
      <h1>红外相机-历史数据</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div class="videobox">
      <div class="videoboxs">
        <div class="nav2">
          
          <!-- 选择日期 -->
            <div class="block">
              <el-date-picker
                class="datachoose"
                v-model="date"
                type="date"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>

          <!-- 监测点位 -->
          <el-select class="kind" v-model="value" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          <el-row>
            <el-button type="success" @click="getBirdsVideos()">确定</el-button>
          </el-row>
        </div>
        <div class="content">
          <div class="list">
              <li class="list_image" v-for="(item,index) in aiBirdImagePathList" :key="index">
                <img class="image" :src="url + item" alt="">
              </li>
          </div>   
          <div class="list2">
            <div class="xiazai" v-for="(item,index) in aiBirdVideoPathList" :key="index">
                <a :href="url + item" download><img class="vedio" src="../../../public/img/base/xiazai1.png" alt=""></a>
            </div>    
          </div>
          <div class="page">
            <v-pagination :total="total" :current-page="current" @pagechange="getBirdsVideos"></v-pagination>
          </div>   
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import {getBirdVideo} from '../../api/axiosApi.js'
import pagination from '../base/pagenation'

export default {
  data(){
    return {
      options: [{
          value: 1,
          label: '监测点位1'
        }, {
          value: 2,
          label: '监测点位2'
        }, {
          value: 3,
          label: '监测点位3'
        }],
      value: 1,// 请求时的摄像头参数
      date: '',  // 请求时的时间参数
      aiBirdImagePath: [],// 鸟类识别视频---图片
      aiBirdVideoPath: [], //鸟类识别视频
      aiBirdImagePathList: [],
      aiBirdVideoPathList: [],
      // url:'http://192.168.20.222/',
      url:'http://192.168.20.103/', //测试地址
      total: 50, // 总条数
      display: 8, // 每页的数据
      current: 1, //当前页数
    }
  },
  components: {
    'v-pagination': pagination
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    // 获取当前日期
    getDayNow(){
      let obj=new Date();
      let month=obj.getMonth();
      if(month+1<=9){
        month='0'+(month+1);
      }else{
        month=month+1
      }
      let day=obj.getDate();
      if(day<10){
        day='0'+day;
      }
      let dayNow=obj.getFullYear()+'-'+month+'-'+day;
      this.date=dayNow;
      console.log(this.date)

    },

    // 获取鸟类识别视频数据
    getBirdsVideos(currentPage){
      let data={date:this.date,cameraNum:this.value};
      // console.log(this.date)
      getBirdVideo(data).then(res=>{
        console.log(res.data)
        this.aiBirdImagePath = [];
        this.aiBirdVideoPath = [];
        for(let i=0;i<res.data.length;i++){
          this.aiBirdImagePath.push(res.data[i].aiBirdImagePath);
          this.aiBirdVideoPath.push(res.data[i].aiBirdVideoPath);
          // console.log(this.aiBirdVideoPath)
        }

        // 分页
        this.total=this.aiBirdVideoPath.length;    
          // console.log(this.total)
          // 获取每一页的数据
            if(currentPage==undefined){
              currentPage=1;
            }
            var start = (currentPage - 1) * 8;
            var end = currentPage * 8;
            this.aiBirdImagePathList = this.aiBirdImagePath.slice(start, end);
            this.aiBirdVideoPathList = this.aiBirdVideoPath.slice(start, end);
      })
    }

  },

    created(){
      this.getDayNow();
      // this.getBirdsVideos();
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
  }
  .nav{
    width: 100%;
    height: 3rem;
    background-color: white;
  }
  .history-red h1{
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 53.5rem;
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
    padding: 0;
    text-align: center;
    margin-top: 50px;
  } 
.el-icon-s-custom{
  float: right;
  font-size: 2rem;
  cursor: pointer;
  color: white;
  margin-right: 3px;
  margin-top: 1px;
}
.datachoose{
  width: 70%;
  margin-left: 25%;
}
.kind{
  width: 8%;
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
  .el-button--success {
    margin-left: 20%;
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
</style>