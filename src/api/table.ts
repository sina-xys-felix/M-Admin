import { request } from '@/utils/request'

export function queryPolicyList(data: any) {
  return request.post({
    url: '/list/policy',
    data,
  })
}

export function getUserMenus() {
  return request.post({
    url: '/sys/list',
  })
}
