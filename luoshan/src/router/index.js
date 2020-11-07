import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Manage from '../views/Manage.vue'
import Details from '../components/manage/Details.vue'
import Report from '../components/manage/Report.vue'
import BirdsVideo from '../components/manage/BirdsVideo.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'HOme',
    component:Home
  },
  {
    path:'/manage',
    component:Manage,
    children:[
      {//子系统首页
        path:'/',
        component:()=> import('../components/Bird.vue')
      },
      //红外相机
      {
        path:'scree',
        component:()=> import('../components/scree.vue')
      },
      {
        path:'upload',
        component:()=> import('../components/upload.vue')
      },
      {
        path:'twice',
        component:()=> import('../components/twice.vue')
      },
      //生态因子
      {
        path:'ecological',
        component:()=> import('../components/Ecological.vue')
      },
      {
        path:'ecoAnalyze',
        component:()=> import('../components/EcoAnalyze.vue')
      },
      {
        path:'ecoAnalyzeYear',
        component:()=> import('../components/EcoAnalyzeYear.vue')
      },      
    ]
  },
  {//鸟类详情页面
    path:'/details',
    component:Details
  },
  {
    path:'/report',
    component:Report
  },
  {
    path:'/birdsVideo',
    component:BirdsVideo
  }
]

const router = new VueRouter({
  routes
})

export default router
