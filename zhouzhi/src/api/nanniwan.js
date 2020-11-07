import request from '@/config/request'
import ipObj from '../config/baseip';

//***************考勤管理***************//
// 考勤统计
export function getDataClocking(data) {
  return request({
    method: 'post',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url: ipObj.nanniwan+'/Attendance/daySign',
    params: data
  })
}

// 请假统计
export function getDataLeaves() {
  return request({
    method: 'get',
    headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
    url:ipObj.nanniwan+ '/Attendance/LeaveStatus'
  })
}