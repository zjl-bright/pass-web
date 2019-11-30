import request from '@/utils/request'

export function getModule(id) {
  return request({
    url: `/part/${id}`,
    method: 'get'
  })
}

export function addModule(data) {
  return request({
    url: '/part',
    method: 'post',
    data
  })
}

export function updateModule(data) {
  return request({
    url: '/part',
    method: 'put',
    data
  })
}

export function delModule(id) {
  return request({
    url: `/part/${id}`,
    method: 'delete'
  })
}
