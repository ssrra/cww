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
          <span>考勤管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/oaSystem/attendance">
            <el-menu-item index="1-1">
              <i class="el-icon-monitor"></i>
              考勤统计
            </el-menu-item>
          </router-link>
          <router-link to="/oaSystem/leave">
            <el-menu-item index="1-2">
              <i class="el-icon-tickets"></i>
              请假统计
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-map-location"></i>
          <span>固定资产</span>
        </template>
        <el-menu-item-group>
          <router-link to="/oaSystem/property">
            <el-menu-item index="2-1">
              <i class="el-icon-pie-chart"></i>
              资产列表
            </el-menu-item>
          </router-link>
          <router-link to="/oaSystem/management">
            <el-menu-item index="2-2">
              <i class="el-icon-document-copy"></i>
              资产申请
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-office-building"></i>
          <span>社区共建</span>
        </template>
        <el-menu-item-group>
          <router-link to="/oaSystem/situation">
            <el-menu-item index="3-1">
              <i class="el-icon-school"></i>
              社区情况
            </el-menu-item>
          </router-link>
          <router-link to="/oaSystem/comanagement">
            <el-menu-item index="3-2">
             <i class="el-icon-suitcase"></i>
              社区共管
            </el-menu-item>
          </router-link>
          <router-link to="/oaSystem/show">
            <el-menu-item index="3-3">
             <i class="el-icon-collection"></i>
              审批展示
            </el-menu-item>
          </router-link>
          <router-link to="/oaSystem/assess">
            <el-menu-item index="3-4">
             <i class="el-icon-data-analysis"></i>
              成效评估
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>

      <router-link to="/oaSystem/post">
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-thumb"></i>
            <span>职务管理</span>
          </template>
        </el-submenu>
      </router-link>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-close-notification"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/oaSystem/user">
            <el-menu-item index="5-1">
              <i class="el-icon-coordinate"></i>
              用户管理
            </el-menu-item>
          </router-link>
          <router-link to="/oaSystem/organization">
            <el-menu-item index="5-2">
             <i class="el-icon-close-notification"></i>
              机构管理
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>

      <router-link to="/oaSystem/personnel">
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span>档案人事</span>
          </template>
        </el-submenu>
      </router-link>
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
      if(url.indexOf('attendance')!=-1){
        this.isSelected='1-1';
      }else if(url.indexOf('leave')!=-1){
        this.isSelected='1-2';
      }else if(url.indexOf('property')!=-1){
        this.isSelected='2-1'
      }else if(url.indexOf('management')!=-1){
        this.isSelected='2-2'
      }else if(url.indexOf('situation')!=-1){
        this.isSelected='3-1'
      }else if(url.indexOf('comanagement')!=-1){
        this.isSelected='3-2'
      }else if(url.indexOf('show')!=-1){
        this.isSelected='3-3'
      }else if(url.indexOf('assess')!=-1){
        this.isSelected='3-4'
      }else if(url.indexOf('post')!=-1){
        this.isSelected='4'
      }else if(url.indexOf('user')!=-1){
        this.isSelected='5-1'
      }else if(url.indexOf('organization')!=-1){
        this.isSelected='5-2'
      }else if(url.indexOf('personnel')!=-1){
        this.isSelected='6'
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