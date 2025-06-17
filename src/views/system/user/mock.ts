import Mock from 'mockjs'
import qs from 'query-string'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'

const { Random } = Mock

const data = Mock.mock({
  'list|30': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'no|4': /[0-9]/,
      'name|2-3': /[\u4e00-\u9fa5]/,
      'nickName|2-3': /[\u4e00-\u9fa5]/,
      'mobile':/1388888888/,
      'entryTime': Random.datetime().slice(0,10),
      'leaveTime': Random.datetime().slice(0,10),
      'status': /0|1/,
    },
  ],
})

setupMock({
  setup() {
    // page
    Mock.mock(new RegExp('/api/staff/list'), (params: any) => {
      const { current = 1, pageSize = 10 } = qs.parseUrl(params.url).query
      const p = current as number
      const ps = pageSize as number
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 30,
      })
    })
  },
})
