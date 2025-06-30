import { VNode, ComponentPublicInstance } from 'vue'
import { TableExpandable, TableRowSelection } from '@arco-design/web-vue'
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'
import type { ShortcutType } from '@arco-design/web-vue/es/date-picker/interface'
import { AxiosResponse } from 'axios'
import { TreeOptions } from '@/components/m-tree/types'
import MTable from '@/components/m-table/index.vue'

// 属性枚举，建议为该接口添加更具体的类型定义，若无法确定，可考虑移除索引签名
interface EnumProps {
  label: string // 选项框中显示的文字
  value: string // 选项框中的值
  disabled?: boolean // 是否禁用选项框
  tagType?: string // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[]
  [key: string]: unknown
}

// 搜索条件搜索类型
type SearchType =
  | 'input'
  | 'cascader'
  | 'date-picker'
  | 'range-picker'
  | 'input-number'
  | 'radio'
  | 'radio-group'
  | 'select'
  | 'tree-select'
  | 'time-picker'

// 当搜索框为select 或者  cascader 时传入的数据需要满足一下格式
type DataProps = {
  value: number | string | boolean
  label: string
  children?: DataProps[]
}

// 筛选类型
type Filters = Record<string, string[]>
// 排序
type Sorter = { field: string; direction: 'ascend' | 'descend' } | Record<string, never>

// 范围选择器类型
type RangePickerType = 'date' | 'year' | 'quarter' | 'week' | 'month'

type SearchRenderScope = {
  searchParam: Record<string, unknown>
  placeholder: string
  clearable: boolean
  options: EnumProps[]
  data: EnumProps[]
}

// 自定义搜索列
type SearchProps = {
  el?: SearchType // 当前搜索框的类型
  isShow?: boolean // 搜索列是否可见
  props?: Record<string, unknown>
  key?: string // 当搜索项 key 值不为 field时，可以通过key来指定
  order?: number // 搜索框的排序，从小到大一次排列
  options?: DataProps[] // 渲染查询条件的数据,select 或者  cascader
  defaultValue?: string | number | boolean | unknown[]
  mode?: RangePickerType // 时间选择器为范围选择器时，范围选择器类型
  shortcuts?: ShortcutType[] // 时间选择器，快捷时间
  custom?: boolean // 是否自定义查询条件内容
  span?: number // 搜索列占的栅格数
  offset?: number // 搜索列偏移栅格数
  treeProps?: TreeOptions // 列表左侧树形结构,需要时可以自行补充
  render?: (scope: SearchRenderScope) => VNode // 自定义搜索内容渲染（tsx语法）
}

// 表格列的配置
type Alias = {
  isShow?: boolean // 是否显示列
  isEdit?: boolean // 列是否可编辑
  attrs?: SearchProps // 编辑时用用到的属性，只有 el 和 props 可用
}

interface ColumnProps extends TableColumnData {
  enum?: Record<string, unknown>
  search?: SearchProps // 搜索列配置

  extra?: Alias // 表格列的其他配置
}

type RowSelectionType = 'radio' | 'checkbox'

interface TableProps<T = unknown> {
  columns: ColumnProps[] // 列的配置项，即表头显示内容，==> 必传
  data?: T[] // 静态data
  requestApi?: (param: Record<string, unknown>) => Promise<AxiosResponse<T, unknown>>
  requestAuto?: boolean // 是否自动查询
  dataCallback?: (data: T) => T
  isSplit?: boolean // 是否需要拆分布局，左右布局的形式
  spanSplit?: number // 左边部分占多少栅格数,共24等分
  splitLine?: boolean // 是否需要分隔线
  title?: string // 表格标题,在表格打印的时候用
  subTitle?: string // 子标题（分隔时，左边块的标题），需配合isSplit使用
  initParam?: Record<string, unknown>
  pagination?: boolean // 是否需要分页组件，默认为true
  bordered?: boolean // 是否需要表格纵向边框，默认为false
  stripe?: boolean // 是否开启斑马纹，默认为false
  toolButton?: boolean // 是否显示表格功能按钮 ==> 非必传（默认为true）,打印和导出功能
  selectId?: string // 当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  isExpand?: TableExpandable | boolean // 是否显示展开列信息
  isRowSelection?: RowSelectionType | TableRowSelection | boolean // 是否可以选择行
  isTreeTable?: boolean // 是否是树形表格，默认为false。如果是树形表格则需要配置该项。注意：每行下面会有一块占位span
  xScroll?: number | string | boolean // x轴滚动的距离，如果是boolean是boolean,则使用默认值
  fillRows?: boolean // 是否填充空行
  isSet?: boolean // 是否需要设置最小行高，配合fillRows使用,如果为 false 则要自行处理样式问题
  isChildren?: boolean // 是否展示左边的展开图标
  expandedRowKeys?: string[] // 树形表格，设置默认展开的值
  remember?: boolean // 用户配置是否记录查询条件的内容，默认为true
  tableShow?: boolean // 是否展示表格，默认为true
}

type MTableInstance<T = unknown> = Omit<
  InstanceType<typeof MTable>,
  keyof Partial<ComponentPublicInstance> | keyof TableProps<T>
>

export { EnumProps, SearchType, SearchProps, ColumnProps, MTableInstance, SearchRenderScope, TableProps }
