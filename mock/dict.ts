import Mock from 'mockjs'
import { defineMock } from './config'
import { successResponseWrap } from '../src/utils/setup-mock'

const data = Mock.mock({
  list: [
    {
      id: '1',
      value: '1',
      name: '男',
      alias: '男',
      code: '101',
      quickCode: 'n',
      status: 1,
    },
    {
      id: '2',
      value: '1',
      name: '女',
      alias: '女',
      code: '102',
      quickCode: 'nv',
      status: 1,
    },
    {
      id: '3',
      value: '2',
      name: '汉族',
      alias: '汉',
      code: '01',
      quickCode: 'hz',
      status: 1,
    },
    {
      id: '4',
      value: '2',
      name: '蒙古族',
      alias: '蒙',
      code: '02',
      quickCode: 'mgz',
      status: 1,
    },
    {
      id: '5',
      value: '2',
      name: '回族',
      alias: '回',
      code: '03',
      quickCode: 'hz',
      status: 1,
    },
    {
      id: '6',
      value: '2',
      name: '藏族',
      alias: '藏',
      code: '04',
      quickCode: 'zz',
      status: 1,
    },
    {
      id: '7',
      value: '2',
      name: '维吾尔族',
      alias: '维',
      code: '05',
      quickCode: 'wwez',
      status: 1,
    },
    {
      id: '8',
      value: '2',
      name: '苗族',
      alias: '苗',
      code: '06',
      quickCode: 'mz',
      status: 1,
    },
    {
      id: '9',
      value: '2',
      name: '彝族',
      alias: '彝',
      code: '07',
      quickCode: 'yz',
      status: 1,
    },
    {
      id: '10',
      value: '2',
      name: '壮族',
      alias: '壮',
      code: '08',
      quickCode: 'zz',
      status: 1,
    },
    {
      id: '11',
      value: '2',
      name: '布依族',
      alias: '布依',
      code: '09',
      quickCode: 'byz',
      status: 1,
    },
    {
      id: '12',
      value: '2',
      name: '朝鲜族',
      alias: '朝鲜',
      code: '10',
      quickCode: 'cxz',
      status: 1,
    },
    {
      id: '13',
      value: '3',
      name: '已婚',
      alias: '已婚',
      code: '13',
      quickCode: 'yh',
      status: 1,
    },
    {
      id: '14',
      value: '3',
      name: '未婚',
      alias: '未婚',
      code: '14',
      quickCode: 'wh',
      status: 1,
    },
    {
      id: '15',
      value: '3',
      name: '离异',
      alias: '离异',
      code: '15',
      quickCode: 'ly',
      status: 1,
    },
    {
      id: '16',
      value: '4',
      name: '中共党员',
      alias: '党员',
      code: '1601',
      quickCode: 'dy',
      status: 1,
    },
    {
      id: '17',
      value: '4',
      name: '中共预备党员',
      alias: '预备党员',
      code: '1602',
      quickCode: 'ybdy',
      status: 1,
    },
    {
      id: '18',
      value: '4',
      name: '共青团员',
      alias: '团员',
      code: '1603',
      quickCode: 'ty',
      status: 1,
    },
  ],
})

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

export default defineMock([
  {
    url: '/dict/list',
    method: 'get',
    timeout: 50,
    response: () => {
      return successResponseWrap({
        list: [
          { id: '1', name: '性别', editable: true },
          { id: '2', name: '民族', editable: true },
          { id: '3', name: '婚烟状况', editable: true },
          { id: '4', name: '政治面貌', editable: true },
        ],
        total: 5,
      })
    },
  },
  {
    url: '/dict/items',
    method: 'get',
    timeout: 50,
    response: ({ query }) => {
      const { current = 1, pageSize = 10, key = '1' } = query
      const p = current as number
      const ps = pageSize as number
      const result = data.list.filter((item) => item.value === key).slice((p - 1) * ps, p * ps)
      return successResponseWrap({
        list: result,
        total: result.length,
      })
    },
  },
  {
    url: '/dict/allItems',
    method: 'post',
    timeout: 50,
    response: ({ body }) => {
      const { dictId } = body
      const list = dataList.filter((item) => item.code === dictId.toString())
      return successResponseWrap([...list])
    },
  },
])
