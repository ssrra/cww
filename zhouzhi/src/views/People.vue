<template>
<el-row class="tac">
  <el-col :span="10">
    <el-menu
      :default-active="isSelected"
      class="el-menu-vertical-demo"
      background-color="#222052"
      text-color="#fff"
      active-text-color="#DAA520"
      :collapse="isCollapse"
      :unique-opened="true"
      >

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-camera"></i>
          <span>红外相机</span>
        </template>
        <el-menu-item-group>
          <router-link to="/people/realtime-red">
            <el-menu-item index="1-1">
              <i class="el-icon-monitor"></i>
              实时数据
            </el-menu-item>
          </router-link>
          <router-link to="/people/video">
            <el-menu-item index="1-2">
              <i class="el-icon-upload"></i>
              视频上传
            </el-menu-item>
          </router-link>
          <router-link to="/people/screening">
            <el-menu-item index="1-3">
              <i class="el-icon-video-camera-solid"></i>
              筛查展示
              </el-menu-item>
          </router-link>
          <router-link to="/people/twice">
            <el-menu-item index="1-4">
              <i class="el-icon-edit-outline"></i>
              二次校准
              </el-menu-item>
            </router-link>
          <router-link to="/people/activity">
            <el-menu-item index="1-5">
              <i class="el-icon-map-location"></i>
              活动情况
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-map-location"></i>
          <span>定点识别</span>
        </template>
        <el-menu-item-group>
          <router-link to="/people/realtime-ddsb">
            <el-menu-item index="2-1">
              <i class="el-icon-pie-chart"></i>
              实时识别
            </el-menu-item>
          </router-link>
          <router-link to="/people/history">
            <el-menu-item index="2-2">
              <i class="el-icon-document-copy"></i>
              历史识别
            </el-menu-item>
          </router-link>
          <router-link to="/people/important">
            <el-menu-item index="2-3">
              <i class="el-icon-video-camera"></i>
              重要视频
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-opportunity"></i>
          <span>非法行为</span>
        </template>
        <el-menu-item-group>
          <router-link to="/people/behavior">
            <el-menu-item index="3-1">
              <i class="el-icon-coordinate"></i>
              行为识别
            </el-menu-item>
          </router-link>
          <router-link to="/people/intrude">
            <el-menu-item index="3-2">
             <i class="el-icon-close-notification"></i>
              闯入识别
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-data-line"></i>
          <span>巡护监测</span>
        </template>
        <el-menu-item-group>
          <router-link to="/people/realtime-data">
            <el-menu-item index="4-1">
              <i class="el-icon-time"></i>
              实时信息
            </el-menu-item>
          </router-link>
          <router-link to="/people/gather">
            <el-menu-item index="4-2">
              <i class="el-icon-document-copy"></i>
              采集历史
            </el-menu-item>
          </router-link>
          <router-link to="/people/patrol">
            <el-menu-item index="4-3">
              <i class="el-icon-truck"></i>
              巡护历史
            </el-menu-item>
          </router-link>
          <router-link to="/people/menu">
            <el-menu-item index="4-4">
              <i class="el-icon-tickets"></i>
              表单配置
            </el-menu-item>
          </router-link>
          <router-link to="/people/path">
            <el-menu-item index="4-5">
              <i class="el-icon-setting"></i>
              路线配置
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
  <div class="box" >
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
    whichSelected(){
      let url=window.location.href;
      console.log(url);
      if(url.indexOf('realtime-red')!=-1){
        this.isSelected='1-1';
      }else if(url.indexOf('video')!=-1){
        this.isSelected='1-2';
      }else if(url.indexOf('screening')!=-1){
        this.isSelected='1-3'
      }else if(url.indexOf('twice')!=-1){
        this.isSelected='1-4'
      }else if(url.indexOf('activity')!=-1){
        this.isSelected='1-5'
      }else if(url.indexOf('realtime-ddsb')!=-1){
        this.isSelected='2-1'
      }else if(url.indexOf('history')!=-1){
        this.isSelected='2-2'
      }else if(url.indexOf('important')!=-1){
        this.isSelected='2-3'
      }else if(url.indexOf('behavior')!=-1){
        this.isSelected='3-1'
      }else if(url.indexOf('intrude')!=-1){
        this.isSelected='3-2'
      }else if(url.indexOf('realtime-data')!=-1){
        this.isSelected='4-1';
      }else if(url.indexOf('gather')!=-1){
        this.isSelected='4-2';
      }else if(url.indexOf('patrol')!=-1){
        this.isSelected='4-3'
      }else if(url.indexOf('menu')!=-1){
        this.isSelected='4-4'
      }else if(url.indexOf('path')!=-1){
        this.isSelected='4-5'
      }
      else{
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
  .box{
    width: 90%;
    min-height: 58.59rem;
    background-color: #eeeeee;
    float: right;
  }
  .el-row{
    width: 100%;
    height: 58.59em;
    background-color: #222052;
  }
  .el-menu-vertical-demo{
    height: 100%;
    position: fixed;
    margin-top: 4rem;
    border-right: 1px solid #222052;
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
      align-items: center;
      justify-content: center;
  }
  .el-menu-item-group {
    margin-top: -14px;
  }
  .el-submenu__title span{
      font-size: 16px;
      font-weight: 600;
  }
.el-submenu [class^=el-icon-] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 20px;
    color: white;
}
</style>