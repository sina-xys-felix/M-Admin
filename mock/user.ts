import { defineMock } from './config'
import { successResponseWrap, failResponseWrap } from '../src/utils/setup-mock'

export default defineMock([
  {
    url: '/user/login',
    method: 'post',
    timeout: 50,
    response: ({ body }) => {
      const { account, password } = body
      if (!account) {
        return failResponseWrap(null, '用户名不能为空', 50000)
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000)
      }
      if (account === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', 'admin')
        return successResponseWrap({
          token: 'token_admin',
        })
      }
      if (account === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', 'user')
        return successResponseWrap({
          token: 'token_user',
        })
      }
      return failResponseWrap(null, '账号或者密码错误', 50000)
    },
  },
  {
    url: '/user/logout',
    method: 'post',
    timeout: 50,
    response: () => {
      return successResponseWrap("登出成功")
    },
  },
])
