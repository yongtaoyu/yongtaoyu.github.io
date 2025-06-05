import http from '@/utils/http'

export function getCategoryAPI() {
  return http({
    url: 'home/category/head'
  })
}

export function getFetchCategoryAPI() {
  return fetch('http://pcapi-xiaotuxian-front-devtest.itheima.net/home/category/head')
}