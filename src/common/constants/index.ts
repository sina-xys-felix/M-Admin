import { SelectOption } from '@arco-design/web-vue'

const PAGINATION_OPTIONS: SelectOption[] = [
  { value: 15, label: 'paniation.item-15' },
  { value: 25, label: 'paniation.item-25' },
  { value: 50, label: 'paniation.item-50' },
  { value: 100, label: 'paniation.item-100' },
]

// grid gutter
const ROW_GUTTER = 16

// max search item number dictionaries
const MAX_SEARCH_ITEM_NUMBER = 4
const MAX_SEARCH_ITEM_NUMBER_SPLIT = 3

// grid nums
const GRID_TOTAL = 24

//  default  span nums
const DEFAULT_GRID_NUMS = 6
const DEFAULT_GRID_NUMS_EXTEND = 8

// 文件后缀
const CONTENT_TYPE = {
  doc: 'application/vnd.msword;charset=utf-8',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  zip: 'application/zip',
}

const MapStyle = {
  light: 'amap://styles/normal',
  dark: 'amap://styles/grey',
}

const TITLE_MAP = {
  platform: {
    login: 'M-Admin',
    home: 'M-Admin',
    style: '',
    logo: 'logo.png',
  },
}

export {
  PAGINATION_OPTIONS,
  ROW_GUTTER,
  MAX_SEARCH_ITEM_NUMBER,
  MAX_SEARCH_ITEM_NUMBER_SPLIT,
  GRID_TOTAL,
  DEFAULT_GRID_NUMS,
  DEFAULT_GRID_NUMS_EXTEND,
  CONTENT_TYPE,
  MapStyle,
  TITLE_MAP,
}
