import { AnyObject } from '@/common/types/global'
import { IPageable } from './types'
import { request } from '@/utils/request'

type SearchParamsProps = IPageable & AnyObject

export function queryPolicyList(data: SearchParamsProps) {
  return request.get({
    url: `/list/policy?current=${data.index}&pageSize=${data.size}`,
  })
}

export function getUserMenus() {
  return request.get({
    url: '/sys/list',
  })
}
