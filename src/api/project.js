import request from '@/utils/request'

export function getProject() {
  return request({
    url: '/project',
    method: 'get'
  })
}

export function addProject(data) {
  return request({
    url: '/project',
    method: 'post',
    data
  })
}

export function updateProject(data) {
  return request({
    url: '/project',
    method: 'put',
    data
  })
}

export function delProject(id) {
  return request({
    url: `/project?_id=${id}`,
    method: 'delete'
  })
}
