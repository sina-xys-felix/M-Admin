import { request } from '@/utils/request'
import { Result } from '@/utils/request/type'
import { LoginData, ChangePassword, IMemberProps } from './types'

/**
 * @name 登录模块
 * @author xuyingping
 * */

const Api = {
  login: '/user/login', // 登录
  // login: '/Auth/Login', // 登录
  logout: '/user/logout', // 登出
  changPassword: '/Auth/ChangePassword', // 修改密码
  member: '/Auth/GetMember', // 获取成员
  menu: '/Auth/GetMenu', // 获取菜单，已丢弃
  role: '/Auth/GetRole', // 获取角色，已丢弃
  newMember: '/Auth/UpdateMember', // 更新成员
  permission: '/Auth/Get', // 获取权限
  code: '/login/getVerifyCode', // 获取验证码
}

/**
 * @description login
 * @param {LoginData} data
 * */
export const login = (data: LoginData) => {
  return request.post<Result>({
    url: Api.login,
    data,
  })
}

/**
 * @description logout
 * */
export const logout = () => {
  return request.post<Result>({
    url: Api.logout,
  })
}

/**
 * @description changPassword
 * @param {ChangePassword} data
 * */
export const changPassword = (data: ChangePassword) => {
  return request.post<Result>({
    url: Api.changPassword,
    data,
  })
}

/**
 * @description getMember
 * */
export const getMember = () => {
  return request.post<Result>({
    url: Api.member,
  })
}

/**
 * @description getMenu
 * */
export const getMenu = () => {
  return request.post<Result>({
    url: Api.menu,
  })
}

/**
 * @description getRole
 * */
export const getRole = () => {
  return request.post<Result>({
    url: Api.role,
  })
}

/**
 * @description getNewMember
 * */
export const getNewMember = (data: IMemberProps) => {
  return request.post<Result>({
    url: Api.newMember,
  })
}

/**
 * @description refresh permission,
 * */
export const getPermission = () => {
  return request.post<Result>({
    url: Api.permission,
  })
}

// export const useGetAddr = (data: loginData) => {
//   return useRequest<Result>(login, data)
// }

/**
 * @description refresh permission,
 * */
export const getCode = () => {
  return request.get({
    url: Api.code,
  })
}
