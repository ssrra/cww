import request from '@/config/request'
import ipObj from '../config/baseip';

//***************实时数据回传***************//

/* 生态因子模块 */
// 获取五个生态因子监测点数据
export function getEcologicalData(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: ipObj.huzhuIp+'/Data/realTimeData',
    params: data
  })
}
// 负氧离子等生态因子图表数据（生态因子实时数据）
export function getEcoChart() {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url:ipObj.huzhuIp+ '/Temperature/temperature',
    
  })
}
// 超标种类分布图数据（生态因子实时数据）
export function getOverStanderdChart() {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: ipObj.huzhuIp+'/EcologicalFactor/ecologicalFactor',
    
  })
}
// 月度分析
// 超标总结图数据（生态因子数据分析）data:{time:time}
export function getOverSUmmaryChart(time) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: ipObj.huzhuIp+'/analyzed/AlertTrendGraphMonthMonth',
    params: time
  })
}
// 生态因子趋势图（生态因子数据分析）data:{time:time,name:name}
export function getEcoFactorChart(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url:ipObj.huzhuIp+'/analyzed/EcologicalMapMonth',
    params: data
  })
}
// 生态因子表格数据（生态因子数据分析）data:{time:time,likeName:likeName,currPage:currPage,pageSize:pageSize}
export function getEcoFactorTable(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: ipObj.huzhuIp+'/analyzed/pageMonth',
    params: data
  })
}
// 超标分布图数据（生态因子数据分析）data:{time:time}
export function getOverCircleChart(time) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: ipObj.huzhuIp+'/analyzed/EcologicalDistributionMonth',
    params: time
  })
}
// 年度分析
// 超标总结图数据（生态因子数据分析）data:{time:time}
export function getOverSUmmaryYearChart(time) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: ipObj.huzhuIp+'/analyzed/AlertTrendGraphMonthYear',
    params: time
  })
}
// 生态因子趋势图（生态因子数据分析）data:{time:time,name:name}
export function getEcoFactorYearChart(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: ipObj.huzhuIp+'/analyzed/EcologicalMapYear',
    params: data
  })
}
// 生态因子表格数据（生态因子数据分析）data:{time:time,likeName:likeName}
export function getEcoFactorYearTable(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: ipObj.huzhuIp+'/analyzed/pageYear',
    params: data
  })
}
// 超标分布图数据（生态因子数据分析）data:{time:time}
export function getOverCircleYearChart(time) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: ipObj.huzhuIp+'/analyzed/EcologicalDistributionYear',
    params: time
  })
} 