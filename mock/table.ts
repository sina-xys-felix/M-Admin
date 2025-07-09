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
      'address': '@county(true)',
      'createdTime': Random.datetime(),
    },
  ],
})

const basicData = Mock.mock({
  'list|100': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'avatar|2-3': /[0-9]/,
      'name': '@cname',
      'phone': /1[3-9]\d{9}/,
      'email': /[a-z]{5,10}\.(20)?(1[6-9]|2[0-3])@(gmail|qq|163|126|outlook)\.(com|cn|net)/,
      'filterType|1': ['artificial', 'rules'],
      'count|3-5': /[0-9]/,
      'status|1': ['0', '1'],
      'address': '@county(true)',
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
  {
    url: '/list/basic',
    method: 'get',
    timeout: 50,
    response: ({ query }) => {
      const { current, pageSize } = query
      const p = current as number
      const ps = pageSize as number
      return successResponseWrap({
        list: basicData.list.slice((p - 1) * ps, p * ps),
        total: 100,
      })
    },
  },
])
