import { AnyObject } from '@/common/types/global'

/**
 * @name Api中共用的types
 * @author xuyingping
 * */
export interface DeleteParams {
  id: string
}

/**
 * @description 分页参数
 * */
export interface IPageable {
  index: number
  size: number
}

/**
 * @description 列表查询条件2
 * */
export interface SearchParams extends Partial<IPageable> {
  sort?: string
  descending?: boolean
  name?: string
  [key: string]: unknown
}

export interface DataCallBackProps {
  list: AnyObject[]
  total: number
  current: number
  pageSize: number
}
