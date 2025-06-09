import request from '@/utils/http'

export function loginAPI(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}
