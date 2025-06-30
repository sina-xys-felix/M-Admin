import { request } from '@/utils/request'
import { IPageable } from '../types'
import { AnyObject } from '@/common/types/global'

const Api = {
  list: '/user/list',
  delete: '/user/delete',
  status: '/user/set',
}

export function getRoleList(data: IPageable) {
  return request.get({
    url: `${Api.list}?current=${data.index}&pageSize=${data.size}`,
  })
}

export function setRoleStatus(data: AnyObject) {
  return request.get({
    url: Api.status,
    data,
  })
}
