import { request } from '@/utils/request'

export function queryPolicyList(data: any) {
  return request.get({
    url: `/list/policy?current=${data.index}&pageSize=${data.size}`,
  })
}

export function getUserMenus() {
  return request.get({
    url: '/sys/list',
  })
}
