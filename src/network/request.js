import { request, permissionRequest } from './network'
// 登陆
export function loginAxios (config) {
  return request({
    url: 'login.php',
    params: config
  })
}
// 用户对应天气信息获取
export function weatherAxios () {
  return permissionRequest({
    url: 'tianqi3day.php'
  })
}
// 获取意向用户列表
export function getIntentionData (params) {
  return permissionRequest({
    url: 'yxList.php',
    params
  })
}
// 删除一条用户
export function deleteIntention (id) {
  return permissionRequest({
    url: 'yxDelRow.php',
    params: {
      id
    }
  })
}
// 添加用户前的初始化
export function getAccountDate () {
  return permissionRequest({
    url: 'yxLoad.php'
  })
}
// 添加新的客户
export function addAccount (params) {
  return permissionRequest({
    url: 'yxAdd.php',
    params
  })
}
// 验证表单的重复性
export function validateForm (params) {
  return permissionRequest({
    url: 'yxValidate.php',
    params
  })
}
// 查找一条数据
export function searchData (id) {
  return permissionRequest({
    url: 'yxRow.php',
    params: {
      id
    }
  })
}
// 修改一条记录
export function editData (params) {
  return permissionRequest({
    url: 'yxUpdata.php',
    params
  })
}
// 最近一周排名
export function rankData () {
  return permissionRequest({
    url: 'dataPaiming.php'
  })
}
// 咨询专业分布
export function consultMajor () {
  return permissionRequest({
    url: 'dataFenBu.php'
  })
}
// 客服录入量统计
export function serviceEnter () {
  return permissionRequest({
    url: 'dataKefu.php'
  })
}
