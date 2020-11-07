<template>
  <div class="login">
    <div id="center">
      <div id="cf4a">
        <img class="iamge1" src="img/1.png" />
        <img class="iamge2" src="img/2.png" />
        <img class="iamge3" src="img/3.png" />
      </div>
      <div class="login-box">
        <div class="login-title">
          <h1>陕西南泥湾国家湿地公园监测系统</h1>
        </div>
        <div class="login-input">
          <div class="login-uname">
            <input type="text" placeholder="请输入账号" name="uName"  v-model="userName">
          </div>
          <div class="login-upsd">
            <input type="password" placeholder="请输入密码"  name="uPassword"  v-model="psw">
          </div>
          <div class="login-btn" @click="login()">
            登录
          </div>
        </div>
        <div class="login-logo">
          <div class="login-hr"><hr size="1"></div>
          <div class="login-logo-img">
            <img src="img/logo.png" alt="">
          </div>
          <div class="login-hr"><hr size="1"></div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data(){
    return{
       userName:'',
       psw:''
    }
  },
  methods:{
    login(){
      if(this.userName=='root'&&this.psw=='root'){
        this.$router.push({path:'/home'})
      }else{
        alert('用户名或密码错误！')
      }
    }
  }
}
</script>
<style scoped>
  .login{
    width: 100%;
    height: 100%;
    min-width: 1300px;
    position: fixed;
  }
  #center {
    width: 100%;
    height: 100%;
    min-width: 1300px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .image1,.iamge2,.iamge3 {
      opacity: 0;
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
  }

  @keyframes cf4FadeInOut {
      0% {
          opacity: 1;
      }
      100% {
          opacity: 0.1;
      }
  }
  
  #cf4a {
      position: relative;
      height: 100%;
      width: 100%;
      margin: 0 auto;
      /* overflow-x: hidden; */
      border: 1px solid #ccc;
      background: #ccc;
      overflow: hidden;
  }
  .iamge1,.iamge2,.iamge3{
    animation-name: cf4FadeInOut;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .iamge1 {
      animation-duration: 1.5s;
  }
  
  .iamge2 {
      animation-duration: 3s;
  }
  
  .iamge3 {
      animation-duration: 5s;
  }
  .login-box{
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 4rem 0rem 0rem;
  }
  .login-box .login-title,.login-box .login-btn{
    width: 100%;
    height: 10%
  }
  .login-box .login-title h1{
    text-align: center;
    font-size: 3rem;
    letter-spacing: 2px;
  }
  .login-box .login-input{
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .login-box .login-input .login-uname,.login-box .login-input .login-upsd{
    width: 100%;
    /* height: 30%; */
    text-align: center;
  }
  .login-box .login-input .login-uname{
    height: 20%;
  }
   .login-box .login-input .login-upsd{
    height: 30%;
  } 
  .login-box .login-input .login-uname input,.login-box .login-input .login-upsd input{
    width: 600px;
    height: 75px;
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    font-size: 1.5rem;
    padding: 0px 2rem;
  }
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #dddddd;
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #dddddd;
  }

  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #dddddd;
  }

  input::-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #dddddd;
  }
  .login-box .login-input .login-btn{
    width: 100%;
    height: 10%;
    text-align: center;
    width: 600px;
    height: 65px;
    line-height: 65px;
    background: #5cccb6;
    border-radius: 10px;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 3px;
  }
  .login-logo{
    width: 100%;
    height: 10%;
    display: flex
  }
  .login-logo .login-hr,.login-logo .login-logo-img{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-logo .login-hr{
    width: 45%;
    height: 100%;

  }
  .login-logo .login-hr hr{
    width: 100%;
    color: #dddddd;
    
  }
  .login-logo .login-logo-img{
    width: 15%;
    height: 100%;
    margin-top: -10px;
  }
</style>
