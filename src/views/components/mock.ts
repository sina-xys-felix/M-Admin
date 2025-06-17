import Mock from 'mockjs'
import dayjs from 'dayjs'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'

const dataList = [
  { code: '100000', value: '10000001', label: '男' },
  { code: '100000', value: '10000002', label: '女' },
  { code: '100001', value: '10000101', label: '汉族' },
  { code: '100001', value: '10000102', label: '蒙古族' },
  { code: '100001', value: '10000103', label: '回族' },
  { code: '100001', value: '10000104', label: '藏族' },
  { code: '100001', value: '10000105', label: '维吾尔族' },
  { code: '100001', value: '10000106', label: '苗族' },
  { code: '100001', value: '10000107', label: '彝族' },
  { code: '100001', value: '10000108', label: '壮族' },
  { code: '100001', value: '10000109', label: '布依族' },
  { code: '100001', value: '10000110', label: '朝鲜族' },
  { code: '100002', value: '10000201', label: '已婚' },
  { code: '100002', value: '10000202', label: '未婚' },
  { code: '100002', value: '10000203', label: '离异' },
]

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/dict/allItems'), (request) => {
      const data = JSON.parse(request.body)
      const list = dataList.filter((item) => item.code === data.dictId.toString())
      return successResponseWrap([...list])
    })
  },
})
