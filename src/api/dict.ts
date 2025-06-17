import { request } from '@/utils/request'

export function getDictList(data: any) {
  return request.post({
    url: '/dict/list',
    data,
  })
}

export function getDictItemList(data: any) {
  return request.post({
    url: '/dict/items',
    data,
  })
}

export function deleteDictItem(data: any) {
  return request.post({
    url: '/dict/delete',
    data,
  })
}

export function updateDictItem(data: any) {
  return request.post({
    url: '/dict/update',
    data,
  })
}
