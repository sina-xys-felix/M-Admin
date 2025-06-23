import Mock from 'mockjs'
import { defineMock } from './config'
import { successResponseWrap } from '../src/utils/setup-mock'

const { Random } = Mock

const data = Mock.mock({
  'list|55': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'number|2-3': /[0-9]/,
      'name|4-8': /[A-Z]/,
      'contentType|1': ['1', '2', '3'],
      'count|2-3': /[0-9]/,
      'status|1': ['online', 'offline'],
      'filterType|1': ['artificial', 'rules'],
      'createdTime': Random.datetime(),
    },
  ],
})

export default defineMock([
  {
    url: '/list/policy',
    method: 'get',
    timeout: 50,
    response: ({ query }) => {
      const { current, pageSize } = query
      const p = current as number
      const ps = pageSize as number
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55,
      })
    },
  },
])
