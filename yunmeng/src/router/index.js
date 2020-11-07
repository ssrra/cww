import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//导航冗余
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {path: '/',name: 'Login',component: ()=>import('../views/Login')},                                    // 登录页面
  {path: '/home',name: 'Home',component: ()=>import('../views/Home')},                                  // 系统首页页面
  // 实时数据回传页面                     
  {path: '/realtime',name:'Realtime',redirect:'/realtime/realtime-styz',component: ()=>import('../views/Realtime'),            
    children:[
      {path: 'realtime-styz',component: ()=>import('../commponents/realtime/realtime-styz')},           // 实时数据
      {path: 'history-styz-month',component: ()=>import('../commponents/realtime/history-styz-month')}, // 历史数据--月度总结
      {path: 'history-styz-year',component: ()=>import('../commponents/realtime/history-styz-year')},   // 历史数据--年度总结
    
      {path: 'result',component: ()=>import('../commponents/realtime/result')},                         // 识别结果
      {path: 'people',component: ()=>import('../commponents/realtime/people')},                         // 人流统计
      {path: 'car-day',component: ()=>import('../commponents/realtime/car-day')},                       // 车流统计--月度
      {path: 'car-year',component: ()=>import('../commponents/realtime/car-year')},                     // 车流统计--年度
    
      {path: 'fire',component: ()=>import('../commponents/realtime/fire')},                             // 防火预警--预警抓图
      {path: 'fire-realtime',component: ()=>import('../commponents/realtime/fire-realtime')},           // 防火预警--实时画面
      {path: 'fire-yjlx',component: ()=>import('../commponents/realtime/fire-yjlx')},                   // 防火预警--预警录像
      {path: 'fire-dlwz',component: ()=>import('../commponents/realtime/fire-dlwz')},                   // 防火预警--地理位置
      {path: 'garden',component: ()=>import('../commponents/realtime/garden')},                         // 植物样方--实时画面
      {path: 'garden-whbh',component: ()=>import('../commponents/realtime/garden-whbh')}                // 植物样方--实时画面
    ]}, 
// >>>>>>> .r35
  // 人工巡护页面
  {path: '/people',name:'People',redirect:'/people/realtime-red',component: ()=>import('../views/People'),        
    children:[
      {path: 'realtime-red',component: ()=>import('../commponents/people/realtime-red')},               // 实时识别-红外相机
      {path: 'video',component: ()=>import('../commponents/people/video')},                             // 视频上传
      {path: 'screening',component: ()=>import('../commponents/people/screening')},                     // 筛查演示
      {path: 'twice',component: ()=>import('../commponents/people/twice')},                             // 二次校准

      {path: 'activity',component: ()=>import('../commponents/people/activity')},                       // 活动情况
      {path: 'realtime-ddsb',component: ()=>import('../commponents/people/realtime')},                  // 实时识别-定点识别
      {path: 'history',component: ()=>import('../commponents/people/history')},                         // 历史识别
      {path: 'important',component: ()=>import('../commponents/people/important')},                     // 重要视频

      {path: 'behavior',component: ()=>import('../commponents/people/behavior')},                       // 行为识别
      {path: 'intrude',component: ()=>import('../commponents/people/intrude')},                         // 闯入识别

      {path: 'realtime-data',component: ()=>import('../commponents/people/realtime-data')},             // 实时信息
      {path: 'gather',component: ()=>import('../commponents/people/gather')},                           // 采集历史
      {path: 'patrol',component: ()=>import('../commponents/people/patrol')},                           // 巡护历史
      {path: 'menu',component: ()=>import('../commponents/people/menu')},                               // 表单配置
      {path: 'path',component: ()=>import('../commponents/people/path')}                                // 路线配置
    ]
  },   
  // 数据分析页面
  {path: '/dataAnalyse',name:'DataAnalyse',redirect:'/dataAnalyse/styz',component: ()=>import('../views/DataAnalyse'),        
    children:[
      {path: 'styz',component: ()=>import('../commponents/dataAnalyse/styz')},                          // 生态因子
      {path: 'wildlife-day',component: ()=>import('../commponents/dataAnalyse/wildlife-day')},          // 野生动物--日报
      {path: 'wildlife-month',component: ()=>import('../commponents/dataAnalyse/wildlife-month')},      // 野生动物--月报
      {path: 'wildlife-year',component: ()=>import('../commponents/dataAnalyse/wildlife-year')},        // 野生动物--年报
      {path: 'botany',component: ()=>import('../commponents/dataAnalyse/botany')},                      // 植物分析
    ]
  }     
] 

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

/*
实时数据--realtime
    生态因子
        实时数据
        历史数据--月度总结
        历史数据--年度总结
    道路卡口
        人流统计
        车流统计
    防火预警
    植物样方  

人工巡护功能--people
    智能筛查
        实时识别-红外相机
        视频上传
        筛查演示
        二次校准
        活动情况
    定点识别
        实时识别
        历史识别
        重要视频
    非法行为
        行为识别
        闯入识别
    人工巡护
        实时信息
        采集历史
        巡护历史
        表单配置
        路线配置
        
数据综合分析--dataAnalyse
    生态因子
    野生动物--日报
    野生动物--月报
    野生动物--年报
    植物分析
    防火预警
    定制化数据
*/