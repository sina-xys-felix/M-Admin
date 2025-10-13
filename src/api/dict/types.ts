import { StatusNumProps } from '@/common/types/index'

export interface ICommonProps {
  code?: string | number
  enable?: boolean
  id?: string | number
  name?: string
  alias?: string
  quickCode?: string
  description?: string
  status?: StatusNumProps
  parentId?: string | number
}

export interface IDictProps extends Partial<ICommonProps> {}

export interface DictItemSearch {
  current: number
  pageSize: number
  key: string
}
