import { defineMock } from './config'
import { type MockTokenItem, getDelayTime, resultError, resultSuccess } from './utils'

export default defineMock([
  {
    url: '/user/login',
    method: 'post',
    timeout: getDelayTime(),
    response: ({ body }) => {
      const { username, password } = body
      if (!username) return resultError(null, '用户名不能为空', 50000)
      if (!password) return resultError(null, '密码不能为空', 50000)
      if (username === 'admin' && password === '123456') {
        const token: MockTokenItem = 'token_admin'
        return resultSuccess({ token })
      }
      if (username === 'user' && password === '123456') {
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
