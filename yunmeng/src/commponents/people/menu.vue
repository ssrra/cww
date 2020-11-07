<template>
  <div class="intrude">
      <div class="nav">
      <h1>巡护监测-表单配置</h1>
      <i class="el-icon-s-unfold" @click="goback()"></i>
      <a>|</a>
      <span>管理员</span>
      <div class="circle"><i class="el-icon-s-custom" ></i></div>
    </div>
    <div class="box">
      <div class="videobox">
        <h4>表单配置</h4>
        <div class="videoboxs">
          <h5>模板表单</h5>
          <ul>
            <li> <img src="../../assets/image/发现植物.png" alt=""> </li>
            <li> <img src="../../assets/image/动物痕迹.png" alt=""> </li>
            <li> <img src="../../assets/image/动物实体.png" alt=""> </li>
            <li> <img src="../../assets/image/设施损毁.png" alt=""> </li>
            <li> <img src="../../assets/image/人为干扰.png" alt=""> </li>
          </ul>
          <h5>自定义表单</h5>
          <ul class="ul">
            <li> <img src="../../assets/image/社区经济调查.png" alt=""> </li>
            <li> <img src="../../assets/image/员工记录表.png" alt=""> </li>
            <li> <img src="../../assets/image/日常.png" alt=""> </li>
          </ul>
        </div>
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
  methods:{
    goback(){
      this.$router.push('/home')
    },
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
.videoboxs h5{
  font-size: 16px;
  font-weight: normal;
  padding: 2% 0 0 5%;
}
ul{
  width: 100%;
  height: 54%;
}
ul li{
  float: left;
  margin: 1% 0 0 5%; 
  cursor: pointer;
  
}
ul li img{
  border-radius: 10px;
}
ul li img:hover{
  box-shadow:1px 2px 3px 2px #ccc;
}

.ul{
  width: 100%;
  height: 30%;
}
.ul li{
  float: left;
  margin: 1% 0 0 5%; 
  cursor: pointer;
  
}
.ul li img{
  border-radius: 10px;
}
.ul li img:hover{
  box-shadow:1px 2px 3px 2px #ccc;
}
</style>