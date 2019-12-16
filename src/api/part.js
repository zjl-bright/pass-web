import request from '@/utils/request'

export function getPart(id) {
  return request({
    url: `/part/${id}`,
    method: 'get'
  })
}

export function addPart(data) {
  return request({
    url: '/part',
    method: 'post',
    data
  })
}

export function updatePart(data) {
  return request({
    url: '/part',
    method: 'put',
    data
  })
}

export function delPart(id) {
  return request({
    url: `/part/${id}`,
    method: 'delete'
  })
}

export function packagePart(params) {
  return request({
    url: `/part/package?_id=${params.partId}&branchName=${params.branchName}&ip=${params.ip}`,
    method: 'get'
  })
}

export function clonePart(id) {
  return request({
    url: `/part/clone/${id}`,
    method: 'get'
  })
}
