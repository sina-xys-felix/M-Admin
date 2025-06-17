import { request } from '@/utils/request'

const Api = {
  list: '/user/list',
  delete: '/user/delete',
  status: '/user/set',
}

export function getRoleList(data: any) {
  return request.post({
    url: Api.list,
    data,
  })
}

export function deleteRole(data: any) {
  return request.post({
    url: Api.delete,
    data,
  })
}

export function setRoleStatus(data: any) {
  return request.post({
    url: Api.status,
    data,
  })
}
