<template>
  <div class="leave">
       <div class="nav">
      <h1>职务管理</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="boxs">
      <p>职务管理</p>
      <div class="img">
        <img src="../../assets/image/lct.png" alt="">
      </div>
      <div class="smallimg" @click="getOpen()">
        <img src="../../assets/image/bgs.png" alt="">
      </div>
      <div id="pop-up" v-show="isShow">
        <div class="h4">
          <h4>详细信息</h4>
          <i class="el-icon-close" @click="getClose()"></i>
        </div>
        <h3>办公室:负责制定各项工作制度,协调各科室(站)工作监督落实各项计划执行情,况负责资金计划编制并落实,负责接待来访人,承办党务、纪检、监察、机构编制、劳动人事、财产管理、安全等方面的具体工作。</h3>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isShow: false
    };
  },
  methods:{
    goback(){
      this.$router.push('/home')
    },
    getOpen(){
      this.isShow = true;
    },
    getClose(){
      this.isShow = false;
    }
  }

}
</script>

<style scoped>
  .boxs{
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
  .leave h1{
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
  .boxs p{
    width: 96%;
    height: 6%;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-left: 2%;
    border-bottom: 1px solid gray;
  }

  .img{
    width: 100%;
    height: 94%;
  }
  .img img{
    width: 100%;
    height: 100%;
  }
  .smallimg{
    position: absolute;
    top: 41.7%;
    left: 45.4%;
    cursor: pointer;
  }
  #pop-up{
    width: 30%;
    height: 30%;
    background-color: white;
    position: absolute;
    top: 31%;
    left: 39%;
    border: 5px solid #eeeeee;
  }
  #pop-up .h4{
    width: 100%;
    height: 10%;
    background-color: #eeeeee;
    padding-left: 2%;
  }
  .h4 h4{
    font-weight: normal;
  }
  .el-icon-close{
    font-size: 20px;
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
  }
  #pop-up h3{
    font-weight: normal;
    font-size: 18px;
    padding: 5% 2%;
  }
</style>