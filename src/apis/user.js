import request from '@/utils/http'

export function loginAPI({ account, password }) {
  return request({
    url: '/login',
    method: 'post',
    data: { account, password }
  })
}
