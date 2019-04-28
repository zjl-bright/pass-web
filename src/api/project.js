import request from '@/utils/request'

export function getProject(params) {
  return request({
    url: '/project/list',
    method: 'get',
    params
  })
}
