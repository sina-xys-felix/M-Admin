import type { PositionType } from '@/api/org/types'
export interface ICommonProps {

  code?: any
  enable?: boolean
  remark?: string
  sort?: number
  level?: number

  id?: string | number
  name?: string
  alias?: string

  quickCode?: string
  value?: string
  short?: string
  abbr?: string
  eng?: string

  description?: string
  thumbnail?: string
  image?: string
  style?: string
  index?: number
  editable?: boolean
  xppId?: number
  status?: PositionType

  parentId?: string | number
  typeId?: string | number
}

export interface IDictProps extends Partial<ICommonProps> {
  dictItems?: IDictItemProps[]
}
