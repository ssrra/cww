<template>
  <div class="BirdsVideo">
    <img class="back" src="../../../public/img/back2.png"  @click="toBirdsVideo">
    <h1>鸟类识别视频展示</h1>
    <div class="videobox">
      <div class="videoboxs">
        <div class="nav">
          <input type="date" v-model="date" class="month-input"  @change="getBirdsVideos()">
          <select  id="reportCaremaNum" v-model="camera" @change="getBirdsVideos()">
            <option value="1">监测点位1</option>
            <option value="2">监测点位2</option>
            <!-- <option value="3">监测点位3</option> -->
          </select>
        </div>
        <div class="content">
          <div class="list">
              <li class="list_image" v-for="(item,index) in aiBirdImagePathList" :key="index">
                <img class="image" :src="url + item" alt="">
              </li>
          </div>   
          <div class="list2">
            <div class="xiazai" v-for="(item,index) in aiBirdVideoPathList" :key="index">
                <a :href="url + item" download><img class="vedio" src="../../../public/img/xiazai1.png" alt=""></a>
            </div>    
          </div>
          <div class="page">
            <v-pagination :total="total" :current-page="current" @pagechange="getBirdsVideos"></v-pagination>
          </div>   
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getBirdVideo} from '@/api/axiosApi.js'
import pagination from '@/components/base/pagenation.vue'

export default {
  data(){
    return {
      date: '',  // 请求时的时间参数
      camera: 1, // 请求时的摄像头参数
      aiBirdImagePath: [],// 鸟类识别视频---图片
      aiBirdVideoPath: [], //鸟类识别视频
      aiBirdImagePathList: [],
      aiBirdVideoPathList: [],
      url:'http://192.168.20.222/',
      // url:'http://192.168.1.130/', //测试地址
      total: 50, // 总条数
      display: 8, // 每页的数据
      current: 1, //当前页数
    }
  },
  components: {
    'v-pagination': pagination
  },
  methods:{
    toBirdsVideo(){
      this.$router.push({path:'/manage'});
    },
    // 获得当前时间
    getMonthNow(){
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
      let monthNow=obj.getFullYear()+'-'+month+'-'+day;
      this.date=monthNow;
    },
    // 获取鸟类识别视频数据
    getBirdsVideos(currentPage){
      let data={cameraNum:this.camera,date:this.date};
      getBirdVideo(data).then(res=>{
        this.aiBirdImagePath = [];
        this.aiBirdVideoPath = [];
        // console.log(res.data)
        for(let i=0;i<res.data.length;i++){
          this.aiBirdImagePath.push(res.data[i].aiBirdImagePath);
          this.aiBirdVideoPath.push(res.data[i].aiBirdVideoPath);
          // console.log(this.aiBirdVideoPath)
        }

        // 分页
        this.total=this.aiBirdVideoPath.length;    
          // console.log(this.total)
          //获取每一页的数据
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
      this.getMonthNow();
      this.getBirdsVideos();
    }
}
</script>

<style scoped>
  .BirdsVideo{
    width: 100%;
    min-height: 937px;
    background:url('../../../public/img/bg.jpg') no-repeat;
    background-size: 100% 100%;
    /* position: fixed; */
  }
  .BirdsVideo .back{
    margin: 20px 0 0 60px;
    cursor: pointer;
  }
  .BirdsVideo h1{
    font-size: 20px;
    color: white;
    margin: 50px 0 0 150px;
  }
  .videobox{
    display: flex;
    justify-content: center;
    /* height: 100%; */
  }
  .videoboxs{
    width: 85%;
    height: 700px;
    background: rgba(128, 128, 128, 0.4);
    margin-top: 30px;
  }
  .nav{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
  }
  .el-pagination {
    padding: 0;
    text-align: center;
    margin-top: 10px;
  }

  #reportCaremaNum{
    color: white;
    background: transparent;
    border-radius: 5px;
    border: 1px solid white;
  }
  .month-input{
    background-color: transparent;
    color: white;
    margin-left: 80px;
    border-radius: 5px;
    border: 1px solid white;
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
    bottom:595px;
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
    margin-top: -558px;
  }
</style>
