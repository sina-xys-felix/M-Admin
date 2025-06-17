import { ResponsiveValue, FormItem, FieldRule } from '@arco-design/web-vue'

type Layout = 'inline' | 'horizontal' | 'vertical'
type Size = 'mini' | 'medium' | 'large' | 'small'
type Align = 'left' | 'right'

type RowJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between'
type RowAlign = 'start' | 'center' | 'end' | 'stretch'

type FormItemTypes =
  | 'input'
  | 'input-number'
  | 'auto-complete'
  | 'cascader'
  | 'checkbox'
  | 'date-picker'
  | 'verification-code'
  | 'input-tag'
  | 'mention'
  | 'radio'
  | 'rate'
  | 'select'
  | 'slider'
  | 'switch'
  | 'textarea'
  | 'time-picker'
  | 'transfer'
  | 'tree-select'
  | 'upload'

// a-row 属性
interface RowConfigProps {
  gutter?: number | ResponsiveValue | [number | ResponsiveValue, number | ResponsiveValue]
  justify?: RowJustify
  align?: RowAlign
  div?: boolean
  wrap?: boolean
  props?: any
}

// Pick 从interface 取出某些属性  Omit 剔除某些属性，返回一个新的类型
type NewFormItemProps = Omit<
  FormItem,
  'field' | 'label' | 'show-colon' | 'disabled' | 'required' | 'rules' | 'asterisk-position' | 'hide-asterisk'
>

type ColTypes = number | string | 'initial' | 'auto' | 'none'

// 表单项配置项
interface MFormItemProps {
  show?: boolean // 是否需要显示
  order?: number // 表单项的排序，从小到大排序
  span: number // 表单项占据的栅格数
  offset?: number // 表单项偏移栅格数
  flex?: ColTypes
  colProps?: any // a-col 的其他属性

  field: string // 表单元素在数据对象中的path（数据项必填）
  label?: string // 标签的文本
  showColon?: boolean // 是否显示冒号
  disabled?: boolean // 是否禁用
  required?: boolean // 是否必填
  rules?: FieldRule | FieldRule[]
  asteriskPosition?: 'start' | 'end' // 可选择将星号置于 label 前/后
  hideAsterisk?: boolean // 是否隐藏星号
  attrs?: NewFormItemProps // 表单项props中除了以上属性以外的

  el?: FormItemTypes // 表单项的类型
  props?: any // 表单项参数或者属性，根据arco-design官方文档来确定，该属性会透传到组件
  render?: (scope: any) => VNode // 自定义搜索内容渲染（tsx语法）
}

export { Layout, Size, Align, RowJustify, RowAlign, RowConfigProps, MFormItemProps }
