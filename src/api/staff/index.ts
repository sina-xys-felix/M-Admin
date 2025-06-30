import { request } from '@/utils/request'
import IStaffProps from './types'
import { IPageable } from '../types'
/**
 * @name 职员接口API
 * @author xuyingping
 * */

const Api = {
  list: '/staff/list',
  add: '/staff/add',
  update: '/staff/update',
  remove: '/staff/remove',
  get: '/staff/get',
  setOrg: '/staff/setOrgans',
  setRole: '/member/setRoles',
}

/**
 * @description 获取所有职员,分页查询
 * @param name
 * @param mobile
 * @param status
 * */
export const geStaffList = (data: IPageable) => {
  return request.get({
    url: `${Api.list}?current=${data.index}&pageSize=${data.size}`,
  })
}

/**
 * @description 获取职员详情
 * @param {string} id 查询参数
 * @returns {any}
 * */
export const getStaffDetail = (id: string) => {
  return request.post({
    url: Api.get,
    data: { id: `${id}` },
  })
}

/**
 * @description 删除职员
 * @param {string} id 查询参数
 * @returns {any}
 * */
export const deleteStaff = (id: string) => {
  return request.post({
    url: Api.remove,
    data: { id: `${id}` },
  })
}

/**
 * @description 修改职员信息
 * @typedef {IStaffProps} data
 * @returns {any}
 * */
export const updateStaff = (data: IStaffProps) => {
  return request.post({
    url: Api.update,
    data,
  })
}

/**
 * @description 新增职员信息
 * @typedef {IStaffProps} data
 * @returns {any}
 * */
export const addStaff = (data: IStaffProps) => {
  return request.post({
    url: Api.add,
    data,
  })
}

/**
 * @description 关联职员机构
 * @typedef {string[]} ids
 * @returns {any}
 * */
export const setOrgans = (id: string, ids: (string | number)[]) => {
  return request.post({
    url: Api.setOrg,
    data: { id, ids },
  })
}

/**
 * @description 关联职员角色
 * @typedef {string[]} ids
 * @returns {any}
 * */
export const setRoles = (id: string, ids: (string | number)[]) => {
  return request.post({
    url: Api.setRole,
    data: { id, ids },
  })
}
