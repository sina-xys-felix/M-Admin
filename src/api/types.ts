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
 * @description 列表查询条件
 * */
export interface ISearchParams extends Partial<IPageable> {
  sort?: string
  ascending?: boolean
  name?: string
}

interface ISorts {
  asc?: boolean
  field?: string
  index: number
}
interface IParamsIns {
  field?: string
  index?: number
  queryType?: string
  value?: any
}
type IParams<T> = Array<T>
/**
 * @description 列表查询条件2
 * */
export interface SearchParams {
  index?: number
  size?: number
  sort?: string
  descending?: boolean
  name?: string
  [key:string]:any
}
