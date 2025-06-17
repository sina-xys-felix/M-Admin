import Mock from 'mockjs'
import qs from 'query-string'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'

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

setupMock({
  setup() {
    // page
    Mock.mock(new RegExp('/api/user/list'), (params: any) => {
      const { current = 1, pageSize = 10 } = qs.parseUrl(params.url).query
      const p = current as number
      const ps = pageSize as number
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55,
      })
    })
    Mock.mock(new RegExp('/api/user/delete'), () => {
      return successResponseWrap(0)
    })
    Mock.mock(new RegExp('/api/user/set'), () => {
      return successResponseWrap(0)
    })
  },
})
