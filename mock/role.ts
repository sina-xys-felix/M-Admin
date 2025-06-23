import Mock from 'mockjs'
import { defineMock } from './config'
import { successResponseWrap } from '../src/utils/setup-mock'

const { Random } = Mock

const data = Mock.mock({
  'list|10': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'name|2-3': /[0-9]/,
      'alias|2-3': /[0-9]/,
      'code|4-8': /[A-Z]/,
      'quickCode|4': /[a-z]/,
      'descripton|4-10': /[0-9]/,
      'start': Random.datetime(),
      'end': Random.datetime(),
    },
  ],
})

export default defineMock([
  {
    url: '/user/list',
    method: 'get',
    timeout: 50,
    response: ({ query }) => {
      const { current = 1, pageSize = 10 } = query
      const p = current as number
      const ps = pageSize as number
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55,
      })
    },
  },
])
