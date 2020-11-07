<template>
  <div class="fire">
      <div class="nav">
      <h1>防火预警-预警录像</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div class="video-box">
        <!-- <video style="display:block" muted  src="../../assets/image/pandas1.mp4" controls autoplay></video>
        <video style="display:none"  muted src="../../assets/image/beast1.mp4" controls autoplay></video>
        <video style="display:none"  muted src="../../assets/image/fish1.mp4" controls autoplay></video>
        <video style="display:none"  muted src="../../assets/image/朱鹮.mp4" controls autoplay></video>
        <video style="display:none"  muted src="../../assets/image/pandas1.mp4" controls autoplay></video>
        <video style="display:none"  muted src="../../assets/image/beast1.mp4" controls autoplay></video>
        <video style="display:none"  muted src="../../assets/image/pandas1.mp4" controls autoplay></video>
        <video style="display:none"  muted src="../../assets/image/beast1.mp4" controls autoplay></video>
        <video style="display:none"  muted src="../../assets/image/pandas1.mp4" controls autoplay></video>
        <video style="display:none"  muted src="../../assets/image/pandas1.mp4" controls autoplay></video> -->
        <!--  -->
      </div>
      <div class="video-list">
        <ul>
          <li>卡口名称</li>
          <li>视频名称</li>
          <li>时间</li>
        </ul>
        <ul v-for=" (item,i) of videoList" :key="i" @click="changeSrc(i)">
          <li>{{item.name}}</li>
          <li>{{item.number}}</li>
          <li>{{item.time}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      videoList:[
        {name:"防火摄像头1",number:'001-0911.mov',time:'2020年9月11日',src:"../../assets/image/pandas1.mp4"},
        {name:"防火摄像头2",number:'002-0911.mov',time:'2020年9月11日',src:"../../assets/image/beast1.mp4"},
        {name:"防火摄像头3",number:'003-0911.mov',time:'2020年9月11日',src:"../../assets/image/fish1.mp4"},
        {name:"防火摄像头4",number:'004-0911.mov',time:'2020年9月11日',src:"../../assets/image/朱鹮.mp4"},
        {name:"防火摄像头5",number:'005-0911.mov',time:'2020年9月11日',src:"../../assets/image/pandas1.mp4"},
        {name:"防火摄像头6",number:'006-0911.mov',time:'2020年9月11日',src:"../../assets/image/beast1.mp4"},
        {name:"防火摄像头7",number:'007-0911.mov',time:'2020年9月11日',src:"../../assets/image/pandas1.mp4"},
        {name:"防火摄像头8",number:'008-0911.mov',time:'2020年9月11日',src:"../../assets/image/fish1.mp4"},
        {name:"防火摄像头9",number:'009-0911.mov',time:'2020年9月11日',src:"../../assets/image/beast1.mp4"},
        {name:"防火摄像头10",number:'010-0911.mov',time:'2020年9月11日',src:"../../assets/image/朱鹮.mp4"},
      ],
      videoSrc:"", //../../assets/image/pandas1.mp4
     
      
    }
  },
  components:{
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    changeSrc(i){
      //console.log(i);
      let videos=document.querySelectorAll(".video-box video");
      for(let j=0;j<videos.length;j++){
        if(i==j){
          videos[j].style.display="block";
        }else{
          videos[j].style.display="none";
        }
      }

    }
  },
  mounted(){
    // this.videoSrc=require("../../assets/image/pandas1.mp4");
    
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
    display: flex;
    
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
.video-box{
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
}
.video-box video{
  width: 100%;
}
.video-list{
  width: 40%;
  height: 100%;
  padding: 3rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.video-list ul{
  display: flex;
  width: 100%;
  /* height: 1.25rem; */
}
.video-list ul:not(:first-child):hover{
  background: #ccc;
  cursor: pointer;
}
.video-list ul li{
  width: 33.3%;
  height: 3.5rem;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>