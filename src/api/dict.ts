import { request } from '@/utils/request'

export function getDictList() {
  return request.get({
    url: `/dict/list`,
  })
}

export function getDictItemList(data: any) {
  return request.get({
    url: `/dict/items?current=${data.current}&pageSize=${data.pageSize}&key=${data.key}`,
  })
}

export function deleteDictItem(data: any) {
  return request.get({
    url: '/dict/delete',
    data,
  })
}

export function updateDictItem(data: any) {
  return request.get({
    url: '/dict/update',
    data,
  })
}
