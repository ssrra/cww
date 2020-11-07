<template>
  <div class="login">
    <div class="login-content">
      <div class="login-box">
        <div class="login-welcome">
          <h1>welcome!</h1>
          <h3>Happy everyday</h3>
        </div>
        <div class="input-user">
          <svg class="icon" style="width: 1.5em; height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1059 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2645"><path d="M817.540414 298.619586c0-164.89931-135.768276-298.619586-303.280552-298.619586S210.97931 133.684966 210.97931 298.619586c0 164.89931 135.768276 298.619586 303.315862 298.619586 167.476966 0 303.245241-133.684966 303.245242-298.619586z m-553.807448 0c0-136.22731 112.145655-246.678069 250.526896-246.678069 138.381241 0 250.526897 110.450759 250.526897 246.678069 0 136.22731-112.145655 246.678069-250.526897 246.678069-138.381241 0-250.526897-110.450759-250.526896-246.678069zM0 986.747586v25.953104h1054.896552v-25.953104c0-233.154207-244.065103-441.449931-527.465931-441.449931-17.019586 0-34.003862 0.706207-50.811587 2.01269-14.512552 1.165241 23.304828 13.700414 24.470069 28.001103 15.39531-1.235862 10.734345 21.892414 26.341518 21.892414 255.823448 0 474.712276 186.862345 474.712276 389.543724l26.376827-25.988414H26.376828l26.376827 25.988414c0-137.922207 88.381793-263.980138 230.823724-334.177103a25.776552 25.776552 0 0 0 11.758345-34.851311 26.553379 26.553379 0 0 0-35.380965-11.581793C100.528552 684.667586 0 828.027586 0 986.747586z" p-id="2646"></path></svg>
          <input type="text" v-model="userName">
        </div>
        <div class="input-password">
          <svg class="icon" style="width: 1.5em; height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3331"><path d="M784.353808 341.542998a31.449631 31.449631 0 0 1-31.449631-31.449632 247.194103 247.194103 0 0 0-494.388206 0 31.449631 31.449631 0 0 1-31.449632 31.449632 32.078624 32.078624 0 0 1-31.449631-31.449632 310.093366 310.093366 0 0 1 620.186732 0 32.078624 32.078624 0 0 1-31.449632 31.449632zM824.609337 1024H199.390663a94.348894 94.348894 0 0 1-94.348894-94.348894V544.078624a94.348894 94.348894 0 0 1 94.348894-94.348894h625.218674a94.348894 94.348894 0 0 1 94.348894 94.348894v385.572482a94.977887 94.977887 0 0 1-94.348894 94.348894zM199.390663 512.628993a31.449631 31.449631 0 0 0-31.449631 31.449631v385.572482a31.449631 31.449631 0 0 0 31.449631 31.449631h625.218674a32.078624 32.078624 0 0 0 31.449631-31.449631V544.078624a31.449631 31.449631 0 0 0-31.449631-31.449631z" fill="#ccc" p-id="3332"></path><path d="M227.066339 512.628993a32.078624 32.078624 0 0 1-31.449631-31.449632V314.496314a31.449631 31.449631 0 0 1 31.449631-31.449631 31.449631 31.449631 0 0 1 31.449632 31.449631v166.683047a31.449631 31.449631 0 0 1-31.449632 31.449632zM597.542998 768.628993H413.248157a32.078624 32.078624 0 0 1-31.449631-31.449632 31.449631 31.449631 0 0 1 31.449631-31.449631h184.294841a31.449631 31.449631 0 0 1 31.449631 31.449631 31.449631 31.449631 0 0 1-31.449631 31.449632z" fill="currentColor" p-id="3333"></path></svg>
          <input type="password" v-model="psw">
        </div>
        <div class="login-btn-box">
          <button class="login-btn" @click="login">登录</button>  
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  data(){
    return{
       userName:'',
       psw:'',
       
    }
  },
  methods:{
    userNone(){
      this.userHold="";
    },
    pswNone(){
      this.pswHold="";
    },
    login(){
      if(this.userName=='root'&&this.psw=='root'){
        this.$router.push({path:'/home'})
      }else{
        alert('用户名或密码错误！')
      }
    }
  },
}
</script>
<style scoped>
  .login{
    width: 100%;
    height:100%;
    /* min-height:721px; */
    color: #fff;
  }
  .login-content{
    width: 100%;
    height: 100%;
    /* min-height:721px; */
    position: fixed;
    background:url(../../public/img/login/bg.png) no-repeat; 
    background-size: 100% 100%;  
    padding: 7rem 10rem;
  }
  .login-box{
    width: 50%;
    height: 100%;
  }
  .login-welcome{
    width: 100%;
    height:150px;
  }
  .login-welcome h1{
    font-size: 75px;
    font-weight: 400;
  }
  .login-welcome h3{
    font-weight: 400;
  }
  .input-user,.input-password,.login-btn-box{
    width:100%;
    height:100px;
    position: relative;
  }
  .input-user svg,.input-password svg{
    position: absolute;
    left: 0px;
    top:0.5em;
  }
  .input-user input,.input-password input{
    width: 65%;
    height:50px;
    background-color: transparent;
    outline: none;
    border: 0;
    border-bottom:1px  solid #ccc;
    padding-left:0em;
    text-align: center;
    font-size: 1rem;
    color: #fff;
  }
  .login-btn-box .login-btn{
    width: 65%;
    height: 50px;
    background: #2578b0;
    border: 0;
    border-radius: 8px;
    font-size: 1.25rem;
    letter-spacing: 5px;
    outline: none;
    color: #fff;
    cursor: pointer;
  }
  .input-user svg[data-v-26084dc2], .input-password svg[data-v-26084dc2] {
    position: absolute;
    left: 5px;
    top: 0.5em;
}
</style>