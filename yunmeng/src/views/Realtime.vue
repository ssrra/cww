<template>
<el-row class="tac">
  <el-col :span="12">
    <!-- default-active="1-1" -->
    <el-menu
      :default-active="isSelected"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#222052"
      text-color="#fff" 
      active-text-color="#DAA520"
      :collapse="isCollapse"
      :unique-opened="true">

      <el-submenu index="1">
        <template slot="title">
          <img src="../assets/icon/生态因子).png" alt="">
          <span>生态因子</span>
        </template>
        <el-menu-item-group>
          <router-link to="/realtime/realtime-styz">
            <el-menu-item index="1-1">
              <img src="../assets/icon/实时数据.png" alt="">
              <span>实时数据</span>
            </el-menu-item>
          </router-link>
          <router-link to="/realtime/history-styz-month">
            <el-menu-item index="1-2">
              <img src="../assets/icon/历史数据.png" alt="">
              <span>历史数据</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
         
      <el-submenu index="3">
        <template slot="title">
          <img src="../assets/icon/道路卡口.png" alt="">
          <span>道路卡口</span>
        </template>
        <el-menu-item-group>
          <router-link to="/realtime/people">
            <el-menu-item index="3-1">
              <img src="../assets/icon/人流统计i.png" alt="">
              <span>人流统计</span>
            </el-menu-item>
          </router-link>
          <router-link to="/realtime/car-day">
            <el-menu-item index="3-2">
              <img src="../assets/icon/车流统计.png" alt="">
              <span>车流统计</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>

      <!-- <router-link to="/realtime/fire"> -->
        <el-submenu index="4">
          <template slot="title">
            <img src="../assets/icon/防火预警.png" alt="">
            <span>防火预警</span>
          </template>

          <el-menu-item-group>
          <router-link to="/realtime/fire">
            <el-menu-item index="4-1">
              <img src="../assets/icon/抓图白.png" alt="">
              <span>预警抓图</span>
            </el-menu-item>
          </router-link>
          <router-link to="/realtime/fire-realtime">
            <el-menu-item index="4-2">
              <img src="../assets/icon/画面白.png" alt="">
              <span>实时画面</span>
            </el-menu-item>
          </router-link>
          <router-link to="/realtime/fire-yjlx">
            <el-menu-item index="4-3">
              <img src="../assets/icon/录像白.png" alt="">
              <span>预警录像</span>
            </el-menu-item>
          </router-link>
          <router-link to="/realtime/fire-dlwz">
            <el-menu-item index="4-4">
              <img src="../assets/icon/定白.png" alt="">
              <span>地理位置</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>

        </el-submenu>
      <!-- </router-link> -->

      
        <el-submenu index="5">
          <template slot="title">
            <img src="../assets/icon/植物样方.png" alt="">
            <span>植物样方</span>
          </template>
          <el-menu-item-group>
          <router-link to="/realtime/garden">
            <el-menu-item index="5-1">
              <img src="../assets/icon/画面白.png" alt="">
              <span>实时画面</span>
            </el-menu-item>
          </router-link>
          <router-link to="/realtime/garden-whbh">
            <el-menu-item index="5-2">
              <img src="../assets/icon/物候变化.png" alt="">
              <span>物候变化</span>
            </el-menu-item>
          </router-link>
          
        </el-menu-item-group>
        </el-submenu>
      
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
        isSelected:'1-1'
      };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    whichSelected(){
      let url=window.location.href;
      console.log(url);
      if(url.indexOf('realtime-styz')!=-1){
        this.isSelected='1-1';
      }else if(url.indexOf('history-styz')!=-1){
        this.isSelected='1-2';
      }else if(url.indexOf('people')!=-1){
        this.isSelected='3-1'
      }else if(url.indexOf('car')!=-1){
        this.isSelected='3-2'
      }else if(url.indexOf('fire')!=-1){
        this.isSelected='4-1'
      }else if(url.indexOf('fire-realtime')!=-1){
        this.isSelected='4-2'
      }else if(url.indexOf('fire-yjlx')!=-1){
        this.isSelected='4-3'
      }else if(url.indexOf('fire-dlwz')!=-1){
        this.isSelected='4-4'
      }else if(url.indexOf('garden')!=-1){
        this.isSelected='5-1'
      }else if(url.indexOf('garden-whbh')!=-1){
        this.isSelected='5-2'
      }else{
        this.isSelected='1-1'
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
    background-color: 	#222052;
  }
  .el-menu-vertical-demo{
    height: 100%;
    position: fixed;
    margin-top: 4rem;
    border-right: 1px solid 	#222052;
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
  .el-submenu__title {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .el-menu-item-group {
    margin-top: -14px;
  }
  .el-submenu__title span{
      font-size: 16px;
      font-weight: 600;
  }
</style>