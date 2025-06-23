import { request } from '@/utils/request'
import { ISearchParams, SearchParams } from '../types'
import { IDictProps, ICommonProps } from './types'

/**
 * @name 字典集合API
 * @author xuyingping
 */

const api = {
  list: '/dict/list',
  add: '/dict/add',
  remove: '/dict/remove',
  update: '/dictType/update',
  detail: '/dict/get',
  code: '/dict/getByCode',

  allItems: '/dict/allItems',
  itemAdd: '/dict/addItem',
  modify: '/dict/updateItem',
  get: '/Dict/GetItem',
  delete: '/dict/removeItem',
}

/**
 * @description 获取字典列表,分页
 * @param {SearchParams} params 查询参数
 * @returns {Array}
 * */
export const getDictList = (params?: SearchParams) => {
  return request.post({
    url: api.list,
    data: params,
  })
}

/**
 * @description 新增字典
 * @param {IDictProps} data 字典属性
 * @returns {Object}
 * */
export const addDict = (data: IDictProps) => {
  return request.post({
    url: api.add,
    data,
  })
}

/**
 * @description 修改字典
 * @param {IDictProps} data 字典属性
 * @returns {Object}
 * */
export const updateDict = (data: IDictProps) => {
  return request.post({
    url: api.update,
    data,
  })
}

/**
 * @description 删除字典
 * @param {string} id 字典属性
 * @returns {any}
 * */
export const deleteDict = (id: string) => {
  return request.post({
    url: api.remove,
    data: { id: id },
  })
}

/**
 * @description 获取字典项详情
 * @param {string} id 字典属性
 * @returns {any}
 * */
export const getDictDetail = (id: number | string) => {
  return request.post({
    url: api.detail,
    data: { id: id },
  })
}

/**
 * @description 获取字典项详情
 * @param {string} code 字典属性(code用id)
 * @returns {any}
 * */
export const getDictByCode = (code: number | string) => {
  return request.post({
    url: api.code,
    data: { id: code },
  })
}

//////////// 字典项操作接口API //////////

/**
 * @description 获取字典项列表
 * @typedef {ISearchItemParams} params 查询参数
 * @returns {Array}
 * */
export const getDictItemList = (id: number | string) => {
  return request.post({
    url: api.allItems,
    data: { dictId: id },
  })
}

/**
 * @description 新增字典项
 * @typedef {ICommonProps} data 字典项属性
 * @returns {Object}
 * */
export const addDictItem = (data: ICommonProps) => {
  return request.post({
    url: api.itemAdd,
    data,
  })
}

/**
 * @description 修改字典项
 * @typedef {ICommonProps} data 字典项属性
 * @returns {Object}
 * */
export const updateDictItem = (data: ICommonProps) => {
  return request.post({
    url: api.modify,
    data,
  })
}

/**
 * @description 删除字典项
 * @param {string} id 参数
 * @returns {any}
 * */
export const deleteDictItem = (id: string) => {
  return request.post({
    url: api.delete,
    data: { id: id },
  })
}

