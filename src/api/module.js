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
