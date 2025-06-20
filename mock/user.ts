import { defineMock } from './config'
import { getDelayTime, resultError, resultSuccess } from './utils'

export default defineMock([
  {
    url: '/user/login',
    method: 'post',
    timeout: getDelayTime(),
    response: ({ body }) => {
      const { account, password } = body
      if (!account) return resultError(null, '用户名不能为空', 50000)
      if (!password) return resultError(null, '密码不能为空', 50000)
      if (account === 'admin' && password === 'admin') {
        const token: MockTokenItem = 'token_admin'
        return resultSuccess({ token })
      }
      if (account === 'user' && password === '123456') {
        const token: MockTokenItem = 'token_user'
        return resultSuccess({ token })
      }
      return resultError(null, '账号或者密码错误', 50000)
    },
  },
  {
    url: '/user/logout',
    method: 'post',
    timeout: getDelayTime(),
    response: () => {
      return resultSuccess(null)
    },
  },
])
