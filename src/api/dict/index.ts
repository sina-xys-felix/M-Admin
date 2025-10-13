import { request } from '@/utils/request'
import { DictItemSearch } from './types'
import { AnyObject } from '@/common/types/global'

/**
 * @name 字典集合API
 * @author m-admin
 */

type DictItemSearchProps = DictItemSearch & AnyObject

const api = {
  list: '/dict/list',
  allItems: '/dict/allItems',
  items: '/dict/items',
}

export function getDictList() {
  return request.get({
    url: `${api.list}`,
  })
}

export function getDictItemList(data: DictItemSearchProps) {
  return request.get({
    url: `${api.items}?current=${data.current}&pageSize=${data.pageSize}&key=${data.key}`,
  })
}

/**
 * @description 获取字典项列表
 * @typedef {ISearchItemParams} params 查询参数
 * @returns {Array}
 * */
export const getDictOptions = (id: number | string) => {
  return request.post({
    url: api.allItems,
    data: { dictId: id },
  })
}
