import { AnyObject } from "./global"

export interface Pageable {
  current: number
  pageSize: number
  total: number
}

export interface TableStateProps {
  tableData: AnyObject[]
  pageable: Pageable
  searchParam: {
    [key: string]: unknown
  }
  searchInitParam: {
    [key: string]: unknown
  }
  totalParam: {
    [key: string]: unknown
  }
  icon?: {
    [key: string]: unknown
  }
}
