import request from '@/utils/request'

export function getModule(params) {
  return request({
    url: '/module/list',
    method: 'get',
    params
  })
}
