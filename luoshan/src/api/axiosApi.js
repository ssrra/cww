import request from '@/config/request'


//获取五个生态因子监测点数据
export function getEcologicalData(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Data/realTimeData',
    params: data
  })
}


//负氧离子等生态因子图表数据（生态因子实时数据）
export function getEcoChart() {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Temperature/temperature',
    
  })
}

//超标种类分布图数据（生态因子实时数据）
export function getOverStanderdChart() {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/EcologicalFactor/ecologicalFactor',
    
  })
}

//******月度分析*****///
//超标总结图数据（生态因子数据分析）data:{time:time}
export function getOverSUmmaryChart(time) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/analyzed/AlertTrendGraphMonthMonth',
    params: time
  })
}

//生态因子趋势图（生态因子数据分析）data:{time:time,name:name}
export function getEcoFactorChart(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/analyzed/EcologicalMapMonth',
    params: data
  })
}

//生态因子表格数据（生态因子数据分析）data:{time:time,likeName:likeName,currPage:currPage,pageSize:pageSize}
export function getEcoFactorTable(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/analyzed/pageMonth',
    params: data
  })
}

//超标分布图数据（生态因子数据分析）data:{time:time}
export function getOverCircleChart(time) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/analyzed/EcologicalDistributionMonth',
    params: time
  })
}
//**********//

//******年度分析*****///
//超标总结图数据（生态因子数据分析）data:{time:time}
export function getOverSUmmaryYearChart(time) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/analyzed/AlertTrendGraphMonthYear',
    params: time
  })
}
//生态因子趋势图（生态因子数据分析）data:{time:time,name:name}
export function getEcoFactorYearChart(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/analyzed/EcologicalMapYear',
    params: data
  })
}

//生态因子表格数据（生态因子数据分析）data:{time:time,likeName:likeName}
export function getEcoFactorYearTable(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/analyzed/pageYear',
    params: data
  })
}

//超标分布图数据（生态因子数据分析）data:{time:time}
export function getOverCircleYearChart(time) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/analyzed/EcologicalDistributionYear',
    params: time
  })
}
//***********///

//鸟类详情接口
export function birdsInfo(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Biology/BirdsInfo',
    params: data
  })
}

//报表接口
export function getReport(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Bird/findBirdBasicByMonth',
    params: data
  })
}

//报表页面获取当月出现的鸟的种类
export function getReportBird(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Bird/findBirdNameByMonth',
    params: data
  })
}


//Bird.vue页面获取当天出现的鸟的种类
export function getHistoryBird(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Bird/findBirdNameByDay',
    params: data
  })
}

//Bird.vue页面数据获取
export function getData(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Bird/findBirdBasic',
    params: data
  })
}

//Report.bue页面数据获取
export function getReportTwo(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Bird/findAiBirdCruise',
    params: data
  })
}


//Report.vue页面获取当天出现的鸟的种类
export function getHistoryBirdDay(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Bird/findBirdNamesByDay',
    params: data
  })
}

//Report.vue页面获取当天出现的鸟的种类
export function getHistory(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Bird/findBirdNamesByDay',
    params: data
  })
}


//Report.vue图片展示
export function getImageBirdDay(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Bird/findBirdPictureByDay',
    params: data
  })
}

//Report.vue图片展示(请求图片)
export function getImageBird(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Bird/findBirdPictureById',
    params: data
  })
}

//Report.vue视频展示(请求图片)
export function getBirdVideo(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: '/Bird/findBirdVideoByDate',
    params: data
  })
}


/* 红外相机模块 */
// 监测点位
export function getCamera(){ 
  return request({ 
    method: 'post', 
    headers: { 
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/filterVideoUpload/findAllCamera'
  })
} 
// 动物种类
export function getAnimal(){ 
  return request({ 
    method: 'post', 
    headers: { 
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/filterVideoUpload/queryAllCategories'
  })
} 
// 动物视频筛查展示
export function getAnimalsVideo(data){ 
  return request({ 
    method: 'post', 
    headers: { 
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/filterVideoUpload/findScreeningDisplayByPage',
    params: data
  })
} 
// 二次校准
export function getAnimalsVideoTwice(data){ 
  return request({ 
    method: 'post', 
    headers: { 
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/filterVideoUpload/findCalibrationDataByPage',
    params: data
  })
} 
// 二次校准-修改数据
export function getAnimalsVideoTwiceAlter(data){ 
  return request({ 
    method: 'post', 
    headers: { 
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/filterVideoUpload/updateById',
    params: data
  })
} 
// 二次校准-删除数据
export function getAnimalsVideoTwiceDelete(data){ 
  return request({ 
    method: 'post', 
    headers: { 
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/filterVideoUpload/deleteById',
    params: data
  })
} 
// 活动详情热力图
export function getAnimalsNum(data){ 
  return request({ 
    method: 'post', 
    headers: { 
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/filterVideoUpload/queryEventDetails',
    params: data
  })
} 
// 按天统计物种活动详情
export function getAnimalsNumDay(data){ 
  return request({ 
    method: 'post', 
    headers: { 
      'Content-Type': 'application/json; charset=UTF-8'
    },
    url: '/filterVideoUpload/activityDetailsByEachHour',
    params: data
  })
} 