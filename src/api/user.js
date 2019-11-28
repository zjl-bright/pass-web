import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    baseURL: '/dev-api',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    baseURL: '/dev-api',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
    baseURL: '/dev-api',
  })
}
