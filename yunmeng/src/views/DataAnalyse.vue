<template>
<el-row class="tac">
  <el-col :span="12">
    <el-menu
      :default-active="isSelected"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#222052"
      text-color="#fff"
      active-text-color="#DAA520"
      :collapse="isCollapse">

      <router-link to="/dataAnalyse/styz">
        <el-menu-item index="1">
          <template slot="title">
            <img src="../assets/icon/生态因子).png" alt="">
            <span>生态因子</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/dataAnalyse/wildlife-day">
        <el-menu-item index="2">
          <template slot="title">
            <img src="../assets/icon/红外相机.png" alt="">
            <span>野生动物</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/dataAnalyse/botany">
        <el-menu-item index="3">
          <img src="../assets/icon/道路卡口.png" alt="">
          <span>植物分析</span>
        </el-menu-item>
      </router-link>

      <!-- <router-link to="/dataAnalyse/file">
        <el-menu-item index="4">
          <img src="../assets/icon/防火预警.png" alt="">
          <span>防火预警</span>
        </el-menu-item>
      </router-link>

      <router-link to="/dataAnalyse/customization">
        <el-menu-item index="5">
          <img src="../assets/icon/植物样方.png" alt="">
          <span>定制化数据</span>
        </el-menu-item>
      </router-link> -->
    </el-menu>
  </el-col>
  <div class="zujian" >
    <router-view/>
  </div>
</el-row>
</template>

<script>

  export default {
  data() {
      return {
        isCollapse: false,
        isSelected:'1'
      };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    whichSelected(){
      let url=window.location.href;
      console.log(url);
      if(url.indexOf('styz')!=-1){
        this.isSelected='1';
      }else if(url.indexOf('wildlife-day')!=-1){
        this.isSelected='2';
      }else if(url.indexOf('botany')!=-1){
        this.isSelected='3'
      }else{
        this.isSelected='1'
      }
      
    }
  },
  created(){
    this.whichSelected();
  }
}
</script>

<style scoped>
  .zujian{
    width: 90%;
    min-height: 58.59rem;
    background-color: #eeeeee;
    float: right;
  }
  .el-row{
    width: 100%;
    height: 100%;
    background-color: #222052;
  }
  .el-menu-vertical-demo{
    height: 100%;
    position: fixed;
    margin-top: 4rem;
    border-right: 1px solid #4682B4;
  }
  img{
    width: 18px;
    height: 16px;
    margin-right:8px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 10%;
  }
  .el-submenu .el-menu-item {
    min-width: 0;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .el-menu-item{
    font-size: 16px;
    font-weight: 600;
  }
  .el-submenu__title {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .el-menu-item-group {
    margin-top: -14px;
  }
</style>