import request from '@/utils/request'

export function getModule(params) {
  return request({
    url: '/part',
    method: 'get',
    params
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
    url: `/part?_id=${id}`,
    method: 'delete'
  })
}
