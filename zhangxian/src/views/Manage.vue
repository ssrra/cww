<template>
  <div class="manage">
    <!-- 头部导航 -->
    <div class="title-box">
      <div class="title-name-wing">
        <div class="title-wing">
          <img src="img/wing.png">
        </div>
        <h2>漳县珍稀水生动物监测系统</h2>
        <div class="title-wing">
          <img src="img/wing.png">
        </div>
      </div>

      <!-- 鸟类or生态 -->
      <div class="title-option">
        <ul>
          <li   v-for="(item,i) in systemList" :key="i" @click="ChangeSelected($event,i)">
            <router-link :to="item.toPath">{{item.title}}</router-link>
          </li>
        </ul>
      </div>

      <!-- 时间 -->
      <div class="title-time">
        {{currentTime}}
        <span @click="toHome()">退出</span>
      </div>

      <!-- 导航底部线 -->
      <div class="line-box">
        <div class="line-left"></div>
        <div class="line-middle"></div>
        <div class="line-right"></div>
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="system-content">
      <!-- 点位概括 -->
      <div class="position-count">
        <p>监测点位总数：2个</p>
        <div>
          <div>
            <img src="img/camera.png">
          </div>
          <span>1个</span>
        </div>
        <div>
          <div>
            <img src="img/probe.png">
          </div>
          <span>1个</span>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      currentTime:'2020-05-26',
      systemList:[
        {title:"鱼类识别",toPath:'/manage'},
        {title:"生态因子",toPath:'/manage/ecological'},
      ],
    }
  },
  methods:{
    toHome(){
      this.$router.push({path:'/home'})
    },
    //获取当前时间
    writeCurrentDate() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth();//得到月份
      var date = now.getDate();//得到日期
      var day = now.getDay();//得到周几
      var week;
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      week = arr_week[day];
      var time = "";
      time = year + "年" + month + "月" + date + "日"  +"  "+ week;
      this.currentTime=time;      
    },
    ChangeSelected(e,i){
      var allSystems=document.querySelectorAll(".title-option ul li");
      for(let i=0;i<allSystems.length;i++){
        allSystems[i].classList.remove('selected');
      }
      var li=e.currentTarget;
      li.classList.add("selected");
    },
    isSelected(){
      var url=window.location.href;
      var allSystems=document.querySelectorAll(".title-option ul li");
      //console.log(allSystems);
      for(let i=0;i<allSystems.length;i++){
        allSystems[i].classList.remove('selected');
        // allSystems[i].getElementsByTagName('img')[0].setAttribute("src",this.systemList[i].imgPath);
        // allSystems[i].getElementsByTagName('img')[1].setAttribute("src",this.systemList[i].iconImg);
      }
      if(url.indexOf('eco')!=-1){
        allSystems[1].classList.add('selected');
        // allSystems[1].getElementsByTagName('img')[0].setAttribute("src",this.systemList[1].imgSelected);
        // allSystems[1].getElementsByTagName('img')[1].setAttribute("src",this.systemList[1].iconOrange);
      }else{
        allSystems[0].classList.add('selected');
      }
      // else{
      //   for(let i=0;i<allSystems.length;i++){
      //   allSystems[i].classList.remove('selected');
      //   allSystems[i].getElementsByTagName('img')[0].setAttribute("src",this.systemList[i].imgPath);
      //   allSystems[i].getElementsByTagName('img')[1].setAttribute("src",this.systemList[i].iconImg);
      // }
      //}
    },
  },
  created(){
    this.writeCurrentDate();
    
  },
  mounted(){
    this.isSelected();
  }
}
</script>
<style>
  .manage{
    width: 100%;
    height: 100%;
    min-width:1300px;
    min-height:969px;
    background:url(../../public/img/bg4.jpg) no-repeat;
    background-size: 100% 100%;
    position: fixed;
  }
  .system-content{
    width: 100%;
    height:80%;
    padding:1.5rem;
    position: relative;
  }
  .bird,.ecological,.ecological-analyze,.ecological-analyze-year{
    width:100%;
    height:100%;
    display: flex;
    position: relative;
  }
  /*占位div样式*/
  .sitting-box{
    width:18%;
    height:54%;
    
  }
  .title-box{
    width: 100%;
    height: 100px;
    display: flex;
    position: relative;
  }
  .title-box .title-name-wing{
    display: flex;
    align-items: center;
  }
  .title-box .title-name-wing h2{
    font-size: 1.75rem;
    color: #205aa7;
    margin: 0px 20px;
  }
  .title-box .title-name-wing .title-wing:last-child{
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1); 
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
    /*filter: fliph; IE*/
  }
  .line-box{
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: flex;
  }
  .line-box .line-left{
    width: 27%;
    height: 35px;
    /* background: #205aa7; */
    border-bottom: 2px solid #05234b;
  }
  .line-box .line-middle{
    width:35px;
    height:35px;
    background:linear-gradient(135deg,transparent 48.0%, #05234b 48.0%, #05234b 51.0%, transparent 51.0%);
    
  }
  .line-box .line-right{
    width: 71%;
    height:35px; 
    border-top: 2px solid #05234b;
  }
  .title-option{
    width: 40%;

  }
  .title-option ul{
    width: 100%;
    height: 65px;
    display: flex;
    padding: 0px 60px;
  }
  .title-option ul li{
    margin-left: 100px;
    width: 300px;
    height: 65px;
    line-height: 65px;
    text-align: center;
    transform: skewX(-40deg);
  }
  .title-option ul li.selected{
    background: #0c213a;
  }
  .title-option ul li a{
    display: inline-block;
    transform: skewX(40deg);
    color: #caccce;
    font-size: 1.15rem;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .title-time{
    width: 20%;
    height: 65px;
    text-align: right;
    line-height: 65px;
    font-size: 1.15rem;
    padding-right:20px; 
    position: absolute;
    right: 0px;
    top: 0px;
    color: #caccce;
  }
  .title-time span{
    padding-left: 1rem;
    cursor: pointer;
  }
  .position-count{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 20%;
    height: 45%;
    /* background: #05234b; */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 2rem 2rem 4rem;
  }
  .position-count p,.position-count>div{
    width: 100%;
  }
  .position-count p{
    height: 20%;
    color: #fff;
    font-size: 1.25rem;
    letter-spacing: 1px;
  }
  .position-count>div{
    height: 30%;
    display: flex;
    align-items: center;
  }
  .position-count>div span{
    font-size: 1.5rem;
    margin-left: 2rem;
    color: #00ff8c;
  }
  .title-time span{
    color: white;
  }
</style>