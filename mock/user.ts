import Mock from 'mockjs'
import { defineMock } from './config'
import { successResponseWrap, failResponseWrap } from '../src/utils/setup-mock'

const { Random } = Mock

const data = Mock.mock({
  'list|30': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'no|4': /[0-9]/,
      'name|2-3': /[\u4e00-\u9fa5]/,
      'nickName|2-3': /[\u4e00-\u9fa5]/,
      'mobile': /1388888888/,
      'entryTime': Random.datetime().slice(0, 10),
      'leaveTime': Random.datetime().slice(0, 10),
      'status': /0|1/,
    },
  ],
})

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
        return successResponseWrap({
          token: 'token_admin',
        })
      }
      if (account === 'user' && password === 'user') {
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
      return successResponseWrap('登出成功')
    },
  },
  {
    url: '/staff/list',
    method: 'get',
    timeout: 50,
    response: ({ query }) => {
      const { current = 1, pageSize = 10 } = query
      const p = current as number
      const ps = pageSize as number
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 30,
      })
    },
  },
])
