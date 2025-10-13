import { SelectOption } from '@arco-design/web-vue'

/**
 * 分页配置-1
 * */
const PAGINATION_OPTIONS_1: SelectOption[] = [
  { value: 10, label: '每页10条' },
  { value: 20, label: '每页20条' },
  { value: 50, label: '每页50条' },
  { value: 100, label: '每页100条' },
]

/**
 * 分页配置-2
 * */
const PAGINATION_OPTIONS_2: SelectOption[] = [
  { value: 15, label: '每页15条' },
  { value: 25, label: '每页25条' },
  { value: 50, label: '每页50条' },
  { value: 100, label: '每页100条' },
]

/**
 * 分页配置-3
 * */
const PAGINATION_OPTIONS_4: SelectOption[] = [
  { value: 30, label: '每页30条' },
  { value: 50, label: '每页50条' },
  { value: 100, label: '每页100条' },
  { value: 200, label: '每页200条' },
]

/**
 * 默认行间距
 * */
const ROW_GUTTER = 16

/**
 * 表格查询条件，默认每行拆分多少列
 * */
const MAX_SEARCH_ITEM_NUMBER = 4

/**
 * 表格组件左右拆分时，表格查询条件，默认每行拆分多少列
 * */
const MAX_SEARCH_ITEM_NUMBER_SPLIT = 3

/**
 * 栅格占位总格数
 * */
const GRID_TOTAL = 24

/**
 * 每列占用多少栅格数
 * */
const DEFAULT_GRID_NUMS = 6
const DEFAULT_GRID_NUMS_EXTEND = 8

/**
 * 文件后缀(格式)
 * */
const CONTENT_TYPE = {
  doc: 'application/vnd.msword;charset=utf-8',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  zip: 'application/zip',
}

export {
  PAGINATION_OPTIONS_1,
  PAGINATION_OPTIONS_2,
  PAGINATION_OPTIONS_4,
  ROW_GUTTER,
  MAX_SEARCH_ITEM_NUMBER,
  MAX_SEARCH_ITEM_NUMBER_SPLIT,
  GRID_TOTAL,
  DEFAULT_GRID_NUMS,
  DEFAULT_GRID_NUMS_EXTEND,
  CONTENT_TYPE,
}
