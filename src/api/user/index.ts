import { request } from '@/utils/request'
import { UserParams, UserProps } from './types'

/**
 * @name 角色管理API
 * @author xuyingping
 * */

const api = {
  add: '/Member/Add',
  get: '/Member/Get',
  list: '/Member/list',
  update: '/Member/Update',
  modify: '/Member/SetStatus',
}

/**
 * @description 获取角色列表
 * @param {Object} params 查询参数
 * @returns {Array}
 * */
export const getUserList = (params: UserParams) => {
  return request.post({
    url: api.list,
    data: params,
  })
}

/**
 * @description 获取角色详情
 * @param {String} id 查询参数
 * @returns {Object}
 * */
export const getUser = (id: string) => {
  return request.post({
    url: api.get,
    data: { id: `${id}` },
  })
}

/**
 * @description 新增角色
 * @param {UserProps} data
 * @returns {Object}
 * */
export const addUser = (data: UserProps) => {
  return request.post({
    url: api.add,
    data,
  })
}

/**
 * @description 编辑角色
 * @param {UserProps} data
 * @returns {Object}
 * */
export const updateUser = (data: UserProps) => {
  return request.post({
    url: api.update,
    data,
  })
}

/**
 * @description 修改角色状态
 * @typedef {UserProps} data
 * @returns {Object}
 * */
export const setUserStatus = (data: UserProps) => {
  return request.post({
    url: api.modify,
    data,
  })
}
