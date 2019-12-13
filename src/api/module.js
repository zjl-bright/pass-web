import request from '@/utils/request'

export function getModule(id) {
  return request({
    url: `/module/${id}`,
    method: 'get'
  })
}

export function addModule(data) {
  return request({
    url: '/module',
    method: 'post',
    data
  })
}

export function updateModule(data) {
  return request({
    url: '/module',
    method: 'put',
    data
  })
}

export function delModule(id) {
  return request({
    url: `/module/${id}`,
    method: 'delete'
  })
}

export function packageModule(params) {
  return request({
    url: `/module/package?_id=${params.moduleId}&branchName=${params.branchName}&ip=${params.ip}`,
    method: 'get'
  })
}
