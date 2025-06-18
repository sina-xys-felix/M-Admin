import { request } from '@/utils/request'

const Api = {
  list: '/user/list',
  delete: '/user/delete',
  status: '/user/set',
}

export function getRoleList(data: any) {
  return request.get({
    url: `${Api.list}?current=${data.index}&pageSize=${data.size}`,
  })
}

export function setRoleStatus(data: any) {
  return request.get({
    url: Api.status,
    data,
  })
}
