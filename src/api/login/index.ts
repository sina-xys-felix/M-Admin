import { request } from '@/utils/request'
import { Result } from '@/utils/request/type'
import { LoginData } from './types'

/**
 * @name 登录模块
 * @author m-admin
 * */

const Api = {
  login: '/user/login', // 登录
  logout: '/user/logout', // 登出
}

/**
 * @description login
 * @param {LoginData} data
 * */
export const login = (data: LoginData) => {
  return request.post<Result>({
    url: `${Api.login}`,
    data,
  })
}

/**
 * @description logout
 * */
export const logout = () => {
  return request.get<Result>({
    url: Api.logout,
  })
}
